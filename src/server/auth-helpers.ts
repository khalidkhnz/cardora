import { auth } from "@/server/better-auth";

export async function getApiSession(request: Request) {
  return auth.api.getSession({ headers: request.headers });
}

/** Extract origin (scheme + host) from incoming request headers. */
export function getOriginFromRequest(request: Request): string {
  const headers = request.headers;
  const origin = headers.get("origin");
  if (origin) return origin;
  const host = headers.get("host") ?? headers.get("x-forwarded-host");
  if (host) {
    const proto = headers.get("x-forwarded-proto") ?? "https";
    return `${proto}://${host}`;
  }
  return "https://localhost:3000";
}
