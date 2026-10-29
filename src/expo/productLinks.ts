/**
 * Links the exhibition product pages open in a new tab. Fill a URL in here and
 * the page picks it up; there is nothing else to change.
 */

/** Hosted PoC environment per product. The button shows as "coming soon" while the URL is empty. */
export const POC_URLS: Readonly<Record<string, string>> = {
  arcforge: '',
  aesg: ''
};

/** A live demo site; `tag` tells apart several demos on one product or module. */
export interface DemoLink {
  url: string;
  tag?: string;
}

/**
 * Live demo sites, keyed by product id or Smart Factory module id. Each opens in a
 * new tab from the product page (or from the module's card).
 */
export const DEMO_LINKS: Readonly<Record<string, readonly DemoLink[]>> = {
  'mes-food': [{ url: 'https://oddeye2796-cyber.github.io/hf-mes/' }],
  'mes-general': [
    { url: 'https://oddeye2796-cyber.github.io/M_MES/', tag: 'MES' },
    { url: 'https://oddeye2796-cyber.github.io/M_MES_POP/pop/', tag: 'POP' }
  ],
  ebrs: [{ url: 'https://oddeye2796-cyber.github.io/bio_EBRS/' }],
  orch: [{ url: 'https://oddeye2796-cyber.github.io/impix-ai-orchestration-platform/' }],
  a2lab: [{ url: 'https://oddeye2796-cyber.github.io/a2lab/' }]
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

export function demoLinksFor(id: string): readonly DemoLink[] {
  return (DEMO_LINKS[id] ?? []).filter((d) => /^https?:\/\//i.test(d.url));
}
