import React, { useState } from 'react';
import { WorkspaceInstalledModule, DecommissionedModule, PoCTrial } from '../types';
import { PoCReportModal } from './PoCReportModal';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { getLocalizedLocationName } from '../i18n/localizedData';
import {
  Server,
  RefreshCw,
  Archive,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Lock,
  Download,
  FlaskConical,
  TrendingUp,
  FileText,
  Clock,
  Trash2,
  Sparkles,
  ArrowRight,
  Database
} from 'lucide-react';

interface WorkspaceViewProps {
  installedModules: WorkspaceInstalledModule[];
  decommissionedModules: DecommissionedModule[];
  pocTrials: PoCTrial[];
  onUpgradeModule: (moduleId: string) => void;
  onGoToCatalog: () => void;
  onConvertPoCToSub: (trial: PoCTrial) => void;
  onRemovePoCTrial: (trialId: string) => void;
  selectedLocation: string;
  lang?: Language;
}

export const WorkspaceView: React.FC<WorkspaceViewProps> = ({
  installedModules,
  decommissionedModules,
  pocTrials,
  onUpgradeModule,
  onGoToCatalog,
  onConvertPoCToSub,
  onRemovePoCTrial,
  selectedLocation,
  lang = 'ko'
}) => {
  const t = TRANSLATIONS[lang];
  const [upgradingId, setUpgradingId] = useState<string | null>(null);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);
  const [selectedReportTrial, setSelectedReportTrial] = useState<PoCTrial | null>(null);

  const handleUpgrade = (id: string) => {
    setUpgradingId(id);
    setTimeout(() => {
      onUpgradeModule(id);
      setUpgradingId(null);
      const msg = lang === 'ja'
        ? `[無停止パッチ完了] ${id.toUpperCase()} モジュールが工程停止なし(Zero-Downtime)で v4.2 ランタイムに正常に更新されました。`
        : lang === 'en'
        ? `[Zero-Downtime Patch Complete] ${id.toUpperCase()} module successfully updated to v4.2 runtime without line stoppage.`
        : `[무중단 패치 완료] ${id.toUpperCase()} 모듈이 공정 정지 없이(Zero-Downtime) v4.2 런타임으로 성공적으로 갱신되었습니다.`;
      setDownloadSuccessToast(msg);
      setTimeout(() => {
        setDownloadSuccessToast(null);
      }, 4000);
    }, 1500);
  };

  const handleDownloadArchive = (name: string) => {
    const msg = lang === 'ja'
      ? `${name} 監査証跡(Audit Trail) 法的保管ダンプが生成されました。`
      : lang === 'en'
      ? `${name} Audit Trail regulatory legal compliance dump generated.`
      : `${name} 감사추적(Audit Trail) 법적 보존 덤프가 생성되었습니다.`;
    setDownloadSuccessToast(msg);
    setTimeout(() => {
      setDownloadSuccessToast(null);
    }, 3500);
  };

  const handleDeleteTrial = (trial: PoCTrial) => {
    onRemovePoCTrial(trial.id);
    const msg = lang === 'ja'
      ? `[PoCサンドボックス終了] ${trial.name} 一時コンテナおよびサンドボックスデータが安全に破棄されました。`
      : lang === 'en'
      ? `[PoC Sandbox Terminated] ${trial.name} temporary container and sandbox data safely purged.`
      : `[PoC 샌드박스 종료] ${trial.name} 임시 컨테이너 및 샌드박스 데이터가 안전하게 파기되었습니다.`;
    setDownloadSuccessToast(msg);
    setTimeout(() => {
      setDownloadSuccessToast(null);
    }, 3500);
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Toast */}
      {downloadSuccessToast && (
        <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-medium flex items-center justify-between animate-in fade-in">
          <span>{downloadSuccessToast}</span>
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              {lang === 'ja'
                ? 'ハイブリッドランタイム制御'
                : lang === 'en'
                ? 'Hybrid Runtime Control'
                : '하이브리드 런타임 제어'}
            </span>
            <span className="text-xs text-slate-500">
              {lang === 'ja'
                ? 'コントロールプレーンからリモート展開・オンプレミス社内実行'
                : lang === 'en'
                ? 'Remote deployment from control plane · On-premises execution'
                : '제어 평면에서 원격 배포 · 온프레미스 사내 실행'}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1 tracking-tight break-keep">
            {t.workspaceTitle}
          </h1>
          <p className="text-xs text-slate-600 mt-0.5 break-keep">
            {lang === 'ja'
              ? '事業所内にインストールされたモジュールのランタイムバージョン、14日間のPoC試運転、データレイクバインディング状態、規制資産の[読み取り専用保存]現況を管理します。'
              : lang === 'en'
              ? 'Manage installed module runtimes, 14-day PoC trials, datalake bindings, and regulatory read-only preservation.'
              : '사업장 안에 설치된 모듈의 런타임 버전, 14일 PoC 시험 가동, 데이터레이크 바인딩 상태, 규제 자산의 [읽기 전용 보존] 현황을 관리합니다.'}
          </p>
        </div>

        <button
          onClick={onGoToCatalog}
          className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm self-start md:self-auto whitespace-nowrap"
        >
          <span>
            {lang === 'ja'
              ? '新規モジュール追加展開'
              : lang === 'en'
              ? 'Deploy New Module'
              : '새 모듈 추가 배포'}
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" />
        </button>
      </div>

      {/* Health Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500">
              {t.activeModulesCardTitle}
            </span>
            <div className="text-lg font-bold text-slate-900 font-mono">
              {installedModules.length} {t.activeModulesUnit}
            </div>
            <span className="text-[11px] text-emerald-600 font-medium">
              {t.firewallReceivingStatus}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-indigo-100 p-4 shadow-sm flex items-center gap-3 bg-gradient-to-br from-white to-indigo-50/40">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-xs text-slate-500">
                {t.pocTrialsCardTitle}
              </span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-indigo-100 text-indigo-700 font-bold">
                {t.freeBadge}
              </span>
            </div>
            <div className="text-lg font-bold text-indigo-900 font-mono">
              {pocTrials.length} {t.pocTestingUnit}
            </div>
            <span className="text-[11px] text-indigo-600 font-medium">
              {t.sandboxIsolationLabel}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500">
              {t.arcTunnelLinkTitle}
            </span>
            <div className="text-lg font-bold text-slate-900 font-mono">mTLS</div>
            <span className="text-[11px] text-slate-500 truncate block max-w-[120px]">
              {getLocalizedLocationName(selectedLocation, lang).split(' ')[0]}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
            <Archive className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500">
              {t.preservedDataCardTitle}
            </span>
            <div className="text-lg font-bold text-slate-900 font-mono">
              {decommissionedModules.length} {t.itemsUnit}
            </div>
            <span className="text-[11px] text-amber-700 font-medium">CFR Part 11</span>
          </div>
        </div>
      </div>

      {/* Section: 14-Day PoC Trials Active Section */}
      <div className="bg-white rounded-xl border-2 border-indigo-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 bg-gradient-to-r from-indigo-50/80 via-white to-slate-50 border-b border-indigo-100 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
              <FlaskConical className="w-4 h-4 text-indigo-600" />
              <span className="break-keep">
                {t.pocActiveSectionTitle} ({pocTrials.length})
              </span>
            </h2>
            <p className="text-xs text-slate-600 mt-0.5 break-keep">
              {t.pocActiveSectionSub}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-indigo-900 bg-indigo-100/80 border border-indigo-200 px-2.5 py-1 rounded-md font-semibold whitespace-nowrap">
              {t.pocNoAutoBillingGuarantee}
            </span>
          </div>
        </div>

        {pocTrials.length === 0 ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center mx-auto">
              <FlaskConical className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800 text-sm break-keep">
                {t.pocEmptyTitle}
              </h3>
              <p className="text-slate-500 text-xs max-w-md mx-auto break-keep">
                {t.pocEmptyDesc}
              </p>
            </div>
            <button
              onClick={onGoToCatalog}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors whitespace-nowrap"
            >
              {t.pocExploreCatalogBtn}
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {pocTrials.map((trial) => {
              const daysElapsed = 14 - trial.daysRemaining;
              const percentElapsed = Math.min(100, Math.round((daysElapsed / 14) * 100));

              return (
                <div key={trial.id} className="p-5 hover:bg-indigo-50/20 transition-colors space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-slate-900 text-sm">{trial.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-bold border border-indigo-200">
                          {trial.category}
                        </span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                          14{lang === 'ja' ? '日' : lang === 'en' ? '-Day ' : '일 '}PoC · {t.pocRemainingDaysBadge.replace('{days}', String(trial.daysRemaining))}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-slate-800">{getLocalizedLocationName(trial.location, lang)}</span>
                        <span className="text-slate-300">|</span>
                        <span className="text-slate-500 font-mono">
                          {t.colRuntime}:{' '}
                          {trial.runtimeVersion}
                        </span>
                        <span className="text-slate-300">|</span>
                        <span className="text-emerald-700 font-medium">
                          {trial.dataIsolationMode === 'sandbox_mirror'
                            ? lang === 'ja'
                              ? '社内Read-Onlyミラーリング（元DB保護）'
                              : lang === 'en'
                              ? 'Read-Only Sandbox Mirror (DB Protected)'
                              : '사내 Read-Only 미러링 (원본 DB 보호)'
                            : lang === 'ja'
                            ? '仮想合成サンプルデータ'
                            : lang === 'en'
                            ? 'Synthetic Sample Data'
                            : '가상 합성 샘플 데이터'}
                        </span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 flex-wrap self-start md:self-auto">
                      <button
                        onClick={() => setSelectedReportTrial(trial)}
                        className="px-3 py-1.5 rounded-lg border border-indigo-300 bg-white hover:bg-indigo-50 text-indigo-700 font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-2xs whitespace-nowrap"
                      >
                        <FileText className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                        <span>
                          {t.pocViewReportBtn}
                        </span>
                      </button>

                      <button
                        onClick={() => onConvertPoCToSub(trial)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-2xs whitespace-nowrap"
                      >
                        <span>
                          {t.pocConvertSubBtn}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                      </button>

                      <button
                        onClick={() => handleDeleteTrial(trial)}
                        title={t.pocTerminateSandboxBtn}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* PoC Goal & Progress Bar */}
                  <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="md:col-span-2 space-y-1.5">
                      <div className="text-[11px] text-slate-500 font-medium">{t.pocGoalLabel}</div>
                      <div className="font-semibold text-slate-800 leading-snug">{trial.pocGoal}</div>
                      <div className="text-[11px] text-slate-500">
                        {t.pocDeptLeadLabel} <span className="font-medium text-slate-700">{trial.leadDepartment}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 border-t md:border-t-0 md:border-l border-slate-200 md:pl-3">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-500 font-medium">
                          {lang === 'ja' ? '評価期間進捗率:' : lang === 'en' ? 'Trial Progress:' : '평가 기간 진행률:'}
                        </span>
                        <span className="font-mono font-bold text-indigo-700">
                          {daysElapsed}{lang === 'ja' ? '日' : lang === 'en' ? 'd' : '일'} / 14{lang === 'ja' ? '日' : lang === 'en' ? 'd' : '일'} ({percentElapsed}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-indigo-600 h-2 rounded-full transition-all"
                          style={{ width: `${percentElapsed}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[10.5px] text-slate-500 pt-0.5">
                        <span>{t.pocSuitabilityScore}: <strong className="text-emerald-700 font-mono">{trial.healthScore}%</strong></span>
                        <span>{t.pocIngestedTags}: <strong className="font-mono text-slate-700">{trial.tagsProcessed.toLocaleString()}</strong>{t.itemsUnit}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Section 1: Active Installed Modules */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>{t.installedModulesTableTitle} ({installedModules.length})</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.installedModulesTableSub}
            </p>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {t.runtimePolicyRuleBadge}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5 pl-5">{t.colModuleName}</th>
                <th className="p-3.5">{t.colNodeLocation}</th>
                <th className="p-3.5">{t.colRuntime}</th>
                <th className="p-3.5">{t.colDatalakeBinding}</th>
                <th className="p-3.5">{t.colLocalResource}</th>
                <th className="p-3.5 pr-5 text-right">{t.colAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {installedModules.map((item) => {
                const isNeedsUpdate = item.runtimeVersion === 'v4.1';
                const isUpgrading = upgradingId === item.id;

                return (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3.5 pl-5">
                      <div className="font-bold text-slate-900">{item.name}</div>
                      <div className="text-[11px] text-slate-500">{item.category}</div>
                    </td>
                    <td className="p-3.5 text-slate-700">
                      <div className="font-medium">{getLocalizedLocationName(item.location, lang)}</div>
                      <div className="text-[11px] text-slate-400 font-mono">Ping: {item.lastPing}</div>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`font-mono text-xs px-2 py-0.5 rounded font-semibold ${
                          item.runtimeVersion === 'v4.2'
                            ? 'bg-slate-100 text-slate-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.runtimeVersion}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span className="text-slate-800 font-medium">{item.dataLakeBinding}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {t.datalakeNormalStatus}
                      </div>
                    </td>
                    <td className="p-3.5 text-slate-600 font-mono text-[11px]">
                      {item.localResource}
                    </td>
                    <td className="p-3.5 pr-5 text-right">
                      {isNeedsUpdate ? (
                        <button
                          disabled={isUpgrading}
                          onClick={() => handleUpgrade(item.id)}
                          className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 font-medium text-[11px] inline-flex items-center gap-1 transition-colors"
                        >
                          <RefreshCw
                            className={`w-3 h-3 ${isUpgrading ? 'animate-spin text-blue-600' : ''}`}
                          />
                          <span>{isUpgrading ? t.patchingBtn : t.patchUpgradeBtn}</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-emerald-700 font-medium inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {t.latestRuntimeBadge}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 2: Decommissioned / Read-Only Retained Modules */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-600" />
              <span>{t.decomTableTitle}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.decomTableSub}
            </p>
          </div>
          <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-semibold">
            {t.cfrPart11Badge}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5 pl-5">{t.colDecomModule}</th>
                <th className="p-3.5">{t.colRetainedData}</th>
                <th className="p-3.5">{t.colRetentionExpiry}</th>
                <th className="p-3.5">{t.colMonthlyFee}</th>
                <th className="p-3.5 pr-5 text-right">{t.colAuditLogDownload}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {decommissionedModules.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60">
                  <td className="p-3.5 pl-5">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{item.name}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {t.readOnlyPreservedBadge}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{item.reason}</div>
                  </td>
                  <td className="p-3.5 text-slate-700 font-medium">
                    {item.retainedData}
                  </td>
                  <td className="p-3.5 font-mono text-slate-800">
                    <div className="font-semibold text-amber-900">{item.retentionExpiry}</div>
                    <div className="text-[10px] text-slate-400">
                      {lang === 'ja' ? '満了前の自動破棄案内を送信' : lang === 'en' ? 'Auto-deletion notice sent prior' : '만료 전 자동 파기 안내 발송'}
                    </div>
                  </td>
                  <td className="p-3.5 font-mono text-slate-900 font-semibold">
                    {t.monthPrefix} {item.retentionFee}{t.tenThousandWon}
                  </td>
                  <td className="p-3.5 pr-5 text-right">
                    <button
                      onClick={() => handleDownloadArchive(item.name)}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-[11px] inline-flex items-center gap-1 transition-colors"
                    >
                      <Download className="w-3 h-3" />
                      <span>{t.downloadAuditDumpBtn}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PoC Report Modal */}
      <PoCReportModal
        isOpen={!!selectedReportTrial}
        onClose={() => setSelectedReportTrial(null)}
        trial={selectedReportTrial}
        onConvertToSub={onConvertPoCToSub}
        lang={lang}
      />
    </div>
  );
};

