import { footerColumns, socials } from "@content/data";
import { AppLink } from "@/components/ui/AppLink";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";

export function Footer() {
  return (
    <footer className="bg-white pt-16">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,280px)_1fr]">
          <div>
            <AppLink href="/" aria-label="BoostCart home" className="inline-block rounded-md">
              <Logo variant="footer" />
            </AppLink>
            <p className="mt-4 max-w-[260px] text-sm leading-[21px] text-ink-68">E-commerce SEO for Shopify, WooCommerce and BigCommerce stores. One team, one roadmap, one report.</p>
            <ul className="mt-6 flex gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <AppLink href={s.href} aria-label={`BoostCart on ${s.label}`} className="grid size-9 place-items-center rounded-md border border-ink-05 text-ink-68 transition-colors duration-200 hover:bg-ink-05 hover:text-ink">
                    <SocialIcon name={s.label} />
                  </AppLink>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-5">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <p className="text-[13px] font-medium leading-[21px] text-ink sm:text-sm">{col.title}</p>
                <ul className="mt-4 grid gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <AppLink href={l.href} className="rounded-xs text-[13px] leading-[19px] text-ink-68 underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color] duration-200 hover:text-ink hover:decoration-ink-32 sm:text-sm">
                        {l.label}
                      </AppLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ink-05 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-ink-68">© 2026 BoostCart. All rights reserved.</p>
          {/* TODO-REAL: add trust badges (e.g. GDPR, status page) here only when they are true. */}
        </div>
      </div>
    </footer>
  );
}
