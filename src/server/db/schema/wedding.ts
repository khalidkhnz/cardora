import { relations } from "drizzle-orm";
import { boolean, jsonb, pgTableCreator, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

const createTable = pgTableCreator((name) => `cardora_${name}`);

export const weddingInvite = createTable("wedding_invite", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  slug: text("slug").notNull().unique(),
  templateId: text("template_id").notNull(),
  groomName: text("groom_name"),
  brideName: text("bride_name"),
  weddingDate: text("wedding_date"),
  receptionDate: text("reception_date"),
  venue: text("venue"),
  venueAddress: text("venue_address"),
  story: text("story"),
  heroImage: text("hero_image"),
  galleryImages: jsonb("gallery_images").$type<string[]>().default([]),
  musicUrl: text("music_url"),
  isPaid: boolean("is_paid").default(false).notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const weddingInviteRelations = relations(weddingInvite, ({ one }) => ({
  user: one(user, { fields: [weddingInvite.userId], references: [user.id] }),
}));
