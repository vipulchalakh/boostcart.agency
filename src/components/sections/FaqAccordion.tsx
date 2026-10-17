"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import type { Faq } from "@content/data";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <Accordion.Root type="single" collapsible className="divide-y divide-ink-05 border-y border-ink-05">
      {faqs.map((f, i) => (
        <Accordion.Item key={f.q} value={`q${i}`}>
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-left text-base font-medium leading-6">
              {f.q}
              <Plus aria-hidden className="size-5 shrink-0 text-ink-50 transition-transform duration-200 ease-[var(--ease-ui)] group-data-[state=open]:rotate-45" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content forceMount className="faq-content">
            <div>
              <p className="pb-5 pr-9 text-base leading-6 text-ink-68">{f.a}</p>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
