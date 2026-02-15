# Cardora Remake — Feature TODO

Features to port from the original Cardora app (`Cardora/`) into the remake (`cardora-remake-next/`).

---

## Phase 2: Card System

### 2a. Business Card Templates & Editor
- [ ] Create template data file `src/lib/templates/business-card-templates.ts` with 10+ templates:
  - Geometric Modern, Luxury Gold, Dark Elegant, Colorful Gradient, Corporate Blue, Artistic Splash, Tech Cyber, + 3 more
  - Each template: id, name, colors (primary/secondary/accent), layout, category
- [ ] Card types: `business`, `wedding`, `engagement`, `anniversary`
- [ ] Collections: `standard`, `signature`
- [ ] Card editor page `/dashboard/card` with:
  - Country selector (India/Canada)
  - Card type selector
  - Template grid with selection
  - Template selection modal (full preview)
  - Live card preview component
  - Card config form (wedding details: bride/groom names, parents, venue, date, deceased elders)
- [ ] Components: `country-selector.tsx`, `card-type-selector.tsx`, `business-card-preview.tsx`, `template-grid.tsx`, `template-selection-modal.tsx`, `card-config-form.tsx`
- [ ] API routes:
  - `GET/PUT /api/card/settings` — card settings CRUD
- [ ] Hooks: `useCardSettings()`, `useUpdateCardSettings()`
- [ ] DB queries: `getCardSettings(userId)`, `updateCardSettings(userId, data)`

### 2b. Wedding Card Templates (Static)
- [ ] Template data file `src/lib/templates/wedding-card-templates.ts` — 26+ standard templates
- [ ] Template data file `src/lib/templates/signature-templates.ts` — 9 engagement + 9 anniversary
- [ ] Wedding template preview component
- [ ] Support all wedding fields: bride/groom names, parent names (both sides), venue, date, deceased elders mention

### 2c. Public Profile Page
- [ ] Page: `src/app/(public)/u/[username]/page.tsx`
- [ ] Display: name, profession, company, all contact info, social links (LinkedIn, Twitter, Instagram, website, GitHub), profile image, card background
- [ ] Beautiful gradient UI with animations
- [ ] Contact info boxes with icons
- [ ] Social links as clickable cards
- [ ] Share button (native Web Share API, fallback to clipboard copy)
- [ ] "Pay Now" button if `paymentEnabled` is true
- [ ] Track `profile_view` analytics event (device type, userAgent, IP, referer)
- [ ] `profileEnabled` toggle — hide profile if disabled
- [ ] API route: `GET /api/card/[username]` — public card data + analytics tracking
- [ ] Hook: `usePublicCard(username)`

---

## Phase 3: Analytics

- [ ] Track event types: `profile_view`, `payment_view`, `payment_success`, `qr_scan`, `nfc_tap`, `cart_payment_view`, `cart_payment_success`
- [ ] Store per event: deviceType (mobile/desktop/tablet/unknown), userAgent, ipAddress, referer, timestamp
- [ ] Device type detection from userAgent
- [ ] Analytics dashboard page `/dashboard/analytics` with:
  - Profile views (lifetime + last 30 days)
  - Payment views + successes count
  - Total payment amount + count
  - Device breakdown (pie/bar chart)
  - Visitor details table with pagination (50 per page)
  - Browser detection from userAgent
  - IP masking for privacy
  - Referer detection
- [ ] Components: `stats-grid.tsx`, `device-breakdown.tsx`, `visitor-insights.tsx`
- [ ] API routes:
  - `POST /api/analytics/track` — record event
  - `GET /api/analytics/summary` — aggregated stats
  - `GET /api/analytics/visitors` — paginated visitor list
- [ ] Hooks: `useAnalyticsSummary()`, `useVisitors(page)`

---

## Phase 4: Payment System

- [ ] Install: `stripe`, `@stripe/stripe-js`
- [ ] Env vars: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- [ ] Payment methods: Stripe (global), Interac e-transfer (Canada only)
- [ ] Payment config per user: `paymentEnabled`, `paymentType` (fixed/custom), `fixedAmount`, `interacEmail`
- [ ] Pricing per country:
  - Canada: $4.99 CAD (card), $9.99 CAD (invite)
  - India: ₹299 INR (card), ₹599 INR (invite)
- [ ] Cart system:
  - `src/providers/cart-provider.tsx` — React context + localStorage (`cardora_cart` key)
  - Items: type, templateId, size, orientation, quantity, price
  - Functions: addToCart, removeFromCart, clearCart, getTotal, getCount
  - Merge duplicate items by combining quantities
- [ ] Pages:
  - `/dashboard/checkout` — cart items, order summary, payment method selector
  - `/dashboard/payments` — payment history table
  - `/pay/[username]` — public payment page (fixed or custom amount)
  - `/success` — payment success confirmation
  - `/cancel` — payment cancellation
- [ ] Components: `cart-item-list.tsx`, `order-summary.tsx`, `payment-method-selector.tsx`
- [ ] API routes:
  - `POST /api/payment/create-stripe-session` — single payment
  - `POST /api/payment/create-cart-session` — cart checkout
  - `POST /api/payment/verify` — verify Stripe payment
  - `POST /api/payment/webhook` — Stripe webhook handler
  - `GET /api/payment/history` — user's payment history
  - `POST /api/unlock/card` — unlock card after payment
  - `POST /api/unlock/invite` — unlock invite after payment
  - `POST /api/unlock/verify-payment` — verify + unlock with retry
- [ ] Hooks: `useCart()`, `usePaymentHistory()`, `useCreateStripeSession()`, `useVerifyPayment()`
- [ ] Send payment success email on completion
- [ ] Currency formatting: ₹ for INR, C$ for CAD, $ for USD

---

## Phase 5: File Uploads

- [ ] Image uploads:
  - `POST /api/upload/image` — 5MB limit, jpeg/jpg/png/gif/webp
  - Types: profile image, card background, couple photo, card images array
  - Storage: `public/uploads/` with `{userId}-{timestamp}-{random}.{ext}` naming
  - Auto-delete old file on replacement
  - `DELETE /api/upload/image/:imageUrl`
  - `GET /api/upload/images` — list user's uploaded images
- [ ] Audio uploads:
  - `POST /api/upload/audio` — 10MB limit, mp3/wav/ogg/m4a/aac
  - Used for wedding background music
  - `DELETE /api/upload/audio/:audioUrl`
- [ ] Components:
  - `src/components/shared/image-upload.tsx` — drag/drop + preview
  - `src/components/shared/music-upload.tsx` — audio file selector + playback preview
- [ ] Hooks: `useUploadImage()`, `useUploadAudio()`
- [ ] Integrate into card editor and animated invite editor

---

## Phase 6: Animated Wedding Invites

- [ ] Port 17+ animated templates from original:
  1. Motion Video — tap-to-open envelope with smooth animations
  2. Cinematic Film — auto-play cinematic experience
  3. Mountain Peak — majestic mountain backdrop
  4. Theater Luxury — theater-inspired with animated curtains
  5. Mediterranean Elegance — watercolor-inspired elegant design
  6. Raabta — traditional invitation with Arabic text & multiple events
  7. Mountains — dark teal background, golden stars, multiple events
  8. Beach — beach-themed template
  9. City — urban cityscape template
  10. Laavan — traditional wedding template
  11. Floral Elegance — floral design
  12. Indian Heritage — Indian traditional design
  13. Minimal Modern — minimalist modern design
  14. Romantic Garden — garden-themed romantic design
  15. Royal Palace — royal palace design
  16. Cinematic Scroll — cinematic scrolling experience
  17. + more variants
- [ ] Template features: envelope opening, parallax scrolling, background music, multiple event sections
- [ ] Event sections: Mehendi, Haldi, Sangeet, Nikah, Walima, Shaadi, Reception
- [ ] Install: `gsap`, `lenis` (smooth scrolling)
- [ ] Animations: GSAP ScrollTrigger, Lenis smooth scroll (1.2s duration), fade-up on scroll, parallax
- [ ] Editor page `/dashboard/animated-invite`:
  - Template selection
  - Couple names, dates, venue, story
  - Photo/music upload integration
  - Live preview
- [ ] Public page `/wedding/[slug]`:
  - Render animated template
  - Demo mode if unpaid (shows demo data + "Complete payment" banner)
  - RSVP button opens modal
  - Background music controls
  - Share + download buttons
- [ ] Components: `animated-invite-editor.tsx`, `base-animated-template.tsx`, individual template components, `decorative-elements.tsx`, `particle-layer.tsx`
- [ ] API routes:
  - `POST /api/wedding/create` — create/update invite
  - `GET /api/wedding/[slug]` — public invite (demo data if unpaid)
  - `GET /api/wedding/current` — current user's invite
- [ ] Hooks: `useWeddingInvite(slug)`, `useCurrentInvite()`, `useCreateInvite()`

---

## Phase 7: RSVP System

- [ ] RSVP submission (public, no auth required):
  - Fields: inviteSlug, guestName, guestEmail, phone, attending (yes/no/maybe), numberOfGuests (1-10), dietaryRestrictions, message
  - Validation via Zod
- [ ] Email notifications:
  - Send RSVP notification to couple (guest details, attending status, dietary info)
  - Send confirmation email to guest if attending (wedding details, venue, date)
- [ ] RSVP modal component for wedding invite pages
- [ ] Dashboard page `/dashboard/rsvps`:
  - View all RSVPs grouped by invite slug
  - Stats: total RSVPs, attending count, declined count, total guest count
  - Table with guest details (name, email, attending, guests, dietary, message, phone)
  - Delete individual RSVPs
- [ ] Public stats endpoint: GET `/api/rsvp/[inviteSlug]` — limited data (name, attending, guest count)
- [ ] Components: `rsvp-modal.tsx`, `rsvp-table.tsx`, `rsvp-stats.tsx`
- [ ] API routes:
  - `POST /api/rsvp/submit` — public submission
  - `GET /api/rsvp/[inviteSlug]` — public limited stats
  - `GET /api/rsvp/dashboard` — all RSVPs for authenticated user
  - `DELETE /api/rsvp/[rsvpId]/delete` — delete single RSVP
- [ ] Hooks: `useSubmitRSVP()`, `useDashboardRSVPs()`, `useDeleteRSVP()`

---

## Phase 8: Gallery / Download System

- [ ] Gallery stores snapshots of downloaded cards and invites
- [ ] Each item: type (`business_card` / `wedding_invite`), templateId, slug, data snapshot (jsonb), downloadedAt
- [ ] Download requires payment:
  - `POST /api/download/card` — requires `cardPaid`
  - `POST /api/download/invite` — requires `invitePaid`
- [ ] `GET /api/download/gallery` — user's gallery items
- [ ] Dashboard page `/dashboard/gallery`:
  - Browse saved designs
  - View card/invite previews
  - Share saved items
  - Download count / date info
- [ ] Download button on public card and invite pages
- [ ] Hook: `useGallery()`

---

## Phase 9: Landing Page Redesign + Dark Mode

- [ ] Landing page redesign with Framer Motion:
  - Hero section with animated gradient text
  - Feature highlights (business cards, wedding invites, analytics, payments)
  - Template showcase / preview section
  - Country support display (India + Canada flags/pricing)
  - Pricing section
  - CTA buttons with hover animations
  - Animated blobs / gradient backgrounds
- [ ] Dark mode:
  - `src/providers/theme-provider.tsx` — wraps app with `next-themes`
  - Class-based toggle (`.dark` class on `<html>`)
  - Persisted in localStorage
  - Toggle button in dashboard header + landing page
  - Already have dark theme CSS vars in `globals.css`
- [ ] Confetti effect on payment success (install `canvas-confetti`)

---

## Phase 10: Country / Currency Support + QR Code Sharing

- [ ] Dual country support:
  - India: INR (₹), phone code +91, date format DD/MM/YYYY
  - Canada: CAD (C$), phone code +1, date format MM/DD/YYYY
- [ ] Country selector in profile (already exists in profile form)
- [ ] Different pricing per country (already defined in constants)
- [ ] Currency-specific payment methods:
  - Interac e-transfer for Canada
  - Stripe for both countries
- [ ] QR code sharing:
  - Install `qrcode.react`
  - Generate QR for `/u/[username]` profile URL
  - Display QR in dashboard and on card preview
  - Track `qr_scan` analytics event
- [ ] Share button:
  - Web Share API (native) on supported browsers
  - Fallback: copy link to clipboard
- [ ] NFC tap tracking:
  - Track `nfc_tap` analytics event on profile view with NFC referer

---

## Original Cardora Reference

### API Endpoints (original)

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/auth/signup` | Register (name, email, password, username) |
| POST | `/api/auth/login` | Login → JWT token |
| GET | `/api/auth/me` | Current user profile |
| POST | `/api/auth/forgot-password` | Request password reset email |
| POST | `/api/auth/reset-password` | Reset password with token |
| GET | `/api/auth/verify-reset-token` | Verify reset token |
| GET | `/api/user/profile` | Get user profile |
| PUT | `/api/user/profile` | Update user profile |
| GET | `/api/card/:username` | Public card + analytics |
| POST | `/api/payment/create-stripe-session` | Create Stripe checkout |
| POST | `/api/payment/create-cart-session` | Cart Stripe checkout |
| POST | `/api/payment/verify` | Verify payment |
| POST | `/api/payment/webhook` | Stripe webhook |
| GET | `/api/payment/history` | Payment history |
| GET | `/api/wedding/:slug` | Public wedding invite |
| POST | `/api/wedding/create` | Create/update invite |
| GET | `/api/wedding/user/current` | Current user's invite |
| POST | `/api/rsvp/submit` | Submit RSVP (public) |
| GET | `/api/rsvp/:inviteSlug` | Public RSVP stats |
| GET | `/api/rsvp/dashboard/all` | All RSVPs (private) |
| DELETE | `/api/rsvp/:rsvpId` | Delete RSVP |
| POST | `/api/upload/image` | Upload image (5MB) |
| DELETE | `/api/upload/image/:url` | Delete image |
| GET | `/api/upload/images` | List images |
| POST | `/api/upload/audio` | Upload audio (10MB) |
| DELETE | `/api/upload/audio/:url` | Delete audio |
| POST | `/api/download/card` | Add card to gallery |
| POST | `/api/download/invite` | Add invite to gallery |
| GET | `/api/download/gallery` | Get gallery items |
| POST | `/api/analytics/track` | Track event |
| GET | `/api/analytics/summary` | Analytics summary |
| GET | `/api/analytics/visitors` | Visitor list (paginated) |
| POST | `/api/unlock/card` | Unlock card |
| POST | `/api/unlock/invite` | Unlock invite |
| POST | `/api/unlock/verify-payment` | Verify + unlock |

### Original Data Model (MongoDB)

```
User {
  name, email (unique), password (hashed), username (unique)
  isPremium, profileEnabled, paymentEnabled
  profession, company, phone, whatsapp, address
  socialLinks: { linkedin, twitter, instagram, website, github }
  paymentType, fixedAmount, interacEmail, stripePaymentLink
  theme, cardType, collection, country, currency
  profileImage, cardBackgroundImage, cardImages[]
  weddingDate, venue, brideName, groomName
  brideFatherName, brideMotherName, groomFatherName, groomMotherName
  deceasedElders, animatedInviteSlug, animatedTemplateId
  weddingStory, couplePhoto, weddingMusic, weddingTime
  cardPaid, invitePaid
  gallery[{ type, templateId, slug, downloadedAt, data }]
  resetToken, resetTokenExpiry
}

Payment { userId, amount, currency, paymentMethod, stripeSessionId, stripePaymentIntentId, status, purpose, payerEmail, payerName, itemData }

RSVP { inviteSlug, userId, guestName, guestEmail, attending, numberOfGuests, dietaryRestrictions, message, phone, status }

Analytics { userId, type, deviceType, userAgent, ipAddress, referer }
```
