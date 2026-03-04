import { type CountryCode } from "./constants";

export function formatCurrency(
  amountInSmallestUnit: number,
  _currency?: string,
): string {
  // All prices are in CAD (cents)
  const amount = amountInSmallestUnit / 100;
  return `C$${amount.toFixed(2)}`;
}

export function getUnitPrice(
  _country: CountryCode,
  type: "business_card" | "wedding_card" | "animated_invite",
): number {
  // Business cards and wedding cards are FREE
  // Only animated invites are paid - C$49.99 (4999 cents)
  const prices: Record<string, number> = {
    business_card: 0,
    wedding_card: 0,
    animated_invite: 4999, // C$49.99 CAD
  };

  return prices[type] ?? 0;
}

export function getCurrencyForCountry(_country: CountryCode): string {
  return "CAD";
}
