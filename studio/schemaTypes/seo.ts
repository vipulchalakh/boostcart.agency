import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      description: "Shown in Google results. Leave empty to use the main title.",
      validation: (rule) => rule.max(60).warning("Keep it under 60 characters"),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: "Shown under the title in Google results. Leave empty to use the excerpt.",
      validation: (rule) => rule.max(160).warning("Keep it under 160 characters"),
    }),
    defineField({
      name: "shareImage",
      title: "Social share image",
      type: "image",
      description: "Shown when the page is shared. Leave empty to use the cover image.",
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
