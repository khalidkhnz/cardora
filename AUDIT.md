# Cardora Remake — Full Product Audit

> **Audit Date**: 2026-02-22
> **Overall Status**: ~85% Complete
> **Scope**: Full flow analysis of `cardora-remake-next/` with comparison to original `Cardora/`

The remake is a near-complete port of the original with improved architecture (TypeScript, PostgreSQL, better-auth, Server Components). All core features exist but several flows have gaps, security issues, and missing polish.

---

## Table of Contents

- [Critical Issues](#critical-issues-must-fix)
- [High Priority Issues](#high-priority-issues)
- [Medium Priority Issues](#medium-priority-issues)
- [Feature Comparison: Original vs Remake](#feature-comparison-original-vs-remake)
- [Dashboard Pages Audit](#dashboard-pages-audit)
- [Database Schema & API Routes Mapping](#database-schema--api-routes-mapping)
- [Missing CRUD Operations](#missing-crud-operations)
- [Security Assessment](#security-assessment)
- [UI Layer & Components Inventory](#ui-layer--components-inventory)
- [Error Handling & Loading States](#error-handling--loading-states)
- [Performance & Scalability Concerns](#performance--scalability-concerns)
- [What's Complete & Working Well](#whats-complete--working-well)
- [Action Items (Priority Order)](#action-items-priority-order)

---

## Critical Issues (Must Fix)

### 1. Unprotected Unlock Endpoints

- **Files**: `src/app/api/unlock/card/route.ts`, `src/app/api/unlock/invite/route.ts`
- **Problem**: Any authenticated user can unlock card/invite features **without actually paying**. No payment verification is performed.
- **Fix**: Remove these endpoints entirely or add Stripe session verification before setting `cardPaid`/`invitePaid` to `true`.

### 2. Analytics Tracking Accepts Client-Provided userId

- **File**: `src/app/api/analytics/track/route.ts`
- **Problem**: The `userId` comes from the request body (client-controlled). Anyone can forge requests to inflate another user's analytics stats.
- **Fix**: Use the server session to determine `userId`, or validate that the provided ID matches the session user.

### 3. Public RSVP Endpoint Exposes Guest Data

- **File**: `src/app/api/rsvp/[inviteSlug]/route.ts`
- **Problem**: Returns all guest names, email addresses, attendance status, and dietary info to anyone who knows the invite slug. No authentication required.
- **Fix**: Limit the public response to aggregate stats only (total attending, total guests). Full guest details should only be available via the authenticated dashboard endpoint.

### 4. No Middleware for Route Protection

- **Problem**: No `middleware.ts` exists anywhere in the project. Route protection relies solely on the dashboard `layout.tsx` calling `getSession()`. This means:
  - Auth pages (`/login`, `/signup`) don't redirect authenticated users away
  - No centralized route matching or protection pattern
  - No CSRF or rate-limiting middleware
- **Fix**: Add a Next.js `middleware.ts` at the project root for auth redirects and route protection.

### 5. Theme Provider Conflict with Sonner

- **Files**: `src/providers/theme-provider.tsx`, `src/components/ui/sonner.tsx`
- **Problem**: Custom `ThemeProvider` uses class-based dark mode (`document.documentElement.classList.toggle("dark")`), but `sonner.tsx` imports from `next-themes` which is a separate theme system.
- **Impact**: Toast notifications may not properly detect or respond to theme changes.
- **Fix**: Either adopt `next-themes` as the single theme provider, or update the Sonner wrapper to consume the custom `useTheme()` hook.

---

## High Priority Issues

### 6. Missing Error Boundaries & 404 Page

- No `error.tsx` at any route level (root, dashboard, or nested)
- No `not-found.tsx` (users see the default Next.js 404)
- No `loading.tsx` skeleton pages for route transitions
- If any server component throws, users see an unstyled error page

**Needed files:**

```
src/app/error.tsx              # Root error boundary
src/app/not-found.tsx          # Custom 404 page
src/app/(dashboard)/error.tsx  # Dashboard error boundary
src/app/(dashboard)/loading.tsx # Dashboard loading skeleton
```

### 7. Auth Pages Don't Redirect Authenticated Users

- `/login` and `/signup` are accessible even when logged in
- No `src/app/(auth)/layout.tsx` exists to check session and redirect to `/dashboard`
- Users can navigate to login while already authenticated

### 8. File Uploads Use Local Filesystem

- **Files**: `src/app/api/upload/image/route.ts`, `src/app/api/upload/audio/route.ts`
- Uploads stored in `public/uploads/` which won't work on serverless (Vercel) or multi-server deployments
- No file cleanup or expiration for orphaned uploads
- Max sizes: images 5MB, audio 10MB
- **Fix**: Migrate to S3, Cloudflare R2, or UploadThing for production.

### 9. No Pagination on Several List Endpoints

| Endpoint | Issue |
|----------|-------|
| `GET /api/payment/history` | Returns ALL payments, no limit |
| `GET /api/download/gallery` | Returns ALL gallery items |
| `GET /api/rsvp/dashboard` | Returns ALL RSVPs |

These will degrade performance as data grows.

### 10. RSVP Submit Doesn't Validate Invite Exists

- **File**: `src/app/api/rsvp/submit/route.ts`
- Creates an RSVP for any `inviteSlug` without checking if the wedding invite actually exists
- Could create orphaned RSVP records with no parent invite

---

## Medium Priority Issues

### 11. Type Safety Problems (~85 instances)

- Uses of `any` type, `@ts-ignore` comments, and unnarrowed `unknown` types across the codebase
- Should be cleaned up with `tsc --strict --noUncheckedIndexedAccess` before production

### 12. Console.log Statements Throughout (20+)

- Debug logging scattered across API routes, email module, auth routes, and payment webhook
- All prefixed (e.g., `[Email]`, `[Auth]`) which is good for debugging but should be removed or replaced with a proper logging service for production

### 13. No Confirmation Dialogs for Destructive Actions

- Deleting RSVPs, removing cart items, and similar operations have no "Are you sure?" confirmation
- Risk of accidental data loss

### 14. Payment Amounts Not Validated

- No min/max validation on payment amounts in Zod schemas
- Could theoretically create $0 or negative payment sessions

### 15. No Account Deletion Flow

- No endpoint or UI to delete a user account
- No cascade cleanup of user data (profile, cards, invites, payments, analytics)

---

## Feature Comparison: Original vs Remake

| Feature | Original (Cardora/) | Remake (cardora-remake-next/) | Status |
|---------|---------------------|-------------------------------|--------|
| Email/Password Auth | JWT + bcrypt + localStorage | better-auth (sessions + cookies) | **Upgraded** |
| Password Reset | Nodemailer + token | Nodemailer + token (dedicated table) | **Ported** |
| Profile Management | MongoDB User model | PostgreSQL `cardora_user_profile` | **Ported** |
| Social Links | Embedded in user doc | JSONB column on profile | **Ported** |
| Business Card Editor | React + templates | React 19 + templates + PDF export | **Ported + Enhanced** |
| Card Templates | Limited set | Static + 17 animated templates | **Ported + Enhanced** |
| Wedding Invites | Full editor | Full editor with live preview | **Ported** |
| Animated Invites | Template system | 17 templates (floral, cinematic, interactive, multi-event) | **Ported** |
| RSVP System | Submit + dashboard | Submit + dashboard + email notifications | **Ported** |
| Analytics/Tracking | Views, payments, devices | Views, payments, QR scans, NFC taps, devices | **Ported + Enhanced** |
| QR Code Generation | qrcode.react | qrcode.react | **Ported** |
| NFC Tap Tracking | Analytics event | Analytics event + dedicated NFC Guide page | **Ported + Enhanced** |
| Stripe Payments | Checkout sessions | Sessions + webhooks + verification | **Ported** |
| Interac Payments | Direct support | Profile fields only (no direct flow) | **Partially ported** |
| Gallery/Downloads | Embedded array | Dedicated `cardora_gallery_item` table | **Ported** |
| Cart/Checkout | Multi-item | Multi-item + localStorage persistence | **Ported** |
| Email Notifications | Nodemailer | Nodemailer (reset, RSVP, payment) | **Ported** |
| Public Card View | `/u/[username]` | `/u/[username]` | **Ported** |
| Public Wedding View | `/wedding/[slug]` | `/wedding/[slug]` | **Ported** |
| Payment Page | `/pay/[username]` | `/pay/[username]` | **Ported** |
| OAuth Login | Placeholder only | Not included (email-only by design) | **Intentionally excluded** |
| Account Deletion | Not found | Not implemented | **Missing** |
| Database | MongoDB (Mongoose) | PostgreSQL (Drizzle ORM) | **Upgraded** |
| Backend | Express on port 5000 | Next.js API Routes (consolidated) | **Upgraded** |
| TypeScript | Partial (tsconfig only) | Full strict mode | **Upgraded** |

---

## Dashboard Pages Audit

All 10 dashboard pages are implemented and functional:

| Page | Route | Lines | Status | Notes |
|------|-------|-------|--------|-------|
| Dashboard Home | `/dashboard` | 173 | Complete | Welcome message, status badges, getting started checklist |
| Profile | `/dashboard/profile` | 342 (form) | Complete | Full form with social links, payment settings, country/currency |
| Card Editor | `/dashboard/card` | 593 | Complete | Type selector, 3D flip preview, PDF export, template grid |
| Analytics | `/dashboard/analytics` | 49 | Complete | Stats grid (6 metrics), device breakdown chart, visitor table |
| Animated Invite | `/dashboard/animated-invite` | 600+ | Complete | Template selection, form fields, image/music upload, live preview |
| Gallery | `/dashboard/gallery` | 80 | Complete | Grid display with type icons, download dates |
| Payments | `/dashboard/payments` | 128 | Complete | History table with status badges, currency formatting |
| RSVPs | `/dashboard/rsvps` | 55 | Complete | Stats grid (5 metrics), guest response table with delete |
| NFC Guide | `/dashboard/nfc-guide` | 280 | Complete | Profile URL, step-by-step instructions, recommended tags/apps |
| Checkout | `/dashboard/checkout` | 37 | Complete | Cart items, quantity controls, order summary, Stripe redirect |

### Dashboard Layout

- **Desktop sidebar**: 264px fixed width, hidden on mobile
- **Mobile**: Hamburger menu with slide-out sheet navigation
- **Header**: Cart badge (item count), theme toggle, user avatar dropdown, sign out
- **Auth**: Protected via `getSession()` in `src/app/(dashboard)/layout.tsx` — redirects to `/login`
- **Navigation**: 9 items defined in `src/lib/constants.ts`

---

## Database Schema & API Routes Mapping

### Tables (12 total)

**Auth Tables (unprefixed, managed by better-auth):**

| Table | Purpose | Direct API Routes |
|-------|---------|-------------------|
| `user` | Core user identity | Managed by better-auth |
| `account` | Provider credentials | Managed by better-auth |
| `session` | Active sessions | Managed by better-auth |
| `verification` | Email verification | Managed by better-auth |

**App Tables (prefixed `cardora_`):**

| Table | Purpose | API Routes |
|-------|---------|------------|
| `cardora_user_profile` | Profile data, social links, payment settings | `GET/PUT /api/user/profile`, `GET /api/card/[username]` |
| `cardora_card_settings` | Business card configuration | `GET/PUT /api/card/settings` |
| `cardora_wedding_invite` | Wedding invitation content | `POST /api/wedding/create`, `GET /api/wedding/current`, `GET /api/wedding/[slug]` |
| `cardora_payment` | Payment transactions | `POST /api/payment/create-stripe-session`, `POST /api/payment/create-cart-session`, `GET /api/payment/history`, `POST /api/payment/verify`, `POST /api/payment/webhook` |
| `cardora_rsvp` | Wedding RSVPs | `POST /api/rsvp/submit`, `GET /api/rsvp/[inviteSlug]`, `GET /api/rsvp/dashboard`, `DELETE /api/rsvp/delete/[rsvpId]` |
| `cardora_analytics_event` | Profile view tracking | `POST /api/analytics/track`, `GET /api/analytics/summary`, `GET /api/analytics/visitors` |
| `cardora_gallery_item` | Downloaded designs | `POST /api/download/card`, `POST /api/download/invite`, `GET /api/download/gallery` |
| `cardora_password_reset_token` | Password reset tokens | `POST /api/auth/forgot-password`, `POST /api/auth/reset-password`, `GET /api/auth/verify-reset-token` |

### Additional API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/auth/[...all]` | GET/POST | better-auth catch-all handler |
| `/api/unlock/card` | POST | Direct card unlock (SECURITY ISSUE) |
| `/api/unlock/invite` | POST | Direct invite unlock (SECURITY ISSUE) |
| `/api/unlock/verify-payment` | POST | Verify payment + unlock (safe) |
| `/api/upload/image` | POST/DELETE/GET | Image upload (local filesystem) |
| `/api/upload/audio` | POST/DELETE | Audio upload (local filesystem) |

**Total: 30 API routes across 27 route files**

---

## Missing CRUD Operations

| Entity | GET | CREATE | UPDATE | DELETE | Notes |
|--------|:---:|:------:|:------:|:------:|-------|
| User Profile | Done | Done | Done | **MISSING** | No account/profile deletion flow |
| Card Settings | Done | Done | Done | **MISSING** | No way to reset to defaults |
| Wedding Invite | Done | Done | Done | **MISSING** | Orphans RSVPs if deleted manually in DB |
| RSVP | Done | Done | **MISSING** | Done | No way to edit a submitted RSVP |
| Gallery Item | Done | Done | — | **MISSING** | No way to remove saved items |
| Analytics Events | Done | Done | — | **MISSING** | No purge/cleanup mechanism |
| Payment | Done | Done | — | — | No refund endpoint (status exists in schema) |

---

## Security Assessment

### Critical

| Issue | Severity | File | Description |
|-------|----------|------|-------------|
| Unprotected unlock | CRITICAL | `api/unlock/card`, `api/unlock/invite` | No payment verification before unlocking |
| Forged analytics | CRITICAL | `api/analytics/track` | Client-provided userId not verified |
| Guest data exposure | CRITICAL | `api/rsvp/[inviteSlug]` | Full guest list public without auth |
| No middleware | CRITICAL | (missing) | No centralized route protection |

### High

| Issue | Severity | File | Description |
|-------|----------|------|-------------|
| Local file storage | HIGH | `api/upload/image`, `api/upload/audio` | Won't scale, no cleanup |
| No pagination limits | HIGH | `api/payment/history`, `api/download/gallery` | Unbounded result sets |
| No CSRF protection | HIGH | Custom POST routes | better-auth handles auth routes only |

### Medium

| Issue | Severity | Description |
|-------|----------|-------------|
| No rate limiting | MEDIUM | Public endpoints (RSVP submit, analytics track) have no rate limits |
| No input sanitization in emails | MEDIUM | User-provided text used in email templates without escaping |
| No request body size limits | MEDIUM | Custom routes don't enforce body size |
| RSVP delete ID guessing | MEDIUM | Sequential IDs could be enumerated |

---

## UI Layer & Components Inventory

### shadcn/ui Components (18 installed)

`alert`, `avatar`, `badge`, `button`, `card`, `dialog`, `dropdown-menu`, `input`, `label`, `select`, `separator`, `sheet`, `skeleton`, `sonner`, `switch`, `table`, `tabs`, `textarea`

### Custom Components by Category

| Category | Count | Key Components |
|----------|-------|----------------|
| Analytics | 3 | `stats-grid`, `device-breakdown`, `visitor-insights` |
| Animated Invite | 28+ | Editor, public view, 17 templates, shared utilities |
| Auth | 2 | `login-form`, `signup-form` |
| Business Card | 8 | Preview (front/back), config form, flippable card, template grid |
| Wedding Card | 4 | Preview (front/back), template grid, selection modal |
| Checkout | 3 | Cart item list, order summary, payment method selector |
| Dashboard | 1 | Share section (QR + link) |
| Layout | 2 | Dashboard layout, sidebar |
| Landing | 1 | Full landing page with hero, features, pricing |
| Profile | 1 | Profile form (342 lines) |
| Public | 1 | Public profile view |
| RSVP | 3 | Modal, stats grid, table |
| Shared | 4 | Image upload, music upload, QR code card, theme toggle |

### Providers (3)

| Provider | File | Purpose |
|----------|------|---------|
| ThemeProvider | `src/providers/theme-provider.tsx` | Light/dark/system with localStorage |
| QueryProvider | `src/providers/query-provider.tsx` | TanStack Query v5 (1min stale time) |
| CartProvider | `src/providers/cart-provider.tsx` | Shopping cart with localStorage persistence |

### Data Fetching Hooks (7)

| Hook File | Functions | API Endpoints |
|-----------|-----------|---------------|
| `use-user.ts` | `useUserProfile`, `useUpdateProfile` | `/api/user/profile` |
| `use-card.ts` | `useCardSettings`, `useUpdateCardSettings` | `/api/card/settings` |
| `use-analytics.ts` | `useAnalyticsSummary`, `useVisitors` | `/api/analytics/summary`, `/api/analytics/visitors` |
| `use-payment.ts` | `usePaymentHistory`, `useCreateStripeSession`, `useCreateCartSession`, `useVerifyPayment`, `useVerifyAndUnlockPayment` | `/api/payment/*` |
| `use-rsvp.ts` | `useDashboardRSVPs`, `useSubmitRSVP`, `useDeleteRSVP`, `usePublicRSVPStats` | `/api/rsvp/*` |
| `use-gallery.ts` | `useGallery` | `/api/download/gallery` |
| `use-wedding.ts` | `useCurrentInvite`, `useCreateInvite`, `useWeddingInvite` | `/api/wedding/*` |

### Fonts (17 Google Fonts loaded)

Playfair Display, Cormorant Garamond, Great Vibes, Dancing Script, Montserrat, Raleway, Cinzel, Lora, Josefin Sans, DM Serif Display, Merriweather, Libre Baskerville, Source Code Pro, Crimson Pro, Bitter, Abril Fatface, Philosopher

---

## Error Handling & Loading States

### Loading States

| Page | Loading State | Type |
|------|--------------|------|
| Profile Form | Skeleton loader | Component-level |
| Card Editor | Full skeleton | Component-level |
| Analytics | Skeleton grid | Component-level |
| Gallery | Skeleton grid | Component-level |
| Payments | Spinner icon | Component-level |
| RSVPs | Skeleton grid + table | Component-level |
| NFC Guide | Skeleton | Component-level |
| Success Page | Spinner + message | Full page |

### Missing

- No route-level `loading.tsx` files
- No `error.tsx` boundary files at any level
- No `not-found.tsx` custom 404 page
- Animated invite editor has no form submission skeleton
- Visitor insights table has no pagination loading indicator

### Validation Schemas (5)

| Schema | File | Usage |
|--------|------|-------|
| `updateProfileSchema` | `src/lib/validators.ts` | Profile form + API |
| `updateCardSettingsSchema` | `src/lib/validators.ts` | Card settings + API |
| `createWeddingInviteSchema` | `src/lib/validators.ts` | Wedding editor + API |
| `submitRsvpSchema` | `src/lib/validators.ts` | RSVP form + API |
| `signupSchema` | `src/lib/validators.ts` | Signup form |

---

## Performance & Scalability Concerns

| Concern | Location | Impact | Recommendation |
|---------|----------|--------|----------------|
| Unbounded queries | Payment history, gallery, dashboard RSVPs | Slow responses with large datasets | Add pagination with limit/offset |
| N+1 query potential | `getDashboardRsvps` | Queries invites then RSVPs separately | Optimize with JOIN |
| Synchronous analytics | `POST /api/analytics/track` | Blocks response for DB write | Make async or use queue |
| Local file storage | `public/uploads/` | Fails on serverless, no CDN | Migrate to object storage |
| Fire-and-forget emails | RSVP submit, payment webhook | Failed emails are silently lost | Add retry logic or queue |
| No database indexes | Frequently queried columns | Slow lookups as data grows | Add indexes on `userId`, `slug`, `inviteSlug` |
| 17 Google Fonts | Root layout | Large initial page load | Lazy-load fonts per template |

---

## What's Complete & Working Well

- All **10 dashboard pages** fully implemented with data fetching
- **17 animated wedding templates** (floral, cinematic, interactive, multi-event)
- **Business card editor** with 3D flip preview, PDF export, template selection
- **Full Stripe payment flow** with sessions, webhooks, and verification
- **Analytics dashboard** with 6 metrics, device breakdown chart, paginated visitor table
- **RSVP management** with 5-metric stats grid, guest table, and email notifications
- **Cart system** with localStorage persistence, quantity controls, and multi-item checkout
- **Dark mode** with light/dark/system support and localStorage persistence
- **Responsive design** with mobile sidebar sheet, responsive grids on all pages
- **7 Drizzle query files** with proper ORM patterns
- **5 Zod validation schemas** covering all form inputs
- **7 TanStack Query hooks** with cache key management and optimistic updates
- **12 database tables** with proper FK relationships and cascade deletes
- **30 API routes** with auth checks, validation, and error handling
- **Password reset flow** with token generation, email delivery, and token verification

---

## Action Items (Priority Order)

### Must-Have Before Launch

| # | Task | Category | Effort |
|---|------|----------|--------|
| 1 | Add `middleware.ts` for route protection + auth page redirects | Security | Medium |
| 2 | Fix unlock endpoints — require payment verification | Security | Small |
| 3 | Fix analytics tracking to use server-side userId | Security | Small |
| 4 | Restrict public RSVP endpoint to aggregate stats only | Security | Small |
| 5 | Add `error.tsx` and `not-found.tsx` pages | UX | Small |
| 6 | Resolve theme provider conflict with Sonner | Bug | Small |
| 7 | Add `(auth)/layout.tsx` to redirect logged-in users from login/signup | UX | Small |

### Should-Have

| # | Task | Category | Effort |
|---|------|----------|--------|
| 8 | Add DELETE endpoints for profiles, wedding invites, gallery items | Feature | Medium |
| 9 | Add RSVP update endpoint | Feature | Small |
| 10 | Add pagination to payment history and gallery endpoints | Performance | Medium |
| 11 | Validate invite exists before accepting RSVP submissions | Data Integrity | Small |
| 12 | Add confirmation dialogs for destructive actions (delete RSVP, etc.) | UX | Small |
| 13 | Add payment amount validation (min/max) in Zod schemas | Security | Small |
| 14 | Migrate file uploads to cloud storage (S3/R2) for deployment | Infrastructure | Large |
| 15 | Add rate limiting to public endpoints (RSVP, analytics) | Security | Medium |

### Nice-to-Have

| # | Task | Category | Effort |
|---|------|----------|--------|
| 16 | Fix ~85 TypeScript `any`/`@ts-ignore` instances | Code Quality | Medium |
| 17 | Remove console.log statements or replace with proper logging | Code Quality | Small |
| 18 | Add `loading.tsx` skeleton pages for route transitions | UX | Small |
| 19 | Implement account deletion flow (UI + API + cascade cleanup) | Feature | Large |
| 20 | Add payment refund endpoint | Feature | Medium |
| 21 | Add database indexes on `userId`, `slug`, `inviteSlug` columns | Performance | Small |
| 22 | Optimize `getDashboardRsvps` with JOIN instead of N+1 | Performance | Small |
| 23 | Lazy-load Google Fonts per template instead of all 17 upfront | Performance | Medium |
| 24 | Add input sanitization/escaping in email templates | Security | Small |
| 25 | Add Interac e-Transfer direct payment flow (partially ported) | Feature | Large |
