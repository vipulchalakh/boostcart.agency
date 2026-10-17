"use client";

import { ArrowRight, X } from "lucide-react";
import { useStored } from "@/lib/use-stored";
import { AppLink } from "@/components/ui/AppLink";

/** Hangs under the right end of the navbar. Dismissal is remembered for the session only. */
export function AnnouncementChip() {
  const [dismissed, setDismissed] = useStored("session", "bc-chip-dismissed");

  if (dismissed !== null) return null; // undefined (SSR) and "1" (dismissed) both hide it
  return (
    <div className="absolute right-0 top-full z-40 mt-2 hidden items-center gap-1 rounded-[14px] bg-white py-1.5 pl-4 pr-1.5 text-sm leading-[21px] shadow-md sm:flex">
      <AppLink href="/resources/guides" className="group inline-flex items-center gap-1.5 rounded-sm">
        <span>
          New: <strong className="font-semibold">Shopify SEO</strong> playbook
        </span>
        <ArrowRight aria-hidden className="size-3.5 transition-transform duration-200 group-hover:translate-x-[3px]" />
      </AppLink>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => setDismissed("1")}
        className="grid size-6 place-items-center rounded-sm text-ink-50 hover:bg-ink-05 hover:text-ink"
      >
        <X aria-hidden className="size-3.5" />
      </button>
    </div>
  );
}
