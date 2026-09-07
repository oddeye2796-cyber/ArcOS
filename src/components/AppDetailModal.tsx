import React, { useState } from 'react';
import { AppItem, CartItem, SubModuleItem } from '../types';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { CurrencyCode, formatMoney } from '../lib/currency';
import { getAppValueProp } from '../i18n/appValueData';
import { findDocForModule } from '../data/resourcesData';
import { useModalDismiss } from '../lib/useModalDismiss';
import {
  getLocalizedAppName,
  getLocalizedAppDesc,
  getLocalizedAppCategory,
  getLocalizedAppDetail,
  getLocalizedAppUnit,
  getLocalizedGroupLabel,
  getLocalizedSubModuleName,
  getLocalizedSubModuleDesc,
  getLocalizedSubModuleUnit,
  getLocalizedDepName,
  getLocalizedDepDesc,
  getLocalizedDataScopeDb,
  getLocalizedDataScopeStd,
  getLocalizedPermissionScope,
  getLocalizedLocationName
} from '../i18n/localizedData';
import {
  X,
  CheckCircle2,
  Sparkles,
  BookOpen,
  AlertTriangle,
  Server,
  Shield,
  Layers,
  ArrowRight,
  Database,
  Terminal,
  PlusCircle,
  Building2,
  Lock,
  Unlock,
  Cpu,
  FlaskConical
} from 'lucide-react';

interface AppDetailModalProps {
  app: AppItem | null;
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onToggleCartItem: (item: CartItem) => void;
  onSelectRadioMES: (item: SubModuleItem, suiteApp: AppItem) => void;
  onDeployRequest: (app: AppItem, targetLocation: string) => void;
  onApplyPoC?: (app: AppItem) => void;
  lang?: Language;
  currency?: CurrencyCode;
  onOpenResource?: (docId: string) => void;
}

export const AppDetailModal: React.FC<AppDetailModalProps> = ({
  app,
  isOpen,
  onClose,
  cart,
  onToggleCartItem,
  onSelectRadioMES,
  onDeployRequest,
  onApplyPoC,
  onOpenResource,
  lang = 'ko'
}) => {
  const t = TRANSLATIONS[lang];

  // Hooks run before the `isOpen` guard: bailing out first would change the hook
  // count between renders of this same mounted instance.
  const [selectedLocation, setSelectedLocation] = useState<string>(
    () => app?.deploymentLocations[0]?.location || '[경남/사천] 항공·정밀가공 사업장'
  );
  const [permissionStates, setPermissionStates] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    app?.permissions.forEach((perm) => {
      initial[perm.scope] = perm.granted;
    });
    return initial;
  });
  const dismiss = useModalDismiss<HTMLDivElement>(isOpen, onClose);

  if (!isOpen || !app) return null;

  const togglePermission = (scope: string) => {
    setPermissionStates((prev) => ({
      ...prev,
      [scope]: !prev[scope]
    }));
  };

  const valueProp = getAppValueProp(app.id, lang);
  const relatedDoc = findDocForModule(app.id);

  const isItemInCart = (id: string) => cart.some((c) => c.id === id);

  const blockedDeps = app.deps.filter((d) => !d.ok);
  const allDepsOk = blockedDeps.length === 0;

  // Selected submodules for this app
  const currentSuiteItemsInCart = app.suite && app.groups
    ? app.groups.flatMap((g) => g.items.filter((i) => isItemInCart(i.id)))
    : [];

  return (
    <div
      ref={dismiss.backdropRef}
      onMouseDown={dismiss.onBackdropMouseDown}
      onClick={dismiss.onBackdropClick}
      role="presentation"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                {getLocalizedAppCategory(app, lang)}
              </span>
              <span className="text-xs font-medium text-slate-500 font-mono">ID: {app.id}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1 flex items-center gap-2 break-keep">
              {getLocalizedAppName(app, lang)}
              {app.suite && (
                <span className="text-xs font-medium text-slate-500 font-normal">
                  ({t.suiteCombinationsTitle})
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">{getLocalizedAppDesc(app, lang)}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-sm">
          {/* Detailed Info */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-900 block mb-1">{t.moduleOverviewPrinciples}</strong>
            {getLocalizedAppDetail(app, lang)}
          </div>

          {/* ArcMind Special Distinction Notice */}
          {app.id === 'arcmind' && (
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-950 space-y-1.5">
              <div className="font-bold flex items-center gap-1.5 text-indigo-900 text-xs sm:text-sm">
                <Cpu className="w-4 h-4 text-indigo-600" />
                <span>{t.arcMindNoticeTitle}</span>
              </div>
              <p className="text-indigo-800 leading-relaxed text-xs break-keep">
                {t.arcMindNoticeDesc}
              </p>
            </div>
          )}

          {/* Why adopt this — shown before the installability checks below */}
          {valueProp && (
            <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4 space-y-3.5">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>{t.valueSectionTitle}</span>
              </h3>

              <p className="text-xs text-slate-800 leading-relaxed break-keep font-medium">
                {valueProp.headline}
              </p>

              <div>
                <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                  {t.valueOutcomesTitle}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {valueProp.outcomes.map((outcome) => (
                    <div
                      key={outcome.label}
                      className="rounded-lg bg-white border border-blue-100 px-3 py-2"
                    >
                      <div className="text-sm font-bold text-blue-700 font-mono break-keep">
                        {outcome.value}
                      </div>
                      <div className="text-[10.5px] text-slate-600 leading-snug break-keep">
                        {outcome.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                  {t.valueUseCasesTitle}
                </span>
                <ul className="space-y-1">
                  {valueProp.useCases.map((useCase) => (
                    <li key={useCase} className="flex items-start gap-1.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed break-keep">{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {relatedDoc && onOpenResource && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenResource(relatedDoc.id);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800 hover:underline transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{t.valueDocsLinkLabel}</span>
                </button>
              )}
            </div>
          )}

          {/* Section A: If Smart Factory Suite, Module Selector */}
          {app.suite && app.groups && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>{t.suiteSelectorTitle}</span>
                </h3>
                <span className="text-xs text-slate-500">
                  {t.suiteSelectedCount.replace('{count}', String(currentSuiteItemsInCart.length))}
                </span>
              </div>

              <div className="space-y-4">
                {app.groups.map((group) => (
                  <div key={group.label} className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200">
                    <div className="text-xs font-semibold text-slate-800 mb-2.5 flex items-center justify-between">
                      <span>{getLocalizedGroupLabel(group.label, lang)}</span>
                      <span className="text-[11px] font-normal text-slate-500">
                        {group.type === 'radio' ? t.singleRequiredChoice : t.multipleChoice}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                      {group.items.map((item) => {
                        const inCart = isItemInCart(item.id);
                        const localizedSubName = getLocalizedSubModuleName(item.id, item.name, lang);
                        const localizedSubDesc = getLocalizedSubModuleDesc(item.id, item.desc, lang);
                        const localizedSubUnit = getLocalizedSubModuleUnit(item.id, item.unitLabel, lang);

                        return (
                          <div
                            key={item.id}
                            onClick={() => {
                              if (group.type === 'radio') {
                                onSelectRadioMES(item, app);
                              } else {
                                onToggleCartItem({
                                  id: item.id,
                                  appId: app.id,
                                  name: localizedSubName,
                                  category: app.category,
                                  price: item.price,
                                  per: item.per,
                                  unitLabel: localizedSubUnit
                                });
                              }
                            }}
                            className={`p-3 rounded-lg border text-left cursor-pointer transition-all flex flex-col justify-between ${
                              inCart
                                ? 'bg-blue-50/80 border-blue-500 ring-1 ring-blue-400'
                                : 'bg-white border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div>
                              <div className="flex items-start justify-between gap-1">
                                <span className="font-semibold text-xs text-slate-900">
                                  {localizedSubName}
                                </span>
                                <input
                                  type={group.type}
                                  checked={inCart}
                                  readOnly
                                  className="mt-0.5 text-blue-600 accent-blue-600 pointer-events-none"
                                />
                              </div>
                              <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                                {localizedSubDesc}
                              </p>
                            </div>
                            <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                              <span className="text-slate-500">{t.standardMapping} {item.tagMappingPercent}%</span>
                              <span className="font-semibold text-slate-900">{localizedSubUnit}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section B: 4-Point Pre-Installation Check (설치 전 4단계 사전 점검) */}
          <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-blue-600" />
                  <span>{t.preInstallGatesTitle}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t.preInstallGatesSub}
                </p>
              </div>
              <div className="flex items-center gap-1">
                {allDepsOk ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {t.allGatesPassed}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                    <AlertTriangle className="w-3.5 h-3.5" /> {t.gatesBlockedCount.replace('{count}', String(blockedDeps.length))}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Gate 1: 선행 모듈 점검 */}
              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px]">1</span>
                    {t.gate1Title}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {t.gate1DepsCount.replace('{count}', String(app.deps.length))}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {app.deps.length === 0 ? (
                    <div className="text-xs text-slate-500 py-1">{t.gate1NoDeps}</div>
                  ) : (
                    app.deps.map((dep, idx) => (
                      <div
                        key={idx}
                        className="text-xs flex items-start justify-between gap-2 p-2 rounded bg-white border border-slate-200"
                      >
                        <div className="flex items-start gap-1.5 min-w-0">
                          {dep.ok ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                          )}
                          <div>
                            <div className="font-medium text-slate-800">{getLocalizedDepName(dep.name, lang)}</div>
                            <div className="text-[11px] text-slate-500">{getLocalizedDepDesc(dep.desc, lang)}</div>
                          </div>
                        </div>
                        {!dep.ok && (
                          <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded whitespace-nowrap">
                            {t.recommendedWithCart}
                          </span>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Gate 2: 데이터 연결 및 표준 스키마 매핑 */}
              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px]">2</span>
                    {t.gate2Title}
                  </span>
                  <span className="text-xs font-semibold text-blue-700">
                    {app.dataScope.mappingProgress}% {t.cardComplete}
                  </span>
                </div>
                <div className="space-y-1.5 bg-white p-2.5 rounded border border-slate-200 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>{t.gate2AppliedStd}</span>
                    <span className="font-medium font-mono text-slate-900">{getLocalizedDataScopeStd(app.dataScope.schemaStd, lang)}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${app.dataScope.mappingProgress}%` }}
                    ></div>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1 pt-1">
                    <Database className="w-3 h-3 text-slate-400" />
                    <span>{getLocalizedDataScopeDb(app.dataScope.domainDb, lang)}</span>
                  </div>
                </div>
              </div>

              {/* Gate 3: 배포 위치 및 터널 연결 상태 */}
              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px]">3</span>
                    {t.gate3Title}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="bg-white p-2 rounded border border-slate-200 space-y-1 text-xs">
                    <label className="text-[11px] text-slate-500 block">{t.gate3NodeSelect}</label>
                    <select
                      aria-label={t.ariaSelectDeployNode}
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded p-1.5 text-xs text-slate-900 font-medium"
                    >
                      {app.deploymentLocations.map((loc) => (
                        <option key={loc.location} value={loc.location}>
                          {getLocalizedLocationName(loc.location, lang)} ({t.colRuntime} {loc.runtimeVersion} · {t.connectedStatus})
                        </option>
                      ))}
                    </select>
                    <div className="flex items-center justify-between text-[11px] pt-1 text-emerald-700 font-medium">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3 h-3" /> {t.gate3TunnelLink}
                      </span>
                      <span>{t.gate3Latency}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gate 4: 권한 및 제어 승인 범위 */}
              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px]">4</span>
                    {t.gate4Title}
                  </span>
                  <span className="text-[11px] text-slate-500">{t.gate4SecurityApproved}</span>
                </div>
                <div className="space-y-1 text-xs">
                  {app.permissions.map((perm) => {
                    const isGranted = permissionStates[perm.scope] ?? perm.granted;
                    return (
                      <div
                        key={perm.scope}
                        className="flex items-center justify-between p-1.5 px-2 bg-white rounded border border-slate-200"
                      >
                        <div className="flex items-center gap-1.5">
                          <Shield
                            className={`w-3.5 h-3.5 ${
                              perm.isWriteCmd ? 'text-amber-500' : 'text-blue-500'
                            }`}
                          />
                          <span className="text-[11.5px] text-slate-800">
                            {getLocalizedPermissionScope(perm.scope, lang)}
                          </span>
                          {perm.isWriteCmd && (
                            <span className="text-[10px] bg-amber-50 text-amber-700 px-1 rounded border border-amber-200">
                              {t.gate4WriteControl}
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => togglePermission(perm.scope)}
                          className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded font-medium transition-colors ${
                            isGranted
                              ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                        >
                          {isGranted ? (
                            <>
                              <Unlock className="w-3 h-3" /> {t.gate4Granted}
                            </>
                          ) : (
                            <>
                              <Lock className="w-3 h-3" /> {t.gate4Blocked}
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            {app.suite ? (
              <span>
                {t.suiteModulesSelected.replace('{count}', String(currentSuiteItemsInCart.length))}
              </span>
            ) : (
              <span>{t.billingUnitLabel} {getLocalizedAppUnit(app, lang)}</span>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {t.closeBtn}
            </button>

            {app.id !== 'b2lab' && onApplyPoC && (
              <button
                onClick={() => {
                  onClose();
                  onApplyPoC(app);
                }}
                className="px-4 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs whitespace-nowrap"
              >
                <FlaskConical className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                <span>{t.pocBtnText}</span>
              </button>
            )}

            {!app.suite && app.id !== 'b2lab' && (
              <button
                onClick={() => {
                  onToggleCartItem({
                    id: app.id,
                    appId: app.id,
                    name: getLocalizedAppName(app, lang),
                    category: app.category,
                    price: app.price || 0,
                    per: app.per || 'flat',
                    unitLabel: getLocalizedAppUnit(app, lang)
                  });
                }}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  isItemInCart(app.id)
                    ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                <PlusCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>
                  {isItemInCart(app.id) ? t.removeFromQuote : t.addToQuote}
                </span>
              </button>
            )}

            <button
              onClick={() => onDeployRequest(app, selectedLocation)}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-sm flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>
                {t.deployRequestToLocation.replace('{location}', getLocalizedLocationName(selectedLocation, lang))}
              </span>
              <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
