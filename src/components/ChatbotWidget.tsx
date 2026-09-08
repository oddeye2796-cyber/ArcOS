import React, { Suspense, lazy, useState } from 'react';
import { MessageSquareText, X } from 'lucide-react';
import { AppItem, CartItem, PoCTrial, RecommendationPreset, SubModuleItem } from '../types';
import { CHATBOT_COPY } from '../i18n/chatbotLocalization';
import { Language } from '../i18n/translations';
import { CurrencyCode } from '../lib/currency';

/**
 * The conversation, the catalog index and the keyword lexicon are only needed
 * once someone actually asks a question, so they load with the first open. The
 * launcher itself stays in the initial chunk — it has to be on screen from
 * first paint to be found at all.
 */
const ChatbotPanel = lazy(() =>
  import('./ChatbotPanel').then((m) => ({ default: m.ChatbotPanel }))
);

interface ChatbotWidgetProps {
  cart: CartItem[];
  pocTrials: PoCTrial[];
  lang: Language;
  currency: CurrencyCode;
  onOpenApp: (app: AppItem) => void;
  onToggleApp: (app: AppItem) => void;
  onToggleSubModule: (sub: SubModuleItem, app: AppItem) => void;
  onApplyPoC: (app: AppItem) => void;
  onApplyPreset: (preset: RecommendationPreset) => void;
  onGoToQuote: () => void;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = (props) => {
  const { lang } = props;
  const copy = CHATBOT_COPY[lang];
  const [isOpen, setIsOpen] = useState(false);
  /** The nudge is shown once per session, until the launcher is first used. */
  const [hintDismissed, setHintDismissed] = useState(false);

  const open = () => {
    setIsOpen(true);
    setHintDismissed(true);
  };

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
          {!hintDismissed && (
            <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-600 shadow-sm">
              {copy.launcherHint}
              <button
                type="button"
                onClick={() => setHintDismissed(true)}
                aria-label={copy.close}
                className="text-slate-400 transition-colors hover:text-slate-600"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          <button
            type="button"
            onClick={open}
            aria-label={copy.launcher}
            title={copy.launcher}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition-all hover:bg-slate-800 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <MessageSquareText className="h-5 w-5" />
          </button>
        </div>
      )}

      {isOpen && (
        <Suspense fallback={null}>
          <ChatbotPanel {...props} onClose={() => setIsOpen(false)} />
        </Suspense>
      )}
    </>
  );
};
