import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { AppLink } from "./AppLink";

type Variant = "primary" | "secondary" | "ghost" | "ghost-dark" | "light";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap font-sans transition-[transform,box-shadow,background-color,filter,color] duration-200 ease-[var(--ease-ui)] hover:-translate-y-px active:translate-y-0 active:scale-[.99] motion-reduce:transform-none";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white shadow-xs [box-shadow:var(--shadow-xs),inset_0_0_0_1px_rgb(2_6_23/.15)] hover:brightness-[1.06] hover:shadow-md",
  secondary: "bg-transparent text-ink [box-shadow:var(--ring-inset)] hover:bg-ink-05",
  ghost: "bg-transparent text-ink hover:bg-ink-05",
  "ghost-dark": "bg-glass-05 text-white [box-shadow:inset_0_0_0_1px_var(--glass-11)] hover:bg-glass-11",
  light: "bg-white text-ink shadow-xs hover:shadow-md",
};

const sizes: Record<Size, string> = {
  sm: "rounded-sm px-3 py-1 text-sm font-medium leading-[21px]",
  md: "rounded-md px-6 py-2 text-sm font-medium leading-[21px]",
  lg: "rounded-md px-6 py-3.5 text-xl font-semibold leading-[27px] tracking-[-0.01em] max-sm:w-full",
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  sheen?: boolean;
  className?: string;
} & ({ href: string; onClick?: never; type?: never } | { href?: never; onClick?: () => void; type?: "button" | "submit" });

export function Button({ children, variant = "primary", size = "md", arrow, sheen, className, ...rest }: Props) {
  const cls = cn(base, variants[variant], sizes[size], className);
  const inner = (
    <>
      {sheen && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent motion-safe:animate-[sheen_6s_ease-in-out_infinite]"
        />
      )}
      <span className="relative">{children}</span>
      {arrow && <ArrowRight aria-hidden className="relative size-[1.1em] transition-transform duration-200 group-hover/btn:translate-x-[3px]" />}
    </>
  );
  if ("href" in rest && rest.href) {
    return (
      <AppLink href={rest.href} className={cls}>
        {inner}
      </AppLink>
    );
  }
  return (
    <button type={(rest as { type?: "button" | "submit" }).type ?? "button"} onClick={(rest as { onClick?: () => void }).onClick} className={cls}>
      {inner}
    </button>
  );
}
