import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Boxes, CheckCircle2, Download } from 'lucide-react';
import { APPS_DATA } from '../data/appsData';
import {
  getLocalizedAppCategory,
  getLocalizedAppName,
  getLocalizedGroupLabel,
  getLocalizedSubModuleDesc,
  getLocalizedSubModuleName
} from '../i18n/localizedData';
import { getAppValueProp } from '../i18n/appValueData';
import { Language } from '../i18n/translations';
import { AppItem } from '../types';
import { EXPO_COPY } from './expoCopy';
import { DownloadModal } from './DownloadModal';
import { DOWNLOAD_KINDS, DownloadKind } from './downloadRequest';
import { expoAppDesc, expoAppDetail, isPricingOutcome } from './pricingScrub';

interface ProductsViewProps {
  lang: Language;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

function expoValueProp(appId: string, lang: Language) {
  const value = getAppValueProp(appId, lang);
  if (!value) return null;
  return { ...value, outcomes: value.outcomes.filter((o) => !isPricingOutcome(o.value, o.label)) };
}

/** Product introduction. Deliberately shows no price, unit or trial controls. */
export const ProductsView: React.FC<ProductsViewProps> = ({
  lang,
  selectedId,
  onSelect
}) => {
  const copy = EXPO_COPY[lang];
  const selected = selectedId ? APPS_DATA.find((a) => a.id === selectedId) : undefined;

  if (selected) {
    return <ProductDetail app={selected} lang={lang} onBack={() => onSelect(null)} />;
  }

  return (
    <section id="products" className="max-w-6xl mx-auto px-6 md:px-8 py-10 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{copy.productsTitle}</h2>
        <p className="text-sm text-slate-600 mt-1">{copy.productsSubtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {APPS_DATA.map((app) => {
          const value = expoValueProp(app.id, lang);
          return (
            <button
              key={app.id}
              onClick={() => onSelect(app.id)}
              className="group text-left bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col gap-3 hover:border-blue-400 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span className="self-start text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-100">
                {getLocalizedAppCategory(app, lang)}
              </span>
              <h3 className="text-base font-bold text-slate-900 break-keep">
                {getLocalizedAppName(app, lang)}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed break-keep">
                {expoAppDesc(app, lang)}
              </p>
              {value && (
                <div className="flex flex-wrap gap-1.5">
                  {value.outcomes.map((o) => (
                    <span
                      key={o.label}
                      className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700"
                    >
                      <strong className="font-semibold">{o.value}</strong> {o.label}
                    </span>
                  ))}
                </div>
              )}
              <span className="mt-auto pt-2 inline-flex items-center gap-1 text-xs font-semibold text-blue-700 group-hover:gap-2 transition-all">
                {copy.viewDetails}
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

const ProductDetail: React.FC<{
  app: AppItem;
  lang: Language;
  onBack: () => void;
}> = ({ app, lang, onBack }) => {
  const copy = EXPO_COPY[lang];
  const value = expoValueProp(app.id, lang);
  const [download, setDownload] = useState<{ kind: DownloadKind; moduleId?: string; name: string } | null>(null);

  return (
    <article className="max-w-5xl mx-auto px-6 md:px-8 py-8 space-y-6">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-blue-700 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        {copy.back}
      </button>

      <header className="border-b border-slate-200 pb-5 space-y-2">
        <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-100">
          {getLocalizedAppCategory(app, lang)}
        </span>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight break-keep">
          {getLocalizedAppName(app, lang)}
        </h1>
        {value && <p className="text-base text-slate-700 leading-relaxed break-keep">{value.headline}</p>}
      </header>

      <Card title={copy.overview}>
        <p className="text-sm text-slate-700 leading-relaxed break-keep">
          {expoAppDetail(app, lang)}
        </p>
      </Card>

      {value && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {value.outcomes.map((o) => (
            <div key={o.label} className="bg-slate-900 text-white rounded-xl p-5">
              <div className="text-2xl font-bold tracking-tight">{o.value}</div>
              <div className="text-xs text-slate-300 mt-1 break-keep">{o.label}</div>
            </div>
          ))}
        </div>
      )}

      {value && (
        <Card title={copy.useCases}>
          <ul className="space-y-2">
            {value.useCases.map((u) => (
              <li key={u} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed break-keep">{u}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {app.groups && (
        <Card title={copy.includedModules}>
          <div className="space-y-4">
            {app.groups.map((group) => (
              <div key={group.label} className="space-y-2">
                <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                  <Boxes className="w-3.5 h-3.5" />
                  {getLocalizedGroupLabel(group.label, lang)}
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {group.items.map((item) => (
                    <li key={item.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <div className="text-sm font-semibold text-slate-900 break-keep">
                        {getLocalizedSubModuleName(item.id, item.name, lang)}
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed break-keep">
                        {getLocalizedSubModuleDesc(item.id, item.desc, lang)}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {DOWNLOAD_KINDS.map((kind) => (
                          <button
                            key={kind}
                            onClick={() =>
                              setDownload({
                                kind,
                                moduleId: item.id,
                                name: getLocalizedSubModuleName(item.id, item.name, lang)
                              })
                            }
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-slate-300 bg-white text-[11px] font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-700 transition-colors"
                          >
                            <Download className="w-3 h-3" />
                            {kind === 'brochure' ? copy.downloadBrochure : copy.downloadManual}
                          </button>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Products with modules get a download pair per module instead. */}
      {!app.groups && (
        <Card title={copy.downloadsTitle}>
          <div className="flex flex-wrap gap-2">
            {(['brochure', 'manual'] as const).map((kind) => (
              <button
                key={kind}
                onClick={() => setDownload({ kind, name: getLocalizedAppName(app, lang) })}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-sm font-semibold text-slate-800 hover:border-blue-500 hover:text-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                {kind === 'brochure' ? copy.downloadBrochure : copy.downloadManual}
              </button>
            ))}
          </div>
        </Card>
      )}

      {download && (
        <DownloadModal
          lang={lang}
          productId={app.id}
          moduleId={download.moduleId}
          productName={download.name}
          kind={download.kind}
          onClose={() => setDownload(null)}
        />
      )}

    </article>
  );
};

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
    <h2 className="text-sm font-bold text-slate-900">{title}</h2>
    {children}
  </section>
);
