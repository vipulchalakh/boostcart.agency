import { auditHref, bookCallHref } from "@content/data";
import { Button } from "./Button";

/**
 * The site's standard call to action: "Book a call" is the primary action (opens the Cal.com pop-up),
 * "Get a free audit" is the secondary one. Renders two sibling buttons, so the parent controls the layout.
 * Pass `dark` on dark panels.
 */
export function CtaPair({ dark = false, sheen = false }: { dark?: boolean; sheen?: boolean }) {
  return (
    <>
      <Button href={bookCallHref} size="lg" arrow sheen={sheen}>Book a call</Button>
      <Button href={auditHref} variant={dark ? "ghost-dark" : "secondary"} size="lg">Get a free audit</Button>
    </>
  );
}
