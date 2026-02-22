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
  couplePhoto: text("couple_photo"),
  backgroundImage: text("background_image"),
  weddingTime: text("wedding_time"),
  groomFatherName: text("groom_father_name"),
  groomMotherName: text("groom_mother_name"),
  brideFatherName: text("bride_father_name"),
  brideMotherName: text("bride_mother_name"),
  coupleMessage: text("couple_message"),
  events: jsonb("events").$type<{ name: string; date: string; venue: string; time: string }[]>(),
  extraData: jsonb("extra_data").$type<Record<string, unknown>>(),
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
