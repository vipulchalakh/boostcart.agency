/** Deterministic per-page numbers for the sample visuals, so each page's funnel, revenue chart and score look different. */
function rng(seed: string) {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => {
    h += 0x6d2b79f5;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function mockStats(seed: string) {
  const r = rng(seed);
  const score = 92 + Math.floor(r() * 6);
  const cart = Math.round(36 + r() * 20);
  const orders = Math.round(12 + r() * 14);
  // Revenue curve: 8 rising points with a little noise, smoothed into a path (viewBox 280 x 100).
  const bend = 0.75 + r() * 0.7;
  const pts = Array.from({ length: 8 }, (_, i) => {
    const t = i / 7;
    const y = 92 - 84 * Math.pow(t, bend) + (i > 0 && i < 7 ? (r() - 0.5) * 14 : 0);
    return [Math.round(t * 280), Math.max(6, Math.min(94, Math.round(y)))] as const;
  });
  let line = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    line += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0]} ${p2[1]}`;
  }
  return { score, cart, orders, line };
}
