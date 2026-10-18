import { ArrowRight, Check, Smartphone, Star, X } from "lucide-react";
import { Tag } from "@/components/ui/Tag";

const shell = "rounded-t-lg border border-b-0 border-ink-05 bg-ink-02 p-4 shadow-xs";
const note = "font-mono text-[10px] uppercase tracking-[0.04em] text-ink-68";
const box = "shadow-[inset_0_0_0_1px_var(--ink-05)]";

/** 1 — Landing page review: entry pages and where visitors continue. */
export function EntryMock() {
  const rows: Array<[string, string, "success" | "warn" | "danger"]> = [["/collections/trail", "Continues", "success"], ["/products/ridge-runner", "Leaves", "danger"], ["/guides/sizing", "Partly", "warn"]];
  return (
    <div className={shell}>
      <ul className="grid grid-cols-[minmax(0,1fr)] gap-2">
        {rows.map(([u, s, t], i) => (
          <li key={u} className={`si flex items-center justify-between gap-3 rounded-md bg-white px-3 py-2 ${box}`} style={{ ["--d" as string]: `${i * 120}ms` }}>
            <span className="truncate font-mono text-[12px] text-ink-68">{u}</span>
            <Tag tone={t}>{s}</Tag>
          </li>
        ))}
      </ul>
      <p className={`${note} mt-3`}>Illustrative</p>
    </div>
  );
}

/** 2 — Product information: what a buyer needs to see. */
export function InfoMock() {
  const rows: Array<[string, boolean]> = [["Clear photos", true], ["Size and fit", false], ["Materials", true], ["Delivery time", false]];
  return (
    <div className={shell}>
      <ul className="grid grid-cols-2 gap-2">
        {rows.map(([t, v]) => (
          <li key={t} className={`flex items-center gap-1.5 rounded-md bg-white px-2.5 py-2 text-[12px] ${box}`}>
            {v ? <Check aria-hidden className="size-3.5 text-success-fg" /> : <X aria-hidden className="size-3.5 text-danger-fg" />}
            <span className={v ? "text-ink" : "text-ink-50"}>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 3 — Trust: reviews and policy signals. */
export function TrustMock() {
  return (
    <div className={shell}>
      <div className={`rounded-md bg-white p-3 ${box}`}>
        <p className="flex items-center gap-1 text-warn-fg" aria-hidden>{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="size-3.5 fill-current" />)}</p>
        <p className="mt-1.5 text-[12px] text-ink-68">&ldquo;Fits as described and arrived quickly.&rdquo;</p>
        <ul className="mt-2 flex flex-wrap gap-1.5">{["Free returns", "Secure checkout"].map((t) => <li key={t} className="rounded-full bg-success-bg px-2 py-0.5 text-[11px] font-medium text-success-fg">{t}</li>)}</ul>
      </div>
    </div>
  );
}

/** 4 — Mobile experience. */
export function MobileMock() {
  return (
    <div className={`${shell} flex items-center gap-4`}>
      <div className="grid h-24 w-14 shrink-0 place-items-center rounded-xl bg-white ring-2 ring-ink-20"><Smartphone aria-hidden className="size-5 text-ink-50" /></div>
      <ul className="grid gap-1.5 text-[12px]">
        {["Thumb-friendly buttons", "Sticky add to cart", "Fast to load"].map((t) => <li key={t} className="flex items-center gap-1.5"><Check aria-hidden className="size-3.5 text-success-fg" />{t}</li>)}
      </ul>
    </div>
  );
}

/** 5 — Calls to action: path to purchase. */
export function PathMock() {
  return (
    <div className={`${shell} flex items-center justify-between gap-2`}>
      {["Browse", "Product", "Cart", "Pay"].map((s, i, a) => (
        <span key={s} className="flex items-center gap-2">
          <span className={`rounded-md px-2 py-1.5 text-[11px] font-medium ${i === 2 ? "bg-accent text-white" : `bg-white text-ink ${box}`}`}>{s}</span>
          {i < a.length - 1 && <ArrowRight aria-hidden className="size-3 text-ink-50" />}
        </span>
      ))}
    </div>
  );
}

/** 6 — Speed and layout. */
export function SpeedMock() {
  const rows: Array<[string, string, "success" | "warn"]> = [["Main image", "Fast", "success"], ["Layout shift", "Check", "warn"], ["Interaction", "Fast", "success"]];
  return (
    <div className={shell}>
      <ul className="grid gap-2">
        {rows.map(([t, s, tone], i) => (
          <li key={t} className={`si flex items-center justify-between gap-3 rounded-md bg-white px-3 py-2 ${box}`} style={{ ["--d" as string]: `${i * 120}ms` }}>
            <span className="text-[12px] text-ink">{t}</span><Tag tone={tone}>{s}</Tag>
          </li>
        ))}
      </ul>
      <p className={`${note} mt-3`}>Illustrative</p>
    </div>
  );
}
