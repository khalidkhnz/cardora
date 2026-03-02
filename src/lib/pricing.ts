import { type CountryCode } from "./constants";

export function formatCurrency(
  amountInSmallestUnit: number,
  _currency?: string,
): string {
  // All prices are in INR (paise)
  const amount = amountInSmallestUnit / 100;
  return `₹${amount.toFixed(2)}`;
}

export function getUnitPrice(
  _country: CountryCode,
  type: "business_card" | "wedding_card" | "animated_invite",
): number {
  // Business cards and wedding cards are FREE
  // Only animated invites are paid — ₹3,000 (300000 paise)
  const prices: Record<string, number> = {
    business_card: 0,
    wedding_card: 0,
    animated_invite: 300000, // ₹3,000.00 INR
  };

  return prices[type] ?? 0;
}

export function getCurrencyForCountry(_country: CountryCode): string {
  return "INR";
}
