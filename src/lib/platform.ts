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
