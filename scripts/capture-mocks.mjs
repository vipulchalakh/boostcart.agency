/**
 * Records the animated "What we do" tile visuals (the six code-built mocks in each ServicesBento) from the running
 * dev server and saves them as looping animated WebP files in public/mocks/<group>/<page>/<1-6>.webp,
 * plus src/lib/mock-manifest.json with each image's size.
 *
 * Usage (dev server must be running, and the pages must still render the live code mocks):
 *   node scripts/capture-mocks.mjs                 # every page
 *   node scripts/capture-mocks.mjs industries/jewelry-accessories services/content   # only these
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import sharp from "sharp";
import { chromium } from "playwright-core";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public/mocks");
const MANIFEST = path.join(ROOT, "src/lib/mock-manifest.json");
const DPR = 2;
const VIEW = { width: 1440, height: 1100 };
const HOLD_MS = 3500; // last frame stays this long before the loop restarts
const RECORD_MS = 4200;

const industries = ["fashion-apparel", "beauty-skincare", "health-supplements", "home-furniture", "electronics-gadgets", "jewelry-accessories", "food-beverage", "sports-outdoors", "baby-kids", "pet-supplies"];
const services = ["technical-seo", "category-product-pages", "content", "link-building", "conversion-seo", "reporting"];
const ALL = [
  ["home", "/"],
  ...services.map((s) => [`services/${s}`, `/services/${s}`]),
  ...industries.map((s) => [`industries/${s}`, `/industries/${s}`]),
];

const only = process.argv.slice(2);
const targets = only.length ? ALL.filter(([key]) => only.includes(key)) : ALL;
const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, "utf8")) : {};

const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });

async function recordPage(key, url) {
  const ctx = await browser.newContext({ viewport: VIEW, deviceScaleFactor: DPR, reducedMotion: "no-preference" });
  const page = await ctx.newPage();
  // Controllable clock for JS-driven animation (count-up numbers): requestAnimationFrame callbacks only run when we advance it.
  await page.addInitScript(() => {
    let now = 0;
    let cbs = [];
    performance.now = () => now;
    window.requestAnimationFrame = (cb) => (cbs.push(cb), cbs.length);
    window.cancelAnimationFrame = () => {};
    window.__advance = (t) => {
      now = t;
      const run = cbs;
      cbs = [];
      run.forEach((cb) => cb(t));
    };
  });
  await page.goto(BASE + url, { waitUntil: "load" });
  await page.addStyleTag({
    content: `
      section[aria-label="Cookie consent"], header { display: none !important; }
      html { scroll-behavior: auto !important; }
      section[aria-labelledby="bento-title"] .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
      [data-nextjs-toast], nextjs-portal { display: none !important; }`,
  });
  await page.waitForTimeout(1200);

  const geo = await page.evaluate(() => {
    const section = document.querySelector('section[aria-labelledby="bento-title"]');
    if (!section) return null;
    const top = section.getBoundingClientRect().top + scrollY;
    const mocks = [...section.querySelectorAll("article")].map((a) => {
      const m = a.querySelector('div[class*="-mx-6"]')?.firstElementChild;
      const r = m.getBoundingClientRect();
      return { x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height };
    });
    return { top, mocks };
  });
  if (!geo || geo.mocks.length !== 6) throw new Error(`${key}: expected 6 tiles, found ${geo?.mocks.length}`);
  const scrollTarget = Math.max(0, geo.top + 150);

  // Scroll the tiles into view, wait for them to reveal, then freeze every animation at time zero.
  await page.evaluate((y) => window.scrollTo(0, y), scrollTarget);
  await page.waitForFunction(
    () => {
      const tiles = [...document.querySelectorAll('section[aria-labelledby="bento-title"] article')];
      return tiles.length === 6 && tiles.every((a) => a.parentElement.classList.contains("is-visible"));
    },
    null,
    { polling: 5, timeout: 8000 },
  );
  const total = await page.evaluate(() => {
    document.body.offsetHeight; // flush styles so every transition and animation exists before freezing
    const anims = document.getAnimations();
    let end = 1300; // count-up numbers run 1.2 s
    for (const a of anims) {
      a.pause();
      a.currentTime = 0;
      const e = a.effect?.getComputedTiming?.().endTime;
      if (Number.isFinite(e)) end = Math.max(end, e);
    }
    return Math.ceil(end);
  });

  const STEP = 40; // ms per frame, 25 fps
  const rects = geo.mocks.map((g) => ({
    left: Math.round(g.x * DPR),
    top: Math.round((g.y - scrollTarget) * DPR),
    width: Math.round(g.w * DPR),
    height: Math.round(g.h * DPR),
  }));
  const clip = { x: 0, y: Math.max(0, Math.min(...geo.mocks.map((g) => g.y - scrollTarget)) - 12), width: VIEW.width, height: 0 };
  clip.height = Math.min(VIEW.height - clip.y, Math.max(...geo.mocks.map((g) => g.y - scrollTarget + g.h)) + 12 - clip.y);
  const clipTop = Math.round(clip.y * DPR);

  const shots = [];
  for (let t = 0; t <= total + STEP; t += STEP) {
    await page.evaluate((time) => {
      document.getAnimations().forEach((a) => (a.currentTime = time));
      window.__advance(time);
    }, t);
    await page.waitForTimeout(35);
    shots.push({ t, buf: await page.screenshot({ clip, type: "png" }) });
  }
  await ctx.close();

  const dir = path.join(OUT, key);
  fs.mkdirSync(dir, { recursive: true });
  for (let i = 0; i < 6; i++) {
    const r = rects[i];
    const region = { left: r.left, top: r.top - clipTop, width: r.width, height: r.height };
    const kept = [];
    let last = null;
    for (const s of shots) {
      const crop = await sharp(s.buf).extract(region).png().toBuffer();
      const h = crypto.createHash("md5").update(crop).digest("hex");
      if (h === last) continue;
      last = h;
      kept.push({ t: s.t, crop });
    }
    const delays = kept.map((f, j) => (j < kept.length - 1 ? Math.max(20, kept[j + 1].t - f.t) : HOLD_MS));
    if (kept.length > 1) delays[0] = Math.min(delays[0], 300);
    // A tile with nothing to animate becomes a still image.
    const out = kept.length === 1
      ? await sharp(kept[0].crop).webp({ quality: 80, effort: 4 }).toBuffer()
      : await sharp(kept.map((k) => k.crop), { join: { animated: true } }).webp({ quality: 80, effort: 4, delay: delays, loop: 0 }).toBuffer();
    fs.writeFileSync(path.join(dir, `${i + 1}.webp`), out);
    manifest[`${key}/${i + 1}`] = { w: Math.round(r.width / DPR), h: Math.round(r.height / DPR) };
    console.log(`${key}/${i + 1}.webp  ${kept.length} frames  ${(out.length / 1024).toFixed(0)} KB  ${r.width}x${r.height}`);
  }
}

for (const [key, url] of targets) {
  try {
    await recordPage(key, url);
  } catch (e) {
    console.error("FAILED", key, e.message);
  }
}
fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
await browser.close();
