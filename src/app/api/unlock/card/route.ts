import { NextResponse, type NextRequest } from "next/server";
import { getApiSession } from "@/server/auth-helpers";

export async function POST(request: NextRequest) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Cards are now free - no unlock needed
  return NextResponse.json({ success: true });
}
