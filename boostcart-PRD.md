# BoostCart.agency — Product Requirements Document (PRD)

**Version:** 1.0 (draft for approval)
**Owner:** Surinder Singh
**Domain:** boostcart.agency
**Brand name:** BoostCart
**Design reference:** outseta.com homepage (analyzed 17 Oct 2026). Visual system, typography, layout rhythm and interaction patterns are replicated; content, purpose and conversion goals are those of an e-commerce SEO agency.

---

## 1. Summary

BoostCart is an e-commerce SEO agency. The website must (a) look and feel like the Outseta marketing site (playful-premium, bold geometric headlines, editorial serif subheads, handwritten annotations, soft gradient hero, dark "showpiece" panels, bento feature grid), and (b) convert e-commerce store owners and growth leads into audit requests and discovery calls.

The reference site sells a self-serve SaaS product (sign up, free trial). BoostCart sells a high-trust service. Every "Sign up" CTA in the reference becomes "Get a free audit" / "Book a call". Every product-feature card becomes a service card.

## 2. Goals and success metrics

| Goal | Metric | Target (first 90 days) |
|---|---|---|
| Generate qualified leads | Audit-request form submissions | 3–5% of unique visitors |
| Build authority | Case study + blog sessions, time on page | > 90 s avg on case studies |
| Rank for agency keywords | Top-10 positions for "ecommerce SEO agency", "Shopify SEO agency", "WooCommerce SEO services" (+ long tail) | Indexed in week 1; ranking work ongoing |
| Performance | Core Web Vitals | LCP < 2.0 s, INP < 200 ms, CLS < 0.05 on mobile |
| Credibility | Number of real, named proof points (case studies, testimonials) on the site | ≥ 3 case studies at launch |

## 3. Target audience

1. **Primary — Store owners / founders** of Shopify, WooCommerce, BigCommerce, Magento and headless stores doing roughly $20k–$5M/month, who rely on paid ads and want durable organic revenue.
2. **Secondary — Heads of e-commerce / marketing managers** who need an agency partner and need to justify the spend internally (they want data, process, reporting).
3. **Tertiary — Agencies / developers** seeking a white-label or partner SEO provider.

Market focus: North America first (consistent with the owner's other brands); copy in US/Canadian English, prices in USD (CAD optional later).

## 4. Positioning and voice

- Non-salesy, authority-driven, specific. Proof before promises.
- Mirrors Outseta's tone: short declarative headlines, plain language, one witty touch per section (handwritten annotation), no jargon walls.
- Value proposition: *"Everything your store needs to rank, from technical fixes and category pages to content and links — one team, one roadmap, one report."* (Outseta's "one place / one tool / one price" idea becomes "one team / one roadmap / one report".)

## 5. Design approach (answer to "what approach should I follow")

**Approach: token-first replication of the reference system, then content substitution.** Do not copy Outseta's code or assets. Rebuild the look from first principles using the measured tokens below, so the site is original but visually equivalent.

1. **Tokens first.** All colors, type sizes, radii, shadows and spacing live as CSS variables (Tailwind theme). Components never hard-code values.
2. **Section-by-section mapping.** Each Outseta section has a BoostCart counterpart (Section 7). Layout, spacing and component shape stay the same; copy and mock UIs change.
3. **Build small, reusable primitives** (Button, Pill, Eyebrow, Card, Bento tile, Annotation, Marquee, DarkPanel) before composing pages.
4. **Replace SaaS mock UIs with agency proof** (rankings chart, traffic/revenue chart, audit checklist, keyword table) built as lightweight HTML/SVG, not screenshots.
5. **Own the imagery.** No Outseta logos, customer screenshots, testimonials, wordmarks or copy. Customer/testimonial content must be real BoostCart clients (placeholders are marked and must be replaced before launch).

## 6. Design system specification (measured from the reference)

All values were read from computed styles and screenshots on 17 Oct 2026. "Approx." means judged visually.

### 6.1 Typography

| Role | Reference font | Size / line-height | Weight | Letter-spacing | Notes |
|---|---|---|---|---|---|
| H1 (hero) | **Kaio** (custom, heavy wide grotesque with quirky letterforms) | 72 / 72 px (1.0) | 600 | -1.44 px (-0.02em) | Centered, 2 lines, near-black |
| H2 (section) | Kaio | 36 / 43.2 px (1.2) | 600 | -0.72 px (-0.02em) | Centered |
| H3 (card title) | Inter Var | 16 / 24 px | 500 | -0.32 px (-0.02em) | |
| Body | **Inter Var** | 16 / 24 px | 400 | -0.16 px (-0.01em) | Color #020617 |
| Small / nav / buttons | Inter Var | 14 / 21 px | 400–500 | -0.16 px | |
| Hero CTA label | Inter Var | 20 / 30 px | 500 | -0.2 px | |
| Subhead (editorial) | **"Family"** (custom serif) | 26 / 39 px (1.5) | 500 | ~0 | Color navy at 68% opacity; key phrases underlined and full-strength navy |
| Eyebrow / badges | **JetBrains Mono** | 14 / 21 px | 400 | +0.56 px (+0.04em) | UPPERCASE |
| Pills / chips | Inter Var | 12 / 18 px | 500 | -0.16 px | |
| Handwritten annotations | **Caveat / Caveat Brush / Permanent Marker** | ~14–20 px, rotated | — | — | Pink (#DF37A7), uppercase in places, with hand-drawn arrows |

Other families loaded on the reference (used inside interactive demos): Figtree, Fraunces, Geist Mono, Chakra Petch, Roboto Mono, Super Sans VF.

**Font licensing caveat:** Kaio and "Family" are not Google Fonts and I could not confirm their licenses. Before launch, either license them or use the fallbacks in the TRD (headline: a heavy geometric/quirky grotesque such as Bricolage Grotesque; serif subhead: Newsreader or Fraunces). The type scale above applies regardless of the font.

### 6.2 Color

| Token | Value | Use |
|---|---|---|
| `--ink` | #020617 | Primary text, headings, dark panel (CTA) |
| `--ink-68` | #020617 at 68% | Secondary text, nav links, subheads |
| `--ink-32` | #020617 at 32% | Disabled / tertiary |
| `--ink-20` | #020617 at 20% | Inset button ring |
| `--ink-05` | #020617 at 5% | Hairline borders, dividers |
| `--ink-02` | #020617 at 2% | Tertiary section background (light gray) |
| `--bg` | #FFFFFF | Page background |
| `--accent` | #DF37A7 | Primary CTA, links, annotations, highlights (hot pink) |
| `--yellow` | #F9F906 | Hero gradient start, protected-content highlight, logo mark in CTA |
| `--panel-dark` | #222222 | Large rounded dark showpiece panel |
| `--success-fg / bg` | #15803D / #DCFCE7 | "ACTIVE", ticks |
| `--danger-fg / bg` | #B91C1C / #FEE2E2 | "Before" crosses |
| `--warn-fg / bg` | #66660A / #FEFEC7 | Tags |
| Glass surfaces on dark | white at 5% / 11% / 50% | Form fields, buttons on dark |

**Hero background (approx.):** white base; a yellow glow in the top-left corner and a pink glow bottom-right/right edge fading to white in the center; overlaid with a faint dotted grid pattern. Tune visually against the reference.

**Palette decision (open item):** The brief says "everything exact same", so the default is Outseta's pink/yellow palette. Because everything is a token, a different brand palette (for example the maroon/beige agency colors on file) can be swapped in one file without touching components. See Section 14.

### 6.3 Shape, elevation, spacing

- **Radii:** buttons 8 px (nav buttons 4–6 px), pills 6 px, nav items 8 px, cards ~16–20 px (approx.), dark showpiece panels 32 px.
- **Borders:** 1 px at 5% ink; buttons use an inset 1 px ring at 20% ink instead of a border.
- **Shadows:** very soft (e.g. `0 1px 2px rgba(0,0,0,.05)`), cards sit on a faint outer "frame" ring; the announcement chip uses a medium shadow.
- **Section rhythm:** 128 px vertical padding per section; compact sections 64 px; hero top padding 128 px (clears the floating nav).
- **Container:** max-width 1344 px, 8 px side margin on the nav; content grid ~1340 px at desktop; 3-column card grids with ~24 px gap.

### 6.4 Signature elements (must-haves)

1. **Floating pill navbar** with white translucent background, logo left, centered links with dropdown chevrons, GitHub-style icon + Log in + pink Sign up on the right. Sticky.
2. **Announcement chip** hanging below the navbar's right end ("Migrating from X →"). BoostCart: "Free SEO audit →" or "New: Shopify SEO playbook →".
3. **Mono eyebrow** above the H1 with a small partner icon.
4. **Two-line centered H1 + serif subhead with underlined key phrases.**
5. **Primary pink button + outlined secondary button**, both large (≈55 px high).
6. **Auto-scrolling pill marquee** (uppercase, mono-like 12 px chips) with edge fade.
7. **Handwritten pink annotations with hand-drawn arrows** pointing at content.
8. **Showcase cards** with a soft gray frame, browser-style screenshot on top, logo and avatars on a white footer strip, mono meta line.
9. **Dark rounded showpiece panel** (#222, radius 32) with interactive demo, glass inputs, pink hand-drawn spiral/curve doodles.
10. **Bento grid** (3 + 3 cards, mixed widths) with mini live UI inside each card.
11. **Before / After comparison** with logo tiles, "Before"/"After" black label pills, red-cross and green-tick lists with underlined emphasis words.
12. **Dark navy CTA panel** with a perspective-tilted dashboard image.
13. **Five-column footer** + mono badges (Stripe verified, GDPR, Status) → BoostCart equivalents.
14. **Floating chat button** (pink circle, bottom right).

## 7. Page-level requirements — Homepage

Each block lists the reference section, then the BoostCart version. Copy below is draft; final copy is approved by the owner.

| # | Reference section | BoostCart section | Draft content |
|---|---|---|---|
| 1 | Navbar + announcement chip | Same | Links: Services ▾, Platforms ▾, Pricing, Case Studies, Resources ▾, About, Blog. Right: Contact icon, "Book a call", pink "Free audit". Chip: "Free SEO audit →" |
| 2 | Hero | Hero | Eyebrow: `E-COMMERCE SEO AGENCY`. H1: **"Grow Your Store's Organic Revenue"**. Subhead: "Everything you need to rank, from technical fixes and category pages to content and links." (underlined: *technical fixes*, *category pages*, *content*, *links*). CTAs: **Get a free audit** / **Is BoostCart for me?** |
| 3 | Pill marquee | Marquee | SHOPIFY STORES · WOOCOMMERCE · BIGCOMMERCE · MAGENTO · HEADLESS · DTC BRANDS · MARKETPLACES |
| 4 | Customer showcase cards (3) | Results / case study cards | Three cards: store screenshot, brand logo, owner avatars, meta line "SHOPIFY · FOOD & BEVERAGE". Annotations: "see what we've grown ↓", "real results, real stores". **Placeholder until real clients approved.** |
| 5 | Big quote + 3 testimonials | Proof headline + 3 testimonials | H2: "Everything your store needs to grow organically…" Testimonials: real quotes only (placeholders flagged `TODO-REAL`) |
| 6 | Integrations row + 3-step pills | Platforms row + 3 steps | Platform icons (Shopify, WooCommerce, BigCommerce, Magento, Webflow, Next.js). Steps: ① Free audit ② Get your roadmap ③ Watch revenue grow |
| 7 | "Styled for your brand" dark interactive panel | "Built around your store" dark panel | Interactive demo: tabs (Audit · Roadmap · Keywords · Content · Links · Report). Left controls: platform (Shopify/Woo/BigCommerce), store size, goal. Center card shows the resulting plan/preview in glass UI. Pink doodles. Light/dark toggle optional (nice-to-have). |
| 8 | "All-in-one stack" bento (6 cards) | "Everything that moves revenue" bento (6 cards) | Mono eyebrow `ALL-IN-ONE SEO PROGRAM`. H2: "Perfect for Shopify, WooCommerce and BigCommerce stores". Cards: **Technical SEO** (site audit checklist UI), **Category & Product Pages** (before/after title + schema UI), **Content** (editorial calendar list with status tags), **Link Building** (outreach list w/ DELIVERED-style status tags), **Local/Marketplace & International** (or **Conversion SEO**), **Reporting** (revenue-from-organic line chart with big number). |
| 9 | "Quit context switching" before/after | "Quit guessing" before/after | Before (logo tiles of generic tools/plug-ins): "Random plugin fixes", "Blog posts nobody ranks", "Agencies that send PDFs", "Traffic without sales", … After (BoostCart mark): "One team for technical + content + links", "One roadmap tied to revenue", "One dashboard", "One simple monthly price". |
| 10 | Dark CTA panel | Dark CTA panel | "Get your free SEO audit". "We'll review your store and send a prioritized plan within X business days." Button: **Get my audit**. Tilted dashboard visual. |
| 11 | Footer | Footer | Columns: Services · Platforms · Company · Resources · Comparisons/Use cases. Socials. Badges (mono): e.g. `SHOPIFY PARTNER` only if actually true, `GDPR COMPLIANT`, `STATUS` — **no badge unless real.** |
| 12 | Chat bubble | Chat/contact bubble | Opens contact form or Calendly-style booking |

## 8. Site map and additional pages

Launch (P0): Home, Services hub, 4–6 service pages (Technical SEO, Shopify SEO, WooCommerce SEO, Content for E-commerce, Link Building, Reporting), Pricing, Case Studies (index + at least 3 detail pages), Free Audit (form), Contact/Book a call, About, Blog (index + post template), Privacy, Terms.

P1: Platform pages (Shopify, WooCommerce, BigCommerce, Magento), Industry use-case pages, Comparison pages ("BoostCart vs in-house SEO", "vs generic SEO agencies"), Resources hub, Partner/white-label page.

P2: Client login/portal link, gated playbooks (email capture), localized variants.

## 9. Functional requirements

| ID | Requirement | Priority |
|---|---|---|
| F1 | Responsive pixel-faithful layout at 360, 768, 1024, 1280, 1536 px | P0 |
| F2 | Free-audit form (name, email, store URL, platform, monthly revenue band, goal) with validation, spam protection, success state, email notification + auto-reply | P0 |
| F3 | Book-a-call (embedded scheduler or link) | P0 |
| F4 | Interactive dark panel demo (client-side only) | P0 |
| F5 | Auto-scrolling marquee, respects `prefers-reduced-motion` | P0 |
| F6 | Blog with MDX posts, categories, reading time, author, related posts, table of contents | P0 |
| F7 | Case study template (challenge, approach, results with numbers, quote) | P0 |
| F8 | Dropdown mega-menus for Services / Platforms / Resources | P0 |
| F9 | Pricing page (tiers + FAQ + CTA) | P0 |
| F10 | Newsletter / lead-magnet capture | P1 |
| F11 | Cookie consent banner (privacy-first, decline non-essential by default) | P0 |
| F12 | Site search for blog | P2 |
| F13 | Light/dark toggle in the demo panel only (site stays light) | P2 |

## 10. SEO requirements (the site must practice what it sells)

- Server-rendered/static pages; clean URLs; one H1 per page; semantic landmarks.
- Unique title/meta per page, canonical tags, Open Graph + Twitter cards with generated OG images.
- Structured data: Organization, WebSite, Service, FAQPage, Article/BlogPosting, BreadcrumbList, Review/AggregateRating only when real.
- XML sitemap, robots.txt, `llms.txt` (optional), hreflang if localized.
- Internal linking: every service page links to relevant case studies and posts.
- Image alt text, descriptive link text, no layout shift.
- GA4 + Search Console set up from day one; event tracking on CTAs and form.

## 11. Non-functional requirements

- **Performance:** LCP < 2.0 s, INP < 200 ms, CLS < 0.05 (mobile, 4G throttled). Lighthouse ≥ 95 performance / 100 SEO / ≥ 95 accessibility.
- **Accessibility:** WCAG 2.2 AA. Pink #DF37A7 on white measures 4.01:1, which fails AA (4.5:1) for normal-size text; it passes only for large text (≥ 24 px, or ≥ 18.66 px bold) and UI components. Use the darker `--accent-strong` #B81D86 (5.9:1) for small pink text, links and, if needed, the button fill (see TRD §9).
- **Security & privacy:** HTTPS, security headers, no secrets in client, GDPR/PIPEDA-friendly consent, form spam protection.
- **Browser support:** last 2 versions of Chrome, Safari, Firefox, Edge; iOS Safari 16+.
- **Maintainability:** content in MDX/data files, tokens in one file, documented components.

## 12. Content requirements and dependencies

Owner must supply before launch: logo and mark, 3+ real case studies with approved numbers and logos, real testimonials (with permission), service descriptions and pricing, team bios/photos, legal copy, scheduler link, form-notification email, analytics IDs, font licenses or approval of fallbacks.

## 13. Out of scope (v1)

Client portal, e-commerce checkout, multi-language, CMS-based real-time editing UI (blog is file-based at v1), AI chatbot.

## 14. Open decisions for the owner

1. **Palette:** keep Outseta's pink/yellow (exact replica) or swap to the BoostCart brand colors via tokens? (Default: exact replica.)
2. **Fonts:** license Kaio + Family, or use free look-alikes? (Default: free look-alikes until licensed.)
3. **Pricing model shown publicly:** fixed monthly packages, "from" prices, or "book a call"?
4. **Proof assets:** which real clients/results may be shown at launch?
5. **Logo:** need a mark with the same "badge" feel as Outseta's concentric-ring logo (original design, not a copy).
6. **Scheduler/CRM:** which tool for booking and lead capture?
7. **Blog authoring:** MDX files in repo (default) or headless CMS?

## 15. Milestones

| Phase | Scope | Output |
|---|---|---|
| 0 | Approve PRD/TRD, decide Section 14 | Signed-off docs |
| 1 | Scaffold, tokens, fonts, primitives, nav/footer | Design system page |
| 2 | Homepage all 12 blocks | Pixel-compare vs reference |
| 3 | Services, pricing, case studies, about, contact, audit form | Core site |
| 4 | Blog, SEO/schema, analytics, consent | SEO-ready |
| 5 | QA (responsive, a11y, perf), content swap, launch | Live on boostcart.agency |
| 6 | P1 pages, comparisons, platform pages | Growth content |

## 16. Risks

| Risk | Mitigation |
|---|---|
| Looks like a clone of Outseta | Original logo, copy, illustrations, mock UIs; no copied assets; own palette available via tokens |
| Custom fonts unlicensed | Ship free fallbacks; swap fonts via one config |
| Fake-looking social proof | Only real clients/testimonials; placeholders blocked from production by a build check |
| Heavy animations hurt performance | CSS-first animation, lazy-load demo panel, reduced-motion support |
| Pink on white fails contrast for small text | Use `--accent-strong` for small text; verify with automated a11y tests |
