import { ChevronRight } from "lucide-react";
import { AppLink } from "@/components/ui/AppLink";
import { PageBackdrop } from "./PageBackdrop";

/** Centered page header for the company pages: breadcrumb, title and lead over the hero backdrop. */
export function PageHeader({ crumb, title, lead, note }: { crumb: string; title: string; lead: string; note?: string }) {
  return (
    <header className="relative isolate -mt-12 pb-12 pt-[10rem] text-center md:pb-16 md:pt-[11rem] lg:pt-[12rem]">
      <PageBackdrop />
      <div className="container-x">
        <div className="hero-fade mx-auto max-w-[860px]">
          <nav aria-label="Breadcrumb">
            <ol className="eyebrow flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
              <li className="flex items-center gap-1.5">
                <AppLink href="/" className="transition-colors hover:text-ink">Home</AppLink>
                <ChevronRight aria-hidden className="size-3.5 text-ink-32" />
              </li>
              <li>
                <span aria-current="page" className="text-ink">{crumb}</span>
              </li>
            </ol>
          </nav>
          <h1 className="mt-6 text-balance font-display text-[2.5rem] font-bold leading-[1.05] tracking-[-0.025em] text-ink sm:text-[3.25rem] md:text-[4rem]">{title}</h1>
          <p className="lead mx-auto mt-6 max-w-[40rem]">{lead}</p>
          {note && <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.04em] text-ink-50">{note}</p>}
        </div>
      </div>
    </header>
  );
}
