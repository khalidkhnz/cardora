import { type NextRequest, NextResponse } from "next/server";

// In production (HTTPS), better-auth prefixes cookie names with "__Secure-"
const AUTH_COOKIES = [
  "better-auth.session_token",
  "__Secure-better-auth.session_token",
];

const AUTH_PAGES = ["/login", "/signup", "/forgot-password", "/reset-password"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = AUTH_COOKIES.some((name) => request.cookies.has(name));

  // Redirect authenticated users away from auth pages
  if (hasSession && AUTH_PAGES.some((p) => pathname === p)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Dashboard protection is handled by the dashboard layout via getSession()
  // which is more reliable than cookie-name checking in middleware.

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/forgot-password", "/reset-password"],
};
