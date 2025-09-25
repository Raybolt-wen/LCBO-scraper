import { getAllBeverages } from "./scraper";
import { writeFileSync } from "fs";
import { NewBooze } from "./db";
import { drizzle } from "drizzle-orm/d1";


const db = drizzle(env.DB);


async function main() {
  const beverages = await getAllBeverages();

  const entries: NewBooze[] = beverages.results.map(
    (bev) => {
        const newBooze = {
            title: bev.title,
            url: bev.uri,
            alcoholPercent: bev.raw.lcbo_alcohol_percent,
            avgReviews: bev.raw.avg_reviews,
            countryOfManufacture: bev.raw.country_of_manufacture,
            outOfStock: bev.raw.out_of_stock,
            tastingNotes: bev.raw.lcbo_tastingnotes,
            categories: bev.raw.ec_category

        }

        return newBooze
    }
  )

  
}

main().then();
