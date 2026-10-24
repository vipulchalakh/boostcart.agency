import { bookCallHref } from "@content/data";
import { Button } from "@/components/ui/Button";

/** Dark conversion card pinned beside the article. */
export function SidebarCta() {
  return (
    <aside aria-labelledby="post-cta-title" className="on-dark relative isolate overflow-hidden rounded-2xl bg-panel-dark p-6 text-white">
      <span aria-hidden className="dots-dark absolute inset-0 -z-10" />
      <span aria-hidden className="absolute left-1/2 top-[78%] -z-10 h-[300px] w-[360px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgb(223_55_167/.28),transparent)]" />
      <p className="eyebrow text-xs">Free store audit</p>
      <p id="post-cta-title" className="mt-3 text-balance font-display text-[1.375rem] font-bold leading-[1.2] tracking-[-0.015em]">
        Is your store leaving organic revenue on the table?
      </p>
      <p className="mt-3 text-sm leading-6 text-white/70">We&rsquo;ll review your Shopify, WooCommerce or BigCommerce store and show you where the biggest SEO wins are.</p>
      <Button href={bookCallHref} arrow sheen className="mt-5 w-full">
        Get your free audit
      </Button>
    </aside>
  );
}
