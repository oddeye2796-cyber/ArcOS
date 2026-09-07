import React, { useMemo, useState } from 'react';
import { CartItem, RecommendationPreset } from '../types';
import { RECOMMENDATION_PRESETS } from '../data/presetsData';
import { ARCMIND_ID, MES_CORE_IDS } from '../data/appsData';
import {
  Trash2,
  Sparkles,
  ArrowRight,
  Printer,
  FileSpreadsheet,
  CheckCircle2,
  Sliders,
  TrendingDown,
  Factory,
  Target,
  AlertTriangle,
  Save,
  Columns3,
  CalendarClock,
  X
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { CurrencyCode, exchangeRateNote, formatMoney } from '../lib/currency';
import { useExchangeRates } from '../lib/useExchangeRates';
import {
  BASE_PLATFORM_FEE,
  DEFAULT_GROWTH_METRICS,
  GROWTH_METRIC_RANGES,
  GrowthMetrics,
  computeQuote,
  growthFactor,
  lineItemTotal
} from '../lib/pricing';
import { STORAGE_KEYS, parsers, usePersistentState } from '../lib/storage';
import {
  CommitmentTerm,
  MONTHLY_MINIMUM_CHARGE,
  bindingCommitment,
  commitmentFor
} from '../lib/commitment';
import {
  MAX_SCENARIOS,
  QuoteScenario,
  createScenarioId,
  parseScenarios,
  scenarioLabel,
  unionModuleIds
} from '../lib/scenarios';
import { useModalDismiss } from '../lib/useModalDismiss';
import {
  getLocalizedPresetTitle,
  getLocalizedPresetSubtitle,
  getLocalizedPresetBadge,
  getLocalizedPresetDesc,
  getLocalizedPresetTarget,
  getLocalizedSubModuleName,
  getLocalizedSubModuleUnit,
  getLocalizedLocationName,
  getLocalizedTenantName
} from '../i18n/localizedData';

type AccentName = 'blue' | 'emerald' | 'amber' | 'indigo';

const ACCENT_STYLE: Record<AccentName, { readout: string; range: string }> = {
  blue: { readout: 'text-blue-700 bg-blue-50 border-blue-200', range: 'accent-blue-600' },
  emerald: { readout: 'text-emerald-700 bg-emerald-50 border-emerald-200', range: 'accent-emerald-600' },
  amber: { readout: 'text-amber-700 bg-amber-50 border-amber-200', range: 'accent-amber-600' },
  indigo: { readout: 'text-indigo-700 bg-indigo-50 border-indigo-200', range: 'accent-indigo-600' }
};

interface GrowthSliderProps {
  title: string;
  desc: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  /** Current value as the customer reads it, e.g. "350 points". */
  readout: string;
  /** Scale markers under the track. */
  ticks: string[];
  accent: AccentName;
  ariaLabel: string;
}

/** One growth axis: a labelled range input plus the value it currently bills at. */
const GrowthSlider: React.FC<GrowthSliderProps> = ({
  title,
  desc,
  value,
  onChange,
  min,
  max,
  step,
  readout,
  ticks,
  accent,
  ariaLabel
}) => (
  <div className="space-y-2 bg-slate-50 p-3.5 rounded-lg border border-slate-100 text-xs">
    <div className="flex justify-between items-center flex-wrap gap-2">
      <div className="min-w-0">
        <span className="font-semibold text-slate-800 break-keep">{title}</span>
        <p className="text-[11px] text-slate-500 break-keep leading-relaxed">{desc}</p>
      </div>
      <span
        className={`font-mono font-bold text-sm px-2.5 py-0.5 rounded border whitespace-nowrap ${ACCENT_STYLE[accent].readout}`}
      >
        {readout}
      </span>
    </div>
    <input
      aria-label={ariaLabel}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className={`w-full cursor-pointer ${ACCENT_STYLE[accent].range}`}
    />
    <div className="flex justify-between text-[10px] text-slate-400">
      {ticks.map((tick) => (
        <span key={tick}>{tick}</span>
      ))}
    </div>
  </div>
);

interface QuoteViewProps {
  cart: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onApplyPreset: (preset: RecommendationPreset) => void;
  onGoToCatalog: () => void;
  onBatchDeploy: () => void;
  tenantName: string;
  selectedLocation: string;
  lang: Language;
  currency: CurrencyCode;
}

export const QuoteView: React.FC<QuoteViewProps> = ({
  cart,
  onRemoveItem,
  onClearCart,
  onApplyPreset,
  onGoToCatalog,
  onBatchDeploy,
  tenantName,
  selectedLocation,
  lang,
  currency
}) => {
  const t = TRANSLATIONS[lang];
  const [presetTab, setPresetTab] = useState<'industry' | 'requirement'>('industry');
  const [productionLines, setProductionLines] = usePersistentState<number>(
    STORAGE_KEYS.productionLines,
    DEFAULT_GROWTH_METRICS.productionLines,
    parsers.numberInRange(GROWTH_METRIC_RANGES.productionLines.min, GROWTH_METRIC_RANGES.productionLines.max)
  );
  const [measurementPoints, setMeasurementPoints] = usePersistentState<number>(
    STORAGE_KEYS.measurementPoints,
    DEFAULT_GROWTH_METRICS.measurementPoints,
    parsers.numberInRange(GROWTH_METRIC_RANGES.measurementPoints.min, GROWTH_METRIC_RANGES.measurementPoints.max)
  );
  const [supplyPartners, setSupplyPartners] = usePersistentState<number>(
    STORAGE_KEYS.supplyPartners,
    DEFAULT_GROWTH_METRICS.supplyPartners,
    parsers.numberInRange(GROWTH_METRIC_RANGES.supplyPartners.min, GROWTH_METRIC_RANGES.supplyPartners.max)
  );
  const [inferenceCalls, setInferenceCalls] = usePersistentState<number>(
    STORAGE_KEYS.inferenceCalls,
    10,
    parsers.numberInRange(5, 100)
  );
  const [showQuotationPrintModal, setShowQuotationPrintModal] = useState(false);

  // Saved quote scenarios (plan A vs plan B).
  const [scenarios, setScenarios] = usePersistentState<QuoteScenario[]>(
    STORAGE_KEYS.scenarios,
    [],
    parseScenarios
  );
  const [isNamingScenario, setIsNamingScenario] = useState(false);
  const [scenarioName, setScenarioName] = useState('');
  const [showComparison, setShowComparison] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const comparisonDismiss = useModalDismiss<HTMLDivElement>(showComparison, () => setShowComparison(false));
  const quotationDismiss = useModalDismiss<HTMLDivElement>(showQuotationPrintModal, () =>
    setShowQuotationPrintModal(false)
  );

  // Conflict Check
  const hasMesApp = cart.some((item) => MES_CORE_IDS.includes(item.id));
  const hasArcMind = cart.some((item) => item.id === ARCMIND_ID);
  const hasConflict = hasMesApp && hasArcMind;

  const handleResolveConflictKeepMES = () => {
    onRemoveItem(ARCMIND_ID);
  };

  const handleResolveConflictKeepArcMind = () => {
    cart
      .filter((item) => MES_CORE_IDS.includes(item.id))
      .forEach((item) => onRemoveItem(item.id));
  };

  /** The three quantities every metered module is priced against. */
  const metrics: GrowthMetrics = useMemo(
    () => ({ productionLines, measurementPoints, supplyPartners }),
    [productionLines, measurementPoints, supplyPartners]
  );

  const growthSliders = [
    {
      key: 'lines' as const,
      titleKey: 'growthAxisLinesTitle' as const,
      descKey: 'growthAxisLinesDesc' as const,
      value: productionLines,
      onChange: setProductionLines,
      ...GROWTH_METRIC_RANGES.productionLines,
      readout: `${productionLines} ${t.linesCountUnit}`,
      ticks: ['1', '4', '10', '20'],
      accent: 'blue' as const
    },
    {
      key: 'points' as const,
      titleKey: 'growthAxisPointsTitle' as const,
      descKey: 'growthAxisPointsDesc' as const,
      value: measurementPoints,
      onChange: setMeasurementPoints,
      ...GROWTH_METRIC_RANGES.measurementPoints,
      readout: `${measurementPoints.toLocaleString()}${t.pointsCountUnit}`,
      ticks: ['50', '500', '1,000', '2,000'],
      accent: 'emerald' as const
    },
    {
      key: 'partners' as const,
      titleKey: 'growthAxisPartnersTitle' as const,
      descKey: 'growthAxisPartnersDesc' as const,
      value: supplyPartners,
      onChange: setSupplyPartners,
      ...GROWTH_METRIC_RANGES.supplyPartners,
      readout: `${supplyPartners}${t.partnersCountUnit}`,
      ticks: ['1', '25', '50', '100'],
      accent: 'amber' as const
    },
    {
      key: 'inference' as const,
      titleKey: 'growthAxisInferenceTitle' as const,
      descKey: 'growthAxisInferenceDesc' as const,
      value: inferenceCalls,
      onChange: setInferenceCalls,
      min: 5,
      max: 100,
      step: 5,
      readout: `${inferenceCalls * 10}k ${t.callsUnit}`,
      ticks: ['50k', '250k', '500k', '1,000k'],
      accent: 'indigo' as const
    }
  ];

  /** Quantity and unit shown beside a metered module, by billing unit. */
  const axisDisplay: Partial<Record<CartItem['per'], { qty: number; unit: string }>> = {
    line: { qty: productionLines, unit: t.linesCountUnit },
    point: { qty: measurementPoints, unit: t.pointsCountUnit },
    partner: { qty: supplyPartners, unit: t.partnersCountUnit }
  };

  /** "80만원 기준 · 4라인 (×4)" — how a metered line arrived at its total. */
  const meteredNote = (item: CartItem): string | null => {
    const display = axisDisplay[item.per];
    const factor = growthFactor(item.per, metrics);
    if (!display || factor === null) return null;
    return t.meteredBreakdown
      .replace('{base}', money(item.price))
      .replace('{qty}', display.qty.toLocaleString())
      .replace('{unit}', display.unit)
      .replace('{factor}', factor.toFixed(2).replace(/\.?0+$/, ''));
  };

  const commitmentLabel: Record<CommitmentTerm, string> = {
    annual: t.commitmentTermAnnual,
    quarterly: t.commitmentTermQuarterly,
    monthly: t.commitmentTermMonthly
  };

  /** Longest term in the cart — the one that actually binds the subscription. */
  const binding = bindingCommitment(cart);
  /** Shown only when the binding term does not already cover the usage floor. */
  const showUsageFloor = cart.some((item) => commitmentFor(item.id) === 'monthly');

  const { moduleCount, moduleSubtotal, discountRate, discountAmount, grandTotal } = useMemo(
    () => computeQuote(cart, metrics),
    [cart, metrics]
  );

  const { snapshot: rateSnapshot } = useExchangeRates();

  /** Formats a 만원-denominated figure in the currently selected currency. */
  const money = (units: number) => formatMoney(units, currency, lang, rateSnapshot.rates);
  const rateNote = exchangeRateNote(
    currency,
    lang,
    rateSnapshot.rates,
    rateSnapshot.asOf,
    rateSnapshot.source
  );

  const isPresetActive = (preset: RecommendationPreset) => {
    if (cart.length !== preset.recommendedModules.length) return false;
    const cartIds = new Set(cart.map((c) => c.id));
    return preset.recommendedModules.every((m) => cartIds.has(m.id));
  };

  const filteredPresets = RECOMMENDATION_PRESETS.filter((p) => p.type === presetTab);

  const handleApply = (preset: RecommendationPreset) => {
    setProductionLines(preset.recommendedLines);
    onApplyPreset(preset);
  };

  const flashToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 3200);
  };

  const atScenarioLimit = scenarios.length >= MAX_SCENARIOS;

  const handleStartSaveScenario = () => {
    setScenarioName(t.scenarioDefaultName.replace('{label}', scenarioLabel(scenarios.length)));
    setIsNamingScenario(true);
  };

  const handleConfirmSaveScenario = () => {
    const name = scenarioName.trim() || t.scenarioDefaultName.replace('{label}', scenarioLabel(scenarios.length));
    setScenarios((prev) => [
      ...prev,
      {
        id: createScenarioId(),
        name,
        savedAt: new Date().toISOString(),
        cart,
        metrics,
        inferenceCalls
      }
    ]);
    setIsNamingScenario(false);
    setScenarioName('');
    flashToast(t.scenarioSavedToast.replace('{name}', name));
  };

  /** Restores a scenario into the live quote. */
  const handleLoadScenario = (scenario: QuoteScenario) => {
    onApplyPreset({
      id: scenario.id,
      title: scenario.name,
      subtitle: '',
      type: 'requirement',
      targetAudience: '',
      badge: '',
      desc: '',
      highlights: [],
      recommendedLines: scenario.metrics.productionLines,
      recommendedModules: scenario.cart
    });
    setProductionLines(scenario.metrics.productionLines);
    setMeasurementPoints(scenario.metrics.measurementPoints);
    setSupplyPartners(scenario.metrics.supplyPartners);
    setInferenceCalls(scenario.inferenceCalls);
    flashToast(t.scenarioLoadedToast.replace('{name}', scenario.name));
  };

  const handleDeleteScenario = (id: string) => {
    setScenarios((prev) => prev.filter((scenario) => scenario.id !== id));
  };

  /** Totals per scenario, recomputed under the current pricing rules. */
  const scenarioTotals = useMemo(
    () => scenarios.map((scenario) => computeQuote(scenario.cart, scenario.metrics)),
    [scenarios]
  );
  const lowestTotal = scenarioTotals.length
    ? Math.min(...scenarioTotals.map((totals) => totals.grandTotal))
    : 0;
  // Only meaningful when the scenarios actually differ in price.
  const hasDistinctTotals = new Set(scenarioTotals.map((totals) => totals.grandTotal)).size > 1;
  const comparisonModuleIds = useMemo(() => unionModuleIds(scenarios), [scenarios]);
  /** id → display name, so the comparison rows do not rescan every cart. */
  const moduleNameById = useMemo(() => {
    const names = new Map<string, string>();
    for (const scenario of scenarios) {
      for (const item of scenario.cart) {
        if (!names.has(item.id)) names.set(item.id, item.name);
      }
    }
    return names;
  }, [scenarios]);

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              {t.threeTierBillingBadge}
            </span>
            <span className="text-xs text-slate-500 break-keep">{t.threeTierBillingSub}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1 tracking-tight break-keep">
            {t.quoteSimulatorTitle}
          </h1>
          <p className="text-xs text-slate-600 mt-0.5 break-keep">
            {t.quoteSimulatorSub}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowQuotationPrintModal(true)}
            disabled={cart.length === 0}
            className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50 whitespace-nowrap"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
            <span>{t.officialQuotePrint}</span>
          </button>
          <button
            onClick={onBatchDeploy}
            disabled={cart.length === 0}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50 whitespace-nowrap"
          >
            <span>{t.batchDeployBtn}</span>
            <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
          </button>
        </div>
      </div>

      {/* Recommendation Presets Section (Industry & Requirement) */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-2xl border border-slate-200/80 p-5 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/70 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-sm flex-shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 break-keep">
                {t.presetsHeading}
              </h2>
              <p className="text-[11px] text-slate-500 break-keep">
                {t.presetsSubheading}
              </p>
            </div>
          </div>

          {/* Preset Tabs: Industry vs Requirement */}
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 text-xs font-medium self-start sm:self-auto flex-wrap">
            <button
              onClick={() => setPresetTab('industry')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                presetTab === 'industry'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Factory className="w-3.5 h-3.5" />
              <span>{t.tabIndustry} ({RECOMMENDATION_PRESETS.filter((p) => p.type === 'industry').length})</span>
            </button>
            <button
              onClick={() => setPresetTab('requirement')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                presetTab === 'requirement'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>{t.tabRequirement} ({RECOMMENDATION_PRESETS.filter((p) => p.type === 'requirement').length})</span>
            </button>
          </div>
        </div>

        {/* Preset Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3.5">
          {filteredPresets.map((preset) => {
            const active = isPresetActive(preset);
            // A preset advertises a line count only, so the other axes preview
            // at their standard scale rather than at whatever the cart is on.
            const presetTotals = computeQuote(preset.recommendedModules, {
              ...DEFAULT_GROWTH_METRICS,
              productionLines: preset.recommendedLines
            });
            const pDiscountRate = presetTotals.discountRate;
            const pGrandTotal = presetTotals.grandTotal;

            return (
              <div
                key={preset.id}
                className={`p-4 rounded-xl border transition-all text-xs flex flex-col justify-between ${
                  active
                    ? 'bg-white border-blue-500 shadow-md ring-1 ring-blue-500/20'
                    : 'bg-white hover:border-slate-300 border-slate-200/90 shadow-sm'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-slate-900 text-[13px] break-keep">
                          {getLocalizedPresetTitle(preset, lang)}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                          {getLocalizedPresetBadge(preset, lang)}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 break-keep">
                        {getLocalizedPresetSubtitle(preset, lang)}
                      </div>
                    </div>
                    {active && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex-shrink-0">
                        <CheckCircle2 className="w-3 h-3" /> {t.appliedStatusBadge}
                      </span>
                    )}
                  </div>

                  <p className="text-[11.5px] text-slate-600 leading-relaxed break-keep">
                    {getLocalizedPresetDesc(preset, lang)}
                  </p>

                  <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 space-y-1.5">
                    <div className="text-[11px] text-slate-500 font-medium flex items-center justify-between flex-wrap gap-1">
                      <span>{t.recommendedTargetLabel}: {getLocalizedPresetTarget(preset, lang)}</span>
                      <span className="font-mono text-slate-700 font-semibold">{preset.recommendedLines}{t.linesStandard}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {preset.recommendedModules.map((mod) => (
                        <span
                          key={mod.id}
                          className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 text-[10.5px] font-medium"
                        >
                          {getLocalizedSubModuleName(mod.id, mod.name, lang)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
                  <div>
                    <span className="text-[10px] text-slate-400 block">{t.estimatedMonthlyTotal}</span>
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {money(pGrandTotal)}/{t.monthUnit}
                    </span>
                    {pDiscountRate > 0 && (
                      <span className="ml-1 text-[10px] text-emerald-600 font-medium">
                        ({(pDiscountRate * 100).toFixed(0)}% {t.discountAppliedBadge})
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleApply(preset)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                      active
                        ? 'bg-emerald-100 text-emerald-800 cursor-default'
                        : 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm'
                    }`}
                  >
                    {active ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{t.appliedStatusBadge}</span>
                      </>
                    ) : (
                      <>
                        <span>{t.applyPresetBtn}</span>
                        <ArrowRight className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Breakdown Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Tiers 1, 2, 3 Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Platform Base (1층 플랫폼 기본료) */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <h2 className="text-sm font-bold text-slate-900 break-keep">
                  {t.tier1Title}
                </h2>
              </div>
              <span className="text-xs font-mono font-bold text-slate-900">
                {t.monthPrefix} {money(BASE_PLATFORM_FEE)}
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600 space-y-1 border border-slate-100">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <span className="font-medium text-slate-800 break-keep">{t.tier1Composition}</span>
                <span className="text-[11px] text-emerald-700 font-semibold">{t.mandatoryPlatformInclude}</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed break-keep">
                {t.tier1CompositionDesc}
              </p>
            </div>
          </div>

          {/* Section 2: Selected Modules (2층 모듈별 과금) */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            {/* ArcMind vs MES Duplicate Warning */}
            {hasConflict && (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 text-amber-900 shadow-sm space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-xs sm:text-sm font-bold text-amber-950 break-keep">
                      {t.arcMindNoticeTitle}
                    </h4>
                    <p className="text-xs text-amber-800 leading-relaxed break-keep">
                      {t.arcMindDuplicateWarning}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 pl-7 pt-1">
                  <button
                    onClick={handleResolveConflictKeepMES}
                    className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded text-xs font-semibold shadow-xs transition-colors"
                  >
                    {lang === 'ja'
                      ? '既製MESスイートを維持 (ArcMindを除外)'
                      : lang === 'en'
                      ? 'Keep Prebuilt MES (Remove ArcMind)'
                      : '기성 MES 스위트 유지 (ArcMind 제외)'}
                  </button>
                  <button
                    onClick={handleResolveConflictKeepArcMind}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-semibold shadow-xs transition-colors"
                  >
                    {lang === 'ja'
                      ? '自社ITノーコード構築型を選択 (既製MESを除外)'
                      : lang === 'en'
                      ? 'Choose In-House No-Code (Remove Prebuilt MES)'
                      : '자체 IT 노코드 구축형 선택 (기성 MES 제외)'}
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                <h2 className="text-sm font-bold text-slate-900 break-keep">
                  {t.tier2Title} ({moduleCount}{t.itemsCountUnit})
                </h2>
              </div>
              {cart.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-xs text-slate-400 hover:text-red-600 flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3 h-3" /> {t.clearCartBtn}
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="py-8 text-center border border-dashed border-slate-200 rounded-lg">
                <p className="text-xs text-slate-500">{t.cartEmptyTitle}</p>
                <button
                  onClick={onGoToCatalog}
                  className="mt-2 text-xs font-semibold text-blue-600 hover:underline"
                >
                  {t.browseModules}
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {cart.map((item) => {
                  const itemTotal = lineItemTotal(item, metrics);
                  return (
                    <div
                      key={item.id}
                      className="py-3 flex items-center justify-between gap-4 text-xs"
                    >
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-900 flex items-center gap-2">
                          <span className="break-keep">{getLocalizedSubModuleName(item.id, item.name, lang)}</span>
                          <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded font-normal whitespace-nowrap">
                            {t.categoryLabels[item.category] || item.category}
                          </span>
                          <span className="text-[10px] text-slate-600 bg-white border border-slate-200 px-1.5 py-0.2 rounded font-normal whitespace-nowrap inline-flex items-center gap-1">
                            <CalendarClock className="w-2.5 h-2.5 flex-shrink-0" />
                            {commitmentLabel[commitmentFor(item.id)]}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5 break-keep">
                          {meteredNote(item) ?? getLocalizedSubModuleUnit(item.id, item.unitLabel, lang)}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="font-mono font-bold text-slate-900 whitespace-nowrap">
                          {money(itemTotal)}/{t.monthUnit}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                          title={lang === 'ja' ? '削除' : lang === 'en' ? 'Remove' : '삭제'}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section 3: Growth Metric Simulation (3층 자연 성장 축) */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sliders className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-900 break-keep">
                {t.tier3Title}
              </h2>
            </div>

            {growthSliders.map((slider) => (
              <GrowthSlider
                key={slider.key}
                title={t[slider.titleKey]}
                desc={t[slider.descKey]}
                value={slider.value}
                onChange={slider.onChange}
                min={slider.min}
                max={slider.max}
                step={slider.step}
                readout={slider.readout}
                ticks={slider.ticks}
                accent={slider.accent}
                ariaLabel={t[slider.titleKey]}
              />
            ))}
          </div>
        </div>

        {/* Right Col: Quote Summary Card */}
        <div className="space-y-5">
          <div className="bg-slate-900 text-white rounded-xl p-5 shadow-lg border border-slate-800 space-y-4 sticky top-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-semibold text-slate-300 break-keep">{t.quoteSummaryTitle}</span>
              <span className="text-[11px] text-blue-400 font-mono">{t.vatNotice}</span>
            </div>

            {/* Fee Breakdown */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-300">
                <span className="break-keep">{t.platformBaseFeeLabel}</span>
                <span className="font-mono text-white font-semibold">
                  {money(BASE_PLATFORM_FEE)}
                </span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span className="break-keep">{t.selectedModulesSubtotal} ({moduleCount}{t.itemsCountUnit})</span>
                <span className="font-mono text-white font-semibold">
                  {money(moduleSubtotal)}
                </span>
              </div>

              {/* Volume Discount Rule Display */}
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/80 space-y-1">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t.volumeDiscountLabel}</span>
                  </span>
                  <span
                    className={`font-mono font-bold ${
                      discountRate > 0 ? 'text-emerald-400' : 'text-slate-500'
                    }`}
                  >
                    {discountRate > 0
                      ? `-${money(discountAmount)} (${(discountRate * 100).toFixed(0)}%)`
                      : '0%'}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 break-keep">
                  {moduleCount >= 6
                    ? t.discount6Rule
                    : moduleCount >= 4
                    ? t.discount4Rule
                    : t.discountDefaultRule}
                </p>
              </div>
            </div>

            {/* Minimum commitment term binding this configuration */}
            {binding && (
              <div className="border-t border-slate-800 pt-3 space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 inline-flex items-center gap-1.5 break-keep">
                    <CalendarClock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    {t.commitmentSummaryLabel}
                  </span>
                  <span className="font-mono text-white font-semibold whitespace-nowrap">
                    {commitmentLabel[binding]}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 break-keep leading-relaxed">
                  {t.commitmentSummaryNote}
                  {showUsageFloor
                    ? ` ${t.commitmentUsageFloorNote.replace('{floor}', money(MONTHLY_MINIMUM_CHARGE))}`
                    : ''}
                </p>
              </div>
            )}

            {/* Grand Total */}
            <div className="border-t border-slate-800 pt-4 space-y-1">
              <div className="text-xs text-slate-400">{t.finalTotalMonthly}</div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black font-mono tracking-tight text-blue-400">
                  {money(grandTotal)}
                </span>
                <span className="text-xs text-slate-300">/ {t.monthUnit}</span>
              </div>
              <p className="text-[10px] text-slate-500 pt-1 break-keep">
                {t.quoteDisclaimers}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={onBatchDeploy}
                disabled={cart.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>{t.requestNodeDeploy}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setShowQuotationPrintModal(true)}
                disabled={cart.length === 0}
                className="w-full bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
              >
                <Printer className="w-3 h-3 text-slate-400" />
                <span>{t.officialQuotePrint}</span>
              </button>
            </div>
          </div>

          {/* Saved scenarios (plan A vs plan B) */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3">
            <div>
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 break-keep">
                <Columns3 className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                <span>{t.scenarioSectionTitle}</span>
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5 break-keep">{t.scenarioSectionSub}</p>
            </div>

            {isNamingScenario ? (
              <div className="space-y-2">
                <input
                  autoFocus
                  value={scenarioName}
                  onChange={(e) => setScenarioName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleConfirmSaveScenario();
                    if (e.key === 'Escape') setIsNamingScenario(false);
                  }}
                  placeholder={t.scenarioNamePlaceholder}
                  aria-label={t.scenarioNamePlaceholder}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleConfirmSaveScenario}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                  >
                    {t.scenarioSaveConfirm}
                  </button>
                  <button
                    onClick={() => setIsNamingScenario(false)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200 transition-colors"
                  >
                    {t.scenarioCancel}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleStartSaveScenario}
                  disabled={cart.length === 0 || atScenarioLimit}
                  title={atScenarioLimit ? t.scenarioLimitReached.replace('{max}', String(MAX_SCENARIOS)) : undefined}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold hover:bg-slate-200 disabled:opacity-50 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="break-keep">{t.scenarioSaveBtn}</span>
                </button>
                <button
                  onClick={() => setShowComparison(true)}
                  disabled={scenarios.length < 2}
                  title={scenarios.length < 2 ? t.scenarioNeedTwo : undefined}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 disabled:opacity-50 transition-colors whitespace-nowrap"
                >
                  {t.scenarioCompareBtn}
                </button>
              </div>
            )}

            {atScenarioLimit && (
              <p className="text-[10.5px] text-amber-700 bg-amber-50 border border-amber-200 rounded p-2 break-keep">
                {t.scenarioLimitReached.replace('{max}', String(MAX_SCENARIOS))}
              </p>
            )}

            {scenarios.length === 0 ? (
              <p className="text-[11px] text-slate-500 border border-dashed border-slate-200 rounded-lg p-3 break-keep">
                {t.scenarioEmptyHint}
              </p>
            ) : (
              <ul className="space-y-1.5">
                {scenarios.map((scenario, idx) => (
                  <li
                    key={scenario.id}
                    className="flex items-center justify-between gap-2 p-2 rounded-lg border border-slate-200 bg-slate-50/70"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                          {scenarioLabel(idx)}
                        </span>
                        <span className="text-[11.5px] font-semibold text-slate-900 truncate">
                          {scenario.name}
                        </span>
                      </div>
                      <span className="text-[10.5px] text-slate-500 font-mono">
                        {money(scenarioTotals[idx].grandTotal)}/{t.monthUnit}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => handleLoadScenario(scenario)}
                        className="px-2 py-1 rounded text-[10.5px] font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
                      >
                        {t.scenarioLoadBtn}
                      </button>
                      <button
                        onClick={() => handleDeleteScenario(scenario.id)}
                        aria-label={t.scenarioDeleteBtn}
                        className="p-1 rounded text-slate-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-[60] max-w-sm bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-bottom-2 break-keep">
          {toast}
        </div>
      )}

      {/* Scenario Comparison Modal */}
      {showComparison && (
        <div
          ref={comparisonDismiss.backdropRef}
          onMouseDown={comparisonDismiss.onBackdropMouseDown}
          onClick={comparisonDismiss.onBackdropClick}
          role="presentation"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t.scenarioCompareTitle}
            className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 break-keep">
                  <Columns3 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>{t.scenarioCompareTitle}</span>
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5 break-keep">{t.scenarioCompareSub}</p>
              </div>
              <button
                onClick={() => setShowComparison(false)}
                aria-label={t.closeBtn}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5 min-w-[10rem]">{t.scenarioColItem}</th>
                    {scenarios.map((scenario, idx) => (
                      <th key={scenario.id} className="p-2.5 min-w-[9rem]">
                        <div className="flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                            {scenarioLabel(idx)}
                          </span>
                          <span className="truncate">{scenario.name}</span>
                        </div>
                        {hasDistinctTotals && scenarioTotals[idx].grandTotal === lowestTotal && (
                          <span className="mt-1 inline-block px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                            {t.scenarioLowestBadge}
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-2.5 text-slate-500">{t.scenarioRowLines}</td>
                    {scenarios.map((scenario) => (
                      <td key={scenario.id} className="p-2.5 font-mono text-slate-800">
                        {scenario.metrics.productionLines} {t.linesCountUnit}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-2.5 text-slate-500">{t.scenarioRowModules}</td>
                    {scenarioTotals.map((totals, idx) => (
                      <td key={scenarios[idx].id} className="p-2.5 font-mono text-slate-800">
                        {totals.moduleCount} {t.itemsCountUnit}
                      </td>
                    ))}
                  </tr>

                  {comparisonModuleIds.map((moduleId) => (
                    <tr key={moduleId}>
                      <td className="p-2.5 font-medium text-slate-800">
                        {getLocalizedSubModuleName(moduleId, moduleNameById.get(moduleId) ?? moduleId, lang)}
                      </td>
                      {scenarios.map((scenario) => {
                        const item = scenario.cart.find((c) => c.id === moduleId);
                        return (
                          <td key={scenario.id} className="p-2.5 font-mono">
                            {item ? (
                              <span className="text-slate-800">
                                {money(lineItemTotal(item, scenario.metrics))}
                              </span>
                            ) : (
                              <span className="text-slate-400">{t.scenarioNotIncluded}</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}

                  <tr className="bg-slate-50">
                    <td className="p-2.5 font-semibold text-slate-700">{t.scenarioRowBaseFee}</td>
                    {scenarios.map((scenario) => (
                      <td key={scenario.id} className="p-2.5 font-mono text-slate-800">
                        {money(BASE_PLATFORM_FEE)}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-2.5 font-semibold text-slate-700">{t.scenarioRowSubtotal}</td>
                    {scenarioTotals.map((totals, idx) => (
                      <td key={scenarios[idx].id} className="p-2.5 font-mono text-slate-800">
                        {money(totals.moduleSubtotal)}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-emerald-50/60 text-emerald-800">
                    <td className="p-2.5 font-semibold">{t.scenarioRowDiscount}</td>
                    {scenarioTotals.map((totals, idx) => (
                      <td key={scenarios[idx].id} className="p-2.5 font-mono font-semibold">
                        {totals.discountRate > 0
                          ? `-${money(totals.discountAmount)} (${(totals.discountRate * 100).toFixed(0)}%)`
                          : '—'}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-slate-900 text-white">
                    <td className="p-3 font-bold">{t.scenarioRowTotal}</td>
                    {scenarioTotals.map((totals, idx) => {
                      const delta = totals.grandTotal - lowestTotal;
                      return (
                        <td key={scenarios[idx].id} className="p-3 font-mono font-bold">
                          <div className="text-blue-300 text-sm">{money(totals.grandTotal)}</div>
                          {delta > 0 && (
                            <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                              +{money(delta)} {t.scenarioDiffVsLowest}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>

            {binding && (
              <p className="mt-3 text-[10.5px] text-slate-500 break-keep leading-relaxed">
                {t.commitmentSummaryLabel}: {commitmentLabel[binding]} — {t.commitmentSummaryNote}
                {showUsageFloor
                  ? ` ${t.commitmentUsageFloorNote.replace('{floor}', money(MONTHLY_MINIMUM_CHARGE))}`
                  : ''}
              </p>
            )}

            {rateNote && (
              <p className="mt-3 text-[10.5px] text-slate-500 break-keep">{rateNote}</p>
            )}
          </div>
        </div>
      )}

      {/* Official Quotation Modal */}
      {showQuotationPrintModal && (
        <div
          ref={quotationDismiss.backdropRef}
          onMouseDown={quotationDismiss.onBackdropMouseDown}
          onClick={quotationDismiss.onBackdropClick}
          role="presentation"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t.quotationTitle}
            data-print-root
            className="bg-white rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                  A
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 break-keep">
                    {t.quotationTitle}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-mono">
                    {t.quotationNo}: ARC-QT-{Date.now().toString().slice(-6)}
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-semibold">
                {t.officialSubmissionLabel}
              </span>
            </div>

            {/* Target Client & Plant */}
            <div className="my-4 p-3.5 bg-slate-50 rounded-lg text-xs space-y-1.5 border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">{t.customerTenant}</span>
                <span className="font-bold text-slate-900">{getLocalizedTenantName(tenantName, lang)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{t.targetFacility}</span>
                <span className="font-medium text-slate-900">{getLocalizedLocationName(selectedLocation, lang)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{t.deploymentModelLabel}</span>
                <span className="font-medium text-slate-900">{t.hybridModelDesc}</span>
              </div>
            </div>

            {/* Table */}
            <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">{t.itemCol}</th>
                    <th className="p-2.5">{t.quantityCriterionCol}</th>
                    <th className="p-2.5">{t.commitmentQuotationRow}</th>
                    <th className="p-2.5 text-right">{t.monthlyPriceCol}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-2.5 font-medium">{t.basePlatformRowDesc}</td>
                    <td className="p-2.5 text-slate-500">{t.basePlatformRowQty}</td>
                    <td className="p-2.5 text-slate-500">
                      {binding ? commitmentLabel[binding] : commitmentLabel.monthly}
                    </td>
                    <td className="p-2.5 text-right font-mono">{money(BASE_PLATFORM_FEE)}</td>
                  </tr>
                  {cart.map((c) => (
                    <tr key={c.id}>
                      <td className="p-2.5 font-medium">{getLocalizedSubModuleName(c.id, c.name, lang)}</td>
                      <td className="p-2.5 text-slate-500">
                        {axisDisplay[c.per]
                          ? `${axisDisplay[c.per]!.qty} ${axisDisplay[c.per]!.unit}`
                          : getLocalizedSubModuleUnit(c.id, c.unitLabel, lang)}
                      </td>
                      <td className="p-2.5 text-slate-500">{commitmentLabel[commitmentFor(c.id)]}</td>
                      <td className="p-2.5 text-right font-mono">
                        {money(lineItemTotal(c, metrics))}
                      </td>
                    </tr>
                  ))}
                  {discountRate > 0 && (
                    <tr className="bg-emerald-50 text-emerald-800">
                      <td className="p-2.5 font-semibold">{t.volumeDiscountRowTitle.replace('{count}', String(moduleCount))}</td>
                      <td className="p-2.5">{t.discountAppliedRate.replace('{rate}', (discountRate * 100).toFixed(0))}</td>
                      <td className="p-2.5" />
                      <td className="p-2.5 text-right font-mono font-bold">-{money(discountAmount)}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Grand Total Bar */}
            <div className="mt-4 p-3.5 bg-slate-900 text-white rounded-lg flex items-center justify-between text-xs" data-print-keep>
              <span className="font-semibold">{t.finalTotalMonthly} ({t.vatNotice})</span>
              <span className="text-lg font-bold font-mono text-blue-400">
                {money(grandTotal)} / {t.monthUnit}
              </span>
            </div>

            {binding && (
              <p className="mt-3 text-[10.5px] text-slate-500 break-keep leading-relaxed">
                {t.commitmentSummaryLabel}: {commitmentLabel[binding]} — {t.commitmentSummaryNote}
                {showUsageFloor
                  ? ` ${t.commitmentUsageFloorNote.replace('{floor}', money(MONTHLY_MINIMUM_CHARGE))}`
                  : ''}
              </p>
            )}

            {rateNote && (
              <p className="mt-3 text-[10.5px] text-slate-500 break-keep">{rateNote}</p>
            )}

            <div className="mt-6 flex items-center justify-end gap-2" data-print-hide>
              <button
                onClick={() => setShowQuotationPrintModal(false)}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                {t.closeBtn}
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center gap-1.5"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>{t.printSavePdfBtn}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
