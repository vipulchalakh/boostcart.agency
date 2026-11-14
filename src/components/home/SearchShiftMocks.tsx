"use client";

import { useEffect, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { ArrowUpRight, Check, Lock, MousePointer2, RotateCw, Search, ShoppingBag, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/cn";

/* Every brand in these mocks is a neutral stand-in ("Your Store", "Competitor A"). No real third-party marks except the search engines' own. */

const QUERY = "waterproof trail running shoes";
const PROMPT = "I need waterproof trail running shoes for wide feet, under $150. What should I get?";

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties;

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/** Types `text` out once on mount (remount with a new `key` to replay). */
function Typed({ text, speed = 30, delay = 0, caret = true, className }: { text: string; speed?: number; delay?: number; caret?: boolean; className?: string }) {
  const reduced = usePrefersReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (reduced) return;
    let i = 0;
    let iv: ReturnType<typeof setInterval> | undefined;
    const t = setTimeout(() => {
      iv = setInterval(() => {
        i += 1;
        setN(i);
        if (i >= text.length) clearInterval(iv);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(t);
      if (iv) clearInterval(iv);
    };
  }, [text, speed, delay, reduced]);
  return (
    <span className={className}>
      {text.slice(0, reduced ? text.length : n)}
      {caret && !reduced && n < text.length && <span aria-hidden className="ss-caret ml-px inline-block h-[1.05em] w-[2px] translate-y-[2px] bg-current" />}
    </span>
  );
}

/** A stylised sneaker, tinted per product. Purely decorative. */
function Shoe({ color = "#df37a7", className }: { color?: string; className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 120 70" className={className} fill="none">
      <path d="M8 49h106v3c0 6-5 10-11 10H19C12 62 8 57 8 52z" fill="#0f172a" fillOpacity=".86" />
      <path d="M8 49c0-17 12-26 25-26l14 5c6 4 14 6 26 6 24 0 41 7 41 15z" fill={color} />
      <path d="M33 23l14 5c-1 6-5 10-12 11-6-5-8-11-2-16z" fill="#fff" fillOpacity=".28" />
      <path d="M52 33l5-4M60 35l5-4M68 36l5-4" stroke="#fff" strokeOpacity=".8" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M12 56h98" stroke="#fff" strokeOpacity=".35" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Cursor({ x, y, dark }: { x: number; y: number; dark?: boolean }) {
  return (
    <span aria-hidden className="ss-cursor pointer-events-none absolute z-30" style={{ left: `${x}%`, top: `${y}%` }}>
      <MousePointer2 className={cn("size-5 -translate-x-1 -translate-y-1 drop-shadow-md", dark ? "fill-ink text-white" : "fill-white text-ink")} strokeWidth={1.6} />
    </span>
  );
}

type Tab = { label: string; mark: string; you?: boolean };

/** Shared browser chrome: traffic lights, tabs, address bar and a viewport that swaps its contents per step. */
function Browser({ tabs, active, url, children, cursor, secure = true }: { tabs: Tab[]; active: number; url: string; children: ReactNode; cursor: { x: number; y: number }; secure?: boolean }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white text-ink shadow-lg ring-1 ring-ink-10">
      <div className="flex items-end gap-1 border-b border-ink-05 bg-ink-02 px-3 pt-2.5">
        <span className="mb-2 flex gap-1.5 pr-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2 rounded-full bg-ink-10" />
          ))}
        </span>
        {tabs.map((t, i) => (
          <span
            key={t.label}
            className={cn(
              "ss-in flex min-w-0 max-w-[150px] items-center gap-1.5 rounded-t-md px-3 py-1.5 text-[11px] font-medium leading-4 transition-colors",
              i === active ? "bg-white text-ink shadow-[0_-1px_0_var(--ink-05)]" : "text-ink-50",
            )}
          >
            <span aria-hidden className={cn("grid size-3.5 shrink-0 place-items-center rounded-full text-[8px] font-bold text-white", t.you ? "bg-accent" : "bg-ink-32")}>{t.mark}</span>
            <span className="truncate">{t.label}</span>
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 border-b border-ink-05 px-3 py-2">
        <RotateCw aria-hidden className="size-3.5 shrink-0 text-ink-32" />
        <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full bg-ink-05 px-3 py-1 font-sans text-[11px] leading-4 text-ink-68">
          {secure && <Lock aria-hidden className="size-3 shrink-0 text-ink-32" />}
          <span className="truncate">{url}</span>
        </span>
      </div>
      <div className="relative h-[380px] overflow-hidden bg-white sm:h-[420px]">
        {children}
        <Cursor x={cursor.x} y={cursor.y} />
      </div>
    </div>
  );
}

/* ───────────────────────────── Traditional search ───────────────────────────── */

const googleLetters = [["G", "#4285F4"], ["o", "#EA4335"], ["o", "#FBBC05"], ["g", "#4285F4"], ["l", "#34A853"], ["e", "#EA4335"]] as const;

function Wordmark({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("font-sans font-semibold tracking-[-0.04em]", className)}>
      {googleLetters.map(([c, col], i) => (
        <span key={i} style={{ color: col }}>{c}</span>
      ))}
    </span>
  );
}

function SearchBar({ typed, className }: { typed?: boolean; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5 rounded-full px-4 py-2.5 text-[13px] shadow-[0_1px_6px_rgb(32_33_36/.22)]", className)}>
      <Search aria-hidden className="size-4 shrink-0 text-ink-50" />
      <span className="min-w-0 flex-1 truncate">{typed ? <Typed text={QUERY} speed={38} delay={250} /> : QUERY}</span>
    </div>
  );
}

function Skel({ w, className }: { w: string; className?: string }) {
  return <span className={cn("block h-1.5 rounded-full bg-ink-10", className)} style={{ width: w }} />;
}

function Result({ kind, name, url, title, delay, you }: { kind?: "ad" | "you"; name: string; url: string; title: string; delay: number; you?: boolean }) {
  return (
    <div className={cn("ss-in relative rounded-lg px-3 py-1.5", you && "ss-ring bg-accent-soft ring-1 ring-accent")} style={d(delay)}>
      <div className="flex items-center gap-2">
        <span aria-hidden className={cn("grid size-5 shrink-0 place-items-center rounded-full text-[9px] font-bold text-white", you ? "bg-accent" : "bg-ink-32")}>{name.slice(0, 1)}</span>
        <span className="min-w-0 truncate text-[11px] leading-4 text-ink-68">
          {kind === "ad" && <span className="mr-1.5 font-bold text-ink">Sponsored</span>}
          {url}
        </span>
        {you && <span className="ml-auto shrink-0 rounded-full bg-accent px-2 py-0.5 font-mono text-[9px] uppercase leading-3 tracking-[0.04em] text-white">Your store</span>}
      </div>
      <p className="mt-1 truncate text-[14px] font-medium leading-5 text-[#1a0dab]">{title}</p>
      <Skel w="86%" className="mt-1.5" />
    </div>
  );
}

function SiteSkeleton({ name }: { name: string }) {
  return (
    <div className="ss-in p-4">
      <div className="flex items-center justify-between border-b border-ink-05 pb-3">
        <span className="font-display text-sm font-bold tracking-[-0.03em] text-ink-50">{name}</span>
        <span className="flex gap-3"><Skel w="28px" /><Skel w="28px" /><Skel w="28px" /></span>
      </div>
      <div className="mt-4 h-24 rounded-lg bg-ink-05" />
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i}>
            <div className="grid aspect-[4/3] place-items-center rounded-md bg-ink-05"><Shoe color="#94a3b8" className="w-3/5 opacity-70" /></div>
            <Skel w="70%" className="mt-2" />
            <Skel w="40%" className="mt-1.5" />
          </div>
        ))}
      </div>
      <div className="ss-in absolute inset-x-4 bottom-4 flex items-center gap-2 rounded-lg bg-ink px-3 py-2 text-[11px] leading-4 text-white shadow-lg" style={d(500)}>
        <span aria-hidden className="size-1.5 rounded-full bg-[#ff6ec7]" />
        Not quite right. Back to results, opening another tab…
      </div>
    </div>
  );
}

const products = [
  { name: "TrailPro Waterproof", price: "$139", color: "#df37a7", tag: "Wide fit" },
  { name: "Ridge Runner GTX", price: "$149", color: "#0ea5e9", tag: "Waterproof" },
  { name: "Summit Grip", price: "$119", color: "#f59e0b", tag: "Best seller" },
  { name: "Cascade Trail", price: "$129", color: "#10b981", tag: "Lightweight" },
  { name: "Alpine Edge", price: "$145", color: "#6366f1", tag: "All-weather" },
  { name: "Creek Runner", price: "$109", color: "#ef4444", tag: "Value" },
];

function Category() {
  return (
    <div className="grid h-full grid-cols-[92px_minmax(0,1fr)] gap-3 p-3 sm:grid-cols-[110px_minmax(0,1fr)]">
      <aside className="ss-in hidden rounded-lg bg-ink-02 p-2.5 min-[420px]:block">
        <p className="font-mono text-[9px] uppercase tracking-[0.04em] text-ink-50">Filters</p>
        {["Waterproof", "Wide fit", "Under $150", "Trail"].map((f, i) => (
          <p key={f} className="mt-2 flex items-center gap-1.5 text-[10px] leading-4 text-ink-68">
            <span className={cn("grid size-3 place-items-center rounded-[3px] ring-1 ring-ink-20", i < 3 && "bg-accent ring-accent")}>{i < 3 && <Check className="size-2 text-white" strokeWidth={4} />}</span>
            {f}
          </p>
        ))}
      </aside>
      <div className="col-span-full min-[420px]:col-span-1">
        <div className="flex items-center justify-between">
          <span className="font-display text-[13px] font-bold tracking-[-0.02em]">Trail running shoes</span>
          <span className="font-mono text-[9px] uppercase tracking-[0.04em] text-ink-50">24 products</span>
        </div>
        <div className="mt-2.5 grid grid-cols-3 gap-2">
          {products.map((p, i) => (
            <div key={p.name} className={cn("ss-in rounded-lg p-1.5 ring-1 ring-ink-05", i === 0 && "ss-ring ring-accent")} style={d(i * 70)}>
              <div className="grid aspect-[4/3] place-items-center rounded-md" style={{ background: `color-mix(in srgb, ${p.color} 12%, white)` }}><Shoe color={p.color} className="w-4/5" /></div>
              <p className="mt-1.5 truncate text-[10px] font-medium leading-3">{p.name}</p>
              <p className="text-[10px] leading-4 text-ink-68">{p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductPage({ added }: { added: boolean }) {
  return (
    <div className="ss-in grid h-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4 p-4">
      <div className="grid place-items-center rounded-xl" style={{ background: "color-mix(in srgb, #df37a7 10%, white)" }}>
        <Shoe className="w-[88%]" />
      </div>
      <div className="flex min-w-0 flex-col">
        <p className="font-mono text-[9px] uppercase tracking-[0.04em] text-accent-strong">Trail running</p>
        <h4 className="mt-1 font-display text-lg font-bold leading-6 tracking-[-0.03em]">TrailPro Waterproof</h4>
        <p className="mt-1 flex items-center gap-1 text-[11px] text-ink-68"><span className="flex text-[#f5a623]">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="size-3 fill-current" />)}</span> 4.8</p>
        <p className="mt-2 font-display text-xl font-bold tracking-[-0.03em]">$139</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["8", "9", "10", "11"].map((s, i) => (
            <span key={s} className={cn("grid size-7 place-items-center rounded-md text-[11px] font-medium ring-1 ring-ink-10", i === 2 && "bg-ink text-white ring-ink")}>{s}</span>
          ))}
        </div>
        <span className={cn("mt-auto inline-flex items-center justify-center gap-1.5 rounded-md px-4 py-2.5 text-[12px] font-semibold text-white transition-colors duration-300", added ? "bg-success-dot" : "bg-accent", added && "ss-tap")} style={d(900)}>
          {added ? <><Check className="size-3.5" strokeWidth={3} /> Added to cart</> : <><ShoppingBag className="size-3.5" /> Add to cart</>}
        </span>
      </div>
    </div>
  );
}

const tradTabs: Tab[] = [
  { label: "Google", mark: "G" },
  { label: "Competitor A", mark: "A" },
  { label: "Competitor B", mark: "B" },
  { label: "Your Store", mark: "Y", you: true },
];
const tradUrls = [
  "google.com",
  `google.com/search?q=${QUERY.replaceAll(" ", "+")}`,
  "competitor-a.com/trail-shoes",
  "yourstore.com/collections/trail-running",
  "yourstore.com/products/trailpro-waterproof",
];
const tradCursor = [{ x: 72, y: 47 }, { x: 40, y: 88 }, { x: 22, y: 46 }, { x: 42, y: 34 }, { x: 80, y: 90 }];
// Tabs visible at each step: it starts as one, grows to the comparison, then lands on the store.
const tradTabSets: Array<{ tabs: Tab[]; active: number }> = [
  { tabs: [tradTabs[0]], active: 0 },
  { tabs: [tradTabs[0]], active: 0 },
  { tabs: [tradTabs[0], tradTabs[1], tradTabs[2]], active: 1 },
  { tabs: [tradTabs[0], tradTabs[1], tradTabs[2], tradTabs[3]], active: 3 },
  { tabs: [tradTabs[0], tradTabs[1], tradTabs[2], tradTabs[3]], active: 3 },
];

export function TraditionalMock({ step }: { step: number }) {
  const set = tradTabSets[step];
  return (
    <Browser tabs={set.tabs} active={set.active} url={tradUrls[step]} cursor={tradCursor[step]}>
      <div key={step} className="h-full">
        {step === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-6 px-6 pb-8">
            <Wordmark className="ss-in text-5xl" />
            <SearchBar typed className="ss-in w-full max-w-[420px]" />
          </div>
        )}
        {step === 1 && (
          <div className="h-full p-2.5">
            <div className="flex items-center gap-3 px-1 pb-1.5">
              <Wordmark className="text-xl" />
              <SearchBar className="min-w-0 flex-1 !py-1.5 text-[12px]" />
            </div>
            <div className="space-y-0.5">
              <Result kind="ad" name="Competitor A" url="competitor-a.com" title="Trail Running Shoes | Free Shipping Today" delay={0} />
              <Result kind="ad" name="Competitor B" url="competitor-b.com" title="Waterproof Trail Shoes from $89" delay={90} />
              <Result name="Competitor A" url="competitor-a.com › trail-shoes" title="Best Waterproof Trail Running Shoes 2026" delay={180} />
              <Result name="Competitor C" url="competitor-c.com › blog" title="12 Trail Shoes Tested: Our Honest Review" delay={270} />
              <Result name="Your Store" url="yourstore.com › collections › trail-running" title="Waterproof Trail Running Shoes | Your Store" delay={360} you />
            </div>
          </div>
        )}
        {step === 2 && <SiteSkeleton name="Competitor A" />}
        {step === 3 && <Category />}
        {step === 4 && <ProductPage added />}
      </div>
    </Browser>
  );
}

/* ───────────────────────────────── AI search ───────────────────────────────── */

const aiCursor = [{ x: 78, y: 90 }, { x: 30, y: 63 }, { x: 70, y: 86 }];

function Sources({ delay }: { delay: number }) {
  return (
    <div className="ss-in mt-2.5 flex flex-wrap items-center gap-1.5" style={d(delay)}>
      <span className="font-mono text-[9px] uppercase tracking-[0.04em] text-ink-50">Sources</span>
      {[["1", "yourstore.com"], ["2", "trailgearlab.com"], ["3", "runnersguide.com"]].map(([n, s], i) => (
        <span key={s} className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] leading-4 ring-1", i === 0 ? "bg-accent-soft text-accent-strong ring-accent/40" : "bg-ink-02 text-ink-68 ring-ink-10")}>
          <span className="font-mono text-[9px]">{n}</span>{s}
        </span>
      ))}
    </div>
  );
}

function AiAnswer() {
  const recs = products.slice(0, 3);
  return (
    <div className="flex items-start gap-2.5">
      <span aria-hidden className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-ink text-white"><Sparkles className="size-3.5" /></span>
      <div className="min-w-0 flex-1">
        <p className="ss-in text-[12px] leading-[18px]" style={d(0)}>For wide feet and wet trails, these three stand out. The first is the best all-rounder under your budget<sup className="ml-0.5 text-[9px] font-semibold text-accent-strong">1</sup>:</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {recs.map((p, i) => (
            <div key={p.name} className={cn("ss-in relative rounded-lg bg-white p-1.5 ring-1", i === 0 ? "ss-ring ring-accent" : "ring-ink-10")} style={d(350 + i * 160)}>
              {i === 0 && <span className="absolute -top-2 left-2 rounded-full bg-accent px-2 py-0.5 font-mono text-[8px] uppercase leading-3 tracking-[0.04em] text-white">Top pick</span>}
              <div className="grid aspect-[4/3] place-items-center rounded-md" style={{ background: `color-mix(in srgb, ${p.color} 12%, white)` }}><Shoe color={p.color} className="w-4/5" /></div>
              <p className="mt-1.5 truncate text-[10px] font-medium leading-3">{p.name}</p>
              <div className="flex items-center justify-between text-[10px] leading-4 text-ink-68"><span>{p.price}</span><span className="rounded bg-ink-05 px-1 text-[9px]">{p.tag}</span></div>
            </div>
          ))}
        </div>
        <Sources delay={950} />
      </div>
    </div>
  );
}

function AiPurchase() {
  return (
    <div className="ss-in absolute inset-x-3 bottom-3 z-20 rounded-xl bg-white p-3 shadow-lg ring-1 ring-ink-10">
      <div className="grid grid-cols-[88px_minmax(0,1fr)] items-center gap-3">
        <div className="grid aspect-square place-items-center rounded-lg" style={{ background: "color-mix(in srgb, #df37a7 10%, white)" }}><Shoe className="w-4/5" /></div>
        <div className="min-w-0">
          <p className="flex items-center gap-1 truncate text-[10px] leading-4 text-ink-68"><Lock className="size-2.5 shrink-0" />yourstore.com/products/trailpro-waterproof</p>
          <p className="font-display text-[15px] font-bold leading-5 tracking-[-0.03em]">TrailPro Waterproof · $139</p>
          <p className="text-[10px] leading-4 text-ink-68">Wide fit · In stock in your size</p>
          <span className="ss-tap mt-2 inline-flex items-center gap-1.5 rounded-md bg-success-dot px-3 py-1.5 text-[11px] font-semibold text-white" style={d(1100)}><Check className="size-3" strokeWidth={3} /> Added to cart</span>
        </div>
      </div>
    </div>
  );
}

export function AiMock({ step }: { step: number }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white text-ink shadow-lg ring-1 ring-ink-10">
      <div className="flex items-center gap-2 border-b border-ink-05 bg-ink-02 px-3 py-2.5">
        <span className="flex gap-1.5 pr-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2 rounded-full bg-ink-10" />
          ))}
        </span>
        <span className="inline-flex items-center gap-1.5 font-display text-[12px] font-bold tracking-[-0.02em]"><Sparkles aria-hidden className="size-3.5 text-accent" /> AI assistant</span>
        <span className="ml-auto rounded-full bg-success-bg px-2 py-0.5 font-mono text-[9px] uppercase leading-3 tracking-[0.04em] text-success-fg">Live web</span>
      </div>
      <div className="relative flex h-[412px] flex-col bg-[linear-gradient(180deg,#fff,var(--ink-02))] sm:h-[452px]">
        <div className="flex-1 space-y-4 overflow-hidden px-4 pb-3 pt-4">
          <div className="flex justify-end">
            <p className="ss-in max-w-[88%] rounded-2xl rounded-br-md bg-accent px-3.5 py-2.5 text-[12px] leading-[18px] text-white shadow-xs">
              {step === 0 ? <Typed text={PROMPT} speed={26} delay={250} /> : PROMPT}
            </p>
          </div>
          {step === 1 && <div key="answer"><AiAnswer /></div>}
          {step === 2 && (
            <div key="answer-2" className="opacity-90"><AiAnswer /></div>
          )}
          {step === 0 && (
            <div aria-hidden className="ss-in flex items-center gap-2.5 text-ink-50" style={d(2300)}>
              <span className="grid size-6 place-items-center rounded-full bg-ink text-white"><Sparkles className="size-3.5" /></span>
              <span className="flex gap-1">{[0, 1, 2].map((i) => <span key={i} className="ss-dot size-1.5 rounded-full bg-ink-50" style={{ animationDelay: `${i * 150}ms` }} />)}</span>
              <span className="ss-shimmer h-2 w-24 rounded-full" />
            </div>
          )}
        </div>
        {step === 2 && <AiPurchase />}
        <div className="flex items-center gap-2 border-t border-ink-05 bg-white px-3 py-2.5">
          <span className="min-w-0 flex-1 truncate rounded-full bg-ink-05 px-3.5 py-2 text-[11px] text-ink-50">Ask anything…</span>
          <span aria-hidden className="grid size-7 place-items-center rounded-full bg-ink text-white"><ArrowUpRight className="size-3.5" /></span>
        </div>
        <Cursor x={aiCursor[step].x} y={aiCursor[step].y} />
      </div>
    </div>
  );
}
