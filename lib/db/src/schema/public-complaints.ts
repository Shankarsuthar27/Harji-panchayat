import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const publicComplaintsTable = pgTable("public_complaints", {
  reference: text("reference").primaryKey(),
  fullName: text("full_name").notNull(),
  area: text("area").notNull(),
  mobile: text("mobile").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  submittedAt: timestamp("submitted_at", { withTimezone: true }).notNull().defaultNow(),
});

export type PublicComplaint = typeof publicComplaintsTable.$inferSelect;
