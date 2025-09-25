import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const Booze = sqliteTable("boozes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  url: text("url").notNull(),
  alcoholPercent: text("alcohol_percent").notNull(),
  avgReviews: integer("avg_reviews").notNull(),
  countryOfManufacture: text("country_of_manufacture").notNull(),
  outOfStock: integer("out_of_stock", { mode: "boolean" }).notNull(),
  tastingNotes: text("tasting_notes").notNull(),
  categories: text("categories", {
    mode: "json",
  })
    .notNull()
    .$type<string[]>()
    .default(sql`(json_array())`),
});
