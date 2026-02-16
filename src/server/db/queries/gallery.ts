import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { galleryItem } from "@/server/db/schema/gallery";
import { userProfile } from "@/server/db/schema/profile";

export async function getGalleryItems(userId: string) {
  return db
    .select()
    .from(galleryItem)
    .where(eq(galleryItem.userId, userId))
    .orderBy(galleryItem.downloadedAt);
}

export async function addToGallery(
  userId: string,
  data: {
    type: "business_card" | "wedding_invite";
    templateId: string;
    slug?: string;
    data: Record<string, unknown>;
  },
) {
  const result = await db
    .insert(galleryItem)
    .values({
      userId,
      type: data.type,
      templateId: data.templateId,
      slug: data.slug,
      data: data.data,
    })
    .returning();

  return result[0]!;
}

export async function checkPaymentStatus(
  userId: string,
  type: "card" | "invite",
) {
  const profiles = await db
    .select({
      cardPaid: userProfile.cardPaid,
      invitePaid: userProfile.invitePaid,
    })
    .from(userProfile)
    .where(eq(userProfile.userId, userId))
    .limit(1);

  const profile = profiles[0];
  if (!profile) return false;

  return type === "card" ? profile.cardPaid : profile.invitePaid;
}
