"use client";

import { useEffect, useRef } from "react";

/** Case-study copy of the homepage hero backdrop. Glows drift and parallax over the first 400px of scroll. */
export function CaseStudyBackdrop() {
  const yellow = useRef<HTMLDivElement>(null);
  const pink = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      const y = Math.min(window.scrollY, 400) / 400;
      if (yellow.current) yellow.current.style.transform = `translate3d(0, ${y * 24}px, 0)`;
      if (pink.current) pink.current.style.transform = `translate3d(0, ${y * -20}px, 0)`;
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div ref={yellow} className="absolute inset-0 will-change-transform">
        <div className="absolute -left-[10%] -top-[18%] h-[640px] w-[min(980px,90vw)] animate-drift bg-[radial-gradient(closest-side,rgb(249_249_6/.7),transparent)]" />
      </div>
      <div ref={pink} className="absolute inset-0 will-change-transform">
        <div className="absolute -right-[12%] top-[8%] h-[640px] w-[min(900px,85vw)] animate-drift bg-[radial-gradient(closest-side,rgb(223_55_167/.3),transparent)] [animation-direction:alternate-reverse]" />
      </div>
      <div className="dots absolute inset-x-0 top-0 h-full opacity-80" />
      <div className="absolute inset-x-0 bottom-0 h-[140px] bg-gradient-to-b from-transparent to-white" />
    </div>
  );
}
