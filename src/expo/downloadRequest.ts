import { APPS_DATA } from '../data/appsData';
import { Language } from '../i18n/translations';

export type DownloadKind = 'brochure' | 'manual';

export const DOWNLOAD_KINDS: readonly DownloadKind[] = ['brochure', 'manual'] as const;

/** Bumped whenever the consent wording in expoCopy changes. Stored with each record. */
export const CONSENT_VERSION = '2026-10-v2';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  const email = value.trim();
  return email.length > 0 && email.length <= 254 && EMAIL_PATTERN.test(email);
}

/** Product ids the Edge Function accepts; kept in step with APPS_DATA by a test. */
export const DOWNLOADABLE_PRODUCT_IDS: readonly string[] = APPS_DATA.map((a) => a.id);

/** Sub-module ids per product (Smart Factory's modules, A²LAB's MLOps engine); each has its own files. */
export const DOWNLOADABLE_MODULE_IDS: Record<string, readonly string[]> = Object.fromEntries(
  APPS_DATA.filter((a) => a.groups?.length || a.downloadModules?.length).map((a) => [
    a.id,
    [...(a.groups?.flatMap((g) => g.items.map((i) => i.id)) ?? []), ...(a.downloadModules?.map((m) => m.id) ?? [])]
  ])
);

export interface DownloadRequest {
  email: string;
  consent: boolean;
  productId: string;
  /** Set for a sub-module's own brochure/manual; omitted for the product as a whole. */
  moduleId?: string;
  kind: DownloadKind;
  lang: Language;
}

export type DownloadResult =
  | { ok: true; url: string }
  | { ok: false; reason: 'invalid' | 'not_available' | 'server' | 'network' | 'not_configured' };

const SUPABASE_URL = import.meta.env?.VITE_EXPO_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env?.VITE_EXPO_SUPABASE_ANON_KEY as string | undefined;

export const downloadsConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);

/** Asks the Edge Function for a signed URL; it records the email and consent first. */
export async function requestDownload(request: DownloadRequest): Promise<DownloadResult> {
  if (!SUPABASE_URL || !SUPABASE_KEY) return { ok: false, reason: 'not_configured' };
  if (!isValidEmail(request.email) || !request.consent) return { ok: false, reason: 'invalid' };

  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/expo-download`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      },
      body: JSON.stringify({
        email: request.email.trim(),
        consent: request.consent,
        consentVersion: CONSENT_VERSION,
        productId: request.productId,
        moduleId: request.moduleId,
        kind: request.kind,
        lang: request.lang
      })
    });
    const data = (await response.json().catch(() => ({}))) as { url?: string; error?: string };
    if (response.ok && data.url) return { ok: true, url: data.url };
    if (data.error === 'not_available') return { ok: false, reason: 'not_available' };
    if (data.error === 'invalid') return { ok: false, reason: 'invalid' };
    return { ok: false, reason: 'server' };
  } catch {
    return { ok: false, reason: 'network' };
  }
}
