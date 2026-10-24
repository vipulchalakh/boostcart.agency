export type Heading = { id: string; text: string; level: 2 | 3 };

type BodyBlock = { _type: string; _key: string; style?: string; children?: { text?: string }[] };

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

/** Collects headings from rich text. Every h2/h3 gets an anchor id, but only h2s are listed in the table of contents. */
export function extractHeadings(body: readonly unknown[] | null | undefined) {
  const headings: Heading[] = [];
  const ids: Record<string, string> = {};
  const used = new Set<string>();

  for (const raw of body ?? []) {
    const block = raw as BodyBlock;
    if (block._type !== "block" || (block.style !== "h2" && block.style !== "h3")) continue;
    const text = (block.children ?? []).map((c) => c.text ?? "").join("").trim();
    if (!text) continue;

    const base = slugify(text) || "section";
    let id = base;
    for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
    used.add(id);

    ids[block._key] = id;
    if (block.style === "h2") headings.push({ id, text, level: 2 });
  }
  return { headings, ids };
}

/** UTC so server and browser always print the same day. */
export function formatDate(iso: string | null | undefined) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(iso));
}
