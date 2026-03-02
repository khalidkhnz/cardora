import { NextResponse, type NextRequest } from "next/server";
import { getApiSession } from "@/server/auth-helpers";
import { getInviteById, updateInvite, deleteInvite } from "@/server/db/queries/wedding";
import { updateWeddingInviteSchema } from "@/lib/validators";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ inviteId: string }> },
) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { inviteId } = await params;
  const invite = await getInviteById(inviteId, session.user.id);

  if (!invite) {
    return NextResponse.json({ error: "Invite not found" }, { status: 404 });
  }

  return NextResponse.json(invite);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ inviteId: string }> },
) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { inviteId } = await params;
  const body: unknown = await request.json();
  const parsed = updateWeddingInviteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const invite = await updateInvite(inviteId, session.user.id, parsed.data);
  if (!invite) {
    return NextResponse.json({ error: "Invite not found" }, { status: 404 });
  }

  return NextResponse.json(invite);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ inviteId: string }> },
) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { inviteId } = await params;
  const result = await deleteInvite(inviteId, session.user.id);

  if (!result) {
    return NextResponse.json({ error: "Invite not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
