"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/* One shared IntersectionObserver for every <Reveal> (homepage.md §3.7). */
let observer: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, () => void>();

function observe(el: Element, cb: () => void) {
  if (typeof IntersectionObserver === "undefined") return cb();
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        callbacks.get(e.target)?.();
        callbacks.delete(e.target);
        observer?.unobserve(e.target);
      }
    },
    { threshold: 0.2 },
  );
  callbacks.set(el, cb);
  observer.observe(el);
}

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms. */
  delay?: number;
  /** `bare` only toggles `.is-visible` (for draw/animate-on-view children), without the fade. */
  bare?: boolean;
  as?: "div" | "li" | "section" | "span";
  style?: CSSProperties;
};

export function Reveal({ children, className, delay = 0, bare, as: Tag = "div", style }: Props) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    observe(el, () => el.classList.add("is-visible"));
    return () => {
      callbacks.delete(el);
      observer?.unobserve(el);
    };
  }, []);
  return (
    <Tag ref={ref as never} className={cn(!bare && "reveal", className)} style={{ ...style, ["--d" as string]: `${delay}ms` }}>
      {children}
    </Tag>
  );
}
