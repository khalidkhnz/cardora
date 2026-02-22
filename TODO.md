# Cardora Remake — Feature TODO

Features to port from the original Cardora app (`Cardora/`) into the remake (`cardora-remake-next/`).

---

## Phase 2: Card System

### 2a. Business Card Templates & Editor
- [x] Create template data file `src/lib/templates/business-card-templates.ts` with 10+ templates
- [x] Card types: `business`, `wedding`, `engagement`, `anniversary`
- [x] Collections: `standard`, `signature`
- [x] Card editor page `/dashboard/card` with country selector, card type selector, template grid, live preview, config form
- [x] Components: `country-selector.tsx`, `card-type-selector.tsx`, `business-card-preview.tsx`, `template-grid.tsx`, `template-selection-modal.tsx`, `card-config-form.tsx`
- [x] API routes: `GET/PUT /api/card/settings`
- [x] Hooks: `useCardSettings()`, `useUpdateCardSettings()`
- [x] DB queries: `getCardSettings(userId)`, `updateCardSettings(userId, data)`

### 2b. Wedding Card Templates (Static)
- [x] Template data file `src/lib/templates/wedding-card-templates.ts` — 26 standard templates
- [x] Template data file `src/lib/templates/signature-templates.ts` — 9 engagement + 9 anniversary
- [x] Wedding template preview component
- [x] Support all wedding fields: bride/groom names, parent names, venue, date, deceased elders

### 2c. Public Profile Page
- [x] Page: `src/app/(public)/u/[username]/page.tsx`
- [x] Display: name, profession, company, contact info, social links, profile image
- [x] Gradient UI with Framer Motion animations
- [x] Contact info boxes with icons, social links as clickable cards
- [x] Share button (native Web Share API, fallback to clipboard copy)
- [x] "Pay Now" button if `paymentEnabled` is true
- [x] Download button for saving card to gallery
- [x] Track `profile_view` analytics event
- [x] `profileEnabled` toggle — hide profile if disabled
- [x] API route: `GET /api/card/[username]`

---

## Phase 3: Analytics
- [x] Track event types: `profile_view`, `payment_view`, `payment_success`, `qr_scan`, `nfc_tap`, `link_click`, `cart_payment_view`, `cart_payment_success`
- [x] Store per event: deviceType, userAgent, ipAddress, referer, timestamp
- [x] Device type detection from userAgent
- [x] Analytics dashboard page `/dashboard/analytics` with stats, device breakdown, visitor table
- [x] Components: `stats-grid.tsx`, `device-breakdown.tsx`, `visitor-insights.tsx`
- [x] API routes: `POST /api/analytics/track`, `GET /api/analytics/summary`, `GET /api/analytics/visitors`
- [x] Hooks: `useAnalyticsSummary()`, `useVisitors(page)`

---

## Phase 4: Payment System
- [x] Install: `stripe`, `@stripe/stripe-js`
- [x] Env vars: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- [x] Payment methods: Stripe (global), Interac e-transfer (Canada only)
- [x] Payment config per user: `paymentEnabled`, `paymentType`, `fixedAmount`, `interacEmail`
- [x] Pricing per country (Canada CAD, India INR)
- [x] Cart system: `src/providers/cart-provider.tsx` — React context + localStorage
- [x] Pages: `/dashboard/checkout`, `/dashboard/payments`, `/pay/[username]`, `/success`, `/cancel`
- [x] Components: `cart-item-list.tsx`, `order-summary.tsx`, `payment-method-selector.tsx`
- [x] API routes: create-stripe-session, create-cart-session, verify, webhook, history, unlock
- [x] Hooks: `useCart()`, `usePaymentHistory()`, `useCreateStripeSession()`, `useVerifyPayment()`
- [x] Send payment success email on completion
- [x] Currency formatting: ₹ for INR, C$ for CAD, $ for USD
- [x] Confetti effect on payment success page
- [x] Cart badge with item count in dashboard header

---

## Phase 5: File Uploads
- [x] Image uploads: `POST /api/upload/image` — 5MB limit, jpeg/jpg/png/gif/webp
- [x] Audio uploads: `POST /api/upload/audio` — 10MB limit, mp3/wav/ogg/m4a/aac
- [x] Components: `image-upload.tsx` (drag/drop + preview), `music-upload.tsx` (audio selector + playback)
- [x] Hooks: `useUploadImage()`, `useUploadAudio()`
- [x] Integrate into card editor and animated invite editor

---

## Phase 6: Animated Wedding Invites
- [x] Template data file with 17 animated templates
- [x] Editor page `/dashboard/animated-invite` with template selection, couple details, media uploads
- [x] Public page `/wedding/[slug]` with demo mode, RSVP, share, music controls, download button
- [x] API routes: create, [slug], current
- [x] Hooks: `useWeddingInvite(slug)`, `useCurrentInvite()`, `useCreateInvite()`
- [x] Individual animated template rendering (GSAP, Lenis for each of 17 templates)
- [x] Template-specific components: envelope opening, parallax scrolling, cinematic scroll

---

## Phase 7: RSVP System
- [x] RSVP submission (public, no auth): all fields with Zod validation
- [x] Email notifications: RSVP notification to couple on submission
- [x] RSVP modal component for wedding invite pages
- [x] Dashboard page `/dashboard/rsvps` with stats and guest table
- [x] Public stats endpoint: `GET /api/rsvp/[inviteSlug]`
- [x] Components: `rsvp-modal.tsx`, `rsvp-table.tsx`, `rsvp-stats.tsx`
- [x] API routes: submit, [inviteSlug], dashboard, delete/[rsvpId]
- [x] Hooks: `useSubmitRSVP()`, `useDashboardRSVPs()`, `useDeleteRSVP()`

---

## Phase 8: Gallery / Download System
- [x] Gallery API with payment checks
- [x] Dashboard page `/dashboard/gallery`
- [x] Download buttons on public profile and wedding pages
- [x] Hook: `useGallery()`

---

## Phase 9: Landing Page Redesign + Dark Mode
- [x] Landing page redesign with Framer Motion (hero, features, pricing, CTA)
- [x] Dark mode: ThemeProvider with class-based toggle, localStorage persistence
- [x] Theme toggle in dashboard header + landing page
- [x] Confetti effect on payment success

---

## Phase 10: Country / Currency Support + QR Code Sharing
- [x] Dual country support (India INR, Canada CAD)
- [x] Country selector in profile
- [x] Country-specific pricing
- [x] Currency-specific payment methods (Interac for Canada, Stripe for both)
- [x] QR code sharing (`qrcode.react`) with download + copy + share
- [x] QR code displayed on dashboard
- [x] NFC tap tracking via analytics events

---

## Future Enhancements

### Individual Animated Template Components
- [x] Install `gsap`, `lenis` for smooth scrolling and advanced animations
- [x] Port 17 individual animated template components from original Cardora:
  - Motion Video, Cinematic Film, Mountain Peak, Theater Luxury, Mediterranean Elegance, Raabta, Mountains, Beach, City, Laavan, Floral Elegance, Indian Heritage, Minimal Modern, Romantic Garden, Royal Palace, Cinematic Scroll, Golden Night
- [x] Template features: envelope opening, parallax scrolling, GSAP ScrollTrigger, Lenis smooth scroll
- [x] Event sections: Mehendi, Haldi, Sangeet, Nikah, Walima, Shaadi, Reception
- [x] Decorative elements: particle effects, ornamental borders

### Other
- [x] Guest confirmation email on RSVP (when attending = yes)
- [x] PDF export for business cards
- [x] NFC tag programming instructions page
