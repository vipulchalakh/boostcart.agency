import { Check, PawPrint } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PetLeadForm } from "./PetLeadForm";

const gets = ["Crawl and variant check", "Pet-type search gaps", "Top fixes in priority order"];

/** Lead capture after the testimonials: pitch and audit checklist on a soft pink panel, form beside it. */
export function PetLeadSection() {
  return (
    <section id="audit" aria-labelledby="lead-title" className="lead-section py-[var(--section-y)]">
      <div className="container-x">
        <Reveal bare className="grid overflow-hidden rounded-2xl border border-ink-05 bg-white shadow-xs lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
          <div className="relative overflow-hidden px-6 py-10 sm:px-10 lg:py-12" style={{ background: "color-mix(in srgb, var(--accent) 7%, white)" }}>
            <div aria-hidden className="absolute -right-16 -top-20 size-72 rounded-full opacity-60 blur-3xl" style={{ background: "color-mix(in srgb, var(--accent) 38%, transparent)" }} />
            <div aria-hidden className="dots absolute inset-0 opacity-60" />
            <PawPrint aria-hidden className="ind-float pointer-events-none absolute -bottom-8 -right-6 size-56 -rotate-12 text-accent/15 sm:size-72" strokeWidth={1.2} />

            <div className="relative z-10 max-w-[420px]">
              <Eyebrow>Get a free audit</Eyebrow>
              <h2 id="lead-title" className="h2 mt-4 !text-[clamp(2rem,1.5rem+1.6vw,2.75rem)]">Let&rsquo;s find what&rsquo;s holding your pet store back</h2>
              <p className="mt-4 text-base leading-[1.6] text-ink-68">Tell us about your store and we&rsquo;ll send back a short, prioritised review. No obligation.</p>
              <ul className="mt-8 grid gap-3">
                {gets.map((g) => (
                  <li key={g} className="flex items-center gap-3 text-[15px] font-medium leading-[22px] text-ink">
                    <span aria-hidden className="grid size-5 shrink-0 place-items-center rounded-full bg-success-dot text-white"><Check className="size-3" strokeWidth={3} /></span>
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-full"><PetLeadForm /></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
