/** Converts Markdown into Portable Text blocks that match the `blockContent` schema (headings, lists, quotes, tables, bold/italic/code/links). */

type Span = { _type: "span"; _key: string; text: string; marks: string[] };
type MarkDef = { _type: "link"; _key: string; href: string; openInNewTab: boolean };
type Block = {
  _type: "block";
  _key: string;
  style: "normal" | "h2" | "h3" | "h4" | "blockquote";
  children: Span[];
  markDefs: MarkDef[];
  listItem?: "bullet" | "number";
  level?: number;
};
type Table = { _type: "table"; _key: string; hasHeaderRow: boolean; rows: { _type: "tableRow"; _key: string; cells: string[] }[] };
export type PortableTextBlock = Block | Table;

export type MarkdownImportResult = { blocks: PortableTextBlock[]; skippedImages: number };

let counter = 0;
const key = () => `md${Date.now().toString(36)}${(counter++).toString(36)}${Math.random().toString(36).slice(2, 6)}`;

const SAFE_HREF = /^(https?:|mailto:|tel:|\/|#)/i;

/** Inline markdown -> spans. Handles `code`, **bold**, *italic*, ***both***, [text](url). */
function parseInline(source: string, state: { skippedImages: number }): { children: Span[]; markDefs: MarkDef[] } {
  const children: Span[] = [];
  const markDefs: MarkDef[] = [];

  const push = (text: string, marks: string[]) => {
    if (!text) return;
    const last = children[children.length - 1];
    if (last && last.marks.length === marks.length && last.marks.every((m, i) => m === marks[i])) last.text += text;
    else children.push({ _type: "span", _key: key(), text, marks });
  };

  const walk = (text: string, marks: string[]) => {
    let i = 0;
    let plain = "";
    const flush = () => {
      push(plain, marks);
      plain = "";
    };
    while (i < text.length) {
      const rest = text.slice(i);

      // Escaped character
      if (text[i] === "\\" && i + 1 < text.length && /[\\`*_{}[\]()#+\-.!>|]/.test(text[i + 1])) {
        plain += text[i + 1];
        i += 2;
        continue;
      }

      // Image: dropped (images are added with the Image button)
      const img = rest.match(/^!\[[^\]]*\]\([^)]*\)/);
      if (img) {
        state.skippedImages += 1;
        i += img[0].length;
        continue;
      }

      // Inline code
      const code = rest.match(/^`([^`]+)`/);
      if (code) {
        flush();
        push(code[1], [...marks, "code"]);
        i += code[0].length;
        continue;
      }

      // Link
      const link = rest.match(/^\[([^\]]+)\]\(\s*([^)\s]+)(?:\s+"[^"]*")?\s*\)/);
      if (link) {
        flush();
        if (SAFE_HREF.test(link[2])) {
          const def: MarkDef = { _type: "link", _key: key(), href: link[2], openInNewTab: /^https?:/i.test(link[2]) };
          markDefs.push(def);
          walk(link[1], [...marks, def._key]);
        } else {
          walk(link[1], marks);
        }
        i += link[0].length;
        continue;
      }

      // Bold + italic, bold, italic
      const strongEm = rest.match(/^(\*\*\*|___)(?=\S)([\s\S]*?\S)\1/);
      if (strongEm) {
        flush();
        walk(strongEm[2], [...marks, "strong", "em"]);
        i += strongEm[0].length;
        continue;
      }
      const strong = rest.match(/^(\*\*|__)(?=\S)([\s\S]*?\S)\1/);
      if (strong) {
        flush();
        walk(strong[2], [...marks, "strong"]);
        i += strong[0].length;
        continue;
      }
      const em = rest.match(/^(\*|_)(?=\S)([\s\S]*?\S)\1(?!\w)/);
      if (em && (text[i] === "*" || i === 0 || !/\w/.test(text[i - 1]))) {
        flush();
        walk(em[2], [...marks, "em"]);
        i += em[0].length;
        continue;
      }

      plain += text[i];
      i += 1;
    }
    flush();
  };

  walk(source, []);
  return { children: children.length ? children : [{ _type: "span", _key: key(), text: "", marks: [] }], markDefs };
}

/** Removes inline markup, for table cells (which are plain strings in the schema). */
function plainText(source: string): string {
  return source
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/(\*\*\*|___|\*\*|__|`)/g, "")
    .replace(/(^|\s)[*_](\S[^*_]*\S|\S)[*_](?=\s|$|[.,;:!?])/g, "$1$2")
    .replace(/\\([\\`*_{}[\]()#+\-.!>|])/g, "$1")
    .trim();
}

function splitRow(line: string): string[] {
  let s = line.trim();
  if (s.startsWith("|")) s = s.slice(1);
  if (s.endsWith("|") && !s.endsWith("\\|")) s = s.slice(0, -1);
  return s.split(/(?<!\\)\|/).map((c) => plainText(c.replace(/\\\|/g, "|")));
}

const isTableSeparator = (line: string) => /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(line) && line.includes("-");
const isTableRow = (line: string) => line.includes("|");

export function markdownToPortableText(markdown: string): MarkdownImportResult {
  const state = { skippedImages: 0 };
  let text = markdown.replace(/^﻿/, "").replace(/\r\n?/g, "\n").replace(/\t/g, "  ");

  // Strip YAML front matter
  text = text.replace(/^---\n[\s\S]*?\n---\n?/, "");

  const lines = text.split("\n");

  // `#` and `##` both become Heading 2, `###` Heading 3, deeper levels Heading 4. A lone leading `# Title` is dropped
  // when `##` sections follow, because the page headline already comes from the Title field.
  const headingLines = lines.filter((l) => /^#{1,6}\s+\S/.test(l));
  const h1Count = headingLines.filter((l) => /^#\s/.test(l)).length;
  const firstContent = lines.findIndex((l) => l.trim());
  const dropTitle = h1Count === 1 && /^#\s/.test(lines[firstContent] ?? "") && headingLines.some((l) => /^##\s/.test(l));
  if (dropTitle) lines.splice(firstContent, 1);
  const headingStyle = (level: number): Block["style"] => (level <= 2 ? "h2" : level === 3 ? "h3" : "h4");

  const blocks: PortableTextBlock[] = [];
  const isEmpty = (b: Block) => b.children.every((c) => !c.text.trim());
  const makeBlock = (source: string, extra: Partial<Block> = {}): Block => {
    const { children, markDefs } = parseInline(source, state);
    return { _type: "block", _key: key(), style: "normal", children, markDefs, ...extra };
  };

  let paragraph: string[] = [];
  const flushParagraph = () => {
    if (paragraph.length) {
      const block = makeBlock(paragraph.join(" "));
      if (!isEmpty(block)) blocks.push(block);
    }
    paragraph = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Fenced code: one block, code mark, line breaks kept
    if (/^\s*```/.test(line)) {
      flushParagraph();
      const codeLines: string[] = [];
      i += 1;
      while (i < lines.length && !/^\s*```/.test(lines[i])) {
        codeLines.push(lines[i]);
        i += 1;
      }
      const code = codeLines.join("\n").trim();
      if (code) blocks.push({ _type: "block", _key: key(), style: "normal", markDefs: [], children: [{ _type: "span", _key: key(), text: code, marks: ["code"] }] });
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      continue;
    }

    // Horizontal rule
    if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(line)) {
      flushParagraph();
      continue;
    }

    // Heading
    const heading = line.match(/^(#{1,6})\s+(.*?)\s*#*\s*$/);
    if (heading) {
      flushParagraph();
      blocks.push(makeBlock(heading[2], { style: headingStyle(heading[1].length) }));
      continue;
    }

    // Table: a row followed by a separator row
    if (isTableRow(line) && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
      flushParagraph();
      const rows = [splitRow(line)];
      i += 2;
      while (i < lines.length && lines[i].trim() && isTableRow(lines[i])) {
        rows.push(splitRow(lines[i]));
        i += 1;
      }
      i -= 1;
      const width = Math.max(...rows.map((r) => r.length));
      blocks.push({
        _type: "table",
        _key: key(),
        hasHeaderRow: true,
        rows: rows.map((cells) => ({ _type: "tableRow", _key: key(), cells: Array.from({ length: width }, (_, c) => cells[c] ?? "") })),
      });
      continue;
    }

    // Blockquote
    if (/^\s*>/.test(line)) {
      flushParagraph();
      const quote: string[] = [];
      while (i < lines.length && /^\s*>/.test(lines[i])) {
        quote.push(lines[i].replace(/^\s*>\s?/, ""));
        i += 1;
      }
      i -= 1;
      blocks.push(makeBlock(quote.join(" ").trim(), { style: "blockquote" }));
      continue;
    }

    // List item (bullet or numbered), nesting by indentation
    const item = line.match(/^(\s*)([-*+]|\d+[.)])\s+(.*)$/);
    if (item) {
      flushParagraph();
      const level = Math.min(3, Math.floor(item[1].length / 2) + 1);
      let content = item[3];
      // Indented continuation lines belong to the same item
      while (i + 1 < lines.length && lines[i + 1].trim() && /^\s{2,}\S/.test(lines[i + 1]) && !/^\s*([-*+]|\d+[.)])\s+/.test(lines[i + 1])) {
        content += ` ${lines[i + 1].trim()}`;
        i += 1;
      }
      blocks.push(makeBlock(content, { listItem: /^\d/.test(item[2]) ? "number" : "bullet", level }));
      continue;
    }

    paragraph.push(line.trim());
  }
  flushParagraph();

  return { blocks, skippedImages: state.skippedImages };
}
