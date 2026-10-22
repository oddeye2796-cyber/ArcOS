// Gate for the exhibition downloads: validates the email and the consent, files
// them in `expo_downloads`, and returns a short-lived signed URL for the PDF.
//
// The validation constants mirror src/expo/downloadRequest.ts; this file is
// deployed on its own and cannot import from the app.
import { createClient } from 'npm:@supabase/supabase-js@2';

const BUCKET = 'expo-docs';
const KINDS = ['brochure', 'manual'];
const LANGS = ['ja', 'en', 'ko'];
const PRODUCT_IDS = [
  'smartfactory', 'a2lab', 'orch', 'consensebot', 'aesg', 'twin', 'arcforge', 'b2lab'
];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SIGNED_URL_SECONDS = 300;

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
  const { productId, kind, lang, consent, consentVersion } = body;

  if (
    email.length === 0 || email.length > 254 || !EMAIL_PATTERN.test(email) ||
    consent !== true ||
    typeof consentVersion !== 'string' || consentVersion.length === 0 || consentVersion.length > 32 ||
    typeof productId !== 'string' || !PRODUCT_IDS.includes(productId) ||
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
  const candidates = [lang, ...LANGS.filter((l) => l !== lang)].map(
    (l) => ({ l, path: `${productId}/${kind}_${l}.pdf` })
  );

  for (const { l, path } of candidates) {
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(path, SIGNED_URL_SECONDS, { download: `${productId}_${kind}_${l}.pdf` });
    if (error || !data?.signedUrl) continue;

    // The record is the point of the gate, so a failed insert withholds the file.
    const { error: insertError } = await supabase.from('expo_downloads').insert({
      email,
      product_id: productId,
      kind,
      lang: l,
      file_path: path,
      consent: true,
      consent_version: consentVersion
    });
    if (insertError) return json(500, { error: 'server' });

    return json(200, { url: data.signedUrl, lang: l });
  }

  return json(404, { error: 'not_available' });
});
