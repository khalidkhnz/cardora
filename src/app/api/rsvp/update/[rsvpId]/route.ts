import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getApiSession } from "@/server/auth-helpers";
import { updateRsvpStatus } from "@/server/db/queries/rsvp";

const updateRsvpSchema = z.object({
  status: z.enum(["pending", "confirmed", "declined"]),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ rsvpId: string }> },
) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: unknown = await request.json();
  const parsed = updateRsvpSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { rsvpId } = await params;
  const result = await updateRsvpStatus(
    rsvpId,
    session.user.id,
    parsed.data.status,
  );

  if (!result) {
    return NextResponse.json(
      { error: "RSVP not found or unauthorized" },
      { status: 404 },
    );
  }

  return NextResponse.json(result);
}
