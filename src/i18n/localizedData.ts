import { Language } from './translations';
import { AppItem, RecommendationPreset, FacilityLocation } from '../types';

interface LocalizedString {
  ko: string;
  en: string;
  ja: string;
}

interface AppLocalization {
  name?: LocalizedString;
  categoryLabel?: LocalizedString;
  desc?: LocalizedString;
  detail?: LocalizedString;
  unit?: LocalizedString;
}

const APP_LOCALIZATIONS: Record<string, AppLocalization> = {};

const SUBMODULE_LOCALIZATIONS: Record<string, { name: LocalizedString; desc: LocalizedString; unitLabel: LocalizedString }> = {};

const GROUP_LABEL_LOCALIZATIONS: Record<string, LocalizedString> = {};

const DEP_LOCALIZATIONS: Record<string, { name: LocalizedString; desc: LocalizedString }> = {};

const DATASCOPE_LOCALIZATIONS: Record<string, LocalizedString> = {};

const PERMISSION_LOCALIZATIONS: Record<string, LocalizedString> = {};

const LOCATION_LOCALIZATIONS: Record<string, LocalizedString> = {};

const TENANT_LOCALIZATIONS: Record<string, LocalizedString> = {};

const PRESET_LOCALIZATIONS: Record<string, {
  title: LocalizedString;
  subtitle: LocalizedString;
  badge: LocalizedString;
  desc: LocalizedString;
  targetAudience: LocalizedString;
}> = {};

const FACILITY_LOCALIZATIONS: Record<string, { fullName: LocalizedString; subTitle: LocalizedString }> = {};

/**
 * One language's slice of the catalog tables.
 *
 * The tables above hold every loaded language side by side, exactly as the
 * hand-written literals used to; `installCatalogStrings` merges one language
 * into them. That is why the getters below are unchanged — they still read
 * `TABLE[id].field[lang]`, it is just that only the languages actually
 * downloaded are present.
 */
export interface CatalogStrings {
  apps: Record<string, Partial<Record<'name' | 'categoryLabel' | 'desc' | 'detail' | 'unit', string>>>;
  subModules: Record<string, Partial<Record<'name' | 'desc' | 'unitLabel', string>>>;
  groupLabels: Record<string, string>;
  deps: Record<string, Partial<Record<'name' | 'desc', string>>>;
  dataScopes: Record<string, string>;
  permissions: Record<string, string>;
  locations: Record<string, string>;
  tenants: Record<string, string>;
  presets: Record<string, Partial<Record<'title' | 'subtitle' | 'badge' | 'desc' | 'targetAudience', string>>>;
  facilities: Record<string, Partial<Record<'fullName' | 'subTitle', string>>>;
  depDescriptions: Record<string, string>;
  workspace: Record<string, string>;
  growthMetrics: Record<string, string>;
}

/** Which languages have been merged in, so a reload can be skipped. */
const loadedLanguages = new Set<Language>();

/**
 * Bumped whenever a language arrives. Anything that caches work derived from
 * these tables — the module finder's search index — watches this to know its
 * cache is stale.
 */
let catalogVersion = 0;

export function getCatalogVersion(): number {
  return catalogVersion;
}

export function isCatalogLoaded(lang: Language): boolean {
  return loadedLanguages.has(lang);
}

function mergeFlat(
  target: Record<string, LocalizedString>,
  source: Record<string, string>,
  lang: Language
): void {
  for (const [id, value] of Object.entries(source)) {
    const entry = target[id] ?? ({} as LocalizedString);
    entry[lang] = value;
    target[id] = entry;
  }
}

function mergeFields(
  target: Record<string, Record<string, LocalizedString>>,
  source: Record<string, Record<string, string>>,
  lang: Language
): void {
  for (const [id, fields] of Object.entries(source)) {
    const entry = target[id] ?? {};
    for (const [field, value] of Object.entries(fields)) {
      const localized = entry[field] ?? ({} as LocalizedString);
      localized[lang] = value;
      entry[field] = localized;
    }
    target[id] = entry;
  }
}

/** Merges one language's strings into the tables the getters read. */
export function installCatalogStrings(lang: Language, strings: CatalogStrings): void {
  if (loadedLanguages.has(lang)) return;

  mergeFields(APP_LOCALIZATIONS as never, strings.apps, lang);
  mergeFields(SUBMODULE_LOCALIZATIONS as never, strings.subModules, lang);
  mergeFlat(GROUP_LABEL_LOCALIZATIONS, strings.groupLabels, lang);
  mergeFields(DEP_LOCALIZATIONS as never, strings.deps, lang);
  mergeFlat(DATASCOPE_LOCALIZATIONS, strings.dataScopes, lang);
  mergeFlat(PERMISSION_LOCALIZATIONS, strings.permissions, lang);
  mergeFlat(LOCATION_LOCALIZATIONS, strings.locations, lang);
  mergeFlat(TENANT_LOCALIZATIONS, strings.tenants, lang);
  mergeFields(PRESET_LOCALIZATIONS as never, strings.presets, lang);
  mergeFields(FACILITY_LOCALIZATIONS as never, strings.facilities, lang);
  mergeFlat(DEP_DESC_LOCALIZATIONS, strings.depDescriptions, lang);
  mergeFlat(WORKSPACE_LOCALIZATIONS, strings.workspace, lang);
  mergeFlat(GROWTH_METRIC_LOCALIZATIONS, strings.growthMetrics, lang);

  loadedLanguages.add(lang);
  catalogVersion += 1;
}

export function getLocalizedAppName(app: AppItem, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const loc = APP_LOCALIZATIONS[app.id];
  if (loc && loc.name && loc.name[l]) {
    return loc.name[l];
  }
  return app.name;
}

export function getLocalizedAppCategory(app: AppItem, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const loc = APP_LOCALIZATIONS[app.id];
  if (loc && loc.categoryLabel && loc.categoryLabel[l]) {
    return loc.categoryLabel[l];
  }
  return app.categoryLabel;
}

export function getLocalizedAppDesc(app: AppItem, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const loc = APP_LOCALIZATIONS[app.id];
  if (loc && loc.desc && loc.desc[l]) {
    return loc.desc[l];
  }
  return app.desc;
}

export function getLocalizedAppDetail(app: AppItem, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const loc = APP_LOCALIZATIONS[app.id];
  if (loc && loc.detail && loc.detail[l]) {
    return loc.detail[l];
  }
  return app.detail;
}

export function getLocalizedAppUnit(app: AppItem, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const loc = APP_LOCALIZATIONS[app.id];
  if (loc && loc.unit && loc.unit[l]) {
    return loc.unit[l];
  }
  return app.unit;
}

export function getLocalizedSubModuleName(subId: string, fallback: string, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const item = SUBMODULE_LOCALIZATIONS[subId];
  if (item && item.name && item.name[l]) {
    return item.name[l];
  }
  // Preset cart items reuse app ids that only exist in the app catalog. Korean keeps
  // the caller's own wording; other languages fall back to the catalog translation.
  const app = APP_LOCALIZATIONS[subId];
  if (l !== 'ko' && app && app.name && app.name[l]) {
    return app.name[l];
  }
  return fallback;
}

/**
 * Display label for a bare module id, for places that have an id and no source
 * name of their own — the resource library's "related modules" chips, say.
 *
 * Unlike `getLocalizedSubModuleName` this resolves the app catalog in Korean
 * too: there the caller's fallback is the raw id, not wording worth keeping.
 */
export function getLocalizedModuleLabel(moduleId: string, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const sub = SUBMODULE_LOCALIZATIONS[moduleId];
  if (sub && sub.name && sub.name[l]) {
    return sub.name[l];
  }
  const app = APP_LOCALIZATIONS[moduleId];
  if (app && app.name && app.name[l]) {
    return app.name[l];
  }
  return moduleId;
}

export function getLocalizedSubModuleDesc(subId: string, fallback: string, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const item = SUBMODULE_LOCALIZATIONS[subId];
  if (item && item.desc && item.desc[l]) {
    return item.desc[l];
  }
  return fallback;
}

export function getLocalizedSubModuleUnit(subId: string, fallback: string, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const item = SUBMODULE_LOCALIZATIONS[subId];
  if (item && item.unitLabel && item.unitLabel[l]) {
    return item.unitLabel[l];
  }
  const app = APP_LOCALIZATIONS[subId];
  if (l !== 'ko' && app && app.unit && app.unit[l]) {
    return app.unit[l];
  }
  return fallback;
}

export function getLocalizedGroupLabel(label: string, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const item = GROUP_LABEL_LOCALIZATIONS[label];
  if (item && item[l]) {
    return item[l];
  }
  return label;
}

const DEP_DESC_LOCALIZATIONS: Record<string, LocalizedString> = {};

export function getLocalizedDepName(name: string, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const item = DEP_LOCALIZATIONS[name];
  if (item && item.name && item.name[l]) {
    return item.name[l];
  }
  return name;
}

export function getLocalizedDepDesc(desc: string, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const extra = DEP_DESC_LOCALIZATIONS[desc];
  if (extra) {
    return extra[l];
  }
  for (const key of Object.keys(DEP_LOCALIZATIONS)) {
    const entry = DEP_LOCALIZATIONS[key];
    if (entry.desc.ko === desc || entry.desc.en === desc || entry.desc.ja === desc) {
      return entry.desc[l];
    }
  }
  return desc;
}

export function getLocalizedDataScopeDb(db: string, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const item = DATASCOPE_LOCALIZATIONS[db];
  if (item && item[l]) {
    return item[l];
  }
  return db;
}

export function getLocalizedDataScopeStd(std: string, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const item = DATASCOPE_LOCALIZATIONS[std];
  if (item && item[l]) {
    return item[l];
  }
  return std;
}

export function getLocalizedPermissionScope(scope: string, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const item = PERMISSION_LOCALIZATIONS[scope];
  if (item && item[l]) {
    return item[l];
  }
  return scope;
}

export function getLocalizedLocationName(location: string, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const item = LOCATION_LOCALIZATIONS[location];
  if (item && item[l]) {
    return item[l];
  }
  return location;
}

export function getLocalizedTenantName(tenant: string, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const item = TENANT_LOCALIZATIONS[tenant];
  if (item && item[l]) {
    return item[l];
  }
  return tenant;
}

export function getLocalizedPresetTitle(preset: RecommendationPreset, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const loc = PRESET_LOCALIZATIONS[preset.id];
  if (loc && loc.title && loc.title[l]) {
    return loc.title[l];
  }
  return preset.title;
}

export function getLocalizedPresetSubtitle(preset: RecommendationPreset, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const loc = PRESET_LOCALIZATIONS[preset.id];
  if (loc && loc.subtitle && loc.subtitle[l]) {
    return loc.subtitle[l];
  }
  return preset.subtitle;
}

export function getLocalizedPresetBadge(preset: RecommendationPreset, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const loc = PRESET_LOCALIZATIONS[preset.id];
  if (loc && loc.badge && loc.badge[l]) {
    return loc.badge[l];
  }
  return preset.badge;
}

export function getLocalizedPresetDesc(preset: RecommendationPreset, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const loc = PRESET_LOCALIZATIONS[preset.id];
  if (loc && loc.desc && loc.desc[l]) {
    return loc.desc[l];
  }
  return preset.desc;
}

export function getLocalizedPresetTarget(preset: RecommendationPreset, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const loc = PRESET_LOCALIZATIONS[preset.id];
  if (loc && loc.targetAudience && loc.targetAudience[l]) {
    return loc.targetAudience[l];
  }
  return preset.targetAudience;
}

export function getLocalizedFacilityName(facility: FacilityLocation, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const loc = FACILITY_LOCALIZATIONS[facility.id];
  if (loc && loc.fullName && loc.fullName[l]) {
    return loc.fullName[l];
  }
  return facility.fullName;
}


/**
 * Workspace-facing strings are stored on the runtime state objects (installed
 * modules, decommissioned modules, PoC trials) as their Korean canonical form,
 * including the ones App/PoCApplyModal generate at runtime. They are keyed here
 * by that canonical text and translated at render time.
 */
const WORKSPACE_LOCALIZATIONS: Record<string, LocalizedString> = {};

export function getLocalizedWorkspaceText(text: string, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  return WORKSPACE_LOCALIZATIONS[text]?.[l] || text;
}

const GROWTH_METRIC_LOCALIZATIONS: Record<string, LocalizedString> = {};

export function getLocalizedGrowthMetric(metric: string, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  return GROWTH_METRIC_LOCALIZATIONS[metric]?.[l] || metric;
}
