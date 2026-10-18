import type { ReactNode } from "react";
import { Bot, Compass, MousePointer2, ShoppingCart } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MarqueeLoop } from "@/components/ui/MarqueeLoop";
import { Reveal } from "@/components/ui/Reveal";

const svg = (children: ReactNode) => (
  <svg viewBox="0 0 24 24" aria-hidden className="size-1/2">{children}</svg>
);

const Google = () => svg(
  <>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </>,
);

const ChatGpt = () => svg(
  <g fill="none" stroke="#0f172a" strokeWidth="1.5" strokeLinejoin="round">
    {[0, 60, 120].map((r) => <ellipse key={r} cx="12" cy="12" rx="9" ry="4.2" transform={`rotate(${r} 12 12)`} />)}
  </g>,
);

const Claude = () => svg(
  <g stroke="#D97757" strokeWidth="2.2" strokeLinecap="round">
    {Array.from({ length: 12 }, (_, i) => {
      const a = (i * 30 * Math.PI) / 180;
      const r1 = 3, r2 = i % 2 ? 8.5 : 10.5;
      return <line key={i} x1={12 + r1 * Math.sin(a)} y1={12 - r1 * Math.cos(a)} x2={12 + r2 * Math.sin(a)} y2={12 - r2 * Math.cos(a)} />;
    })}
  </g>,
);

const Gemini = () => svg(
  <>
    <defs>
      <linearGradient id="orbit-gem" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4285F4" /><stop offset=".55" stopColor="#9B72CB" /><stop offset="1" stopColor="#D96570" />
      </linearGradient>
    </defs>
    <path fill="url(#orbit-gem)" d="M12 1.5c0 6.1 4.4 10.5 10.5 10.5-6.1 0-10.5 4.4-10.5 10.5C12 16.4 7.6 12 1.5 12 7.6 12 12 7.6 12 1.5z" />
  </>,
);

const Perplexity = () => svg(
  <g fill="none" stroke="#20808D" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
    <path d="M12 2v20M4.5 6.5 12 12l7.5-5.5M4.5 17.5 12 12l7.5 5.5M4.5 6.5v11M19.5 6.5v11M4.5 6.5 12 2l7.5 4.5" />
  </g>,
);

const Grok = () => svg(
  <g fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="13" r="6.5" />
    <path d="M7 19 20 4" />
  </g>,
);

const Copilot = () => svg(
  <>
    <defs>
      <linearGradient id="orbit-cop" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2CA5F5" /><stop offset=".5" stopColor="#7B61FF" /><stop offset="1" stopColor="#FF5CA8" />
      </linearGradient>
    </defs>
    <path fill="none" stroke="url(#orbit-cop)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" d="M18.5 7.5C17.2 5 14.9 3.5 12 3.5c-4.7 0-8 3.6-8 8.5s3.3 8.5 8 8.5c2.9 0 5.2-1.500 6.500-4" />
  </>,
);

const AiBrowser = () => <Compass aria-hidden className="size-1/2 text-ink" strokeWidth={1.75} />;
const BrowserAgent = () => <Bot aria-hidden className="size-1/2 text-ink" strokeWidth={1.75} />;
const ShoppingAgent = () => <MousePointer2 aria-hidden className="size-1/2 text-ink" strokeWidth={1.75} />;

type Item = { name: string; mark: () => ReactNode };

const cars: Item[] = [
  { name: "Google", mark: Google },
  { name: "ChatGPT", mark: ChatGpt },
  { name: "Claude", mark: Claude },
  { name: "Gemini", mark: Gemini },
  { name: "Perplexity", mark: Perplexity },
  { name: "Copilot", mark: Copilot },
  { name: "Grok", mark: Grok },
  { name: "AI browsers", mark: AiBrowser },
  { name: "Browser agents", mark: BrowserAgent },
  { name: "Shopping agents", mark: ShoppingAgent },
];

/** Steel wheel on a bogie: dark disc, light spokes that spin, bright hub. Sits on the rail. */
function Wheel({ className }: { className?: string }) {
  return (
    <span aria-hidden className={`absolute -bottom-[26px] z-10 size-[22px] rounded-full bg-ink ring-2 ring-white ${className ?? ""}`}>
      <span className="train-wheel absolute inset-0 rounded-full">
        <span className="absolute left-1/2 top-[3px] h-[calc(100%-6px)] w-[2px] -translate-x-1/2 rounded-full bg-white/70" />
        <span className="absolute left-[3px] top-1/2 h-[2px] w-[calc(100%-6px)] -translate-y-1/2 rounded-full bg-white/70" />
        <span className="absolute inset-[4px] rounded-full border border-white/40" />
      </span>
      <span className="absolute left-1/2 top-1/2 size-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--yellow)]" />
    </span>
  );
}

/** Underframe the wheels hang from. */
function Chassis({ className }: { className?: string }) {
  return <span aria-hidden className={`absolute -bottom-[9px] h-[9px] rounded-b-xl bg-ink ${className ?? "inset-x-5"}`} />;
}

function Coupler() {
  return <span aria-hidden className="absolute -bottom-[7px] -right-5 h-1 w-5 rounded-full bg-ink" />;
}

const glows = [
  "bg-accent -right-10 -top-12 opacity-15",
  "bg-[var(--yellow)] -left-10 -top-12 opacity-45",
];

function Window() {
  return (
    <span className="relative h-8 w-10 overflow-hidden rounded-md bg-[linear-gradient(160deg,#eef2ff,#d5dff0)] ring-1 ring-ink-10">
      <span className="absolute -left-2 -top-1 h-11 w-3 rotate-[24deg] bg-white/60" />
    </span>
  );
}

/** Narrow entrance door with a framed leaf and a small window, like a real carriage end door. */
function Door() {
  return (
    <span className="relative h-full w-[38px] shrink-0 rounded-t-lg bg-ink-02 p-[5px] ring-2 ring-ink-20">
      <span className="relative block h-full rounded-t-[5px] bg-white ring-1 ring-ink-10">
        <span className="absolute inset-x-[5px] top-[5px] h-[26px] rounded-[4px] bg-[linear-gradient(160deg,#eef2ff,#d5dff0)] ring-1 ring-ink-10" />
        <span className="absolute inset-y-0 left-1/2 w-px bg-ink-10" />
        <span className="absolute right-[5px] top-[46px] h-[18px] w-[2px] rounded-full bg-ink-32" />
      </span>
    </span>
  );
}

function Coach({ item, i }: { item: Item; i: number }) {
  const doorRight = i % 2 === 1;
  return (
    <li className="relative mr-5 w-[248px] shrink-0">
      {/* roof vents */}
      <span aria-hidden className="absolute -top-[5px] left-1/2 z-0 flex -translate-x-1/2 gap-1.5">
        {[0, 1, 2].map((v) => <span key={v} className="h-[6px] w-6 rounded-t-md bg-ink-10" />)}
      </span>
      <div className="relative h-[148px] overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-ink-05">
        <span aria-hidden className={`pointer-events-none absolute size-32 rounded-full blur-3xl ${glows[i % 2]}`} />
        <span aria-hidden className="absolute inset-x-0 top-0 h-3 border-b border-ink-05 bg-ink-02" />
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-5 border-t border-ink-05 bg-ink-02" />
        <div className={`absolute inset-x-4 bottom-0 top-6 flex gap-4 ${doorRight ? "flex-row-reverse" : ""}`}>
          <Door />
          <div className="relative flex min-w-0 flex-1 flex-col">
            <span aria-hidden className="flex justify-between"><Window /><Window /><Window /></span>
            <span className="mt-4 flex items-center gap-2.5">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white shadow-sm ring-1 ring-ink-10 [&_svg]:!size-6">{item.mark()}</span>
              <span className="truncate font-display text-[15px] font-bold tracking-[-0.02em] text-ink">{item.name}</span>
            </span>
          </div>
        </div>
      </div>
      <Chassis />
      <Wheel className="left-9" />
      <Wheel className="right-9" />
      <Coupler />
    </li>
  );
}

function Loco() {
  return (
    <li className="relative mr-5 w-[250px] shrink-0" aria-label="BoostCart">
      <span aria-hidden className="absolute -top-5 left-10 h-5 w-8 rounded-t-lg bg-ink" />
      <span aria-hidden className="pointer-events-none absolute -top-8 left-[50px] size-3">
        {[0, 1, 2].map((i) => (
          <span key={i} className="train-smoke absolute left-0 top-0 size-3 rounded-full bg-ink-10" style={{ animationDelay: `${i * 0.9}s` }} />
        ))}
      </span>
      <div className="relative h-[148px] overflow-hidden rounded-2xl rounded-r-[56px] bg-accent p-4 text-white shadow-md ring-1 ring-ink-10">
        <span aria-hidden className="dots pointer-events-none absolute inset-0 opacity-30 [filter:invert(1)]" />
        <div className="relative flex items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white shadow-sm"><ShoppingCart aria-hidden className="size-6 text-accent" strokeWidth={2} /></span>
          <span className="font-display text-base font-bold tracking-[-0.02em]">BoostCart</span>
        </div>
        <div className="relative mt-4 w-[150px] rounded-lg bg-white/15 px-2.5 py-2 ring-1 ring-white/25">
          <span className="font-mono text-[11px] uppercase tracking-[0.04em]">Link Building</span>
        </div>
        <span aria-hidden className="absolute right-3 top-[58px] size-5 rounded-full bg-[var(--yellow)] shadow-[0_0_18px_6px_rgb(249_249_6/.55)]" />
      </div>
      <Chassis />
      <Wheel className="left-9" />
      <Wheel className="left-[112px]" />
      <Wheel className="right-10" />
      <Coupler />
    </li>
  );
}

export function AiOrbit() {
  return (
    <section aria-labelledby="orbit-title" className="relative overflow-hidden pb-[var(--section-y)] pt-12 lg:pt-16">
      <Reveal className="container-x">
        <div className="mx-auto max-w-[680px] text-center">
          <Eyebrow>Built for AI search</Eyebrow>
          <h2 id="orbit-title" className="h2 mt-4">Authority engines and AI both notice</h2>
          <p className="lead mt-4">
            Editorial mentions on trusted sites help search engines trust your pages and give AI tools more places that describe your brand. We earn them with real outreach, not link schemes.
          </p>
        </div>
      </Reveal>

      <div className="relative mt-14">
        <span aria-hidden className="pointer-events-none absolute inset-x-[10%] bottom-0 h-40 rounded-full bg-[var(--yellow)] opacity-25 blur-3xl" />
        {/* Train: moves left to right; the rail underneath stays still. */}
        <MarqueeLoop reverse duration="60s" label="Search engines and AI agents that read your pages" className="relative pb-[44px] pt-12">
          <ul className="flex shrink-0 items-end pl-5">
            {cars.map((c, i) => <Coach key={c.name} item={c} i={i} />)}
            <Loco />
          </ul>
        </MarqueeLoop>
        {/* Track: steel rail on sleepers over ballast; stays still while the train moves. */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[18px] marquee-mask">
          <span className="absolute inset-x-0 top-0 h-[3px] rounded-full bg-ink" />
          <span className="absolute inset-x-0 top-[3px] h-[6px] [background:repeating-linear-gradient(90deg,var(--ink-32)_0_10px,transparent_10px_30px)]" />
          <span className="absolute inset-x-0 top-[9px] h-[9px] [background:radial-gradient(var(--ink-32)_1px,transparent_1.3px)_0_0/6px_6px]" />
        </div>
      </div>
    </section>
  );
}
