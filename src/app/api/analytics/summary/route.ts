import { NextResponse, type NextRequest } from "next/server";
import { getApiSession } from "@/server/auth-helpers";
import { getAnalyticsSummary } from "@/server/db/queries/analytics";

export async function GET(request: NextRequest) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const summary = await getAnalyticsSummary(session.user.id);
  return NextResponse.json(summary);
}
