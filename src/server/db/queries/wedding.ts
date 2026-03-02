import "server-only";
import { eq, and, sql } from "drizzle-orm";
import { db } from "@/server/db";
import { weddingInvite } from "@/server/db/schema/wedding";
import { rsvp } from "@/server/db/schema/rsvp";
import type { CreateWeddingInviteInput } from "@/lib/validators";

// ---------------------------------------------------------------------------
// Public queries
// ---------------------------------------------------------------------------

export async function getWeddingInviteBySlug(slug: string) {
  const results = await db
    .select()
    .from(weddingInvite)
    .where(eq(weddingInvite.slug, slug))
    .limit(1);

  return results[0] ?? null;
}

// ---------------------------------------------------------------------------
// Multi-invite queries
// ---------------------------------------------------------------------------

export async function getUserInvites(userId: string) {
  return db
    .select()
    .from(weddingInvite)
    .where(eq(weddingInvite.userId, userId))
    .orderBy(sql`${weddingInvite.createdAt} desc`);
}

export async function getInviteById(inviteId: string, userId: string) {
  const results = await db
    .select()
    .from(weddingInvite)
    .where(and(eq(weddingInvite.id, inviteId), eq(weddingInvite.userId, userId)))
    .limit(1);

  return results[0] ?? null;
}

export async function createInvite(
  userId: string,
  data: CreateWeddingInviteInput,
) {
  const result = await db
    .insert(weddingInvite)
    .values({
      userId,
      ...data,
    })
    .returning();

  return result[0]!;
}

export async function updateInvite(
  inviteId: string,
  userId: string,
  data: Partial<CreateWeddingInviteInput>,
) {
  const result = await db
    .update(weddingInvite)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(and(eq(weddingInvite.id, inviteId), eq(weddingInvite.userId, userId)))
    .returning();

  return result[0] ?? null;
}

export async function deleteInvite(inviteId: string, userId: string) {
  const invite = await getInviteById(inviteId, userId);
  if (!invite) return null;

  // Delete associated RSVPs first
  await db.delete(rsvp).where(eq(rsvp.inviteSlug, invite.slug));

  // Delete the invite
  await db
    .delete(weddingInvite)
    .where(and(eq(weddingInvite.id, inviteId), eq(weddingInvite.userId, userId)));

  return { success: true };
}

export async function unlockInviteById(inviteId: string, userId: string) {
  const result = await db
    .update(weddingInvite)
    .set({ isPaid: true, updatedAt: new Date() })
    .where(and(eq(weddingInvite.id, inviteId), eq(weddingInvite.userId, userId)))
    .returning();

  return result[0] ?? null;
}

// ---------------------------------------------------------------------------
// Backward-compat aliases
// ---------------------------------------------------------------------------

/** @deprecated Use getUserInvites instead */
export async function getCurrentUserInvite(userId: string) {
  const results = await db
    .select()
    .from(weddingInvite)
    .where(eq(weddingInvite.userId, userId))
    .limit(1);

  return results[0] ?? null;
}

/** @deprecated Use createInvite instead */
export async function createOrUpdateInvite(
  userId: string,
  data: CreateWeddingInviteInput,
) {
  return createInvite(userId, data);
}

/** @deprecated Use deleteInvite instead */
export async function deleteUserInvite(userId: string) {
  const existing = await getCurrentUserInvite(userId);
  if (!existing) return null;

  await db.delete(rsvp).where(eq(rsvp.inviteSlug, existing.slug));
  await db
    .delete(weddingInvite)
    .where(eq(weddingInvite.userId, userId));

  return { success: true };
}
