import { CartItem, PerUnit } from '../types';

/**
 * Tier 1 of the pricing model: a flat platform anchor, in 만원 per month.
 *
 * Matches the figure published in the whitepaper pricing table and on the
 * marketplace hero; the quote used to compute 400 while both of those showed
 * 300, so a customer saw one number while browsing and another on the quote.
 */
export const BASE_PLATFORM_FEE = 300;

/** Volume discount bands, evaluated highest threshold first. */
const VOLUME_DISCOUNT_BANDS: readonly { minModules: number; rate: number }[] = [
  { minModules: 6, rate: 0.1 },
  { minModules: 4, rate: 0.05 }
];

/**
 * How a metered module grows with the customer's own scale.
 *
 * `included` is the quantity the module's base price already covers; every
 * further `blockSize` units add `blockRate` of that base price. MES cores fall
 * out of the same formula as a plain multiplier (one line included, each extra
 * line costs a full unit price), so there is one rule rather than one per axis.
 */
export interface GrowthAxis {
  included: number;
  blockSize: number;
  blockRate: number;
}

export const GROWTH_AXES: Partial<Record<PerUnit, GrowthAxis>> = {
  // MES core: priced per production line, so every line is a full unit.
  line: { included: 1, blockSize: 1, blockRate: 1 },
  // REMS: the 기본료 covers a cleanroom's worth of sensors; growth is gradual.
  point: { included: 200, blockSize: 100, blockRate: 0.15 },
  // SCM: the 기본료 covers the first tier of suppliers on the partner portal.
  partner: { included: 10, blockSize: 10, blockRate: 0.2 }
};

/** Quantities the customer sets on the quote, one per metered axis. */
export interface GrowthMetrics {
  productionLines: number;
  measurementPoints: number;
  supplyPartners: number;
}

export const DEFAULT_GROWTH_METRICS: GrowthMetrics = {
  productionLines: 4,
  measurementPoints: 200,
  supplyPartners: 10
};

/** Slider bounds, shared by the quote inputs and by stored-value validation. */
export const GROWTH_METRIC_RANGES = {
  productionLines: { min: 1, max: 20, step: 1 },
  measurementPoints: { min: 50, max: 2000, step: 50 },
  supplyPartners: { min: 1, max: 100, step: 1 }
} as const;

/** The quantity that drives a given billing unit, or null when it is flat. */
export function axisQuantity(per: PerUnit, metrics: GrowthMetrics): number | null {
  switch (per) {
    case 'line':
      return metrics.productionLines;
    case 'point':
      return metrics.measurementPoints;
    case 'partner':
      return metrics.supplyPartners;
    default:
      return null;
  }
}

/**
 * Blocks a quantity is billed for, counting the one covered by the base price.
 * Always at least 1, so a customer below the included amount is not credited.
 */
export function billableBlocks(quantity: number, axis: GrowthAxis): number {
  const beyond = quantity - axis.included;
  if (beyond <= 0) return 1;
  return Math.ceil(beyond / axis.blockSize) + 1;
}

/**
 * Multiplier the base price is scaled by on the item's axis, or null when the
 * item is not metered. Shown next to the line so the number is auditable.
 */
export function growthFactor(per: PerUnit, metrics: GrowthMetrics): number | null {
  const axis = GROWTH_AXES[per];
  const quantity = axisQuantity(per, metrics);
  if (!axis || quantity === null) return null;
  return 1 + (billableBlocks(quantity, axis) - 1) * axis.blockRate;
}

/** Per-item monthly charge, expanded along whichever axis meters the item. */
export function lineItemTotal(item: CartItem, metrics: GrowthMetrics): number {
  const axis = GROWTH_AXES[item.per];
  const quantity = axisQuantity(item.per, metrics);
  if (!axis || quantity === null) return item.price;
  return Math.round(item.price * (1 + (billableBlocks(quantity, axis) - 1) * axis.blockRate));
}

export interface QuoteTotals {
  moduleCount: number;
  moduleSubtotal: number;
  discountRate: number;
  discountAmount: number;
  netModuleFee: number;
  grandTotal: number;
}

/**
 * Single source of truth for the quote maths, shared by the live quote view and
 * by saved scenario comparison so both always agree.
 */
export function computeQuote(cart: CartItem[], metrics: GrowthMetrics): QuoteTotals {
  const moduleSubtotal = cart.reduce((acc, item) => acc + lineItemTotal(item, metrics), 0);
  const moduleCount = cart.length;
  const discountRate = VOLUME_DISCOUNT_BANDS.find((band) => moduleCount >= band.minModules)?.rate ?? 0;
  const discountAmount = Math.round(moduleSubtotal * discountRate);
  const netModuleFee = moduleSubtotal - discountAmount;

  return {
    moduleCount,
    moduleSubtotal,
    discountRate,
    discountAmount,
    netModuleFee,
    grandTotal: BASE_PLATFORM_FEE + netModuleFee
  };
}
