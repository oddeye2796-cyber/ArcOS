import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Server,
  Cloud,
  ArrowRightLeft,
  Loader2,
  Terminal,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { AppItem } from '../types';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { getLocalizedAppName, getLocalizedLocationName } from '../i18n/localizedData';

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetApp: AppItem | null;
  targetLocation: string;
  onDeployComplete: (moduleName: string, location: string, category: string) => void;
  lang?: Language;
}

export const DeployModal: React.FC<DeployModalProps> = ({
  isOpen,
  onClose,
  targetApp,
  targetLocation,
  onDeployComplete,
  lang = 'ko'
}) => {
  const t = TRANSLATIONS[lang];
  if (!isOpen || !targetApp) return null;

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [logs, setLogs] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const localizedAppName = getLocalizedAppName(targetApp, lang);
  const localizedTargetLocation = getLocalizedLocationName(targetLocation, lang);

  useEffect(() => {
    setCurrentStep(1);
    setIsCompleted(false);

    const timeStr = new Date().toLocaleTimeString();
    if (lang === 'ja') {
      setLogs([
        `[${timeStr}] [コントロールプレーン] ${localizedAppName} の展開セッションを初期化中...`,
        `[${timeStr}] [コントロールプレーン] OCIコンテナイメージおよびマニフェストの電子署名完了`
      ]);
    } else if (lang === 'en') {
      setLogs([
        `[${timeStr}] [Control Plane] Initializing deployment session for ${localizedAppName}...`,
        `[${timeStr}] [Control Plane] OCI container image and manifest signature verified`
      ]);
    } else {
      setLogs([
        `[${timeStr}] [제어 평면] ${localizedAppName} 배포 세션 초기화...`,
        `[${timeStr}] [제어 평면] OCI 컨테이너 이미지 및 JSON 매니페스트 서명 완료`
      ]);
    }

    const timer1 = setTimeout(() => {
      setCurrentStep(2);
      const tStr = new Date().toLocaleTimeString();
      setLogs((prev) => [
        ...prev,
        lang === 'ja'
          ? `[${tStr}] [ArcTunnel] 対象ノード [${localizedTargetLocation}] mTLSトンネル接続確立 (4ms)`
          : lang === 'en'
          ? `[${tStr}] [ArcTunnel] Target node [${localizedTargetLocation}] mTLS tunnel handshake established (4ms)`
          : `[${tStr}] [ArcTunnel] 대상 노드 [${localizedTargetLocation}] mTLS 터널 핸드셰이크 성공 (4ms)`,
        lang === 'ja'
          ? `[${tStr}] [ArcTunnel] 暗号化チャネル経由でオーケストレーション指示をストリーミング...`
          : lang === 'en'
          ? `[${tStr}] [ArcTunnel] Streaming deployment orchestration commands via encrypted channel...`
          : `[${tStr}] [ArcTunnel] 암호화 채널을 통해 배포 오케스트레이션 명령 스트리밍...`
      ]);
    }, 1200);

    const timer2 = setTimeout(() => {
      setCurrentStep(3);
      const tStr = new Date().toLocaleTimeString();
      setLogs((prev) => [
        ...prev,
        lang === 'ja'
          ? `[${tStr}] [オンプレミス] B²LABオントロジー層接続確認: AAS/OPC-UAタグバインディング`
          : lang === 'en'
          ? `[${tStr}] [On-Premises] B²LAB ontology touchpoint verified: AAS/OPC-UA tag binding`
          : `[${tStr}] [온프레미스] B²LAB 온톨로지 계층 접점 확인: AAS/OPC-UA 태그 바인딩`,
        lang === 'ja'
          ? `[${tStr}] [オンプレミス] ドメイン元データ外部漏洩防止の完全隔離ポリシー適用完了 (Local Loopback)`
          : lang === 'en'
          ? `[${tStr}] [On-Premises] Domain database zero-egress sandbox policy enforced (Local Loopback)`
          : `[${tStr}] [온프레미스] 도메인 원본 DB 외부 유출 방지 격리 정책 적용 완료 (Local Loopback)`
      ]);
    }, 2500);

    const timer3 = setTimeout(() => {
      setCurrentStep(4);
      const tStr = new Date().toLocaleTimeString();
      setLogs((prev) => [
        ...prev,
        lang === 'ja'
          ? `[${tStr}] [オンプレミス] コンテナデーモン起動およびヘルスチェック(HTTP /healthz)合格`
          : lang === 'en'
          ? `[${tStr}] [On-Premises] Container daemon active & passed health checks (HTTP /healthz)`
          : `[${tStr}] [온프레미스] 컨테이너 데몬 기동 및 헬스체크(HTTP /healthz) 통과`,
        lang === 'ja'
          ? `[${tStr}] [コントロールプレーン] ArcOSテナントレジストリ状態 [Active] 登録完了!`
          : lang === 'en'
          ? `[${tStr}] [Control Plane] ArcOS tenant registry marked [Active] successfully!`
          : `[${tStr}] [제어 평면] ArcOS 테넌트 레지스트리 상태 [Active] 등록 완료!`
      ]);
      setIsCompleted(true);
    }, 3800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [targetApp, targetLocation, lang, localizedAppName, localizedTargetLocation]);

  const steps = [
    { num: 1, title: t.deployStep1Title, desc: t.deployStep1Desc },
    { num: 2, title: t.deployStep2Title, desc: t.deployStep2Desc },
    { num: 3, title: t.deployStep3Title, desc: t.deployStep3Desc },
    { num: 4, title: t.deployStep4Title, desc: t.deployStep4Desc }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in zoom-in-95">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-600 text-white">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold break-keep">
                {t.deployModalTitle}
              </h3>
              <p className="text-[11px] text-slate-300">
                {localizedAppName} → {localizedTargetLocation}
              </p>
            </div>
          </div>
          {!isCompleted ? (
            <div className="flex items-center gap-1.5 text-xs text-blue-300 font-mono">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>{t.deployModalDeploying}</span>
            </div>
          ) : (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> {t.deployModalSuccess}
            </span>
          )}
        </div>

        {/* Step Indicator */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-4 gap-2">
            {steps.map((s) => {
              const isDone = currentStep > s.num || isCompleted;
              const isCurrent = currentStep === s.num && !isCompleted;

              return (
                <div
                  key={s.num}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    isDone
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : isCurrent
                      ? 'bg-blue-50 border-blue-400 text-blue-900 ring-2 ring-blue-300'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-center mb-1">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                    ) : (
                      <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-600 text-[10px] flex items-center justify-center font-bold">
                        {s.num}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] font-bold truncate">{s.title}</div>
                  <div className="text-[10px] text-slate-500 truncate">{s.desc}</div>
                </div>
              );
            })}
          </div>

          {/* Terminal Console Output */}
          <div className="bg-slate-950 text-slate-300 rounded-xl p-4 font-mono text-[11px] space-y-1.5 border border-slate-800 shadow-inner h-44 overflow-y-auto">
            <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-slate-800 pb-1 mb-2">
              <span className="flex items-center gap-1">
                <Terminal className="w-3 h-3 text-blue-400" /> ArcTunnel Daemon stdout
              </span>
              <span className="text-emerald-400">mTLS Encrypted</span>
            </div>
            {logs.map((log, index) => (
              <div key={index} className="leading-relaxed text-slate-300">
                {log}
              </div>
            ))}
          </div>

          {/* Security guarantee footer */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="break-keep">
                {t.deploySecurityNote}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
          {isCompleted ? (
            <button
              onClick={() => {
                onDeployComplete(targetApp.name, targetLocation, targetApp.category);
                onClose();
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-sm whitespace-nowrap"
            >
              {t.deployViewInWorkspace}
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
            >
              {t.deployRunInBackground}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

