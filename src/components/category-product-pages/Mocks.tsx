import { ArrowRight, Check, Minus, Star } from "lucide-react";
import { Tag } from "@/components/ui/Tag";

const shell = "rounded-t-lg border border-b-0 border-ink-05 bg-ink-02 p-4 shadow-xs";
const note = "font-mono text-[10px] uppercase tracking-[0.04em] text-ink-68";
const box = "shadow-[inset_0_0_0_1px_var(--ink-05)]";

/** 1 — Keyword mapping: searches matched to pages. */
export function KeywordMock() {
  const rows: Array<[string, string, "success" | "warn"]> = [
    ["linen shirts men", "/collections/linen-shirts", "success"],
    ["white linen shirt", "/products/white-linen-shirt", "success"],
    ["linen vs cotton shirt", "No page yet", "warn"],
  ];
  return (
    <div className={shell}>
      <ul className="grid grid-cols-[minmax(0,1fr)] gap-2">
        {rows.map(([q, p, t], i) => (
          <li key={q} className={`si flex items-center gap-2 rounded-md bg-white px-3 py-2 ${box}`} style={{ ["--d" as string]: `${i * 120}ms` }}>
            <span className="truncate text-[12px] font-medium text-ink">{q}</span>
            <ArrowRight aria-hidden className="size-3.5 shrink-0 text-accent" />
            <Tag tone={t} className="ml-auto max-w-[55%] shrink-0 truncate normal-case">{p}</Tag>
          </li>
        ))}
      </ul>
      <p className={`${note} mt-3`}>Illustrative</p>
    </div>
  );
}

/** 2 — Titles and meta: a search result preview. */
export function TitleMock() {
  return (
    <div className={shell}>
      <div className={`rounded-md bg-white p-3 ${box}`}>
        <p className="truncate font-mono text-[10px] text-ink-50">yourstore.com › collections › trail-shoes</p>
        <p className="mt-1 text-[14px] font-medium leading-[1.3] text-accent-strong">Trail Running Shoes for Women | Grip &amp; Support</p>
        <p className="mt-1 text-[12px] leading-[1.45] text-ink-68">Compare cushioning, grip and fit across our trail running shoes. Free returns within 30 days.</p>
      </div>
      <p className={`${note} mt-3`}>Title and meta description</p>
    </div>
  );
}

/** 3 — Category copy: layout of a collection page. */
export function LayoutMock() {
  return (
    <div className={shell}>
      <svg role="img" aria-label="Illustration of a collection page layout: heading, short intro, filters, product grid and a guide block" viewBox="0 0 320 130" className="h-32 w-full" fill="none">
        <rect x="8" y="6" width="120" height="10" rx="3" fill="var(--ink)" />
        <rect x="8" y="22" width="220" height="6" rx="3" fill="var(--ink-20)" />
        <rect x="8" y="34" width="170" height="6" rx="3" fill="var(--ink-10)" />
        {[0, 1, 2, 3].map((i) => <rect key={i} x={8 + i * 36} y="48" width="30" height="12" rx="6" fill={i === 1 ? "var(--accent)" : "#fff"} stroke="var(--ink-10)" />)}
        {[0, 1, 2, 3].map((i) => <rect key={i} x={8 + i * 76} y="68" width="68" height="36" rx="6" fill="#fff" stroke="var(--ink-10)" />)}
        <rect x="8" y="112" width="300" height="12" rx="4" fill="var(--yellow)" fillOpacity=".6" />
      </svg>
      <p className={`${note} mt-1`}>Heading · intro · filters · products · guide</p>
    </div>
  );
}

/** 4 — Product pages: a product description checklist. */
export function ProductMock() {
  const rows = ["Specs and sizing", "Who it’s for", "Care and returns", "Reviews"];
  return (
    <div className={shell}>
      <ul className="grid gap-2">
        {rows.map((r, i) => (
          <li key={r} className={`si flex items-center gap-2 rounded-md bg-white px-3 py-2 text-[13px] text-ink ${box}`} style={{ ["--d" as string]: `${i * 120}ms` }}>
            <span className="grid size-4 place-items-center rounded-full bg-success-dot text-white"><Check aria-hidden className="size-2.5" strokeWidth={3.5} /></span>{r}
          </li>
        ))}
      </ul>
      <p className={`${note} mt-3`}>Answers buyers look for</p>
    </div>
  );
}

/** 5 — Internal links: collection to products and guides. */
export function LinkMock() {
  return (
    <div className={shell}>
      <svg role="img" aria-label="Illustration of internal links between a collection, its products and a buying guide" viewBox="0 0 320 130" className="h-32 w-full" fill="none">
        <g stroke="var(--ink-20)" strokeWidth="1.5">
          <path d="M160 34 70 90M160 34 160 90M160 34 250 90M250 90 280 40" />
        </g>
        <rect x="120" y="14" width="80" height="26" rx="6" fill="var(--accent)" />
        {[70, 160, 250].map((x) => <rect key={x} x={x - 28} y="90" width="56" height="26" rx="6" fill="#fff" stroke="var(--ink-10)" />)}
        <rect x="248" y="20" width="60" height="22" rx="6" fill="var(--yellow)" />
      </svg>
      <p className={`${note} mt-1`}>Collection · products · guide</p>
    </div>
  );
}

/** 6 — Structured data: product snippet with rating. */
export function SchemaMock() {
  return (
    <div className={shell}>
      <div className={`flex items-center gap-3 rounded-md bg-white p-3 ${box}`}>
        <span className="grid size-12 shrink-0 place-items-center rounded-md bg-yellow/50"><Minus aria-hidden className="size-5 text-ink" /></span>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-medium text-ink">Linen shirt, white</p>
          <p className="mt-0.5 flex items-center gap-1 text-[11px] text-ink-68">
            <span aria-hidden className="flex text-warn-fg">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="size-3 fill-current" />)}</span>
            Rating · In stock · Price
          </p>
        </div>
      </div>
      <ul className="mt-3 flex flex-wrap gap-2">
        {["Product", "Offer", "Review"].map((t) => (
          <li key={t} className="inline-flex items-center gap-1 rounded-full bg-success-bg px-2.5 py-0.5 text-[12px] font-medium text-success-fg"><Check aria-hidden className="size-3" strokeWidth={3} />{t}</li>
        ))}
      </ul>
    </div>
  );
}
