import "server-only";
import { eq, sql } from "drizzle-orm";
import { db } from "@/server/db";
import { rsvp } from "@/server/db/schema/rsvp";
import { weddingInvite } from "@/server/db/schema/wedding";
import type { SubmitRsvpInput } from "@/lib/validators";

export async function submitRsvp(data: SubmitRsvpInput) {
  const result = await db
    .insert(rsvp)
    .values(data)
    .returning();

  return result[0]!;
}

export async function getRsvpsByInviteSlug(inviteSlug: string) {
  return db
    .select({
      id: rsvp.id,
      guestName: rsvp.guestName,
      attending: rsvp.attending,
      numberOfGuests: rsvp.numberOfGuests,
    })
    .from(rsvp)
    .where(eq(rsvp.inviteSlug, inviteSlug));
}

export async function getDashboardRsvps(userId: string) {
  // Get all invites for user, then get RSVPs for those invites
  const invites = await db
    .select({ slug: weddingInvite.slug })
    .from(weddingInvite)
    .where(eq(weddingInvite.userId, userId));

  if (invites.length === 0) return { rsvps: [], stats: { total: 0, attending: 0, declined: 0, maybe: 0, totalGuests: 0 } };

  const slugs = invites.map((i) => i.slug);
  if (slugs.length === 0) return { rsvps: [], stats: { total: 0, attending: 0, declined: 0, maybe: 0, totalGuests: 0 } };

  const allRsvps = await db
    .select()
    .from(rsvp)
    .where(sql`${rsvp.inviteSlug} = ANY(${slugs})`)
    .orderBy(sql`${rsvp.createdAt} desc`);

  const stats = {
    total: allRsvps.length,
    attending: allRsvps.filter((r) => r.attending === "yes").length,
    declined: allRsvps.filter((r) => r.attending === "no").length,
    maybe: allRsvps.filter((r) => r.attending === "maybe").length,
    totalGuests: allRsvps.reduce((sum, r) => sum + (r.numberOfGuests ?? 1), 0),
  };

  return { rsvps: allRsvps, stats };
}

export async function deleteRsvp(rsvpId: string, userId: string) {
  // Verify the RSVP belongs to one of the user's invites
  const rsvpRecord = await db
    .select()
    .from(rsvp)
    .where(eq(rsvp.id, rsvpId))
    .limit(1);

  if (!rsvpRecord[0]) return null;

  const invite = await db
    .select()
    .from(weddingInvite)
    .where(eq(weddingInvite.slug, rsvpRecord[0].inviteSlug))
    .limit(1);

  if (invite[0]?.userId !== userId) return null;

  await db.delete(rsvp).where(eq(rsvp.id, rsvpId));
  return { success: true };
}
