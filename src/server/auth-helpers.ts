import { auth } from "@/server/better-auth";

export async function getApiSession(request: Request) {
  return auth.api.getSession({ headers: request.headers });
}
