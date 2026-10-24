import { navItems } from "@content/data";
import { AppLink } from "@/components/ui/AppLink";

/** Only shown when scripts are off. The main menu and its dropdowns need JavaScript, so this gives the same links using plain <details>. */
export function NoJsNav() {
  return (
    <noscript>
      <nav aria-label="Main" className="relative z-[70] border-b border-ink-05 bg-white px-4 py-2">
        <ul className="mx-auto flex max-w-[var(--container)] flex-wrap items-center gap-x-1 gap-y-1 text-sm font-medium">
          {navItems.map((item) => (
            <li key={item.label} className="relative">
              {item.children ? (
                <details className="group">
                  <summary className="cursor-pointer list-none rounded-md px-3 py-1 text-ink-68 hover:bg-ink-05 hover:text-ink [&::-webkit-details-marker]:hidden">{item.label} ▾</summary>
                  <ul className="absolute left-0 top-full z-10 mt-1 grid min-w-[240px] gap-0.5 rounded-lg border border-ink-05 bg-white p-2 shadow-lg">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <AppLink href={c.href} className="block rounded-md px-3 py-1.5 text-ink hover:bg-ink-02">{c.label}</AppLink>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <AppLink href={item.href!} className="block rounded-md px-3 py-1 text-ink-68 hover:bg-ink-05 hover:text-ink">{item.label}</AppLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </noscript>
  );
}
