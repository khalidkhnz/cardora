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
    /** Curated Unsplash wedding photos for demo/preview mode */
    heroImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1200&fit=crop&q=80",
    couplePhoto:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=800&fit=crop&q=80",
    backgroundImage:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&h=1080&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=800&h=600&fit=crop&q=80",
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
