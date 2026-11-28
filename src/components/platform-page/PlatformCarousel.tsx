"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const arrow = "grid size-11 place-items-center rounded-full transition-[background-color,color,opacity,transform] duration-200 disabled:pointer-events-none active:scale-95 motion-reduce:transform-none";

/** Scroll-snap track with previous/next buttons. The cards stay in the server HTML and remain keyboard- and swipe-scrollable. */
export function PlatformCarousel({ children, label }: { children: ReactNode; label: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    update();
    const el = track.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li")?.getBoundingClientRect().width ?? 320;
    el.scrollBy({ left: dir * (card + 24), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <div>
      <div className="pc-controls mb-5 flex justify-end gap-2">
        <button type="button" aria-label="Previous platforms" disabled={edge.start} onClick={() => go(-1)} className={cn(arrow, "bg-ink-05 text-ink hover:bg-ink-10 disabled:opacity-40")}>
          <ArrowLeft aria-hidden className="size-5" />
        </button>
        <button type="button" aria-label="Next platforms" disabled={edge.end} onClick={() => go(1)} className={cn(arrow, "bg-ink text-white hover:bg-ink/85 disabled:opacity-40")}>
          <ArrowRight aria-hidden className="size-5" />
        </button>
      </div>
      <ul
        ref={track}
        onScroll={update}
        aria-label={label}
        tabIndex={0}
        className="pc-track -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-6 [scrollbar-width:none] md:gap-6 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
    </div>
  );
}
