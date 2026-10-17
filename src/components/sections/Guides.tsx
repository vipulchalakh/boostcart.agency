import { ArrowRight } from "lucide-react";
import { posts, type Post, type PostCover } from "@content/data";
import { AppLink } from "@/components/ui/AppLink";
import { Button } from "@/components/ui/Button";
import { MarqueeLoop } from "@/components/ui/MarqueeLoop";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const A = "var(--accent)";
const INK = "var(--ink)";

/* Original cover art (decorative): brand colors only, no photos. */
const covers: Record<PostCover, { bg: string; art: React.ReactNode }> = {
  chart: {
    bg: "color-mix(in srgb, var(--yellow) 22%, white)",
    art: (
      <g fill="none" strokeLinecap="round">
        <path d="M0 150C60 142 90 120 140 108S230 92 270 64 350 28 400 18V180H0Z" fill={A} fillOpacity=".12" />
        <path d="M0 150C60 142 90 120 140 108S230 92 270 64 350 28 400 18" stroke={A} strokeWidth="3" />
        <circle cx="270" cy="64" r="6" fill="#fff" stroke={A} strokeWidth="3" />
      </g>
    ),
  },
  bars: {
    bg: "color-mix(in srgb, var(--accent) 12%, white)",
    art: (
      <g>
        {[40, 62, 54, 88, 76, 118, 104, 142].map((h, i) => (
          <rect key={i} x={30 + i * 44} y={180 - h} width="28" height={h} rx="8" fill={i > 4 ? A : INK} fillOpacity={i > 4 ? 0.9 : 0.12} />
        ))}
      </g>
    ),
  },
  rings: {
    bg: "var(--ink-02)",
    art: (
      <g fill="none" stroke={A}>
        {[28, 52, 78, 106].map((r, i) => (
          <circle key={r} cx="290" cy="96" r={r} strokeWidth="1.6" strokeOpacity={0.55 - i * 0.1} />
        ))}
        <circle cx="290" cy="96" r="9" fill={A} stroke="none" />
        <circle cx="86" cy="52" r="26" fill="var(--yellow)" stroke="none" fillOpacity=".7" />
      </g>
    ),
  },
  grid: {
    bg: "#fff",
    art: (
      <g>
        {Array.from({ length: 12 }, (_, i) => {
          const x = 60 + (i % 4) * 78, y = 24 + Math.floor(i / 4) * 52, on = [1, 6, 8].includes(i);
          return <rect key={i} x={x} y={y} width="62" height="40" rx="9" fill={on ? A : INK} fillOpacity={on ? 0.9 : 0.07} />;
        })}
      </g>
    ),
  },
  doc: {
    bg: "var(--panel-navy)",
    art: (
      <g>
        <circle cx="330" cy="30" r="90" fill={A} fillOpacity=".25" />
        <rect x="110" y="26" width="180" height="150" rx="14" fill="#fff" fillOpacity=".08" stroke="#fff" strokeOpacity=".2" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x="134" y={52 + i * 24} width={i === 0 ? 70 : 132 - i * 10} height="8" rx="4" fill="#fff" fillOpacity={i === 0 ? 0.8 : 0.3} />
        ))}
        <rect x="134" y="148" width="50" height="14" rx="7" fill={A} />
      </g>
    ),
  },
  link: {
    bg: "color-mix(in srgb, var(--yellow) 16%, white)",
    art: (
      <g fill="none" stroke={INK} strokeOpacity=".25" strokeWidth="2">
        <path d="M70 120L170 60 270 110 350 50M170 60L200 150 270 110" />
        {[[70, 120], [170, 60], [270, 110], [350, 50], [200, 150]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === 2 ? 13 : 9} fill={i === 2 ? A : "#fff"} stroke={i === 2 ? A : INK} strokeOpacity={i === 2 ? 1 : 0.35} />
        ))}
      </g>
    ),
  },
};

function PostCard({ p }: { p: Post }) {
  const c = covers[p.cover];
  return (
    <article className="group spotlight lift relative flex h-full flex-col overflow-hidden rounded-xl border border-ink-05 bg-white shadow-xs">
      <div className="relative h-[180px] overflow-hidden border-b border-ink-05" style={{ background: c.bg }}>
        <svg aria-hidden viewBox="0 0 400 180" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full transition-transform duration-[var(--dur-med)] ease-[var(--ease-out-quart)] group-hover:scale-[1.04]">
          {c.art}
        </svg>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[11px] uppercase leading-[18px] tracking-[0.04em] text-ink-68">
          <span className="text-accent-strong">{p.category}</span> · {p.readTime} MIN READ
        </p>
        <h3 className="mt-2 line-clamp-2 font-display text-xl font-bold leading-[1.2] tracking-[-0.03em]">{p.title}</h3>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-accent-strong">
          Read guide <ArrowRight aria-hidden className="size-3.5 transition-transform duration-200 group-hover:translate-x-[3px]" />
        </span>
      </div>
      <AppLink href={`/blog/${p.slug}`} aria-label={`Read: ${p.title}`} className="absolute inset-0 rounded-xl" />
    </article>
  );
}

export function Guides() {
  return (
    <section aria-labelledby="guides-title" className="section-y">
      <div className="container-x">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <Eyebrow>Free guides</Eyebrow>
          <h2 id="guides-title" className="h2 mt-4">Learn how stores win at SEO</h2>
          <p className="lead mt-4">Practical playbooks on technical fixes, category pages, content and links. No fluff, and free to read.</p>
        </Reveal>
      </div>

      <MarqueeLoop className="mt-12 px-1 py-4" duration="110s" label="Latest guides">
        <ul className="flex shrink-0 gap-6 pr-6">
          {posts.map((p) => (
            <li key={p.slug} className="w-[290px] shrink-0 sm:w-[340px]">
              <PostCard p={p} />
            </li>
          ))}
        </ul>
      </MarqueeLoop>

      <div className="container-x mt-8 flex justify-center">
        <Button href="/blog" variant="secondary" arrow>Read more guides</Button>
      </div>
    </section>
  );
}
