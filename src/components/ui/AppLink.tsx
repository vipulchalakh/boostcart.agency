import Link from "next/link";
import type { ComponentProps } from "react";

/** Internal link that doesn't prefetch (many nav targets are future pages). External links get rel/target. */
export function AppLink({ href, ...props }: ComponentProps<typeof Link>) {
  const url = typeof href === "string" ? href : (href.pathname ?? "");
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
