import { CartItem } from '../types';

/**
 * Minimum subscription term a module is sold on, per the operating policy in
 * the platform blueprint: MES cores are annual, the regulated domain
 * extensions are quarterly, and the AI modules bill monthly against a usage
 * floor instead of a lock-in period.
 */
export type CommitmentTerm = 'annual' | 'quarterly' | 'monthly';

export const COMMITMENT_MONTHS: Record<CommitmentTerm, number> = {
  annual: 12,
  quarterly: 3,
  monthly: 1
};

/**
 * Monthly-term modules carry no lock-in, so the floor is a minimum billable
 * amount (만원/month) rather than a period — otherwise a tenant could park an
 * AI module at near-zero usage and still occupy a runtime slot.
 */
export const MONTHLY_MINIMUM_CHARGE = 50;

/** Longest term first, so a mixed cart resolves to the binding one. */
const TERM_RANK: Record<CommitmentTerm, number> = { annual: 3, quarterly: 2, monthly: 1 };

const TERM_BY_MODULE: Record<string, CommitmentTerm> = {
  // MES cores: annual, matching the plant's own production planning cycle.
  'mes-pharma': 'annual',
  'mes-food': 'annual',
  'mes-general': 'annual',
  // The data spine every other module reads through cannot be torn down
  // mid-year without taking the modules above with it.
  b2lab: 'annual',
  // Regulated domain extensions: quarterly.
  ebrs: 'quarterly',
  rems: 'quarterly',
  scm: 'quarterly',
  aesg: 'quarterly',
  twin: 'quarterly',
  arcmind: 'quarterly',
  // AI modules and ConsensBot: monthly, with the usage floor above.
  a2lab: 'monthly',
  orch: 'monthly',
  consensbot: 'monthly'
};

/** Anything not named in the policy defaults to the quarterly middle ground. */
export function commitmentFor(moduleId: string): CommitmentTerm {
  return TERM_BY_MODULE[moduleId] ?? 'quarterly';
}

/** True when the module bills against a usage floor rather than a lock-in. */
export function hasUsageFloor(moduleId: string): boolean {
  return commitmentFor(moduleId) === 'monthly';
}

/**
 * The term that actually binds the customer: the longest one in the cart,
 * since a single annual module holds the whole subscription for a year.
 */
export function bindingCommitment(cart: CartItem[]): CommitmentTerm | null {
  let binding: CommitmentTerm | null = null;
  for (const item of cart) {
    const term = commitmentFor(item.id);
    if (binding === null || TERM_RANK[term] > TERM_RANK[binding]) binding = term;
  }
  return binding;
}
