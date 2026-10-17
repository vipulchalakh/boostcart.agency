import { Check } from "lucide-react";
import type { Usp } from "@content/data";

const platforms = [
  { n: "S", c: "var(--brand-shopify)", x: 240, y: 52 },
  { n: "W", c: "var(--brand-woocommerce)", x: 396, y: 138 },
  { n: "B", c: "var(--brand-bigcommerce)", x: 336, y: 288 },
  { n: "M", c: "var(--brand-magento)", x: 144, y: 288 },
  { n: "H", c: "var(--brand-headless)", x: 84, y: 138 },
];

function Store() {
  return (
    <svg aria-hidden viewBox="0 0 480 360" className="size-full">
      <rect x="90" y="70" width="300" height="230" rx="16" fill="#fff" />
      <path d="M90 70h300v38a38 38 0 0 1-75 0 38 38 0 0 1-75 0 38 38 0 0 1-75 0 38 38 0 0 1-75 0z" fill="var(--accent)" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={90 + i * 75} y="70" width="37.5" height="38" fill="#fff" fillOpacity=".22" />
      ))}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={116 + i * 90} y="150" width="72" height="72" rx="10" fill={i === 1 ? "var(--yellow)" : "var(--ink-05)"} />
          <rect x={116 + i * 90} y="232" width="56" height="8" rx="4" fill="var(--ink-10)" />
          <rect x={116 + i * 90} y="248" width="34" height="8" rx="4" fill="var(--accent)" fillOpacity=".7" />
        </g>
      ))}
      <rect x="320" y="272" width="56" height="22" rx="11" fill="var(--ink)" />
      <circle cx="335" cy="283" r="5" fill="var(--yellow)" />
      <rect x="346" y="280" width="22" height="6" rx="3" fill="#fff" fillOpacity=".7" />
    </svg>
  );
}

function Report() {
  const rows = [["Category pages", 78], ["Product pages", 58], ["Guides & content", 36]] as const;
  return (
    <div className="flex size-full items-center justify-center p-6">
      <div className="w-full max-w-[380px] rounded-2xl bg-white/90 p-5 shadow-lg">
        <p className="font-display text-lg font-bold tracking-[-0.02em] text-ink">Organic revenue</p>
        <div className="mt-4 space-y-3">
          {rows.map(([label, w], i) => (
            <div key={label} className={i === 0 ? "rounded-xl bg-accent p-4 text-white" : "rounded-xl bg-ink-02 p-4 text-ink"}>
              <p className="text-sm font-medium">{label}</p>
              <div className={i === 0 ? "mt-2 h-2.5 rounded-full bg-white/30" : "mt-2 h-2.5 rounded-full bg-ink-10"}>
                <div className={i === 0 ? "h-full rounded-full bg-white" : "h-full rounded-full bg-accent"} style={{ width: `${w}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Platforms() {
  return (
    <svg aria-hidden viewBox="0 0 480 360" className="size-full">
      {platforms.map((p) => (
        <line key={p.n} x1="240" y1="180" x2={p.x} y2={p.y} stroke="#fff" strokeOpacity=".35" strokeWidth="2" strokeDasharray="5 6" />
      ))}
      <circle cx="240" cy="180" r="52" fill="#fff" />
      <circle cx="240" cy="180" r="62" fill="none" stroke="var(--accent)" strokeOpacity=".5" strokeWidth="2" />
      <path d="M218 164h10l8 30h26l8-22h-38" fill="none" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="238" cy="206" r="5" fill="var(--yellow)" /><circle cx="262" cy="206" r="5" fill="var(--yellow)" />
      {platforms.map((p) => (
        <g key={p.n}>
          <circle cx={p.x} cy={p.y} r="30" fill={p.c} stroke="#fff" strokeWidth="4" />
          <text x={p.x} y={p.y + 8} textAnchor="middle" fill="#fff" fontSize="22" fontWeight="800" fontFamily="var(--font-display), sans-serif">{p.n}</text>
        </g>
      ))}
    </svg>
  );
}

function Terms() {
  return (
    <div className="flex size-full items-center justify-center p-6">
      <div className="w-full max-w-[380px] rounded-2xl bg-white/90 p-5 shadow-lg">
        <div className="flex items-center justify-between">
          <p className="font-display text-lg font-bold tracking-[-0.02em] text-ink">Month to month</p>
          <span aria-hidden className="relative h-6 w-11 rounded-full bg-accent"><span className="absolute right-0.5 top-0.5 size-5 rounded-full bg-white" /></span>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2.5">
          {[1, 2, 3, 4, 5, 6].map((m) => (
            <div key={m} className={m < 4 ? "rounded-xl bg-accent-soft p-3" : "rounded-xl bg-ink-02 p-3"}>
              <p className="font-mono text-[11px] uppercase tracking-[0.04em] text-ink-68">Month {m}</p>
              <span className={m < 4 ? "mt-2 grid size-6 place-items-center rounded-full bg-accent text-white" : "mt-2 grid size-6 place-items-center rounded-full border border-dashed border-ink-20 text-ink-50"}>
                {m < 4 && <Check aria-hidden className="size-3.5" />}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[13px] text-ink-68">Stay because it works. Pause or stop any month.</p>
      </div>
    </div>
  );
}

export function UspVisual({ kind }: { kind: Usp["visual"] }) {
  return { store: <Store />, report: <Report />, platforms: <Platforms />, terms: <Terms /> }[kind];
}
