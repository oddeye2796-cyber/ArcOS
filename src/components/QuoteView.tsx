import React, { useState } from 'react';
import { CartItem, RecommendationPreset } from '../types';
import { RECOMMENDATION_PRESETS } from '../data/presetsData';
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
  AlertTriangle
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';
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
  lang
}) => {
  const t = TRANSLATIONS[lang];
  const [presetTab, setPresetTab] = useState<'industry' | 'requirement'>('industry');
  const [productionLines, setProductionLines] = useState<number>(4);
  const [inferenceCalls, setInferenceCalls] = useState<number>(10);
  const [showQuotationPrintModal, setShowQuotationPrintModal] = useState(false);

  const BASE_PLATFORM_FEE = 400; // 400만원 고정 1층

  // Conflict Check
  const hasMesApp = cart.some((item) => item.id === 'mes-pharma' || item.id === 'mes-semi' || item.id === 'mes-discrete');
  const hasArcMind = cart.some((item) => item.id === 'arcmind-builder');
  const hasConflict = hasMesApp && hasArcMind;

  const handleResolveConflictKeepMES = () => {
    onRemoveItem('arcmind-builder');
  };

  const handleResolveConflictKeepArcMind = () => {
    cart
      .filter((item) => item.id === 'mes-pharma' || item.id === 'mes-semi' || item.id === 'mes-discrete')
      .forEach((item) => onRemoveItem(item.id));
  };

  // Module Subtotal (2층)
  const moduleSubtotal = cart.reduce((acc, item) => {
    if (item.per === 'line') {
      return acc + item.price * productionLines;
    }
    return acc + item.price;
  }, 0);

  // Volume Discount Rule
  const moduleCount = cart.length;
  let discountRate = 0;
  if (moduleCount >= 6) {
    discountRate = 0.10;
  } else if (moduleCount >= 4) {
    discountRate = 0.05;
  }

  const discountAmount = Math.round(moduleSubtotal * discountRate);
  const netModuleFee = moduleSubtotal - discountAmount;
  const grandTotal = BASE_PLATFORM_FEE + netModuleFee;

  const won = (val: number) => val.toLocaleString();

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
            const pModSubtotal = preset.recommendedModules.reduce((acc, m) => {
              return acc + (m.per === 'line' ? m.price * preset.recommendedLines : m.price);
            }, 0);
            const pDiscountRate =
              preset.recommendedModules.length >= 6
                ? 0.10
                : preset.recommendedModules.length >= 4
                ? 0.05
                : 0;
            const pDiscountAmt = Math.round(pModSubtotal * pDiscountRate);
            const pGrandTotal = BASE_PLATFORM_FEE + (pModSubtotal - pDiscountAmt);

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
                      {won(pGrandTotal)} {t.tenThousandWon}/{t.monthUnit}
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
                {t.monthPrefix} {won(BASE_PLATFORM_FEE)}{t.tenThousandWon}
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600 space-y-1 border border-slate-100">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <span className="font-medium text-slate-800 break-keep">
                  {lang === 'ja'
                    ? 'ArcOSポータル + B²LABオントロジーデータレイク + ArcOS Tools'
                    : lang === 'en'
                    ? 'ArcOS Portal + B²LAB Ontology Datalake + ArcOS Tools'
                    : 'ArcOS 포털 + B²LAB 온톨로지 데이터레이크 + ArcOS Tools'}
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold">{t.mandatoryPlatformInclude}</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed break-keep">
                {lang === 'ja'
                  ? 'AASおよびOPC-UAに基づくドメインDBオントロジー仮想化スキーマ、テナントSSO、ArcTunnel mTLS暗号化接続、基本ストレージ1TBを提供。'
                  : lang === 'en'
                  ? 'AAS & OPC-UA based domain DB ontology virtualization schema, tenant SSO, ArcTunnel mTLS encryption, 1TB base storage included.'
                  : 'AAS 및 OPC-UA 기반 도메인 DB 온톨로지 가상화 스키마, 테넌트 SSO, ArcTunnel mTLS 암호화 연결, 기본 데이터 저장 용량 1TB 제공.'}
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
                  const itemTotal = item.per === 'line' ? item.price * productionLines : item.price;
                  return (
                    <div
                      key={item.id}
                      className="py-3 flex items-center justify-between gap-4 text-xs"
                    >
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-900 flex items-center gap-2">
                          <span className="break-keep">{getLocalizedSubModuleName(item.id, item.name, lang)}</span>
                          <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded font-normal whitespace-nowrap">
                            {item.category}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5 break-keep">
                          {item.per === 'line'
                            ? `${item.price}${t.tenThousandWon} × ${productionLines}${t.linesCountUnit}`
                            : getLocalizedSubModuleUnit(item.id, item.unitLabel, lang)}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="font-mono font-bold text-slate-900 whitespace-nowrap">
                          {won(itemTotal)}{t.tenThousandWon}/{t.monthUnit}
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

            {/* Production Lines Slider */}
            <div className="space-y-2 bg-slate-50 p-3.5 rounded-lg border border-slate-100 text-xs">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <div>
                  <span className="font-semibold text-slate-800 break-keep">
                    {lang === 'ja' ? '生産ライン数 (MESコア連動成長軸)' : lang === 'en' ? 'Production Lines (MES Growth Metric)' : '생산 라인 수 (MES 코어 연동 성장 축)'}
                  </span>
                  <p className="text-[11px] text-slate-500 break-keep">
                    {lang === 'ja'
                      ? '工場内で稼働中の全製造ライン数に比例してMESコアの単価が計算されます。'
                      : lang === 'en'
                      ? 'MES core module price scales proportionally with the active plant lines.'
                      : '공장 내 가동 중인 전체 제조 라인 수에 비례하여 MES 코어 단가가 승산됩니다.'}
                  </p>
                </div>
                <span className="font-mono font-bold text-blue-700 text-sm bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                  {productionLines} {t.linesCountUnit}
                </span>
              </div>
              <input
                aria-label={lang === 'ja' ? '生産ライン数調整' : lang === 'en' ? 'Adjust production lines' : '생산 라인 수 조절'}
                type="range"
                min="1"
                max="20"
                value={productionLines}
                onChange={(e) => setProductionLines(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1 (Min)</span>
                <span>4 (Standard)</span>
                <span>10 (Mid-Large)</span>
                <span>20 (Enterprise)</span>
              </div>
            </div>

            {/* AI Inference Slider */}
            <div className="space-y-2 bg-slate-50 p-3.5 rounded-lg border border-slate-100 text-xs">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <div>
                  <span className="font-semibold text-slate-800 break-keep">
                    {lang === 'ja' ? 'AI推論コール量 (A²LAB MLOps 成長軸)' : lang === 'en' ? 'AI Inference Volume (A²LAB MLOps Metric)' : 'AI 추론 호출량 (A²LAB MLOps 성장 축)'}
                  </span>
                  <p className="text-[11px] text-slate-500 break-keep">
                    {lang === 'ja'
                      ? '品質予測・異常検知エージェントの月間推論呼び出し回数です (月10万件基本含む)。'
                      : lang === 'en'
                      ? 'Monthly agent inference requests for anomaly detection (100k included).'
                      : '품질 예측 및 이상 감지 에이전트의 월간 추론 호출 건수입니다 (10만 건 기본 포함).'}
                  </p>
                </div>
                <span className="font-mono font-bold text-indigo-700 text-sm bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200">
                  {inferenceCalls * 10}k {t.callsUnit}
                </span>
              </div>
              <input
                aria-label={lang === 'ja' ? 'AI推論コール量調整' : lang === 'en' ? 'Adjust AI inference calls' : 'AI 추론 호출량 조절'}
                type="range"
                min="5"
                max="100"
                step="5"
                value={inferenceCalls}
                onChange={(e) => setInferenceCalls(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>50k</span>
                <span>250k</span>
                <span>500k</span>
                <span>1,000k</span>
              </div>
            </div>
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
                  {won(BASE_PLATFORM_FEE)} {t.tenThousandWon}
                </span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span className="break-keep">{t.selectedModulesSubtotal} ({moduleCount}{t.itemsCountUnit})</span>
                <span className="font-mono text-white font-semibold">
                  {won(moduleSubtotal)} {t.tenThousandWon}
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
                      ? `-${won(discountAmount)} ${t.tenThousandWon} (${(discountRate * 100).toFixed(0)}%)`
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

            {/* Grand Total */}
            <div className="border-t border-slate-800 pt-4 space-y-1">
              <div className="text-xs text-slate-400">{t.finalTotalMonthly}</div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black font-mono tracking-tight text-blue-400">
                  {won(grandTotal)}
                </span>
                <span className="text-xs text-slate-300">{t.tenThousandWon} / {t.monthUnit}</span>
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
        </div>
      </div>

      {/* Official Quotation Modal */}
      {showQuotationPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
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
                    <th className="p-2.5 text-right">{t.monthlyPriceCol}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-2.5 font-medium">{t.basePlatformRowDesc}</td>
                    <td className="p-2.5 text-slate-500">{t.basePlatformRowQty}</td>
                    <td className="p-2.5 text-right font-mono">{won(BASE_PLATFORM_FEE)} {t.tenThousandWon}</td>
                  </tr>
                  {cart.map((c) => (
                    <tr key={c.id}>
                      <td className="p-2.5 font-medium">{getLocalizedSubModuleName(c.id, c.name, lang)}</td>
                      <td className="p-2.5 text-slate-500">
                        {c.per === 'line' ? `${productionLines} ${t.linesCountUnit}` : getLocalizedSubModuleUnit(c.id, c.unitLabel, lang)}
                      </td>
                      <td className="p-2.5 text-right font-mono">
                        {won(c.per === 'line' ? c.price * productionLines : c.price)} {t.tenThousandWon}
                      </td>
                    </tr>
                  ))}
                  {discountRate > 0 && (
                    <tr className="bg-emerald-50 text-emerald-800">
                      <td className="p-2.5 font-semibold">{t.volumeDiscountRowTitle.replace('{count}', String(moduleCount))}</td>
                      <td className="p-2.5">{t.discountAppliedRate.replace('{rate}', (discountRate * 100).toFixed(0))}</td>
                      <td className="p-2.5 text-right font-mono font-bold">-{won(discountAmount)} {t.tenThousandWon}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Grand Total Bar */}
            <div className="mt-4 p-3.5 bg-slate-900 text-white rounded-lg flex items-center justify-between text-xs">
              <span className="font-semibold">{t.finalTotalMonthly} ({t.vatNotice})</span>
              <span className="text-lg font-bold font-mono text-blue-400">
                {won(grandTotal)} {t.tenThousandWon} / {t.monthUnit}
              </span>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2">
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
