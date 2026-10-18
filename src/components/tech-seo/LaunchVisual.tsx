"use client";

import { useEffect, useRef } from "react";

/** A rocket on a glowing trail. The rocket drifts toward the pointer and boosts while the form has focus. */
export function LaunchVisual() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const section = el?.closest("section");
    if (!el || !section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      el.style.setProperty("--mx", String(((e.clientX - r.left) / r.width - 0.5) * 2));
      el.style.setProperty("--my", String(((e.clientY - r.top) / r.height - 0.5) * 2));
    };
    const leave = () => { el.style.setProperty("--mx", "0"); el.style.setProperty("--my", "0"); };
    section.addEventListener("pointermove", move);
    section.addEventListener("pointerleave", leave);
    return () => { section.removeEventListener("pointermove", move); section.removeEventListener("pointerleave", leave); };
  }, []);

  return (
    <div ref={root} aria-hidden className="pointer-events-none select-none" style={{ ["--mx" as string]: 0, ["--my" as string]: 0 }}>
      <svg viewBox="0 0 340 400" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id="lv-body" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff" /><stop offset=".6" stopColor="#fff" /><stop offset="1" stopColor="#efd9e6" /></linearGradient>
          <linearGradient id="lv-trail" gradientUnits="userSpaceOnUse" x1="190" y1="212" x2="-10" y2="335"><stop offset="0" stopColor="#f7a3d3" stopOpacity=".8" /><stop offset=".5" stopColor="#ffd0e8" stopOpacity=".5" /><stop offset="1" stopColor="#ffe6f3" stopOpacity="0" /></linearGradient>
          <radialGradient id="lv-flame" cx=".5" cy="0" r="1"><stop offset="0" stopColor="#fff" /><stop offset=".4" stopColor="#ffc2e4" /><stop offset="1" stopColor="#df37a7" stopOpacity="0" /></radialGradient>
          <filter id="lv-soft"><feGaussianBlur stdDeviation="7" /></filter>
        </defs>

        <path className="lead-trail" d="M190 212 C150 262 90 312 -10 345" fill="none" stroke="url(#lv-trail)" strokeWidth="30" strokeLinecap="round" filter="url(#lv-soft)" />
        <path className="lead-trail" d="M190 212 C150 262 90 312 -10 345" fill="none" stroke="url(#lv-trail)" strokeWidth="9" strokeLinecap="round" opacity=".8" />


        <g className="lead-mouse" style={{ transform: "translate(calc(var(--mx) * 14px), calc(var(--my) * 10px))" }}>
          <g className="lead-boost">
            <g className="lead-float">
              <g transform="translate(205 160) rotate(24)">
                <g className="lead-flame"><path d="M-11 48 C-14 74 -5 96 0 108 C5 96 14 74 11 48Z" fill="url(#lv-flame)" /></g>
                <path d="M-26 8 C-54 22 -60 50 -58 66 L-24 40Z" fill="#e8409f" />
                <path d="M26 8 C54 22 60 50 58 66 L24 40Z" fill="#cf2d8c" />
                <path d="M0 -92 C32 -62 36 -10 27 42 L-27 42 C-36 -10 -32 -62 0 -92Z" fill="url(#lv-body)" />
                <path d="M0 -92 C17 -74 25 -58 29 -46 Q0 -36 -29 -46 C-25 -58 -17 -74 0 -92Z" fill="#df37a7" />
                <rect x="-13" y="40" width="26" height="9" rx="3" fill="#b82378" />
                <circle cx="0" cy="-10" r="17" fill="#e8409f" />
                <circle cx="0" cy="-10" r="11" fill="#8d8494" />
                <circle cx="-3" cy="-13" r="4" fill="#fff" opacity=".45" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
