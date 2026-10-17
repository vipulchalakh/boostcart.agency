import { auditHref, bookCallHref } from "@content/data";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Tilt } from "./Tilt";

function Dashboard() {
  const rows = [["/collections/running-shoes", "+42%"], ["/products/trail-pro", "+28%"], ["/blog/sizing-guide", "+19%"]];
  return (
    <div className="rounded-xl bg-white p-5 text-ink shadow-lg" role="img" aria-label="Illustration of a sample BoostCart report dashboard">
      <div className="flex items-center justify-between"><span className="text-sm font-medium">Organic revenue</span><span className="font-mono text-[10px] uppercase text-ink-68">Sample</span></div>
      <p className="font-display text-4xl font-bold tracking-[-0.03em]">$—</p>
      <svg viewBox="0 0 400 120" className="mt-2 h-32 w-full" fill="none">
        <defs><linearGradient id="cta-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="var(--accent)" stopOpacity=".28" /><stop offset="1" stopColor="var(--accent)" stopOpacity="0" /></linearGradient></defs>
        <path d="M0 100C50 96 80 80 120 74S190 60 230 44 330 18 400 6V120H0Z" fill="url(#cta-fill)" />
        <path d="M0 100C50 96 80 80 120 74S190 60 230 44 330 18 400 6" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <ul className="mt-3 divide-y divide-ink-05 text-sm">
        {rows.map(([p, d]) => <li key={p} className="flex justify-between py-2"><span className="text-ink-68">{p}</span><span className="font-medium text-success-fg">{d}</span></li>)}
      </ul>
    </div>
  );
}

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="px-2 pb-2 pt-[var(--section-y)]">
      <div className="on-dark relative isolate min-h-[520px] overflow-hidden rounded-panel bg-panel-navy px-5 py-16 text-white md:px-10 lg:min-h-[560px] lg:px-16 lg:py-24">
        <div aria-hidden className="dots-dark absolute inset-0 -z-10" />
        <div aria-hidden className="absolute -right-20 top-1/3 -z-10 h-[520px] w-[620px] bg-[radial-gradient(closest-side,rgb(223_55_167/.25),transparent)]" />
        <Reveal className="relative z-10 max-w-[520px]">
          <Eyebrow>Ready when you are</Eyebrow>
          <h2 id="cta-title" className="h2-xl mt-4 text-white">Get your free SEO audit</h2>
          <p className="lead mt-5 text-[clamp(1.25rem,1.1rem+0.6vw,1.5rem)] [color:rgb(255_255_255/.7)]">We&rsquo;ll review your store and send a prioritized plan. No obligation.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={auditHref} size="lg" arrow>Get my free audit</Button>
            <Button href={bookCallHref} variant="ghost-dark" size="lg">Book a call</Button>
          </div>
        </Reveal>
        <div aria-hidden className="relative mt-12 h-[300px] lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-auto lg:w-[58%]">
          <Tilt>
            <div className="cta-visual">
              <Dashboard />
            </div>
          </Tilt>
        </div>
      </div>
    </section>
  );
}
