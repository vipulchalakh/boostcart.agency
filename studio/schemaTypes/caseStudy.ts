import { defineArrayMember, defineField, defineType } from "sanity";
import { TrendUpwardIcon } from "@sanity/icons/TrendUpward";
import { MarkdownImportInput } from "../components/MarkdownImportInput";

/** Two numbers: where the client started and where they ended up. */
const beforeAfter = (name: string, title: string, description: string) =>
  defineField({
    name,
    title,
    description,
    type: "object",
    options: { columns: 2 },
    fields: [
      defineField({ name: "before", type: "number", validation: (rule) => rule.required().min(0) }),
      defineField({ name: "after", type: "number", validation: (rule) => rule.required().min(0) }),
    ],
    validation: (rule) => rule.required(),
  });

/** Every case study body follows this outline (each is a Heading 2, so it feeds the table of contents). */
const BODY_SECTIONS = ["Executive summary", "Challenges", "Our approach", "Executive roadmap", "Results"];

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  icon: TrendUpwardIcon,
  groups: [
    { name: "overview", title: "Overview", default: true },
    { name: "results", title: "Results" },
    { name: "client", title: "Client" },
    { name: "content", title: "Content" },
    { name: "seo", title: "SEO & related" },
  ],
  fields: [
    /* ---------- Overview ---------- */
    defineField({
      name: "title",
      type: "string",
      group: "overview",
      description: "Page headline, e.g. “How Acme grew organic revenue 142% in 6 months”.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "overview",
      description: "The page address: boostcart.agency/case-studies/<slug>",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "platform",
      type: "string",
      group: "overview",
      options: {
        list: [
          { title: "Shopify", value: "Shopify" },
          { title: "WooCommerce", value: "WooCommerce" },
          { title: "BigCommerce", value: "BigCommerce" },
          { title: "Magento", value: "Magento" },
          { title: "Headless", value: "Headless" },
          { title: "Other", value: "Other" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "industry",
      type: "string",
      group: "overview",
      description: "e.g. Pet supplies, Beauty, Apparel",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 3,
      group: "overview",
      description: "Short summary shown on case study cards and used for SEO.",
      validation: (rule) => rule.required().max(240).warning("Keep it under 240 characters"),
    }),
    defineField({
      name: "coverImage",
      title: "Featured image",
      type: "image",
      group: "overview",
      description: "A performance screenshot (Google Search Console, Ahrefs, analytics). Shown beside the title and on cards.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Describe what the screenshot shows.",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),

    /* ---------- Results ---------- */
    defineField({
      name: "organicRevenueGrowth",
      title: "Organic revenue growth (%)",
      type: "number",
      group: "results",
      description: "Whole number, e.g. 142 for +142%.",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "organicTrafficGrowth",
      title: "Organic traffic growth (%)",
      type: "number",
      group: "results",
      description: "Whole number, e.g. 96 for +96%.",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "timelineMonths",
      title: "Timeline (months)",
      type: "number",
      group: "results",
      validation: (rule) => rule.required().integer().min(1).max(60),
    }),
    defineField({
      name: "beforeAfter",
      title: "Before vs. after",
      type: "object",
      group: "results",
      description: "Numbers at the start of the engagement versus the end.",
      fields: [
        beforeAfter("organicKeywords", "Organic keywords", "Keywords ranking in the top 100."),
        beforeAfter("organicTraffic", "Organic traffic", "Monthly organic visits."),
        beforeAfter("organicRevenue", "Organic revenue", "Monthly organic revenue, as a plain number (no currency symbol)."),
        defineField({
          name: "revenueCurrency",
          title: "Revenue currency",
          type: "string",
          options: {
            list: [
              { title: "US dollar ($)", value: "USD" },
              { title: "Canadian dollar (CA$)", value: "CAD" },
              { title: "British pound (£)", value: "GBP" },
              { title: "Euro (€)", value: "EUR" },
              { title: "Australian dollar (A$)", value: "AUD" },
            ],
            layout: "radio",
          },
          initialValue: "USD",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),

    /* ---------- Client ---------- */
    defineField({ name: "clientName", title: "Client name", type: "string", group: "client", validation: (rule) => rule.required() }),
    defineField({
      name: "clientLogo",
      title: "Client logo",
      type: "image",
      group: "client",
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({
      name: "clientDescription",
      title: "Client description",
      type: "text",
      rows: 2,
      group: "client",
      description: "Two short lines about the company.",
      validation: (rule) => rule.required().max(160).warning("Keep it under 160 characters so it fits on two lines"),
    }),
    defineField({
      name: "clientWebsite",
      title: "Client website",
      type: "url",
      group: "client",
      validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }),
    }),

    /* ---------- Content ---------- */
    defineField({
      name: "body",
      title: "Case study body",
      type: "blockContent",
      group: "content",
      components: { input: MarkdownImportInput },
      description: "Write under each heading: Executive summary, Challenges, Our approach, Executive roadmap, Results. Keep them as Heading 2 so they appear in the table of contents.",
      initialValue: () =>
        BODY_SECTIONS.flatMap((heading, i) => [
          { _type: "block", _key: `h${i}`, style: "h2", markDefs: [], children: [{ _type: "span", _key: `h${i}s`, text: heading, marks: [] }] },
          { _type: "block", _key: `p${i}`, style: "normal", markDefs: [], children: [{ _type: "span", _key: `p${i}s`, text: "", marks: [] }] },
        ]),
      validation: (rule) =>
        rule.required().custom((blocks) => {
          const found = new Set(
            ((blocks as { style?: string; children?: { text?: string }[] }[] | undefined) ?? [])
              .filter((b) => b.style === "h2")
              .map((b) => (b.children ?? []).map((c) => c.text ?? "").join("").trim().toLowerCase()),
          );
          const missing = BODY_SECTIONS.filter((h) => !found.has(h.toLowerCase()));
          return missing.length ? { message: `Missing Heading 2 section: ${missing.join(", ")}`, level: "warning" } : true;
        }),
    }),
    defineField({
      name: "publishedAt",
      title: "Published date",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),

    /* ---------- SEO & related ---------- */
    defineField({
      name: "relatedCaseStudies",
      type: "array",
      group: "seo",
      description: "Up to 3. If you leave this empty, similar case studies (same industry or platform) are shown.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "caseStudy" }] })],
      validation: (rule) => rule.max(3),
    }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  orderings: [{ title: "Newest first", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "clientName", media: "coverImage" },
  },
});
