/**
 * Loading of per-language strings.
 *
 * Each language is its own chunk, so a visitor downloads the one they read
 * instead of all three. The dynamic imports are written as an explicit switch
 * rather than a computed path so the bundler can see every target and emit a
 * chunk for each.
 */
import { LANGUAGES } from '../lib/language';
import { installCatalogStrings, isCatalogLoaded } from './localizedData';
import { Language, installTranslations, isTranslationLoaded } from './translations';

function importLocale(lang: Language) {
  switch (lang) {
    case 'en':
      return import('./locales/en');
    case 'ja':
      return import('./locales/ja');
    default:
      return import('./locales/ko');
  }
}

/**
 * Makes a language displayable. Must be awaited before the language is shown:
 * the UI reads `TRANSLATIONS[lang]` synchronously during render.
 */
export async function loadLanguage(lang: Language): Promise<void> {
  if (isTranslationLoaded(lang) && isCatalogLoaded(lang)) return;
  const locale = await importLocale(lang);
  installTranslations(lang, locale.translations);
  installCatalogStrings(lang, locale.catalog);
}

/**
 * Loads every language.
 *
 * The module finder indexes the catalog in all three at once, so a question
 * does not have to be asked in the language the UI is set to. It calls this
 * when the panel opens — after first paint, and only for the people who
 * actually open it.
 */
export async function loadAllLanguages(): Promise<void> {
  await Promise.all(LANGUAGES.map((lang) => loadLanguage(lang)));
}
