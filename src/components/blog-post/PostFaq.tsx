"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

export type PostFaqItem = { _key: string; question: string | null; answer: string | null };

export function PostFaq({ faqs }: { faqs: PostFaqItem[] }) {
  const items = faqs.filter((f) => f.question && f.answer);
  if (!items.length) return null;
  return (
    <section aria-labelledby="post-faq-title" className="mt-14">
      <h2 id="post-faq-title" className="font-display text-[1.75rem] font-bold leading-[1.15] tracking-[-0.02em] text-ink md:text-[2.125rem]">
        Frequently asked questions
      </h2>
      <Accordion.Root type="single" collapsible className="mt-6 space-y-3">
        {items.map((f) => (
          <Accordion.Item key={f._key} value={f._key} className="rounded-xl border border-ink-10 bg-white shadow-xs transition-colors duration-200 data-[state=open]:border-accent/40 data-[state=open]:bg-accent-soft/40">
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-[1.0625rem] font-semibold leading-6 text-ink md:px-6 md:py-5">
                {f.question}
                <Plus aria-hidden className="size-5 shrink-0 text-ink-50 transition-transform duration-200 ease-[var(--ease-ui)] group-data-[state=open]:rotate-45 group-data-[state=open]:text-accent" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content forceMount className="faq-content">
              <div>
                <p className="px-5 pb-5 pr-12 text-base leading-7 text-ink/80 md:px-6">{f.answer}</p>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}
