import Image from "next/image";
import { cn } from "@/lib/cn";

/** Placeholder mark (owner to supply final logo): concentric badge with a cart + rising arrow. */
export function LogoMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden className={className}>
      <circle cx="16" cy="16" r="15" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="11" stroke="var(--ink)" strokeWidth="1.5" strokeOpacity=".25" />
      <path d="M8.5 11h2.2l1.7 8h8.2l1.5-5.6H12" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="13.2" cy="22" r="1.2" fill="var(--ink)" />
      <circle cx="19.6" cy="22" r="1.2" fill="var(--ink)" />
      <path d="M17 12.2l3-3.2m0 0h-2.6m2.6 0v2.6" stroke="var(--accent-strong)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Brand lockup (icon + wordmark). The PNG carries transparent padding, trimmed here with negative margins. */
const sizes = {
  header: "-my-[13px] -ml-[7px] h-[44px] sm:-my-[15px] sm:-ml-2 sm:h-[52px]",
  footer: "-my-[15px] -ml-2 h-[52px] sm:-my-[21px] sm:-ml-[11px] sm:h-[72px]",
};

export function Logo({ className, variant = "header" }: { className?: string; variant?: keyof typeof sizes }) {
  return (
    <Image
      src="/boostcart-logo.png"
      alt="BoostCart"
      width={720}
      height={240}
      priority={variant === "header"}
      unoptimized
      className={cn(sizes[variant], "w-auto max-w-none", className)}
    />
  );
}
