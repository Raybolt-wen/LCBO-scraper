CREATE TABLE `boozes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`url` text NOT NULL,
	`alcohol_percent` text NOT NULL,
	`avg_reviews` integer NOT NULL,
	`country_of_manufacture` text NOT NULL,
	`out_of_stock` integer NOT NULL,
	`tasting_notes` text NOT NULL,
	`categories` text DEFAULT (json_array()) NOT NULL
);
