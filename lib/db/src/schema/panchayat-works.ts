import { pgTable, serial, text, integer, date, timestamp } from "drizzle-orm/pg-core";

export const panchayatWorksTable = pgTable("panchayat_works", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  location: text("location").notNull(),
  description: text("description").notNull(),
  sanctionedAmount: integer("sanctioned_amount").notNull(),
  progress: integer("progress").notNull().default(0),
  status: text("status").notNull(),
  startDate: date("start_date", { mode: "string" }).notNull(),
  targetDate: date("target_date", { mode: "string" }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type PanchayatWork = typeof panchayatWorksTable.$inferSelect;
