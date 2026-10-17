/* Qualification criteria for "who it's for / not for". Owner to review: these are positioning statements, not proof. */
export type FitItem = { title: string; text: string };

export const goodFit: FitItem[] = [
  { title: "Established online stores", text: "You're already selling, with a real catalog and some traffic to build on." },
  { title: "Owners tired of renting traffic", text: "You want durable organic revenue, not results that vanish when ad spend stops." },
  { title: "Teams who want one partner", text: "You'd rather one team own technical fixes, content and links together." },
  { title: "Brands playing the long game", text: "You can invest for a few months while results compound." },
  { title: "Shopify, WooCommerce, BigCommerce, Magento or headless", text: "We know the quirks of each platform inside out." },
  { title: "Leaders who need clear reporting", text: "You want to see which pages bring revenue, in a report you can share." },
];

export const notFit: FitItem[] = [
  { title: "Stores that haven't launched", text: "With no products or traffic yet, validate the idea and start with ads first." },
  { title: "Anyone expecting overnight rankings", text: "SEO compounds over months. Quick-win promises aren't honest." },
  { title: "Anyone who wants a guaranteed #1", text: "Nobody can guarantee it, and we won't pretend to." },
  { title: "Bargain link schemes", text: "We don't buy links or use shortcuts that risk penalties." },
  { title: "Teams with no room to implement", text: "Fixes and content need to ship. If nothing can change, results stall." },
  { title: "Businesses that don't sell online", text: "Our work is built around products, categories and carts." },
];
