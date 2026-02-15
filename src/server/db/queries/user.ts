import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { userProfile } from "@/server/db/schema/profile";
import { user } from "@/server/db/schema/auth";
import type { UpdateProfileInput } from "@/lib/validators";

export async function getUserProfile(userId: string) {
  const profiles = await db
    .select()
    .from(userProfile)
    .where(eq(userProfile.userId, userId))
    .limit(1);

  return profiles[0] ?? null;
}

export async function getUserWithProfile(userId: string) {
  const results = await db
    .select()
    .from(user)
    .leftJoin(userProfile, eq(user.id, userProfile.userId))
    .where(eq(user.id, userId))
    .limit(1);

  const row = results[0];
  if (!row) return null;

  return {
    ...row.user,
    profile: row.user_profile,
  };
}

export async function getUserProfileByUsername(username: string) {
  const results = await db
    .select()
    .from(userProfile)
    .innerJoin(user, eq(user.id, userProfile.userId))
    .where(eq(userProfile.username, username))
    .limit(1);

  const row = results[0];
  if (!row) return null;

  return {
    ...row.user,
    profile: row.user_profile,
  };
}

export async function createUserProfile(
  userId: string,
  data: Partial<UpdateProfileInput>,
) {
  const result = await db
    .insert(userProfile)
    .values({
      userId,
      ...data,
    })
    .returning();

  return result[0]!;
}

export async function updateUserProfile(
  userId: string,
  data: UpdateProfileInput,
) {
  const existing = await getUserProfile(userId);

  if (!existing) {
    return createUserProfile(userId, data);
  }

  const result = await db
    .update(userProfile)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(userProfile.userId, userId))
    .returning();

  return result[0]!;
}

export async function isUsernameTaken(
  username: string,
  excludeUserId?: string,
) {
  const results = await db
    .select({ id: userProfile.id, userId: userProfile.userId })
    .from(userProfile)
    .where(eq(userProfile.username, username))
    .limit(1);

  const existing = results[0];
  if (!existing) return false;
  if (excludeUserId && existing.userId === excludeUserId) return false;
  return true;
}
