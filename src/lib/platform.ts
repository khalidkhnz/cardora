/**
 * Platform Configuration
 *
 * Central configuration for the entire platform. Change the values here
 * and they will reflect across the entire app — pages, emails, metadata,
 * localStorage keys, watermarks, and more.
 *
 * NOTE: Changing `dbTablePrefix` requires a database migration.
 * NOTE: Changing `storagePrefix` will reset users' local preferences (theme, cart).
 */

export const platform = {
  /** Display name of the platform (used in titles, emails, UI copy) */
  name: "Cardora",

  /** Short tagline shown alongside the name */
  tagline: "Digital Business Cards & Wedding Invitations",

  /** SEO description for the root layout */
  description:
    "Create stunning digital business cards and beautiful wedding invitations. Share via QR code, NFC, or link.",

  /** Public-facing domain (shown in profile URL hints — no protocol) */
  domain: "cardora.com",

  /** Default HTML lang attribute */
  locale: "en",

  /** Default locale for date/number formatting (Intl) */
  formatLocale: "en-US",

  /** Default country code (ISO 3166-1 alpha-2) */
  defaultCountry: "CA" as const,

  /** Default currency code (ISO 4217) */
  defaultCurrency: "CAD",

  /** Minimum password length for auth */
  minPasswordLength: 8,

  /** Prefix for localStorage keys */
  storagePrefix: "cardora",

  /** Prefix for app database tables (Drizzle pgTableCreator) */
  dbTablePrefix: "cardora",

  /** Password reset token expiry in milliseconds (1 hour) */
  passwordResetExpiryMs: 60 * 60 * 1000,

  /** Support / contact email (optional — set when available) */
  supportEmail: null as string | null,

  /** Brand colors used in emails and branded UI */
  brand: {
    primaryColor: "#667eea",
    secondaryColor: "#764ba2",
    get gradient() {
      return `linear-gradient(135deg, ${this.primaryColor} 0%, ${this.secondaryColor} 100%)`;
    },
  },

  /** Watermark text shown on animated invites */
  watermarkText: "Made with love on Cardora",

  /** Footer text for public pages */
  poweredByText: "Powered by Cardora",

  /** Example / demo data used in animated invite previews and unpaid invite fallbacks */
  demoData: {
    groomName: "James",
    brideName: "Alexandra",
    weddingDate: "2026-06-15",
    receptionDate: "2026-06-16",
    weddingTime: "6:00 PM",
    venue: "The Grand Ballroom",
    venueAddress: "123 Celebration Avenue, Toronto, ON",
    story:
      "We met at a coffee shop on a rainy afternoon. What started as a conversation over lattes turned into a lifetime of love. Three years later, here we are — ready to begin our forever together.",
    coupleMessage:
      "We are so excited to celebrate our special day with you. Your presence means the world to us!",
    groomFatherName: "Robert Anderson",
    groomMotherName: "Margaret Anderson",
    brideFatherName: "William Carter",
    brideMotherName: "Elizabeth Carter",
    /** Placeholder images shown in demo/preview mode (deterministic seeds) */
    heroImage: "https://picsum.photos/seed/cardora-hero/800/1200",
    couplePhoto: "https://picsum.photos/seed/cardora-couple/800/800",
    backgroundImage: "https://picsum.photos/seed/cardora-bg/1920/1080",
    galleryImages: [
      "https://picsum.photos/seed/cardora-gal1/800/600",
      "https://picsum.photos/seed/cardora-gal2/800/600",
      "https://picsum.photos/seed/cardora-gal3/800/600",
      "https://picsum.photos/seed/cardora-gal4/800/600",
    ],
    hashtag: "#JamesAndSophia2026",
    events: [
      { name: "Mehendi", date: "Thursday, June 11th 2026", venue: "Rose Garden Villa", time: "4:00 PM" },
      { name: "Sangeet", date: "Friday, June 12th 2026", venue: "Starlight Banquet Hall", time: "7:00 PM" },
      { name: "Wedding Ceremony", date: "Saturday, June 13th 2026", venue: "The Grand Ballroom", time: "11:00 AM" },
      { name: "Reception", date: "Saturday, June 13th 2026", venue: "The Grand Ballroom", time: "7:00 PM" },
    ],
    thingsToKnow: [
      { label: "Weather", detail: "Expected sunny, 25\u00B0C" },
      { label: "Parking", detail: "Complimentary valet parking available" },
      { label: "Accommodation", detail: "The Ritz-Carlton, 5 min from venue" },
      { label: "Dress Code", detail: "Semi-formal / Cocktail attire" },
    ],
  },
} as const;

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

/** Generate a consistent page title like "Dashboard — Cardora" */
export function pageTitle(subtitle?: string): string {
  if (!subtitle) return `${platform.name} — ${platform.tagline}`;
  return `${subtitle} — ${platform.name}`;
}

/** Generate the email "from" field like '"Cardora" <user@smtp.com>' */
export function emailFrom(smtpUser: string): string {
  return `"${platform.name}" <${smtpUser}>`;
}

/** Generate a localStorage key like "cardora_cart" */
export function storageKey(key: string): string {
  return `${platform.storagePrefix}_${key}`;
}

/** Generate a QR code download filename like "cardora-qr-code.png" */
export function qrCodeFilename(): string {
  return `${platform.name.toLowerCase()}-qr-code.png`;
}

/** Profile URL hint for forms — e.g. "cardora.com/u/username" */
export function profileUrlHint(username: string): string {
  return `${platform.domain}/u/${username}`;
}
