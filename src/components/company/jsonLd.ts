export const siteUrl = "https://boostcart.agency";

export const breadcrumbLd = (name: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { name: "Home", item: siteUrl },
    { name, item: `${siteUrl}${path}` },
  ].map((c, i) => ({ "@type": "ListItem", position: i + 1, ...c })),
});

export const pageMeta = (path: string, title: string, description: string) => ({
  title,
  description,
  alternates: { canonical: path },
  openGraph: { type: "website" as const, siteName: "BoostCart", url: `${siteUrl}${path}`, title: `${title} | BoostCart`, description },
  twitter: { card: "summary_large_image" as const, title: `${title} | BoostCart`, description },
});
