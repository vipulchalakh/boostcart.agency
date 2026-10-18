import { Heart, Lightbulb, Search, ShoppingBag } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type Status = "Published" | "Drafting" | "Planned";
type Article = { title: string; kind: string; status: Status };

const articles: Article[] = [
  { title: "How to choose trail running shoes", kind: "Buying guide", status: "Published" },
  { title: "Linen vs cotton shirts", kind: "Comparison", status: "Published" },
  { title: "Serum order: what goes first", kind: "How-to", status: "Drafting" },
  { title: "Side table sizing guide", kind: "Sizing guide", status: "Drafting" },
  { title: "Wired vs wireless earbuds", kind: "Comparison", status: "Planned" },
  { title: "Caring for a leather tote", kind: "Care guide", status: "Planned" },
];
const total = articles.length;
const live = articles.filter((a) => a.status === "Published").length;
const todo = total - live;
const questions = ["Which shoes suit wide feet?", "Is linen too hot for summer?", "How often should I use serum?"];

const chip: Record<Status, string> = { Published: "bg-success-bg text-success-fg", Drafting: "bg-warn-bg text-warn-fg", Planned: "bg-ink-05 text-ink-68" };
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

function Questions() {
  return (
    <div className={cn(card, "si hidden flex-col p-3 sm:flex")} style={{ ["--d" as string]: "120ms" }}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-medium leading-4 text-ink-68">Shopper questions</p>
        <span className="rounded-full bg-ink-05 px-2 py-0.5 text-[10px] font-medium text-ink-68">Illustrative</span>
      </div>
      <ul className="mt-2 grid flex-1 content-start gap-1.5">
        {questions.map((q) => <li key={q} className="rounded-lg bg-ink-02 px-2.5 py-2 text-[11px] leading-4 text-ink ring-1 ring-ink-05">{q}</li>)}
      </ul>
    </div>
  );
}

function Blog() {
  return (
    <div className="si overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-ink-10" style={{ ["--d" as string]: "240ms" }}>
      <div className="flex items-center justify-between gap-3 border-b border-ink-05 px-3 py-1.5">
        <span className="font-display text-[12px] font-bold tracking-[-0.02em]">YOUR STORE</span>
        <span className="hidden gap-3 text-[10px] text-ink-68 sm:flex"><span>Shop</span><span>Guides</span><span>Sale</span><span>About</span></span>
        <span aria-hidden className="flex gap-2.5 text-ink-68"><Search className="size-3.5" /><Heart className="size-3.5" /><ShoppingBag className="size-3.5" /></span>
      </div>
      <p className="px-3 pt-2.5 font-display text-[15px] font-bold leading-tight tracking-[-0.02em]">Buying guides</p>
      <ul className="grid grid-cols-2 gap-2 p-2">
        {articles.map((a) => (
          <li key={a.title} className="min-w-0 rounded-lg bg-white p-2 ring-1 ring-ink-05">
            <p className="font-mono text-[8px] uppercase leading-3 tracking-[0.04em] text-ink-50">{a.kind}</p>
            <p className="mt-0.5 line-clamp-2 text-[11px] font-medium leading-4">{a.title}</p>
            <span className={cn("mt-1.5 inline-block rounded-xs px-1.5 py-px text-[9px] font-medium leading-3", chip[a.status])}>{a.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Hero visual: a fictional store blog. Metric cards are counted from the six fictional articles, so nothing is invented. */
export function HeroVisual() {
  return (
    <Reveal bare className="relative mx-auto w-full max-w-[480px] lg:mr-0">
      <figure aria-label="Illustration: a fictional store blog with example buying guides and the status of each" className="relative">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-[5fr_6fr] sm:gap-3">
          <div className="col-span-2 grid grid-cols-2 gap-2.5 sm:col-span-1 sm:grid-cols-1 sm:gap-3">
            <Metric label="Guides still to publish" value={todo} tag="In progress" bar="bg-yellow" tone="bg-warn-bg text-warn-fg" />
            <Metric label="Guides published" value={live} tag="Goal: key topics" bar="bg-success-dot" tone="bg-success-bg text-success-fg" />
          </div>
          <Questions />
        </div>
        <div className="relative z-10 -mt-1"><Blog /></div>
        <div className="si ind-float absolute -bottom-3 right-0 z-20 flex items-center gap-2 rounded-lg bg-yellow px-3 py-2 shadow-md ring-1 ring-ink/10" style={{ ["--d" as string]: "420ms" }}>
          <Lightbulb aria-hidden className="size-4 text-ink" />
          <span className="font-display text-sm font-bold tracking-[-0.02em]">Guides that lead to carts</span>
        </div>
        <figcaption className="sr-only">Example only: counts come from the six fictional articles, not from a real site.</figcaption>
      </figure>
    </Reveal>
  );
}
