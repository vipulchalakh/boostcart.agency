import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { imageUrl } from "@/components/blog-post/SanityImage";
import { extractHeadings } from "@/components/blog-post/headings";
import { BeforeAfterCard } from "@/components/case-study/BeforeAfterCard";
import { CaseStudyBody } from "@/components/case-study/CaseStudyBody";
import { RelatedCaseStudies, type CaseStudyCardData } from "@/components/case-study/CaseStudyCard";
import { CaseStudyCta } from "@/components/case-study/CaseStudyCta";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { ClientCard } from "@/components/case-study/ClientCard";
import { client, sanityFetch } from "@/sanity/lib/client";
import { CASE_STUDY_QUERY, CASE_STUDY_SLUGS_QUERY, RELATED_CASE_STUDIES_FALLBACK_QUERY } from "@/sanity/lib/queries";

const siteUrl = "https://boostcart.agency";
const RELATED_COUNT = 3;

/** Sidebar only sticks on screens tall enough to show all three cards at once. */
const STICKY = "[@media(min-width:1024px)_and_(min-height:860px)]:sticky [@media(min-width:1024px)_and_(min-height:860px)]:top-28";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const rows = await client.withConfig({ useCdn: false }).fetch(CASE_STUDY_SLUGS_QUERY);
  return rows.flatMap((r) => (r.slug ? [{ slug: r.slug }] : []));
}

const getCaseStudy = cache((slug: string) => sanityFetch({ query: CASE_STUDY_QUERY, params: { slug }, tags: ["caseStudy", `caseStudy:${slug}`] }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return {};

  const title = study.seo?.metaTitle || study.title || "Case study";
  const description = study.seo?.metaDescription || study.summary || undefined;
  const path = `/case-studies/${slug}`;
  const og = imageUrl(study.seo?.shareImage ?? study.coverImage, 1200, 630);

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: study.seo?.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "article",
      siteName: "BoostCart",
      url: `${siteUrl}${path}`,
      title: `${title} | BoostCart`,
      description,
      publishedTime: study.publishedAt ?? undefined,
      images: og ? [{ url: og, width: 1200, height: 630 }] : undefined,
    },
    twitter: { card: "summary_large_image", title: `${title} | BoostCart`, description, images: og ? [og] : undefined },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study || !study.title) notFound();

  const path = `/case-studies/${slug}`;
  const { ids } = extractHeadings(study.body);
  const clientName = study.clientName ?? study.title;

  /* Hand-picked related case studies first, then top up with similar ones (same industry, then platform). */
  const picked: CaseStudyCardData[] = (study.relatedCaseStudies ?? []).slice(0, RELATED_COUNT);
  const extra =
    picked.length < RELATED_COUNT
      ? await sanityFetch({
          query: RELATED_CASE_STUDIES_FALLBACK_QUERY,
          params: { caseStudyId: study._id, excludeIds: picked.map((s) => s._id), industry: study.industry ?? "", platform: study.platform ?? "", limit: RELATED_COUNT - picked.length },
          tags: ["caseStudy"],
        })
      : [];
  const related = [...picked, ...extra];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { name: "Home", item: siteUrl },
        { name: "Case studies", item: `${siteUrl}/case-studies` },
        { name: study.title, item: `${siteUrl}${path}` },
      ].map((c, i) => ({ "@type": "ListItem", position: i + 1, ...c })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: study.title,
      description: study.seo?.metaDescription || study.summary || undefined,
      image: imageUrl(study.coverImage, 1200, 630),
      datePublished: study.publishedAt ?? undefined,
      mainEntityOfPage: `${siteUrl}${path}`,
      author: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "BoostCart" },
      publisher: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "BoostCart", url: siteUrl },
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <CaseStudyHero
        title={study.title}
        clientName={clientName}
        platform={study.platform ?? ""}
        industry={study.industry ?? ""}
        organicRevenueGrowth={study.organicRevenueGrowth ?? 0}
        organicTrafficGrowth={study.organicTrafficGrowth ?? 0}
        timelineMonths={study.timelineMonths ?? 0}
        coverImage={study.coverImage}
      />

      <div className="container-x pb-20 md:pb-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-14 xl:gap-20">
          <article className="min-w-0 max-w-[760px]">{study.body && <CaseStudyBody value={study.body} headingIds={ids} />}</article>

          <aside aria-label="Case study details" className="min-w-0">
            <div className={`space-y-5 ${STICKY}`}>
              <BeforeAfterCard
                organicKeywords={study.beforeAfter?.organicKeywords ?? null}
                organicTraffic={study.beforeAfter?.organicTraffic ?? null}
                organicRevenue={study.beforeAfter?.organicRevenue ?? null}
                currency={study.beforeAfter?.revenueCurrency ?? null}
              />
              <ClientCard name={clientName} logo={study.clientLogo} description={study.clientDescription} industry={study.industry} website={study.clientWebsite} />
              <CaseStudyCta />
            </div>
          </aside>
        </div>

        <div className="mt-16 md:mt-20">
          <RelatedCaseStudies studies={related} />
        </div>
      </div>
    </>
  );
}
