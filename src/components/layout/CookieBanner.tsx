"use client";

import { useStored } from "@/lib/use-stored";
import { AppLink } from "@/components/ui/AppLink";
import { Button } from "@/components/ui/Button";

/** Non-essential cookies are off by default. Analytics must only load when consent === "accepted". */
export function CookieBanner() {
  const [consent, setConsent] = useStored("local", "bc-consent");

  const choose = (value: "accepted" | "declined") => {
    setConsent(value);
    window.dispatchEvent(new CustomEvent("bc-consent", { detail: value }));
  };

  if (consent !== null) return null; // undefined (SSR) and any saved choice both hide it
  return (
    <section aria-label="Cookie consent" className="fixed bottom-6 left-6 z-40 w-[min(360px,calc(100vw-32px))] rounded-lg border border-ink-05 bg-white p-4 shadow-lg max-sm:bottom-4 max-sm:left-4 max-sm:right-4 max-sm:w-auto max-sm:pr-20">
      <p className="text-sm leading-[21px]">
        We use cookies for essential site functions and, with your consent, analytics.{" "}
        <AppLink href="/privacy" className="font-medium text-accent-strong underline underline-offset-4">
          Privacy policy
        </AppLink>
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Button variant="secondary" size="md" onClick={() => choose("declined")}>
          Decline
        </Button>
        <Button variant="secondary" size="md" onClick={() => choose("accepted")}>
          Accept
        </Button>
      </div>
    </section>
  );
}
