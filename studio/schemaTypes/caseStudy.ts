import { defineArrayMember, defineField, defineType } from "sanity";
import { TrendUpwardIcon } from "@sanity/icons/TrendUpward";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  icon: TrendUpwardIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: "Page headline, e.g. “How Acme grew organic revenue 142% in 6 months”.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      description: "The page address: boostcart.agency/case-studies/<slug>",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "clientName", title: "Client name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "clientLogo",
      type: "image",
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({
      name: "platform",
      type: "string",
      options: {
        list: [
          { title: "Shopify", value: "shopify" },
          { title: "WooCommerce", value: "woocommerce" },
          { title: "BigCommerce", value: "bigcommerce" },
          { title: "Magento", value: "magento" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "industry",
      type: "string",
      description: "e.g. Pet supplies, Beauty, Apparel",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "headlineResult",
      title: "Headline result",
      type: "string",
      description: "The one big number shown on cards, e.g. +142%",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "headlineResultLabel",
      title: "Headline result label",
      type: "string",
      description: "What the number means, e.g. organic revenue",
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 3,
      description: "Short summary shown on cards and used for SEO.",
      validation: (rule) => rule.required().max(240).warning("Keep it under 240 characters"),
    }),
    defineField({
      name: "coverImage",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "services",
      title: "Services provided",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "duration",
      title: "Engagement length",
      type: "string",
      description: "e.g. 6 months",
    }),
    defineField({
      name: "metrics",
      title: "Result metrics",
      description: "Numbers shown in the results band. Add 2 to 4.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "metric",
          fields: [
            defineField({ name: "value", type: "string", description: "e.g. +142%", validation: (rule) => rule.required() }),
            defineField({ name: "label", type: "string", description: "e.g. Organic revenue", validation: (rule) => rule.required() }),
            defineField({ name: "detail", type: "string", description: "Optional, e.g. vs. previous 6 months" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
      validation: (rule) => rule.min(2).max(4),
    }),
    defineField({ name: "challenge", type: "blockContent" }),
    defineField({ name: "approach", type: "blockContent" }),
    defineField({ name: "outcome", type: "blockContent" }),
    defineField({
      name: "testimonial",
      type: "object",
      fields: [
        defineField({ name: "quote", type: "text", rows: 3 }),
        defineField({ name: "personName", title: "Person name", type: "string" }),
        defineField({ name: "personRole", title: "Person role", type: "string" }),
        defineField({
          name: "personPhoto",
          type: "image",
          fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "relatedCaseStudies",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "caseStudy" }] })],
      validation: (rule) => rule.max(3),
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  orderings: [
    { title: "Newest first", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "clientName", media: "coverImage" },
  },
});
