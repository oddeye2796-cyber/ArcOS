import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  FALLBACK_SNAPSHOT,
  RateSnapshot,
  fetchRateSnapshot,
  isSnapshotFresh,
  parseRateSnapshot
} from './exchangeRates';
import { STORAGE_KEYS, readStored, writeStored } from './storage';

export type RateStatus = 'idle' | 'loading' | 'live' | 'stale' | 'error';

interface ExchangeRateValue {
  snapshot: RateSnapshot;
  status: RateStatus;
  /** Force a refetch, ignoring the cache TTL. */
  refresh: () => void;
}

const ExchangeRateContext = createContext<ExchangeRateValue>({
  snapshot: FALLBACK_SNAPSHOT,
  status: 'idle',
  refresh: () => {}
});

/**
 * Owns the exchange-rate snapshot for the whole app.
 *
 * Rates start from the cache (or the bundled fallback) so the very first render
 * already has usable numbers — money formatting stays synchronous and no price
 * ever renders blank while a request is in flight.
 */
export const ExchangeRateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [snapshot, setSnapshot] = useState<RateSnapshot>(
    () => readStored(STORAGE_KEYS.rates, parseRateSnapshot) ?? FALLBACK_SNAPSHOT
  );
  const [status, setStatus] = useState<RateStatus>('idle');

  // Guards against a refresh click landing while the mount fetch is still open.
  const inFlight = useRef<AbortController | null>(null);

  const load = useCallback(async (force: boolean) => {
    const cached = readStored(STORAGE_KEYS.rates, parseRateSnapshot);
    if (!force && cached && isSnapshotFresh(cached)) {
      setSnapshot(cached);
      setStatus('live');
      return;
    }

    inFlight.current?.abort();
    const controller = new AbortController();
    inFlight.current = controller;
    setStatus('loading');

    const fetched = await fetchRateSnapshot(controller.signal);
    if (controller.signal.aborted) return;

    if (fetched) {
      setSnapshot(fetched);
      writeStored(STORAGE_KEYS.rates, fetched);
      setStatus('live');
      return;
    }

    // Every provider failed. Keep showing the best rates we have and say so,
    // rather than falling back to a blank or an obviously wrong number.
    setStatus(cached || snapshot.source !== 'bundled' ? 'stale' : 'error');
  }, [snapshot.source]);

  useEffect(() => {
    void load(false);
    return () => inFlight.current?.abort();
    // Mount only: the TTL, not a re-render, decides when rates are refetched.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refresh = useCallback(() => {
    void load(true);
  }, [load]);

  return (
    <ExchangeRateContext.Provider value={{ snapshot, status, refresh }}>
      {children}
    </ExchangeRateContext.Provider>
  );
};

export function useExchangeRates(): ExchangeRateValue {
  return useContext(ExchangeRateContext);
}
