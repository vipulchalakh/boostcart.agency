import { unstable_cache } from "next/cache";
import sharp from "sharp";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/sanity/lib/image";

export type CleanLogo = { src: string; width: number; height: number };

type Px = Buffer;
const dist = (d: Px, i: number, c: number[]) => Math.hypot(d[i] - c[0], d[i + 1] - c[1], d[i + 2] - c[2]);
const lum = (d: Px, i: number) => (0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]) / 255;
const sat = (d: Px, i: number) => {
  const mx = Math.max(d[i], d[i + 1], d[i + 2]);
  return mx ? (mx - Math.min(d[i], d[i + 1], d[i + 2])) / mx : 0;
};

/** How close (RGB distance) a pixel must be to the background colour to be removed. */
const BG_TOLERANCE = 40;
/** Anti-aliased pixels this many px from the removed background are un-blended from it. */
const EDGE_RADIUS = 2;

/**
 * Makes a solid background transparent: flood-fills from the image edges when the edges share one opaque colour,
 * then un-blends the anti-aliased pixels next to it (colour-to-alpha) so no halo of the old background remains.
 * Same-coloured areas inside the logo are kept because the fill only spreads from the edges.
 */
function removeBackground(data: Px, w: number, h: number) {
  const border: number[] = [];
  for (let x = 0; x < w; x++) border.push(x, (h - 1) * w + x);
  for (let y = 0; y < h; y++) border.push(y * w, y * w + w - 1);

  const opaque = border.filter((p) => data[p * 4 + 3] > 200);
  if (opaque.length < border.length * 0.6) return; // already transparent around the edges

  const bg = [0, 1, 2].map((k) => {
    const v = opaque.map((p) => data[p * 4 + k]).sort((a, b) => a - b);
    return v[v.length >> 1];
  });
  if (opaque.filter((p) => dist(data, p * 4, bg) < 30).length < border.length * 0.6) return; // edges are not one solid colour

  const removed = new Uint8Array(w * h);
  const stack = opaque.filter((p) => dist(data, p * 4, bg) <= BG_TOLERANCE);
  while (stack.length) {
    const p = stack.pop()!;
    if (removed[p]) continue;
    const i = p * 4;
    if (data[i + 3] > 0 && dist(data, i, bg) > BG_TOLERANCE) continue;
    removed[p] = 1;
    data[i + 3] = 0;
    const x = p % w;
    const y = (p / w) | 0;
    if (x > 0) stack.push(p - 1);
    if (x < w - 1) stack.push(p + 1);
    if (y > 0) stack.push(p - w);
    if (y < h - 1) stack.push(p + w);
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const p = y * w + x;
      if (removed[p]) continue;
      let nearBg = false;
      for (let dy = -EDGE_RADIUS; dy <= EDGE_RADIUS && !nearBg; dy++) {
        for (let dx = -EDGE_RADIUS; dx <= EDGE_RADIUS; dx++) {
          const xx = x + dx;
          const yy = y + dy;
          if (xx >= 0 && yy >= 0 && xx < w && yy < h && removed[yy * w + xx]) {
            nearBg = true;
            break;
          }
        }
      }
      if (!nearBg) continue;

      const i = p * 4;
      let alpha = 0;
      for (let k = 0; k < 3; k++) {
        const c = data[i + k];
        const g = bg[k];
        const a = c > g ? (c - g) / (255 - g || 1) : c < g ? (g - c) / (g || 1) : 0;
        if (a > alpha) alpha = a;
      }
      if (alpha <= 0.02) {
        data[i + 3] = 0;
        continue;
      }
      for (let k = 0; k < 3; k++) data[i + k] = Math.max(0, Math.min(255, Math.round(bg[k] + (data[i + k] - bg[k]) / alpha)));
      data[i + 3] = Math.round(data[i + 3] * Math.min(1, alpha));
    }
  }
}

/** Logos made for dark backgrounds (mostly white/light grey) would vanish on the white card: their neutral parts turn black, coloured accents stay. */
function darkenWhiteLogo(data: Px) {
  let visible = 0;
  let light = 0;
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3] / 255;
    if (!a) continue;
    visible += a;
    if (lum(data, i) > 0.8 && sat(data, i) < 0.25) light += a;
  }
  if (!visible || light / visible <= 0.7) return;

  for (let i = 0; i < data.length; i += 4) {
    if (sat(data, i) >= 0.25) continue;
    data[i] = data[i + 1] = data[i + 2] = Math.round(255 * Math.max(0, 1 - lum(data, i)) * 0.15);
  }
}

async function cleanLogo(url: string): Promise<CleanLogo | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const { data, info } = await sharp(Buffer.from(await res.arrayBuffer())).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

    removeBackground(data, info.width, info.height);
    darkenWhiteLogo(data);

    const { data: png, info: out } = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
      .trim({ threshold: 0 })
      .png({ compressionLevel: 9, palette: true })
      .toBuffer({ resolveWithObject: true });
    return { src: `data:image/png;base64,${png.toString("base64")}`, width: out.width, height: out.height };
  } catch {
    return null;
  }
}

/** Sanity asset URLs change whenever the file changes, so the cleaned logo is cached per URL indefinitely. */
const cachedProcess = unstable_cache(cleanLogo, ["clean-logo-v2"], { revalidate: false });

/**
 * Client logo in its true colours on a transparent background (SVG, AVIF and WebP included: Sanity converts them to PNG first).
 * Returns null on any failure so the caller can fall back to the original image.
 */
export function getCleanLogo(image: SanityImageSource): Promise<CleanLogo | null> {
  // Width only: with both width and height the URL builder crops to that ratio around the hotspot, cutting logos off.
  return cachedProcess(urlFor(image).format("png").width(480).fit("max").url());
}
