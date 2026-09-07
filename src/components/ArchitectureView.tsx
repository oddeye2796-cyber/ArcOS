import React, { useState } from 'react';
import {
  Layers,
  Server,
  Cloud,
  ArrowRightLeft,
  ShieldCheck,
  Cpu,
  FileCode2,
  Table,
  CheckCircle2
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface ArchitectureViewProps {
  lang: Language;
}

/**
 * Renders a localized string where `**...**` segments are emphasized.
 * Keeping the emphasis inside the translation lets each language place it
 * on the grammatically correct span instead of forcing the Korean word order.
 */
const rich = (text: string): React.ReactNode[] =>
  text.split('**').map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : <React.Fragment key={i}>{part}</React.Fragment>
  );

export const ArchitectureView: React.FC<ArchitectureViewProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [activeTab, setActiveTab] = useState<'hybrid' | 'suite' | 'plugandplay' | 'pricing' | 'policy'>('hybrid');

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
            {t.archBadge}
          </span>
          <span className="text-xs text-slate-500">
            {t.archBadgeSub}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mt-1 tracking-tight">
          {t.archTitle}
        </h1>
        <p className="text-xs text-slate-600 mt-0.5">
          {t.archDesc}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-medium">
        {[
          { id: 'hybrid', label: t.archTab1, icon: Cloud },
          { id: 'suite', label: t.archTab2, icon: Layers },
          { id: 'plugandplay', label: t.archTab3, icon: FileCode2 },
          { id: 'pricing', label: t.archTab4, icon: Table },
          { id: 'policy', label: t.archTab5, icon: ShieldCheck }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-slate-900 text-white font-semibold shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'hybrid' && (
          <div className="space-y-5">
            {/* Visual Boundary Diagram */}
            <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-blue-400 font-semibold uppercase">
                  Data Boundary Architecture
                </span>
                <span className="text-xs text-slate-400">
                  {t.archBoundaryNote}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
                {/* Control Plane */}
                <div className="md:col-span-3 bg-slate-800/90 border border-slate-700 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                    <Cloud className="w-4 h-4" />
                    <span>{t.archControlPlaneTitle}</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    {t.archControlPlaneDesc}
                  </p>
                  <ul className="text-xs text-slate-400 space-y-1.5 pt-2 border-t border-slate-700/60">
                    {[t.archControlPlaneItem1, t.archControlPlaneItem2, t.archControlPlaneItem3].map(
                      (item) => (
                        <li key={item} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                          <span>{item}</span>
                        </li>
                      )
                    )}
                  </ul>
                  <div className="text-[11px] text-red-300 font-semibold bg-red-950/40 p-2 rounded border border-red-900/50">
                    {t.archControlPlaneWarning}
                  </div>
                </div>

                {/* Tunnel Bridge */}
                <div className="md:col-span-1 flex flex-col items-center justify-center py-2 text-center">
                  <div className="w-full flex md:flex-col items-center justify-center gap-2">
                    <div className="h-0.5 md:h-12 w-12 md:w-0.5 bg-blue-500/50"></div>
                    <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg">
                      <ArrowRightLeft className="w-4 h-4 animate-pulse" />
                    </div>
                    <div className="h-0.5 md:h-12 w-12 md:w-0.5 bg-blue-500/50"></div>
                  </div>
                  <span className="text-[11px] font-mono text-blue-300 mt-2 font-bold">
                    ArcTunnel
                  </span>
                  <span className="text-[10px] text-slate-400">{t.archTunnelEncryption}</span>
                </div>

                {/* Data Plane */}
                <div className="md:col-span-3 bg-slate-800/90 border border-slate-700 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <Server className="w-4 h-4" />
                    <span>{t.archDataPlaneTitle}</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    {t.archDataPlaneDesc}
                  </p>
                  <ul className="text-xs text-slate-400 space-y-1.5 pt-2 border-t border-slate-700/60">
                    {[t.archDataPlaneItem1, t.archDataPlaneItem2, t.archDataPlaneItem3].map((item) => (
                      <li key={item} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-[11px] text-emerald-300 font-semibold bg-emerald-950/40 p-2 rounded border border-emerald-900/50">
                    {t.archDataPlaneGuarantee}
                  </div>
                </div>
              </div>

              {/* Data crossing the boundary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
                <div className="bg-slate-850 p-3 rounded-lg border border-slate-700/60">
                  <span className="text-blue-300 font-semibold block mb-1">
                    {t.archDownstreamTitle}
                  </span>
                  <p className="text-slate-400">
                    {t.archDownstreamDesc}
                  </p>
                </div>
                <div className="bg-slate-850 p-3 rounded-lg border border-slate-700/60">
                  <span className="text-emerald-300 font-semibold block mb-1">
                    {t.archUpstreamTitle}
                  </span>
                  <p className="text-slate-400">
                    {t.archUpstreamDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'suite' && (
          <div className="space-y-4 text-xs text-slate-700">
            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
              <h3 className="text-sm font-bold text-slate-900">
                {t.archSuiteSec1Title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {rich(t.archSuiteSec1Desc)}
              </p>
              <div className="p-3 bg-slate-50 rounded-lg font-mono text-slate-800 border border-slate-200">
                {rich(t.archSuiteFormula)}
              </div>
              <p className="text-slate-500">
                {rich(t.archSuiteSec1Note)}
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
              <h3 className="text-sm font-bold text-slate-900">
                {t.archSuiteSec2Title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 bg-blue-50/60 rounded-lg border border-blue-200 space-y-1.5">
                  <div className="font-bold text-blue-900 text-xs">{t.archSuiteA2labTitle}</div>
                  <p className="text-slate-600">
                    {rich(t.archSuiteA2labDesc)}
                  </p>
                </div>
                <div className="p-3.5 bg-indigo-50/60 rounded-lg border border-indigo-200 space-y-1.5">
                  <div className="font-bold text-indigo-900 text-xs">{t.archSuiteOrchTitle}</div>
                  <p className="text-slate-600">
                    {rich(t.archSuiteOrchDesc)}
                  </p>
                </div>
              </div>
              <p className="text-slate-500 leading-relaxed">
                {t.archSuiteSec2Note}
              </p>
            </div>

            {/* ArcMind vs MES Distinction */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-600" />
                <span>{t.archSuiteSec3Title}</span>
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {rich(t.archSuiteSec3Desc)}
              </p>
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-amber-900 text-xs">
                {rich(t.archSuiteSec3Warning)}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'plugandplay' && (
          <div className="space-y-4 text-xs text-slate-700">
            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-blue-600" />
                <span>{t.archPnpTitle}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {[
                  { title: t.archPnpItem1Title, desc: t.archPnpItem1Desc },
                  { title: t.archPnpItem2Title, desc: t.archPnpItem2Desc },
                  { title: t.archPnpItem3Title, desc: t.archPnpItem3Desc },
                  { title: t.archPnpItem4Title, desc: t.archPnpItem4Desc }
                ].map((rule) => (
                  <div
                    key={rule.title}
                    className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1"
                  >
                    <span className="font-bold text-slate-900 block">{rule.title}</span>
                    <p className="text-slate-600">{rule.desc}</p>
                  </div>
                ))}
              </div>

              {/* AI Agent Manifest */}
              <div className="p-3.5 bg-slate-900 text-slate-200 rounded-lg font-mono text-[11px] space-y-1">
                <span className="text-blue-400 font-bold block mb-1">
                  {t.archPnpManifestTitle}
                </span>
                <pre className="overflow-x-auto text-slate-300">
{`{
  "agent_id": "agent-quality-prediction-v2",
  "judgement_target": "${t.archPnpManifestTarget}",
  "required_inputs": ["tag.sensor.thickness.stream", "tag.motor.temp"],
  "confidence_output_format": { "score": "float[0..1]", "basis_factors": "array" }
}`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="space-y-4 text-xs text-slate-700">
            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
              <h3 className="text-sm font-bold text-slate-900">
                {t.archPricingTitle}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {t.archPricingDesc}
              </p>

              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">{t.archPricingColModule}</th>
                      <th className="p-2.5">{t.archPricingColGrowth}</th>
                      <th className="p-2.5">{t.archPricingColBasis}</th>
                      <th className="p-2.5">{t.archPricingColMechanism}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {t.archPricingRows.map((row, idx) => (
                      <tr key={row.module}>
                        <td className="p-2.5 font-semibold">{row.module}</td>
                        <td
                          className={
                            idx === 0
                              ? 'p-2.5 text-slate-500'
                              : 'p-2.5 font-bold text-blue-700'
                          }
                        >
                          {row.growth}
                        </td>
                        <td className="p-2.5 font-mono">{row.basis}</td>
                        <td className="p-2.5">{row.mechanism}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'policy' && (
          <div className="space-y-4 text-xs text-slate-700">
            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
              <h3 className="text-sm font-bold text-slate-900">
                {t.archPolicyTitle}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 space-y-2">
                  <span className="font-bold text-amber-900 text-xs block">
                    {t.archPolicy1Title}
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {rich(t.archPolicy1Desc)}
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-900 text-xs block">
                    {t.archPolicy2Title}
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {rich(t.archPolicy2Desc)}
                  </p>
                </div>
                <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200 space-y-2">
                  <span className="font-bold text-blue-900 text-xs block">
                    {t.archPolicy3Title}
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {rich(t.archPolicy3Desc)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
