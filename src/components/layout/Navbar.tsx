"use client";

import { useEffect, useState } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { BarChart3, Baby, BookOpen, Boxes, ChevronDown, Coffee, Gem, HeartPulse, Mountain, PawPrint, Shirt, Smartphone, Sofa, Sparkles, Code2, FileSearch, Layers, LayoutGrid, Link2, ListChecks, Menu, PenLine, ShoppingBag, Store, TrendingUp, Wrench, X, type LucideIcon } from "lucide-react";
import { auditHref, bookCallHref, navItems, type NavItem } from "@content/data";
import { cn } from "@/lib/cn";
import { AppLink } from "@/components/ui/AppLink";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { AnnouncementChip } from "./AnnouncementChip";

const linkCls =
  "inline-flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium leading-[21px] text-ink-68 transition-colors duration-200 ease-[var(--ease-ui)] hover:bg-ink-05 hover:text-ink data-[state=open]:bg-ink-05 data-[state=open]:text-ink";

const icons: Record<string, LucideIcon> = {
  "technical-seo": Wrench, "category-product-pages": LayoutGrid, content: PenLine, "link-building": Link2, "conversion-seo": TrendingUp, reporting: BarChart3,
  shopify: ShoppingBag, woocommerce: Store, bigcommerce: Boxes, magento: Layers, headless: Code2,
  "fashion-apparel": Shirt, "beauty-skincare": Sparkles, "health-supplements": HeartPulse, "home-furniture": Sofa, "electronics-gadgets": Smartphone,
  "jewelry-accessories": Gem, "food-beverage": Coffee, "sports-outdoors": Mountain, "pet-supplies": PawPrint, "baby-kids": Baby,
  guides: BookOpen, checklists: ListChecks, "free-audit": FileSearch,
};
const iconFor = (href: string) => icons[href.split("/").pop() ?? ""] ?? LayoutGrid;

function Dropdown({ item }: { item: NavItem }) {
  const kids = item.children ?? [];
  const wide = kids.length > 4;
  return (
    <div className={cn("grid gap-6 p-6", wide ? "w-[760px] grid-cols-[1fr_220px]" : "w-[560px] grid-cols-[1fr_220px]")}>
      <ul className={cn("grid gap-1", wide && "grid-cols-2")}>
        {kids.map((c) => {
          const Icon = iconFor(c.href);
          return (
          <li key={c.href}>
            <NavigationMenu.Link asChild>
              <AppLink href={c.href} className="flex gap-3 rounded-lg p-2 transition-colors duration-200 hover:bg-ink-02">
                <span aria-hidden className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-md bg-ink-02 text-ink-68 shadow-[inset_0_0_0_1px_var(--ink-05)]">
                  <Icon className="size-4" />
                </span>
                <span>
                  <span className="block text-sm font-medium leading-[21px] text-ink">{c.label}</span>
                  <span className="block text-[13px] leading-[19px] text-ink-68">{c.description}</span>
                </span>
              </AppLink>
            </NavigationMenu.Link>
          </li>
          );
        })}
      </ul>
      <div className="relative flex flex-col justify-between overflow-hidden rounded-lg bg-ink-02 p-4 shadow-[inset_0_0_0_1px_var(--ink-05)]">
        <div aria-hidden className="absolute -right-10 -top-10 size-32 rounded-full bg-accent-soft blur-2xl" />
        <div className="relative">
          <p className="eyebrow text-[11px]">Free audit</p>
          <p className="mt-2 text-sm font-medium leading-[21px]">Get a prioritized plan for your store.</p>
        </div>
        <Button href={auditHref} size="sm" arrow className="relative mt-6 self-start">
          Get my audit
        </Button>
      </div>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-2 z-50 px-2">
      <div
        className={cn(
          "relative mx-auto flex h-[51px] max-w-[var(--container)] items-center justify-between gap-4 rounded-lg border border-ink-05 pl-4 pr-2 backdrop-blur-[12px] backdrop-saturate-[1.2] transition-[box-shadow,background-color] duration-200 ease-[var(--ease-ui)]",
          scrolled ? "bg-white/90 shadow-md" : "bg-white/85 shadow-xs",
        )}
      >
        <AppLink href="/" aria-label="BoostCart home" className="shrink-0 rounded-md">
          <Logo />
        </AppLink>

        <NavigationMenu.Root className="hidden lg:block" aria-label="Main">
          <NavigationMenu.List className="flex items-center gap-0.5">
            {navItems.map((item) => (
              <NavigationMenu.Item key={item.label}>
                {item.children ? (
                  <>
                    <NavigationMenu.Trigger className={cn(linkCls, "group")}>
                      {item.label}
                      <ChevronDown aria-hidden className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className="nav-content w-max">
                      <Dropdown item={item} />
                    </NavigationMenu.Content>
                  </>
                ) : (
                  <NavigationMenu.Link asChild>
                    <AppLink href={item.href!} className={linkCls}>
                      {item.label}
                    </AppLink>
                  </NavigationMenu.Link>
                )}
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
          <div className="absolute left-0 top-full flex w-full justify-center pt-2">
            <NavigationMenu.Viewport className="nav-viewport relative h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] origin-top overflow-hidden rounded-lg border border-ink-05 bg-white shadow-lg" />
          </div>
        </NavigationMenu.Root>

        <div className="flex items-center gap-1">
          <span className="hidden xl:inline-flex">
            <Button href={bookCallHref} variant="secondary" size="sm">
              Book a call
            </Button>
          </span>
          <Button href={auditHref} size="sm">
            Get a free audit
          </Button>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger aria-label="Open menu" className="grid size-9 place-items-center rounded-md text-ink hover:bg-ink-05 lg:hidden">
              <Menu aria-hidden className="size-5" />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/30 backdrop-blur-sm" />
              <Dialog.Content aria-describedby={undefined} className="sheet fixed inset-x-0 top-0 z-[61] flex max-h-dvh flex-col overflow-y-auto rounded-b-[24px] bg-white p-4 pb-6 shadow-lg">
                <div className="mb-2 flex h-12 items-center justify-between">
                  <Dialog.Title asChild>
                    <AppLink href="/" onClick={() => setOpen(false)}>
                      <Logo />
                    </AppLink>
                  </Dialog.Title>
                  <Dialog.Close aria-label="Close menu" className="grid size-10 place-items-center rounded-md hover:bg-ink-05">
                    <X aria-hidden className="size-5" />
                  </Dialog.Close>
                </div>
                <nav aria-label="Mobile" className="flex flex-col">
                  {navItems.map((item) =>
                    item.children ? (
                      <details key={item.label} className="group border-b border-ink-05">
                        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between text-base font-medium [&::-webkit-details-marker]:hidden">
                          {item.label}
                          <ChevronDown aria-hidden className="size-4 text-ink-50 transition-transform group-open:rotate-180" />
                        </summary>
                        <ul className="pb-3">
                          {item.children.map((c) => (
                            <li key={c.href}>
                              <AppLink href={c.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center rounded-md px-2 text-[15px] text-ink-68 hover:bg-ink-02 hover:text-ink">
                                {c.label}
                              </AppLink>
                            </li>
                          ))}
                        </ul>
                      </details>
                    ) : (
                      <AppLink key={item.label} href={item.href!} onClick={() => setOpen(false)} className="flex min-h-12 items-center border-b border-ink-05 text-base font-medium">
                        {item.label}
                      </AppLink>
                    ),
                  )}
                </nav>
                <div className="mt-6 grid gap-3">
                  <Button href={auditHref} size="lg">
                    Get a free audit
                  </Button>
                  <Button href={bookCallHref} variant="secondary" size="lg">
                    Book a call
                  </Button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>

        <AnnouncementChip />
      </div>
    </header>
  );
}
