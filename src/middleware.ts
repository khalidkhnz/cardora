import { type NextRequest, NextResponse } from "next/server";

// In production (HTTPS), better-auth prefixes cookie names with "__Secure-"
const AUTH_COOKIES = [
  "better-auth.session_token",
  "__Secure-better-auth.session_token",
];

const AUTH_PAGES = ["/login", "/signup", "/forgot-password", "/reset-password"];
const PROTECTED_PREFIX = "/dashboard";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = AUTH_COOKIES.some((name) => request.cookies.has(name));

  // Redirect authenticated users away from auth pages
  if (hasSession && AUTH_PAGES.some((p) => pathname === p)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users away from protected pages
  if (!hasSession && pathname.startsWith(PROTECTED_PREFIX)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/dashboard/:path*",
  ],
};
