import { relations } from "drizzle-orm";
import { boolean, integer, jsonb, pgTableCreator, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { platform } from "@/lib/platform";

const createTable = pgTableCreator((name) => `${platform.dbTablePrefix}_${name}`);

export const userProfile = createTable("user_profile", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: "cascade" }),
  username: text("username").unique(),
  profession: text("profession"),
  company: text("company"),
  phone: text("phone"),
  whatsapp: text("whatsapp"),
  address: text("address"),
  socialLinks: jsonb("social_links").$type<Record<string, string>>().default({}),
  profileEnabled: boolean("profile_enabled").default(true).notNull(),
  paymentEnabled: boolean("payment_enabled").default(false).notNull(),
  paymentType: text("payment_type").$type<"fixed" | "flexible">().default("flexible"),
  fixedAmount: integer("fixed_amount"),
  interacEmail: text("interac_email"),
  theme: text("theme").default("default"),
  country: text("country").default("IN"),
  currency: text("currency").default("INR"),
  profileImage: text("profile_image"),
  cardBackgroundImage: text("card_background_image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const userProfileRelations = relations(userProfile, ({ one }) => ({
  user: one(user, { fields: [userProfile.userId], references: [user.id] }),
}));
