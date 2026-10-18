import { Heart, Lightbulb, Search, ShoppingBag, Truck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type Status = "Clear" | "Weak" | "Missing";
type Check = { label: string; status: Status };

const checks: Check[] = [
  { label: "Product photos", status: "Clear" },
  { label: "Price and stock", status: "Clear" },
  { label: "Size guide", status: "Weak" },
  { label: "Reviews", status: "Missing" },
  { label: "Delivery and returns", status: "Weak" },
  { label: "Add to cart button", status: "Clear" },
];
const total = checks.length;
const good = checks.filter((c) => c.status === "Clear").length;
const fix = total - good;

const chip: Record<Status, string> = { Clear: "bg-success-bg text-success-fg", Weak: "bg-warn-bg text-warn-fg", Missing: "bg-danger-bg text-danger-fg" };
const card = "rounded-xl bg-white shadow-md ring-1 ring-ink-10";

function Metric({ label, value, tag, bar, tone }: { label: string; value: number; tag: string; bar: string; tone: string }) {
  return (
    <div className={cn(card, "si p-3")}>
      <p className="text-[11px] font-medium leading-4 text-ink-68">{label}</p>
      <div className="mt-1.5 flex items-end justify-between gap-2">
        <p className="font-display text-3xl font-bold leading-none tracking-[-0.04em]">{value}<span className="text-base font-semibold text-ink-50"> of {total}</span></p>
        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium leading-4", tone)}>{tag}</span>
      </div>
      <div aria-hidden className="mt-2.5 h-2 overflow-hidden rounded-full bg-ink-05"><div className={cn("grow-x h-full rounded-full", bar)} style={{ width: `${(value / total) * 100}%` }} /></div>
    </div>
  );
}

const steps = [["Search result", 100], ["Product page", 70], ["Add to cart", 40], ["Checkout", 24]] as const;

function Funnel() {
  return (
    <div className={cn(card, "si hidden flex-col p-3 sm:flex")} style={{ ["--d" as string]: "120ms" }}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-medium leading-4 text-ink-68">Organic visitor path</p>
        <span className="rounded-full bg-ink-05 px-2 py-0.5 text-[10px] font-medium text-ink-68">Illustrative</span>
      </div>
      <ul className="mt-2.5 grid flex-1 content-center gap-2" aria-label="Illustrative funnel, not real data">
        {steps.map(([label, w]) => (
          <li key={label}>
            <p className="text-[10px] leading-4 text-ink-68">{label}</p>
            <div aria-hidden className="mt-0.5 h-2.5 overflow-hidden rounded-full bg-ink-05"><div className="grow-x h-full rounded-full bg-accent" style={{ width: `${w}%` }} /></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductPage() {
  return (
    <div className="si overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-ink-10" style={{ ["--d" as string]: "240ms" }}>
      <div className="flex items-center justify-between gap-3 border-b border-ink-05 px-3 py-1.5">
        <span className="font-display text-[12px] font-bold tracking-[-0.02em]">YOUR STORE</span>
        <span className="hidden gap-3 text-[10px] text-ink-68 sm:flex"><span>Shop</span><span>Collections</span><span>Sale</span></span>
        <span aria-hidden className="flex gap-2.5 text-ink-68"><Search className="size-3.5" /><Heart className="size-3.5" /><ShoppingBag className="size-3.5" /></span>
      </div>
      <div className="grid gap-3 p-3 sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div className="grid min-h-24 place-items-center rounded-lg bg-[#fefec7]">
          <svg aria-hidden viewBox="0 0 48 48" className="size-16"><path d="M16 8 6 14l4 8 4-2v22h20V20l4 2 4-8-10-6c-1 4-4 6-8 6s-7-2-8-6z" fill="var(--ink)" /></svg>
        </div>
        <div className="min-w-0">
          <p className="font-display text-[15px] font-bold leading-tight tracking-[-0.02em]">Linen shirt</p>
          <p className="mt-1 flex items-center gap-1 text-[10px] text-ink-68"><Truck aria-hidden className="size-3" />Delivery and returns</p>
          <ul className="mt-2 grid grid-cols-2 gap-1.5">
            {checks.map((c) => (
              <li key={c.label} className="min-w-0 rounded-md bg-ink-02 px-1.5 py-1 ring-1 ring-ink-05">
                <p className="truncate text-[10px] leading-4">{c.label}</p>
                <span className={cn("inline-block rounded-xs px-1.5 py-px text-[9px] font-medium leading-3", chip[c.status])}>{c.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** Hero visual: a fictional product page review. Metric cards are counted from the six fictional checks, so nothing is invented. */
export function HeroVisual() {
  return (
    <Reveal bare className="relative mx-auto w-full max-w-[480px] lg:mr-0">
      <figure aria-label="Illustration: a fictional product page with an example conversion review and a visitor path" className="relative">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-[5fr_6fr] sm:gap-3">
          <div className="col-span-2 grid grid-cols-2 gap-2.5 sm:col-span-1 sm:grid-cols-1 sm:gap-3">
            <Metric label="Elements to improve" value={fix} tag="Fix first" bar="bg-yellow" tone="bg-warn-bg text-warn-fg" />
            <Metric label="Elements working" value={good} tag="Keep" bar="bg-success-dot" tone="bg-success-bg text-success-fg" />
          </div>
          <Funnel />
        </div>
        <div className="relative z-10 -mt-1"><ProductPage /></div>
        <div className="si ind-float absolute -bottom-3 right-0 z-20 flex items-center gap-2 rounded-lg bg-yellow px-3 py-2 shadow-md ring-1 ring-ink/10" style={{ ["--d" as string]: "420ms" }}>
          <Lightbulb aria-hidden className="size-4 text-ink" />
          <span className="font-display text-sm font-bold tracking-[-0.02em]">Traffic that buys</span>
        </div>
        <figcaption className="sr-only">Example only: counts come from the six fictional checks, and the funnel bars are not real data.</figcaption>
      </figure>
    </Reveal>
  );
}
