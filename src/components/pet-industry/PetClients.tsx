import Image from "next/image";
import { petClients } from "@content/data";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/** Logo boxes in one hairline-divided grid. Logos start grey and take their colour on hover. Images only, no links. */
export function PetClients() {
  return (
    <section aria-labelledby="clients-title" className="section-y">
      <div className="container-x">
        <Reveal className="mx-auto max-w-[960px] text-center">
          <Eyebrow>Clients we&rsquo;ve served</Eyebrow>
          <h2 id="clients-title" className="h2 mt-4">Pet brands that trust us with their search</h2>
        </Reveal>

        <Reveal className="mt-12">
          <ul className="mx-auto grid max-w-[1120px] grid-cols-2 gap-px overflow-hidden rounded-xl border border-ink-05 bg-ink-05 shadow-xs md:grid-cols-3">
            {petClients.map((c) => (
              <li key={c.name} className="group grid h-28 place-items-center bg-white px-6 transition-colors duration-200 hover:bg-ink-02 sm:h-36 sm:px-10">
                <Image
                  src={c.src}
                  alt={c.name}
                  width={c.width}
                  height={c.height}
                  unoptimized
                  className="max-h-12 w-auto max-w-[80%] object-contain opacity-60 grayscale transition-[filter,opacity,transform] duration-[var(--dur-med)] ease-[var(--ease-out-quart)] group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0 motion-reduce:transform-none sm:max-h-14"
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
