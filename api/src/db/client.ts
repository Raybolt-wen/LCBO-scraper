import { drizzle } from "drizzle-orm/d1";
// i dont like wildcare import, but seems necessary
import * as schema from "../scraper/schema";

export function getDb(d1: D1Database) {
  return drizzle(d1, { schema });
}

export type Booze = typeof schema.Booze.$inferSelect;
export type NewBooze = typeof schema.Booze.$inferInsert;
