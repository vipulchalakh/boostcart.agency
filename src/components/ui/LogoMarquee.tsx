import type { ReactNode } from "react";
import { clientLogos, type ClientLogo } from "@content/data";
import { cn } from "@/lib/cn";
import { MarqueeLoop } from "./MarqueeLoop";

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const marks: Record<ClientLogo["mark"], ReactNode> = {
  sun: <><circle cx="12" cy="12" r="4" fill="currentColor" /><path {...stroke} d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9L7 7M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" /></>,
  leaf: <><path {...stroke} d="M5 19C5 10 10 5 19 5c0 9-5 14-14 14zM5 19l8-8" /></>,
  bars: <><rect x="4" y="10" width="4" height="10" rx="1" fill="currentColor" /><rect x="10" y="4" width="4" height="16" rx="1" fill="currentColor" /><rect x="16" y="8" width="4" height="12" rx="1" fill="currentColor" /></>,
  cube: <path {...stroke} d="M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5" />,
  flower: <><circle cx="12" cy="6" r="3.5" fill="currentColor" /><circle cx="18" cy="12" r="3.5" fill="currentColor" /><circle cx="12" cy="18" r="3.5" fill="currentColor" /><circle cx="6" cy="12" r="3.5" fill="currentColor" /></>,
  house: <path {...stroke} d="M4 11l8-7 8 7v9H4zM10 20v-5h4v5" />,
  wave: <path {...stroke} d="M2 9c3-4 5-4 8 0s5 4 8 0 3-3 4-2M2 16c3-4 5-4 8 0s5 4 8 0 3-3 4-2" />,
  diamond: <path d="M12 3l9 9-9 9-9-9z" fill="currentColor" />,
  bolt: <path d="M13 2L5 14h6l-1 8 8-12h-6z" fill="currentColor" />,
  hex: <><path {...stroke} d="M12 2.5l8.2 4.75v9.5L12 21.5l-8.2-4.75v-9.5z" /><circle cx="12" cy="12" r="2.5" fill="currentColor" /></>,
};

const word: Record<ClientLogo["style"], string> = {
  display: "font-display text-xl font-bold tracking-[-0.03em]",
  serif: "font-serif text-xl font-semibold italic tracking-[-0.01em]",
  wide: "text-[13px] font-semibold uppercase tracking-[0.22em]",
  sans: "text-lg font-medium tracking-[-0.02em]",
  mono: "font-mono text-sm font-medium uppercase tracking-[0.06em]",
};

/** Grey client-logo marquee. Dummy brands until real logos are supplied. */
export function LogoMarquee() {
  return (
    <MarqueeLoop className="py-2" duration="60s" label="Clients">
      <ul className="flex shrink-0 items-center gap-14 pr-14">
        {clientLogos.map((l) => (
          <li key={l.name} className="flex shrink-0 items-center gap-2 whitespace-nowrap text-ink-50">
            <svg aria-hidden viewBox="0 0 24 24" className="size-6 shrink-0">{marks[l.mark]}</svg>
            <span className={cn(word[l.style])}>{l.name}</span>
          </li>
        ))}
      </ul>
    </MarqueeLoop>
  );
}
