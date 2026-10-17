import type { CSSProperties, ReactNode } from "react";

const A = "var(--accent)";
const Y = "var(--yellow)";
const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

const Check = ({ x, y, delay }: { x: number; y: number; delay: number }) => (
  <g className="pr-a pr-pop" style={d(delay)}>
    <circle cx={x} cy={y} r="11" fill={A} />
    <path d={`M${x - 5} ${y}l3.5 4 6.5-8`} fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

const scenes: Record<string, ReactNode> = {
  audit: (
    <>
      <rect x="20" y="16" width="440" height="248" rx="14" fill="#fff" stroke="var(--ink-10)" />
      {[0, 1, 2].map((i) => <circle key={i} cx={40 + i * 14} cy="34" r="4" fill="var(--ink-10)" />)}
      {[["62%", "var(--danger-dot)"], ["80%", Y], ["48%", "var(--success-dot)"], ["70%", "var(--success-dot)"], ["56%", Y], ["76%", "var(--danger-dot)"]].map(([w, c], i) => (
        <g key={i}>
          <rect x="40" y={62 + i * 29} width={`${parseFloat(w) * 3.4}`} height="10" rx="5" fill="var(--ink-05)" />
          <circle className="pr-a pr-pop" style={d(0.5 + i * 0.45)} cx="428" cy={67 + i * 29} r="7" fill={c} />
        </g>
      ))}
      <g className="pr-scan">
        <rect x="24" y="44" width="432" height="26" fill={A} fillOpacity=".12" />
        <rect x="24" y="68" width="432" height="3" rx="1.5" fill={A} />
      </g>
    </>
  ),
  keywords: (
    <>
      {[["buy trail shoes", 0], ["mens trail shoes", 1], ["best trail shoes", 1], ["trail shoe sizing", 2]].map(([t, to], i) => (
        <g key={String(t)}>
          <path d={`M184 ${54 + i * 58}C260 ${54 + i * 58} 260 ${74 + Number(to) * 70} 340 ${74 + Number(to) * 70}`} fill="none" stroke={A} strokeOpacity=".7" strokeWidth="2.4" className="pr-flow" />
          <rect x="24" y={38 + i * 58} width="160" height="32" rx="16" fill="#fff" stroke="var(--ink-10)" />
          <text x="104" y={59 + i * 58} textAnchor="middle" fontSize="13" fill="var(--ink)" fontFamily="var(--font-sans), sans-serif">{String(t)}</text>
        </g>
      ))}
      {["Collection", "Product", "Guide"].map((t, i) => (
        <g key={t} className="pr-a pr-pop" style={d(0.3 + i * 0.4)}>
          <rect x="340" y={52 + i * 70} width="116" height="44" rx="10" fill={i === 0 ? A : "#fff"} stroke={i === 0 ? A : "var(--ink-10)"} />
          <text x="398" y={79 + i * 70} textAnchor="middle" fontSize="14" fontWeight="600" fill={i === 0 ? "#fff" : "var(--ink)"} fontFamily="var(--font-sans), sans-serif">{t}</text>
        </g>
      ))}
    </>
  ),
  roadmap: (
    <>
      {[["Fix canonical tags", "QUICK WIN"], ["Rewrite top collections", "BIG WIN"], ["Build buying guides", "STEADY"], ["Rebuild faceted nav", "PLANNED"]].map(([t, tag], i) => (
        <g key={t} className="pr-a pr-slide" style={d(i * 0.3)}>
          <rect x="24" y={22 + i * 60} width="432" height="48" rx="12" fill="#fff" stroke="var(--ink-10)" />
          <circle cx="54" cy={46 + i * 60} r="12" fill={i === 0 ? A : "var(--ink-05)"} />
          <text x="54" y={51 + i * 60} textAnchor="middle" fontSize="13" fontWeight="700" fill={i === 0 ? "#fff" : "var(--ink-68)"} fontFamily="var(--font-sans), sans-serif">{i + 1}</text>
          <text x="80" y={51 + i * 60} fontSize="15" fontWeight="500" fill="var(--ink)" fontFamily="var(--font-sans), sans-serif">{t}</text>
          <rect x="356" y={34 + i * 60} width="86" height="24" rx="12" fill={i < 2 ? "var(--accent-soft)" : "var(--ink-05)"} />
          <text x="399" y={50 + i * 60} textAnchor="middle" fontSize="10" fontWeight="600" letterSpacing=".6" fill={i < 2 ? "var(--accent-strong)" : "var(--ink-68)"} fontFamily="var(--font-mono), monospace">{tag}</text>
        </g>
      ))}
    </>
  ),
  technical: (
    <>
      <circle cx="120" cy="140" r="64" fill="none" stroke="var(--ink-05)" strokeWidth="14" />
      <circle className="pr-a pr-ring" style={{ ...d(0), transform: "rotate(-90deg)", transformOrigin: "120px 140px", transformBox: "view-box" }} cx="120" cy="140" r="64" fill="none" stroke={A} strokeWidth="14" strokeLinecap="round" />
      <text x="120" y="136" textAnchor="middle" fontSize="12" fill="var(--ink-68)" fontFamily="var(--font-mono), monospace" letterSpacing=".6">SEO HEALTH</text>
      <path d="M104 156l12 12 22-26" fill="none" stroke={A} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="pr-a pr-draw" pathLength={1} style={d(1.4)} />
      {["Crawlable", "Indexable", "Fast templates", "Schema live"].map((t, i) => (
        <g key={t}>
          <rect x="226" y={52 + i * 50} width="230" height="38" rx="10" fill="#fff" stroke="var(--ink-10)" />
          <text x="278" y={76 + i * 50} fontSize="14" fontWeight="500" fill="var(--ink)" fontFamily="var(--font-sans), sans-serif">{t}</text>
          <Check x={252} y={71 + i * 50} delay={0.8 + i * 0.5} />
        </g>
      ))}
    </>
  ),
  pages: (
    <>
      <rect x="24" y="24" width="190" height="232" rx="16" fill="color-mix(in srgb, var(--yellow) 30%, white)" />
      <path d="M70 200l30-50 24 34 18-22 32 38z" fill={A} fillOpacity=".55" />
      <circle cx="160" cy="84" r="16" fill={Y} />
      <rect className="pr-a pr-grow" style={d(0.2)} x="240" y="30" width="214" height="18" rx="9" fill={A} />
      <rect className="pr-a pr-grow" style={d(0.7)} x="240" y="58" width="150" height="10" rx="5" fill="var(--ink-10)" />
      <rect className="pr-a pr-grow" style={d(1)} x="240" y="76" width="180" height="10" rx="5" fill="var(--ink-10)" />
      <rect className="pr-a pr-pop" style={d(1.5)} x="240" y="102" width="110" height="34" rx="17" fill="var(--ink)" />
      <rect x="240" y="158" width="214" height="98" rx="12" fill="#fff" stroke="var(--ink-10)" />
      <text x="254" y="180" fontSize="10" fill="var(--ink-50)" fontFamily="var(--font-mono), monospace" letterSpacing=".6">GOOGLE PREVIEW</text>
      <rect className="pr-a pr-grow" style={d(2)} x="254" y="192" width="170" height="10" rx="5" fill={A} />
      <rect className="pr-a pr-grow" style={d(2.4)} x="254" y="212" width="186" height="7" rx="3.5" fill="var(--ink-10)" />
      <rect className="pr-a pr-grow" style={d(2.7)} x="254" y="226" width="140" height="7" rx="3.5" fill="var(--ink-10)" />
    </>
  ),
  content: (
    <>
      <rect x="130" y="18" width="220" height="244" rx="14" fill="#fff" stroke="var(--ink-10)" />
      <rect x="148" y="34" width="84" height="18" rx="9" fill="var(--accent-soft)" />
      <text x="190" y="47" textAnchor="middle" fontSize="9" fontWeight="600" letterSpacing=".8" fill="var(--accent-strong)" fontFamily="var(--font-mono), monospace">BUYING GUIDE</text>
      <rect className="pr-a pr-grow" style={d(0.2)} x="148" y="64" width="170" height="14" rx="7" fill="var(--ink)" />
      <rect className="pr-a pr-pop" style={d(0.9)} x="148" y="92" width="184" height="64" rx="10" fill="color-mix(in srgb, var(--yellow) 35%, white)" />
      <path className="pr-a pr-pop" style={d(1.1)} d="M170 142l26-30 20 22 16-16 24 24z" fill={A} fillOpacity=".6" />
      {[150, 128, 160, 100].map((w, i) => (
        <rect key={i} className="pr-a pr-grow" style={d(1.5 + i * 0.4)} x="148" y={172 + i * 20} width={w} height="8" rx="4" fill="var(--ink-10)" />
      ))}
      <rect className="pr-blink" x={252} y="231" width="3" height="12" fill={A} />
      <g className="pr-a pr-pop" style={d(2.6)}>
        <rect x="40" y="110" width="76" height="32" rx="16" fill={A} />
        <text x="78" y="131" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff" fontFamily="var(--font-sans), sans-serif">Ranks</text>
      </g>
    </>
  ),
  links: (
    <>
      {[[80, 64], [400, 64], [60, 204], [420, 204], [240, 246]].map(([x, y], i) => (
        <g key={i}>
          <path className="pr-a pr-draw" style={d(0.3 + i * 0.5)} pathLength={1} d={`M240 140L${x} ${y}`} stroke={A} strokeOpacity=".7" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <g className="pr-a pr-pop" style={d(0.6 + i * 0.5)}>
            <circle cx={x} cy={y} r="22" fill="#fff" stroke="var(--ink-10)" strokeWidth="2" />
            <rect x={x - 11} y={y - 6} width="22" height="5" rx="2.5" fill="var(--ink-10)" />
            <rect x={x - 11} y={y + 3} width="14" height="5" rx="2.5" fill={i % 2 ? Y : A} />
          </g>
        </g>
      ))}
      <circle className="pr-pulse" cx="240" cy="140" r="34" fill={A} />
      <circle cx="240" cy="140" r="34" fill={A} />
      <path d="M224 130h8l6 22h20l6-16h-28" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  report: (
    <>
      <text x="28" y="34" fontSize="14" fontWeight="600" fill="var(--ink)" fontFamily="var(--font-sans), sans-serif">Organic revenue</text>
      <g className="pr-a pr-pop" style={d(2.2)}>
        <rect x="350" y="16" width="106" height="26" rx="13" fill="var(--accent-soft)" />
        <text x="403" y="33" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent-strong)" fontFamily="var(--font-mono), monospace" letterSpacing=".4">NEXT 30 DAYS</text>
      </g>
      {[0, 1, 2].map((i) => <path key={i} d={`M28 ${70 + i * 40}H452`} stroke="var(--ink-05)" strokeWidth="1.5" />)}
      <path d="M28 170C80 164 110 150 160 134S250 108 300 86 400 52 452 44V190H28z" fill={A} fillOpacity=".1" />
      <path className="pr-a pr-draw" pathLength={1} d="M28 170C80 164 110 150 160 134S250 108 300 86 400 52 452 44" fill="none" stroke={A} strokeWidth="3.4" strokeLinecap="round" />
      <circle className="pr-a pr-pop" style={d(2.4)} cx="452" cy="44" r="7" fill="#fff" stroke={A} strokeWidth="3.4" />
      {[26, 34, 30, 48, 58, 74].map((h, i) => (
        <rect key={i} className="pr-a pr-rise" style={d(0.5 + i * 0.25)} x={36 + i * 70} y={256 - h} width="42" height={h} rx="8" fill={i > 3 ? A : "var(--ink-10)"} />
      ))}
    </>
  ),
};

export function ProcessVisual({ id }: { id: string }) {
  return (
    <svg aria-hidden viewBox="0 0 480 280" className="size-full">
      {scenes[id]}
    </svg>
  );
}
