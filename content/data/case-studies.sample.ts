import type { CaseStudy } from "./types";

/** TODO-REAL: real clients, approved results. First three show in the grid; the rest auto-slide beneath. */
export const caseStudies: CaseStudy[] = [
  { slug: "sample-1", client: "Sample Brand A", platform: "SHOPIFY", industry: "HOME & DÉCOR", result: "+142%", backdrop: "#2b2118", people: ["SA", "JM"], sample: true },
  { slug: "sample-2", client: "Sample Brand B", platform: "WOOCOMMERCE", industry: "OUTDOOR", result: "+96%", backdrop: "#e8742c", people: ["TR", "LK"], sample: true },
  { slug: "sample-3", client: "Sample Brand C", platform: "BIGCOMMERCE", industry: "BEAUTY", result: "+210%", backdrop: "#d9dce3", people: ["PD", "NW"], sample: true },
  { slug: "sample-4", client: "Sample Brand D", platform: "SHOPIFY", industry: "APPAREL", result: "+128%", backdrop: "#3b4a6b", people: ["AK", "MR"], sample: true },
  { slug: "sample-5", client: "Sample Brand E", platform: "MAGENTO", industry: "ELECTRONICS", result: "+74%", backdrop: "#1f6f5c", people: ["JT", "SL"], sample: true },
  { slug: "sample-6", client: "Sample Brand F", platform: "WOOCOMMERCE", industry: "PET SUPPLIES", result: "+163%", backdrop: "#b8456b", people: ["CV", "BH"], sample: true },
  { slug: "sample-7", client: "Sample Brand G", platform: "SHOPIFY", industry: "FOOD & BEVERAGE", result: "+89%", backdrop: "#c9a227", people: ["EN", "FO"], sample: true },
];
