import { NextResponse, type NextRequest } from "next/server";
import { getApiSession } from "@/server/auth-helpers";
import {
  getCardSettings,
  updateCardSettings,
  createCardSettings,
} from "@/server/db/queries/card";
import { updateCardSettingsSchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let settings = await getCardSettings(session.user.id);

  // Auto-create card settings for new users
  if (!settings) {
    settings = await createCardSettings(session.user.id);
  }

  return NextResponse.json(settings);
}

export async function PUT(request: NextRequest) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: unknown = await request.json();
  const parsed = updateCardSettingsSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const settings = await updateCardSettings(session.user.id, parsed.data);
  return NextResponse.json(settings);
}
