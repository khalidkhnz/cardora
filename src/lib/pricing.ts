import { COUNTRIES, type CountryCode } from "./constants";

export function formatCurrency(
  amountInSmallestUnit: number,
  currency: string,
): string {
  const symbol = currency === "INR" ? "₹" : currency === "CAD" ? "C$" : "$";
  const amount = amountInSmallestUnit / 100;
  return `${symbol}${amount.toFixed(2)}`;
}

export function getUnitPrice(
  country: CountryCode,
  type: "business_card" | "wedding_card" | "animated_invite",
): number {
  // Price per share in smallest currency unit (cents/paise)
  const prices: Record<
    CountryCode,
    Record<string, number>
  > = {
    CA: {
      business_card: 20, // $0.20 CAD
      wedding_card: 20,
      animated_invite: 50, // $0.50 CAD
    },
    IN: {
      business_card: 5000, // ₹50.00 INR
      wedding_card: 5000,
      animated_invite: 5000, // ₹50.00 INR
    },
  };

  return prices[country]?.[type] ?? 20;
}

export function getCurrencyForCountry(country: CountryCode): string {
  return COUNTRIES[country].currency;
}
