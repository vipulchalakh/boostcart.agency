# BoostCart.agency — Homepage Design & Build Specification

**File purpose:** Single source of truth for building the BoostCart homepage (`/`) in Next.js. Give this file to Claude Code together with `boostcart-PRD.md` and `boostcart-TRD.md`. If this file conflicts with the PRD/TRD on anything visual or homepage-related, **this file wins**.

**Target:** a production-ready, publish-ready, premium-feeling e-commerce SEO agency homepage that is visually a sibling of outseta.com: bold geometric headlines, editorial serif subheads, mono micro-labels, handwritten pink annotations, a soft yellow-to-pink gradient hero, big dark rounded showpiece panels, a bento grid with live mini-UIs, and calm, precise motion.

**Golden rule:** premium = restraint + precision. Generous whitespace, strict token usage, tight type, soft shadows, buttery 200–400 ms motion. Nothing flashy, nothing random.

---

## 0. Read this first (rules for Claude Code)

1. Build with **Next.js App Router + TypeScript + Tailwind (tokens) ** as defined in the TRD. This page is mostly Server Components; make only interactive parts client components.
2. **Never hard-code** colors, font sizes, radii, shadows or spacing in components. Use the tokens in §2.
3. **Do not copy** Outseta's code, images, copy, logos, testimonials or illustrations. Recreate the *style*, not the assets. All doodles/arrows/illustrations are drawn fresh as inline SVG.
4. **Never invent** clients, testimonials, numbers, ratings, awards or partner badges. Everything that must be real is marked `TODO-REAL` in content files; the production build must **fail** if any `TODO-REAL` remains (see §17). For local development, sample data is allowed only in `content/data/*.sample.ts`.
5. Everything is responsive and accessible (WCAG 2.2 AA) and respects `prefers-reduced-motion`.
6. Build in the order of §16. After each section, run lint/typecheck and view a screenshot at 390 / 768 / 1280 / 1536 px.

---

## 1. Page anatomy (top to bottom)

| # | Section | Background | Purpose |
|---|---|---|---|
| 0 | Navbar + announcement chip | floating over hero | Navigation, quick CTA |
| 1 | **Hero** + pill marquee | white + yellow/pink gradient + dot grid | Promise, primary CTA |
| 2 | **Results showcase** (3 cards) | transparent over gradient | Proof by example |
| 3 | **Proof band** (headline + 3 testimonials) | gradient fades to white | Social proof |
| 4 | **Platforms + 3 steps** | white, compact | "Works with your stack", simple start |
| 5 | **Interactive plan builder** (dark panel) | `#222222` rounded panel | Engagement + lead qualification |
| 6 | **Services bento** (6 tiles) | white | What we do |
| 7 | **Metrics strip** | white | Credibility numbers (real only) |
| 8 | **Process** (scroll-driven 4 steps) | `ink-02` tint | How we work |
| 9 | **Quit guessing — Before/After** | white | Differentiation |
| 10 | **Pricing preview** (3 tiers) | white | Transparency |
| 11 | **FAQ** (accordion) | `ink-02` tint | Objection handling + FAQ schema |
| 12 | **Final CTA panel** (dark navy, tilted dashboard) | `#020617` rounded panel | Conversion |
| 13 | **Footer** | white | Navigation, trust badges |
| — | Floating chat/contact button, cookie banner | fixed | Utility |

Vertical rhythm: sections use `padding-block: var(--section-y)` (128 px desktop, 96 px tablet, 72 px mobile); compact sections 64 px. Content width max `1344px`, side gutters 24 px desktop, 20 px tablet, 16 px mobile.

---

## 2. Design tokens

Create `src/styles/tokens.css`. All values below were measured on the reference (computed styles + screenshots) unless marked *(approx.)*.

### 2.1 Color

```css
:root {
  --ink: #020617;                       /* primary text, dark CTA panel */
  --ink-68: rgb(2 6 23 / .68);          /* secondary text, nav links, serif lead */
  --ink-50: rgb(2 6 23 / .50);
  --ink-32: rgb(2 6 23 / .32);          /* tertiary / disabled */
  --ink-20: rgb(2 6 23 / .20);          /* inset button ring */
  --ink-10: rgb(2 6 23 / .10);
  --ink-05: rgb(2 6 23 / .05);          /* hairlines */
  --ink-02: rgb(2 6 23 / .02);          /* tinted section bg */
  --bg: #ffffff;
  --accent: #df37a7;                    /* primary buttons, doodles, highlights */
  --accent-strong: #b81d86;             /* small pink text/links (5.9:1 on white) */
  --accent-soft: rgb(223 55 167 / .12);
  --yellow: #f9f906;
  --panel-dark: #222222;                /* showpiece panel (plan builder) */
  --panel-navy: #020617;                /* final CTA panel */
  --success-fg: #15803d; --success-bg: #dcfce7; --success-dot: #22c55e;
  --danger-fg:  #b91c1c; --danger-bg:  #fee2e2; --danger-dot:  #ef4444;
  --warn-fg:    #66660a; --warn-bg:    #fefec7;
  --glass-05: rgb(255 255 255 / .05);   /* fields/cards on dark */
  --glass-11: rgb(255 255 255 / .11);
  --glass-50: rgb(255 255 255 / .50);
}
```

Contrast rules: `--accent` (#df37a7) on white = **4.01:1** → allowed only for large text (≥ 24 px or ≥ 18.66 px bold), icons, graphics and button *fills with large/bold labels*. For the button label use **20 px / weight 600** on `--accent`; if an automated check fails, darken the fill to `--accent-strong`. Small pink text and inline links always use `--accent-strong`.

**Optional alternate theme** (only if the owner chooses the BoostCart brand palette — same tokens, different values): `--bg:#EBDCC6` (page), `--panel-dark:#722F37`-tinted dark (`#2a1215`), `--accent:#722F37`, `--accent-strong:#5a2229`, `--yellow:#B7A89A`, hero glows use `#B7A89A` and `#722F37` at low alpha. Do not mix palettes; the default is the Outseta-style palette above.

### 2.2 Typography

| Token | Value |
|---|---|
| `--font-display` | Kaio (if licensed) → fallback **Bricolage Grotesque** 700–800 (tune width/optical size to match the reference's wide, heavy, slightly quirky grotesque) |
| `--font-body` | **Inter** variable |
| `--font-serif` | "Family" (if licensed) → fallback **Newsreader** (or Fraunces) weight 500 |
| `--font-mono` | **JetBrains Mono** |
| `--font-hand` | **Caveat Brush** (alt: Permanent Marker) |

| Role | Size / line-height | Weight | Tracking | Notes |
|---|---|---|---|---|
| H1 | 72 / 72 px (clamp 44→72) | 600 (display) | −0.02em | Centered, balance wrap (`text-wrap: balance`) |
| H2 | 36 / 43.2 px (clamp 28→36); dark/CTA headings 48–56 | 600 | −0.02em | Centered |
| H3 / card title | 16 / 24 | 500 (Inter) | −0.02em | |
| Body | 16 / 24 | 400 | −0.01em | |
| Small | 14 / 21 | 400–500 | −0.01em | nav, buttons, captions |
| Micro / pill | 12 / 18 | 500 | −0.01em | uppercase for pills |
| Lead (serif) | 26 / 39 px (clamp 20→26) | 500 | 0 | color `--ink-68`; emphasized phrases underlined in `--ink` |
| CTA label (hero) | 20 / 30 | 600 | −0.01em | |
| Eyebrow (mono) | 14 / 21 | 400 | +0.04em | UPPERCASE, color `--ink-68` |
| Handwritten note | 18–22 px | — | 0 | `--accent`, rotated −8°…+8° |

Underline style for emphasized serif phrases: `text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 5px; text-decoration-color: var(--ink);` with transition 200 ms on hover to `--accent`.

### 2.3 Shape, elevation, spacing

- Radii: `--r-xs 4px`, `--r-sm 6px`, `--r-md 8px`, `--r-lg 16px`, `--r-xl 20px`, `--r-panel 32px`, `--r-pill 999px`.
- Hairline border: `1px solid var(--ink-05)`.
- Button ring (instead of border): `box-shadow: inset 0 0 0 1px var(--ink-20)`.
- Shadows: `--shadow-xs: 0 1px 2px rgb(0 0 0/.05)`; `--shadow-md: 0 4px 12px -2px rgb(2 6 23/.10)`; `--shadow-lg: 0 24px 48px -12px rgb(2 6 23/.18)`.
- Spacing scale (px): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Grid gap for card grids: 24 px (16 px mobile).

### 2.4 Motion tokens

```css
--ease-out-quart: cubic-bezier(.165,.84,.44,1);  /* transforms, reveals (reference: 0.4s) */
--ease-ui: ease-in-out;                           /* color/background/shadow (reference: 0.2s) */
--dur-fast: 200ms; --dur-med: 400ms; --dur-slow: 700ms; --dur-draw: 1200ms;
```

Measured on the reference: color/background/box-shadow/underline transitions are **0.2 s ease-in-out**; transform transitions are **0.4 s cubic-bezier(.165,.84,.44,1)**; marquee is **40 s linear infinite**; the status dot pulses **2 s ease-in-out infinite**.

---

## 3. Global components (build these first)

### 3.1 Button
- **Primary:** bg `--accent`, text white, radius 8 px (nav-size: 4–6 px), inset ring `--ink-20` at ~15% for depth, `--shadow-xs`. Sizes: `sm` 14 px / padding 4×12; `md` 14 px / 8×24; `lg` 20 px / 600 / padding ≈ 14×24, height ≈ 55 px.
- **Secondary:** transparent, text `--ink`, inset ring `--ink-20`, same radii/sizes.
- **Ghost:** no ring; hover bg `--ink-05`.
- **Hover:** primary brightens (`filter: brightness(1.06)`) + `translateY(-1px)` + shadow-md (200–400 ms); an arrow icon inside slides 3 px right. **Active:** `translateY(0) scale(.99)`. **Focus-visible:** 2 px `--ink` outline, 2 px offset.
- Optional premium touch on the primary hero button only: a very slow, subtle sheen sweep (white 25% diagonal gradient moving across every ~6 s; disabled for reduced motion).

### 3.2 Pill / Chip
12/18 px, weight 500, radius 6, bg white, 1px `--ink-20` border (reference uses uppercase for marquee pills). Variant "step pill": radius 999, white, hairline border, `--shadow-xs`, with a 24 px pink numbered circle on the left, text 20/30.

### 3.3 Eyebrow
Mono, uppercase, 14/21, tracking +0.04em, `--ink-68`, optionally preceded by a 16 px icon/badge (e.g., a small cart-with-arrow brand glyph). Used above H1/H2.

### 3.4 Card
White, `--r-xl` (20 px), hairline border, `--shadow-xs`; padding 24 (16 on testimonials). Hover (only for interactive cards): `translateY(-4px)` + `--shadow-md` over 400 ms ease-out-quart, plus the **spotlight effect** (§3.8).

### 3.5 Status tag
Mono 11–12 px uppercase, radius 4, padding 2×8; success (`ACTIVE`, `DONE`, `RANKING`), warn (`IN REVIEW`), danger, neutral.

### 3.6 Handwritten annotation
Inline-SVG **hand-drawn arrow/curve** (original drawing, stroke `--accent`, 2–2.5 px, round caps) + Caveat Brush text, rotated. Appears with a **stroke-draw animation** (`stroke-dasharray` / `stroke-dashoffset`, 1200 ms ease-out) when it enters the viewport; text fades in 200 ms earlier. `aria-hidden="true"`. Hidden below 768 px (or reduced to one short note).

### 3.7 Reveal on scroll
Utility `<Reveal>` (IntersectionObserver, `threshold: .2`, once): children fade from `opacity 0 → 1` and `translateY(16px → 0)` in 700 ms `--ease-out-quart`. Groups stagger by 80 ms (max 6). No layout shift (reserve space). Disabled under reduced motion (render final state).

### 3.8 Spotlight hover (cards, bento tiles)
A radial gradient (`radial-gradient(240px circle at var(--mx) var(--my), rgb(223 55 167 / .08), transparent 60%)`) follows the pointer inside the card, set via a tiny `pointermove` handler writing CSS variables. Touch devices: no effect.

### 3.9 Marquee
CSS-only: duplicated track, `animation: marquee-scroll-left 40s linear infinite`, `mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)`, `:hover` pauses, `aria-hidden` on the duplicate, static (wrapped, no animation) under reduced motion.

### 3.10 Dotted grid texture
```css
.dots { background-image: radial-gradient(rgb(2 6 23 / .10) 1px, transparent 1.2px); background-size: 24px 24px;
        mask-image: radial-gradient(ellipse at center, #000 30%, transparent 75%); }
```
On dark panels use white at 8% alpha.

---

## 4. Section 0 — Navbar + announcement chip

**Layout:** `position: sticky; top: 8px; z-index: 50`. Floating white pill, max-width 1344, height ≈ 48 px, radius 16, bg `rgb(255 255 255 / .85)` + `backdrop-filter: blur(12px) saturate(1.2)`, hairline border, `--shadow-xs`. Three zones: logo (left), centered links, actions (right).

**Content:**
- Logo: BoostCart wordmark in display font weight 700 + an original circular/rocket-cart mark (concentric or badge feel, 28 px). *Owner to supply final logo; build with a placeholder SVG.*
- Links (14/21, weight 500, color `--ink-68`): **Services ▾**, **Platforms ▾**, **Case Studies**, **Pricing**, **Resources ▾**, **About**, **Blog**. Hover: bg `--ink-05`, radius 8, color `--ink`, 200 ms.
- Right: icon button (mail/phone → contact), **Log in** → renamed **Book a call** (ghost, radius 6), **Free audit** (primary `sm`).
- **Dropdowns** (Radix NavigationMenu): white panel radius 16, shadow-lg, 24 px padding, open with fade + 8 px slide (200 ms). Services menu: 2-column list with icon tile (32 px, `--ink-02` bg, radius 8), title (14 w500), one-line description (13 `--ink-68`), plus a small featured card on the right ("Free audit — get a prioritized plan"). Platforms menu: Shopify, WooCommerce, BigCommerce, Magento, Headless.
- **Scroll behavior:** at `scrollY > 8` navbar gains `--shadow-md` and bg alpha .92; no size change (keeps the reference's calm feel).
- **Announcement chip:** hangs under the right end of the navbar (right-aligned, 8 px below), white, radius 14, `--shadow-md`, 14/21 text: `New: Shopify SEO playbook →` (bold on the key word). Hover: arrow nudges 3 px. Dismissible (×) with state remembered in `sessionStorage` (wrapped in try/catch).
- **Mobile (< 1024 px):** logo left, "Free audit" + hamburger right; menu opens as a full-height sheet from top (radius 0 0 24 24), accordion groups, big tap targets (48 px), body scroll locked, focus trapped, `Esc` closes.

---

## 5. Section 1 — Hero

**Background (layered, pure CSS, behind navbar too):**
1. White base.
2. `radial-gradient(60% 55% at 0% 0%, rgb(249 249 6 / .85), transparent 70%)` — yellow glow top-left.
3. `radial-gradient(55% 60% at 100% 100%, rgb(223 55 167 / .35), transparent 70%)` and a softer pink band on the right edge — pink glow right/bottom *(approx.; tune against the reference screenshot)*.
4. Dotted grid texture (§3.10) at 24 px pitch, masked to fade at the edges.
5. Bottom 160 px fade to white (`linear-gradient(transparent, #fff)`) so the next section blends.

**Content (centered, max-width 960):**
1. Eyebrow: `[icon] E-COMMERCE SEO AGENCY` (mono).
2. **H1:** "Grow Your Store's Organic Revenue" (two lines: "Grow Your Store's / Organic Revenue"). `text-wrap: balance`.
3. **Serif lead:** "Everything you need to rank, from <u>technical SEO</u> and <u>category pages</u> to <u>content</u> and <u>links</u>." Each underlined phrase links to its service page.
4. **CTAs (gap 16):** primary **Get a free audit** (lg) · secondary **Is BoostCart for me?** (lg) → opens a quick qualifier dialog or scrolls to the plan builder (§9).
5. **Trust micro-line under CTAs** (mono 12, `--ink-50`): `NO LONG CONTRACTS · MONTHLY REPORTING · NORTH AMERICA FOCUS` *(owner to confirm claims before launch)*.
6. **Pill marquee** (§3.9), 64 px below: `SHOPIFY STORES · WOOCOMMERCE · BIGCOMMERCE · MAGENTO · HEADLESS · DTC BRANDS · MARKETPLACES · SUBSCRIPTION BOXES`.
7. **Handwritten notes:** left "see what we've grown →" (arrow curving down toward cards), right "real stores, real revenue" (arrow down-left). Desktop only.

**Entrance animation (on load, total ≈ 1.1 s):** eyebrow fades in (0 ms) → H1 reveals **line by line** with a masked slide-up (each line `translateY(100%) → 0` inside `overflow:hidden`, 700 ms ease-out-quart, 90 ms stagger) → lead fades up (300 ms delay) → CTAs fade up (420 ms) → marquee fades in (560 ms). Gradient glows slowly **drift** (±3% position, 18 s ease-in-out alternate infinite) for a living background. Everything static for reduced motion.

**Parallax (subtle):** the two gradient glows move 20–30 px opposite to scroll over the first 600 px (transform only).

**Responsive:** ≤ 768 px: H1 44–48 px, lead 20 px, CTAs stack full-width, annotations hidden, hero padding-top 112 px.

---

## 6. Section 2 — Results showcase (3 cards)

Equivalent of Outseta's "see what our customers are building".

**Layout:** 3-column grid (1 col mobile, horizontal scroll-snap carousel on tablet), gap 24. Each card has an **outer frame** (bg `--ink-02`, radius 24, 1px hairline, padding 8, soft outer ring) containing:
- **Top:** a framed "browser" with the client's store homepage image on a soft colored backdrop (each card its own backdrop color from the client's brand — warm dark, orange, light gray in the reference).
- **Footer strip** (white, radius 16, padding 16): client logo (left, max-height 28) + overlapping **avatar stack** (right, 2 avatars 32 px, 2 px white ring), and below a mono meta line: `SHOPIFY · HOME & DÉCOR · +X% ORGANIC REVENUE`.

**Interactions:** hover → card lifts 6 px (400 ms), browser image scales 1.03 inside its mask, spotlight (§3.8); an "Read case study →" pill fades in at bottom-right. Click → case-study page.

**Content rule:** exactly three **real** case studies (`TODO-REAL`). If fewer than three are available at launch, render only the available ones and hide the section's annotations, or replace with a "Results are coming soon — get your audit" card; never fabricate.

**Scroll animation:** cards reveal with 80 ms stagger.

---

## 7. Section 3 — Proof band

**Heading (H2 centered, max-width 720):** "Everything your store needs to grow organically…" (typographic quotes like the reference).

**Testimonials (3 cards, grid):** white card, radius 20, hairline border, padding 24 (reference: ~456 × 304). Content: 1–3 short paragraphs (body 16/24), author row (avatar 32 px circle, name 14 w500, role 12 `--ink-68`). Include at least one **logo-attributed** testimonial. Equal-height cards, text can start with a bold first line.

**Interaction:** hover lift 4 px + spotlight. Mobile: horizontal scroll-snap carousel with 16 px peek and dots.

**Background:** the hero gradient's pink glow continues behind this section's right side and fades out by the bottom (so the page feels continuous, like the reference).

*All quotes are `TODO-REAL`; use sample data only in development.*

---

## 8. Section 4 — Platforms + 3 steps

**Compact section** (padding-block 64). Centered mono/small line: "Works with the platforms you already use" + link **View all →** (14, w500).
- **Logo row:** 6–7 monochrome icons (Shopify, WooCommerce, BigCommerce, Magento/Adobe Commerce, Webflow, Next.js, Wix), 32–40 px, color `--ink-50`, on hover → `--ink` and a 2 px lift. Use official brand marks only where permitted; otherwise neutral text/icon marks. Do not imply partnership.
- **Step pills (centered row, wraps on mobile):** `① Free audit` · `② Get your roadmap` · `③ Watch revenue grow`. Pills are white, radius 999, shadow-xs, 24 px pink numbered circle, 20/30 text. A thin dotted connector line runs between them on desktop; on scroll-in, the connector **draws** left to right (600 ms) and each number circle pops (scale .8 → 1) in sequence.

---

## 9. Section 5 — Interactive plan builder (dark showpiece)

Equivalent of Outseta's "Styled for your brand" live-component panel. This is the page's **wow moment**.

**Panel:** full-width minus 8 px margins, bg `--panel-dark` (#222), radius 32, padding 128 px 64 px (64 px 20 px mobile), subtle inner radial **pink glow** behind the center card, dotted grid at white 8%. Hand-drawn **pink spiral doodle** bottom-left and a **curved arrow** near the heading (original SVG, draw-on-scroll).

**Heading block (centered, white):** H2 (display, 56 px / 1.05): "Built around your store". Serif lead (`rgb(255 255 255/.6)`): "Tell us a little about your shop and see where we'd start." Handwritten note: "play with the live builder →".

**Tabs row** (glass segmented control, radius 8, bg `--glass-05`, 1 px `--glass-11` border, 14 px text): `Platform · Catalog · Goal · Your plan`. (Or the reference's pattern: tabs that switch the center card.)

**3-column layout (desktop):**
- **Left controls:**
  - *Platform* — segmented buttons: Shopify / WooCommerce / BigCommerce / Magento / Other.
  - *Catalog size* — 4 tiles (`< 100`, `100–1k`, `1k–10k`, `10k+` products).
  - *Primary goal* — tiles: More category traffic · Product page rankings · Content/blog authority · Fix technical issues.
- **Center glass card (the "live preview", 360 × ~520):** bg `--glass-05` with backdrop blur, border `--glass-11`, radius 20. It shows **"Your recommended starting plan"**: a checklist of 4–6 priority workstreams chosen by the selections (e.g., Shopify + 10k+ + "Fix technical issues" → "Collection-page pagination & faceted navigation", "Duplicate-content & canonical cleanup", "Schema: Product/Offer/Review", …), each with a status tag (`START HERE`, `WEEK 2`, `MONTH 2`) and a one-line reason. Below: a glass **"Get this plan audited"** field + pink button (email → opens audit form prefilled with selections).
- **Right panel:** "Package fit" (Starter / Growth / Scale) highlighting the best match with an accent ring, plus "Typical timeline" text.

**Behavior:** all client-side, instant (no network). Selecting an option animates the center card: old items fade/translate up 8 px while new items fade in with 60 ms stagger (400 ms ease-out-quart); the selected tile gets an accent ring (`box-shadow: 0 0 0 2px var(--accent)`) and a micro scale (1.02). Keyboard: arrow keys move within a group (`role="radiogroup"`), `Enter/Space` selects. State is a single reducer. **Honesty rule:** output is *recommendations*, never fabricated forecasts or revenue figures; label the card "Illustrative starting point — your real plan comes from the audit." Recommendation logic lives in `content/data/plan-rules.ts` (a simple rules table the owner can edit).

**Mobile:** controls stack above the preview; tabs become a horizontally scrollable chip row; the preview card becomes full-width.

**SSR/SEO:** the section's heading, lead and a static default plan are server-rendered; the interactive controls hydrate lazily (dynamic import when the section nears the viewport).

---

## 10. Section 6 — Services bento grid

**Header (centered):** eyebrow `ALL-IN-ONE SEO PROGRAM` → H2 "Everything that moves your store's revenue" (two lines, balance). Optional serif lead: "One team. One roadmap. One report."

**Grid:** 12-col CSS grid, gap 24. **Row 1:** wide tile (5 cols, taller) · medium (3.5) · medium (3.5) *(reference proportions ≈ 676 / 400 / 400 at 1534 px)*. **Row 2:** three tiles of roughly equal width (≈ 4 cols each). Mobile: single column; tablet: 2 columns.

**Tile anatomy:** white, radius 20, hairline border, padding 24, title (16 w500) + description (14 `--ink-68`, max 3 lines) at top (optional arrow icon top-right, fades in on hover), **mini-UI mock** anchored at the bottom and bleeding to the card edge (clipped by radius), and an optional "Learn more →" link.

| Tile | Title / copy | Mini-UI (build as HTML/SVG, animated on view) |
|---|---|---|
| 1 (wide) | **Technical SEO** — "Crawl, speed, indexation and structured data fixed at the root so every page can rank." | Audit checklist with check-ticks appearing one by one (stagger 150 ms) + a circular score gauge animating 54 → 96 (clearly labeled *sample*). Bullets with ticks: Crawlability · Core Web Vitals · Schema · Faceted navigation |
| 2 | **Category & Product Pages** — "Rankable collections and product pages that turn searches into carts." | SERP-snippet card: title/URL/description with the *before* grayed and *after* highlighted (typewriter reveal), plus a Product-schema chip |
| 3 | **Content & Buying Guides** — "Content that captures high-intent search and builds trust." | Editorial calendar list (4 rows, avatar + title + status tags `DRAFT / REVIEW / LIVE`), rows slide in on view |
| 4 | **Link Building & Digital PR** — "Editorial links from sites your customers read." | Outreach list with status tags (`SENT`, `REPLIED`, `LIVE`) and a small growing line sparkline |
| 5 | **Conversion-focused SEO** (or International/Marketplace SEO — owner to choose) — "Traffic is only useful if it buys." | Mini funnel bars (Sessions → Add to cart → Orders) animating widths, labeled *sample* |
| 6 | **Reporting** — "Know exactly which pages bring revenue and why." | Big number card "Organic revenue" + smooth pink area/line chart that **draws itself** (stroke-dashoffset 1200 ms) with a hover tooltip, `Share ▾` pill, labeled *sample data* |

**Interactions:** tile hover = lift 4 px + spotlight + arrow icon fades in; mini-UIs have gentle idle motion (e.g., a blinking cursor, pulsing "live" dot 2 s). Charts are SVG with `role="img"` + `aria-label` summarizing the sample. Tiles are links to service pages (whole-card click via stretched link, keyboard focus ring).

---

## 11. Section 7 — Metrics strip

A calm, premium band right below the bento (compact padding). 4 large numbers in a row separated by hairlines (2×2 on mobile): number in display font 56 px weight 600, label in mono 12 uppercase `--ink-68`. Example labels: `STORES GROWN`, `ORGANIC REVENUE INFLUENCED`, `KEYWORDS IN TOP 10`, `AVG. TIME TO FIRST WINS`. **Count-up animation** (1.2 s ease-out, once, on viewport entry; reduced motion: final value).

**Hard rule:** numbers must be real and documented (`TODO-REAL`). If the owner doesn't have 4 verifiable numbers, hide this section entirely (feature flag `showMetrics`).

---

## 12. Section 8 — Process (scroll-driven)

Equivalent of Outseta's soft tinted section (`--ink-02` bg) used for a sequence story.

**Header:** eyebrow `HOW WE WORK` → H2 "From audit to compounding growth" → serif lead.

**Desktop layout:** two columns inside a section ≈ 300 vh tall. **Left (sticky):** the four steps as a vertical list (title + 1–2 line description); the active step is full-ink with a pink progress bar (3 px) on its left edge that fills as you scroll; inactive steps are `--ink-32`. **Right (sticky visual card, 520 px):** a white card whose mini-UI **cross-fades/slides** per step:
1. **Audit** — crawl summary UI with issue counts by severity.
2. **Roadmap** — a prioritized backlog board (impact × effort chips).
3. **Execute** — changelog feed ("Collection page titles updated · 124 URLs") with live dot.
4. **Report** — revenue chart + "next 30 days" list.

Step changes are driven by scroll progress (IntersectionObserver on step markers, or CSS `animation-timeline: view()` with a JS fallback). Clicking a step scrolls to it (smooth). Transitions 400 ms ease-out-quart.

**Mobile:** no sticky; each step is a stacked card with its mini-UI beneath the text, revealed on scroll.

---

## 13. Section 9 — "Quit guessing" Before / After

Direct counterpart of "Quit context switching".

**Header:** H2 "Quit guessing" + serif lead "Managing e-commerce SEO shouldn't feel like a gamble — let's put it under control."

**Two columns (gap 24):** each starts with a rounded **tile** (height ≈ 168, radius 24, 1px hairline):
- **Before tile:** bg `--ink-02`; a row of 6 small rounded logo-chips of *generic* tools (use neutral icon tiles, not real third-party logos unless allowed): plugin, spreadsheet, generic report, freelancer, ad dashboard, "+" chip. Subtle chaotic feel; chips jitter ±2° on hover.
- **After tile:** bg warm tint (yellow at 20% → white) with a single large rounded white badge in the center holding the **BoostCart mark** on `--yellow`.

Below: a hairline divider with a centered **black label pill** ("Before" / "After", white text 14 w500, radius 8, padding 4×16).

**Lists (16/24, gap 16):**
- Before (red circular ✕, `--danger-dot` bg, white glyph): "Random plugin fixes" · "Blog posts nobody ranks" · "Reports full of vanity metrics" · "Agencies that disappear after the audit" · "Traffic that doesn't convert" · "Hidden fees and long lock-ins" · "Guessing which pages matter" · "Waiting months for any signal".
- After (green circular ✓, `--success-dot`): "One team for technical, content and links" · "One roadmap tied to revenue" · "One dashboard for every channel metric" · "One monthly report you can read in 5 minutes" · "One clear, simple price" · "One point of contact" · …
- In each item, **1–2 key words underlined** (1 px, offset 3 px) as in the reference.

**Animation:** list items reveal in 60 ms stagger; icons pop (scale .6 → 1, 300 ms). The two columns animate in from opposite sides by 16 px.

---

## 14. Section 10 — Pricing preview

**Header:** eyebrow `TRANSPARENT PRICING` → H2 "Simple monthly plans" → lead "No surprise fees. Cancel with 30 days' notice." *(owner to confirm terms)*.

**3 cards (Starter / Growth / Scale):** white cards, radius 20; the middle (recommended) card has a 1 px `--accent` ring, a mono `MOST POPULAR` tag, and a very faint pink glow. Content: plan name (16 w500), price (display 40 px) + "/month", description (14), feature list with ✓ icons (14), full-width button (primary on the featured plan, secondary on others). Price values and features are `TODO-REAL` (owner decides). If the owner prefers "book a call" pricing, replace prices with "From $X" or "Custom" and keep the layout.

**Interaction:** monthly/quarterly toggle optional (segmented control); card hover lift 4 px; featured card slightly larger (scale 1.02) on desktop. Below cards: link "Compare all plans →" (to `/pricing`).

---

## 15. Section 11 — FAQ

Tinted section (`--ink-02`). Two-column: left (sticky) heading "Questions, answered" + serif lead + small CTA "Still curious? Talk to us"; right accordion (Radix Accordion). Each item: 16 w500 question, `+` icon rotating to `×` (200 ms), answer 16/24 `--ink-68` expanding with height animation 300 ms ease-out-quart. 6–8 questions, e.g.: *How long until we see results? · Do you work with Shopify/WooCommerce/BigCommerce? · What does the free audit include? · Do you need access to our store? · How do you report? · Do you write the content? · What are your contract terms? · Do you do link building safely?* Answers are written by the owner (no fake claims). Output **FAQPage JSON-LD** from the same data.

---

## 16. Section 12 — Final CTA panel (dark navy)

**Panel:** bg `--panel-navy` (#020617), radius 32, margin 8 px, height ≈ 520–560 px (desktop), overflow hidden, dotted texture (white 8%). Two columns:
- **Left (max-width 520):** H2 in display font, white, 56 / 1.05: "Get your free SEO audit". Serif lead (`rgb(255 255 255/.7)`, 24 px): "We'll review your store and send a prioritized plan — no obligation." **Button:** primary `lg` "Get my free audit" (+ secondary ghost-on-dark "Book a call").
- **Right:** a product-style **dashboard visual** (original HTML/SVG or high-quality image of a BoostCart-style report: revenue chart, top pages, keywords table) displayed in **3D perspective** (`transform: perspective(1600px) rotateX(18deg) rotateY(-24deg) rotateZ(10deg)`), bleeding off the right/bottom edges, soft glow behind it (pink 25% radial). On pointer move (desktop), the tilt shifts ±3° (spring, 400 ms); scroll-in animation: slides from +40 px and fades (700 ms).
- Inline email capture alternative (optional): single glass input + button that opens the audit form with the email prefilled.

**Mobile:** text first, dashboard below at 100% width with less tilt (rotateX 10°) and clipped.

---

## 17. Section 13 — Footer

White background, 64 px top padding. **Left column:** logo + a short line, then 4 social icon buttons (X, LinkedIn, YouTube, Instagram — only real profiles) as 36 px squares, radius 8, hairline border; hover bg `--ink-05`. **Right: 5 link columns** (column title 13–14 w500 `--ink`; links 13–14 `--ink-68`, hover `--ink` + underline fade 200 ms):
- **Services:** Technical SEO · Category & Product Pages · Content · Link Building · Reporting · Pricing
- **Platforms:** Shopify SEO · WooCommerce SEO · BigCommerce SEO · Magento SEO · Headless SEO
- **Company:** About · Case Studies · Blog · Partner program · Privacy policy · Terms of service
- **Comparisons:** vs. In-house SEO · vs. Generic SEO agencies · vs. SEO plugins/tools *(P1 pages — hide links until pages exist)*
- **Resources:** Free audit · E-commerce SEO guides · Checklists · Contact

**Bottom bar:** hairline divider, left `© 2026 BoostCart`, right **mono badges** (11–12 px uppercase, hairline border, radius 6, 4×10 padding, icon at left): `GDPR COMPLIANT` (only if true), `STATUS ● ` (green pulsing dot → status page, optional). No third-party "verified partner" badge unless real.

---

## 18. Global overlays and utilities

- **Floating contact button:** fixed bottom-right (24 px), 56 px circle, `--accent`, white chat icon, `--shadow-md`; hover scale 1.06; opens a dialog (name, email, message, or "Book a call" link). Hides when the final CTA panel is in view on mobile.
- **Cookie/consent banner:** bottom-left card (max-width 360), radius 16, shadow-lg, decline and accept equally prominent; non-essential cookies **off** by default; analytics loads only after consent.
- **Scroll progress bar (optional):** 2 px `--accent` line at the very top.
- **Custom selection color:** `::selection { background: var(--accent-soft); }`.
- **Smooth scroll** for in-page anchors (disabled for reduced motion); `scroll-margin-top: 96px` for anchored sections.

---

## 19. Animation catalog (summary)

| Where | Effect | Spec |
|---|---|---|
| Hero | Masked line-by-line H1 reveal, staggered lead/CTAs | 700 ms ease-out-quart, 90 ms stagger |
| Hero bg | Slow gradient drift + scroll parallax | 18 s alternate; ±20–30 px |
| Marquee | Infinite left scroll | 40 s linear; pause on hover |
| Annotations | Stroke-draw | 1200 ms ease-out |
| Cards | Reveal + hover lift + spotlight | 700 ms reveal; 400 ms hover |
| Buttons | Hover lift, arrow nudge, optional sheen | 200–400 ms |
| Plan builder | Cross-fade list swap + ring/scale on select | 400 ms |
| Bento mini-UIs | Charts draw, ticks stagger, status tags slide | 600–1200 ms, once on view |
| Metrics | Count-up | 1.2 s ease-out |
| Process | Scroll-driven step progress + visual swap | 400 ms |
| Accordion | Height + icon rotate | 300 ms / 200 ms |
| CTA panel | Dashboard slide-in + pointer tilt | 700 ms / 400 ms spring |
| Status dot | Pulse | 2 s ease-in-out infinite |

**Performance rules for motion:** animate only `transform` and `opacity` (plus `stroke-dashoffset`); no layout-thrashing properties; `will-change` only during animation; one IntersectionObserver instance shared via a hook; total JS for animations < 30 KB gzipped (CSS first; `motion` only where needed).

**Reduced motion:** under `prefers-reduced-motion: reduce` — no parallax, no drift, no marquee scrolling (static wrapped pills), no count-up (final values), no draw animations (final state), reveals are instant, hover lifts limited to color changes.

---

## 20. Responsive behavior

| Breakpoint | Rules |
|---|---|
| ≥ 1280 | Full layout as specified; 3-col grids; side annotations visible |
| 1024–1279 | Same structure, gutters 24, bento row 1 becomes 6/3/3 proportions, annotations only the hero ones |
| 768–1023 | Navbar collapses to hamburger; showcase & testimonials become scroll-snap carousels; bento 2 columns; plan-builder panel becomes 2 columns (controls / preview); process not sticky |
| < 768 | Single column; H1 44 px, H2 28 px, lead 20 px; CTAs stacked full width; panel padding 64×20; footer columns collapse to 2 columns; annotations hidden; dashboards clipped with reduced tilt |

Touch targets ≥ 44 px. Test at 360, 390, 768, 1024, 1280, 1536, 1920 px; no horizontal scroll at any width.

---

## 21. Accessibility checklist

- One `<h1>` (hero). Logical heading order; landmarks (`header`, `nav`, `main`, `footer`), skip-to-content link.
- Visible focus ring everywhere (2 px `--ink`, 2 px offset; on dark panels white).
- Radix primitives for menus/tabs/dialog/accordion (keyboard + ARIA built in).
- Decorative SVGs `aria-hidden`; informative charts have `role="img"` + `aria-label`.
- Marquee pills duplicated set is `aria-hidden`; pause on hover/focus.
- Color contrast verified by automated test (see §2.1 rules). Never convey status by color alone (icons/text included).
- All motion respects reduced motion; no content appears only on hover (mirror it on focus).

---

## 22. SEO & content on the homepage

- `<title>`: "E-commerce SEO Agency for Shopify, WooCommerce & BigCommerce | BoostCart" (≤ 60 chars final; adjust). Meta description ≈ 150–160 chars with the primary promise + "free audit".
- H1 as specified; H2s as above; descriptive anchor text for service links.
- JSON-LD: `Organization`, `WebSite`, `ProfessionalService`/`Service`, `FAQPage` (from §15). `Review`/`AggregateRating` only with real, verifiable reviews.
- OG/Twitter image: generated 1200×630 with display-font headline on the gradient.
- All images `next/image` with explicit dimensions; hero has no raster image (CSS-only background); LCP element = H1 text.

---

## 23. Build order for Claude Code

1. Tokens, fonts, global CSS, utilities (`Reveal`, `Marquee`, `Annotation`, spotlight hook).
2. Primitives: Button, Pill, Eyebrow, Card, Tag, Avatar/AvatarStack.
3. Navbar (+ mega menus, mobile sheet) and Footer.
4. Hero + marquee (match screenshot first, then add motion).
5. Results showcase → Proof band → Platforms/steps.
6. Plan builder (dark panel) with rules file.
7. Bento + mini-UIs → Metrics strip → Process → Before/After → Pricing → FAQ → Final CTA.
8. Overlays (chat button, cookie banner), then polish pass (motion, spacing, contrast), SEO/JSON-LD, analytics (consent-gated).
9. QA (§24) and the production content guard (§25).

---

## 24. Acceptance criteria (definition of done)

- Visual: side-by-side with the reference at 1536 px shows the same typographic scale, spacing rhythm, radii, shadows, color usage and section structure (content differs). Owner signs off on screenshots at 390 / 768 / 1280 / 1536.
- Performance (mobile, throttled): LCP < 2.0 s, INP < 200 ms, CLS < 0.05; Lighthouse Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100.
- Accessibility: axe-core zero serious/critical issues; full keyboard path through navbar, plan builder, FAQ, forms, dialogs.
- Functional: audit form works end-to-end (validation, spam check, email delivery, success state); plan builder prefill passes selections to the form; all links resolve (no 404s); responsive checks pass.
- Motion: no jank (60 fps on mid-range mobile), reduced-motion mode verified.
- Content: no placeholder, lorem ipsum, sample data, or fabricated proof in the production build.

## 25. Production content guard

All owner-supplied facts live in `content/data/*.ts`. Any value still equal to `"TODO-REAL"` (or imported from `*.sample.ts`) must make `pnpm build` fail in production (`NODE_ENV=production`) with a clear message listing the offending fields. This guarantees nothing fake can be published.

## 26. Items the owner must supply before launch

Final logo/mark and favicon · 3 real case studies (screenshots, logos, numbers, approval) · real testimonials with permission · 4 verifiable metrics (or hide §11) · pricing tiers and terms (or "book a call") · FAQ answers · service descriptions · scheduler link (e.g., Calendly/Cal.com) · notification email · analytics IDs · social profile URLs · decision on fonts (license Kaio/"Family" or keep free fallbacks) · decision on palette (default Outseta-style vs. BoostCart brand palette).
