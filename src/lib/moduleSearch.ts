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
  getCatalogVersion,
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
 * Built on first use and reused for every keystroke: the localization lookups
 * behind it are not free.
 *
 * The catalog copy is not constant any more — languages arrive one chunk at a
 * time — so the cache records which version of the string tables it was built
 * from and rebuilds when a new language lands. Without that, an index built
 * before the other languages loaded would keep answering as if they were still
 * missing.
 */
let cachedIndex: IndexEntry[] | null = null;
let cachedIndexVersion = -1;

function getIndex(): IndexEntry[] {
  if (cachedIndex && cachedIndexVersion === getCatalogVersion()) return cachedIndex;
  cachedIndexVersion = getCatalogVersion();
  cachedIndexByKey = null;

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
  /**
   * How much of a term this fragment is, 0–1 — the multiplier on the field
   * weight when it matches.
   */
  specificity: number;
}

/**
 * Characters that make a CJK fragment a real term rather than a coincidence.
 *
 * Japanese is written without spaces and Korean glues particles on, so a whole
 * question can arrive as one token: "設備の故障予知" is three words. Scoring a
 * fragment by the share of the token it covers would discount a perfectly good
 * "故障" match to a fifth of its weight purely because the user did not press
 * space — so a fragment is scored by its own length instead, and four
 * characters is treated as a full term.
 */
const SPECIFIC_CJK_LENGTH = 4;

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
    // A Latin token is already a word: the whole of it is the term, and only a
    // morphological stem ("monitor" for "monitoring") is worth less.
    const variants: Variant[] = [{ text: token, specificity: 1 }];
    for (let len = token.length - 1; len >= 4 && len >= token.length - 3; len -= 1) {
      variants.push({ text: token.slice(0, len), specificity: len / token.length });
    }
    return variants;
  }

  const variants: Variant[] = [];
  const maxLen = Math.min(token.length, 8);
  for (let len = maxLen; len >= 2; len -= 1) {
    // Whichever reads as more of a term: the fragment's own length, or the
    // share of the token it covers. A short word typed on its own ("기록") is
    // a whole term and keeps full weight; the same two characters inside a
    // seven-character run-on phrase are scored on their own merit instead.
    const specificity = Math.min(1, Math.max(len / SPECIFIC_CJK_LENGTH, len / token.length));
    for (let start = 0; start + len <= token.length; start += 1) {
      const text = token.slice(start, start + len);
      if (NOISE_FRAGMENTS.has(text)) continue;
      variants.push({ text, specificity });
    }
  }
  return variants;
}

/** A query token together with the catalog spellings it could appear as. */
interface PreparedToken {
  token: string;
  variants: Variant[];
}

/**
 * Everything a query needs, computed once.
 *
 * Variant expansion is quadratic in token length for CJK, and it used to run
 * inside the per-entry loop — the same substrings rebuilt for all fourteen
 * catalog entries. Hoisting it here makes it fourteen times cheaper without
 * changing a single score.
 */
interface PreparedQuery {
  /** The query exactly as given, so the cache below can identify a repeat. */
  raw: string;
  /** Space-padded, so `containsTerm` can test word starts on both edges. */
  padded: string;
  tokens: PreparedToken[];
}

/**
 * Last prepared query, reused across the calls that answer one question.
 *
 * `searchModules` and `searchPresets` are always given the same string, so a
 * single-entry cache removes the second, identical expansion. Anything larger
 * would be bookkeeping for a cache that is never asked for an older query.
 */
let lastPrepared: PreparedQuery | null = null;

function prepareQuery(query: string): PreparedQuery {
  if (lastPrepared?.raw === query) return lastPrepared;

  const normalized = normalize(query);
  const tokens: PreparedToken[] = [];
  for (const token of normalized.split(' ')) {
    if (token.length < 2 || STOP_WORDS.has(token)) continue;
    tokens.push({ token, variants: variantsOf(token) });
  }

  lastPrepared = { raw: query, padded: ` ${normalized} `, tokens };
  return lastPrepared;
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
  query: PreparedQuery
): Scored {
  const reasons: string[] = [];
  let score = 0;

  // Curated synonyms are matched against the whole query so multi-word entries
  // ("audit trail", "no code") work without depending on how it was tokenized.
  const keywordHits = keywords
    .filter((keyword) => keyword.length >= 2 && containsTerm(query.padded, keyword))
    .sort((a, b) => b.length - a.length)
    .slice(0, MAX_KEYWORD_HITS);

  for (const keyword of keywordHits) {
    // A longer synonym is a more specific signal than a two-letter one.
    score += KEYWORD_WEIGHT * Math.min(1, 0.6 + keyword.length * 0.1);
    reasons.push(keyword);
  }

  for (const { token, variants } of query.tokens) {
    let bestScore = 0;
    let bestText = '';
    let bestSpecificity = 0;
    let bestLength = 0;

    for (const variant of variants) {
      // Variants come longest-first; once a shorter one is reached and a match
      // is already in hand, nothing shorter can be more specific.
      if (bestScore > 0 && variant.text.length < bestLength) break;
      for (const field of fields) {
        if (!containsTerm(field.text, variant.text)) continue;
        const candidate = field.weight * variant.specificity;
        if (candidate > bestScore) {
          bestScore = candidate;
          bestText = variant.text;
          bestSpecificity = variant.specificity;
          bestLength = variant.text.length;
        }
      }
    }

    if (bestScore > 0) {
      score += bestScore;
      // A truncated Latin stem ("cleanroo") is meaningless to read, so the word
      // the user actually typed is shown instead. A CJK fragment is the
      // meaningful part of a particle-glued phrase, so it is kept as matched.
      const label = !CJK_PATTERN.test(token) && bestSpecificity < 1 ? token : bestText;
      if (!reasons.includes(label)) reasons.push(label);
    }
  }

  return { score, reasons: dedupeReasons(reasons) };
}

/**
 * Builds both indexes ahead of time.
 *
 * They are lazy so the chunk can load without paying for them, but building
 * them costs a few milliseconds — enough to be felt if it lands on the first
 * question. The panel calls this when it opens, while the user is still
 * reading the greeting.
 */
export function warmSearchIndex(): void {
  getIndex();
  getIndexByKey();
  getPresetIndex();
}

/** Ranked catalog entries for a free-text question. Empty when nothing fits. */
export function searchModules(query: string, limit = 4): ModuleMatch[] {
  const prepared = prepareQuery(query);
  if (prepared.tokens.length === 0) return [];

  const scored: ModuleMatch[] = [];
  for (const entry of getIndex()) {
    const { score, reasons } = scoreAgainst(entry.fields, entry.keywords, prepared);
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

interface PresetIndexEntry {
  preset: RecommendationPreset;
  fields: IndexedField[];
  keywords: readonly string[];
}

/** Same reasoning as `getIndex`, including the rebuild on a new language. */
let cachedPresetIndex: PresetIndexEntry[] | null = null;
let cachedPresetVersion = -1;

function getPresetIndex(): PresetIndexEntry[] {
  if (cachedPresetIndex && cachedPresetVersion === getCatalogVersion()) return cachedPresetIndex;
  cachedPresetVersion = getCatalogVersion();

  cachedPresetIndex = RECOMMENDATION_PRESETS.map((preset) => ({
    preset,
    keywords: PRESET_KEYWORDS[preset.id] ?? [],
    fields: [
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
    ]
  }));
  return cachedPresetIndex;
}

/** Presets ranked for the same question, so a whole bundle can be offered. */
export function searchPresets(query: string, limit = 1): PresetMatch[] {
  const prepared = prepareQuery(query);
  if (prepared.tokens.length === 0) return [];

  const scored: PresetMatch[] = getPresetIndex().map((entry) => ({
    preset: entry.preset,
    score: scoreAgainst(entry.fields, entry.keywords, prepared).score
  }));

  scored.sort((a, b) => b.score - a.score);
  return scored.filter((entry) => entry.score >= PRESET_MIN_SCORE).slice(0, limit);
}

function detectIntent<Id extends string>(
  intents: readonly IntentDefinition<Id>[],
  query: string
): IntentDefinition<Id> | null {
  const padded = ` ${normalize(query)} `;
  if (!padded.trim()) return null;

  let best: IntentDefinition<Id> | null = null;
  let bestLength = 0;
  for (const intent of intents) {
    for (const keyword of intent.keywords) {
      // Longest keyword wins: "의료기기" should beat a bare "기기" elsewhere.
      if (keyword.length > bestLength && containsTerm(padded, keyword)) {
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

let cachedIndexByKey: Map<string, IndexEntry> | null = null;

function getIndexByKey(): Map<string, IndexEntry> {
  // getIndex clears this whenever it rebuilds, so the two never disagree.
  const entries = getIndex();
  if (!cachedIndexByKey) {
    cachedIndexByKey = new Map(entries.map((entry) => [entry.key, entry]));
  }
  return cachedIndexByKey;
}

/** An index entry as a result with no score — the curated paths do not rank. */
function toMatch(entry: IndexEntry): ModuleMatch {
  return {
    key: entry.key,
    kind: entry.kind,
    app: entry.app,
    subModule: entry.subModule,
    score: 0,
    reasons: []
  };
}

/**
 * Catalog entries for an explicit id list, keeping the order given. Used by the
 * guided path, where the recommendation is curated rather than searched.
 */
export function resolveModules(ids: readonly string[]): ModuleMatch[] {
  const byKey = getIndexByKey();
  const matches: ModuleMatch[] = [];
  for (const id of ids) {
    const entry = byKey.get(id);
    if (entry) matches.push(toMatch(entry));
  }
  return matches;
}

/** Every entry, suite members included — the "just show me everything" answer. */
export function allModules(): ModuleMatch[] {
  return getIndex().map(toMatch);
}
