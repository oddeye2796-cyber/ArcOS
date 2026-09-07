import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Server,
  Cloud,
  ArrowRight,
  ShieldCheck,
  Building2,
  Clock,
  Sparkles,
  FlaskConical,
  Lock,
  Database,
  Info,
  Check,
  Cpu,
  Layers
} from 'lucide-react';
import { AppItem, FacilityLocation, PoCTrial } from '../types';
import { FACILITIES_LIST } from '../data/presetsData';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { useModalDismiss } from '../lib/useModalDismiss';
import { getLocalizedAppName, getLocalizedFacilityName, getLocalizedLocationName } from '../i18n/localizedData';

interface PoCApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetApp?: AppItem | null;
  app?: AppItem | null;
  initialLocation?: string;
  selectedLocation?: string;
  onConfirmPoC?: (trial: PoCTrial) => void;
  onApplySuccess?: (trial: PoCTrial) => void;
  onGoToWorkspace?: () => void;
  lang?: Language;
}

export const PoCApplyModal: React.FC<PoCApplyModalProps> = ({
  isOpen,
  onClose,
  targetApp,
  app,
  initialLocation,
  selectedLocation,
  onConfirmPoC,
  onApplySuccess,
  onGoToWorkspace,
  lang = 'ko'
}) => {
  const effectiveApp = targetApp || app;
  const t = TRANSLATIONS[lang];
  const getDefaultPocGoal = (currentLang: Language | string, cat: string) => {
    if (currentLang === 'ja') {
      return cat === 'AI'
        ? 'AI欠陥・異常検知精度(>98%)および誤検知率の事前検証'
        : cat === 'Smart Factory'
        ? '工程LOTリアルタイム追跡およびオントロジー基準の生産指標無停止集計検証'
        : cat === '에너지' || cat === 'Energy' || cat === 'エネルギー'
        ? 'ピーク電力削減アルゴリズムのシミュレーションおよび月間8%エネルギーコスト削減の実証'
        : '社内オンプレミスオントロジー連係整合性および作業員使いやすさの事前検証';
    }
    if (currentLang === 'en') {
      return cat === 'AI'
        ? 'Benchmark real-time defect/anomaly detection accuracy (>98%) and false-positive rates'
        : cat === 'Smart Factory'
        ? 'Real-time LOT tracking and ontology-based production metric zero-downtime aggregation'
        : cat === '에너지' || cat === 'Energy'
        ? 'Simulate peak demand shaving algorithm and validate 8% monthly power cost savings'
        : 'Verify in-house on-premise ontology mapping integrity and operator usability';
    }
    return cat === 'AI'
      ? '실시간 결함/이상 감지 정확도 98% 이상 검증 및 오탐률 사전 측정'
      : cat === 'Smart Factory'
      ? '공정 LOT 실시간 추적 및 온톨로지 기반 생산 지표 무중단 집계 검증'
      : cat === '에너지'
      ? '피크 전력 감축 알고리즘 시뮬레이션 및 월 8% 에너지 비용 절감 실증'
      : '사내 온프레미스 온톨로지 연동 정합성 및 작업자 사용성 사전 검증';
  };

  const getDefaultLeadDept = (currentLang: Language | string) => {
    if (currentLang === 'ja') return '製造DXイノベーション推進チーム / 工程技術部';
    if (currentLang === 'en') return 'Manufacturing Innovation / Process Engineering';
    return '제조혁신팀 / 공정기술 파트';
  };

  // All hooks run unconditionally; the `isOpen` guard comes after them.
  const [selectedFacility, setSelectedFacility] = useState<string>(
    initialLocation || selectedLocation || FACILITIES_LIST[0].fullName
  );
  const [pocGoal, setPocGoal] = useState<string>(() =>
    getDefaultPocGoal(lang, effectiveApp?.category ?? '')
  );
  const [leadDept, setLeadDept] = useState<string>(() => getDefaultLeadDept(lang));

  const appCategory = effectiveApp?.category ?? '';
  useEffect(() => {
    setPocGoal(getDefaultPocGoal(lang, appCategory));
    setLeadDept(getDefaultLeadDept(lang));
  }, [lang, appCategory]);
  const [isolationMode, setIsolationMode] = useState<'sandbox_mirror' | 'synthetic_sample'>(
    'sandbox_mirror'
  );
  const [isDeploying, setIsDeploying] = useState<boolean>(false);
  const [deployStep, setDeployStep] = useState<number>(1);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Provisioning must not be interrupted; once it succeeds the modal is
  // dismissible again.
  const dismiss = useModalDismiss<HTMLDivElement>(isOpen, onClose, { locked: isDeploying });

  if (!isOpen || !effectiveApp) return null;

  const goalPresets = lang === 'ja' ? [
    '製造ラインのリアルタイムデータ収集およびオントロジー連係整合性テスト',
    'AI欠陥・異常検知精度(>98%)および誤検知率の事前検証',
    '規制準用電子バッチ記録(EBRS)・監査証跡(Audit Trail)の完全性検証',
    'ピーク電力削減およびエネルギー削減アルゴリズムのシミュレーション',
    '作業員現場タブレットUIの応答性およびバーコード連係テスト'
  ] : lang === 'en' ? [
    'Real-time line data ingestion & ontology mapping consistency test',
    'AI defect/anomaly detection accuracy (>98%) & false positive benchmark',
    'Regulatory compliance EBRS & Audit Trail data integrity verification',
    'Peak energy reduction & optimization algorithm simulation',
    'Operator shopfloor tablet UI responsiveness & scanner integration test'
  ] : [
    '공정 라인 실시간 데이터 수집 및 온톨로지 연동 정합성 테스트',
    'AI 결함/이상 감지 정확도(>98%) 및 오탐률 사전 실증',
    '규제 준수 전자배치(EBRS) / 감사추적(Audit Trail) 무결성 검증',
    '피크 전력 감축 및 에너지 절감 알고리즘 시뮬레이션',
    '작업자 현장 태블릿 UI 반응성 및 N-POP 바코드 연동 테스트'
  ];

  const handleStartDeploy = () => {
    setIsDeploying(true);
    setDeployStep(1);

    setTimeout(() => {
      setDeployStep(2);
    }, 900);

    setTimeout(() => {
      setDeployStep(3);
    }, 1800);

    setTimeout(() => {
      const now = new Date();
      const expires = new Date();
      expires.setDate(now.getDate() + 14);

      const newTrial: PoCTrial = {
        id: `poc-${effectiveApp.id}-${Date.now().toString().slice(-4)}`,
        appId: effectiveApp.id,
        name: effectiveApp.name,
        category: effectiveApp.category,
        startedAt: now.toISOString().split('T')[0],
        expiresAt: expires.toISOString().split('T')[0],
        daysRemaining: 14,
        location: selectedFacility,
        pocGoal: pocGoal.trim() || '사내 공정 적합성 실증',
        leadDepartment: leadDept.trim() || '제조기술팀',
        status: 'active',
        dataIsolationMode: isolationMode,
        healthScore: 98,
        tagsProcessed: 4200,
        runtimeVersion: 'v4.2-sandbox',
        sampleLoaded: isolationMode === 'synthetic_sample'
      };

      if (onApplySuccess) {
        onApplySuccess(newTrial);
      } else if (onConfirmPoC) {
        onConfirmPoC(newTrial);
      }
      setIsDeploying(false);
      setIsSuccess(true);
    }, 2700);
  };

  const handleFinish = () => {
    setIsSuccess(false);
    onClose();
    if (onGoToWorkspace) {
      onGoToWorkspace();
    }
  };

  return (
    <div
      ref={dismiss.backdropRef}
      onMouseDown={dismiss.onBackdropMouseDown}
      onClick={dismiss.onBackdropClick}
      role="presentation"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white relative">
          <button
            onClick={onClose}
            disabled={isDeploying}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
              <FlaskConical className="w-3 h-3 text-emerald-400" />
              {t.pocModalBadge}
            </span>
            <span className="text-[11px] text-slate-300">{t.pocZeroCostNotice}</span>
          </div>

          <h2 className="text-xl font-bold tracking-tight mt-1.5 flex items-center gap-2 break-keep">
            <span>{getLocalizedAppName(effectiveApp, lang)}</span>
            <span className="text-xs font-normal text-slate-300 px-2 py-0.5 bg-slate-800 rounded">
              {effectiveApp.category}
            </span>
          </h2>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            {t.pocModalHeaderDesc}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700 flex-1">
          {/* Deployment Animation Screen */}
          {isDeploying ? (
            <div className="py-10 space-y-6 text-center">
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-indigo-100 animate-ping"></div>
                <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg">
                  <FlaskConical className="w-8 h-8 animate-bounce" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">
                  {t.pocDeployingTitle}
                </h3>
                <p className="text-slate-500 text-xs max-w-md mx-auto">
                  {t.pocDeployingSub}
                </p>
              </div>

              {/* Step indicator */}
              <div className="max-w-md mx-auto space-y-3 pt-2 text-left bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center gap-3">
                  {deployStep > 1 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin flex-shrink-0" />
                  )}
                  <span className={deployStep >= 1 ? 'font-semibold text-slate-900' : 'text-slate-400'}>
                    {t.pocDeployStep1} ({getLocalizedLocationName(selectedFacility, lang)})
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {deployStep > 2 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  ) : deployStep === 2 ? (
                    <div className="w-4 h-4 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin flex-shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-slate-300 flex-shrink-0" />
                  )}
                  <span className={deployStep >= 2 ? 'font-semibold text-slate-900' : 'text-slate-400'}>
                    {t.pocDeployStep2}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {deployStep >= 3 ? (
                    <div className="w-4 h-4 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin flex-shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-slate-300 flex-shrink-0" />
                  )}
                  <span className={deployStep >= 3 ? 'font-semibold text-slate-900' : 'text-slate-400'}>
                    {t.pocDeployStep3}
                  </span>
                </div>
              </div>
            </div>
          ) : isSuccess ? (
            /* Success Screen */
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {t.pocSuccessBadge}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2 break-keep">
                  {t.pocSuccessTitle.replace('{appName}', getLocalizedAppName(effectiveApp, lang))}
                </h3>
                <p className="text-slate-600 text-xs max-w-md mx-auto leading-relaxed">
                  {t.pocSuccessDesc.replace('{facility}', getLocalizedLocationName(selectedFacility, lang))}
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-lg mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">{t.pocDeployLocation}:</span>
                  <span className="font-semibold text-slate-800">{getLocalizedLocationName(selectedFacility, lang)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">{t.pocValidationGoal}:</span>
                  <span className="font-semibold text-slate-800 truncate max-w-xs">{pocGoal}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">{t.pocDataIsolationMode}:</span>
                  <span className="font-semibold text-emerald-700">
                    {isolationMode === 'sandbox_mirror' ? t.pocMirrorTitle : t.pocSyntheticTitle}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">{t.pocValidityPeriod}:</span>
                  <span className="font-semibold text-indigo-700 font-mono">{t.pocFreePeriodText}</span>
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs transition-colors"
                >
                  {t.pocContinueMarketplace}
                </button>
                <button
                  onClick={handleFinish}
                  className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <span>{t.pocGoToWorkspace}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Main Form */
            <>
              {/* Guaranteed Free PoC Banner */}
              <div className="p-3.5 bg-emerald-50/90 border border-emerald-200 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold text-emerald-950 text-xs">
                    {t.pocZeroCardNoticeTitle}
                  </span>
                  <p className="text-[11.5px] text-emerald-800 leading-relaxed">
                    {t.pocZeroCardNoticeDesc}
                  </p>
                </div>
              </div>

              {/* 1. Facility Selection */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>{t.pocStep1FacilityLabel}</span>
                </label>
                <select
                  value={selectedFacility}
                  onChange={(e) => setSelectedFacility(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  {FACILITIES_LIST.map((fac) => (
                    <option key={fac.id} value={fac.fullName}>
                      {getLocalizedFacilityName(fac, lang)} ({fac.runtimeVersion})
                    </option>
                  ))}
                </select>
                <span className="text-[10.5px] text-slate-400">
                  {t.pocStep1FacilitySub}
                </span>
              </div>

              {/* 2. PoC Validation Goal */}
              <div className="space-y-2">
                <label className="font-bold text-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{t.pocStep2GoalLabel}</span>
                  </div>
                  <span className="text-[10.5px] text-slate-400 font-normal">{t.pocStep2Customizable}</span>
                </label>

                {/* Preset Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {goalPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPocGoal(preset)}
                      className={`text-[10.5px] px-2.5 py-1 rounded-md border text-left transition-all ${
                        pocGoal === preset
                          ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-semibold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                <textarea
                  rows={2}
                  value={pocGoal}
                  onChange={(e) => setPocGoal(e.target.value)}
                  placeholder={t.pocStep2GoalPlaceholder}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* 3. Applicant Department & Engineer */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-slate-600" />
                  <span>{t.pocStep3DeptLabel}</span>
                </label>
                <input
                  type="text"
                  value={leadDept}
                  onChange={(e) => setLeadDept(e.target.value)}
                  placeholder={t.pocStep3DeptPlaceholder}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* 4. Domain Data Isolation Mode */}
              <div className="space-y-2">
                <label className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.pocStep4IsolationLabel}</span>
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  <div
                    onClick={() => setIsolationMode('sandbox_mirror')}
                    className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      isolationMode === 'sandbox_mirror'
                        ? 'bg-blue-50/80 border-blue-600 text-blue-950 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs flex items-center gap-1">
                        <Database className="w-3.5 h-3.5 text-blue-600" />
                        {t.pocMirrorTitle}
                      </span>
                      {isolationMode === 'sandbox_mirror' && (
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      {t.pocMirrorDesc}
                    </p>
                  </div>

                  <div
                    onClick={() => setIsolationMode('synthetic_sample')}
                    className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      isolationMode === 'synthetic_sample'
                        ? 'bg-blue-50/80 border-blue-600 text-blue-950 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs flex items-center gap-1">
                        <Cpu className="w-3.5 h-3.5 text-indigo-600" />
                        {t.pocSyntheticTitle}
                      </span>
                      {isolationMode === 'synthetic_sample' && (
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      {t.pocSyntheticDesc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Summary Policy Checklist */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
                <div className="font-semibold text-slate-800">{t.pocPolicyTitle}</div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>{t.pocPolicyItem1}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>{t.pocPolicyItem2}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>{t.pocPolicyItem3}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        {!isDeploying && !isSuccess && (
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{t.pocFooterPeriod}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors"
              >
                {t.pocCancelBtn}
              </button>
              <button
                type="button"
                onClick={handleStartDeploy}
                className="px-5 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center gap-1.5 transition-colors"
              >
                <FlaskConical className="w-4 h-4" />
                <span>{t.pocStartDeployBtn}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
