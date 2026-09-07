import { CURRENCY_CODES, CurrencyCode } from './currency';

/**
 * A set of rates expressed as "1 KRW = n <currency>", together with where and
 * when they came from. Quotations are business documents, so the provenance
 * travels with the numbers and is printed alongside a converted total.
 */
export interface RateSnapshot {
  rates: Record<CurrencyCode, number>;
  /** The reference date the provider itself published. */
  asOf: string;
  /** When this client fetched it (ISO 8601). */
  fetchedAt: string;
  source: 'bundled' | 'frankfurter' | 'er-api';
}

/**
 * Shipped with the build and used until a fetch succeeds, and whenever every
 * provider is unreachable. Keeping a usable rate offline matters more here than
 * being current: a blank price is worse than a slightly stale one.
 */
export const FALLBACK_SNAPSHOT: RateSnapshot = {
  rates: { KRW: 1, USD: 1 / 1380, JPY: 1 / 9.3 },
  asOf: '2026-09-01',
  fetchedAt: '2026-09-01T00:00:00.000Z',
  source: 'bundled'
};

/** Refetch only after this long; a daily-published rate does not need more. */
export const RATE_TTL_MS = 12 * 60 * 60 * 1000;

/** Give up on a provider rather than leaving the indicator spinning. */
const REQUEST_TIMEOUT_MS = 6000;

/**
 * A provider returning a rate wildly different from the bundled one usually
 * means the shape changed or the base currency was misread (an inverted rate is
 * the classic case), not that the market moved. Anything outside this band is
 * rejected in favour of the previous snapshot.
 */
const SANITY_MIN_RATIO = 0.5;
const SANITY_MAX_RATIO = 2;

interface Provider {
  source: RateSnapshot['source'];
  url: string;
  /** Returns rates keyed by currency plus the provider's reference date. */
  parse: (payload: unknown) => { rates: Record<string, unknown>; asOf: string } | null;
}

/**
 * Tried in order. Both are keyless and CORS-enabled so they work from the
 * browser without a proxy; the second exists so one provider's outage or schema
 * change does not silently freeze rates.
 */
const PROVIDERS: readonly Provider[] = [
  {
    source: 'frankfurter',
    // ECB reference rates — published once per working day, which is the
    // appropriate basis for a quotation.
    url: 'https://api.frankfurter.dev/v1/latest?base=KRW&symbols=USD,JPY',
    parse: (payload) => {
      const body = payload as { rates?: Record<string, unknown>; date?: unknown };
      if (!body?.rates || typeof body.date !== 'string') return null;
      return { rates: body.rates, asOf: body.date };
    }
  },
  {
    source: 'er-api',
    url: 'https://open.er-api.com/v6/latest/KRW',
    parse: (payload) => {
      const body = payload as {
        result?: unknown;
        rates?: Record<string, unknown>;
        time_last_update_utc?: unknown;
      };
      if (body?.result !== 'success' || !body.rates) return null;
      const stamp =
        typeof body.time_last_update_utc === 'string'
          ? new Date(body.time_last_update_utc)
          : new Date();
      const asOf = Number.isNaN(stamp.getTime())
        ? new Date().toISOString().slice(0, 10)
        : stamp.toISOString().slice(0, 10);
      return { rates: body.rates, asOf };
    }
  }
];

function isPlausible(currency: CurrencyCode, rate: unknown): rate is number {
  if (typeof rate !== 'number' || !Number.isFinite(rate) || rate <= 0) return false;
  const reference = FALLBACK_SNAPSHOT.rates[currency];
  return rate >= reference * SANITY_MIN_RATIO && rate <= reference * SANITY_MAX_RATIO;
}

/**
 * Accepts a provider response only when every non-KRW currency is present and
 * plausible. A partial result would leave one currency silently stale while the
 * other moved, which is harder to notice than no update at all.
 */
function toSnapshot(
  provider: Provider,
  parsed: { rates: Record<string, unknown>; asOf: string }
): RateSnapshot | null {
  const rates: Record<CurrencyCode, number> = { ...FALLBACK_SNAPSHOT.rates };
  for (const code of CURRENCY_CODES) {
    if (code === 'KRW') continue;
    const value = parsed.rates[code];
    if (!isPlausible(code, value)) return null;
    rates[code] = value;
  }
  return {
    rates,
    asOf: parsed.asOf,
    fetchedAt: new Date().toISOString(),
    source: provider.source
  };
}

async function fetchFrom(provider: Provider, signal: AbortSignal): Promise<RateSnapshot | null> {
  const response = await fetch(provider.url, { signal, headers: { accept: 'application/json' } });
  if (!response.ok) return null;
  const parsed = provider.parse(await response.json());
  return parsed ? toSnapshot(provider, parsed) : null;
}

/**
 * Walks the provider list and returns the first plausible snapshot, or null if
 * none answered. Never throws: callers keep whatever snapshot they already have.
 */
export async function fetchRateSnapshot(externalSignal?: AbortSignal): Promise<RateSnapshot | null> {
  for (const provider of PROVIDERS) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    const onAbort = () => controller.abort();
    externalSignal?.addEventListener('abort', onAbort);
    try {
      const snapshot = await fetchFrom(provider, controller.signal);
      if (snapshot) return snapshot;
    } catch {
      // Network error, timeout, CORS rejection or malformed JSON: try the next.
    } finally {
      clearTimeout(timer);
      externalSignal?.removeEventListener('abort', onAbort);
    }
    if (externalSignal?.aborted) break;
  }
  return null;
}

export function isSnapshotFresh(snapshot: RateSnapshot, now = Date.now()): boolean {
  const age = now - new Date(snapshot.fetchedAt).getTime();
  return Number.isFinite(age) && age >= 0 && age < RATE_TTL_MS;
}

/** Validator for the cached snapshot read back out of localStorage. */
export function parseRateSnapshot(raw: unknown): RateSnapshot | null {
  if (typeof raw !== 'object' || raw === null) return null;
  const candidate = raw as Record<string, unknown>;
  const rawRates = candidate.rates;
  if (
    typeof rawRates !== 'object' ||
    rawRates === null ||
    typeof candidate.asOf !== 'string' ||
    typeof candidate.fetchedAt !== 'string' ||
    (candidate.source !== 'bundled' &&
      candidate.source !== 'frankfurter' &&
      candidate.source !== 'er-api')
  ) {
    return null;
  }
  const rates: Record<CurrencyCode, number> = { ...FALLBACK_SNAPSHOT.rates };
  for (const code of CURRENCY_CODES) {
    if (code === 'KRW') continue;
    const value = (rawRates as Record<string, unknown>)[code];
    if (!isPlausible(code, value)) return null;
    rates[code] = value;
  }
  return {
    rates,
    asOf: candidate.asOf,
    fetchedAt: candidate.fetchedAt,
    source: candidate.source
  };
}
