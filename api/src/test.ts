import { getAllBeverages } from "./scraper";
import { writeFileSync } from "fs";
async function main() {
    const beverages = await getAllBeverages();


    writeFileSync(
        "test.json",
        JSON.stringify(beverages, null, 2)
    )
    
    console.log(beverages.results.length)
}

main().then()
