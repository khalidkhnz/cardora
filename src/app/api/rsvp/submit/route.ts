import { NextResponse, type NextRequest } from "next/server";
import { submitRsvp } from "@/server/db/queries/rsvp";
import { submitRsvpSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();
    const parsed = submitRsvpSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const result = await submitRsvp(parsed.data);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("[RSVP] Submit error:", error);
    return NextResponse.json(
      { error: "Failed to submit RSVP" },
      { status: 500 },
    );
  }
}
