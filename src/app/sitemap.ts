import type { MetadataRoute } from "next";

/** Only live pages belong here. Add each route as its page ships. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://boostcart.agency/", changeFrequency: "monthly", priority: 1 },
    { url: "https://boostcart.agency/services/technical-seo", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://boostcart.agency/services/category-product-pages", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://boostcart.agency/services/content", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://boostcart.agency/services/link-building", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://boostcart.agency/services/conversion-seo", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://boostcart.agency/services/reporting", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://boostcart.agency/industries/pet-supplies", changeFrequency: "monthly", priority: 0.7 },
  ];
}
