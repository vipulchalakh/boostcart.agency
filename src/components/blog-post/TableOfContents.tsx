"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Heading } from "./headings";

type Props = { headings: Heading[]; variant?: "sidebar" | "inline"; className?: string };

/** Highlights the heading currently being read. */
function useActiveHeading(headings: Heading[]) {
  const [active, setActive] = useState(headings[0]?.id ?? "");
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = headings[0]?.id ?? "";
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 140) current = h.id;
        else break;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [headings]);
  return active;
}

export function TableOfContents({ headings, variant = "sidebar", className }: Props) {
  const active = useActiveHeading(headings);
  const details = useRef<HTMLDetailsElement>(null);
  if (headings.length < 2) return null;

  const list = (
    <ol className={cn("relative space-y-0.5 border-l border-ink-10", variant === "sidebar" && "max-h-[calc(100vh-26rem)] min-h-24 overflow-y-auto overscroll-contain pr-1")}>
      {headings.map((h) => {
        const isActive = h.id === active;
        return (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              aria-current={isActive ? "location" : undefined}
              onClick={() => {
                if (details.current) details.current.open = false;
              }}
              className={cn(
                "-ml-px block border-l-2 py-1.5 pr-2 text-sm leading-5 transition-[color,border-color,background-color] duration-200 ease-[var(--ease-ui)]",
                h.level === 3 ? "pl-7" : "pl-4",
                isActive ? "border-accent font-medium text-ink" : "border-transparent text-ink-50 hover:border-ink-20 hover:text-ink",
              )}
            >
              {h.text}
            </a>
          </li>
        );
      })}
    </ol>
  );

  if (variant === "inline") {
    return (
      <details ref={details} className={cn("group rounded-xl border border-ink-10 bg-white shadow-xs", className)}>
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 [&::-webkit-details-marker]:hidden">
          <span className="eyebrow text-ink">On this page</span>
          <ChevronDown aria-hidden className="size-4 text-ink-50 transition-transform duration-200 group-open:rotate-180" />
        </summary>
        <nav aria-label="Table of contents" className="px-5 pb-5">
          {list}
        </nav>
      </details>
    );
  }

  return (
    <nav aria-label="Table of contents" className={className}>
      <p className="eyebrow mb-3 text-ink">On this page</p>
      {list}
    </nav>
  );
}
