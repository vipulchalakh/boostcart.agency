"use client";

import { useRef, type ReactNode } from "react";

/** Perspective-tilted visual that shifts ±3° with the pointer (desktop only, off for reduced motion). */
export function Tilt({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.setProperty("--tx", `${x * 6}deg`);
    ref.current.style.setProperty("--ty", `${y * -6}deg`);
  };
  const reset = () => {
    ref.current?.style.setProperty("--tx", "0deg");
    ref.current?.style.setProperty("--ty", "0deg");
  };
  return (
    <div onPointerMove={move} onPointerLeave={reset} className="absolute inset-0">
      <div
        ref={ref}
        className="tilt absolute left-[8%] top-[18%] w-[780px] origin-center transition-transform duration-[var(--dur-med)] ease-[var(--ease-out-quart)] max-lg:left-[6%] max-lg:top-0 max-lg:w-[620px]"
      >
        {children}
      </div>
    </div>
  );
}
