import { NextResponse, type NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { user } from "@/server/db/schema/auth";
import { passwordResetToken } from "@/server/db/schema/password-reset";
import { sendPasswordResetEmail } from "@/server/utils/email";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 },
      );
    }

    // Check if user exists
    const users = await db
      .select({ id: user.id, email: user.email })
      .from(user)
      .where(eq(user.email, email))
      .limit(1);

    if (!users[0]) {
      // Don't reveal whether user exists
      return NextResponse.json({
        message: "If an account exists, a reset link has been sent.",
      });
    }

    // Delete any existing reset tokens for this email
    await db
      .delete(passwordResetToken)
      .where(eq(passwordResetToken.email, email));

    // Generate a new token
    const token = crypto.randomUUID() + crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await db.insert(passwordResetToken).values({
      email,
      token,
      expiresAt,
    });

    // Send the email
    const result = await sendPasswordResetEmail(email, token);

    if (!result.success && "resetUrl" in result) {
      // In dev mode, return the reset URL if email isn't configured
      console.log("[Auth] Password reset link:", result.resetUrl);
    }

    return NextResponse.json({
      message: "If an account exists, a reset link has been sent.",
    });
  } catch (error) {
    console.error("[Auth] Forgot password error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
