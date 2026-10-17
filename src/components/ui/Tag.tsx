import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "success" | "warn" | "danger" | "neutral" | "accent";
const tones: Record<Tone, string> = {
  success: "bg-success-bg text-success-fg",
  warn: "bg-warn-bg text-warn-fg",
  danger: "bg-danger-bg text-danger-fg",
  neutral: "bg-ink-05 text-ink-68",
  accent: "bg-accent-soft text-accent-strong",
};

export function Tag({ children, tone = "neutral", className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-xs px-2 py-0.5 font-mono text-[11px] font-medium uppercase leading-[18px] tracking-[0.04em]", tones[tone], className)}>
      {children}
    </span>
  );
}
