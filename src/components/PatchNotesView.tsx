import React, { useState } from 'react';
import {
  ShieldCheck,
  RefreshCw,
  Server,
  Terminal,
  Clock,
  FileCheck2,
  Lock,
  Layers,
  Search,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { PATCH_NOTES_DATA, ZERO_DOWNTIME_PRINCIPLES } from '../data/patchNotesData';
import {
  getLocalizedPatchNote,
  getLocalizedPrincipleTitle,
  getLocalizedPrincipleDesc,
  getLocalizedPrincipleBenefit
} from '../i18n/localizedData';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface PatchNotesViewProps {
  lang: Language;
  selectedLocation: string;
}

export const PatchNotesView: React.FC<PatchNotesViewProps> = ({
  lang,
  selectedLocation
}) => {
  const t = TRANSLATIONS[lang];
  const [activeTab, setActiveTab] = useState<'history' | 'principles' | 'simulator'>('history');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPatchId, setExpandedPatchId] = useState<string>(PATCH_NOTES_DATA[0].id);

  // Simulator state
  const [simTargetModule, setSimTargetModule] = useState(
    lang === 'ja'
      ? 'B²LAB オントロジーエンジン (v4.2)'
      : lang === 'en'
      ? 'B²LAB Ontology Engine (v4.2)'
      : 'B²LAB 온톨로지 엔진 (v4.2)'
  );
  const [simStep, setSimStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simLogs, setSimLogs] = useState<string[]>([]);

  const localizedPatches = PATCH_NOTES_DATA.map((p) => getLocalizedPatchNote(p, lang));

  const filteredPatches = localizedPatches.filter((p) => {
    const matchesType = selectedType === 'all' || p.type === selectedType;
    const matchesQuery =
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.version.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.affectedModules.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesQuery;
  });

  const toggleExpand = (id: string) => {
    setExpandedPatchId(expandedPatchId === id ? '' : id);
  };

  const runSimulation = () => {
    setIsSimulating(true);
    setSimStep(1);

    if (lang === 'ja') {
      setSimLogs([
        `[INIT] ${selectedLocation} 現場ノードの無停止ローリングパッチ要求を受信...`,
        `[STEP 1] 新規Pod (v4.2.3-release) 起動中... 社内ArcTunnelセッション正常維持`
      ]);

      setTimeout(() => {
        setSimStep(2);
        setSimLogs((prev) => [
          ...prev,
          `[STEP 2] 新規Pod Readiness Probe通過 (応答速度: 3.4ms)`,
          `[CANARY] 第1次カナリアトラフィック10%を新規コンテナへルーティング開始...`,
          `[BUFFER] PLC/SCADA共有メモリ・リングバッファ同期完了 (データ損失: 0 pkts)`
        ]);
      }, 1400);

      setTimeout(() => {
        setSimStep(3);
        setSimLogs((prev) => [
          ...prev,
          `[STEP 3] トラフィック引き継ぎ比率 50% → 100% 拡大完了`,
          `[METRICS] オントロジーストリーム遅延 4.1ms 正常、製造ライン稼働率 100.0% 維持`
        ]);
      }, 2800);

      setTimeout(() => {
        setSimStep(4);
        setSimLogs((prev) => [
          ...prev,
          `[STEP 4] 旧バージョンPod (v4.2.2) 正常トラフィックドレイン＆安全停止完了`,
          `[SUCCESS] 無停止ローリングパッチ 100% 成功! (ダウンタイム: 0.00秒 / 損失データ: 0件)`
        ]);
        setIsSimulating(false);
      }, 4200);
    } else if (lang === 'en') {
      setSimLogs([
        `[INIT] Received zero-downtime rolling patch request for ${selectedLocation}...`,
        `[STEP 1] Initializing new Pod (v4.2.3-release)... ArcTunnel session active`
      ]);

      setTimeout(() => {
        setSimStep(2);
        setSimLogs((prev) => [
          ...prev,
          `[STEP 2] New Pod passed Readiness Probe (Latency: 3.4ms)`,
          `[CANARY] Routing 10% canary traffic to new container...`,
          `[BUFFER] Synced PLC/SCADA shared memory ring buffer (Loss: 0 pkts)`
        ]);
      }, 1400);

      setTimeout(() => {
        setSimStep(3);
        setSimLogs((prev) => [
          ...prev,
          `[STEP 3] Cutover traffic scale 50% → 100% completed`,
          `[METRICS] Ontology stream latency 4.1ms nominal, plant OEE 100.0% sustained`
        ]);
      }, 2800);

      setTimeout(() => {
        setSimStep(4);
        setSimLogs((prev) => [
          ...prev,
          `[STEP 4] Drained and safely decommissioned legacy Pod (v4.2.2)`,
          `[SUCCESS] Zero-Downtime rolling patch 100% verified! (Downtime: 0.00s / Lost pkts: 0)`
        ]);
        setIsSimulating(false);
      }, 4200);
    } else {
      setSimLogs([
        `[INIT] ${selectedLocation} 현장 노드 무중단 롤링 패치 요청 수신...`,
        `[STEP 1] 신규 Pod (v4.2.3-release) 생성 중... 사내 ArcTunnel 세션 정상 유지`
      ]);

      setTimeout(() => {
        setSimStep(2);
        setSimLogs((prev) => [
          ...prev,
          `[STEP 2] 신규 Pod Readiness Probe 통과 (응답속도: 3.4ms)`,
          `[CANARY] 1차 카나리 트래픽 10% 신규 컨테이너로 라우팅 시작...`,
          `[BUFFER] PLC/SCADA 공유 메모리 링버퍼 동기화 완료 (유실: 0 pkts)`
        ]);
      }, 1400);

      setTimeout(() => {
        setSimStep(3);
        setSimLogs((prev) => [
          ...prev,
          `[STEP 3] 트래픽 승계 비율 50% -> 100% 확대 완료`,
          `[METRICS] 온톨로지 스트림 지연시간 4.1ms 정상, 생산 라인 가동률 100.0% 유지`
        ]);
      }, 2800);

      setTimeout(() => {
        setSimStep(4);
        setSimLogs((prev) => [
          ...prev,
          `[STEP 4] 구버전 Pod (v4.2.2) 정상 트래픽 드레인 및 안전 회수 완료`,
          `[SUCCESS] 무중단 롤링 패치 100% 성공! (다운타임: 0.00초 / 유실 데이터: 0건)`
        ]);
        setIsSimulating(false);
      }, 4200);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-xl p-6 md:p-8 shadow-sm border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.navZeroDowntimeBadge} (Zero-Downtime Guarantee)</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white break-keep leading-snug">
              {t.patchNotesTitle}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed break-keep">
              {t.patchNotesSubtitle}
            </p>
          </div>

          {/* SLA Metric Highlights (Fully Localized) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-800/80 backdrop-blur border border-slate-700/80 p-3.5 rounded-lg text-xs">
            <div className="text-center p-2 rounded bg-slate-900/60">
              <div className="text-slate-400 text-[10px] break-keep">{t.slaDowntimeLabel}</div>
              <div className="text-emerald-400 font-bold font-mono text-base mt-0.5">{t.slaDowntimeVal}</div>
              <div className="text-[9.5px] text-slate-400 break-keep">{t.slaDowntimeDesc}</div>
            </div>
            <div className="text-center p-2 rounded bg-slate-900/60">
              <div className="text-slate-400 text-[10px] break-keep">{t.slaSuccessRateLabel}</div>
              <div className="text-white font-bold font-mono text-base mt-0.5">{t.slaSuccessRateVal}</div>
              <div className="text-[9.5px] text-slate-400 break-keep">{t.slaSuccessRateDesc}</div>
            </div>
            <div className="text-center p-2 rounded bg-slate-900/60">
              <div className="text-slate-400 text-[10px] break-keep">{t.slaDataLossLabel}</div>
              <div className="text-blue-400 font-bold font-mono text-base mt-0.5">{t.slaDataLossVal}</div>
              <div className="text-[9.5px] text-slate-400 break-keep">{t.slaDataLossDesc}</div>
            </div>
            <div className="text-center p-2 rounded bg-slate-900/60">
              <div className="text-slate-400 text-[10px] break-keep">{t.slaRollbackLabel}</div>
              <div className="text-amber-400 font-bold font-mono text-base mt-0.5">{t.slaRollbackVal}</div>
              <div className="text-[9.5px] text-slate-400 break-keep">{t.slaRollbackDesc}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 flex-wrap">
        <button
          onClick={() => setActiveTab('history')}
          className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'history'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>{t.tabPatchHistory}</span>
          <span className="text-xs px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 font-mono">
            {PATCH_NOTES_DATA.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('principles')}
          className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'principles'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{t.tabZeroDowntimeArch}</span>
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'simulator'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <RefreshCw className="w-4 h-4 text-emerald-600" />
          <span>{t.tabPatchSimulator}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium">
            Live
          </span>
        </button>
      </div>

      {/* TAB 1: Patch History */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {/* Controls: Search & Category Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-lg border border-slate-200">
            <div className="flex items-center gap-2 w-full sm:w-80 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.patchSearchPlaceholder}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 text-slate-800"
              />
            </div>

            <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto">
              <span className="text-xs text-slate-500 font-medium mr-1">{t.patchFilterCategoryLabel}</span>
              {[
                { id: 'all', label: t.patchAllFilter },
                { id: 'security', label: t.patchTypeSecurity },
                { id: 'compliance', label: t.patchTypeCompliance },
                { id: 'performance', label: t.patchTypePerformance },
                { id: 'feature', label: t.patchTypeFeature }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedType(filter.id)}
                  className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                    selectedType === filter.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Patches List */}
          <div className="space-y-3">
            {filteredPatches.map((patch) => {
              const isExpanded = expandedPatchId === patch.id;
              const typeColor =
                patch.type === 'security'
                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                  : patch.type === 'compliance'
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : patch.type === 'performance'
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-purple-50 text-purple-700 border-purple-200';

              return (
                <div
                  key={patch.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition-all hover:border-slate-300"
                >
                  {/* Card Header */}
                  <div
                    onClick={() => toggleExpand(patch.id)}
                    className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer select-none bg-slate-50/50 hover:bg-slate-50"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-white">
                          {patch.version}
                        </span>
                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${typeColor}`}>
                          {patch.typeLabel}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          <span>{t.zeroDowntimeVerified}</span>
                        </span>
                        <span className="text-xs text-slate-400 font-mono ml-auto md:ml-0 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {patch.releaseDate}
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug break-keep">
                        {patch.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed break-keep">
                        {patch.summary}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 self-end md:self-center">
                      <div className="text-right hidden sm:block">
                        <div className="text-[10.5px] text-slate-400">
                          {lang === 'ja' ? '展開メカニズム' : lang === 'en' ? 'Deployment Mechanism' : '배포 메커니즘'}
                        </div>
                        <div className="text-xs font-medium text-slate-700">{patch.migrationMechanism.split('(')[0]}</div>
                      </div>
                      <div className="p-1 rounded-full bg-slate-100 text-slate-600">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Detail */}
                  {isExpanded && (
                    <div className="p-4 sm:p-5 border-t border-slate-100 bg-white space-y-4 text-xs">
                      {/* Affected Modules & Guardrails */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                        <div>
                          <div className="text-slate-500 font-medium mb-1.5 flex items-center gap-1">
                            <Layers className="w-3.5 h-3.5 text-blue-600" />
                            <span>
                              {lang === 'ja'
                                ? `影響を受けるモジュール (${patch.affectedModules.length}種)`
                                : lang === 'en'
                                ? `Affected Modules (${patch.affectedModules.length})`
                                : `영향 받는 모듈 (${patch.affectedModules.length}종)`}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {patch.affectedModules.map((mod, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-800 font-medium text-[11px]"
                              >
                                {mod}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="text-slate-500 font-medium mb-1.5 flex items-center gap-1">
                            <Lock className="w-3.5 h-3.5 text-emerald-600" />
                            <span>
                              {lang === 'ja'
                                ? '無停止ロールバック・ガードレール'
                                : lang === 'en'
                                ? 'Zero-Downtime Rollback Guardrail'
                                : '무중단 롤백 가드레일'}
                            </span>
                          </div>
                          <p className="text-slate-700 text-[11.5px] leading-relaxed break-keep">
                            {patch.rollbackSafety}
                          </p>
                        </div>
                      </div>

                      {/* Detailed Bullet Points */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                        {patch.details.map((sec, idx) => (
                          <div key={idx} className="space-y-1.5">
                            <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                              <span className="break-keep">{sec.title}</span>
                            </h4>
                            <ul className="space-y-1 text-slate-600 text-[11.5px]">
                              {sec.items.map((item, itemIdx) => (
                                <li key={itemIdx} className="flex items-start gap-1.5 leading-relaxed break-keep">
                                  <span className="text-blue-500 font-bold flex-shrink-0">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Zero-Downtime Principles & Architecture */}
      {activeTab === 'principles' && (
        <div className="space-y-6">
          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ZERO_DOWNTIME_PRINCIPLES.map((principle) => (
              <div
                key={principle.id}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                    {lang === 'ja' ? `原則 ${principle.step}` : lang === 'en' ? `Principle ${principle.step}` : `원칙 ${principle.step}`}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {getLocalizedPrincipleBenefit(principle.id, principle.benefit, lang)}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 break-keep">
                  {getLocalizedPrincipleTitle(principle.id, principle.title, lang)}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed break-keep">
                  {getLocalizedPrincipleDesc(principle.id, principle.desc, lang)}
                </p>

                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-slate-400 flex-shrink-0" />
                  <span className="font-mono text-slate-600 truncate">{principle.techSpec}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Architecture Comparison: Normal IT vs ArcOS */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 break-keep">
              <Server className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>
                {lang === 'ja'
                  ? '製造現場特化：従来の一般ITシステムパッチ vs ArcOS無停止パッチ比較'
                  : lang === 'en'
                  ? 'Manufacturing Focus: Conventional IT Patch vs ArcOS Zero-Downtime Patch'
                  : '제조 현장 특화: 일반 IT 시스템 패치 vs ArcOS 무중단 패치 비교'}
              </span>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3 whitespace-nowrap">
                      {lang === 'ja' ? '評価項目' : lang === 'en' ? 'Metric' : '구분 항목'}
                    </th>
                    <th className="p-3 text-rose-700 bg-rose-50/50 whitespace-nowrap">
                      {lang === 'ja' ? '従来の一般ソリューション / SI' : lang === 'en' ? 'Legacy ERP / MES Patch' : '기존 일반 솔루션 / SI 패치'}
                    </th>
                    <th className="p-3 text-emerald-700 bg-emerald-50/50 whitespace-nowrap">
                      {lang === 'ja' ? 'ArcOS 無停止ローリングパッチ (IMPIX)' : lang === 'en' ? 'ArcOS Zero-Downtime Rolling Patch' : 'ArcOS 무중단 롤링 패치 (IMPIX)'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3 font-medium text-slate-900 break-keep">
                      {lang === 'ja' ? '製造ライン停止時間' : lang === 'en' ? 'Line Downtime' : '공정 라인 다운타임'}
                    </td>
                    <td className="p-3 text-rose-700 break-keep">
                      {lang === 'ja' ? '15分〜2時間 (サーバー再起動およびライン停止必須)' : lang === 'en' ? '15 mins - 2 hours (Server reboot & line halt required)' : '15분 ~ 2시간 (서버 재기동 및 라인 정지 필요)'}
                    </td>
                    <td className="p-3 text-emerald-700 font-semibold break-keep">
                      {lang === 'ja' ? '0.00秒 (ライン稼働率100%維持)' : lang === 'en' ? '0.00s (100% production line uptime)' : '0.00초 (라인 가동 상태 100% 유지)'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-900 break-keep">
                      {lang === 'ja' ? 'PLC / SCADA センサーデータ' : lang === 'en' ? 'PLC / SCADA Sensor Data' : 'PLC / SCADA 센서 데이터'}
                    </td>
                    <td className="p-3 text-rose-700 break-keep">
                      {lang === 'ja' ? '点検中に収集切断、計測データの欠落が発生' : lang === 'en' ? 'Data collection cut off during maintenance, gaps occurred' : '서버 점검 중 수집 단절, 계측 누락 발생'}
                    </td>
                    <td className="p-3 text-emerald-700 font-semibold break-keep">
                      {lang === 'ja' ? 'オンプレミス・リングバッファによる完全同期 (データ損失0件)' : lang === 'en' ? 'Ring-buffer zero-loss on-prem synchronization (0 pkts lost)' : '온프레미스 링버퍼 임시 수납 후 무손실 동기화 (유실 0건)'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-900 break-keep">
                      {lang === 'ja' ? 'パッチ展開方式' : lang === 'en' ? 'Deployment Strategy' : '패치 배포 방식'}
                    </td>
                    <td className="p-3 text-slate-600 break-keep">
                      {lang === 'ja' ? '週末・夜間の定期メンテナンス枠で一括適用' : lang === 'en' ? 'Batch maintenance window during weekends/nights' : '주말/야간 정기 점검 시간 일괄 배포'}
                    </td>
                    <td className="p-3 text-slate-900 font-medium break-keep">
                      {lang === 'ja' ? 'カナリア10% → 100% 漸進的トラフィック昇格 (業務時間中即時適用)' : lang === 'en' ? 'Canary 10% → 100% progressive cutover (deploy anytime)' : '카나리 10% → 100% 점진적 트래픽 승계 (업무시간 즉시 적용)'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-900 break-keep">
                      {lang === 'ja' ? '異常発生時の復旧' : lang === 'en' ? 'Anomaly Recovery' : '비정상 오류 발생 시 복구'}
                    </td>
                    <td className="p-3 text-rose-700 break-keep">
                      {lang === 'ja' ? 'オペレーター手動ロールバックおよびバックアップ復元 (数時間所要)' : lang === 'en' ? 'Manual technician rollback & restore (hours required)' : '작업자 수동 롤백 및 백업 복구 (수 시간 소요)'}
                    </td>
                    <td className="p-3 text-emerald-700 font-semibold break-keep">
                      {lang === 'ja' ? 'サーキットブレーカー連動で3秒以内に自動ロールバック' : lang === 'en' ? 'Circuit-breaker automated rollback within 3 seconds' : '서킷브레이커 기반 3초 이내 무중단 자동 롤백'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Interactive Zero-Downtime Simulator */}
      {activeTab === 'simulator' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-semibold">
                {lang === 'ja' ? 'インタラクティブ検証ツール' : lang === 'en' ? 'Interactive Verification Tool' : '인터랙티브 검증 도구'}
              </span>
              <span className="text-xs text-slate-500 break-keep">
                {lang === 'ja'
                  ? '稼働中の生産設備環境を模倣し、無停止ローリングパッチの過程を実証します。'
                  : lang === 'en'
                  ? 'Simulates zero-downtime rolling patch process imitating active plant floor.'
                  : '실제 가동 중인 설비 환경을 모사하여 무중단 롤링 패치를 시뮬레이션합니다.'}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1 break-keep">
              {t.simulatorTitle}
            </h2>
            <p className="text-xs text-slate-600 mt-0.5 break-keep">
              {t.simulatorDesc}
            </p>
          </div>

          {/* Config Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {lang === 'ja' ? '対象事業所 (データプレーン)' : lang === 'en' ? 'Target Facility (Data Plane)' : '대상 사업장 (데이터 평면)'}
              </label>
              <div className="p-2 rounded bg-white border border-slate-200 text-slate-800 font-medium">
                {selectedLocation}
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {lang === 'ja' ? 'パッチ対象モジュール' : lang === 'en' ? 'Target Module' : '패치 적용 대상 모듈'}
              </label>
              <select
                aria-label={lang === 'ja' ? 'パッチ対象モジュール選択' : lang === 'en' ? 'Select Target Module' : '패치 적용 대상 모듈 선택'}
                value={simTargetModule}
                onChange={(e) => setSimTargetModule(e.target.value)}
                className="w-full p-2 rounded bg-white border border-slate-200 text-slate-800 font-medium focus:outline-none focus:border-blue-500"
              >
                <option value={lang === 'ja' ? 'B²LAB オントロジーエンジン (v4.2)' : lang === 'en' ? 'B²LAB Ontology Engine (v4.2)' : 'B²LAB 온톨로지 엔진 (v4.2)'}>
                  {lang === 'ja' ? 'B²LAB オントロジーエンジン (v4.2.2 → v4.2.3)' : lang === 'en' ? 'B²LAB Ontology Engine (v4.2.2 → v4.2.3)' : 'B²LAB 온톨로지 엔진 (v4.2.2 → v4.2.3)'}
                </option>
                <option value={lang === 'ja' ? '製造特化MESコア (v4.2)' : lang === 'en' ? 'Manufacturing MES Core (v4.2)' : '제약 특화 MES 코어 (v4.2)'}>
                  {lang === 'ja' ? '製造特化MESコア (v4.2.2 → v4.2.3)' : lang === 'en' ? 'Manufacturing MES Core (v4.2.2 → v4.2.3)' : '제약 특화 MES 코어 (v4.2.2 → v4.2.3)'}
                </option>
                <option value={lang === 'ja' ? 'ArcTunnel mTLS ゲートウェイ' : lang === 'en' ? 'ArcTunnel mTLS Gateway' : 'ArcTunnel mTLS 게이트웨이'}>
                  {lang === 'ja' ? 'ArcTunnel mTLS ゲートウェイ (v4.2.3 鍵更新)' : lang === 'en' ? 'ArcTunnel mTLS Gateway (v4.2.3 Key Rotation)' : 'ArcTunnel mTLS 게이트웨이 (v4.2.3 키 갱신)'}
                </option>
                <option value={lang === 'ja' ? 'A²LAB AI エージェントランタイム' : lang === 'en' ? 'A²LAB AI Agent Runtime' : 'A²LAB AI 에이전트 런타임'}>
                  {lang === 'ja' ? 'A²LAB AI エージェントランタイム (v4.2.2 → v4.2.3)' : lang === 'en' ? 'A²LAB AI Agent Runtime (v4.2.2 → v4.2.3)' : 'A²LAB AI 에이전트 런타임 (v4.2.2 → v4.2.3)'}
                </option>
              </select>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <button
              disabled={isSimulating}
              onClick={runSimulation}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all shadow-sm ${
                isSimulating
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
              <span>{isSimulating ? t.simulatingBtn : t.simulateBtn}</span>
            </button>

            <div className="text-[11px] text-slate-500 flex items-center gap-1.5 break-keep">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>{t.rollbackGuarantee}</span>
            </div>
          </div>

          {/* Progress Stages */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2">
            {[
              {
                num: 1,
                label: lang === 'ja' ? '新規Pod起動' : lang === 'en' ? 'Pod Startup' : '신규 Pod 기동',
                sub: 'Readiness Probe'
              },
              {
                num: 2,
                label: lang === 'ja' ? 'カナリア10%昇格' : lang === 'en' ? 'Canary 10% Cutover' : '카나리 10% 승계',
                sub: lang === 'ja' ? 'PLCリングバッファ保護' : lang === 'en' ? 'PLC Ring-Buffer Safe' : 'PLC 링버퍼 보호'
              },
              {
                num: 3,
                label: lang === 'ja' ? 'トラフィック100%切替' : lang === 'en' ? '100% Traffic Switch' : '트래픽 100% 전환',
                sub: lang === 'ja' ? 'オントロジー同期完了' : lang === 'en' ? 'Ontology Synchronized' : '온톨로지 동기화'
              },
              {
                num: 4,
                label: lang === 'ja' ? '旧Pod安全停止' : lang === 'en' ? 'Safe Pod Decom' : '구버전 안전 종료',
                sub: lang === 'ja' ? 'ダウンタイム 0.00s' : lang === 'en' ? 'Downtime 0.00s' : '다운타임 0.00s'
              }
            ].map((st) => {
              const isPassed = simStep >= st.num;
              return (
                <div
                  key={st.num}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    isPassed
                      ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold">
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                        isPassed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-300 text-slate-600'
                      }`}
                    >
                      {st.num}
                    </span>
                    <span>{st.label}</span>
                  </div>
                  <div className="text-[10px] mt-0.5 text-slate-500">{st.sub}</div>
                </div>
              );
            })}
          </div>

          {/* Terminal Logs Window */}
          <div className="bg-slate-950 text-slate-200 rounded-lg p-4 font-mono text-xs space-y-1.5 shadow-inner border border-slate-800 min-h-[160px]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px] text-slate-400 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-slate-300 font-semibold ml-1">ArcOS Zero-Downtime Patch Console</span>
              </div>
              <span className="text-emerald-400">STATUS: {isSimulating ? 'ROLLING_UPDATE' : simStep === 4 ? 'HEALTHY_COMPLETED' : 'IDLE'}</span>
            </div>

            {simLogs.length === 0 ? (
              <p className="text-slate-500 py-4 text-center break-keep">
                {lang === 'ja'
                  ? '上の [無停止ローリングパッチ実行] ボタンをクリックすると、リアルタイムのローリングアップデート検証が始まります。'
                  : lang === 'en'
                  ? 'Click [Execute Zero-Downtime Rolling Patch] above to simulate live rolling updates.'
                  : '위의 [무중단 롤링 패치 실행] 버튼을 누르면 실시간 롤링 업데이트 시뮬레이션이 진행됩니다.'}
              </p>
            ) : (
              simLogs.map((log, idx) => (
                <div key={idx} className="leading-relaxed flex items-start gap-2">
                  <span className="text-slate-600 select-none">&gt;</span>
                  <span
                    className={
                      log.includes('[SUCCESS]')
                        ? 'text-emerald-400 font-bold'
                        : log.includes('[INIT]')
                        ? 'text-blue-300'
                        : log.includes('[STEP')
                        ? 'text-amber-300'
                        : 'text-slate-300'
                    }
                  >
                    {log}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
