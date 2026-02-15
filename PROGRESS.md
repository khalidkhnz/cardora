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
- [x] **Root layout** — Wrapped with `QueryProvider` + shadcn `Toaster`, updated metadata to Cardora branding
- [x] **Environment** — Added `NEXT_PUBLIC_APP_URL` (client), SMTP vars (server). Removed GitHub OAuth vars.

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
- [x] **Auth pages**:
  - `/login` — Email/password form, forgot password link
  - `/signup` — Name, username, email, password, confirm password
  - `/forgot-password` — Email input, sends reset link
  - `/reset-password` — Token validation + new password form
- [x] **Dashboard layout** — `src/components/layout/`:
  - `dashboard-layout.tsx` — Sidebar (desktop) + header + mobile sheet nav + user dropdown
  - `dashboard-sidebar.tsx` — Nav links with active state highlighting
- [x] **Dashboard home** (`/dashboard`) — Welcome message, quick action cards (profile/card/invite/analytics), getting started checklist for new users
- [x] **Profile system**:
  - `src/components/profile/profile-form.tsx` — Full editor: basic info, social links (6 platforms), settings (profile toggle, payment toggle, payment type, fixed amount, Interac email)
  - `src/app/(dashboard)/dashboard/profile/page.tsx`
  - `GET/PUT /api/user/profile` — Zod validation + username uniqueness check
  - `src/server/db/queries/user.ts` — getUserProfile, updateUserProfile, createUserProfile, getUserProfileByUsername, getUserWithProfile, isUsernameTaken
  - `src/hooks/use-user.ts` — `useUserProfile()`, `useUpdateProfile()` with query key management
- [x] **Placeholder pages** — All dashboard sections have pages:
  - `/dashboard/card` — Card editor (coming soon)
  - `/dashboard/analytics` — Analytics (coming soon)
  - `/dashboard/animated-invite` — Animated invites (coming soon)
  - `/dashboard/rsvps` — RSVPs (coming soon)
  - `/dashboard/gallery` — Gallery (coming soon)
  - `/dashboard/payments` — Payments (coming soon)
- [x] **Landing page** — Hero section with gradient text, feature cards (business cards, wedding invites, analytics), CTA buttons, footer
- [x] **Lint + typecheck** — Both pass clean

---

## File Tree (current state)

```
src/
├── app/
│   ├── layout.tsx                          # Root layout (QueryProvider + Toaster)
│   ├── page.tsx                            # Landing page
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   └── reset-password/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx                      # Auth guard + DashboardLayout wrapper
│   │   └── dashboard/
│   │       ├── page.tsx                    # Dashboard home
│   │       ├── profile/page.tsx
│   │       ├── card/page.tsx               # placeholder
│   │       ├── analytics/page.tsx          # placeholder
│   │       ├── animated-invite/page.tsx    # placeholder
│   │       ├── rsvps/page.tsx              # placeholder
│   │       ├── gallery/page.tsx            # placeholder
│   │       └── payments/page.tsx           # placeholder
│   └── api/
│       ├── auth/
│       │   ├── [...all]/route.ts           # better-auth catch-all
│       │   ├── forgot-password/route.ts
│       │   ├── reset-password/route.ts
│       │   └── verify-reset-token/route.ts
│       └── user/
│           └── profile/route.ts            # GET/PUT
├── components/
│   ├── auth/
│   │   ├── login-form.tsx
│   │   └── signup-form.tsx
│   ├── layout/
│   │   ├── dashboard-layout.tsx
│   │   └── dashboard-sidebar.tsx
│   ├── profile/
│   │   └── profile-form.tsx
│   └── ui/                                 # shadcn/ui (17 components)
├── hooks/
│   └── use-user.ts
├── lib/
│   ├── api-client.ts
│   ├── constants.ts
│   ├── utils.ts                            # shadcn cn() utility
│   ├── validators.ts
│   └── templates/                          # empty, for future template data
├── providers/
│   └── query-provider.tsx
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
│   │   │   └── user.ts
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
│   └── globals.css                         # Tailwind v4 + shadcn theme vars
└── env.js
```
