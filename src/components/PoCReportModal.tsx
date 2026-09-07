import React from 'react';
import {
  X,
  FileText,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Download,
  Printer,
  Building2,
  Cpu,
  Clock,
  ArrowRight,
  Sparkles,
  ListChecks
} from 'lucide-react';
import { PoCTrial } from '../types';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { getPoCProgress } from '../lib/poc';
import { useModalDismiss } from '../lib/useModalDismiss';
import { getLocalizedLocationName, getLocalizedWorkspaceText } from '../i18n/localizedData';

interface PoCReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  trial: PoCTrial | null;
  onConvertToSub: (trial: PoCTrial) => void;
  lang?: Language;
}

export const PoCReportModal: React.FC<PoCReportModalProps> = ({
  isOpen,
  onClose,
  trial,
  onConvertToSub,
  lang = 'ko'
}) => {
  const t = TRANSLATIONS[lang];

  // Hook before the guard so the hook count is stable across open/close.
  const dismiss = useModalDismiss<HTMLDivElement>(isOpen, onClose);

  if (!isOpen || !trial) return null;

  const progress = getPoCProgress(trial);
  const daysElapsed = progress.daysElapsed;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      ref={dismiss.backdropRef}
      onMouseDown={dismiss.onBackdropMouseDown}
      onClick={dismiss.onBackdropClick}
      role="presentation"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t.reportBadge}
        data-print-root
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/50 border border-indigo-400/40 flex items-center justify-center">
              <FileText className="w-4 h-4 text-indigo-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                  {t.reportBadge}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  {t.reportRunningStatus.replace('{days}', String(daysElapsed)).replace('{remaining}', String(progress.daysRemaining))}
                </span>
              </div>
              <h2 className="text-base font-bold text-white tracking-tight break-keep">
                {getLocalizedWorkspaceText(trial.name, lang)} — {t.reportSubTitle}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label={t.closeBtn}
            data-print-hide
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700 flex-1">
          {/* Executive Summary */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
              <div>
                <span className="text-[11px] text-slate-500 block">{t.reportFacilityNode}</span>
                <span className="font-bold text-slate-900 text-xs flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  {getLocalizedLocationName(trial.location, lang)}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">{t.reportApplicantDept}</span>
                <span className="font-semibold text-slate-800">{getLocalizedWorkspaceText(trial.leadDepartment, lang)}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">{t.reportPeriod}</span>
                <span className="font-mono text-slate-800">
                  {trial.startedAt} ~ {trial.expiresAt} ({t.reportFourteenDays})
                </span>
              </div>
            </div>

            <div>
              <span className="text-[11px] text-slate-500 block font-medium">{t.reportCoreGoal}</span>
              <p className="text-slate-800 font-semibold text-xs mt-0.5">{getLocalizedWorkspaceText(trial.pocGoal, lang)}</p>
            </div>
          </div>

          {/* Key Validation Metrics Grid */}
          <div>
            <h3 className="font-bold text-slate-900 text-xs mb-3 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>{t.reportRealtimeMetricsTitle}</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                <span className="text-[11px] text-emerald-800 font-medium block">{t.reportScoreLabel}</span>
                <div className="text-2xl font-bold font-mono text-emerald-700 mt-1">
                  {trial.healthScore}%
                </div>
                <span className="text-[10px] text-emerald-600 font-medium mt-0.5 block">
                  {t.reportScoreSub}
                </span>
              </div>

              <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl">
                <span className="text-[11px] text-blue-800 font-medium block">{t.reportTagsLabel}</span>
                <div className="text-2xl font-bold font-mono text-blue-700 mt-1">
                  {trial.tagsProcessed.toLocaleString()}
                </div>
                <span className="text-[10px] text-blue-600 font-medium mt-0.5 block">
                  {t.reportTagsSub}
                </span>
              </div>

              <div className="p-3.5 bg-indigo-50/70 border border-indigo-200 rounded-xl">
                <span className="text-[11px] text-indigo-800 font-medium block">{t.reportInterferenceLabel}</span>
                <div className="text-2xl font-bold font-mono text-indigo-700 mt-1">0 sec</div>
                <span className="text-[10px] text-indigo-600 font-medium mt-0.5 block">
                  {t.reportInterferenceSub}
                </span>
              </div>

              <div className="p-3.5 bg-slate-100 border border-slate-200 rounded-xl">
                <span className="text-[11px] text-slate-600 font-medium block">{t.reportDropLabel}</span>
                <div className="text-2xl font-bold font-mono text-slate-800 mt-1">0.00%</div>
                <span className="text-[10px] text-slate-500 font-medium mt-0.5 block">
                  {t.reportDropSub}
                </span>
              </div>
            </div>
          </div>

          {/* Test Logs & Criteria Verification */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>{t.reportItemResultsTitle}</span>
            </h3>

            <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
              <div className="p-3 bg-white flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-900">
                    {t.reportItem1Title}
                  </span>
                  <p className="text-[11px] text-slate-500">
                    {t.reportItem1Desc}
                  </p>
                </div>
                <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-800 font-bold text-[11px] flex-shrink-0">
                  {t.reportPassLabel}
                </span>
              </div>

              <div className="p-3 bg-white flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-900">
                    {t.reportItem2Title}
                  </span>
                  <p className="text-[11px] text-slate-500">
                    {t.reportItem2Desc}
                  </p>
                </div>
                <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-800 font-bold text-[11px] flex-shrink-0">
                  {t.reportPassLabel}
                </span>
              </div>

              <div className="p-3 bg-white flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-900">
                    {t.reportItem3Title}
                  </span>
                  <p className="text-[11px] text-slate-500">
                    {t.reportItem3Desc.replace('{goal}', getLocalizedWorkspaceText(trial.pocGoal, lang))}
                  </p>
                </div>
                <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-800 font-bold text-[11px] flex-shrink-0">
                  {t.reportPassLabel}
                </span>
              </div>
            </div>
          </div>

          {/* What the applicant should do next */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2" data-print-keep>
            <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <ListChecks className="w-4 h-4 text-blue-600 flex-shrink-0" />
              {t.pocNextStepsTitle}
            </span>
            <ol className="space-y-1.5 text-xs text-slate-700">
              {[t.pocNextStep1, t.pocNextStep2, t.pocNextStep3].map((step, idx) => (
                <li key={step} className="flex items-start gap-2 break-keep">
                  <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Expected ROI & Commercial Transition Notice */}
          <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-2">
            <span className="font-bold text-indigo-950 text-xs flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              {t.reportRoiTitle}
            </span>
            <p className="text-indigo-900 text-xs leading-relaxed">
              {t.reportRoiDesc}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3"
          data-print-hide
        >
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium text-xs flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
              <span>{t.reportPrintPdf}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap"
            >
              {t.closeBtn}
            </button>
            <button
              onClick={() => {
                onClose();
                onConvertToSub(trial);
              }}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <span>{t.reportConvertToSub}</span>
              <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

