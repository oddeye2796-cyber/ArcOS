import { Language } from '../i18n/translations';
import { LANGUAGES, parseLanguage } from '../lib/language';

/**
 * The exhibition build keeps its own language key. Sharing the marketplace's
 * would let a developer's earlier Korean choice on the demo machine override
 * the Japanese default the booth is meant to open in.
 */
const EXPO_LANG_KEY = 'arcos.v1.expo.lang';

/**
 * The choice lives in sessionStorage, so it survives reloads and in-page
 * navigation but not a fresh visit: the page always opens in Japanese unless
 * the URL says otherwise. (A localStorage choice used to stick forever, so a
 * visitor who once tapped English or Korean never saw Japanese again.)
 */
function readSessionLanguage(): Language | null {
  try {
    return parseLanguage(JSON.parse(window.sessionStorage.getItem(EXPO_LANG_KEY) ?? 'null'));
  } catch {
    return null;
  }
}

/** `?lang=` (for QR codes and kiosk URLs), then this session's choice, then Japanese. */
export function detectExpoLanguage(): Language {
  if (typeof window !== 'undefined') {
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (fromUrl && (LANGUAGES as readonly string[]).includes(fromUrl)) return fromUrl as Language;
  }
  return readSessionLanguage() ?? 'ja';
}

export function storeExpoLanguage(lang: Language): void {
  try {
    window.sessionStorage.setItem(EXPO_LANG_KEY, JSON.stringify(lang));
  } catch {
    // Private mode or blocked storage: the choice just won't survive a reload.
  }
}
