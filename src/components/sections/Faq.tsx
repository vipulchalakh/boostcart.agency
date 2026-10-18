import type { ReactNode } from "react";
import { faqs as homeFaqs, type Faq as FaqItem } from "@content/data";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { FaqAccordion } from "./FaqAccordion";

type Props = { items?: FaqItem[]; eyebrow?: string; title?: ReactNode; lead?: string; ctaLabel?: string };

export function Faq({
  items: faqs = homeFaqs,
  eyebrow = "FAQ",
  title = "Questions, answered",
  lead = "Straight answers about how we work with e-commerce teams.",
  ctaLabel = "Still curious? Talk to us",
}: Props = {}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <section aria-labelledby="faq-title" className="bg-ink-02 py-[var(--section-y)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="container-x grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="faq-title" className="h2 mt-4">{title}</h2>
          <p className="lead mt-4">{lead}</p>
          <Button href="/contact" variant="secondary" className="mt-6">{ctaLabel}</Button>
        </Reveal>
        <Reveal delay={80}>
          <FaqAccordion faqs={faqs} />
        </Reveal>
      </div>
    </section>
  );
}
