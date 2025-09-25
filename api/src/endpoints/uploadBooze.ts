import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { type AppContext, BoozeSchema, NewBoozeSchema } from "../types"; // <-- Import schemas
import { getDb } from "../db";
import * as schema from "../scraper/schema";

export class BoozeCreate extends OpenAPIRoute {
    // Define the OpenAPI documentation for this endpoint
    schema = {
        tags: ["Booze"],
        summary: "Create a new Booze item",
        // This 'request' section is what enables JSON input in Swagger
        request: {
            body: {
                content: {
                    "application/json": {
                        schema: NewBoozeSchema, // Use the schema for the input body
                    },
                },
            },
        },
        responses: {
            "201": {
                description: "Returns the newly created booze item",
                content: {
                    "application/json": {
                        schema: BoozeSchema, // The response will include the 'id'
                    },
                },
            },
        },
    };

    // This method handles the actual request
    async handle(c: AppContext) {
        const db = getDb(c.env.DB);

        // Get the validated data from the request body
        const data = await this.getValidatedData<typeof this.schema>();
        const newBoozeData = data.body;

        // Insert the new item into the database and get the result
        const [createdBooze] = await db
            .insert(schema.Booze)
            .values(newBoozeData)
            .returning();

        c.status(201); // Set HTTP status to 201 Created
        return createdBooze;
    }
}
