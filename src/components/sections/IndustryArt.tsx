import type { ReactNode } from "react";

const A = "var(--accent)";
const Y = "var(--yellow)";
const NAVY = "var(--panel-navy)";
const W = "#fff";

const Spark = ({ x, y, s = 1, c = Y }: { x: number; y: number; s?: number; c?: string }) => (
  <path transform={`translate(${x} ${y}) scale(${s})`} d="M0-10 3-3 10 0 3 3 0 10-3 3-10 0-3-3Z" fill={c} />
);

/** Original vector scenes, one per industry. Brand colors only; decorative. */
const art: Record<string, ReactNode> = {
  shirt: (
    <>
      <path d="M120 70V60a8 8 0 1 0-8-8M120 70 68 118h104z" fill="none" stroke={W} strokeOpacity=".85" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M92 124 64 140l12 26 16-8v50h56v-50l16 8 12-26-28-16c-6 12-50 12-56 0z" fill={A} />
      <circle cx="120" cy="150" r="9" fill={Y} />
      <Spark x={184} y={70} s={1.2} />
    </>
  ),
  sparkles: (
    <>
      <path d="M92 110h56v90a14 14 0 0 1-14 14h-28a14 14 0 0 1-14-14z" fill={W} fillOpacity=".12" stroke={W} strokeOpacity=".55" strokeWidth="2" />
      <path d="M92 150h56v50a14 14 0 0 1-14 14h-28a14 14 0 0 1-14-14z" fill={A} />
      <rect x="108" y="82" width="24" height="28" rx="6" fill={W} />
      <path d="M112 82V68a8 8 0 0 1 16 0v14z" fill={Y} />
      <Spark x={176} y={88} s={1.3} />
      <Spark x={66} y={156} />
      <Spark x={182} y={176} s={.7} c={A} />
    </>
  ),
  "heart-pulse": (
    <>
      <rect x="84" y="108" width="72" height="104" rx="12" fill={W} fillOpacity=".12" stroke={W} strokeOpacity=".55" strokeWidth="2" />
      <rect x="90" y="82" width="60" height="26" rx="7" fill={A} />
      <rect x="96" y="132" width="48" height="52" rx="6" fill={W} fillOpacity=".92" />
      <rect x="116" y="144" width="8" height="26" rx="2" fill={A} />
      <rect x="107" y="153" width="26" height="8" rx="2" fill={A} />
      <g transform="rotate(-28 176 200)">
        <rect x="150" y="190" width="52" height="22" rx="11" fill={Y} />
        <path d="M161 190h15v22h-15a11 11 0 0 1 0-22z" fill={A} />
      </g>
      <Spark x={68} y={96} s={.9} />
    </>
  ),
  sofa: (
    <>
      <rect x="62" y="116" width="116" height="52" rx="18" fill={A} />
      <rect x="50" y="146" width="140" height="38" rx="14" fill={W} fillOpacity=".16" stroke={W} strokeOpacity=".6" strokeWidth="2" />
      <rect x="44" y="132" width="26" height="52" rx="12" fill={A} fillOpacity=".85" />
      <rect x="170" y="132" width="26" height="52" rx="12" fill={A} fillOpacity=".85" />
      <rect x="64" y="184" width="6" height="14" rx="3" fill={W} fillOpacity=".7" />
      <rect x="170" y="184" width="6" height="14" rx="3" fill={W} fillOpacity=".7" />
      <path d="M208 100l6-30h14l6 30z" fill={Y} />
      <path d="M221 100v96" stroke={W} strokeOpacity=".6" strokeWidth="3" />
      <rect x="210" y="194" width="22" height="6" rx="3" fill={W} fillOpacity=".7" />
    </>
  ),
  smartphone: (
    <>
      <rect x="70" y="56" width="84" height="148" rx="16" fill={NAVY} stroke={W} strokeOpacity=".7" strokeWidth="3" />
      <rect x="79" y="72" width="66" height="116" rx="7" fill={A} fillOpacity=".92" />
      <rect x="90" y="86" width="44" height="8" rx="4" fill={W} />
      <rect x="90" y="102" width="30" height="8" rx="4" fill={W} fillOpacity=".6" />
      <rect x="90" y="130" width="44" height="36" rx="7" fill={Y} />
      <rect x="168" y="140" width="42" height="52" rx="13" fill={W} fillOpacity=".14" stroke={W} strokeOpacity=".7" strokeWidth="2" />
      <circle cx="189" cy="166" r="12" fill={Y} />
      <Spark x={186} y={92} s={1.1} />
    </>
  ),
  gem: (
    <>
      <circle cx="120" cy="154" r="44" fill="none" stroke={Y} strokeWidth="10" />
      <path d="M120 58l30 22-30 40-30-40z" fill={A} />
      <path d="M90 80h60M120 58l-12 22 12 40 12-40z" fill="none" stroke={W} strokeOpacity=".7" strokeWidth="2" strokeLinejoin="round" />
      <Spark x={176} y={62} s={1.3} />
      <Spark x={64} y={110} s={.8} />
      <Spark x={186} y={140} s={.7} c={W} />
    </>
  ),
  coffee: (
    <>
      <path d="M104 88c-9-10 9-14 0-26M124 88c-9-10 9-14 0-26M144 88c-9-10 9-14 0-26" fill="none" stroke={W} strokeOpacity=".55" strokeWidth="3" strokeLinecap="round" />
      <rect x="78" y="100" width="92" height="15" rx="7.5" fill={W} />
      <path d="M84 116h80l-8 70a14 14 0 0 1-14 12h-36a14 14 0 0 1-14-12z" fill={A} />
      <path d="M88 144h72l-3 28H91z" fill={Y} />
      <ellipse cx="196" cy="196" rx="12" ry="8" transform="rotate(-30 196 196)" fill={Y} />
      <path d="M186 197c7-3 14-5 20-9" stroke={NAVY} strokeWidth="2" fill="none" />
    </>
  ),
  mountain: (
    <>
      <circle cx="184" cy="76" r="20" fill={Y} />
      <path d="M118 202l52-84 56 84z" fill={W} fillOpacity=".16" stroke={W} strokeOpacity=".5" strokeWidth="2" strokeLinejoin="round" />
      <path d="M30 202 96 92l66 110z" fill={A} />
      <path d="M96 92l-18 30 14-6 10 12 10-12 14 6z" fill={W} />
      <path d="M96 92V60" stroke={W} strokeWidth="3" strokeLinecap="round" />
      <path d="M96 60h24l-7 9 7 9H96z" fill={Y} />
      <path d="M24 202h192" stroke={W} strokeOpacity=".4" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  "paw-print": (
    <>
      <g transform="translate(-12 -6)" fill={A}>
        <path d="M120 200c-30 0-48-22-40-40 6-14 22-22 40-22s34 8 40 22c8 18-10 40-40 40z" />
        <ellipse cx="76" cy="118" rx="13" ry="18" transform="rotate(-24 76 118)" />
        <ellipse cx="103" cy="94" rx="13" ry="19" transform="rotate(-8 103 94)" />
        <ellipse cx="137" cy="94" rx="13" ry="19" transform="rotate(8 137 94)" />
        <ellipse cx="164" cy="118" rx="13" ry="18" transform="rotate(24 164 118)" />
      </g>
      <g transform="rotate(-28 188 196)" fill={Y}>
        <rect x="160" y="190" width="56" height="12" rx="6" />
        <circle cx="160" cy="190" r="8" /><circle cx="160" cy="202" r="8" />
        <circle cx="216" cy="190" r="8" /><circle cx="216" cy="202" r="8" />
      </g>
      <Spark x={190} y={84} s={1} c={W} />
    </>
  ),
  baby: (
    <>
      <ellipse cx="120" cy="212" rx="84" ry="8" fill={W} fillOpacity=".1" />
      <rect x="58" y="150" width="58" height="58" rx="9" fill={A} />
      <rect x="124" y="150" width="58" height="58" rx="9" fill={Y} />
      <g transform="rotate(-8 120 124)"><rect x="90" y="92" width="58" height="58" rx="9" fill={W} fillOpacity=".95" /></g>
      <g fontFamily="var(--font-display), sans-serif" fontWeight="800" fontSize="34" textAnchor="middle">
        <text x="87" y="190" fill={W}>A</text>
        <text x="153" y="190" fill={NAVY}>B</text>
        <text x="119" y="132" fill={A} transform="rotate(-8 120 124)">C</text>
      </g>
      <Spark x={184} y={88} s={1.2} />
      <Spark x={64} y={108} s={.8} c={W} />
    </>
  ),
};

export function IndustryArt({ icon }: { icon: string }) {
  return (
    <svg aria-hidden viewBox="0 0 240 240" className="ind-float size-full">
      <circle cx="120" cy="120" r="108" fill={W} fillOpacity=".05" stroke={W} strokeOpacity=".14" />
      <circle cx="150" cy="96" r="70" fill={A} fillOpacity=".22" />
      <circle cx="84" cy="168" r="46" fill={Y} fillOpacity=".12" />
      {art[icon]}
    </svg>
  );
}
