"use client";

import { useEffect, useRef, useState } from "react";

/** Shows `start` as soon as it scrolls into view, then keeps counting up. Reduced motion: stays at `start`. */
export function KeywordTicker({ start }: { start: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(start);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const tick = () => {
        setN((v) => v + 1 + Math.floor(Math.random() * 3));
        timer = window.setTimeout(tick, 1400 + Math.random() * 1200);
      };
      timer = window.setTimeout(tick, 900);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); window.clearTimeout(timer); };
  }, []);

  return <span ref={ref} className="tabular-nums">{n.toLocaleString("en-US")}</span>;
}
