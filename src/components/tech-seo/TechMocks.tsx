import { ArrowRight, Check, Minus, X } from "lucide-react";
import { Tag } from "@/components/ui/Tag";

const shell = "rounded-t-lg border border-b-0 border-ink-05 bg-ink-02 p-4 shadow-xs";
const mono = "font-mono text-[12px] leading-5";
const note = "font-mono text-[10px] uppercase tracking-[0.04em] text-ink-68";

/** 1 — Crawlability and indexation: URLs with index status. */
export function IndexMock() {
  const rows: Array<[string, string, "success" | "warn" | "danger"]> = [
    ["/collections/trail", "Indexed", "success"],
    ["/products/ridge-runner", "Indexed", "success"],
    ["/collections/trail?sort=new", "Excluded", "warn"],
    ["/products/summit-jacket", "Noindex", "danger"],
  ];
  return (
    <div className={shell}>
      <ul className="grid grid-cols-[minmax(0,1fr)] gap-2">
        {rows.map(([u, s, t], i) => (
          <li key={u} className="si flex items-center justify-between gap-3 rounded-md bg-white px-3 py-2 shadow-[inset_0_0_0_1px_var(--ink-05)]" style={{ ["--d" as string]: `${i * 120}ms` }}>
            <span className={`${mono} truncate text-ink-68`}>{u}</span>
            <Tag tone={t}>{s}</Tag>
          </li>
        ))}
      </ul>
      <p className={`${note} mt-3`}>Illustrative</p>
    </div>
  );
}

/** 2 — Site architecture: home → categories → products. */
export function ArchitectureMock() {
  return (
    <div className={shell}>
      <svg role="img" aria-label="Illustration of a store hierarchy from home to categories to products" viewBox="0 0 320 130" className="h-32 w-full" fill="none">
        <g stroke="var(--ink-20)" strokeWidth="1.5">
          <path d="M160 26V44M70 44H250M70 44V60M160 44V60M250 44V60M70 86V96M160 86V96M250 86V96" />
        </g>
        <rect x="130" y="6" width="60" height="22" rx="6" fill="var(--ink)" />
        {[70, 160, 250].map((x, i) => (
          <g key={x}>
            <rect x={x - 32} y="60" width="64" height="26" rx="6" fill={i === 1 ? "var(--accent)" : "#fff"} stroke={i === 1 ? "var(--accent)" : "var(--ink-10)"} />
            {[0, 1, 2].map((j) => (
              <rect key={j} x={x - 30 + j * 21} y="98" width="18" height="18" rx="4" fill="#fff" stroke="var(--ink-10)" />
            ))}
          </g>
        ))}
      </svg>
      <p className={`${note} mt-1`}>Home · categories · products</p>
    </div>
  );
}

/** 3 — Canonicals: URL variants consolidating into one. */
export function CanonicalMock() {
  const vars = ["/shoes?color=red", "/shoes?sort=price", "/shoes?variant=44"];
  return (
    <div className={`${shell} grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3`}>
      <ul className="grid grid-cols-[minmax(0,1fr)] gap-1.5">
        {vars.map((v) => <li key={v} className={`${mono} truncate rounded-sm bg-white px-2 py-1 text-ink-68 shadow-[inset_0_0_0_1px_var(--ink-05)]`}>{v}</li>)}
      </ul>
      <ArrowRight aria-hidden className="size-5 text-accent" />
      <div className="rounded-md bg-accent px-3 py-3 text-center text-white">
        <p className="font-mono text-[12px] leading-5">/shoes</p>
        <p className="text-[11px] opacity-80">preferred URL</p>
      </div>
    </div>
  );
}

function RenderCol({ title, ok }: { title: string; ok: boolean }) {
  return (
    <div className="rounded-md bg-white p-3 shadow-[inset_0_0_0_1px_var(--ink-05)]">
      <p className={note}>{title}</p>
      <ul className="mt-2 grid gap-1.5 text-[12px] leading-4">
        {([["Title", true], ["Price", ok], ["Reviews", ok]] as const).map(([l, v]) => (
          <li key={l} className="flex items-center gap-1.5">
            {v ? <Check aria-hidden className="size-3.5 text-success-fg" /> : <X aria-hidden className="size-3.5 text-danger-fg" />}
            <span className={v ? "text-ink" : "text-ink-50"}>{l}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 4 — Rendering: raw HTML against rendered page. */
export function RenderMock() {
  return (
    <div className={`${shell} grid grid-cols-2 gap-3`}>
      <RenderCol title="Raw HTML" ok={false} />
      <RenderCol title="Rendered" ok />
    </div>
  );
}

/** 5 — Structured data: a Product snippet with checks. */
export function SchemaMock() {
  return (
    <div className={shell}>
      <pre className="overflow-hidden rounded-md bg-panel-navy p-3 font-mono text-[11px] leading-[18px] text-white"><code>{`{ "@type": "Product",
  "name": "Ridge Runner GTX",
  "offers": { "price": "…",
    "availability": "InStock" } }`}</code></pre>
      <ul className="mt-3 flex flex-wrap gap-2">
        {["Product", "Offer", "Breadcrumb"].map((t) => (
          <li key={t} className="inline-flex items-center gap-1 rounded-full bg-success-bg px-2.5 py-0.5 text-[12px] font-medium text-success-fg"><Check aria-hidden className="size-3" strokeWidth={3} />{t}</li>
        ))}
      </ul>
    </div>
  );
}

/** 6 — Migrations: redirect map. */
export function RedirectMock() {
  const rows = [["/old/shoes", "/collections/shoes"], ["/old/pack-21", "/products/trail-pack"], ["/old/sale", "/collections/sale"]];
  return (
    <div className={shell}>
      <ul className="grid grid-cols-[minmax(0,1fr)] gap-2">
        {rows.map(([a, b], i) => (
          <li key={a} className="si flex items-center gap-2 rounded-md bg-white px-3 py-2 shadow-[inset_0_0_0_1px_var(--ink-05)]" style={{ ["--d" as string]: `${i * 120}ms` }}>
            <span className={`${mono} truncate text-ink-50 line-through`}>{a}</span>
            <ArrowRight aria-hidden className="size-3.5 shrink-0 text-accent" />
            <span className={`${mono} truncate text-ink`}>{b}</span>
            <Tag tone="neutral" className="ml-auto shrink-0">301</Tag>
          </li>
        ))}
      </ul>
      <p className={`${note} mt-3 flex items-center gap-1`}><Minus aria-hidden className="size-3" />Illustrative</p>
    </div>
  );
}
