import { defineArrayMember, defineField, defineType } from "sanity";

/** Rich text body shared by blog posts and case studies. */
export const blockContent = defineType({
  name: "blockContent",
  title: "Body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Heading 4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Code", value: "code" },
          { title: "Inline quote", value: "inlineQuote" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({
                name: "href",
                type: "url",
                validation: (rule) =>
                  rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
              }),
              defineField({ name: "openInNewTab", title: "Open in new tab", type: "boolean", initialValue: false }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({ name: "caption", type: "string" }),
      ],
    }),
    defineArrayMember({
      name: "pullQuote",
      title: "Pull quote",
      type: "object",
      fields: [
        defineField({ name: "text", type: "text", rows: 3, validation: (rule) => rule.required() }),
        defineField({ name: "attribution", type: "string", description: "Optional, e.g. Jane Doe, Head of SEO" }),
      ],
      preview: { select: { title: "text", subtitle: "attribution" } },
    }),
    defineArrayMember({
      name: "table",
      title: "Table",
      type: "object",
      fields: [
        defineField({ name: "caption", type: "string", description: "Optional title shown above the table." }),
        defineField({
          name: "hasHeaderRow",
          title: "First row is a header",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "rows",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "tableRow",
              fields: [
                defineField({
                  name: "cells",
                  type: "array",
                  of: [defineArrayMember({ type: "string" })],
                  description: "One entry per column. Keep the same number of cells in every row.",
                }),
              ],
              preview: { select: { cells: "cells" }, prepare: ({ cells }) => ({ title: (cells ?? []).join(" | ") }) },
            }),
          ],
          validation: (rule) => rule.required().min(2),
        }),
      ],
      preview: { select: { title: "caption", rows: "rows" }, prepare: ({ title, rows }) => ({ title: title || "Table", subtitle: `${(rows ?? []).length} rows` }) },
    }),
    defineArrayMember({
      name: "callout",
      title: "Callout box",
      type: "object",
      fields: [
        defineField({
          name: "tone",
          type: "string",
          options: {
            list: [
              { title: "Tip", value: "tip" },
              { title: "Warning", value: "warning" },
              { title: "Note", value: "note" },
            ],
            layout: "radio",
          },
          initialValue: "note",
        }),
        defineField({ name: "text", type: "text", rows: 3, validation: (rule) => rule.required() }),
      ],
      preview: { select: { title: "text", subtitle: "tone" } },
    }),
  ],
});
