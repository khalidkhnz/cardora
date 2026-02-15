import { relations } from "drizzle-orm";
import { pgTableCreator, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

const createTable = pgTableCreator((name) => `cardora_${name}`);

export const analyticsEvent = createTable("analytics_event", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  type: text("type")
    .$type<"profile_view" | "qr_scan" | "nfc_tap" | "link_click">()
    .notNull(),
  deviceType: text("device_type").$type<"mobile" | "tablet" | "desktop">(),
  userAgent: text("user_agent"),
  ipAddress: text("ip_address"),
  referer: text("referer"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const analyticsEventRelations = relations(analyticsEvent, ({ one }) => ({
  user: one(user, { fields: [analyticsEvent.userId], references: [user.id] }),
}));
