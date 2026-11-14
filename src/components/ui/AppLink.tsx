import Link from "next/link";
import type { ComponentProps } from "react";
import { bookCallHref } from "@content/data";
import { calAttrs } from "@/lib/cal";

/** Internal link that doesn't prefetch (many nav targets are future pages). External links get rel/target. */
export function AppLink({ href, ...props }: ComponentProps<typeof Link>) {
  const url = typeof href === "string" ? href : (href.pathname ?? "");
  // Every "book a call" / contact link opens the Cal.com booking pop-up instead of navigating.
  if (url === bookCallHref) {
    const { children, className, onClick, ...rest } = props;
    return (
      <button type="button" {...calAttrs} className={`cursor-pointer text-left ${className ?? ""}`} aria-label={rest["aria-label"]} onClick={onClick as React.MouseEventHandler<HTMLButtonElement> | undefined}>
        {children}
      </button>
    );
  }
  if (/^https?:\/\//.test(url)) {
    const { children, className, ...rest } = props;
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={className} aria-label={rest["aria-label"]}>
        {children}
      </a>
    );
  }
  return <Link href={href} prefetch={false} {...props} />;
}
