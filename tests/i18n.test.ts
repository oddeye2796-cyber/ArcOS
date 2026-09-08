/**
 * Translation completeness.
 *
 * The UI reads `TRANSLATIONS[lang]` and the localized catalog getters fall back
 * silently when a key is missing — a missing Japanese string shows Korean text
 * rather than throwing, so nothing in a build or a type check catches it. These
 * tests do.
 */
import { CHATBOT_COPY } from '../src/i18n/chatbotLocalization';
import { Language, TRANSLATIONS } from '../src/i18n/translations';
import {
  getLocalizedAppCategory,
  getLocalizedAppDesc,
  getLocalizedAppDetail,
  getLocalizedAppName,
  getLocalizedPresetSubtitle,
  getLocalizedPresetTitle,
  getLocalizedSubModuleDesc,
  getLocalizedSubModuleName
} from '../src/i18n/localizedData';
import { APPS_DATA } from '../src/data/appsData';
import { RECOMMENDATION_PRESETS } from '../src/data/presetsData';
import { assert, suite, test } from './harness';

const LANGUAGES: Language[] = ['ko', 'en', 'ja'];
const REFERENCE: Language = 'ko';

/**
 * Strings that are empty on purpose. Korean and Japanese prefix a remaining-day
 * count ("잔여 3일", "残り 3日"); English reads "3 days" with no prefix at all.
 */
const DELIBERATELY_EMPTY: ReadonlySet<string> = new Set(['en.pocDaysRemainingPrefix']);

/**
 * Names that are the same in every language by design — a product or brand
 * name is not an untranslated string.
 */
const UNTRANSLATED_BY_DESIGN: ReadonlySet<string> = new Set(['aesg.name']);

/** Every leaf path in an object, so nested tables are compared too. */
function leafPaths(value: unknown, prefix = ''): string[] {
  if (value === null || typeof value !== 'object') return [prefix];
  if (Array.isArray(value)) return [prefix];
  return Object.entries(value as Record<string, unknown>).flatMap(([key, child]) =>
    leafPaths(child, prefix ? `${prefix}.${key}` : key)
  );
}

suite('UI translations', () => {
  const reference = leafPaths(TRANSLATIONS[REFERENCE]).sort();

  for (const lang of LANGUAGES) {
    test(`${lang} has every key Korean has`, () => {
      const missing = reference.filter((path) => !leafPaths(TRANSLATIONS[lang]).includes(path));
      assert(missing.length === 0, `missing ${missing.length} key(s): ${missing.slice(0, 8).join(', ')}`);
    });

    test(`${lang} has no unintended empty strings`, () => {
      const empties: string[] = [];
      const walk = (value: unknown, path: string) => {
        if (typeof value === 'string') {
          if (value.trim() === '') empties.push(path);
          return;
        }
        if (Array.isArray(value)) {
          value.forEach((item, index) => walk(item, `${path}[${index}]`));
          return;
        }
        if (value && typeof value === 'object') {
          for (const [key, child] of Object.entries(value)) walk(child, path ? `${path}.${key}` : key);
        }
      };
      walk(TRANSLATIONS[lang], '');
      const unexpected = empties.filter((path) => !DELIBERATELY_EMPTY.has(`${lang}.${path}`));
      assert(unexpected.length === 0, `empty at: ${unexpected.slice(0, 8).join(', ')}`);
    });
  }
});

suite('module finder copy', () => {
  const reference = leafPaths(CHATBOT_COPY[REFERENCE]).sort();

  for (const lang of LANGUAGES) {
    test(`${lang} has every key Korean has`, () => {
      const missing = reference.filter((path) => !leafPaths(CHATBOT_COPY[lang]).includes(path));
      assert(missing.length === 0, `missing: ${missing.join(', ')}`);
    });
  }

  test('every template placeholder survives translation', () => {
    // A dropped `{count}` in one language silently renders the sentence wrong.
    const placeholders = (text: string) => (text.match(/\{[a-z]+\}/gi) ?? []).sort().join(',');
    const broken: string[] = [];
    for (const [key, korean] of Object.entries(CHATBOT_COPY[REFERENCE])) {
      if (typeof korean !== 'string') continue;
      for (const lang of LANGUAGES) {
        const translated = (CHATBOT_COPY[lang] as unknown as Record<string, string>)[key];
        if (typeof translated === 'string' && placeholders(translated) !== placeholders(korean)) {
          broken.push(`${lang}.${key}`);
        }
      }
    }
    assert(broken.length === 0, `placeholder mismatch at: ${broken.join(', ')}`);
  });
});

suite('catalog translations', () => {
  for (const lang of LANGUAGES) {
    test(`${lang} translates every app`, () => {
      const problems: string[] = [];
      for (const app of APPS_DATA) {
        const fields = [
          ['name', getLocalizedAppName(app, lang), app.name],
          ['categoryLabel', getLocalizedAppCategory(app, lang), app.categoryLabel],
          ['desc', getLocalizedAppDesc(app, lang), app.desc],
          ['detail', getLocalizedAppDetail(app, lang), app.detail]
        ] as const;

        for (const [label, value, source] of fields) {
          if (!value.trim()) problems.push(`${app.id}.${label} is empty`);
          // Korean is the source text, so only the other languages can fall
          // through to it — and a brand name is allowed to be identical.
          if (lang !== 'ko' && value === source && !UNTRANSLATED_BY_DESIGN.has(`${app.id}.${label}`)) {
            problems.push(`${app.id}.${label} fell back to Korean`);
          }
        }
      }
      assert(problems.length === 0, problems.join('; '));
    });

    test(`${lang} translates every suite sub-module`, () => {
      const untranslated: string[] = [];
      for (const app of APPS_DATA) {
        for (const group of app.groups ?? []) {
          for (const item of group.items) {
            const name = getLocalizedSubModuleName(item.id, item.name, lang);
            const desc = getLocalizedSubModuleDesc(item.id, item.desc, lang);
            if (lang !== 'ko' && name === item.name) untranslated.push(`${item.id}.name`);
            if (lang !== 'ko' && desc === item.desc) untranslated.push(`${item.id}.desc`);
          }
        }
      }
      assert(untranslated.length === 0, `fell back to Korean: ${untranslated.join(', ')}`);
    });

    test(`${lang} translates every recommendation preset`, () => {
      const untranslated: string[] = [];
      for (const preset of RECOMMENDATION_PRESETS) {
        if (lang !== 'ko' && getLocalizedPresetTitle(preset, lang) === preset.title) {
          untranslated.push(`${preset.id}.title`);
        }
        if (lang !== 'ko' && getLocalizedPresetSubtitle(preset, lang) === preset.subtitle) {
          untranslated.push(`${preset.id}.subtitle`);
        }
      }
      assert(untranslated.length === 0, `fell back to Korean: ${untranslated.join(', ')}`);
    });
  }
});
