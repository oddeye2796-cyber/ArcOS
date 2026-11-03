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
  'mes-injection': [{ url: 'https://oddeye2796-cyber.github.io/Injection/' }],
  'mes-food': [{ url: 'https://oddeye2796-cyber.github.io/hf-mes/' }],
  'mes-cosmetics': [{ url: 'https://oddeye2796-cyber.github.io/cosmetics/' }],
  'mes-general': [
    { url: 'https://oddeye2796-cyber.github.io/M_MES/', tag: 'MES' },
    { url: 'https://oddeye2796-cyber.github.io/M_MES_POP/pop/', tag: 'POP' }
  ],
  ebrs: [{ url: 'https://oddeye2796-cyber.github.io/bio_EBRS/' }],
  rems: [{ url: 'https://oddeye2796-cyber.github.io/REMS/' }],
  consensebot: [{ url: 'http://192.168.110.20:3001/ja' }],
  orch: [{ url: 'https://oddeye2796-cyber.github.io/impix-ai-orchestration-platform/tokyo/' }],
  a2lab: [{ url: 'https://oddeye2796-cyber.github.io/a2lab/' }],
  b2lab: [{ url: 'https://newlake.vercel.app' }]
};

/** A video (Google Drive or YouTube). `tag` replaces the default button label. */
export interface VideoLink {
  url: string;
  tag?: string;
}

/** Videos per product. Each shows as a button next to the others once its URL is set. */
export const DEMO_VIDEOS: Readonly<Record<string, readonly VideoLink[]>> = {
  twin: [
    { url: 'https://drive.google.com/file/d/1HrX3lyowDhQZfF-aaL-KrWo8qu7RTrzO/view?usp=drive_link' },
    { url: 'https://drive.google.com/file/d/1P8s9bEvfO-y4M6MqPXB9yRcq1rGntjkj/view?usp=sharing', tag: 'DT(WMS)' }
  ]
};

/** Products whose page has no brochure and manual downloads. */
export const NO_DOWNLOADS: ReadonlySet<string> = new Set(['twin']);

/** Only web links open; anything else in the tables above is treated as not set. */
export function linkFor(table: Readonly<Record<string, string>>, productId: string): string | null {
  const url = table[productId]?.trim();
  return url && /^https?:\/\//i.test(url) ? url : null;
}

export function videoLinksFor(id: string): readonly VideoLink[] {
  return (DEMO_VIDEOS[id] ?? []).filter((v) => /^https?:\/\//i.test(v.url));
}

export function demoLinksFor(id: string): readonly DemoLink[] {
  return (DEMO_LINKS[id] ?? []).filter((d) => /^https?:\/\//i.test(d.url));
}
