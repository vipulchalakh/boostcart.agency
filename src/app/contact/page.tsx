import type { Metadata } from "next";
import { CalendarCheck, MapPin } from "lucide-react";
import { aboutOffices } from "@content/data";
import { ContactForm } from "@/components/company/ContactForm";
import { PageHeader } from "@/components/company/PageHeader";
import { breadcrumbLd, pageMeta, siteUrl } from "@/components/company/jsonLd";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const path = "/contact";
const title = "Contact BoostCart";
const description = "Talk to BoostCart about e-commerce SEO and AI SEO. Book a call or send us a message.";

export const metadata: Metadata = pageMeta(path, title, description);

const jsonLd = [
  breadcrumbLd("Contact", path),
  { "@context": "https://schema.org", "@type": "ContactPage", name: title, url: `${siteUrl}${path}`, description, isPartOf: { "@type": "WebSite", "@id": `${siteUrl}/#website` } },
];

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PageHeader crumb="Contact" title="Let’s talk about your store" lead="Book a call or send us a message. A real person reads everything." />

      <section aria-label="Ways to reach us" className="container-x pb-[var(--section-y)]">
        <div className="mx-auto grid max-w-[1100px] gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-10">
          <Reveal className="grid content-start gap-4">
            <div className="rounded-xl border border-ink-05 bg-white p-6 shadow-xs">
              <span className="grid size-10 place-items-center rounded-lg bg-accent-soft text-accent-strong"><CalendarCheck aria-hidden className="size-5" /></span>
              <h2 className="mt-4 font-display text-xl font-bold tracking-[-0.02em]">Book a 30-minute call</h2>
              <p className="mt-1.5 text-sm leading-[21px] text-ink-68">Pick a time that suits you and we&rsquo;ll talk through where your store stands and what to do first.</p>
              <div className="mt-4"><Button href="/book-a-call" size="md" arrow>Book a call</Button></div>
            </div>
            <div className="rounded-xl border border-ink-05 bg-white p-6 shadow-xs">
              <span className="grid size-10 place-items-center rounded-lg bg-accent-soft text-accent-strong"><MapPin aria-hidden className="size-5" /></span>
              <h2 className="mt-4 font-display text-xl font-bold tracking-[-0.02em]">Our offices</h2>
              <ul className="mt-3 grid gap-3 text-sm leading-[21px] text-ink-68">
                {aboutOffices.map((o) => (
                  <li key={o.label} className="flex items-start gap-2.5">
                    <span role="img" aria-label={o.label} className="text-base leading-[21px]">{o.flag}</span>
                    <address className="not-italic"><span className="font-medium text-ink">{o.place}</span><br />{o.address}</address>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="rounded-2xl border border-ink-05 bg-white shadow-lg">
              <div className="border-b border-ink-05 px-6 py-5 sm:px-8">
                <h2 className="font-display text-2xl font-bold tracking-[-0.02em]">Send us a message</h2>
                <p className="mt-1 text-sm text-ink-68">Tell us about your store and we&rsquo;ll reply by email.</p>
              </div>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
