"use client";

import { useEffect, useRef } from "react";

/** Layered CSS background behind navbar + hero + proof (homepage.md §5). Glows drift and parallax over the first 600px. */
export function HeroBackdrop() {
  const yellow = useRef<HTMLDivElement>(null);
  const pink = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      const y = Math.min(window.scrollY, 600) / 600;
      if (yellow.current) yellow.current.style.transform = `translate3d(0, ${y * 28}px, 0)`;
      if (pink.current) pink.current.style.transform = `translate3d(0, ${y * -24}px, 0)`;
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
        <div className="absolute -left-[10%] -top-[8%] h-[760px] w-[min(1100px,90vw)] animate-drift bg-[radial-gradient(closest-side,rgb(249_249_6/.8),transparent)]" />
      </div>
      <div ref={pink} className="absolute inset-0 will-change-transform">
        <div className="absolute -right-[12%] top-[260px] h-[900px] w-[min(1000px,85vw)] animate-drift bg-[radial-gradient(closest-side,rgb(223_55_167/.34),transparent)] [animation-direction:alternate-reverse]" />
        <div className="absolute -right-[6%] top-[1500px] h-[700px] w-[min(700px,70vw)] bg-[radial-gradient(closest-side,rgb(223_55_167/.2),transparent)]" />
      </div>
      <div className="dots absolute inset-x-0 top-0 h-[900px] opacity-80" />
      <div className="absolute inset-x-0 bottom-0 h-[260px] bg-gradient-to-b from-transparent to-white" />
    </div>
  );
}
