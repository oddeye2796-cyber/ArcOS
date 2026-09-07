import { Language } from '../i18n/translations';

export type CurrencyCode = 'KRW' | 'USD' | 'JPY';

export const CURRENCY_CODES: readonly CurrencyCode[] = ['KRW', 'USD', 'JPY'] as const;

/** Catalog and preset prices are all denominated in 만원 (10,000 KRW). */
export const KRW_PER_UNIT = 10000;

/**
 * Indicative reference rates, expressed as "1 KRW = n <currency>".
 *
 * These are static on purpose: the simulator produces an indicative quote, not
 * a settlement figure, so a fixed published rate keeps a printed quotation
 * reproducible. `RATE_BASIS_DATE` is surfaced next to converted totals.
 */
export const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  KRW: 1,
  USD: 1 / 1380,
  JPY: 1 / 9.3
};

export const RATE_BASIS_DATE = '2026-09-01';

/** Fraction digits per currency: KRW/JPY have no minor unit in practice. */
const FRACTION_DIGITS: Record<CurrencyCode, number> = {
  KRW: 0,
  USD: 0,
  JPY: 0
};

const LOCALE_BY_LANG: Record<Language, string> = {
  ko: 'ko-KR',
  en: 'en-US',
  ja: 'ja-JP'
};

/**
 * `Intl.NumberFormat` construction is not free and these run inside table row
 * renders, so formatters are memoized per locale/currency pair.
 */
const formatterCache = new Map<string, Intl.NumberFormat>();

function getFormatter(lang: Language, currency: CurrencyCode): Intl.NumberFormat {
  const cacheKey = `${lang}:${currency}`;
  const cached = formatterCache.get(cacheKey);
  if (cached) return cached;

  const digits = FRACTION_DIGITS[currency];
  const formatter = new Intl.NumberFormat(LOCALE_BY_LANG[lang], {
    style: 'currency',
    currency,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  });
  formatterCache.set(cacheKey, formatter);
  return formatter;
}

/** Converts a 만원-denominated amount into the target currency's major unit. */
export function convertUnits(units: number, currency: CurrencyCode): number {
  return units * KRW_PER_UNIT * EXCHANGE_RATES[currency];
}

/**
 * Formats a 만원-denominated amount as currency, e.g. 840 →
 * `₩8,400,000` / `$6,087` / `¥903,226`.
 *
 * This replaces the previous approach of concatenating a raw number with a
 * per-language unit suffix, where the English suffix was the literal `'0k KRW'`
 * used to pad the value back to the right magnitude.
 */
export function formatMoney(units: number, currency: CurrencyCode, lang: Language): string {
  return getFormatter(lang, currency).format(convertUnits(units, currency));
}

/**
 * Same as `formatMoney` but for a value already expressed in the currency's
 * major unit rather than in 만원.
 */
export function formatAmount(amount: number, currency: CurrencyCode, lang: Language): string {
  return getFormatter(lang, currency).format(amount);
}

/** Rate line shown wherever a non-KRW total is displayed. */
export function exchangeRateNote(currency: CurrencyCode, lang: Language): string | null {
  if (currency === 'KRW') return null;
  const perUnit = Math.round(1 / EXCHANGE_RATES[currency]);
  const krw = new Intl.NumberFormat(LOCALE_BY_LANG[lang]).format(perUnit);
  if (lang === 'ja') {
    return `参考レート: 1 ${currency} = ${krw} KRW (${RATE_BASIS_DATE} 基準)`;
  }
  if (lang === 'en') {
    return `Indicative rate: 1 ${currency} = ${krw} KRW (as of ${RATE_BASIS_DATE})`;
  }
  return `환율 기준: 1 ${currency} = ${krw} KRW (${RATE_BASIS_DATE} 기준)`;
}

export function isCurrencyCode(value: unknown): value is CurrencyCode {
  return typeof value === 'string' && (CURRENCY_CODES as readonly string[]).includes(value);
}

/** Default currency suggested by the active language, used on first visit. */
export function defaultCurrencyForLanguage(lang: Language): CurrencyCode {
  if (lang === 'ja') return 'JPY';
  if (lang === 'en') return 'USD';
  return 'KRW';
}
