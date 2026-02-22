import { platform } from "./platform";

export const APP_NAME = platform.name;

export const COUNTRIES = {
  CA: { name: "Canada", currency: "CAD", symbol: "$" },
  IN: { name: "India", currency: "INR", symbol: "₹" },
} as const;

export type CountryCode = keyof typeof COUNTRIES;

export const PRICING = {
  CA: {
    businessCard: 499, // cents
    weddingInvite: 999,
    currency: "CAD",
  },
  IN: {
    businessCard: 29900, // paise
    weddingInvite: 59900,
    currency: "INR",
  },
} as const;

export const CARD_COLLECTIONS = {
  business: "Business Cards",
  wedding: "Wedding Invitations",
  signature: "Signature Collection",
  animated: "Animated Invites",
} as const;

export const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Card", href: "/dashboard/card", icon: "CreditCard" },
  { label: "Analytics", href: "/dashboard/analytics", icon: "BarChart3" },
  { label: "Profile", href: "/dashboard/profile", icon: "User" },
  { label: "Animated Invite", href: "/dashboard/animated-invite", icon: "Sparkles" },
  { label: "RSVPs", href: "/dashboard/rsvps", icon: "Mail" },
  { label: "Gallery", href: "/dashboard/gallery", icon: "Image" },
  { label: "Payments", href: "/dashboard/payments", icon: "Wallet" },
  { label: "NFC Guide", href: "/dashboard/nfc-guide", icon: "Nfc" },
] as const;
