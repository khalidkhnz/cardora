import { NextResponse, type NextRequest } from "next/server";
import { eq, and, gt } from "drizzle-orm";
import { db } from "@/server/db";
import { passwordResetToken } from "@/server/db/schema/password-reset";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { valid: false, error: "Token is required" },
      { status: 400 },
    );
  }

  const tokens = await db
    .select({ id: passwordResetToken.id })
    .from(passwordResetToken)
    .where(
      and(
        eq(passwordResetToken.token, token),
        gt(passwordResetToken.expiresAt, new Date()),
      ),
    )
    .limit(1);

  return NextResponse.json({ valid: !!tokens[0] });
}
