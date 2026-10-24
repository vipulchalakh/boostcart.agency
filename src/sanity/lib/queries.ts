import { defineQuery } from "next-sanity";

const IMAGE = `{ asset, hotspot, crop, "alt": coalesce(alt, ""), "lqip": asset->metadata.lqip, "dimensions": asset->metadata.dimensions{ width, height } }`;
/** Images placed inside rich text also carry their block key, type and caption. */
const BODY_IMAGE = `{ _key, _type, asset, hotspot, crop, "alt": coalesce(alt, ""), caption, "lqip": asset->metadata.lqip, "dimensions": asset->metadata.dimensions{ width, height } }`;

/* ---------- Blog ---------- */

export const POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  readTime,
  coverImage ${IMAGE},
  "category": category->{ title, "slug": slug.current },
  "author": author->{ name, "slug": slug.current, role, photo ${IMAGE} }
}`);

export const POST_SLUGS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`);

/** Tops up the related list with the newest posts, same category first. */
export const RELATED_POSTS_FALLBACK_QUERY = defineQuery(`*[_type == "post" && defined(slug.current) && _id != $postId && !(_id in $excludeIds)]
  | order(select(category._ref == $categoryId => 0, 1), publishedAt desc)[0...$limit] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  readTime,
  publishedAt,
  "category": category->{ title }
}`);

export const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  updatedAt,
  readTime,
  coverImage ${IMAGE},
  body[]{ ..., _type == "image" => ${BODY_IMAGE} },
  faqs[]{ _key, question, answer },
  "category": category->{ _id, title, "slug": slug.current },
  "author": author->{ name, "slug": slug.current, role, bio, linkedinUrl, photo ${IMAGE} },
  "relatedPosts": relatedPosts[defined(@->slug.current)]->{
    _id, title, "slug": slug.current, excerpt, readTime, publishedAt,
    "category": category->{ title }
  },
  seo { metaTitle, metaDescription, noIndex, shareImage ${IMAGE} }
}`);

/* ---------- Case studies ---------- */

const CASE_STUDY_CARD = `{
  _id,
  title,
  "slug": slug.current,
  clientName,
  platform,
  industry,
  summary,
  organicRevenueGrowth,
  organicTrafficGrowth,
  timelineMonths,
  coverImage ${IMAGE}
}`;

export const CASE_STUDIES_QUERY = defineQuery(`*[_type == "caseStudy" && defined(slug.current)] | order(publishedAt desc) ${CASE_STUDY_CARD}`);

export const CASE_STUDY_SLUGS_QUERY = defineQuery(`*[_type == "caseStudy" && defined(slug.current)]{ "slug": slug.current }`);

/** Tops up the related list: same industry first, then same platform, then newest. */
export const RELATED_CASE_STUDIES_FALLBACK_QUERY = defineQuery(`*[_type == "caseStudy" && defined(slug.current) && _id != $caseStudyId && !(_id in $excludeIds)]
  | order(select(industry == $industry => 0, platform == $platform => 1, 2), publishedAt desc)[0...$limit] ${CASE_STUDY_CARD}`);

export const CASE_STUDY_QUERY = defineQuery(`*[_type == "caseStudy" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  platform,
  industry,
  summary,
  publishedAt,
  organicRevenueGrowth,
  organicTrafficGrowth,
  timelineMonths,
  coverImage ${IMAGE},
  beforeAfter {
    revenueCurrency,
    organicKeywords { before, after },
    organicTraffic { before, after },
    organicRevenue { before, after }
  },
  clientName,
  clientLogo ${IMAGE},
  clientDescription,
  clientWebsite,
  body[]{ ..., _type == "image" => ${BODY_IMAGE} },
  "relatedCaseStudies": relatedCaseStudies[defined(@->slug.current)]->${CASE_STUDY_CARD},
  seo { metaTitle, metaDescription, noIndex, shareImage ${IMAGE} }
}`);
