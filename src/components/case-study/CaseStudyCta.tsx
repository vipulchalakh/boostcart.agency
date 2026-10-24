import { bookCallHref } from "@content/data";
import { Button } from "@/components/ui/Button";

export function CaseStudyCta() {
  return (
    <aside aria-labelledby="case-cta-title" className="on-dark relative isolate overflow-hidden rounded-2xl bg-panel-dark p-6 text-white">
      <span aria-hidden className="dots-dark absolute inset-0 -z-10" />
      <span aria-hidden className="absolute left-1/2 top-[78%] -z-10 h-[300px] w-[360px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgb(223_55_167/.28),transparent)]" />
      <p className="eyebrow text-xs">Free store audit</p>
      <p id="case-cta-title" className="mt-3 text-balance font-display text-[1.375rem] font-bold leading-[1.2] tracking-[-0.015em]">
        Want results like these for your store?
      </p>
      <p className="mt-3 text-sm leading-6 text-white/70">Tell us about your store and we&rsquo;ll show you where your biggest organic wins are.</p>
      <Button href={bookCallHref} arrow sheen className="mt-5 w-full">
        Get your free audit
      </Button>
    </aside>
  );
}
