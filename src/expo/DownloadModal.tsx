import React, { useCallback, useState } from 'react';
import { CheckCircle2, Download, X } from 'lucide-react';
import { useModalDismiss } from '../lib/useModalDismiss';
import { Language } from '../i18n/translations';
import { EXPO_COPY } from './expoCopy';
import { DownloadKind, isValidEmail, requestDownload } from './downloadRequest';

interface DownloadModalProps {
  lang: Language;
  productId: string;
  moduleId?: string;
  productName: string;
  kind: DownloadKind;
  onClose: () => void;
}

type Phase =
  | { name: 'form' }
  | { name: 'sending' }
  | { name: 'done'; url: string }
  | { name: 'error'; reason: 'not_available' | 'server' | 'network' | 'not_configured' | 'invalid' };

/**
 * Email + consent gate in front of a download. The button stays disabled until
 * both are satisfied; the Edge Function re-checks them, so the gate does not
 * rest on this form alone.
 */
export const DownloadModal: React.FC<DownloadModalProps> = ({
  lang,
  productId,
  moduleId,
  productName,
  kind,
  onClose
}) => {
  const copy = EXPO_COPY[lang];
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState(false);
  const [phase, setPhase] = useState<Phase>({ name: 'form' });

  const close = useCallback(() => onClose(), [onClose]);
  const { backdropRef, onBackdropMouseDown, onBackdropClick } = useModalDismiss(true, close, {
    locked: phase.name === 'sending'
  });

  const emailOk = isValidEmail(email);
  const canSubmit = emailOk && consent && phase.name !== 'sending';
  const kindLabel = kind === 'brochure' ? copy.downloadBrochure : copy.downloadManual;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setTouched(true);
    if (!canSubmit) return;
    setPhase({ name: 'sending' });
    const result = await requestDownload({ email, consent, productId, moduleId, kind, lang });
    if (result.ok === false) {
      setPhase({ name: 'error', reason: result.reason });
      return;
    }
    setPhase({ name: 'done', url: result.url });
    // The signed URL is served as an attachment, so this stays on the page.
    window.location.assign(result.url);
  };

  const errorText = (reason: Extract<Phase, { name: 'error' }>['reason']) => {
    if (reason === 'not_available') return copy.dlNotAvailable;
    if (reason === 'not_configured') return copy.dlNotConfigured;
    return copy.dlFailed;
  };

  return (
    <div
      ref={backdropRef}
      onMouseDown={onBackdropMouseDown}
      onClick={onBackdropClick}
      className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={copy.dlModalTitle}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-4"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{copy.dlModalTitle}</h2>
            <p className="text-xs text-slate-500 mt-0.5 break-keep">
              {productName} · {kindLabel}
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label={copy.dlCancel}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {phase.name === 'done' ? (
          <div className="space-y-4">
            <p className="flex items-start gap-2 text-sm text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span className="break-keep">{copy.dlDoneBody}</span>
            </p>
            <div className="flex gap-2">
              <a
                href={phase.url}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800"
              >
                <Download className="w-4 h-4" />
                {copy.dlSubmit}
              </a>
              <button
                type="button"
                onClick={close}
                className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {copy.dlDone}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4" noValidate>
            <p className="text-sm text-slate-600 break-keep">{copy.dlModalIntro}</p>

            <div className="space-y-1">
              <label htmlFor="expo-email" className="text-xs font-semibold text-slate-700">
                {copy.dlEmailLabel}
              </label>
              <input
                id="expo-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched(true)}
                placeholder={copy.dlEmailPlaceholder}
                aria-invalid={touched && !emailOk}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              {touched && !emailOk && (
                <p className="text-xs text-red-600">{copy.dlEmailInvalid}</p>
              )}
            </div>

            <label className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 w-4 h-4 flex-shrink-0 accent-blue-700"
              />
              <span className="break-keep">{copy.dlConsent}</span>
            </label>
            <a
              href="#privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-xs text-blue-700 hover:underline"
            >
              {copy.dlPrivacyLink}
            </a>

            {phase.name === 'error' && (
              <p role="alert" className="text-xs text-red-600">
                {errorText(phase.reason)}
              </p>
            )}

            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={close}
                disabled={phase.name === 'sending'}
                className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                {copy.dlCancel}
              </button>
              <button
                type="submit"
                disabled={!canSubmit}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                {phase.name === 'sending' ? copy.dlSending : copy.dlSubmit}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
