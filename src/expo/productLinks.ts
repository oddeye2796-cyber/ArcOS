/**
 * Links the exhibition product pages open in a new tab. Fill a URL in here and
 * the page picks it up; there is nothing else to change.
 */

/** Hosted PoC environment per product. The button shows as "coming soon" while the URL is empty. */
export const POC_URLS: Readonly<Record<string, string>> = {
  arcforge: '',
  aesg: ''
};

/** Demo video (YouTube) per product. The button only appears once a URL is set. */
export const DEMO_VIDEO_URLS: Readonly<Record<string, string>> = {
  twin: ''
};

/** Products whose page has no brochure and manual downloads. */
export const NO_DOWNLOADS: ReadonlySet<string> = new Set(['twin']);

/** Only web links open; anything else in the tables above is treated as not set. */
export function linkFor(table: Readonly<Record<string, string>>, productId: string): string | null {
  const url = table[productId]?.trim();
  return url && /^https?:\/\//i.test(url) ? url : null;
}
