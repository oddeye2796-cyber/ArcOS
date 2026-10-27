// Gate for the exhibition downloads: validates the email and the consent, files
// them in `expo.downloads`, and returns a short-lived signed URL for the PDF.
//
// The table lives in the `expo` schema, which the REST API does not expose, so
// the insert goes straight to Postgres over SUPABASE_DB_URL. Storage is only
// used to sign URLs.
//
// The validation constants mirror src/expo/downloadRequest.ts; this file is
// deployed on its own and cannot import from the app.
import { createClient } from 'npm:@supabase/supabase-js@2';
import postgres from 'npm:postgres@3';

const BUCKET = 'expo-docs';
const KINDS = ['brochure', 'manual'];
const LANGS = ['ja', 'en', 'ko'];
const PRODUCT_IDS = [
  'smartfactory', 'a2lab', 'orch', 'consensebot', 'aesg', 'twin', 'arcforge', 'b2lab'
];
// Products that also have files per sub-module (Smart Factory's modules, A²LAB's MLOps).
const MODULE_IDS: Record<string, string[]> = {
  smartfactory: ['mes-pharma', 'mes-food', 'mes-general', 'ebrs', 'rems', 'scm'],
  a2lab: ['mlops']
};
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SIGNED_URL_SECONDS = 300;

// One connection, reused across requests while the instance is warm.
const sql = postgres(Deno.env.get('SUPABASE_DB_URL')!, { max: 1, prepare: false });

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' }
  });

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });
  if (req.method !== 'POST') return json(405, { error: 'method_not_allowed' });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json(400, { error: 'invalid' });
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const { productId, moduleId, kind, lang, consent, consentVersion } = body;

  if (
    email.length === 0 || email.length > 254 || !EMAIL_PATTERN.test(email) ||
    consent !== true ||
    typeof consentVersion !== 'string' || consentVersion.length === 0 || consentVersion.length > 32 ||
    typeof productId !== 'string' || !PRODUCT_IDS.includes(productId) ||
    (moduleId !== undefined && moduleId !== null &&
      (typeof moduleId !== 'string' || !MODULE_IDS[productId]?.includes(moduleId))) ||
    typeof kind !== 'string' || !KINDS.includes(kind) ||
    typeof lang !== 'string' || !LANGS.includes(lang)
  ) {
    return json(400, { error: 'invalid' });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  // The visitor's language first, then the languages the booth reads best.
  const module = typeof moduleId === 'string' ? moduleId : null;
  const dir = module ? `${productId}/${module}` : productId;
  const candidates = [lang, ...LANGS.filter((l) => l !== lang)].map(
    (l) => ({ l, path: `${dir}/${kind}_${l}.pdf` })
  );

  for (const { l, path } of candidates) {
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(path, SIGNED_URL_SECONDS, { download: `${module ?? productId}_${kind}_${l}.pdf` });
    if (error || !data?.signedUrl) continue;

    // The record is the point of the gate, so a failed insert withholds the file.
    try {
      await sql`
        insert into expo.downloads (email, product_id, module_id, kind, lang, file_path, consent, consent_version)
        values (${email}, ${productId}, ${module}, ${kind}, ${l}, ${path}, true, ${consentVersion})
      `;
    } catch (error) {
      console.error('expo-download insert failed', error);
      return json(500, { error: 'server' });
    }

    return json(200, { url: data.signedUrl, lang: l });
  }

  return json(404, { error: 'not_available' });
});
