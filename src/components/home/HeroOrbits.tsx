import Image from "next/image";
import type { CSSProperties } from "react";

type Planet = { name: string; src: string; ring: number; angle: number };

/* Concentric rings centred on the hero. Only the arcs at the left and right of the headline are visible, the rest
   is clipped or masked away. Radii are in vw so the arcs stay clear of the centred text at every desktop width.
   Angle 0 points right; 180 points left. */
const rings = [
  { r: 30, dur: 220 },
  { r: 37, dur: 300, reverse: true },
  { r: 44, dur: 380 },
];
const planets: Planet[] = [
  { name: "Google", src: "/logos/search/google.svg", ring: 0, angle: 192 },
  { name: "ChatGPT", src: "/logos/search/chatgpt.svg", ring: 1, angle: 170 },
  { name: "Claude", src: "/logos/search/claude.svg", ring: 2, angle: 184 },
  { name: "Gemini", src: "/logos/search/gemini.svg", ring: 0, angle: -12 },
  { name: "Perplexity", src: "/logos/search/perplexity.svg", ring: 1, angle: 10 },
  { name: "Bing", src: "/logos/search/bing.svg", ring: 2, angle: -4 },
];

function PlanetTile({ p }: { p: Planet }) {
  const r = rings[p.ring].r;
  return (
    <div className="absolute left-0 top-0" style={{ transform: `rotate(${p.angle}deg) translateX(${r}vw) rotate(${-p.angle}deg)` }}>
      <span className="-translate-x-1/2 -translate-y-1/2 relative grid size-[clamp(44px,3.6vw,64px)] place-items-center rounded-[18px] bg-white/80 shadow-[0_10px_30px_-8px_rgb(2_6_23/.22),0_0_0_1px_rgb(2_6_23/.06)] backdrop-blur-md">
        <span aria-hidden className="absolute -inset-3 -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(223_55_167/.22),transparent)]" />
        <span aria-hidden className="absolute inset-0 rounded-[18px] bg-[linear-gradient(145deg,rgb(255_255_255/.9),rgb(255_255_255/0)_55%)]" />
        <Image src={p.src} alt="" aria-hidden width={28} height={28} unoptimized className="relative size-[52%] object-contain" />
      </span>
    </div>
  );
}

/** Decorative orbit lines around the hero. The lines drift (dashes travel around each ring); the logo planets stay put. */
export function HeroOrbits() {
  return (
    <div aria-hidden className="orbit-fade pointer-events-none absolute inset-x-0 top-0 -z-[5] hidden h-[820px] overflow-hidden [mask-image:linear-gradient(to_bottom,#000_62%,transparent)] xl:block">
      <div className="absolute left-1/2 top-[360px] size-0">
        {rings.map((ring) => (
          <svg
            key={ring.r}
            viewBox="0 0 100 100"
            className={`${ring.reverse ? "orbit-ring-rev" : "orbit-ring"} absolute left-0 top-0 text-ink-20`}
            style={{ width: `${ring.r * 2}vw`, height: `${ring.r * 2}vw`, marginLeft: `-${ring.r}vw`, marginTop: `-${ring.r}vw`, ["--dur" as string]: `${ring.dur}s` } as CSSProperties}
          >
            <circle cx="50" cy="50" r="49.9" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 10" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>
        ))}
        {planets.map((p) => (
          <PlanetTile key={p.name} p={p} />
        ))}
      </div>
    </div>
  );
}
