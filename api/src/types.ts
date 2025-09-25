import { DateTime, Str } from "chanfana";
import type { Context } from "hono";
import { z } from "zod";

export type AppContext = Context<{ Bindings: Env }>;

export const Task = z.object({
	name: Str({ example: "lorem" }),
	slug: Str(),
	description: Str({ required: false }),
	completed: z.boolean().default(false),
	due_date: DateTime(),
});

// Zod schema representing a complete Booze object from your database.
export const BoozeSchema = z.object({
  id: z.number(),
  title: z.string(),
  url: z.string(),
  alcoholPercent: z.string(),
  avgReviews: z.number(),
  countryOfManufacture: z.string(),
  outOfStock: z.boolean(),
  tastingNotes: z.string(),
  categories: z.array(z.string()),
});

// Zod schema for the JSON input when creating a new Booze item.
// It uses the BoozeSchema but removes the 'id' field, which is database-generated.
export const NewBoozeSchema = BoozeSchema.omit({ id: true });

