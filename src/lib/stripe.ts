import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    _stripe = new Stripe(key, {
      apiVersion: "2026-01-28.clover",
    });
  }
  return _stripe;
}

/**
 * @deprecated Use `getStripe()` instead for lazy initialization.
 * Kept for backwards compatibility — throws at runtime if key is missing.
 */
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return Reflect.get(getStripe(), prop);
  },
});
