import { NextResponse, type NextRequest } from "next/server";
import { getApiSession } from "@/server/auth-helpers";
import { createOrUpdateInvite } from "@/server/db/queries/wedding";
import { createWeddingInviteSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: unknown = await request.json();
  const parsed = createWeddingInviteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const invite = await createOrUpdateInvite(session.user.id, parsed.data);
  return NextResponse.json(invite);
}
