# Cardora - Complete Feature Specification

This document describes every feature, page, user flow, API endpoint, and data model from the original Cardora application. Use it as the definitive reference when building the remake.

---

## Table of Contents

1. [Product Overview](#product-overview)
2. [User Flows](#user-flows)
3. [Pages & UI](#pages--ui)
4. [API Endpoints](#api-endpoints)
5. [Data Models](#data-models)
6. [Template System](#template-system)
7. [Payment System](#payment-system)
8. [File Upload System](#file-upload-system)
9. [Analytics System](#analytics-system)
10. [Email System](#email-system)
11. [Pricing Model](#pricing-model)
12. [Multi-Country Support](#multi-country-support)

---

## Product Overview

**Cardora** — "One Tap. Endless Connections."

A platform for creating and sharing digital business cards, wedding invitations, engagement cards, and anniversary cards. Users create cards, share them via NFC/QR/link, accept payments, and track analytics. Wedding invitations support animated templates with RSVP management.

### Product Types
1. **Business Cards** — Digital professional cards with contact info, social links, and payment acceptance
2. **Wedding Cards** — Static template-based wedding invitations (26 templates)
3. **Animated Wedding Invites** — Cinematic auto-playing invitations with music, GSAP/Framer Motion animations, RSVP (10+ templates)
4. **Engagement Cards** — Signature collection templates (9 templates)
5. **Anniversary Cards** — Signature collection templates (9 templates)

---

## User Flows

### Registration Flow
1. User visits landing page → clicks "Get Started"
2. Signup form: name, username (lowercase, alphanumeric + underscore), email, password, confirm password
3. Password validation: min 6 characters, must match confirmation
4. On success: JWT token stored in localStorage → redirect to `/dashboard`
5. On network error: shows context-specific message (Render cold start vs local server vs generic)

### Login Flow
1. Email + password form
2. On success: JWT stored → redirect to `/dashboard`
3. "Forgot password?" link → `/forgot-password`

### Password Reset Flow
1. User enters email at `/forgot-password`
2. Backend generates 32-byte crypto token, stores hashed version, expires in 1 hour
3. Email sent with reset link (if SMTP configured)
4. Fallback: if email fails, reset link shown directly in UI with copy button
5. User clicks link → `/reset-password?token=xxx`
6. Token verified via API, new password form shown
7. On success: redirect to `/login` after 2 seconds

### Card Creation Flow
1. User goes to `/dashboard/card`
2. Selects country (India/Canada) → sets currency
3. Selects card type (Business / Wedding / Animated Invite / Engagement / Anniversary)
4. **Business**: selects template from 10 options, configures size/orientation/quantity/print type → sees live preview
5. **Wedding**: browses 26 templates by category, fills wedding details (names, date, venue, parents, deceased elders) → sees live preview
6. **Engagement/Anniversary**: browses signature collection templates → fills event details
7. Configures settings: profile enabled, payment enabled, payment type (fixed/custom), Interac email
8. Saves settings → data persisted to user profile
9. "Create Now" button → opens template selection modal → "Add to Cart"

### Animated Invite Flow
1. User goes to `/dashboard/animated-invite`
2. Selects country → selects animated template from 10+ options
3. Fills wedding details (groom/bride names, date, venue, time, story)
4. Uploads couple photo, background image, background music
5. Sets quantity (50-200+ shares)
6. "Create/Preview" → generates unique slug → opens invite in new tab
7. Can add to cart for payment
8. After payment: invite unlocked with real data (pre-payment shows demo data)

### Checkout Flow
1. Items in cart (stored in localStorage, backup in sessionStorage)
2. `/dashboard/checkout` shows order summary
3. User selects payment method: Stripe (all countries) or Interac (Canada only)
4. "Pay" → creates Stripe checkout session → redirects to Stripe
5. On success → `/success` page → payment verified → features unlocked → cart cleared
6. On cancel → `/cancel` page

### Payment Verification Flow (Success Page)
1. Extracts `session_id` from URL
2. Calls `/payment/verify` with session ID
3. Retry logic: up to 3 attempts with 3-second delays
4. On verified: calls `/unlock/verify-payment` to unlock features
5. Unlock endpoint has its own retry with exponential backoff (2s, 4s, 6s, 8s)
6. If Stripe confirms paid but no DB record: creates payment record from Stripe data
7. Auto-creates animated invites if payment includes invite data
8. Sends payment success email asynchronously
9. Shows confetti animation

### Public Card Viewing Flow
1. Visitor goes to `/u/[username]`
2. Backend tracks: profile_view event with device type, user agent, IP, referer
3. Shows profile with name, profession, company, contact info, social links
4. "Pay Now" button (if payment enabled) → `/pay/[username]`
5. "Share Card" button → native share API or clipboard copy

### Payment Acceptance Flow
1. Visitor goes to `/pay/[username]`
2. Enters amount (or sees fixed amount), selects purpose
3. Purpose options: General, Tip, Consultation, Donation, Wedding Gift, Advance
4. Stripe payment → creates checkout session → redirects
5. If Canadian user: shows Interac e-Transfer email as alternative

### Wedding Invite Viewing Flow
1. Guest goes to `/wedding/[slug]`
2. If paid: shows real data; if unpaid: shows demo data with banner
3. Template renders with animations (GSAP scroll triggers, Lenis smooth scroll)
4. Envelope opening animation → background music plays
5. RSVP button → opens modal
6. Guest fills: name, email (optional), phone (optional), attending (yes/no), number of guests, dietary restrictions, message
7. RSVP submitted → email sent to couple with guest details
8. If guest attending + provided email → confirmation email sent to guest

### Gallery Flow
1. After payment, user can download cards/invites to gallery
2. `/dashboard/gallery` shows all downloaded items
3. Each item has type (card/invite), template, date, and view link
4. Gallery data stored as snapshots in user profile

### RSVP Management Flow
1. `/dashboard/rsvps` shows all RSVPs across invites
2. Stats: total RSVPs, attending, declined, total guests
3. Filter by invite slug
4. View: guest name, email, phone, status, guest count, dietary restrictions, message, date
5. Delete RSVP (with ownership validation)

---

## Pages & UI

### Landing Page (`/`)
- **Nav**: Cardora logo (gradient), dark mode toggle, Login, Get Started buttons
- **Hero**: Animated heading, tagline "One Tap. Endless Connections.", CTA buttons
- **Why Choose Us**: 4 cards (Expand Digitally, Update Instantly, Track Connections, Eco-Friendly)
- **What We Offer**: 3 product cards (Sales/Real Estate Card, Digital Wedding Cards with "30 Premium Templates" badge, Physical NFC Smart Card)
- **Signature Collection**: Premium section with Luxury Wedding, Royal Engagement, Designer Anniversary
- **Dual Platform**: India (UPI/Razorpay, WhatsApp sharing) and Canada (Interac/Stripe, CAD)
- **Payment Methods**: Interac/E-Transfer and Stripe integration info
- **Final CTA**: "Ready to Go Digital?" with gradient buttons
- **Footer**: Copyright with tagline
- **Styling**: Glassmorphism (`.glass` class), gradient backgrounds, Framer Motion entry animations, dark mode

### Login Page (`/login`)
- Glassmorphism card centered on gradient background
- Fields: email, password
- "Forgot password?" link
- Submit button with loading state
- Link to signup
- Render cold start error handling

### Signup Page (`/signup`)
- Fields: full name, username (pattern validation), email, password, confirm password
- Username: lowercase letters, numbers, underscores only
- Password: min 6 chars
- Context-specific error messages for network issues

### Forgot Password (`/forgot-password`)
- Email input → send reset link
- After send: shows success state
- If SMTP not configured: shows direct reset link with copy button
- "Link expires in 1 hour" notice

### Reset Password (`/reset-password?token=xxx`)
- Token verification on mount (loading → valid/invalid state)
- Invalid token: shows error + link to request new reset
- Valid: new password + confirm password form
- Success: checkmark animation → auto-redirect to login

### Dashboard (`/dashboard`)
- Protected route (redirects to login if no token)
- Wrapped in `DashboardLayout` component
- **Welcome section**: "Welcome back, {name}!"
- **Stats grid**: Profile Views, Total Payments, Total Amount (from `/analytics/summary`)
- **Digital Card preview**: live URL link, "View Card" and "Edit Card" buttons
- **Create Your Card section**: 5 card type buttons (Business, Wedding, Animated Invites (tagged "New"), Engagement, Anniversary) — active type highlighted
- **Quick Actions grid**: Edit Profile, Payment Settings, View Analytics

### Dashboard Layout (`DashboardLayout` component)
- Sidebar navigation with links: Dashboard, Card, Animated Invite, Profile, Payments, Analytics, Gallery, RSVPs
- Mobile: hamburger menu
- User menu with logout
- Dark mode toggle

### Card Editor (`/dashboard/card`)
- **Country Selector**: India/Canada with flag, currency, active badge
- **Card Type Selector**: Business/Wedding/Animated Invites/Engagement/Anniversary buttons
- **Business Card Section** (when business selected):
  - Left: Live `BusinessCardPreview` component with template
  - Right: Customization panel — price display, digital/standard print type, size (standard 3.5"x2" / large 4"x2.5"), orientation (horizontal/vertical), quantity selector (min 50, step 50), price summary, "Create Now" button, cart button
- **Wedding Template Section** (when wedding selected):
  - Category filter tabs
  - Template grid (scrollable, max-height) with color swatches, selection indicator
- **Signature Collection Section** (engagement/anniversary):
  - Premium badge, template grid with gradient backgrounds
- **Live Preview Section** (wedding/engagement/anniversary):
  - Browser chrome (traffic light dots), `WeddingTemplate` component with live data
  - Tip message about filling in details
- **Event Card Customization** (non-business):
  - Same as business: price, quantity, create button, cart
- **Configure Card Form**:
  - Profile enabled toggle, payment enabled toggle
  - Payment type (custom/fixed), fixed amount input, Interac email
  - **Wedding Details** (locked behind payment):
    - If unpaid: lock icon + "Complete Payment to Unlock" CTA
    - If paid: groom name, bride name, wedding date (text), venue
    - Parents section (not for anniversary): deceased elders, bride's parents (father/mother), groom's parents
  - Save Settings button
- **Template Selection Modal** (triggered by "Create Now"):
  - Category filter, template grid, selected indicator
  - Footer: selected template name, Cancel, "Add to Cart" button

### Animated Invite Creator (`/dashboard/animated-invite`)
- Country selector
- Template grid with categories (similar to card editor)
- Wedding details form: groom/bride names, date, venue, time, story
- Image uploads: couple photo, background image
- Music upload
- Quantity/pricing
- Create/Preview button → generates slug, opens new tab
- Add to cart
- Payment lock for unpaid users

### Checkout (`/dashboard/checkout`)
- Cart items list with details (type, name, quantity, pricing breakdown)
- Remove item button per item
- Payment method: Stripe (always available), Interac (Canada only)
- Order total: subtotal, service fee, total
- Pay button → Stripe redirect
- Cart backup to sessionStorage before redirect

### Profile Editor (`/dashboard/profile`)
- Two-column form:
  - Full Name (required), Email (disabled/read-only)
  - Profession, Company
  - Phone, WhatsApp
  - Address (textarea)
- Social Links section:
  - LinkedIn, Twitter, Instagram, Website, GitHub (URL inputs)
- Save Profile button

### Payment History (`/dashboard/payments`)
- Table: Date, Amount, Purpose, Method, Status
- Status color coding: green (completed), yellow (pending), red (failed)
- Empty state message

### Analytics Dashboard (`/dashboard/analytics`)
- **Stats grid**: Profile Views, Payment Views, Successful Payments, Revenue
- **Device breakdown**: bar chart showing desktop/mobile/tablet distribution
- **Recent activity**: 30-day profile views and payment counts
- **Visitor insights table**: device type icon, browser, masked IP, referer domain, visit time (relative)

### Gallery (`/dashboard/gallery`)
- Grid of downloaded cards/invites
- Each item: type icon (card/invite), download date, title, metadata, view button
- Empty state with CTAs

### RSVPs (`/dashboard/rsvps`)
- **Stats cards**: Total RSVPs, Attending, Declined, Total Guests
- Filter dropdown by invite slug
- **RSVP table**: Guest Name, Email, Phone, Status (attending/declined), Guests, Dietary, Message, Date, Delete button
- Empty state with create invite CTA

### Public Card (`/u/[username]`)
- Gradient background with animated blob effects
- Profile avatar (letter initial with gradient border)
- Name, profession, company
- Contact info: email (clickable mailto), phone (clickable tel), WhatsApp (clickable), address
- Social links grid: LinkedIn, Twitter, Instagram, Website, GitHub
- Action buttons: "Pay Now" (if payments enabled), "Share Card" (native share or clipboard)
- 404 if profile disabled

### Payment Page (`/pay/[username]`)
- Recipient info display
- Amount input (disabled if fixed payment)
- Purpose dropdown: General, Tip, Consultation, Donation, Wedding Gift, Advance
- Stripe Pay button with progress bar animation
- Interac e-Transfer info (Canada) with email display
- Link to view profile
- React Confetti on success

### Wedding Invite (`/wedding/[slug]`)
- Full-screen animated template rendering
- Background music with audio element
- RSVP button → RSVPModal component
- Demo mode banner (if unpaid)
- Template-specific animations (GSAP, Framer Motion, Lenis smooth scroll)
- Download to gallery button
- Cardora branding at bottom

### Success Page (`/success`)
- Payment verification with retry logic
- Confetti animation
- Payment details: amount, currency, purpose
- Badge unlock animation
- "Go to Dashboard" link

### Cancel Page (`/cancel`)
- Animated X icon
- "Payment Cancelled" message
- "No charges were made"
- Return home button

---

## API Endpoints

### Authentication (`/api/auth`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/signup` | No | Register (name, email, password, username) → JWT |
| POST | `/login` | No | Login (email, password) → JWT |
| GET | `/me` | Yes | Get current user |
| POST | `/forgot-password` | No | Generate reset token → send email (or return link) |
| POST | `/reset-password` | No | Reset password with token |
| GET | `/verify-reset-token` | No | Check if reset token is valid |
| POST | `/test-email` | No | Test SMTP configuration |

### User (`/api/user`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/profile` | Yes | Get full user profile |
| PUT | `/profile` | Yes | Update profile (selective field updates) |

**Updatable fields**: name, profession, company, phone, whatsapp, address, socialLinks (object), profileEnabled, paymentEnabled, paymentType, fixedAmount, interacEmail, theme, weddingDate, venue, brideName, groomName, brideFatherName, brideMotherName, groomFatherName, groomMotherName, deceasedElders, cardType, collection, country, currency, profileImage, cardBackgroundImage

### Card (`/api/card`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/:username` | No | Get public card profile + track view |

Tracks: profile_view analytics (device type, user agent, IP, referer)

### Payment (`/api/payment`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/create-stripe-session` | No | Create payment session for public payments |
| POST | `/create-cart-session` | Yes | Create Stripe session for cart checkout |
| POST | `/verify` | No | Verify payment by session ID |
| GET | `/history` | Yes | Get payment history (max 50, newest first) |

**Webhook**: `POST /api/payment/webhook` (raw body, before JSON parser) — handles `checkout.session.completed`

### Wedding (`/api/wedding`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/:slug` | No | Get wedding invite (real data if paid, demo if not) |
| POST | `/create` | Yes | Create/update animated invite (auto-generates slug) |
| GET | `/user/current` | Yes | Get current user's invite data |

### RSVP (`/api/rsvp`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/submit` | No | Submit RSVP (sends email to couple + guest) |
| GET | `/:inviteSlug` | No | Get RSVPs for invite (limited public view) |
| GET | `/dashboard/all` | Yes | Get all RSVPs for user's invites with stats |
| DELETE | `/:rsvpId` | Yes | Delete RSVP (ownership validated) |

### Analytics (`/api/analytics`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/track` | No | Record analytics event |
| GET | `/summary` | Yes | Get aggregated stats |
| GET | `/visitors` | Yes | Get visitor list with pagination |

**Event types**: profile_view, payment_view, payment_success, qr_scan, nfc_tap, cart_payment_view, cart_payment_success

### Upload (`/api/upload`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/image` | Yes | Upload image (5MB max: jpeg/jpg/png/gif/webp) |
| DELETE | `/image/:imageUrl` | Yes | Delete image (ownership check) |
| GET | `/images` | Yes | Get user's uploaded images |
| POST | `/audio` | Yes | Upload audio (10MB max: mp3/wav/ogg/m4a/aac) |
| DELETE | `/audio/:audioUrl` | Yes | Delete audio (ownership check) |

**Image types**: profile, background, couplePhoto, card (adds to array)
**File naming**: `{userId}-{timestamp}-{random}.{ext}`

### Download (`/api/download`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/card` | Yes | Download card to gallery (requires cardPaid) |
| POST | `/invite` | Yes | Download invite to gallery (requires invitePaid) |
| GET | `/gallery` | Yes | Get user's gallery |

### Unlock (`/api/unlock`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/card` | Yes | Unlock card (checks completed payment) |
| POST | `/invite` | Yes | Unlock invite (checks animated invite payment) |
| POST | `/verify-payment` | Yes | Full verification with retry + Stripe fallback |

---

## Data Models

### User

```
name            String, required, trimmed
email           String, required, unique, lowercase
password        String, required, min 6 (bcrypt hashed, 10 rounds)
username        String, required, unique, lowercase, pattern: /^[a-z0-9_]+$/
isPremium       Boolean, default: false

profession      String
company         String
phone           String
whatsapp        String
address         String
socialLinks     { linkedin, twitter, instagram, website, github } (all String)

profileEnabled  Boolean, default: true
paymentEnabled  Boolean, default: false
paymentType     enum: ['fixed', 'custom'], default: 'custom'
fixedAmount     Number
stripePaymentLink String
interacEmail    String
theme           String, default: 'default'

weddingDate     String
venue           String
brideName       String
groomName       String
brideFatherName String
brideMotherName String
groomFatherName String
groomMotherName String
deceasedElders  String

cardType        enum: ['business', 'wedding', 'engagement', 'anniversary'], default: 'business'
collection      enum: ['standard', 'signature'], default: 'standard'

country         enum: ['IN', 'CA'], default: 'IN'
currency        String, default: 'INR'

profileImage         String (URL)
cardBackgroundImage  String (URL)
cardImages           [String] (array of URLs)

resetToken      String
resetTokenExpiry Date

animatedInviteSlug   String (unique, e.g., "groom-bride")
animatedTemplateId   String
weddingStory         String
couplePhoto          String (URL)
weddingMusic         String (URL)
weddingTime          String

cardPaid        Boolean, default: false
invitePaid      Boolean, default: false

gallery         [{
  type          enum: ['card', 'invite']
  templateId    String
  slug          String
  downloadedAt  Date
  data          Mixed (snapshot)
}]

timestamps      (createdAt, updatedAt)
```

### Payment

```
userId               ObjectId → User, required
amount               Number, required
currency             String, default: 'USD'
paymentMethod        enum: ['stripe', 'interac', 'other'], default: 'stripe'
stripeSessionId      String
stripePaymentIntentId String
status               enum: ['pending', 'completed', 'failed', 'cancelled'], default: 'pending'
purpose              String
payerEmail           String
payerName            String
itemData             Mixed (snapshot of purchased item)
timestamps           (createdAt, updatedAt)
```

### RSVP

```
inviteSlug           String, required, indexed
userId               ObjectId → User, indexed
guestName            String, required
guestEmail           String
phone                String
attending            Boolean, default: true
numberOfGuests       Number, default: 1
dietaryRestrictions  String
message              String
status               enum: ['pending', 'confirmed', 'declined'], default: 'pending'
timestamps           (createdAt, updatedAt)
Compound index:      { inviteSlug: 1, createdAt: -1 }
```

### Analytics

```
userId               ObjectId → User, required, indexed
type                 enum: ['profile_view', 'payment_view', 'payment_success',
                            'qr_scan', 'nfc_tap', 'cart_payment_view', 'cart_payment_success']
                     required
deviceType           enum: ['mobile', 'desktop', 'tablet', 'unknown'], default: 'unknown'
userAgent            String
ipAddress            String
referer              String
timestamps           (createdAt, updatedAt)
Compound index:      { userId: 1, type: 1, createdAt: -1 }
```

---

## Template System

### Business Card Templates (10)
Each has: id, name, description, category, preview emoji, colors (primary, secondary, accent, text), layout style

| ID | Name | Category |
|----|------|----------|
| geometric-modern | Geometric Modern | Modern |
| luxury-gold | Luxury Gold | Luxury |
| dark-elegant | Dark Elegant | Premium |
| colorful-gradient | Colorful Gradient | Creative |
| corporate-blue | Corporate Blue | Professional |
| artistic-splash | Artistic Splash | Creative |
| tech-cyber | Tech Cyber | Tech |
| nature-organic | Nature Organic | Nature |
| royal-purple | Royal Purple | Luxury |
| premium-black | Premium Black | Premium |

### Wedding Card Templates (26, Standard Collection)
Categories: Luxury, Heritage, Romantic, Elegant, Traditional, Premium, Vintage, Modern

Each has: id, name, description, category, preview emoji, colors (primary, secondary, accent, overlay), backgroundImage path, overlay opacity

Notable templates: Traditional Indian, Sikh Anand Karaj, Golden Heritage, Rose Garden, Royal Palace, Mandap, Bougainvillea, Temple (Golden Temple background)

### Signature Collection Templates

**Engagement (9)**: Rose Gold Romance, Emerald Elegance, Sapphire Serenity, Pearl Perfection, Amethyst Allure, Ruby Radiance, Topaz Treasures, Diamond Dynasty, Opal Opulence

**Anniversary (9)**: Golden Jubilee, Silver Celebration, Ruby Romance, Platinum Perfection, Diamond Dynasty, Emerald Eternity, Pearl Anniversary, Crystal Clear, Bronze Beauty

**Wedding Signature (5)**: Royal Maharaja, Pearl Palace, Diamond Dreams, Golden Heritage, Velvet Royalty

### Animated Templates (10+)
Each has: id, name, category, description, component reference, envelope config, music support, parallax settings

| Template | Theme |
|----------|-------|
| MotionVideoTemplate | Video background, wax seal tap-to-open |
| CinematicFilmTemplate | Ken Burns effect, particles |
| TheaterLuxuryTemplate | Red velvet curtain, scratch-to-reveal |
| MediterraneanEleganceTemplate | Mediterranean style |
| RaabtaTemplate | Islamic/Urdu themed |
| MountainsTemplate | Mountain landscape |
| BeachTemplate | Tropical beach |
| CityTemplate | Urban wedding |
| LaavanTemplate | Sikh traditional |
| CinematicScrollTemplate | GSAP ScrollTrigger based |
| LuxuryHillsTemplate | Hillside luxury, envelope open |

### Template Components

**WeddingTemplate** (52.5KB) — renders static wedding cards with:
- 30+ template variations
- Dynamic background images
- Color-coded overlays
- Couple names display
- Parent names (Traditional Indian style)
- Deceased elders acknowledgment
- Event type detection (wedding/engagement/anniversary)
- Responsive design

**BusinessCardPreview** (15.4KB) — renders business card with:
- Template-based styling
- Live data preview
- Orientation support (horizontal/vertical)
- Color customization

**BaseAnimatedTemplate** (10.5KB) — base for animated invites:
- Scrollable section system
- Section types: hero, story, ceremony, RSVP, etc.

**Cinematic Components:**
- `AutoScrollController` — timeline scene manager with pause/resume, cubic bezier easing
- `DecorativeElements` — borders, floral frames, golden patterns, ornamental dividers, sparkles, elegant frames
- `ParticleLayer` — canvas particle system (PETAL, LIGHT, DUST types), auto-disables on low-end devices (≤2 CPU cores or ≤2GB RAM)

---

## Payment System

### Stripe Integration
- Checkout sessions created server-side
- Webhook at `/api/payment/webhook` (raw body, mounted before JSON parser)
- Event handled: `checkout.session.completed`
- Session metadata: userId, username, purpose
- Currency support: USD, CAD, INR

### Payment Types
1. **Direct payment** (`/pay/[username]`) — visitor pays card owner
   - Custom amount or fixed amount
   - Purpose selection
2. **Cart payment** (`/dashboard/checkout`) — user buys cards/invites
   - Multiple items per session
   - Quantity-based pricing

### Interac e-Transfer (Canada only)
- Not processed through app
- Shows recipient's Interac email for manual transfer
- Displayed on payment page for Canadian users

### Payment Verification
- `/payment/verify` — checks Stripe session status
- Retry logic: 3 attempts, 3-second intervals
- `/unlock/verify-payment` — unlocks features after verification
  - Retry with exponential backoff: 2s, 4s, 6s, 8s
  - Stripe API fallback if DB record missing
  - Auto-creates invites from payment item data

### Feature Gating
- `cardPaid: false` → wedding/engagement/anniversary details form locked
- `invitePaid: false` → animated invite shows demo data instead of real data
- Gallery downloads require respective paid status

---

## File Upload System

### Image Upload
- Max size: 5MB
- Formats: JPEG, JPG, PNG, GIF, WebP
- Storage: `public/uploads/` directory
- Filename: `{userId}-{timestamp}-{randomHex}.{ext}`
- Types:
  - `profile` → replaces `profileImage`
  - `background` → replaces `cardBackgroundImage`
  - `couplePhoto` → replaces `couplePhoto`
  - `card` → appends to `cardImages` array
- Old file deleted on replacement

### Audio Upload
- Max size: 10MB
- Formats: MP3, WAV, OGG, M4A, AAC
- Storage: `public/uploads/`
- Type: `wedding` → replaces `weddingMusic`

### Ownership Validation
- Filename must start with user's ID
- Prevents users from deleting other users' files

---

## Analytics System

### Tracked Events
| Event | Trigger |
|-------|---------|
| profile_view | Visitor views `/u/[username]` |
| payment_view | Visitor views `/pay/[username]` |
| payment_success | Direct payment completed |
| qr_scan | QR code scanned |
| nfc_tap | NFC card tapped |
| cart_payment_view | User views cart checkout |
| cart_payment_success | Cart payment completed |

### Data Captured Per Event
- userId (card owner)
- deviceType: mobile/desktop/tablet/unknown (detected from user agent)
- userAgent string
- ipAddress
- referer URL

### Analytics Dashboard Data
- Total profile views
- Total payment page views
- Successful payments count
- Total revenue (sum of completed payments)
- 30-day profile views and payments
- Device distribution (desktop/mobile/tablet)
- Visitor insights: browser name (extracted from UA), masked IP (`***.***.***.xxx`), referer domain, visit time

---

## Email System

### Email Types
1. **Password Reset** — HTML formatted email with reset link, 1-hour expiry
2. **Payment Success** — Receipt with amount, currency, purpose, item list, optional invite URL
3. **RSVP Notification** (to couple) — Guest details: name, email, phone, attending status, guest count, dietary, message
4. **RSVP Confirmation** (to guest, if email provided and attending) — Confirmation with wedding details

### Configuration
- SMTP via Nodemailer
- Environment: SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS
- Default: smtp.gmail.com:587
- Development fallback: logs to console if SMTP not configured
- `test-email-config.js` utility for testing SMTP connection

---

## Pricing Model

### Quantity-Based Pricing
- **India**: ₹5 per share (unit)
- **Canada**: $0.20 CAD per share (unit)
- Minimum quantity: 50
- Step: 50 units
- No base price or service fee

### Animated Invites Pricing
- **India**: ₹20 per share
- **Canada**: $0.50 CAD per share

### Examples
- 100 business cards (India): 100 × ₹5 = ₹500
- 200 wedding cards (Canada): 200 × $0.20 = $40 CAD
- 100 animated invites (India): 100 × ₹20 = ₹2,000

---

## Multi-Country Support

### India (IN)
- Currency: INR (₹)
- Payment methods: UPI, Razorpay (mentioned but not implemented), Stripe
- Popular events: weddings, engagements
- Phone code: +91
- Date format: DD/MM/YYYY

### Canada (CA)
- Currency: CAD ($)
- Payment methods: Interac e-Transfer, Stripe
- Popular events: weddings, anniversaries
- Phone code: +1
- Date format: MM/DD/YYYY

### Country Detection
- Auto-detected from browser timezone and language
- Can be manually overridden in card editor
- Affects: currency display, payment methods, pricing

---

## UI/UX Patterns

### Design System
- **Glassmorphism**: `.glass` class (backdrop-blur, semi-transparent, subtle border)
- **Dark mode**: class-based toggle, persisted in localStorage
- **Gradients**: blue→purple primary, pink→rose for wedding, amber for anniversary
- **Animations**: Framer Motion for UI transitions, GSAP for scroll effects
- **Font**: Inter (Google Fonts)
- **Framework**: Tailwind CSS 3 with custom theme

### Custom CSS Animations
- `glow` — pulsing box-shadow
- `float` — vertical bobbing
- `blob` — morphing background shapes
- `gradientShift` — animated gradient background
- `sparkle` — twinkling effect
- `gentleFloat` — subtle floating

### Error Handling Patterns
- Network errors: context-specific messages (Render cold start, local server down, timeout)
- Toast notifications for all user feedback
- Loading states on all data fetches
- Protected routes redirect to login

### Responsive Design
- Mobile-first Tailwind breakpoints
- Collapsible sidebar on mobile
- Stacked layouts on small screens
- Touch-optimized interactions
