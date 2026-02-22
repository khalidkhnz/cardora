import "server-only";
import { eq, and } from "drizzle-orm";
import { db } from "@/server/db";
import { weddingInvite } from "@/server/db/schema/wedding";
import { rsvp } from "@/server/db/schema/rsvp";
import type { CreateWeddingInviteInput } from "@/lib/validators";

export async function getWeddingInviteBySlug(slug: string) {
  const results = await db
    .select()
    .from(weddingInvite)
    .where(eq(weddingInvite.slug, slug))
    .limit(1);

  return results[0] ?? null;
}

export async function getCurrentUserInvite(userId: string) {
  const results = await db
    .select()
    .from(weddingInvite)
    .where(eq(weddingInvite.userId, userId))
    .limit(1);

  return results[0] ?? null;
}

export async function createOrUpdateInvite(
  userId: string,
  data: CreateWeddingInviteInput,
) {
  const existing = await getCurrentUserInvite(userId);

  if (existing) {
    const result = await db
      .update(weddingInvite)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(weddingInvite.userId, userId))
      .returning();

    return result[0]!;
  }

  const result = await db
    .insert(weddingInvite)
    .values({
      userId,
      ...data,
    })
    .returning();

  return result[0]!;
}

export async function deleteUserInvite(userId: string) {
  const existing = await getCurrentUserInvite(userId);
  if (!existing) return null;

  // Delete associated RSVPs first
  await db.delete(rsvp).where(eq(rsvp.inviteSlug, existing.slug));

  // Delete the invite
  await db
    .delete(weddingInvite)
    .where(eq(weddingInvite.userId, userId));

  return { success: true };
}
