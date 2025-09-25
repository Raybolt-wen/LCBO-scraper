import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  // driver: 'd1-http',
  dbCredentials: {
    url: ".wrangler/state/v3/d1/miniflare-D1DatabaseObject/93c5d8afe09741abd89485f8daacee6fbaee78ef98b6c4d00360b467ac506130.sqlite",
  },
});
