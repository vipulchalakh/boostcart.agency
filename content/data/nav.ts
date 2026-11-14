import { industries } from "./industries";

export type NavLink = { label: string; href: string };
export type NavItem = {
  label: string;
  href?: string;
  /** Dropdown entries (Radix NavigationMenu). */
  children?: Array<NavLink & { description: string }>;
};

export const navItems: NavItem[] = [
  {
    label: "Services",
    children: [
      { label: "Technical SEO", href: "/services/technical-seo", description: "Crawl, speed, indexation and schema fixed at the root." },
      { label: "Category & Product Pages", href: "/services/category-product-pages", description: "Rankable collections that turn searches into carts." },
      { label: "Content & Buying Guides", href: "/services/content", description: "High-intent content that builds trust and traffic." },
      { label: "Link Building", href: "/services/link-building", description: "Editorial links from sites your customers read." },
      { label: "Conversion SEO", href: "/services/conversion-seo", description: "Make organic traffic actually buy." },
      { label: "Reporting", href: "/services/reporting", description: "Know which pages bring revenue, and why." },
    ],
  },
  {
    label: "Platforms",
    children: [
      { label: "Shopify SEO", href: "/platforms/shopify", description: "Collections, apps and theme-level fixes." },
      { label: "WooCommerce SEO", href: "/platforms/woocommerce", description: "WordPress speed and plugin cleanup." },
      { label: "BigCommerce SEO", href: "/platforms/bigcommerce", description: "Faceted navigation and URL structure." },
      { label: "Magento SEO", href: "/platforms/magento", description: "Large catalogs, handled with care." },
      { label: "Headless SEO", href: "/platforms/headless", description: "Rendering, routing and structured data." },
    ],
  },
  {
    label: "Industries",
    children: industries.map((i) => ({ label: i.label, href: `/industries/${i.slug}`, description: i.focus.slice(0, 2).join(" · ") })),
  },
  { label: "Case Studies", href: "/case-studies" },
  {
    label: "Resources",
    children: [
      { label: "Blog", href: "/blog", description: "Practical e-commerce SEO articles." },
      { label: "Research", href: "/research", description: "E-commerce SEO research and guides." },
      { label: "Checklists", href: "/e-commerce-seo-checklists", description: "Fix-it lists you can use today." },
      { label: "Free SEO Audit", href: "/free-audit", description: "Get a prioritized plan for your store." },
    ],
  },
  {
    label: "About",
    children: [
      { label: "About BoostCart", href: "/about", description: "Who we are and how we work." },
      { label: "Contact", href: "/contact", description: "Send a message or find our offices." },
    ],
  },
];

export const auditHref = "/free-audit";
/** Not a real page: every link to this opens the Cal.com booking pop-up (see AppLink). */
export const bookCallHref = "/book-a-call";
