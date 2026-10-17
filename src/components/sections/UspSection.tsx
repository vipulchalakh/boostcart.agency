import { Check } from "lucide-react";
import { usps } from "@content/data";
import { Annotation } from "@/components/ui/Annotation";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { UspVisual } from "./UspMocks";

export function UspSection() {
  return (
    <section id="why-boostcart" aria-labelledby="usp-title" className="px-2 py-2">
      <div className="on-dark relative isolate overflow-hidden rounded-panel bg-panel-dark px-5 py-16 text-white md:px-10 lg:px-16 lg:py-32">
        <div aria-hidden className="dots-dark absolute inset-0 -z-10" />
        <div aria-hidden className="absolute left-1/2 top-[55%] -z-10 h-[520px] w-[720px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgb(223_55_167/.28),transparent)]" />

        <Reveal bare>
          <svg aria-hidden viewBox="0 0 120 120" className="absolute -bottom-2 -left-2 hidden size-32 text-accent md:block" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path pathLength={1} className="draw-path" d="M60 62c4-6 12-4 12 3s-8 14-18 12-16-12-12-24 18-20 32-16 24 20 18 36-26 28-44 22S6 70 12 50" />
          </svg>
          <div className="relative mx-auto max-w-[760px] text-center">
            <Eyebrow>Why BoostCart</Eyebrow>
            <h2 id="usp-title" className="h2-xl mt-4 text-white">Why stores choose BoostCart</h2>
            <p className="lead mx-auto mt-5 max-w-[620px]">Four commitments we hold ourselves to on every account.</p>
            <Annotation dark arrow="curve-right" rotate={-4} className="absolute -right-44 top-0 hidden xl:flex">click through all four</Annotation>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 max-w-[1180px] lg:mt-16">
          <div className="usp-tabs">
            {usps.map((u, i) => (
              <input key={u.id} type="radio" name="usp-tab" id={`usp-tab-${u.id}`} defaultChecked={i === 0} aria-label={u.tab} className="sr-only" />
            ))}
            <div className="usp-tablist grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {usps.map((u) => (
                <label key={u.id} htmlFor={`usp-tab-${u.id}`} className="usp-tab flex min-h-12 items-center justify-center rounded-md border px-3 py-3 text-center font-mono text-[12px] font-medium uppercase leading-4 tracking-[0.12em] transition-[background-color,border-color,color,box-shadow] duration-200">
                  {u.tab}
                </label>
              ))}
            </div>

            <div className="usp-panels">
          {usps.map((u) => (
            <div key={u.id} id={`usp-panel-${u.id}`} role="group" aria-label={u.tab} className="mt-6 rounded-xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-sm lg:p-4">
              <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-10">
                <div className="ind-swap relative min-h-[300px] overflow-hidden rounded-lg bg-[linear-gradient(135deg,rgb(223_55_167/.55),rgb(34_34_34)_85%)] ring-1 ring-white/10 sm:min-h-[360px]">
                  <div aria-hidden className="dots-dark absolute inset-0" />
                  <div className="relative size-full"><UspVisual kind={u.visual} /></div>
                </div>
                <div className="ind-swap flex flex-col justify-center py-2 lg:py-6 lg:pr-6">
                  <p className="font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-[#ff6ec7]">{u.tab}</p>
                  <h3 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-[-0.03em] text-white md:text-4xl">{u.title}</h3>
                  <p className="mt-4 text-base leading-[1.6] text-white/70">{u.description}</p>
                  <p className="mt-6 text-sm font-medium text-white">Includes:</p>
                  <ul className="mt-3 space-y-2.5">
                    {u.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-3 text-[15px] leading-6 text-white/85">
                        <Check aria-hidden className="mt-1 size-4 shrink-0 text-[#ff6ec7]" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
