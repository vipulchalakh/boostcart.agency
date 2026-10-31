/** `sample: true` items are development placeholders. They must never reach a production build (see scripts/check-content.mjs). */
export type CaseStudy = {
  slug: string;
  client: string;
  platform: string;
  industry: string;
  result: string;
  backdrop: string;
  people: string[];
  sample: boolean;
};

export type Testimonial = {
  quote: string[];
  lead?: string;
  name: string;
  role: string;
  company: string;
  /** Path to the real brand logo (e.g. "/logos/acme.svg"). Falls back to a placeholder mark. */
  logo?: string;
  /** Path to the person's photo. Falls back to an initials avatar. */
  avatar?: string;
  sample: boolean;
};

export type Metric = { value: number; prefix?: string; suffix?: string; label: string; sample: boolean };

export type PricingTier = {
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  featured?: boolean;
  cta: string;
  sample: boolean;
};

export type Faq = { q: string; a: string; sample: boolean };

export type ReviewSummary = { rating: number; count: number; sample: boolean };

export type PostCover = "chart" | "bars" | "rings" | "grid" | "doc" | "link";
export type Post = { slug: string; title: string; category: string; readTime: number; cover: PostCover; sample: boolean };

export type Usp = { id: string; tab: string; title: string; description: string; points: [string, string, string, string]; visual: "store" | "report" | "platforms" | "terms"; sample: boolean };

export type ClientLogo = { name: string; mark: "sun" | "leaf" | "bars" | "cube" | "flower" | "house" | "wave" | "diamond" | "bolt" | "hex"; style: "display" | "serif" | "wide" | "sans" | "mono"; sample: boolean };
