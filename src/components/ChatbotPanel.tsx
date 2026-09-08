import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Bot,
  Factory,
  FlaskConical,
  Layers,
  Lock,
  RefreshCw,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  X
} from 'lucide-react';
import { AppItem, CartItem, PoCTrial, RecommendationPreset, SubModuleItem } from '../types';
import { GoalId, IndustryId } from '../data/chatbotKeywords';
import {
  ModuleMatch,
  allModules,
  detectGoal,
  detectIndustry,
  goalById,
  industryById,
  presetById,
  resolveModules,
  searchModules,
  searchPresets,
  warmSearchIndex
} from '../lib/moduleSearch';
import { CHATBOT_COPY, fillTemplate } from '../i18n/chatbotLocalization';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { CurrencyCode, formatMoney } from '../lib/currency';
import { useExchangeRates } from '../lib/useExchangeRates';
import {
  getLocalizedAppCategory,
  getLocalizedAppDesc,
  getLocalizedAppName,
  getLocalizedPresetSubtitle,
  getLocalizedPresetTitle,
  getLocalizedSubModuleDesc,
  getLocalizedSubModuleName,
  getLocalizedSubModuleUnit
} from '../i18n/localizedData';

/** Ids the catalog itself never sells directly. */
const FOUNDATION_APP_ID = 'b2lab';

type ChipAction =
  | { kind: 'industryMenu' }
  | { kind: 'goalMenu' }
  | { kind: 'allModules' }
  | { kind: 'industry'; id: IndustryId }
  | { kind: 'goal'; id: GoalId }
  | { kind: 'ask'; text: string };

interface Chip {
  label: string;
  action: ChipAction;
}

interface Message {
  id: string;
  role: 'bot' | 'user';
  text: string;
  hint?: string;
  chips?: Chip[];
  results?: ModuleMatch[];
  /** Shown when the answer came from a free-text question. */
  withReasons?: boolean;
  preset?: RecommendationPreset;
}

export interface ChatbotPanelProps {
  onClose: () => void;
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

interface ResultCardProps {
  match: ModuleMatch;
  withReasons: boolean;
  inCart: boolean;
  pocRunning: boolean;
  /** Formatted by the panel, which owns the currency and the rate snapshot. */
  price: string;
  lang: Language;
  onOpenApp: (app: AppItem) => void;
  onToggle: (match: ModuleMatch, inCart: boolean) => void;
  onApplyPoC: (app: AppItem) => void;
}

/**
 * One catalog entry inside the conversation.
 *
 * Memoized because the transcript only grows: every answer, and every "added
 * to the quote" line, would otherwise re-render every card said so far. All
 * props are primitives or references that outlive a render, so the comparison
 * actually holds.
 */
const ResultCard = React.memo<ResultCardProps>(
  ({ match, withReasons, inCart, pocRunning, price, lang, onOpenApp, onToggle, onApplyPoC }) => {
    const copy = CHATBOT_COPY[lang];
    const { app, subModule } = match;
    const name = subModule
      ? getLocalizedSubModuleName(subModule.id, subModule.name, lang)
      : getLocalizedAppName(app, lang);
    const desc = subModule
      ? getLocalizedSubModuleDesc(subModule.id, subModule.desc, lang)
      : getLocalizedAppDesc(app, lang);
    const blockedDeps = app.deps.filter((dep) => !dep.ok).length;
    const isFoundation = app.id === FOUNDATION_APP_ID;
    // A suite has to be configured module by module, so the chat sends the user
    // into the detail modal instead of guessing which core they meant.
    const canAddDirectly = !isFoundation && (Boolean(subModule) || !app.suite);

    return (
      <div className="rounded-lg border border-slate-200 bg-white p-3 space-y-2 shadow-sm">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              {getLocalizedAppCategory(app, lang)}
            </div>
            <div className="text-[13px] font-bold text-slate-900 break-keep leading-snug">
              {name}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            {(app.landing || subModule?.landing) && (
              <span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200 whitespace-nowrap">
                <Rocket className="w-2.5 h-2.5" />
                {copy.landing}
              </span>
            )}
            {pocRunning && (
              <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-bold text-indigo-800 border border-indigo-200 whitespace-nowrap">
                {copy.pocActive}
              </span>
            )}
          </div>
        </div>

        <p className="text-[11.5px] leading-relaxed text-slate-600 break-keep line-clamp-3">
          {desc}
        </p>

        {subModule && (
          <div className="text-[10.5px] text-slate-500 flex items-center gap-1">
            <Layers className="w-3 h-3 text-slate-400 flex-shrink-0" />
            <span className="truncate">
              {fillTemplate(copy.suiteMember, { suite: getLocalizedAppName(app, lang) })}
            </span>
          </div>
        )}

        {withReasons && match.reasons.length > 0 && (
          <div className="flex flex-wrap items-center gap-1 text-[10px] text-slate-500">
            <span className="font-semibold text-slate-400">{copy.matchReason}</span>
            {match.reasons.map((reason) => (
              <span
                key={reason}
                className="rounded bg-blue-50 px-1.5 py-0.5 font-medium text-blue-700 border border-blue-100"
              >
                {reason}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
          <span className="font-mono font-semibold text-slate-700">{price}</span>
          {app.status === 'onprem' && (
            <span className="inline-flex items-center gap-1 rounded bg-purple-50 px-1.5 py-0.5 text-purple-700 border border-purple-200">
              <Lock className="w-2.5 h-2.5" />
              {copy.onprem}
            </span>
          )}
          {isFoundation && (
            <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-1.5 py-0.5 text-emerald-700 border border-emerald-200">
              <ShieldCheck className="w-2.5 h-2.5" />
              {copy.subscribed}
            </span>
          )}
          {blockedDeps > 0 && (
            <span className="rounded bg-amber-50 px-1.5 py-0.5 text-amber-800 border border-amber-200">
              {fillTemplate(copy.prereq, { count: blockedDeps })}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <button
            type="button"
            onClick={() => onOpenApp(app)}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:border-slate-300"
          >
            {copy.detail}
          </button>
          {canAddDirectly && (
            <button
              type="button"
              onClick={() => onToggle(match, inCart)}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                inCart
                  ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {inCart ? copy.added : copy.add}
            </button>
          )}
          {!isFoundation && (
            <button
              type="button"
              onClick={() => onApplyPoC(app)}
              className="inline-flex items-center gap-1 rounded-lg border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-700 transition-colors hover:bg-indigo-100"
            >
              <FlaskConical className="w-3 h-3" />
              {copy.poc}
            </button>
          )}
        </div>
      </div>
    );
  }
);
ResultCard.displayName = 'ResultCard';

let messageSeq = 0;
const nextId = () => `msg-${(messageSeq += 1)}`;

export const ChatbotPanel: React.FC<ChatbotPanelProps> = ({
  onClose,
  cart,
  pocTrials,
  lang,
  currency,
  onOpenApp,
  onToggleApp,
  onToggleSubModule,
  onApplyPoC,
  onApplyPreset,
  onGoToQuote
}) => {
  const copy = CHATBOT_COPY[lang];
  const t = TRANSLATIONS[lang];
  const { snapshot: rateSnapshot } = useExchangeRates();

  const entryChips = useMemo<Chip[]>(
    () => [
      { label: copy.chipIndustry, action: { kind: 'industryMenu' } },
      { label: copy.chipGoal, action: { kind: 'goalMenu' } },
      { label: copy.chipAll, action: { kind: 'allModules' } }
    ],
    [copy]
  );

  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: nextId(),
      role: 'bot',
      text: copy.greeting,
      hint: copy.greetingHint,
      chips: entryChips
    }
  ]);
  const [draft, setDraft] = useState('');

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  /**
   * Build the catalog index now rather than on the first question, where a few
   * milliseconds of work would land between pressing Enter and seeing an
   * answer. Deferred to idle time so it cannot delay the panel's first paint.
   */
  useEffect(() => {
    // Called on `window` rather than through a local alias: a detached
    // reference to a DOM method throws on invocation.
    if (typeof window.requestIdleCallback === 'function') {
      const handle = window.requestIdleCallback(() => warmSearchIndex());
      return () => window.cancelIdleCallback(handle);
    }
    const timer = window.setTimeout(warmSearchIndex, 0);
    return () => window.clearTimeout(timer);
  }, []);

  // Keep the newest answer in view. `scrollTop` rather than `scrollIntoView`,
  // which would also scroll the page behind the panel.
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages]);

  const say = useCallback((message: Omit<Message, 'id' | 'role'>) => {
    setMessages((prev) => [...prev, { ...message, id: nextId(), role: 'bot' }]);
  }, []);

  const answerForIntent = useCallback(
    (label: string, moduleIds: readonly string[], presetId: string, template: string) => {
      say({
        text: fillTemplate(template, { name: label }),
        results: resolveModules(moduleIds),
        preset: presetById(presetId),
        chips: entryChips
      });
    },
    [entryChips, say]
  );

  const runQuery = useCallback(
    (raw: string) => {
      const query = raw.trim();
      if (!query) return;

      setMessages((prev) => [...prev, { id: nextId(), role: 'user', text: query }]);

      const hits = searchModules(query);
      const industry = detectIndustry(query);
      const goal = detectGoal(query);

      if (hits.length > 0) {
        // An industry named in the question is a stronger bundle signal than a
        // preset matched on wording alone.
        const preset = industry
          ? presetById(industry.presetId)
          : searchPresets(query)[0]?.preset ?? (goal ? presetById(goal.presetId) : undefined);

        say({
          text:
            hits.length === 1
              ? copy.singleResultIntro
              : fillTemplate(copy.resultsIntro, { count: hits.length }),
          results: hits,
          withReasons: true,
          preset,
          chips: entryChips
        });
        return;
      }

      // No direct hit: the question still usually says what they build or what
      // they want, which is enough for the curated answer.
      if (industry) {
        answerForIntent(
          copy.industryLabels[industry.id],
          industry.moduleIds,
          industry.presetId,
          copy.industryIntro
        );
        return;
      }
      if (goal) {
        answerForIntent(copy.goalLabels[goal.id], goal.moduleIds, goal.presetId, copy.goalIntro);
        return;
      }

      say({ text: copy.noResult, hint: copy.noResultHint, chips: entryChips });
    },
    [answerForIntent, copy, entryChips, say]
  );

  const handleChip = useCallback(
    (chip: Chip) => {
      const { action } = chip;

      if (action.kind === 'ask') {
        runQuery(action.text);
        return;
      }

      setMessages((prev) => [...prev, { id: nextId(), role: 'user', text: chip.label }]);

      switch (action.kind) {
        case 'industryMenu':
          say({
            text: copy.askIndustry,
            chips: (Object.keys(copy.industryLabels) as IndustryId[]).map((id) => ({
              label: copy.industryLabels[id],
              action: { kind: 'industry', id }
            }))
          });
          return;
        case 'goalMenu':
          say({
            text: copy.askGoal,
            chips: (Object.keys(copy.goalLabels) as GoalId[]).map((id) => ({
              label: copy.goalLabels[id],
              action: { kind: 'goal', id }
            }))
          });
          return;
        case 'allModules':
          say({ text: copy.allIntro, results: allModules(), chips: entryChips });
          return;
        case 'industry': {
          const intent = industryById(action.id);
          if (!intent) return;
          answerForIntent(
            copy.industryLabels[intent.id],
            intent.moduleIds,
            intent.presetId,
            copy.industryIntro
          );
          return;
        }
        case 'goal': {
          const intent = goalById(action.id);
          if (!intent) return;
          answerForIntent(
            copy.goalLabels[intent.id],
            intent.moduleIds,
            intent.presetId,
            copy.goalIntro
          );
          return;
        }
      }
    },
    [answerForIntent, copy, entryChips, runQuery, say]
  );

  /**
   * Escape closes the panel, but only while it is the topmost surface. A detail
   * modal opened from a result card locks background scrolling (see
   * `useModalDismiss`); while that lock is on, Escape belongs to the modal and
   * the event is left to bubble to its own handler.
   */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'Escape') return;
    if (typeof document !== 'undefined' && document.body.style.overflow === 'hidden') return;
    onClose();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    runQuery(draft);
    setDraft('');
  };

  const handleRestart = () => {
    setMessages([
      {
        id: nextId(),
        role: 'bot',
        text: copy.greeting,
        hint: copy.greetingHint,
        chips: entryChips
      }
    ]);
    setDraft('');
    inputRef.current?.focus();
  };

  /** Cart membership, resolved the same way the catalog card does it. */
  const isInCart = (match: ModuleMatch) => {
    if (match.subModule) return cart.some((item) => item.id === match.subModule!.id);
    if (match.app.suite && match.app.groups) {
      const memberIds = match.app.groups.flatMap((g) => g.items.map((i) => i.id));
      return cart.some((item) => memberIds.includes(item.id));
    }
    return cart.some((item) => item.id === match.app.id);
  };

  const handleToggle = useCallback((match: ModuleMatch, wasInCart: boolean) => {
    const name = match.subModule
      ? getLocalizedSubModuleName(match.subModule.id, match.subModule.name, lang)
      : getLocalizedAppName(match.app, lang);

    if (match.subModule) {
      onToggleSubModule(match.subModule, match.app);
    } else {
      onToggleApp(match.app);
    }

    // A MES core replaces whichever core was selected before rather than
    // toggling off, so removal is only reported for the modules that can be.
    const removed = wasInCart && !(match.subModule && match.app.groups?.some(
      (group) => group.type === 'radio' && group.items.some((item) => item.id === match.subModule!.id)
    ));
    say({ text: fillTemplate(removed ? copy.removedToast : copy.addedToast, { name }) });
  }, [copy, lang, onToggleApp, onToggleSubModule, say]);

  const handleApplyPreset = (preset: RecommendationPreset) => {
    onApplyPreset(preset);
    say({
      text: fillTemplate(copy.presetAppliedToast, { title: getLocalizedPresetTitle(preset, lang) }),
      chips: entryChips
    });
  };

  const priceLabel = (match: ModuleMatch): string => {
    if (match.subModule) {
      return getLocalizedSubModuleUnit(match.subModule.id, match.subModule.unitLabel, lang);
    }
    if (match.app.suite) return t.cardPerModulePricing;
    if (!match.app.price) return t.cardIncludedInBase;
    return `${t.monthPrefix} ${formatMoney(match.app.price, currency, lang, rateSnapshot.rates)}~`;
  };

  const renderPreset = (preset: RecommendationPreset) => (
    <div className="rounded-lg border border-blue-200 bg-blue-50/70 p-3 space-y-2">
      <div className="flex items-start gap-2">
        {preset.type === 'industry' ? (
          <Factory className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
        ) : (
          <Target className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0 mt-0.5" />
        )}
        <div className="min-w-0 space-y-0.5">
          <div className="text-[12px] font-bold text-slate-900 break-keep leading-snug">
            {getLocalizedPresetTitle(preset, lang)}
          </div>
          <div className="text-[10.5px] text-slate-600 break-keep">
            {getLocalizedPresetSubtitle(preset, lang)}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-1.5">
        <span className="text-[10px] font-medium text-slate-500">
          {fillTemplate(copy.presetModules, { count: preset.recommendedModules.length })}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => handleApplyPreset(preset)}
            className="rounded-lg bg-blue-600 px-2.5 py-1 text-[11px] font-semibold text-white transition-colors hover:bg-blue-500"
          >
            {copy.applyPreset}
          </button>
          <button
            type="button"
            onClick={onGoToQuote}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            {copy.goToQuote}
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div
      role="dialog"
      aria-label={copy.title}
      onKeyDown={handleKeyDown}
      className="fixed z-50 bottom-3 right-3 left-3 sm:left-auto sm:w-[400px] flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl max-h-[min(660px,82vh)]"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 bg-gradient-to-r from-slate-900 to-indigo-950 px-4 py-3 text-white">
        <div className="flex items-start gap-2 min-w-0">
          <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <div className="min-w-0">
            <div className="text-sm font-bold leading-tight">{copy.title}</div>
            <div className="text-[10.5px] text-slate-300 break-keep leading-snug">
              {copy.subtitle}
            </div>
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={handleRestart}
            title={copy.restart}
            aria-label={copy.restart}
            className="rounded-md p-1.5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={onClose}
            title={copy.close}
            aria-label={copy.close}
            className="rounded-md p-1.5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Conversation */}
      <div
        ref={listRef}
        aria-live="polite"
        className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-3 py-3"
      >
        {messages.map((message) =>
          message.role === 'user' ? (
            <div key={message.id} className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-slate-900 px-3 py-2 text-[12px] text-white break-keep">
                <span className="sr-only">{copy.youLabel}: </span>
                {message.text}
              </div>
            </div>
          ) : (
            <div key={message.id} className="flex items-start gap-2">
              <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500">
                <Bot className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0 flex-1 space-y-2">
                <div className="inline-block max-w-full rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-3 py-2 text-[12px] leading-relaxed text-slate-800 break-keep">
                  <span className="sr-only">{copy.botLabel}: </span>
                  {message.text}
                  {message.hint && (
                    <span className="mt-1 block text-[10.5px] text-slate-500">{message.hint}</span>
                  )}
                </div>

                {message.preset && renderPreset(message.preset)}

                {message.results && message.results.length > 0 && (
                  <div className="space-y-2">
                    {message.results.map((result) => (
                      <ResultCard
                        key={result.key}
                        match={result}
                        withReasons={Boolean(message.withReasons)}
                        inCart={isInCart(result)}
                        pocRunning={pocTrials.some((trial) => trial.appId === result.app.id)}
                        price={priceLabel(result)}
                        lang={lang}
                        onOpenApp={onOpenApp}
                        onToggle={handleToggle}
                        onApplyPoC={onApplyPoC}
                      />
                    ))}
                  </div>
                )}

                {message.chips && message.chips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {message.chips.map((chip) => (
                      <button
                        key={`${message.id}-${chip.label}`}
                        type="button"
                        onClick={() => handleChip(chip)}
                        className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        )}

        {/* Example prompts, shown only while the conversation is untouched. */}
        {messages.length === 1 && (
          <div className="space-y-1.5 rounded-lg border border-dashed border-slate-300 bg-white/70 p-2.5">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              {copy.examplesTitle}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {copy.examples.map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => handleChip({ label: example, action: { kind: 'ask', text: example } })}
                  className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Composer */}
      <form onSubmit={handleSubmit} className="border-t border-slate-200 bg-white px-3 py-2.5 space-y-1.5">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={copy.placeholder}
            aria-label={copy.placeholder}
            className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-[12px] text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!draft.trim()}
            aria-label={copy.send}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="flex items-center justify-between gap-2 text-[10px] text-slate-400">
          <span className="inline-flex items-center gap-1 break-keep">
            <Lock className="h-2.5 w-2.5 flex-shrink-0" />
            {copy.privacyNote}
          </span>
          {cart.length > 0 && (
            <button
              type="button"
              onClick={onGoToQuote}
              className="flex-shrink-0 font-semibold text-blue-600 hover:underline"
            >
              {fillTemplate(copy.cartStatus, { count: cart.length })}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ChatbotPanel;
