"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const subscribe = () => () => {};

/**
 * Seamless looping track. The server HTML carries the items exactly once (clean content for crawlers and
 * LLMs); the looping copy is added after hydration as an inert, aria-hidden duplicate, and the animation
 * only starts then.
 */
export function MarqueeLoop({ children, className, duration, label, reverse }: { children: ReactNode; className?: string; duration: string; label: string; reverse?: boolean }) {
  const ready = useSyncExternalStore(subscribe, () => true, () => false);
  return (
    <div className={cn("marquee marquee-scroll marquee-mask overflow-hidden", className)} role="group" aria-label={label}>
      <div className={cn("marquee-track flex w-max will-change-transform", ready && (reverse ? "animate-marquee-reverse" : "animate-marquee"))} style={{ animationDuration: duration }}>
        {children}
        {ready && (
          <div aria-hidden inert className="flex shrink-0">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
