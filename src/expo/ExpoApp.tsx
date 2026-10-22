import React, { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { BookOpen, Cpu, Globe, Layers } from 'lucide-react';
import { ViewFallback } from '../components/ViewFallback';
import { loadLanguage } from '../i18n/loadLanguage';
import { Language } from '../i18n/translations';
import { applyDocumentLanguage } from '../lib/language';
import { EXPO_COPY, EXPO_DOC_IDS, EXPO_SUMMARY_OVERRIDES } from './expoCopy';
import { detectExpoLanguage, storeExpoLanguage } from './expoLanguage';
import { ProductsView } from './ProductsView';

const ResourcesView = lazy(() =>
  import('../components/ResourcesView').then((m) => ({ default: m.ResourcesView }))
);

type ExpoRoute = 'products' | 'manuals';

const LANG_BUTTONS: { code: Language; label: string }[] = [
  { code: 'ja', label: '日本語' },
  { code: 'en', label: 'English' },
  { code: 'ko', label: '한국어' }
];

/**
 * Exhibition edition: product introduction and manuals only. There is no cart,
 * quote, trial or workspace here, and nothing it renders carries a price.
 */
export function ExpoApp() {
  const [lang, setLang] = useState<Language>(detectExpoLanguage);
  const [route, setRoute] = useState<ExpoRoute>('products');
  const [productId, setProductId] = useState<string | null>(null);
  const [pendingDocId, setPendingDocId] = useState<string | null>(null);
  const copy = EXPO_COPY[lang];

  useEffect(() => {
    applyDocumentLanguage(lang);
    document.title = `ArcOS | ${copy.navProducts}`;
  }, [lang, copy.navProducts]);

  const changeLang = useCallback((next: Language) => {
    void loadLanguage(next)
      .then(() => {
        setLang(next);
        storeExpoLanguage(next);
      })
      .catch((error) => console.error(`ArcOS expo: could not load "${next}" strings`, error));
  }, []);

  const goto = useCallback((next: ExpoRoute) => {
    setRoute(next);
    setProductId(null);
    setPendingDocId(null);
    window.scrollTo({ top: 0 });
  }, []);

  const openManual = useCallback((docId: string) => {
    setPendingDocId(docId);
    setRoute('manuals');
    window.scrollTo({ top: 0 });
  }, []);

  const navItems: { id: ExpoRoute; label: string; icon: typeof Layers }[] = [
    { id: 'products', label: copy.navProducts, icon: Layers },
    { id: 'manuals', label: copy.navManuals, icon: BookOpen }
  ];

  return (
    <div className="expo-root min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans antialiased">
      <header className="bg-slate-900 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-3 flex flex-wrap items-center gap-x-6 gap-y-2">
          <button onClick={() => goto('products')} className="flex items-center gap-2.5 text-left">
            <span className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-700 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/20">
              <Cpu className="w-4 h-4" />
            </span>
            <span>
              <span className="block font-bold tracking-tight text-lg leading-tight">ArcOS</span>
              <span className="block text-[11px] text-slate-400 leading-tight">{copy.brandSub}</span>
            </span>
          </button>

          <nav className="flex items-center gap-1 ml-auto sm:ml-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = route === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => goto(item.id)}
                  aria-current={active ? 'page' : undefined}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active ? 'bg-blue-700 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-lg ml-auto text-xs">
            <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-0.5" />
            {LANG_BUTTONS.map((b) => (
              <button
                key={b.code}
                onClick={() => changeLang(b.code)}
                aria-pressed={lang === b.code}
                className={`px-2.5 py-1.5 rounded font-medium transition-colors ${
                  lang === b.code ? 'bg-white text-blue-700 font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {route === 'products' && (
          <>
            {productId === null && (
              <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white">
                <div className="max-w-6xl mx-auto px-6 md:px-8 py-14 md:py-20 space-y-5">
                  <span className="text-xs font-semibold tracking-widest uppercase text-blue-300">
                    {copy.heroEyebrow}
                  </span>
                  <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight max-w-3xl break-keep">
                    {copy.heroTitle}
                  </h1>
                  <p className="text-base md:text-lg text-slate-300 max-w-3xl leading-relaxed break-keep">
                    {copy.heroBody}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href="#products"
                      className="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-semibold transition-colors"
                    >
                      {copy.heroCtaProducts}
                    </a>
                    <button
                      onClick={() => goto('manuals')}
                      className="px-5 py-3 rounded-lg border border-slate-600 hover:bg-slate-800 text-sm font-semibold transition-colors"
                    >
                      {copy.heroCtaManuals}
                    </button>
                  </div>
                </div>
              </section>
            )}
            <ProductsView
              lang={lang}
              selectedId={productId}
              onSelect={(id) => {
                setProductId(id);
                window.scrollTo({ top: 0 });
              }}
              onOpenManual={openManual}
            />
          </>
        )}

        {route === 'manuals' && (
          <Suspense fallback={<ViewFallback />}>
            <ResourcesView
              lang={lang}
              initialDocId={pendingDocId}
              onConsumeInitialDoc={() => setPendingDocId(null)}
              docIds={EXPO_DOC_IDS}
              hidePricing
              summaryOverrides={EXPO_SUMMARY_OVERRIDES[lang]}
            />
          </Suspense>
        )}
      </main>

      <footer className="bg-slate-900 text-slate-400 text-xs text-center py-4">{copy.footer}</footer>
    </div>
  );
}
