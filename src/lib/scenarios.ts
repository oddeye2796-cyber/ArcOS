import { CartItem } from '../types';

/**
 * A saved quote configuration. Only the inputs are stored; totals are recomputed
 * with `computeQuote` on read so a saved scenario always reflects the current
 * pricing rules rather than a stale snapshot of them.
 */
export interface QuoteScenario {
  id: string;
  name: string;
  savedAt: string;
  cart: CartItem[];
  productionLines: number;
  inferenceCalls: number;
}

/** Comparing more than a handful of columns stops being readable on one screen. */
export const MAX_SCENARIOS = 4;

const PER_VALUES = ['flat', 'line', 'batch', 'point', 'user'] as const;

function parseCartItem(raw: unknown): CartItem | null {
  if (typeof raw !== 'object' || raw === null) return null;
  const item = raw as Record<string, unknown>;
  if (
    typeof item.id !== 'string' ||
    typeof item.appId !== 'string' ||
    typeof item.name !== 'string' ||
    typeof item.category !== 'string' ||
    typeof item.price !== 'number' ||
    !Number.isFinite(item.price) ||
    typeof item.unitLabel !== 'string' ||
    typeof item.per !== 'string' ||
    !(PER_VALUES as readonly string[]).includes(item.per)
  ) {
    return null;
  }
  return {
    id: item.id,
    appId: item.appId,
    name: item.name,
    category: item.category,
    price: item.price,
    per: item.per as CartItem['per'],
    unitLabel: item.unitLabel
  };
}

export const parseCart = (raw: unknown): CartItem[] | null => {
  if (!Array.isArray(raw)) return null;
  const out: CartItem[] = [];
  for (const entry of raw) {
    const parsed = parseCartItem(entry);
    if (parsed === null) return null;
    out.push(parsed);
  }
  return out;
};

function parseScenario(raw: unknown): QuoteScenario | null {
  if (typeof raw !== 'object' || raw === null) return null;
  const s = raw as Record<string, unknown>;
  const cart = parseCart(s.cart);
  if (
    typeof s.id !== 'string' ||
    typeof s.name !== 'string' ||
    typeof s.savedAt !== 'string' ||
    cart === null ||
    typeof s.productionLines !== 'number' ||
    !Number.isFinite(s.productionLines) ||
    typeof s.inferenceCalls !== 'number' ||
    !Number.isFinite(s.inferenceCalls)
  ) {
    return null;
  }
  return {
    id: s.id,
    name: s.name,
    savedAt: s.savedAt,
    cart,
    productionLines: s.productionLines,
    inferenceCalls: s.inferenceCalls
  };
}

export const parseScenarios = (raw: unknown): QuoteScenario[] | null => {
  if (!Array.isArray(raw)) return null;
  const out: QuoteScenario[] = [];
  for (const entry of raw) {
    const parsed = parseScenario(entry);
    if (parsed === null) return null;
    out.push(parsed);
  }
  return out.slice(0, MAX_SCENARIOS);
};

/** `A`, `B`, `C`… label for a scenario column, by position. */
export function scenarioLabel(index: number): string {
  return String.fromCharCode(65 + index);
}

export function createScenarioId(): string {
  return `scn-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

/**
 * Every module id across the compared scenarios, in first-seen order, so the
 * comparison table has one row per module even when a scenario omits it.
 */
export function unionModuleIds(scenarios: QuoteScenario[]): string[] {
  const seen = new Set<string>();
  const ordered: string[] = [];
  for (const scenario of scenarios) {
    for (const item of scenario.cart) {
      if (!seen.has(item.id)) {
        seen.add(item.id);
        ordered.push(item.id);
      }
    }
  }
  return ordered;
}
