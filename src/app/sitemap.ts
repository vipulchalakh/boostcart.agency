import type { MetadataRoute } from "next";

/** Only live pages belong here. Add each route as its page ships. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://boostcart.agency/", changeFrequency: "monthly", priority: 1 }];
}
