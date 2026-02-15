import { integer, pgTableCreator, text, timestamp } from "drizzle-orm/pg-core";

const createTable = pgTableCreator((name) => `cardora_${name}`);

export const rsvp = createTable("rsvp", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  inviteSlug: text("invite_slug").notNull(),
  guestName: text("guest_name").notNull(),
  guestEmail: text("guest_email"),
  phone: text("phone"),
  attending: text("attending")
    .$type<"yes" | "no" | "maybe">()
    .notNull(),
  numberOfGuests: integer("number_of_guests").default(1).notNull(),
  dietaryRestrictions: text("dietary_restrictions"),
  message: text("message"),
  status: text("status")
    .$type<"pending" | "confirmed" | "declined">()
    .default("pending")
    .notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});
