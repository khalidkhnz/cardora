import { NextResponse, type NextRequest } from "next/server";
import { getApiSession } from "@/server/auth-helpers";
import { getVisitors } from "@/server/db/queries/analytics";

export async function GET(request: NextRequest) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") ?? "1", 10);

  const visitors = await getVisitors(session.user.id, page);
  return NextResponse.json(visitors);
}
