export interface LCBOResult {
  // ...
  results: {
    title: string;
    uri: string;
    raw: {
      lcbo_alcohol_percent: number;
      avg_reviews: number;
      country_of_manufacture: string;
      out_of_stock: boolean;
      lcbo_tastingnotes: string;
      ec_category: string[];
    };
  }[];
}
