import { PortableText, type PortableTextComponents, type PortableTextProps } from "@portabletext/react";
import { Info, Lightbulb, TriangleAlert } from "lucide-react";
import { AppLink } from "@/components/ui/AppLink";
import { cn } from "@/lib/cn";
import { SanityImage, type SanityImg } from "./SanityImage";

type Props = { value: PortableTextProps["value"]; headingIds: Record<string, string> };

type TableValue = { caption?: string; hasHeaderRow?: boolean; rows?: { _key: string; cells?: string[] }[] };
type CalloutValue = { tone?: "note" | "tip" | "warning"; text?: string };
type PullQuoteValue = { text?: string; attribution?: string };
type ImageValue = SanityImg & { caption?: string | null };

const calloutTone = {
  tip: { Icon: Lightbulb, box: "border-success-dot/30 bg-success-bg", icon: "text-success-fg", label: "Tip" },
  warning: { Icon: TriangleAlert, box: "border-danger-dot/30 bg-danger-bg", icon: "text-danger-fg", label: "Warning" },
  note: { Icon: Info, box: "border-ink-10 bg-ink-02", icon: "text-ink-68", label: "Note" },
} as const;

function QuoteGlyph({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 32 24" className={className} fill="currentColor">
      <path d="M0 24V14.4C0 6.2 4.4 1.2 12 0l1.4 3.6C9.4 4.8 7.4 7.4 7.2 11H13V24H0Zm19 0V14.4C19 6.2 23.4 1.2 31 0l1.4 3.6c-4 1.2-6 3.8-6.2 7.4H32V24H19Z" />
    </svg>
  );
}

function buildComponents(headingIds: Record<string, string>): PortableTextComponents {
  const heading = (Tag: "h2" | "h3" | "h4", cls: string) =>
    function Heading({ children, value }: { children?: React.ReactNode; value: { _key?: string } }) {
      return (
        <Tag id={value._key ? headingIds[value._key] : undefined} className={cls}>
          {children}
        </Tag>
      );
    };

  return {
    block: {
      normal: ({ children }) => <p>{children}</p>,
      h2: heading(
        "h2",
        "mt-4 font-display text-[1.75rem] font-bold leading-[1.15] tracking-[-0.02em] text-ink md:text-[2.125rem]",
      ),
      h3: heading("h3", "mt-2 font-display text-[1.375rem] font-bold leading-snug tracking-[-0.015em] text-ink md:text-[1.5rem]"),
      h4: heading("h4", "mt-1 font-display text-lg font-semibold leading-snug text-ink"),
      blockquote: ({ children }) => (
        <blockquote className="relative my-2 overflow-hidden rounded-xl border border-accent/15 bg-accent-soft py-8 pl-8 pr-6 md:pl-12 md:pr-10">
          <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-accent" />
          <QuoteGlyph className="mb-4 h-6 text-accent/70" />
          <div className="font-serif text-[1.5rem] leading-[1.4] tracking-[-0.005em] text-ink md:text-[1.75rem]">{children}</div>
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => <ul className="list-disc space-y-2.5 pl-6 marker:text-accent">{children}</ul>,
      number: ({ children }) => <ol className="list-decimal space-y-2.5 pl-6 marker:font-mono marker:text-sm marker:text-accent-strong">{children}</ol>,
    },
    listItem: { bullet: ({ children }) => <li className="pl-1">{children}</li>, number: ({ children }) => <li className="pl-1.5">{children}</li> },
    marks: {
      strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
      em: ({ children }) => <em>{children}</em>,
      code: ({ children }) => <code className="rounded bg-ink-05 px-1.5 py-0.5 font-mono text-[0.85em] text-ink">{children}</code>,
      inlineQuote: ({ children }) => (
        <span className="rounded-md bg-[color-mix(in_srgb,var(--yellow)_38%,white)] px-1.5 py-0.5 font-serif text-[1.08em] text-ink before:mr-0.5 before:text-accent-strong before:content-['“'] after:ml-0.5 after:text-accent-strong after:content-['”']">
          {children}
        </span>
      ),
      link: ({ children, value }) =>
        value?.href ? (
          <AppLink href={value.href} className="post-link">
            {children}
          </AppLink>
        ) : (
          <>{children}</>
        ),
    },
    types: {
      image: ({ value }: { value: ImageValue }) => (
        <figure className="my-2">
          <SanityImage image={value} width={1400} sizes="(min-width: 1280px) 720px, (min-width: 768px) 700px, 100vw" className="h-auto w-full rounded-xl border border-ink-05" />
          {value.caption && <figcaption className="mt-3 text-center text-sm leading-5 text-ink-50">{value.caption}</figcaption>}
        </figure>
      ),
      pullQuote: ({ value }: { value: PullQuoteValue }) => (
        <figure className="my-6 border-y border-ink-10 py-10 text-center">
          <span aria-hidden className="mx-auto mb-6 grid size-12 place-items-center rounded-full bg-yellow text-ink">
            <QuoteGlyph className="h-4" />
          </span>
          <blockquote className="mx-auto max-w-[34rem] text-balance font-display text-[1.75rem] font-bold leading-[1.2] tracking-[-0.02em] text-ink md:text-[2.25rem]">{value.text}</blockquote>
          {value.attribution && <figcaption className="eyebrow mt-6 text-ink-68 before:mr-2 before:text-accent before:content-['—']">{value.attribution}</figcaption>}
        </figure>
      ),
      callout: ({ value }: { value: CalloutValue }) => {
        const t = calloutTone[value.tone ?? "note"];
        return (
          <aside className={cn("flex gap-4 rounded-xl border p-5 text-base leading-7", t.box)}>
            <t.Icon aria-hidden className={cn("mt-0.5 size-5 shrink-0", t.icon)} />
            <div>
              <p className="eyebrow mb-1 text-ink">{t.label}</p>
              <p className="text-ink/85">{value.text}</p>
            </div>
          </aside>
        );
      },
      table: ({ value }: { value: TableValue }) => {
        const rows = (value.rows ?? []).filter((r) => r.cells?.length);
        if (!rows.length) return null;
        const [first, ...rest] = rows;
        const head = value.hasHeaderRow !== false ? first : null;
        const bodyRows = head ? rest : rows;
        return (
          <figure className="my-4">
            {value.caption && <figcaption className="eyebrow mb-3">{value.caption}</figcaption>}
            <div
              role="region"
              tabIndex={0}
              aria-label={value.caption ?? "Table"}
              className="overflow-x-auto rounded-xl border border-ink-10 border-t-[3px] border-t-accent bg-white shadow-md [-webkit-overflow-scrolling:touch]"
            >
              <table className="w-full min-w-[32rem] border-collapse text-left text-[0.9375rem] leading-6">
                {head && (
                  <thead>
                    <tr className="bg-panel-navy text-white">
                      {head.cells!.map((c, i) => (
                        <th key={i} scope="col" className="whitespace-nowrap px-5 py-3.5 font-display text-sm font-semibold tracking-[-0.005em]">
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                )}
                <tbody>
                  {bodyRows.map((r) => (
                    <tr key={r._key} className="border-t border-ink-05 transition-colors duration-200 first:border-t-0 even:bg-ink-02 hover:bg-accent-soft">
                      {r.cells!.map((c, i) =>
                        i === 0 ? (
                          <th key={i} scope="row" className="px-5 py-3.5 align-top font-semibold text-ink">
                            {c}
                          </th>
                        ) : (
                          <td key={i} className="px-5 py-3.5 align-top text-ink/85">
                            {c}
                          </td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </figure>
        );
      },
    },
  };
}

/** Renders CMS rich text with BoostCart typography. Body copy is near-black for contrast. */
export function PostBody({ value, headingIds }: Props) {
  return (
    <div className="flex flex-col gap-6 text-[1.0625rem] leading-[1.8] tracking-[-0.005em] text-ink/90 md:text-[1.1875rem]">
      <PortableText value={value} components={buildComponents(headingIds)} />
    </div>
  );
}
