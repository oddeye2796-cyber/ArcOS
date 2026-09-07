import { Language } from '../i18n/translations';
import { STORAGE_KEYS, parsers, readStored } from './storage';

export const LANGUAGES: readonly Language[] = ['ko', 'en', 'ja'] as const;

export const parseLanguage = parsers.oneOf(LANGUAGES);

/** BCP 47 tag → supported language. `zh`, `de`, … fall through to English. */
function fromNavigatorTag(tag: string): Language | null {
  const primary = tag.toLowerCase().split('-')[0];
  if (primary === 'ko') return 'ko';
  if (primary === 'ja') return 'ja';
  if (primary === 'en') return 'en';
  return null;
}

/**
 * Initial language: an explicit stored choice wins, then the browser's
 * preference list, then Korean. Previously the app always opened in Korean, so
 * an English or Japanese visitor had to find the switcher on every visit.
 */
export function detectInitialLanguage(): Language {
  const stored = readStored(STORAGE_KEYS.lang, parseLanguage);
  if (stored) return stored;

  if (typeof navigator !== 'undefined') {
    const tags = navigator.languages?.length ? navigator.languages : [navigator.language];
    for (const tag of tags) {
      if (!tag) continue;
      const match = fromNavigatorTag(tag);
      if (match) return match;
    }
    // A recognisable non-Korean locale is better served by English than by the
    // Korean default.
    if (tags.some((tag) => tag && !tag.toLowerCase().startsWith('ko'))) {
      return 'en';
    }
  }

  return 'ko';
}

/** Keeps `<html lang>` in step so screen readers and CJK font fallback follow. */
export function applyDocumentLanguage(lang: Language): void {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = lang;
}
