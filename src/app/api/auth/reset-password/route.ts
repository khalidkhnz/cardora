import { NextResponse, type NextRequest } from "next/server";
import { eq, and, gt } from "drizzle-orm";
import { db } from "@/server/db";
import { account } from "@/server/db/schema/auth";
import { passwordResetToken } from "@/server/db/schema/password-reset";
import { user } from "@/server/db/schema/auth";
import { auth } from "@/server/better-auth";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      token?: string;
      newPassword?: string;
    };
    const { token, newPassword } = body;

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: "Token and new password are required" },
        { status: 400 },
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 },
      );
    }

    // Find and validate token
    const tokens = await db
      .select()
      .from(passwordResetToken)
      .where(
        and(
          eq(passwordResetToken.token, token),
          gt(passwordResetToken.expiresAt, new Date()),
        ),
      )
      .limit(1);

    const resetRecord = tokens[0];
    if (!resetRecord) {
      return NextResponse.json(
        { error: "Invalid or expired reset link" },
        { status: 400 },
      );
    }

    // Find user by email
    const users = await db
      .select({ id: user.id })
      .from(user)
      .where(eq(user.email, resetRecord.email))
      .limit(1);

    const foundUser = users[0];
    if (!foundUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 },
      );
    }

    // Hash the new password using better-auth's internal context
    const ctx = await auth.$context;
    const hashedPassword = await ctx.password.hash(newPassword);

    // Update password in the account table (credential provider)
    const accounts = await db
      .select({ id: account.id })
      .from(account)
      .where(
        and(
          eq(account.userId, foundUser.id),
          eq(account.providerId, "credential"),
        ),
      )
      .limit(1);

    if (accounts[0]) {
      await db
        .update(account)
        .set({ password: hashedPassword, updatedAt: new Date() })
        .where(eq(account.id, accounts[0].id));
    }

    // Delete the used token
    await db
      .delete(passwordResetToken)
      .where(eq(passwordResetToken.email, resetRecord.email));

    return NextResponse.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("[Auth] Reset password error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
