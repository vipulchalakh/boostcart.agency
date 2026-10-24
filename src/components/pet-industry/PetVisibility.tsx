import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MarqueeLoop } from "@/components/ui/MarqueeLoop";
import { Reveal } from "@/components/ui/Reveal";

/** Where pet owners look before they buy: search engines, AI assistants, video and communities. Marks live in /public/logos/search. */
const places = [
  { name: "Google", src: "/logos/search/google.svg" },
  { name: "ChatGPT", src: "/logos/search/chatgpt.svg" },
  { name: "Gemini", src: "/logos/search/gemini.svg" },
  { name: "Claude", src: "/logos/search/claude.svg" },
  { name: "Perplexity", src: "/logos/search/perplexity.svg" },
  { name: "Reddit", src: "/logos/search/reddit.svg" },
  { name: "YouTube", src: "/logos/search/youtube.svg" },
  { name: "Bing", src: "/logos/search/bing.svg" },
  { name: "Pinterest", src: "/logos/search/pinterest.svg" },
];

/** Centred header over a looping row of logo tiles, held to the container width. */
export function PetVisibility() {
  return (
    <section aria-labelledby="visibility-title" className="section-y overflow-hidden">
      <div className="container-x">
        <Reveal className="mx-auto max-w-[960px] text-center">
          <Eyebrow>Visibility</Eyebrow>
          <h2 id="visibility-title" className="h2 mt-4">Visible everywhere pet owners search</h2>
          <p className="lead mx-auto mt-4 max-w-[760px]">Owners compare food and gear in search results, AI answers, videos and communities. We check where your store shows up in each, and what to fix.</p>
        </Reveal>
      </div>

      {/* Held to the same width as the header. Each half of the loop holds the set twice, so it is always wider than the container and never shows a gap. */}
      <Reveal className="container-x mt-12">
        <MarqueeLoop duration="60s" label="Places pet owners search">
          {[false, true].map((copy) => (
            <ul key={String(copy)} aria-hidden={copy || undefined} className="flex shrink-0 items-center gap-5 pr-5">
              {places.map((p) => (
                <li key={p.name} className="group grid size-24 shrink-0 place-items-center rounded-2xl border border-ink-05 bg-white shadow-xs transition-[transform,box-shadow] duration-[var(--dur-med)] ease-[var(--ease-out-quart)] hover:-translate-y-1 hover:shadow-md sm:size-28">
                  <Image src={p.src} alt={copy ? "" : p.name} width={44} height={44} unoptimized className="size-10 object-contain sm:size-11" />
                </li>
              ))}
            </ul>
          ))}
        </MarqueeLoop>
      </Reveal>

      <p className="container-x mx-auto mt-8 max-w-[640px] text-center text-sm text-ink-68">AI answers change between runs, so we report visibility there as an indication, not a guarantee.</p>
    </section>
  );
}
