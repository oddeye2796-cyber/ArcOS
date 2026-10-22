import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Language } from '../i18n/translations';
import { EXPO_COPY } from './expoCopy';
import { OPERATOR, PRIVACY_CONTENT } from './privacyContent';

interface PrivacyViewProps {
  lang: Language;
  onBack: () => void;
}

export const PrivacyView: React.FC<PrivacyViewProps> = ({ lang, onBack }) => {
  const content = PRIVACY_CONTENT[lang];
  const copy = EXPO_COPY[lang];
  const labels = content.contactLabels;
  const contactRows: [string, React.ReactNode][] = [
    [labels.operator, OPERATOR.name],
    [labels.representative, OPERATOR.representative],
    [labels.address, OPERATOR.address],
    [labels.tel, OPERATOR.tel],
    [labels.fax, OPERATOR.fax],
    [labels.email, <a key="mail" href={`mailto:${OPERATOR.email}`} className="text-blue-700 hover:underline">{OPERATOR.email}</a>]
  ];

  return (
    <article className="max-w-3xl mx-auto px-6 md:px-8 py-8 space-y-6">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-blue-700 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        {copy.back}
      </button>

      <header className="border-b border-slate-200 pb-4 space-y-2">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{content.title}</h1>
        <p className="text-xs text-slate-500">{content.updated}</p>
        <p className="text-sm text-slate-700 leading-relaxed break-keep">{content.intro}</p>
      </header>

      {content.sections.map((section) => (
        <section key={section.heading} className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">{section.heading}</h2>
          {section.body && (
            <p className="text-sm text-slate-700 leading-relaxed break-keep">{section.body}</p>
          )}
          {section.items && (
            <ul className="space-y-1.5">
              {section.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
                  <span className="leading-relaxed break-keep">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <dl className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 grid grid-cols-[7rem_1fr] gap-x-4 gap-y-2 text-sm">
        {contactRows.map(([label, value]) => (
          <React.Fragment key={label}>
            <dt className="text-slate-500">{label}</dt>
            <dd className="text-slate-900 break-words">{value}</dd>
          </React.Fragment>
        ))}
      </dl>
    </article>
  );
};
