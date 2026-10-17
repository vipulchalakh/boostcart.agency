# BoostCart.agency — Technical Requirements Document (TRD)

**Version:** 1.0 (draft for approval)
**Companion to:** `boostcart-PRD.md`
**Audience:** Claude Code (primary implementer) and the owner (reviewer)

---

## 1. Technical summary

A fast, statically generated marketing site on **Next.js (App Router) + TypeScript + Tailwind CSS**, deployed on Vercel. Content lives in MDX/data files in the repo. Design is driven by a single token file replicating the measured Outseta system (see PRD §6). Forms post to Next.js server actions/route handlers that send email via a transactional provider.

Versions: use the current stable releases at scaffold time (Next.js, React, Tailwind v4, TypeScript 5.x). Pin exact versions in `package.json` and record them in `README.md`. Do not assume version numbers from this document.

## 2. Stack

| Concern | Choice | Reason |
|---|---|---|
| Framework | Next.js App Router, React Server Components | SSG/ISR, metadata API, image/font optimization |
| Language | TypeScript (`strict: true`) | Safety for AI-generated code |
| Styling | Tailwind CSS v4 with `@theme` tokens + CSS variables | Token-first design; matches the plan |
| Components | Hand-built primitives; Radix UI primitives for Dialog, Dropdown/NavigationMenu, Tabs, Accordion | Accessible behavior without styling lock-in |
| Icons | `lucide-react` + `@phosphor-icons/react` (reference uses Phosphor) + inline SVG for brand marks | Matches reference icon feel |
| Animation | CSS keyframes first (marquee, fades); `motion` (Framer Motion) only for the dark-panel demo and hover/enter transitions | Keep JS small |
| Fonts | `next/font` (local files for licensed fonts; Google fonts for fallbacks) | No layout shift, self-hosted |
| Content | MDX (`@next/mdx` or `next-mdx-remote`) + Zod-validated frontmatter | File-based blog and case studies |
| Forms | React Hook Form + Zod; server action → email | Validation shared client/server |
| Email | Resend (or Postmark) for notification + auto-reply | Simple, reliable |
| Spam protection | Cloudflare Turnstile + honeypot + server-side rate limit | Privacy-friendly |
| Analytics | GA4 (consent-gated) + Search Console; optional Plausible | |
| Hosting | Vercel (preview deploys per PR) | |
| Package manager | pnpm | |
| Quality | ESLint, Prettier, `tsc --noEmit`, Playwright (e2e + visual), axe-core, Lighthouse CI | |

## 3. Design tokens (source of truth)

`src/styles/tokens.css` (imported by `globals.css`). Components must use tokens only.

```css
@theme {
  /* Color */
  --color-ink: #020617;
  --color-ink-68: color-mix(in srgb, #020617 68%, transparent);
  --color-ink-32: color-mix(in srgb, #020617 32%, transparent);
  --color-ink-20: color-mix(in srgb, #020617 20%, transparent);
  --color-ink-05: color-mix(in srgb, #020617 5%, transparent);
  --color-ink-02: color-mix(in srgb, #020617 2%, transparent);
  --color-bg: #ffffff;
  --color-accent: #df37a7;          /* primary CTA / annotations */
  --color-accent-strong: #b81d86;   /* small pink text & links; confirm contrast >= 4.5:1 in test */
  --color-yellow: #f9f906;
  --color-panel-dark: #222222;
  --color-success-fg: #15803d;  --color-success-bg: #dcfce7;
  --color-danger-fg:  #b91c1c;  --color-danger-bg:  #fee2e2;
  --color-warn-fg:    #66660a;  --color-warn-bg:    #fefec7;

  /* Typography (families are set via next/font variables) */
  --font-display: var(--font-kaio), var(--font-display-fallback), Arial, sans-serif;
  --font-body:    var(--font-inter), Arial, sans-serif;
  --font-serif:   var(--font-family-serif), var(--font-serif-fallback), Georgia, serif;
  --font-mono:    var(--font-jetbrains-mono), ui-monospace, monospace;
  --font-hand:    var(--font-caveat), cursive;

  /* Type scale: size / line-height / letter-spacing */
  --text-h1: 4.5rem;     --leading-h1: 1;     --tracking-h1: -0.02em;   /* 72/72   */
  --text-h2: 2.25rem;    --leading-h2: 1.2;   --tracking-h2: -0.02em;   /* 36/43.2 */
  --text-h3: 1rem;       --leading-h3: 1.5;   --tracking-h3: -0.02em;   /* 16/24, w500 */
  --text-body: 1rem;     --leading-body: 1.5; --tracking-body: -0.01em; /* 16/24   */
  --text-sm: 0.875rem;   --leading-sm: 1.5;                              /* 14/21   */
  --text-xs: 0.75rem;    --leading-xs: 1.5;                              /* 12/18   */
  --text-lead: 1.625rem; --leading-lead: 1.5;                            /* 26/39 serif subhead */
  --text-cta: 1.25rem;   --leading-cta: 1.5;  --tracking-cta: -0.01em;  /* 20/30   */
  --tracking-eyebrow: 0.04em;                                            /* mono 14/21 uppercase */

  /* Shape */
  --radius-xs: 4px; --radius-sm: 6px; --radius-md: 8px; --radius-lg: 16px; --radius-xl: 20px; --radius-panel: 32px;

  /* Elevation */
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 12px -2px rgb(2 6 23 / 0.10);
  --ring-inset: inset 0 0 0 1px var(--color-ink-20);

  /* Layout */
  --container: 1344px;
  --section-y: 8rem;      /* 128px */
  --section-y-compact: 4rem;
}
```

Responsive type (mobile-first): H1 clamps from ~2.75rem (≤ 640 px) to 4.5rem (≥ 1024 px); H2 from 1.75rem to 2.25rem; lead from 1.25rem to 1.625rem. Tracking and leading ratios stay constant.

### 3.1 Fonts

| Role | Reference | Primary plan | Free fallback (ship now) |
|---|---|---|---|
| Display | Kaio | License and self-host (`next/font/local`) if the owner approves | Bricolage Grotesque (700, tune `opsz`/`wdth`) or similar heavy quirky grotesque; verify side by side with reference screenshot |
| Body | Inter Var | Inter (variable) via `next/font/google` | — |
| Serif lead | "Family" | License and self-host if approved | Newsreader or Fraunces (weight 500) |
| Mono | JetBrains Mono | `next/font/google` | — |
| Handwritten | Caveat / Caveat Brush / Permanent Marker | `next/font/google` | — |

Fonts are swapped in `src/lib/fonts.ts` only. Set `display: "swap"`, subset to Latin, preload only display + body.

## 4. Project structure

```
boostcart/
├─ CLAUDE.md                      # rules for Claude Code (see §12)
├─ docs/                          # PRD, TRD, design-reference screenshots
├─ public/                        # static assets, og images, favicons
├─ content/
│  ├─ blog/*.mdx
│  ├─ case-studies/*.mdx
│  └─ data/ (services.ts, nav.ts, testimonials.ts, faq.ts, pricing.ts)
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx, page.tsx, not-found.tsx, sitemap.ts, robots.ts
│  │  ├─ (marketing)/services/[slug]/page.tsx
│  │  ├─ (marketing)/platforms/[slug]/page.tsx
│  │  ├─ (marketing)/pricing/page.tsx
│  │  ├─ (marketing)/case-studies/page.tsx, [slug]/page.tsx
│  │  ├─ (marketing)/blog/page.tsx, [slug]/page.tsx
│  │  ├─ (marketing)/about/page.tsx, contact/page.tsx, free-audit/page.tsx
│  │  ├─ (legal)/privacy/page.tsx, terms/page.tsx
│  │  └─ api/ (audit/route.ts, newsletter/route.ts) or server actions
│  ├─ components/
│  │  ├─ ui/        Button, Pill, Eyebrow, Card, Badge, Avatar, Annotation, Marquee, DarkPanel, Tabs, Accordion
│  │  ├─ layout/    Navbar, AnnouncementChip, MegaMenu, Footer, ChatButton
│  │  ├─ sections/  Hero, PillMarquee, ShowcaseCards, QuoteTestimonials, PlatformsRow, StepPills,
│  │  │             DarkDemoPanel, BentoGrid, BeforeAfter, CtaPanel
│  │  ├─ mocks/     Mini UIs for bento cards (AuditChecklist, ContentCalendar, OutreachList, RevenueChart, ...)
│  │  └─ seo/       JsonLd, Breadcrumbs
│  ├─ lib/ (fonts.ts, metadata.ts, mdx.ts, env.ts, rate-limit.ts, analytics.ts, cn.ts)
│  ├─ styles/ (tokens.css, globals.css)
│  └─ types/
├─ tests/ (e2e/, visual/, a11y/)
└─ config: next.config.ts, tailwind (v4 css-first), tsconfig.json, eslint, prettier, playwright.config.ts
```

## 5. Component specifications (homepage)

| Component | Key specs |
|---|---|
| `Navbar` | `position: sticky; top: 8px`; max-width 1344; white at ~90% + backdrop blur, radius 16, 1 px ink-05 border, `shadow-xs`; links 14/21 w500 color ink-68, hover bg ink-05 radius 8 padding 4×12; Radix NavigationMenu dropdowns; right cluster: icon button, "Log in" → "Book a call" (ghost, radius 6), "Sign up" → "Free audit" (pink bg, white label, radius 4–6, shadow-xs + inset ring). Mobile: full-screen drawer. |
| `AnnouncementChip` | Hangs under navbar right end; radius 14; white, `shadow-md`; text 14/21 with one bold word and arrow. |
| `Hero` | Section padding-top 128; centered; Eyebrow → H1 (max 2 lines) → serif lead with `<u>` key phrases (underline offset 4 px, full ink) → CTA row (gap 16). Background layer: radial yellow top-left + radial pink right/bottom + dotted grid (`radial-gradient` 1 px dots, ~3–4 % ink, 24 px pitch, masked to fade). |
| `Button` | Variants `primary` (accent bg, white, inset ring ink-20), `secondary` (transparent, inset ring ink-20, ink text), `ghost`. Sizes `sm` (14px, 4×12, r6), `md` (14px, 8×24, r4–6), `lg` (20px/30, ≈55 px high, r8). Focus ring 2 px ink + 2 px offset. |
| `PillMarquee` | Infinite CSS translateX loop (30–40 s), duplicated list, `mask-image` linear fade both edges, pause on hover, off under `prefers-reduced-motion`. Pill: 12/18 w500, r6, 1 px ink-20 border, white bg, padding ≈ 4×12, uppercase. |
| `Annotation` | Handwritten text (Caveat Brush/Permanent Marker), accent color, rotated −8° to +8°, with inline SVG hand-drawn arrow; `aria-hidden` (decorative). Hidden < 768 px. |
| `ShowcaseCard` | Outer frame: ink-02 bg, r20, 1 px ink-05, padding 8; inner: image area (browser mock), footer strip white with logo (left), avatar stack (right), mono 11–12 px meta line. 3-col grid (1 col mobile). |
| `Testimonial` | White card r16, 1 px ink-05, padding 16–24; body 16/24; author row (avatar 32 px, name 14 w500, role 12 ink-68). |
| `StepPills` | Three pills: white bg, r999, 1 px ink-05, shadow-xs, numbered pink circle (24 px) + 20/30 text; wraps on mobile. |
| `DarkPanel` | bg #222, r32, margin 8 px from viewport edge, padding 128 px 64 px, inner subtle radial pink glow; white heading in display font; glass fields (white 5 % bg, 1 px white 11 % border). |
| `DarkDemoPanel` | Tabs (Radix) + left controls (segmented control, option tiles) + center glass card + right options; state in a single `useReducer`; lazy-loaded (`next/dynamic`, `ssr: false` only for interactive part, keep static fallback for SEO text). |
| `BentoGrid` | CSS grid, 12 cols, first row 5/3.5/3.5 proportions (as reference: wide, medium, medium), second row 3 equal-ish; cards: white, r20, 1 px ink-05, padding 24, title 16 w500, body 14 ink-68, mini-UI area bottom-aligned and bleeding to card edge. |
| `StatusTag` | Mono 11–12 px uppercase; success/warn/danger fg/bg tokens; r4. |
| `BeforeAfter` | Two columns; top tile 1 each (gray ink-02 vs. beige/yellow) with logo chips; centered black label pill ("Before"/"After") on a hairline; list rows 16/24 with red-cross / green-tick icon and underlined emphasis words (`text-decoration-thickness: 1px; underline-offset: 3px`). |
| `CtaPanel` | bg ink (#020617) at r32, dotted pattern, heading white display 48–56 px, serif lead, button; right side dashboard image rotated in 3D (`transform: perspective(1400px) rotateX/Y/Z`), clipped by the panel. |
| `Footer` | 5 link columns (13–14 px, ink-68) + logo and socials (36 px icon buttons, r8, 1 px ink-05); bottom row: © line + mono badges. |
| `ChatButton` | Fixed bottom-right, 56 px circle, accent bg, white icon, `shadow-md`; opens contact dialog. |

## 6. Rendering, routing and data

- All marketing pages: static (SSG). Blog/case-study pages: `generateStaticParams` from MDX files. Use ISR only if a CMS is added later.
- Metadata via `generateMetadata`; shared helper in `lib/metadata.ts` builds title (`%s | BoostCart`), description, canonical, OG/Twitter.
- OG images with `next/og` (`opengraph-image.tsx`) using display font.
- `sitemap.ts` enumerates static + MDX routes; `robots.ts` allows all, points to sitemap.
- Images: `next/image`, AVIF/WebP, explicit width/height, `priority` only for hero visuals, `sizes` set on every responsive image. Mock UIs are HTML/SVG, not raster.
- 404 page in brand style; redirects in `next.config.ts`.

## 7. Forms and backend

| Item | Spec |
|---|---|
| Endpoint | Server action (`submitAudit`) or `POST /api/audit` |
| Fields | `name`, `email`, `storeUrl` (URL), `platform` (enum), `revenueBand` (enum), `goal` (text ≤ 1000), `consent` (boolean), honeypot |
| Validation | Zod schema shared by client and server; normalized URLs; reject disposable-domain list optionally |
| Spam | Turnstile token verified server-side; honeypot; IP rate limit (Upstash Redis or Vercel KV): 5/hour/IP |
| Delivery | Resend: internal notification to owner + auto-reply to the lead; optional webhook to CRM (HubSpot/Notion/Sheets) behind an env flag |
| Failure | Friendly inline error, retry; never lose the lead (log failed payloads to a server log/queue) |
| Privacy | Store nothing in the browser beyond consent; link to Privacy Policy; consent required |
| Env vars | `RESEND_API_KEY`, `NOTIFY_EMAIL`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `UPSTASH_*`, `NEXT_PUBLIC_GA_ID`; validated at boot in `lib/env.ts`; `.env.example` committed, real values never committed |

## 8. SEO implementation

- JSON-LD component renders: `Organization` + `WebSite` (layout), `Service` (service pages), `FAQPage` (where an FAQ exists), `BlogPosting` (posts), `BreadcrumbList` (inner pages). `Review`/`AggregateRating` only with real, verifiable reviews.
- Heading hierarchy lint rule/test (exactly one H1 per route).
- Canonical URL = `https://boostcart.agency/<path>` without trailing slash; enforce a single host (no `www`, https only).
- Internal-link components for related services/case studies/posts.
- Performance budget in CI: JS per route < 150 KB gzip on the homepage (excluding lazy demo), no render-blocking third-party scripts (load analytics `afterInteractive`, consent-gated).
- `llms.txt` (optional) describing services and key pages.

## 9. Accessibility

- Semantic landmarks, skip link, visible focus states, keyboard-operable menus/tabs/dialogs (Radix).
- Contrast: measure, do not assume. #DF37A7 on white is about 4.0:1, so it passes only for large text (≥ 24 px, or ≥ 18.66 px bold) and UI components; the 20 px / w500 hero CTA label does not qualify as large text, so either bump the button label to 24 px or 18.66 px / w600+, or darken the button fill to `--color-accent-strong`. Small pink text and links use `--color-accent-strong`. Add an automated contrast check to the test suite.
- Decorative annotations/doodles `aria-hidden`; marquee has `aria-hidden` duplicate and respects reduced motion.
- Target: axe-core zero serious/critical violations on all routes.

## 10. Performance plan

- Server Components by default; client components only for navigation menus, marquee (CSS), demo panel, forms, consent banner.
- No client-side font loading beyond `next/font`; at most 3 font files preloaded.
- Hero background is pure CSS (no image).
- Lazy-load below-the-fold sections' heavy visuals (`loading="lazy"`, dynamic imports for the demo).
- Budgets enforced in Lighthouse CI: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100 (mobile).

## 11. Testing and QA

| Layer | Tooling | Scope |
|---|---|---|
| Type/lint | `tsc`, ESLint, Prettier | every commit (pre-commit + CI) |
| Unit | Vitest | schemas, helpers, metadata builders |
| E2E | Playwright | nav, menus, audit form (success + error), blog/case-study routing, 404 |
| Visual | Playwright screenshots at 390, 768, 1280, 1536 px | homepage sections vs. approved baselines; side-by-side check vs. reference screenshots in `docs/reference/` |
| A11y | `@axe-core/playwright` | all routes |
| Perf | Lighthouse CI | homepage + one service + one post |
| SEO | custom script | one H1, title/description length, canonical, sitemap coverage, JSON-LD validity |
| Content guard | build-time check | fail production build if any `TODO-REAL` placeholder remains in testimonials/case studies/badges |

## 12. Claude Code working agreement (`CLAUDE.md` contents)

1. Read `docs/boostcart-PRD.md` and `docs/boostcart-TRD.md` first; they are the source of truth. Ask before deviating.
2. Use tokens only; never hard-code colors, sizes, radii or fonts in components.
3. Server Components by default; add `"use client"` only when necessary and say why.
4. No copied Outseta assets, copy, logos, testimonials or screenshots. Placeholders must be tagged `TODO-REAL` and are blocked in production builds.
5. Never invent client names, results, reviews, partner badges, or statistics.
6. Work in small vertical slices (one section/page per PR-sized change); run `pnpm lint && pnpm typecheck && pnpm test` before finishing; show a screenshot of the result.
7. Keep a running `docs/DECISIONS.md` for any deviation or open question.
8. Accessibility and performance budgets are acceptance criteria, not nice-to-haves.

## 13. Environments, CI/CD and deployment

- Git (GitHub), `main` protected; feature branches → Vercel preview.
- GitHub Actions: install (pnpm cache), lint, typecheck, unit, build, Playwright (against preview), Lighthouse CI.
- Domains: `boostcart.agency` primary; redirect `www.boostcart.agency`. DNS at registrar → Vercel. HSTS enabled.
- Security headers in `next.config.ts`: CSP (allow self, GA, Turnstile, Resend not needed client-side), `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `frame-ancestors 'none'`.
- Monitoring: Vercel Analytics/Speed Insights (consent-aware), uptime ping, form-failure alerts to email.

## 14. Implementation phases (technical)

| Phase | Tasks | Done when |
|---|---|---|
| 1. Foundation | `create-next-app` (TS, Tailwind, App Router, src dir, pnpm); tokens; fonts; ESLint/Prettier; CI; `/design-system` internal page showing type scale, colors, buttons, pills, cards | Design-system page matches PRD §6 |
| 2. Layout | Navbar (+ mega menus, mobile drawer), announcement chip, footer, chat button | Matches reference at 4 breakpoints |
| 3. Homepage | Sections 1–12 in order, static content from `content/data` | Visual baselines approved |
| 4. Inner pages | Services, pricing, case studies, about, contact, audit form + backend | Form delivers email; e2e green |
| 5. Content system | MDX blog + case studies, RSS, related posts, TOC | Sample posts render and are indexed in sitemap |
| 6. SEO + analytics | Metadata, JSON-LD, sitemap/robots, OG images, GA4 + consent | SEO script green; Search Console verified |
| 7. QA + launch | A11y, perf, cross-browser, content swap, remove all `TODO-REAL`, DNS cutover | All budgets met; live |

## 15. Reference capture notes (for visual QA)

Place reference screenshots in `docs/reference/` (full page at 1536 px, plus crops of: navbar, hero, showcase cards, dark panel, bento, before/after, CTA panel, footer). Observed page: ~6,460 px tall at 1534 px width; six major `<section>`s plus dark panels; original built on Webflow (so its layout classes are not reusable — rebuild with Tailwind).

Unmeasured / approximate items to tune by eye: hero gradient geometry, card corner radii (≈16–20 px), exact bento column proportions, doodle SVG paths, and the CTA-panel perspective angles.

## 16. Risks and technical open items

| Item | Plan |
|---|---|
| Custom font licensing (Kaio, Family) | Fallbacks shipped; swap in `lib/fonts.ts` once licensed |
| Hero gradient fidelity | Build as layered CSS gradients; adjust against screenshots |
| Hand-drawn doodles and arrows | Create original inline SVGs (do not trace reference assets) |
| Demo panel weight | Dynamic import + intersection observer; static no-JS fallback text |
| Consent-gated analytics reduces data | Use cookieless analytics (Plausible) alongside GA4 if desired |
| Contrast of brand pink | Use `--color-accent-strong` for small text; confirm via automated checks |
