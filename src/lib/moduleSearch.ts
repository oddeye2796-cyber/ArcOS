/**
 * The matching engine behind the module finder chat.
 *
 * It runs entirely in the browser against the catalog that is already in the
 * bundle: there is no network round trip, so an answer lands in the same frame
 * the question is submitted. That matters more than model sophistication here —
 * the catalog is a closed set of fourteen entries, and the hard part is
 * vocabulary, not reasoning. `data/chatbotKeywords` supplies the vocabulary.
 *
 * Everything is indexed in all three languages at once, so a Japanese-speaking
 * user typing an English acronym ("HACCP", "OEE") gets the same answer a Korean
 * one does.
 */
import { AppItem, RecommendationPreset, SubModuleItem } from '../types';
import { APPS_DATA } from '../data/appsData';
import { RECOMMENDATION_PRESETS } from '../data/presetsData';
import {
  GOAL_INTENTS,
  GoalId,
  INDUSTRY_INTENTS,
  IndustryId,
  IntentDefinition,
  MODULE_KEYWORDS,
  PRESET_KEYWORDS,
  STOP_WORDS
} from '../data/chatbotKeywords';
import { Language } from '../i18n/translations';
import {
  getLocalizedAppCategory,
  getLocalizedAppDesc,
  getLocalizedAppDetail,
  getLocalizedAppName,
  getLocalizedAppUnit,
  getLocalizedGrowthMetric,
  getLocalizedPresetDesc,
  getLocalizedPresetSubtitle,
  getLocalizedPresetTarget,
  getLocalizedPresetTitle,
  getLocalizedSubModuleDesc,
  getLocalizedSubModuleName
} from '../i18n/localizedData';

const ALL_LANGUAGES: readonly Language[] = ['ko', 'en', 'ja'];

/** A catalog entry the finder can return: a top-level app or one sub-module. */
export interface ModuleMatch {
  /** Stable key: the sub-module id when there is one, else the app id. */
  key: string;
  kind: 'app' | 'submodule';
  app: AppItem;
  subModule?: SubModuleItem;
  score: number;
  /** Query terms that produced the match, shown to justify the answer. */
  reasons: string[];
}

export interface PresetMatch {
  preset: RecommendationPreset;
  score: number;
}

interface IndexedField {
  text: string;
  weight: number;
}

interface IndexEntry {
  key: string;
  kind: 'app' | 'submodule';
  app: AppItem;
  subModule?: SubModuleItem;
  fields: IndexedField[];
  keywords: readonly string[];
  /** Nudge for modules the catalog already promotes as a starting point. */
  bias: number;
}

/**
 * Field weights. A name hit is worth more than a hit buried in the long-form
 * detail copy, which is mostly architecture prose and matches many queries
 * weakly.
 */
const WEIGHT = {
  name: 10,
  category: 5,
  desc: 4,
  meta: 2.5,
  detail: 1.5
} as const;

/** Curated synonyms outrank everything but an exact name hit. */
const KEYWORD_WEIGHT = 9;
/** At most this many curated hits count, so a long list cannot run away. */
const MAX_KEYWORD_HITS = 3;

/** Below this a result is noise rather than an answer. */
const MIN_SCORE = 3;
/** Results this far below the best one are dropped even if above MIN_SCORE. */
const RELATIVE_CUTOFF = 0.3;
/**
 * Presets are a whole shopping cart, so they are offered only on a clear
 * signal — a weak preset suggestion is worse than none.
 */
const PRESET_MIN_SCORE = 12;

const CJK_PATTERN = /[぀-ヿ㐀-䶿一-鿿가-힯]/;

/**
 * Lowercase, strip punctuation, collapse whitespace. Both the index and the
 * query go through this, which is what lets matching be plain containment.
 */
function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

/**
 * Indexed text is stored space-padded so a word-start test is a plain
 * `includes` on both edges of the string.
 */
function joinLocalized(values: string[]): string {
  return ` ${normalize(values.join(' '))} `;
}

/**
 * Korean and Japanese fragments that carry no meaning on their own. They are
 * substrings of ordinary verb endings, so without this list the matcher scores
 * (and then shows the user) "하는" as the reason a module was recommended.
 */
const NOISE_FRAGMENTS: ReadonlySet<string> = new Set([
  '하는', '있는', '되는', '하고', '하기', '한다', '합니다', '입니다', '에서', '으로',
  '이며', '으며', '에게', '보다', '같은', '위한', '통해', '따라', '대한', '관한',
  'する', 'した', 'して', 'ます', 'です', 'ある', 'いる', 'から', 'まで', 'ため'
]);

/**
 * Containment with a word-start rule for Latin script: without it "ai" matches
 * "supply chain" and every AI module surfaces on a supply-chain question.
 * Korean and Japanese are written without word separators, so they keep plain
 * containment — which is also what makes particle-glued queries work.
 */
function containsTerm(paddedHaystack: string, term: string): boolean {
  if (CJK_PATTERN.test(term)) return paddedHaystack.includes(term);
  return paddedHaystack.includes(` ${term}`);
}

function appFields(app: AppItem): IndexedField[] {
  const names = ALL_LANGUAGES.map((l) => getLocalizedAppName(app, l));
  const categories = ALL_LANGUAGES.map((l) => getLocalizedAppCategory(app, l));
  const descs = ALL_LANGUAGES.map((l) => getLocalizedAppDesc(app, l));
  const details = ALL_LANGUAGES.map((l) => getLocalizedAppDetail(app, l));
  const metas = [
    ...ALL_LANGUAGES.map((l) => getLocalizedAppUnit(app, l)),
    ...ALL_LANGUAGES.map((l) => getLocalizedGrowthMetric(app.growthMetric, l)),
    app.dataScope.schemaStd,
    app.dataScope.domainDb,
    ...app.deps.map((d) => d.name),
    ...app.permissions.map((p) => p.scope)
  ];

  return [
    { text: joinLocalized([...names, app.name, app.id]), weight: WEIGHT.name },
    { text: joinLocalized([...categories, app.category, app.categoryLabel]), weight: WEIGHT.category },
    { text: joinLocalized([...descs, app.desc]), weight: WEIGHT.desc },
    { text: joinLocalized(metas), weight: WEIGHT.meta },
    { text: joinLocalized([...details, app.detail]), weight: WEIGHT.detail }
  ];
}

function subModuleFields(app: AppItem, sub: SubModuleItem): IndexedField[] {
  const names = ALL_LANGUAGES.map((l) => getLocalizedSubModuleName(sub.id, sub.name, l));
  const descs = ALL_LANGUAGES.map((l) => getLocalizedSubModuleDesc(sub.id, sub.desc, l));
  const categories = ALL_LANGUAGES.map((l) => getLocalizedAppCategory(app, l));

  return [
    { text: joinLocalized([...names, sub.name, sub.id]), weight: WEIGHT.name },
    { text: joinLocalized([...categories, app.category, app.categoryLabel]), weight: WEIGHT.category },
    { text: joinLocalized([...descs, sub.desc]), weight: WEIGHT.desc },
    { text: joinLocalized([sub.unitLabel]), weight: WEIGHT.meta },
    // The suite's own copy is context for its members, at the lowest weight.
    { text: joinLocalized([app.name, app.desc]), weight: WEIGHT.detail }
  ];
}

/**
 * Built once on first use and reused for every keystroke: the localization
 * lookups behind it are not free, and the catalog never changes at runtime.
 */
let cachedIndex: IndexEntry[] | null = null;

function getIndex(): IndexEntry[] {
  if (cachedIndex) return cachedIndex;

  const entries: IndexEntry[] = [];

  for (const app of APPS_DATA) {
    const subModules = app.groups?.flatMap((g) => g.items) ?? [];
    entries.push({
      key: app.id,
      kind: 'app',
      app,
      fields: appFields(app),
      keywords: MODULE_KEYWORDS[app.id] ?? [],
      bias: app.landing || subModules.some((s) => s.landing) ? 0.6 : 0
    });

    for (const sub of subModules) {
      entries.push({
        key: sub.id,
        kind: 'submodule',
        app,
        subModule: sub,
        fields: subModuleFields(app, sub),
        keywords: MODULE_KEYWORDS[sub.id] ?? [],
        bias: sub.landing ? 0.6 : 0
      });
    }
  }

  cachedIndex = entries;
  return entries;
}

interface Variant {
  text: string;
  /** Share of the original token this variant covers, 0–1. */
  coverage: number;
}

/**
 * Query terms as they might actually appear in the catalog.
 *
 * Korean and Japanese are written without spaces and Korean glues particles
 * onto nouns ("제약공장에서"), so a whole-token comparison finds nothing.
 * Substrings are generated longest-first and the caller stops at the first
 * length that matches, which keeps the longest — and therefore most specific —
 * match rather than a two-character coincidence.
 */
function variantsOf(token: string): Variant[] {
  if (!CJK_PATTERN.test(token)) {
    const variants: Variant[] = [{ text: token, coverage: 1 }];
    // English morphology: "monitoring" should still find "monitor".
    for (let len = token.length - 1; len >= 4 && len >= token.length - 3; len -= 1) {
      variants.push({ text: token.slice(0, len), coverage: len / token.length });
    }
    return variants;
  }

  const variants: Variant[] = [];
  const maxLen = Math.min(token.length, 8);
  for (let len = maxLen; len >= 2; len -= 1) {
    for (let start = 0; start + len <= token.length; start += 1) {
      const text = token.slice(start, start + len);
      if (NOISE_FRAGMENTS.has(text)) continue;
      variants.push({ text, coverage: len / token.length });
    }
  }
  return variants;
}

function tokenize(query: string): string[] {
  return normalize(query)
    .split(' ')
    .filter((token) => token.length >= 2 && !STOP_WORDS.has(token));
}

interface Scored {
  score: number;
  reasons: string[];
}

/** Drops reasons already covered by a longer one ("불량" beside "불량률"). */
function dedupeReasons(reasons: string[]): string[] {
  const byLength = [...reasons].sort((a, b) => b.length - a.length);
  const kept: string[] = [];
  for (const reason of byLength) {
    if (kept.some((existing) => existing.includes(reason))) continue;
    kept.push(reason);
  }
  // Restore the order matches were found in; it reads as the query does.
  return reasons.filter((reason) => kept.includes(reason));
}

function scoreAgainst(
  fields: IndexedField[],
  keywords: readonly string[],
  tokens: string[],
  normalizedQuery: string
): Scored {
  const reasons: string[] = [];
  let score = 0;

  // Curated synonyms are matched against the whole query so multi-word entries
  // ("audit trail", "no code") work without depending on how it was tokenized.
  const keywordHits = keywords
    .filter((keyword) => keyword.length >= 2 && containsTerm(normalizedQuery, keyword))
    .sort((a, b) => b.length - a.length)
    .slice(0, MAX_KEYWORD_HITS);

  for (const keyword of keywordHits) {
    // A longer synonym is a more specific signal than a two-letter one.
    score += KEYWORD_WEIGHT * Math.min(1, 0.6 + keyword.length * 0.1);
    reasons.push(keyword);
  }

  for (const token of tokens) {
    let bestScore = 0;
    let bestText = '';
    let bestCoverage = 0;

    for (const variant of variantsOf(token)) {
      // Variants come longest-first; once a shorter one is reached and a match
      // is already in hand, nothing shorter can be more specific.
      if (bestScore > 0 && variant.coverage < bestCoverage) break;
      for (const field of fields) {
        if (!containsTerm(field.text, variant.text)) continue;
        const candidate = field.weight * variant.coverage;
        if (candidate > bestScore) {
          bestScore = candidate;
          bestText = variant.text;
          bestCoverage = variant.coverage;
        }
      }
    }

    if (bestScore > 0) {
      score += bestScore;
      // A truncated Latin stem ("cleanroo") is meaningless to read, so the word
      // the user actually typed is shown instead. A CJK fragment is the
      // meaningful part of a particle-glued phrase, so it is kept as matched.
      const label = !CJK_PATTERN.test(token) && bestCoverage < 1 ? token : bestText;
      if (!reasons.includes(label)) reasons.push(label);
    }
  }

  return { score, reasons: dedupeReasons(reasons) };
}

/** Ranked catalog entries for a free-text question. Empty when nothing fits. */
export function searchModules(query: string, limit = 4): ModuleMatch[] {
  const normalizedQuery = ` ${normalize(query)} `;
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const scored: ModuleMatch[] = [];
  for (const entry of getIndex()) {
    const { score, reasons } = scoreAgainst(entry.fields, entry.keywords, tokens, normalizedQuery);
    if (score <= 0) continue;
    scored.push({
      key: entry.key,
      kind: entry.kind,
      app: entry.app,
      subModule: entry.subModule,
      score: score + entry.bias,
      reasons: reasons.slice(0, 3)
    });
  }

  if (scored.length === 0) return [];

  scored.sort((a, b) => b.score - a.score);
  const best = scored[0].score;
  return scored
    .filter((match) => match.score >= MIN_SCORE && match.score >= best * RELATIVE_CUTOFF)
    .slice(0, limit);
}

/** Presets ranked for the same question, so a whole bundle can be offered. */
export function searchPresets(query: string, limit = 1): PresetMatch[] {
  const normalizedQuery = ` ${normalize(query)} `;
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const scored: PresetMatch[] = RECOMMENDATION_PRESETS.map((preset) => {
    const fields: IndexedField[] = [
      {
        text: joinLocalized([
          ...ALL_LANGUAGES.map((l) => getLocalizedPresetTitle(preset, l)),
          preset.title
        ]),
        weight: WEIGHT.name
      },
      {
        text: joinLocalized([
          ...ALL_LANGUAGES.map((l) => getLocalizedPresetSubtitle(preset, l)),
          ...ALL_LANGUAGES.map((l) => getLocalizedPresetTarget(preset, l)),
          preset.subtitle,
          preset.targetAudience
        ]),
        weight: WEIGHT.desc
      },
      {
        text: joinLocalized([
          ...ALL_LANGUAGES.map((l) => getLocalizedPresetDesc(preset, l)),
          ...preset.highlights,
          ...preset.recommendedModules.map((m) => m.name)
        ]),
        weight: WEIGHT.detail
      }
    ];
    const { score } = scoreAgainst(
      fields,
      PRESET_KEYWORDS[preset.id] ?? [],
      tokens,
      normalizedQuery
    );
    return { preset, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.filter((entry) => entry.score >= PRESET_MIN_SCORE).slice(0, limit);
}

function detectIntent<Id extends string>(
  intents: readonly IntentDefinition<Id>[],
  query: string
): IntentDefinition<Id> | null {
  const normalizedQuery = ` ${normalize(query)} `;
  if (!normalizedQuery.trim()) return null;

  let best: IntentDefinition<Id> | null = null;
  let bestLength = 0;
  for (const intent of intents) {
    for (const keyword of intent.keywords) {
      // Longest keyword wins: "의료기기" should beat a bare "기기" elsewhere.
      if (keyword.length > bestLength && containsTerm(normalizedQuery, keyword)) {
        best = intent;
        bestLength = keyword.length;
      }
    }
  }
  return best;
}

export function detectIndustry(query: string): IntentDefinition<IndustryId> | null {
  return detectIntent(INDUSTRY_INTENTS, query);
}

export function detectGoal(query: string): IntentDefinition<GoalId> | null {
  return detectIntent(GOAL_INTENTS, query);
}

export function industryById(id: IndustryId): IntentDefinition<IndustryId> | undefined {
  return INDUSTRY_INTENTS.find((intent) => intent.id === id);
}

export function goalById(id: GoalId): IntentDefinition<GoalId> | undefined {
  return GOAL_INTENTS.find((intent) => intent.id === id);
}

export function presetById(id: string): RecommendationPreset | undefined {
  return RECOMMENDATION_PRESETS.find((preset) => preset.id === id);
}

/**
 * Catalog entries for an explicit id list, keeping the order given. Used by the
 * guided path, where the recommendation is curated rather than searched.
 */
export function resolveModules(ids: readonly string[]): ModuleMatch[] {
  const index = getIndex();
  const matches: ModuleMatch[] = [];
  for (const id of ids) {
    const entry = index.find((candidate) => candidate.key === id);
    if (!entry) continue;
    matches.push({
      key: entry.key,
      kind: entry.kind,
      app: entry.app,
      subModule: entry.subModule,
      score: 0,
      reasons: []
    });
  }
  return matches;
}

/** Every entry, suite members included — the "just show me everything" answer. */
export function allModules(): ModuleMatch[] {
  return getIndex().map((entry) => ({
    key: entry.key,
    kind: entry.kind,
    app: entry.app,
    subModule: entry.subModule,
    score: 0,
    reasons: []
  }));
}
