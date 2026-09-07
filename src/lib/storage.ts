import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

/**
 * Namespaced localStorage keys. Bumping the version prefix invalidates every
 * stored value at once, which is the escape hatch when a persisted shape
 * changes in a way `parse` cannot migrate.
 */
const PREFIX = 'arcos.v1.';

export const STORAGE_KEYS = {
  lang: `${PREFIX}lang`,
  currency: `${PREFIX}currency`,
  cart: `${PREFIX}cart`,
  productionLines: `${PREFIX}quote.productionLines`,
  inferenceCalls: `${PREFIX}quote.inferenceCalls`,
  scenarios: `${PREFIX}quote.scenarios`,
  pocTrials: `${PREFIX}poc.trials`,
  rates: `${PREFIX}fx.rates`
} as const;

/**
 * localStorage throws rather than returning null in a few real situations:
 * Safari private browsing, browsers configured to block site data, and pages
 * loaded from a sandboxed iframe. Every access is therefore guarded, and a
 * failure degrades to in-memory state instead of breaking the render.
 */
function isStorageAvailable(): boolean {
  try {
    const probe = `${PREFIX}__probe__`;
    window.localStorage.setItem(probe, '1');
    window.localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

const storageAvailable = typeof window !== 'undefined' && isStorageAvailable();

export function readStored<T>(key: string, parse: (raw: unknown) => T | null): T | null {
  if (!storageAvailable) return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return null;
    return parse(JSON.parse(raw));
  } catch {
    // Corrupt or hand-edited value: drop it so it cannot fail again.
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* nothing further we can do */
    }
    return null;
  }
}

export function writeStored(key: string, value: unknown): void {
  if (!storageAvailable) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Quota exceeded or storage disabled mid-session; state stays in memory.
  }
}

export function clearStored(key: string): void {
  if (!storageAvailable) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

/**
 * `useState` that mirrors its value into localStorage.
 *
 * `parse` validates what comes back, so a stale or tampered value falls back to
 * `initial` rather than reaching the components as the wrong shape.
 */
export function usePersistentState<T>(
  key: string,
  initial: T,
  parse: (raw: unknown) => T | null
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const stored = readStored(key, parse);
    return stored === null ? initial : stored;
  });

  // Skip the write on mount: it would only rewrite what was just read.
  const hydrated = useRef(false);
  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true;
      return;
    }
    writeStored(key, value);
  }, [key, value]);

  return [value, setValue];
}

/** Narrowing helpers for the `parse` callbacks above. */
export const parsers = {
  oneOf<T extends string>(allowed: readonly T[]) {
    return (raw: unknown): T | null =>
      typeof raw === 'string' && (allowed as readonly string[]).includes(raw) ? (raw as T) : null;
  },
  numberInRange(min: number, max: number) {
    return (raw: unknown): number | null =>
      typeof raw === 'number' && Number.isFinite(raw) && raw >= min && raw <= max ? raw : null;
  },
  arrayOf<T>(itemParser: (raw: unknown) => T | null) {
    return (raw: unknown): T[] | null => {
      if (!Array.isArray(raw)) return null;
      const out: T[] = [];
      for (const entry of raw) {
        const parsed = itemParser(entry);
        // One bad entry invalidates the batch: a partially restored cart or
        // scenario list is more confusing than an empty one.
        if (parsed === null) return null;
        out.push(parsed);
      }
      return out;
    };
  }
};

/** Convenience wrapper used by callers that only need a stable clear callback. */
export function useClearStored(key: string): () => void {
  return useCallback(() => clearStored(key), [key]);
}
