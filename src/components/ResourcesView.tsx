import React, { useMemo, useState } from 'react';
import {
  BookOpen,
  Search,
  FileText,
  ArrowLeft,
  Clock,
  Users,
  Layers,
  CalendarDays,
  ScrollText,
  Wrench,
  Compass
} from 'lucide-react';
import { ArchitectureView } from './ArchitectureView';
import { RESOURCE_DOCS, ResourceDoc, ResourceKind } from '../data/resourcesData';
import { getResourceContent } from '../i18n/resourcesLocalization';
import { getLocalizedModuleLabel } from '../i18n/localizedData';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface ResourcesViewProps {
  lang: Language;
  /** Document to open directly, set when arriving from a contextual link. */
  initialDocId?: string | null;
  onConsumeInitialDoc?: () => void;
}

const KIND_ICON: Record<ResourceKind, React.ComponentType<{ className?: string }>> = {
  whitepaper: ScrollText,
  manual: Wrench,
  guide: Compass,
  spec: FileText
};

const KIND_STYLE: Record<ResourceKind, string> = {
  whitepaper: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  manual: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  guide: 'bg-blue-50 text-blue-800 border-blue-200',
  spec: 'bg-slate-100 text-slate-700 border-slate-200'
};

export const ResourcesView: React.FC<ResourcesViewProps> = ({
  lang,
  initialDocId,
  onConsumeInitialDoc
}) => {
  const t = TRANSLATIONS[lang];
  const [selectedId, setSelectedId] = useState<string | null>(initialDocId ?? null);
  const [query, setQuery] = useState('');
  const [kindFilter, setKindFilter] = useState<ResourceKind | 'all'>('all');

  // A deep link arriving while this view is already mounted still opens.
  const [lastInitial, setLastInitial] = useState<string | null | undefined>(initialDocId);
  if (initialDocId && initialDocId !== lastInitial) {
    setLastInitial(initialDocId);
    setSelectedId(initialDocId);
  }

  const kindLabel: Record<ResourceKind, string> = {
    whitepaper: t.resourcesKindWhitepaper,
    manual: t.resourcesKindManual,
    guide: t.resourcesKindGuide,
    spec: t.resourcesKindSpec
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RESOURCE_DOCS.filter((doc) => {
      if (kindFilter !== 'all' && doc.kind !== kindFilter) return false;
      if (!q) return true;
      const content = getResourceContent(doc.id, lang);
      if (!content) return false;
      // Search the visible text, plus the module names people actually know.
      const haystack = [
        content.title,
        content.summary,
        content.audience,
        ...content.sections.flatMap((s) => [s.heading, s.body ?? '', ...(s.items ?? [])]),
        ...doc.relatedModuleIds.map((id) => getLocalizedModuleLabel(id, lang))
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, kindFilter, lang]);

  const selectedDoc: ResourceDoc | undefined = selectedId
    ? RESOURCE_DOCS.find((doc) => doc.id === selectedId)
    : undefined;

  const closeDoc = () => {
    setSelectedId(null);
    onConsumeInitialDoc?.();
  };

  // ---- Reader ---------------------------------------------------------------
  if (selectedDoc) {
    const content = getResourceContent(selectedDoc.id, lang);
    const Icon = KIND_ICON[selectedDoc.kind];
    return (
      <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
        <button
          onClick={closeDoc}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{t.resourcesBackToList}</span>
        </button>

        <div className="border-b border-slate-200 pb-5 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded border ${
                KIND_STYLE[selectedDoc.kind]
              }`}
            >
              <Icon className="w-3.5 h-3.5 flex-shrink-0" />
              {kindLabel[selectedDoc.kind]}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
              <CalendarDays className="w-3 h-3 flex-shrink-0" />
              {t.resourcesUpdatedLabel} {selectedDoc.updatedAt}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
              <Clock className="w-3 h-3 flex-shrink-0" />
              {t.resourcesReadingTime.replace('{min}', String(selectedDoc.readingMinutes))}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 tracking-tight break-keep">
            {content?.title ?? selectedDoc.id}
          </h1>
          {content && (
            <p className="text-xs text-slate-600 break-keep leading-relaxed">{content.summary}</p>
          )}
          {content && (
            <div className="inline-flex items-center gap-1 text-[11px] text-slate-500 pt-1">
              <Users className="w-3 h-3 flex-shrink-0" />
              {t.resourcesAudienceLabel}: {content.audience}
            </div>
          )}
        </div>

        {/* Documents that are really an interactive view render that view. */}
        {selectedDoc.component === 'architecture' ? (
          <div className="-mx-6 md:-mx-8">
            <ArchitectureView lang={lang} />
          </div>
        ) : (
          <div className="space-y-5">
            {content?.sections.map((section) => (
              <section
                key={section.heading}
                className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-2.5"
              >
                <h2 className="text-sm font-bold text-slate-900 break-keep">{section.heading}</h2>
                {section.body && (
                  <p className="text-xs text-slate-600 leading-relaxed break-keep">{section.body}</p>
                )}
                {section.items && (
                  <ul className="space-y-1.5">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-slate-700">
                        <span className="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />
                        <span className="leading-relaxed break-keep">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ---- Index ----------------------------------------------------------------
  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
            {t.navResourcesBadge}
          </span>
          <span className="text-xs text-slate-500">
            {RESOURCE_DOCS.length}{t.resourcesCountLabel}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mt-1 tracking-tight flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-600 flex-shrink-0" />
          <span>{t.resourcesTitle}</span>
        </h1>
        <p className="text-xs text-slate-600 mt-0.5 break-keep">{t.resourcesSubtitle}</p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.resourcesSearchPlaceholder}
            aria-label={t.resourcesSearchPlaceholder}
            className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {(['all', 'whitepaper', 'manual', 'guide', 'spec'] as const).map((kind) => (
            <button
              key={kind}
              onClick={() => setKindFilter(kind)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                kindFilter === kind
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {kind === 'all' ? t.resourcesKindAll : kindLabel[kind]}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-14 text-center border border-dashed border-slate-200 rounded-xl">
          <p className="text-xs text-slate-500">{t.resourcesEmpty}</p>
          <button
            onClick={() => {
              setQuery('');
              setKindFilter('all');
            }}
            className="mt-2 text-xs font-semibold text-blue-600 hover:underline"
          >
            {t.resourcesResetFilters}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filtered.map((doc) => {
            const content = getResourceContent(doc.id, lang);
            const Icon = KIND_ICON[doc.kind];
            return (
              <button
                key={doc.id}
                onClick={() => setSelectedId(doc.id)}
                className="text-left bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-2.5 hover:border-blue-400 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`inline-flex items-center gap-1 text-[10.5px] font-semibold px-2 py-0.5 rounded border ${
                      KIND_STYLE[doc.kind]
                    }`}
                  >
                    <Icon className="w-3 h-3 flex-shrink-0" />
                    {kindLabel[doc.kind]}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10.5px] text-slate-400">
                    <Clock className="w-3 h-3 flex-shrink-0" />
                    {t.resourcesReadingTime.replace('{min}', String(doc.readingMinutes))}
                  </span>
                </div>

                <div>
                  <h2 className="text-sm font-bold text-slate-900 break-keep">
                    {content?.title ?? doc.id}
                  </h2>
                  <p className="text-[11.5px] text-slate-600 mt-1 leading-relaxed break-keep">
                    {content?.summary}
                  </p>
                </div>

                {doc.relatedModuleIds.length > 0 && (
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 mb-1">
                      <Layers className="w-3 h-3 flex-shrink-0" />
                      {t.resourcesRelatedModules}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {doc.relatedModuleIds.slice(0, 4).map((id) => (
                        <span
                          key={id}
                          className="px-1.5 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-600 text-[10px]"
                        >
                          {getLocalizedModuleLabel(id, lang)}
                        </span>
                      ))}
                      {doc.relatedModuleIds.length > 4 && (
                        <span className="px-1.5 py-0.5 text-[10px] text-slate-400">
                          +{doc.relatedModuleIds.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
