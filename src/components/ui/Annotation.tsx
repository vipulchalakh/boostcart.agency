import { cn } from "@/lib/cn";

type Arrow = "down" | "down-left" | "curve-right" | "loop";

/* Original hand-drawn arrows (pathLength=1 so the draw animation is length-independent). */
const arrows: Record<Arrow, { viewBox: string; d: string; head: string }> = {
  down: { viewBox: "0 0 60 70", d: "M10 6c18 4 34 16 34 34 0 8-3 14-8 20", head: "M29 52l7 9 9-8" },
  "down-left": { viewBox: "0 0 60 70", d: "M52 6C34 10 16 22 16 40c0 8 3 14 8 20", head: "M7 50l8 10 9-9" },
  "curve-right": { viewBox: "0 0 80 40", d: "M4 30c16-24 40-26 66-8", head: "M58 10l13 11-16 5" },
  loop: { viewBox: "0 0 70 60", d: "M6 44c10-30 40-34 44-14 3 14-22 12-18-2 3-12 20-14 32-2", head: "M54 22l8 6-9 4" },
};

type Props = {
  children: string;
  arrow?: Arrow;
  rotate?: number;
  /** Place the arrow before/after the text. */
  arrowSide?: "before" | "after";
  dark?: boolean;
  className?: string;
};

/** Decorative handwritten note. Hidden on small screens; must sit inside a `<Reveal bare>` to draw on view. */
export function Annotation({ children, arrow = "down", rotate = -6, arrowSide = "after", dark, className }: Props) {
  const a = arrows[arrow];
  const svg = (
    <svg viewBox={a.viewBox} className="h-12 w-12 shrink-0 overflow-visible" fill="none" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d={a.d} pathLength={1} className="draw-path" />
      <path d={a.head} pathLength={1} className="draw-path [animation-delay:900ms]" />
    </svg>
  );
  return (
    <div aria-hidden className={cn("pointer-events-none hidden select-none items-center gap-1 font-hand text-xl leading-tight text-accent md:flex", dark && "text-[#ff6ec7]", className)} style={{ transform: `rotate(${rotate}deg)` }}>
      {arrowSide === "before" && svg}
      <span className="max-w-[10rem] text-balance">{children}</span>
      {arrowSide === "after" && svg}
    </div>
  );
}
