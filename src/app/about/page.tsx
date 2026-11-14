import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { aboutOffices, aboutPlatforms, aboutPrinciples, navItems } from "@content/data";
import { PageHeader } from "@/components/company/PageHeader";
import { breadcrumbLd, pageMeta, siteUrl } from "@/components/company/jsonLd";
import { FinalCta } from "@/components/sections/FinalCta";
import { AppLink } from "@/components/ui/AppLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const path = "/about";
const title = "About BoostCart";
const description = "BoostCart is an e-commerce SEO and AI SEO agency for Shopify, WooCommerce and BigCommerce stores. One team, one roadmap and one report.";

export const metadata: Metadata = pageMeta(path, title, description);

const services = navItems.find((n) => n.label === "Services")?.children ?? [];

const jsonLd = [
  breadcrumbLd("About", path),
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: title,
    url: `${siteUrl}${path}`,
    description,
    mainEntity: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "BoostCart",
      url: siteUrl,
      areaServed: ["US", "CA"],
      location: [
        { "@type": "Place", address: { "@type": "PostalAddress", streetAddress: "5830 E 2nd St", addressLocality: "Casper", addressRegion: "WY", postalCode: "82609", addressCountry: "US" } },
        { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: "Nagpur", addressRegion: "Maharashtra", postalCode: "440034", addressCountry: "IN" } },
      ],
    },
  },
];

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PageHeader
        crumb="About"
        title="SEO built for online stores"
        lead="We help Shopify, WooCommerce and BigCommerce stores grow organic revenue in Google and in AI answers, with one team and one clear plan."
      />

      <section aria-labelledby="mission-title" className="container-x pb-[var(--section-y)]">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <Eyebrow>Our mission</Eyebrow>
          <h2 id="mission-title" className="h2 mt-4">Make store SEO simple, measurable and tied to revenue</h2>
          <p className="lead mt-5">
            E-commerce SEO is different from SEO for a blog or a brochure site. Thousands of product pages, variants, filters and apps all change what search engines and AI tools can read. We specialise in that, and only that.
          </p>
        </Reveal>
      </section>

      <section aria-labelledby="principles-title" className="bg-ink-02 py-[var(--section-y)]">
        <div className="container-x">
          <Reveal className="mx-auto max-w-[720px] text-center">
            <Eyebrow>How we work</Eyebrow>
            <h2 id="principles-title" className="h2 mt-4">Four principles behind every engagement</h2>
          </Reveal>
          <ul className="mx-auto mt-12 grid max-w-[1100px] gap-4 sm:grid-cols-2 md:gap-6">
            {aboutPrinciples.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 80}>
                <div className="h-full rounded-xl border border-ink-05 bg-white p-6 shadow-xs md:p-8">
                  <span className="font-mono text-sm text-ink-32">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-display text-xl font-bold tracking-[-0.02em]">{p.title}</h3>
                  <p className="mt-2 text-base leading-[1.6] text-ink-68">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="what-title" className="section-y">
        <div className="container-x">
          <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
            <Reveal>
              <Eyebrow>What we do</Eyebrow>
              <h2 id="what-title" className="h2 mt-4">Everything that moves your store&rsquo;s organic revenue</h2>
              <p className="lead mt-4">Six workstreams, planned together and reported in one place.</p>
            </Reveal>
            <Reveal delay={80}>
              <ul className="grid gap-2.5">
                {services.map((s) => (
                  <li key={s.href}>
                    <AppLink href={s.href} className="group flex items-center justify-between gap-4 rounded-xl border border-ink-05 bg-white p-4 shadow-xs transition-[box-shadow,transform] duration-200 hover:-translate-y-px hover:shadow-md">
                      <span>
                        <span className="block font-medium text-ink">{s.label}</span>
                        <span className="mt-0.5 block text-sm leading-[21px] text-ink-68">{s.description}</span>
                      </span>
                      <ArrowRight aria-hidden className="size-4 shrink-0 text-ink-32 transition-[transform,color] duration-200 group-hover:translate-x-1 group-hover:text-ink" />
                    </AppLink>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="where-title" className="bg-ink-02 py-[var(--section-y)]">
        <div className="container-x">
          <div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <Eyebrow>Platforms</Eyebrow>
              <h2 id="where-title" className="h2 mt-4">Platforms we know well</h2>
              <p className="lead mt-4">Every platform has its own quirks, from theme code and plugins to URLs and rendering.</p>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {aboutPlatforms.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-base text-ink">
                    <span className="grid size-5 place-items-center rounded-full bg-success-bg text-success-fg"><Check aria-hidden className="size-3" strokeWidth={3} /></span>
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={80}>
              <Eyebrow>Where we work</Eyebrow>
              <h2 className="h2 mt-4">Two offices, one focus on North America</h2>
              <p className="lead mt-4">Our clients are mostly in the United States and Canada, and our teams are set up to work in your hours.</p>
              <ul className="mt-6 grid gap-3">
                {aboutOffices.map((o) => (
                  <li key={o.label} className="flex items-start gap-3 rounded-xl bg-white p-4 ring-1 ring-ink-05">
                    <span role="img" aria-label={o.label} className="text-xl leading-6">{o.flag}</span>
                    <address className="text-sm leading-[21px] not-italic text-ink-68"><span className="font-medium text-ink">{o.place}</span><br />{o.address}</address>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <FinalCta
        eyebrow="Work with us"
        title="See what BoostCart can do for your store"
        lead="Book a call or get a free audit and we’ll show you where your biggest organic wins are, and what to fix first."
      />
    </>
  );
}
