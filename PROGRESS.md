# Cardora Remake — Progress Tracker

## What's Done

### Phase 0: Foundation Setup

- [x] **Table prefix** — Changed from `pg-drizzle_` to `cardora_`, updated `drizzle.config.ts` filter to include both prefixed app tables and unprefixed auth tables
- [x] **Dependencies** — Installed `@tanstack/react-query`, `framer-motion`, `server-only`, `next-themes`, `nodemailer`, `@types/nodemailer`
- [x] **shadcn/ui** — Initialized (new-york style, lucide icons) with 17 components: button, card, input, label, dialog, dropdown-menu, sheet, skeleton, avatar, badge, separator, table, tabs, switch, select, textarea, sonner
- [x] **Database schema** — Split monolithic `schema.ts` into `src/server/db/schema/` directory:
  - `auth.ts` — user, session, account, verification (unprefixed, better-auth managed)
  - `profile.ts` — userProfile (`cardora_user_profile`)
  - `card.ts` — cardSettings (`cardora_card_settings`)
  - `wedding.ts` — weddingInvite (`cardora_wedding_invite`)
  - `payment.ts` — payment (`cardora_payment`)
  - `analytics.ts` — analyticsEvent (`cardora_analytics_event`)
  - `rsvp.ts` — rsvp (`cardora_rsvp`)
  - `gallery.ts` — galleryItem (`cardora_gallery_item`)
  - `password-reset.ts` — passwordResetToken (`cardora_password_reset_token`)
  - `index.ts` — re-exports all schemas + relations
- [x] **Removed sample `posts` table**
- [x] **Infrastructure files**:
  - `src/providers/query-provider.tsx` — TanStack QueryClientProvider
  - `src/lib/api-client.ts` — Type-safe fetch wrapper with `ApiError` class
  - `src/server/auth-helpers.ts` — `getApiSession(request)` for route handlers
  - `src/lib/validators.ts` — Zod schemas (updateProfile, updateCardSettings, createWeddingInvite, submitRsvp, signup)
  - `src/lib/constants.ts` — APP_NAME, COUNTRIES, PRICING, CARD_COLLECTIONS, NAV_ITEMS
- [x] **Root layout** — Wrapped with `QueryProvider` + `CartProvider` + `ThemeProvider` + shadcn `Toaster`, updated metadata to Cardora branding
- [x] **Environment** — Added `NEXT_PUBLIC_APP_URL` (client), SMTP vars (server), Stripe vars. Removed GitHub OAuth vars.

### Phase 1: Auth + Dashboard + Profile

- [x] **Auth config** — Removed GitHub OAuth, email/password only via better-auth
- [x] **Email system** — `src/server/utils/email.ts` with nodemailer:
  - `sendPasswordResetEmail()` — HTML template, 1-hour token, console fallback
  - `sendPaymentSuccessEmail()` — Transaction details, currency formatting
  - `sendRSVPNotificationEmail()` — Guest details to couple
- [x] **Password reset flow** — Custom implementation (not better-auth built-in):
  - `POST /api/auth/forgot-password` — Generates token, sends email
  - `POST /api/auth/reset-password` — Validates token, hashes password via better-auth context
  - `GET /api/auth/verify-reset-token` — Checks token validity
  - `passwordResetToken` table in schema
- [x] **Auth pages**: `/login`, `/signup`, `/forgot-password`, `/reset-password`
- [x] **Dashboard layout** — Sidebar (desktop) + header + mobile sheet nav + user dropdown + theme toggle
- [x] **Dashboard home** (`/dashboard`) — Welcome message, quick action cards, getting started checklist, QR code sharing section
- [x] **Profile system** — Full editor, API routes, DB queries, TanStack Query hooks

### Phase 2: Card System

- [x] **Business card templates** — `src/lib/templates/business-card-templates.ts` with 10 templates:
  - Geometric Modern, Luxury Gold, Dark Elegant, Colorful Gradient, Corporate Blue, Artistic Splash, Tech Cyber, Nature Organic, Royal Purple, Premium Black
  - Each template: id, name, description, colors (primary/secondary/accent), preview, category, layout, style
- [x] **Wedding card templates** — `src/lib/templates/wedding-card-templates.ts` with 26 templates
  - Premium Luxury (7), Heritage & Traditional (4), Hindu Tradition (1), Elegant & Romantic (5), Additional Premium (5), Diamond & Luxury (4)
  - Each template: colors (primary/secondary/accent/text), category, background settings, overlay flags
- [x] **Signature templates** — `src/lib/templates/signature-templates.ts` with 18 templates
  - 9 engagement templates + 9 anniversary templates
- [x] **Card types**: business, wedding, engagement, anniversary
- [x] **Card editor page** `/dashboard/card` with:
  - Country selector (India/Canada) with flag emojis and currency display
  - Card type selector (4 types with icons)
  - Live card preview with orientation (horizontal/vertical) and size (standard/large)
  - Template grid with category filters and selection
  - Template selection modal with full preview
  - Card config form (profile settings + payment settings + wedding details)
- [x] **Components**: `country-selector.tsx`, `card-type-selector.tsx`, `business-card-preview.tsx` (10 layout variants), `template-grid.tsx`, `template-selection-modal.tsx`, `card-config-form.tsx`
- [x] **API routes**: `GET/PUT /api/card/settings` — card settings CRUD
- [x] **Hooks**: `useCardSettings()`, `useUpdateCardSettings()`
- [x] **DB queries**: `getCardSettings(userId)`, `updateCardSettings(userId, data)`
- [x] **Public profile page** `/u/[username]` with:
  - Profile header (image/initials, name, profession, company)
  - Business card preview (if business card type)
  - Contact info boxes (phone, email, WhatsApp, address)
  - Social links grid (LinkedIn, Twitter, Instagram, Website, GitHub)
  - Share button (Web Share API + clipboard fallback)
  - Pay Now button (if paymentEnabled)
  - Profile view analytics tracking
  - `profileEnabled` toggle — hides profile if disabled
- [x] **API route**: `GET /api/card/[username]` — public card data + analytics tracking

### Phase 3: Analytics

- [x] **Event types**: profile_view, payment_view, payment_success, qr_scan, nfc_tap, link_click, cart_payment_view, cart_payment_success
- [x] **Per event**: deviceType (mobile/desktop/tablet), userAgent, ipAddress, referer, timestamp
- [x] **Device type detection** from userAgent
- [x] **Analytics dashboard** `/dashboard/analytics` with:
  - Stats grid: total views, last 30 days, payment views/successes, QR scans, NFC taps
  - Device breakdown bar chart with legend
  - Visitor insights table with pagination (50/page), browser detection, IP masking, referer
- [x] **Components**: `stats-grid.tsx`, `device-breakdown.tsx`, `visitor-insights.tsx`
- [x] **API routes**: `POST /api/analytics/track`, `GET /api/analytics/summary`, `GET /api/analytics/visitors`
- [x] **Hooks**: `useAnalyticsSummary()`, `useVisitors(page)`
- [x] **DB queries**: `getAnalyticsSummary(userId)`, `getVisitors(userId, page)`

### Phase 4: Payment System

- [x] **Stripe integration** — `src/lib/stripe.ts` with Stripe SDK (API version 2026-01-28.clover)
- [x] **Cart system** — `src/providers/cart-provider.tsx` with React context + localStorage persistence
  - CartItem interface (type, templateId, name, size, orientation, quantity, unitPrice, currency)
  - addToCart (merges duplicates), removeFromCart, updateQuantity, clearCart, getTotal, getCount
- [x] **Pricing** — `src/lib/pricing.ts` with multi-country support (CA/IN), formatCurrency, getUnitPrice, getCurrencyForCountry
- [x] **Payment API routes**:
  - `POST /api/payment/create-stripe-session` — Single-item Stripe checkout
  - `POST /api/payment/create-cart-session` — Multi-item cart checkout
  - `POST /api/payment/verify` — Verify payment status
  - `POST /api/payment/webhook` — Stripe webhook with signature verification + auto-unlock
  - `GET /api/payment/history` — User payment history
  - `POST /api/unlock/card` — Unlock business card
  - `POST /api/unlock/invite` — Unlock wedding invite
  - `POST /api/unlock/verify-payment` — Verify + unlock combined
- [x] **Payment UI**:
  - Checkout page `/dashboard/checkout` with cart item list + order summary
  - Payment history page `/dashboard/payments` with table, status badges, purpose labels
  - Public payment page `/pay/[username]` with fixed/flexible amount, Interac info
  - Success page `/success` with payment verification + amount display
  - Cancel page `/cancel` with retry options
- [x] **Components**: `cart-item-list.tsx`, `order-summary.tsx`
- [x] **Hooks**: `usePaymentHistory()`, `useCreateStripeSession()`, `useCreateCartSession()`, `useVerifyPayment()`, `useVerifyAndUnlockPayment()`
- [x] **DB queries**: `createPayment()`, `getPaymentHistory()`, `getPaymentByStripeSession()`, `updatePaymentStatus()`, `unlockCard()`, `unlockInvite()`
- [x] **Environment**: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

### Phase 5: File Uploads

- [x] **Image uploads**: `POST /api/upload/image` — 5MB limit, jpeg/jpg/png/gif/webp
  - `GET /api/upload/image` — list user's uploaded images
  - `DELETE /api/upload/image?url=` — delete image (ownership check)
  - Naming: `{userId}-{timestamp}-{random}.{ext}` in `public/uploads/`
  - Auto-delete old file on replacement via `oldUrl` form field
- [x] **Audio uploads**: `POST /api/upload/audio` — 10MB limit, mp3/wav/ogg/m4a/aac
  - `DELETE /api/upload/audio?url=` — delete audio
- [x] **Components**:
  - `src/components/shared/image-upload.tsx` — Drag/drop + preview + remove
  - `src/components/shared/music-upload.tsx` — Audio file selector + playback preview
- [x] **Hooks**: `useUploadImage()`, `useUploadAudio()`

### Phase 6: Animated Wedding Invites

- [x] **Animated template data** — `src/lib/templates/animated-templates.ts` with 17 templates:
  - Motion Video, Cinematic Film, Mountain Peak, Theater Luxury, Mediterranean Elegance, Raabta, Mountains, Beach, City, Laavan, Floral Elegance, Indian Heritage, Minimal Modern, Romantic Garden, Royal Palace, Cinematic Scroll, Golden Night
  - Categories: Premium, Nature, Elegant, Traditional, Modern, Romantic, Luxury
- [x] **Animated invite editor** `/dashboard/animated-invite` with:
  - Template selection grid with category filters and feature badges
  - Invite details form (slug, couple names, dates, venue, address, story)
  - Media uploads (hero image + background music)
  - Live preview link
- [x] **Public wedding page** `/wedding/[slug]` with:
  - Demo mode (shows demo data + banner if unpaid)
  - Hero section with couple image
  - Names with decorative separator
  - Date and venue sections
  - Story section
  - RSVP button (opens modal)
  - Share button
  - Background music controls
- [x] **API routes**:
  - `POST /api/wedding/create` — create/update invite
  - `GET /api/wedding/[slug]` — public invite (demo data if unpaid)
  - `GET /api/wedding/current` — current user's invite
- [x] **Hooks**: `useWeddingInvite(slug)`, `useCurrentInvite()`, `useCreateInvite()`
- [x] **DB queries**: `getWeddingInviteBySlug()`, `getCurrentUserInvite()`, `createOrUpdateInvite()`

### Phase 7: RSVP System

- [x] **RSVP submission** (public, no auth): guestName, guestEmail, phone, attending (yes/no/maybe), numberOfGuests (1-10), dietaryRestrictions, message
- [x] **RSVP modal** component for wedding invite pages
- [x] **Dashboard page** `/dashboard/rsvps` with:
  - Stats grid: total RSVPs, attending, declined, maybe, total guests
  - Guest table with all details + delete button
- [x] **Public stats endpoint**: `GET /api/rsvp/[inviteSlug]` — limited data
- [x] **Components**: `rsvp-modal.tsx`, `rsvp-table.tsx`, `rsvp-stats.tsx`
- [x] **API routes**: `POST /api/rsvp/submit`, `GET /api/rsvp/[inviteSlug]`, `GET /api/rsvp/dashboard`, `DELETE /api/rsvp/[rsvpId]/delete`
- [x] **Hooks**: `useSubmitRSVP()`, `useDashboardRSVPs()`, `usePublicRSVPStats()`, `useDeleteRSVP()`

### Phase 8: Gallery / Download System

- [x] **Gallery API**: `GET /api/download/gallery`, `POST /api/download/card`, `POST /api/download/invite`
- [x] **Payment check**: Downloads require `cardPaid` or `invitePaid` status
- [x] **Dashboard page** `/dashboard/gallery` — Browse saved designs with type badges, template IDs, dates
- [x] **Hook**: `useGallery()`
- [x] **DB queries**: `getGalleryItems()`, `addToGallery()`, `checkPaymentStatus()`

### Phase 9: Landing Page + Dark Mode

- [x] **Landing page** rewritten with Framer Motion animations:
  - Sticky header with blur backdrop
  - Hero with animated pill badge, gradient text, dual CTAs, feature highlights
  - Feature grid (6 cards) with staggered entrance animations
  - Pricing section (Business Card C$4.99, Wedding Invite C$9.99)
  - Full-width CTA section
  - Footer
- [x] **Dark mode** — Class-based (`html.dark`) with `ThemeProvider`:
  - System/Light/Dark modes with localStorage persistence
  - `ThemeToggle` dropdown component in dashboard header and landing page
  - `suppressHydrationWarning` on html element
  - Tailwind v4 dark mode variant already configured via shadcn
- [x] **Landing page** — Split into server component (`page.tsx`) + client component (`LandingContent`)

### Phase 10: QR Code Sharing

- [x] **QR Code component** — `src/components/shared/qr-code-card.tsx`:
  - SVG QR code via `qrcode.react`
  - Copy link button with clipboard API
  - Download as PNG (SVG → Canvas → PNG)
  - Share button (Web Share API with clipboard fallback)
- [x] **Dashboard share section** — `src/components/dashboard/share-section.tsx`:
  - QR code for profile URL
  - Profile link display
  - NFC tap instructions
- [x] **Integrated** into dashboard home page (shows when profile is set up)

### Infrastructure

- [x] **Lint + typecheck** — Both pass clean after all phases
- [x] **All providers wired**: QueryProvider, CartProvider, ThemeProvider in root layout

---

## File Tree (current state)

```
src/
├── app/
│   ├── layout.tsx                          # Root layout (ThemeProvider + QueryProvider + CartProvider + Toaster)
│   ├── page.tsx                            # Landing page (server → LandingContent client)
│   ├── success/page.tsx                    # Payment success with verification
│   ├── cancel/page.tsx                     # Payment cancelled
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   └── reset-password/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx                      # Auth guard + DashboardLayout wrapper
│   │   └── dashboard/
│   │       ├── page.tsx                    # Dashboard home + QR sharing
│   │       ├── profile/page.tsx
│   │       ├── card/page.tsx               # Full card editor
│   │       ├── analytics/page.tsx          # Analytics dashboard
│   │       ├── animated-invite/page.tsx    # Animated invite editor
│   │       ├── rsvps/page.tsx              # RSVP management
│   │       ├── gallery/page.tsx            # Gallery view
│   │       ├── checkout/page.tsx           # Cart checkout
│   │       └── payments/page.tsx           # Payment history
│   ├── (public)/
│   │   ├── u/[username]/page.tsx           # Public profile
│   │   ├── wedding/[slug]/page.tsx         # Public wedding invite
│   │   └── pay/[username]/page.tsx         # Public payment page
│   └── api/
│       ├── auth/
│       │   ├── [...all]/route.ts
│       │   ├── forgot-password/route.ts
│       │   ├── reset-password/route.ts
│       │   └── verify-reset-token/route.ts
│       ├── user/profile/route.ts
│       ├── card/
│       │   ├── settings/route.ts
│       │   └── [username]/route.ts
│       ├── analytics/
│       │   ├── track/route.ts
│       │   ├── summary/route.ts
│       │   └── visitors/route.ts
│       ├── upload/
│       │   ├── image/route.ts
│       │   └── audio/route.ts
│       ├── wedding/
│       │   ├── create/route.ts
│       │   ├── [slug]/route.ts
│       │   └── current/route.ts
│       ├── rsvp/
│       │   ├── submit/route.ts
│       │   ├── dashboard/route.ts
│       │   ├── [inviteSlug]/route.ts
│       │   └── [rsvpId]/delete/route.ts
│       ├── payment/
│       │   ├── create-stripe-session/route.ts
│       │   ├── create-cart-session/route.ts
│       │   ├── verify/route.ts
│       │   ├── webhook/route.ts
│       │   └── history/route.ts
│       ├── unlock/
│       │   ├── card/route.ts
│       │   ├── invite/route.ts
│       │   └── verify-payment/route.ts
│       └── download/
│           ├── card/route.ts
│           ├── invite/route.ts
│           └── gallery/route.ts
├── components/
│   ├── auth/
│   │   ├── login-form.tsx
│   │   └── signup-form.tsx
│   ├── layout/
│   │   ├── dashboard-layout.tsx            # + ThemeToggle in header
│   │   └── dashboard-sidebar.tsx
│   ├── landing/
│   │   └── landing-content.tsx             # Framer Motion animated landing
│   ├── profile/
│   │   └── profile-form.tsx
│   ├── card/
│   │   ├── country-selector.tsx
│   │   ├── card-type-selector.tsx
│   │   ├── business-card-preview.tsx
│   │   ├── template-grid.tsx
│   │   ├── template-selection-modal.tsx
│   │   └── card-config-form.tsx
│   ├── analytics/
│   │   ├── stats-grid.tsx
│   │   ├── device-breakdown.tsx
│   │   └── visitor-insights.tsx
│   ├── animated-invite/
│   │   ├── animated-invite-editor.tsx
│   │   └── public-wedding-view.tsx
│   ├── checkout/
│   │   ├── cart-item-list.tsx
│   │   └── order-summary.tsx
│   ├── dashboard/
│   │   └── share-section.tsx               # QR code + sharing
│   ├── rsvp/
│   │   ├── rsvp-modal.tsx
│   │   ├── rsvp-stats.tsx
│   │   └── rsvp-table.tsx
│   ├── public/
│   │   └── public-profile-view.tsx
│   ├── shared/
│   │   ├── image-upload.tsx
│   │   ├── music-upload.tsx
│   │   ├── theme-toggle.tsx
│   │   └── qr-code-card.tsx
│   └── ui/                                 # shadcn/ui (17 components)
├── hooks/
│   ├── use-user.ts
│   ├── use-card.ts
│   ├── use-analytics.ts
│   ├── use-upload.ts
│   ├── use-wedding.ts
│   ├── use-rsvp.ts
│   ├── use-gallery.ts
│   └── use-payment.ts
├── lib/
│   ├── api-client.ts
│   ├── constants.ts
│   ├── pricing.ts
│   ├── stripe.ts
│   ├── utils.ts
│   ├── validators.ts
│   └── templates/
│       ├── business-card-templates.ts      # 10 templates
│       ├── wedding-card-templates.ts       # 26 templates
│       ├── signature-templates.ts          # 18 templates (9 engagement + 9 anniversary)
│       └── animated-templates.ts           # 17 templates
├── providers/
│   ├── query-provider.tsx
│   ├── cart-provider.tsx
│   └── theme-provider.tsx
├── server/
│   ├── auth-helpers.ts
│   ├── better-auth/
│   │   ├── index.ts
│   │   ├── config.ts
│   │   ├── server.ts
│   │   └── client.ts
│   ├── db/
│   │   ├── index.ts
│   │   ├── queries/
│   │   │   ├── user.ts
│   │   │   ├── card.ts
│   │   │   ├── analytics.ts
│   │   │   ├── wedding.ts
│   │   │   ├── rsvp.ts
│   │   │   ├── gallery.ts
│   │   │   └── payment.ts
│   │   └── schema/
│   │       ├── index.ts
│   │       ├── auth.ts
│   │       ├── profile.ts
│   │       ├── card.ts
│   │       ├── wedding.ts
│   │       ├── payment.ts
│   │       ├── analytics.ts
│   │       ├── rsvp.ts
│   │       ├── gallery.ts
│   │       └── password-reset.ts
│   └── utils/
│       └── email.ts
├── styles/
│   └── globals.css
└── env.js
```

## All Phases Complete

All planned phases (0-10) have been implemented. The codebase passes lint + typecheck clean.
