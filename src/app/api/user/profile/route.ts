import { NextResponse, type NextRequest } from "next/server";
import { getApiSession } from "@/server/auth-helpers";
import { getUserProfile, updateUserProfile, isUsernameTaken, createUserProfile } from "@/server/db/queries/user";
import { updateProfileSchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let profile = await getUserProfile(session.user.id);

  // Auto-create profile for new users
  if (!profile) {
    profile = await createUserProfile(session.user.id, {});
  }

  return NextResponse.json({
    ...profile,
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
  });
}

export async function PUT(request: NextRequest) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: unknown = await request.json();
  const parsed = updateProfileSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // Check username uniqueness
  if (parsed.data.username) {
    const taken = await isUsernameTaken(parsed.data.username, session.user.id);
    if (taken) {
      return NextResponse.json(
        { error: "Username is already taken" },
        { status: 409 },
      );
    }
  }

  const profile = await updateUserProfile(session.user.id, parsed.data);
  return NextResponse.json({
    ...profile,
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
  });
}
