import Image from "next/image";
import { Check } from "lucide-react";
import { auditHref } from "@content/data";
import { Annotation } from "@/components/ui/Annotation";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const engines = [
  { name: "Google", src: "/logos/search/google.svg" },
  { name: "ChatGPT", src: "/logos/search/chatgpt.svg" },
  { name: "Perplexity", src: "/logos/search/perplexity.svg" },
  { name: "Gemini", src: "/logos/search/gemini.svg" },
  { name: "Claude", src: "/logos/search/claude.svg" },
];

function PanelHead({ label, ai }: { label: string; ai?: boolean }) {
  return (
    <p className={cn("mb-4 font-mono text-[12px] font-medium uppercase tracking-[0.12em]", ai ? "text-[#ff6ec7]" : "text-white/50")}>{label}</p>
  );
}

export function SearchShift() {
  return (
    <section aria-labelledby="shift-title" className="px-2 py-2">
      <div className="on-dark relative isolate overflow-hidden rounded-panel bg-panel-dark px-5 py-16 text-white md:px-10 lg:px-8 lg:py-28">
        <div aria-hidden className="dots-dark absolute inset-0 -z-10" />
        <div aria-hidden className="absolute -right-24 top-[28%] -z-10 h-[560px] w-[640px] bg-[radial-gradient(closest-side,rgb(223_55_167/.3),transparent)]" />
        <div aria-hidden className="absolute -left-32 -top-20 -z-10 h-[420px] w-[520px] bg-[radial-gradient(closest-side,rgb(249_249_6/.08),transparent)]" />

        <Reveal bare>
          <div className="relative mx-auto max-w-[780px] text-center">
            <Eyebrow>How shoppers find stores now</Eyebrow>
            <h2 id="shift-title" className="h2-xl mt-4 text-white">From search results to answers</h2>
            <p className="lead mx-auto mt-5 max-w-[640px]">Shoppers still search on Google. More and more of them simply ask AI. We make sure your store gets found in both.</p>
            <Annotation dark arrow="curve-right" rotate={-4} className="absolute -right-44 top-2 hidden xl:flex">same shopper, same goal</Annotation>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 max-w-[var(--container)] lg:mt-16">
          <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-2 lg:gap-8">
            <Reveal delay={0} className="h-full">
              <div className="h-full rounded-xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-sm md:p-5">
                <PanelHead label="Traditional search · the old way" />
                <Image src="/gifs/search-traditional.gif" alt="Animation of a shopper searching on Google, scanning results, comparing sites in several tabs, browsing a category page and choosing a product" width={770} height={625} unoptimized priority={false} className="block h-auto w-full rounded-xl" />
                <p className="mt-4 flex items-center gap-2 text-sm text-white/60">
                  <Check aria-hidden className="size-4 text-white/60" /> Found it in 5 steps across 4 tabs.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120} className="h-full">
              <div className="relative h-full rounded-xl border border-[rgb(223_55_167/.55)] bg-white/[0.06] p-3 shadow-[0_0_0_1px_rgb(223_55_167/.35),0_32px_64px_-28px_rgb(223_55_167/.5)] backdrop-blur-sm md:p-5">
                <PanelHead ai label="AI search · the new way" />
                <Image src="/gifs/search-ai.gif" alt="Animation of a shopper asking an AI assistant one question, getting product recommendations with sources and going straight to the product page" width={770} height={614} unoptimized className="block h-auto w-full rounded-xl" />
                <p className="mt-4 flex items-center gap-2 text-sm text-[#ff6ec7]">
                  <Check aria-hidden className="size-4" /> Found it in 3 steps, straight to your product page.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal className="mx-auto mt-14 max-w-[900px] text-center">
            <h3 className="font-display text-2xl font-bold tracking-[-0.03em] text-white md:text-3xl">Rank where shoppers search. Be the answer they get.</h3>
            <p className="mt-3 text-base leading-[1.6] text-white/70">Strong technical SEO, clear product data and trusted content help you rank on Google and give AI tools something worth recommending. One program covers both.</p>
            <ul aria-label="Where we build your visibility" className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
              {engines.map((e) => (
                <li key={e.name} className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-ink shadow-xs">
                  <Image src={e.src} alt="" aria-hidden width={18} height={18} unoptimized className="size-[18px] object-contain" />
                  {e.name}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-center">
              <Button href={auditHref} size="lg" arrow>Get my free SEO and AI SEO audit</Button>
            </div>
          </Reveal>
        </div>
      </div>
      <p className="sr-only">
        Traditional search journey: search on Google, scan ads and results, compare several sites in separate tabs, browse a category page, then pick a product. AI search journey: ask one question in plain language, get a recommendation with sources, and go straight to the product page.
      </p>
    </section>
  );
}
