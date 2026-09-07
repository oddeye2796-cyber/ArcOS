import { Language } from '../i18n/translations';

export type CurrencyCode = 'KRW' | 'USD' | 'JPY';

export const CURRENCY_CODES: readonly CurrencyCode[] = ['KRW', 'USD', 'JPY'] as const;

/** Catalog and preset prices are all denominated in 만원 (10,000 KRW). */
export const KRW_PER_UNIT = 10000;

/**
 * Rates are expressed as "1 KRW = n <currency>" and are supplied by the caller,
 * normally from the live snapshot in `exchangeRates.ts`. The bundled fallback
 * lives there too, so this module stays a pure formatter.
 */
export type RateTable = Record<CurrencyCode, number>;

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
export function convertUnits(units: number, currency: CurrencyCode, rates: RateTable): number {
  return units * KRW_PER_UNIT * rates[currency];
}

/**
 * Formats a 만원-denominated amount as currency, e.g. 840 →
 * `₩8,400,000` / `$6,087` / `¥903,226`.
 *
 * This replaces the previous approach of concatenating a raw number with a
 * per-language unit suffix, where the English suffix was the literal `'0k KRW'`
 * used to pad the value back to the right magnitude.
 */
export function formatMoney(
  units: number,
  currency: CurrencyCode,
  lang: Language,
  rates: RateTable
): string {
  return getFormatter(lang, currency).format(convertUnits(units, currency, rates));
}

/**
 * Same as `formatMoney` but for a value already expressed in the currency's
 * major unit rather than in 만원.
 */
export function formatAmount(amount: number, currency: CurrencyCode, lang: Language): string {
  return getFormatter(lang, currency).format(amount);
}

/** Human label for where a rate came from, shown with the note below. */
const SOURCE_LABEL: Record<string, string> = {
  bundled: 'ArcOS',
  frankfurter: 'ECB / Frankfurter',
  'er-api': 'ExchangeRate-API'
};

/**
 * Rate line shown wherever a non-KRW total is displayed, including on printed
 * quotations — a converted figure is only meaningful with its rate, reference
 * date and source attached.
 */
export function exchangeRateNote(
  currency: CurrencyCode,
  lang: Language,
  rates: RateTable,
  asOf: string,
  source: string
): string | null {
  if (currency === 'KRW') return null;
  const perUnit = Math.round(1 / rates[currency]);
  const krw = new Intl.NumberFormat(LOCALE_BY_LANG[lang]).format(perUnit);
  const via = SOURCE_LABEL[source] ?? source;
  if (lang === 'ja') {
    return `参考レート: 1 ${currency} = ${krw} KRW (${asOf} 基準 · 出典 ${via})`;
  }
  if (lang === 'en') {
    return `Indicative rate: 1 ${currency} = ${krw} KRW (as of ${asOf}, via ${via})`;
  }
  return `환율 기준: 1 ${currency} = ${krw} KRW (${asOf} 기준 · 출처 ${via})`;
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
