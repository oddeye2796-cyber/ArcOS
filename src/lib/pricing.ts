import { CartItem } from '../types';

/** Tier 1 of the pricing model: a flat platform anchor, in 만원 per month. */
export const BASE_PLATFORM_FEE = 400;

/** Volume discount bands, evaluated highest threshold first. */
const VOLUME_DISCOUNT_BANDS: readonly { minModules: number; rate: number }[] = [
  { minModules: 6, rate: 0.1 },
  { minModules: 4, rate: 0.05 }
];

export interface QuoteTotals {
  moduleCount: number;
  moduleSubtotal: number;
  discountRate: number;
  discountAmount: number;
  netModuleFee: number;
  grandTotal: number;
}

/** Per-item monthly charge, expanding line-metered items by the line count. */
export function lineItemTotal(item: CartItem, productionLines: number): number {
  return item.per === 'line' ? item.price * productionLines : item.price;
}

/**
 * Single source of truth for the quote maths, shared by the live quote view and
 * by saved scenario comparison so both always agree.
 */
export function computeQuote(cart: CartItem[], productionLines: number): QuoteTotals {
  const moduleSubtotal = cart.reduce((acc, item) => acc + lineItemTotal(item, productionLines), 0);
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
