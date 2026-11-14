/* Qualification criteria for "who it's for / not for". Owner to review: these are positioning statements, not proof. */
export type FitItem = { title: string; text: string };

export const goodFit: FitItem[] = [
  { title: "Online stores already making sales", text: "You have a live catalog, steady orders and some organic traffic to build on." },
  { title: "Shopify, WooCommerce, BigCommerce, Magento or headless", text: "Product, collection and faceted-navigation problems are different on each platform, and we fix them at the theme and settings level." },
  { title: "Owners who want to lean less on paid ads", text: "You want organic revenue that keeps coming when ad spend or rising ad costs stop paying off." },
  { title: "Brands with a big or growing catalog", text: "Hundreds or thousands of products, variants and categories need structure before they can rank and get cited." },
  { title: "Teams that want to be found in AI answers too", text: "You want your products recommended in Google, ChatGPT, Perplexity and AI Overviews, not only ranked in blue links." },
  { title: "Leaders who want to see revenue, not just rankings", text: "You get a monthly report tying organic revenue to the pages behind it, and you can ship fixes when we hand them over." },
];

export const notFit: FitItem[] = [
  { title: "Stores that haven't launched yet", text: "With no products, orders or traffic, SEO has little to work with. Validate demand first, then talk to us." },
  { title: "Local, service or B2B lead-gen sites", text: "We specialise in stores with product and category pages, carts and checkouts, not lead forms or local listings." },
  { title: "Marketplace-only sellers", text: "If you sell only on Amazon or Etsy and don't own a store, there is no site of yours for us to optimise." },
  { title: "Anyone expecting overnight rankings", text: "Organic growth builds over months. We won't promise quick wins or a guaranteed #1 or AI mention." },
  { title: "Bargain link or content-spam packages", text: "We don't buy links, mass-produce thin pages or use shortcuts that risk a penalty." },
  { title: "Teams that can't change their store", text: "Fixes and content have to ship. If nothing on the site can change, results stall." },
];
