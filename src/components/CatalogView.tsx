import React, { useState, useMemo } from 'react';
import { AppItem, CartItem, RecommendationPreset, PoCTrial } from '../types';
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  FlaskConical,
  Layers,
  Factory,
  Target,
  Cpu,
  Rocket
} from 'lucide-react';
import { RECOMMENDATION_PRESETS } from '../data/presetsData';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { CurrencyCode, formatMoney } from '../lib/currency';
import { useExchangeRates } from '../lib/useExchangeRates';
import {
  getLocalizedAppName,
  getLocalizedAppCategory,
  getLocalizedAppDesc,
  getLocalizedPresetTitle,
  getLocalizedGrowthMetric,
  getLocalizedSubModuleName,
  getLocalizedDataScopeStd
} from '../i18n/localizedData';

interface CatalogViewProps {
  apps: AppItem[];
  cart: CartItem[];
  pocTrials?: PoCTrial[];
  onSelectApp: (app: AppItem) => void;
  onQuickToggleCart: (app: AppItem) => void;
  onApplyPoC?: (app: AppItem) => void;
  onGoToQuote: () => void;
  onApplyPreset?: (preset: RecommendationPreset) => void;
  lang: Language;
  currency: CurrencyCode;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  apps,
  cart,
  pocTrials = [],
  onSelectApp,
  onQuickToggleCart,
  onApplyPoC,
  onGoToQuote,
  onApplyPreset,
  lang,
  currency
}) => {
  const t = TRANSLATIONS[lang];
  const { snapshot: rateSnapshot } = useExchangeRates();
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');

  // Check for duplicate ArcMind vs Smart Factory suite
  const hasSmartFactoryInCart = cart.some((item) => item.appId === 'smartfactory');
  const hasArcMindInCart = cart.some((item) => item.id === 'arcmind');
  const hasConflict = hasSmartFactoryInCart && hasArcMindInCart;

  const categories = ['전체', 'Smart Factory', 'AI', 'LLM', '에너지', '시각화', '기반', '빌더'];

  /** The submodule a suite is recommended to be entered through, if any. */
  const landingSubModule = (app: AppItem) =>
    app.groups?.flatMap((g) => g.items).find((item) => item.landing);
  const isLandingApp = (app: AppItem) => Boolean(app.landing || landingSubModule(app));

  const filteredApps = useMemo(() => {
    const matched = apps.filter((app) => {
      // Category filter
      if (selectedCategory !== '전체' && app.category !== selectedCategory) {
        return false;
      }
      // Status filter
      if (selectedStatusFilter !== 'all' && app.status !== selectedStatusFilter) {
        return false;
      }
      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const localizedName = getLocalizedAppName(app, lang).toLowerCase();
        const localizedDesc = getLocalizedAppDesc(app, lang).toLowerCase();
        const localizedCat = getLocalizedAppCategory(app, lang).toLowerCase();
        const rawName = app.name.toLowerCase();
        const rawDesc = app.desc.toLowerCase();
        return (
          localizedName.includes(q) ||
          localizedDesc.includes(q) ||
          localizedCat.includes(q) ||
          rawName.includes(q) ||
          rawDesc.includes(q)
        );
      }
      return true;
    });
    // Recommended starting points lead the grid; the rest keep catalog order.
    return [...matched].sort(
      (a, b) => Number(isLandingApp(b)) - Number(isLandingApp(a))
    );
  }, [apps, selectedCategory, selectedStatusFilter, searchQuery, lang]);

  // Check if app or its submodules are in cart
  const isAppInCart = (app: AppItem) => {
    if (app.suite && app.groups) {
      const allItemIds = app.groups.flatMap((g) => g.items.map((i) => i.id));
      return cart.some((c) => allItemIds.includes(c.id));
    }
    return cart.some((c) => c.id === app.id);
  };

  const getStatusBadge = (status: AppItem['status']) => {
    switch (status) {
      case 'sub':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            {t.statusBadgeSub}
          </span>
        );
      case 'ready':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            {t.statusBadgeReady}
          </span>
        );
      case 'need':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            {t.statusBadgeNeed}
          </span>
        );
      case 'onprem':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            {t.statusBadgeOnprem}
          </span>
        );
    }
  };

  const formatPrice = (app: AppItem) => {
    if (app.suite) {
      return t.cardPerModulePricing;
    }
    if (!app.price) {
      return t.cardIncludedInBase;
    }
    return `${t.monthPrefix} ${formatMoney(app.price, currency, lang, rateSnapshot.rates)}~`;
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-xl p-6 md:p-8 shadow-sm border border-slate-700/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>{t.heroBadge}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white break-keep leading-snug">
              {t.heroTitle}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed break-keep">
              {t.heroDesc}
            </p>
          </div>

          <div className="bg-slate-800/80 backdrop-blur border border-slate-700 p-4 rounded-lg flex-shrink-0 text-xs space-y-2.5 min-w-[240px]">
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400">{t.baseFeeLabel}</span>
              <span className="font-mono font-bold text-white text-sm">{t.baseFeeValue}</span>
            </div>
            <div className="text-[11px] text-slate-400 border-t border-slate-700/80 pt-2 space-y-1">
              {t.baseFeeBullets.map((bullet, idx) => (
                <div key={idx} className="break-keep">{bullet}</div>
              ))}
            </div>
            {cart.length > 0 && (
              <button
                onClick={onGoToQuote}
                className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white py-2 px-3 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>{t.viewCartBtn} ({cart.length}{t.navItemsCount})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ArcMind vs MES Duplicate Conflict Alert Banner */}
      {hasConflict && (
        <div className="bg-amber-50 border-2 border-amber-300/90 rounded-xl p-4 text-amber-900 shadow-sm flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1.5 flex-1">
            <div className="font-bold text-xs sm:text-sm text-amber-950 flex items-center gap-1.5">
              <span>{t.arcMindNoticeTitle}</span>
              <span className="text-[10.5px] px-1.5 py-0.2 rounded bg-amber-200/80 text-amber-900 font-mono font-semibold">
                {t.duplicateReviewBadge}
              </span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed break-keep">
              {t.arcMindDuplicateWarning}
            </p>
          </div>
        </div>
      )}

      {/* Presets Recommendation Bar (Industry & Requirement) */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-2.5">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-md bg-blue-50 text-blue-600">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold text-slate-900 break-keep">
              {t.quickPresetTitle}
            </span>
            <span className="text-[11px] text-slate-500 hidden sm:inline break-keep">
              {t.quickPresetDesc}
            </span>
          </div>

          <button
            onClick={onGoToQuote}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors flex-shrink-0"
          >
            <span>{t.viewAllPresets}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {RECOMMENDATION_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                if (onApplyPreset) {
                  onApplyPreset(preset);
                  onGoToQuote();
                } else {
                  onGoToQuote();
                }
              }}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all text-slate-700 text-left group"
            >
              {preset.type === 'industry' ? (
                <Factory className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
              ) : (
                <Target className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
              )}
              <div className="min-w-0">
                <span className="font-semibold text-[11.5px] block truncate group-hover:text-blue-700 max-w-[200px] sm:max-w-none">
                  {getLocalizedPresetTitle(preset, lang)}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono flex-shrink-0">
                {preset.recommendedModules.length}{t.navItemsCount}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Recommended entry points for a first-time tenant */}
      <div className="flex items-start gap-2 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 text-[11.5px]">
        <Rocket className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed break-keep">{t.landingCatalogNote}</p>
      </div>

      {/* Filter and Search Controls */}
      <div className="space-y-3">
        {/* Category Pills */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {t.categoryLabels[cat] || cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-600">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <select
                aria-label={t.filterByStatus}
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="bg-transparent border-none outline-none text-xs text-slate-700 cursor-pointer"
              >
                <option value="all">{t.statusFilterAll}</option>
                <option value="ready">{t.statusFilterReady}</option>
                <option value="need">{t.statusFilterNeed}</option>
                <option value="onprem">{t.statusFilterOnprem}</option>
                <option value="sub">{t.statusFilterSub}</option>
              </select>
            </div>

            {/* Search Box */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg w-52 md:w-64 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-slate-800"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Apps */}
      {filteredApps.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center">
          <p className="text-slate-500 text-sm">
            {lang === 'ja'
              ? '一致するモジュールがありません。'
              : lang === 'en'
              ? 'No matching modules found.'
              : '일치하는 모듈이 없습니다.'}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('전체');
              setSearchQuery('');
              setSelectedStatusFilter('all');
            }}
            className="mt-2 text-xs text-blue-600 hover:underline font-medium"
          >
            {lang === 'ja'
              ? 'すべてのフィルターをリセット'
              : lang === 'en'
              ? 'Reset all filters'
              : '모든 필터 초기화'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredApps.map((app) => {
            const inCart = isAppInCart(app);
            const blockedDeps = app.deps.filter((d) => !d.ok).length;
            const localizedTitle = getLocalizedAppName(app, lang);
            const localizedCat = getLocalizedAppCategory(app, lang);
            const localizedDesc = getLocalizedAppDesc(app, lang);

            return (
              <div
                key={app.id}
                className={`bg-white rounded-xl border transition-all duration-200 flex flex-col justify-between hover:shadow-md ${
                  inCart
                    ? 'border-blue-500/80 ring-1 ring-blue-500/40'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="p-5 space-y-3">
                  {/* Top metadata */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        {localizedCat}
                      </span>
                      {isLandingApp(app) && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1 whitespace-nowrap">
                          <Rocket className="w-2.5 h-2.5 flex-shrink-0" />
                          {landingSubModule(app)
                            ? t.landingBadgeWith.replace(
                                '{module}',
                                getLocalizedSubModuleName(
                                  landingSubModule(app)!.id,
                                  landingSubModule(app)!.name,
                                  lang
                                )
                              )
                            : t.landingBadge}
                        </span>
                      )}
                      {pocTrials.some((trial) => trial.appId === app.id) && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 border border-indigo-200">
                          {t.pocBadgeActive}
                        </span>
                      )}
                    </div>
                    {getStatusBadge(app.status)}
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-1.5 flex-wrap break-keep">
                      <span>{localizedTitle}</span>
                      {app.suite && (
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-normal whitespace-nowrap">
                          {t.suiteBadgeText} ({app.groups ? app.groups.flatMap(g => g.items).length : 6}{t.navItemsCount.trim()})
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed break-keep">
                      {localizedDesc}
                    </p>
                  </div>

                  {/* Growth Metric Badge */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11.5px] text-slate-500">
                    <span className="text-slate-500">
                      {t.cardScalingMetric}
                    </span>
                    <span className="font-medium text-slate-700">{getLocalizedGrowthMetric(app.growthMetric, lang)}</span>
                  </div>

                  {/* ArcMind Special Distinction Badge */}
                  {app.id === 'arcmind' && (
                    <div className="p-2.5 rounded-lg bg-indigo-50/90 border border-indigo-200 text-indigo-950 text-[11px] space-y-1">
                      <div className="font-bold flex items-center gap-1 text-indigo-900">
                        <Cpu className="w-3.5 h-3.5 text-indigo-600" />
                        <span>
                          {t.arcMindCardBadge}
                        </span>
                      </div>
                      <p className="text-indigo-800 text-[10.5px] leading-relaxed break-keep">
                        {t.arcMindCardDesc}
                      </p>
                    </div>
                  )}

                  {/* Pre-conditions Preview */}
                  <div className="bg-slate-50 rounded-lg p-2.5 text-[11.5px] space-y-1 border border-slate-100">
                    <div className="text-slate-500 font-medium flex items-center justify-between">
                      <span>
                        {t.cardReadinessSummary}
                      </span>
                      {blockedDeps > 0 ? (
                        <span className="text-amber-700 font-semibold">
                          {t.cardConditionsUnmet.replace('{count}', String(blockedDeps))}
                        </span>
                      ) : (
                        <span className="text-emerald-700 font-semibold">
                          {t.cardConditionsReady}
                        </span>
                      )}
                    </div>
                    <div className="text-slate-600 truncate">
                      {t.cardSchemaMapping}{' '}
                      <strong>{app.dataScope.mappingProgress}% {t.cardComplete}</strong> (
                      {getLocalizedDataScopeStd(app.dataScope.schemaStd, lang)})
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-4 bg-slate-50/70 border-t border-slate-100 rounded-b-xl flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] text-slate-500 block">
                      {t.cardBilling}
                    </span>
                    <span className="text-xs font-semibold text-slate-800">
                      {formatPrice(app)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    {app.id !== 'b2lab' && (
                      <button
                        onClick={() => onApplyPoC?.(app)}
                        className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                          pocTrials.some((trial) => trial.appId === app.id)
                            ? 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border border-indigo-300'
                            : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
                        }`}
                        title={t.pocBtnTitle}
                      >
                        <FlaskConical className="w-3 h-3 text-indigo-600" />
                        <span>
                          {pocTrials.some((trial) => trial.appId === app.id)
                            ? `PoC D-${pocTrials.find((trial) => trial.appId === app.id)?.daysRemaining}`
                            : t.pocBtn14Days}
                        </span>
                      </button>
                    )}
                    <button
                      onClick={() => onSelectApp(app)}
                      className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-lg transition-colors"
                    >
                      {app.suite
                        ? t.cardInspectSuite
                        : t.viewDetails}
                    </button>
                    {!app.suite && app.id !== 'b2lab' && (
                      <button
                        onClick={() => onQuickToggleCart(app)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                          inCart
                            ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                            : 'bg-slate-900 text-white hover:bg-slate-800'
                        }`}
                      >
                        {inCart ? t.inCart : t.addToCart}
                      </button>
                    )}
                    {app.suite && (
                      <button
                        onClick={() => onSelectApp(app)}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <span>
                          {t.cardSelectModules}
                        </span>
                        <Layers className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
