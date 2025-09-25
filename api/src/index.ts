import { fromHono } from "chanfana";
import { Hono } from "hono";
import { TaskCreate } from "./endpoints/taskCreate";
import { TaskDelete } from "./endpoints/taskDelete";
import { TaskFetch } from "./endpoints/taskFetch";
import { TaskList } from "./endpoints/taskList";
import { getAllBeverages } from "./scraper";
import { getDb } from "./db";
import { Booze } from "./scraper/schema";
import { NewBooze } from "./db";
import { BoozeCreate } from "./endpoints/uploadBooze";


// Start a Hono app
const app = new Hono<{ Bindings: Env }>();

// Setup OpenAPI registry
const openapi = fromHono(app, {
  docs_url: "/",
});

async function runScrapeAndSave(env: Env) {
  // 1. Initialize the database
  const db = getDb(env.DB);
  console.log("Fetching beverages from LCBO...");

  // 2. Fetch the data
  const lcboData = await getAllBeverages();
  const beverages = lcboData.results;

  // 3. Transform the data (This is your logic from test.ts)
  const boozeToInsert: NewBooze[] = beverages.map((bev) => {
    return {
      title: bev.title,
      url: bev.uri,
      alcoholPercent: `${bev.raw.lcbo_alcohol_percent / 100}%`,
      avgReviews: bev.raw.avg_reviews,
      countryOfManufacture: bev.raw.country_of_manufacture,
      outOfStock: bev.raw.out_of_stock,
      tastingNotes: bev.raw.lcbo_tastingnotes || "N/A",
      categories: bev.raw.ec_category,
    };
  });

  console.log(`Found ${boozeToInsert.length} products to save.`);

  // 4. Save the transformed data to the database
  for (const booze of boozeToInsert) {
    await db
      .insert(Booze)
      .values(booze)
      .onConflictDoUpdate({
        target: Booze.url,
        set: {
          avgReviews: booze.avgReviews,
          outOfStock: booze.outOfStock,
        },
      });
  }

  console.log(`Successfully saved ${boozeToInsert.length} products.`);
  return { success: true, count: boozeToInsert.length };
}

// Register OpenAPI endpoints
openapi.get("/api/tasks", TaskList);
openapi.post("/api/tasks", TaskCreate);
openapi.get("/api/tasks/:taskSlug", TaskFetch);
openapi.delete("/api/tasks/:taskSlug", TaskDelete);
openapi.post("/api/booze", BoozeCreate);

// You may also register routes for non OpenAPI directly on Hono
// app.get('/test', (c) => c.text('Hono!'))

// Export the Hono app
export default app;
