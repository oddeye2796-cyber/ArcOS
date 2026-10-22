import { Language } from '../i18n/translations';
import { LANGUAGES, parseLanguage } from '../lib/language';
import { readStored, writeStored } from '../lib/storage';

/**
 * The exhibition build keeps its own language key. Sharing the marketplace's
 * would let a developer's earlier Korean choice on the demo machine override
 * the Japanese default the booth is meant to open in.
 */
const EXPO_LANG_KEY = 'arcos.v1.expo.lang';

/** `?lang=` (for QR codes and kiosk URLs), then the last choice, then Japanese. */
export function detectExpoLanguage(): Language {
  if (typeof window !== 'undefined') {
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (fromUrl && (LANGUAGES as readonly string[]).includes(fromUrl)) return fromUrl as Language;
  }
  return readStored(EXPO_LANG_KEY, parseLanguage) ?? 'ja';
}

export function storeExpoLanguage(lang: Language): void {
  writeStored(EXPO_LANG_KEY, lang);
}
