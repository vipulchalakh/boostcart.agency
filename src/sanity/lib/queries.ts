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

export const CASE_STUDIES_QUERY = defineQuery(`*[_type == "caseStudy" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  clientName,
  clientLogo ${IMAGE},
  platform,
  industry,
  headlineResult,
  headlineResultLabel,
  summary,
  coverImage ${IMAGE}
}`);

export const CASE_STUDY_SLUGS_QUERY = defineQuery(`*[_type == "caseStudy" && defined(slug.current)]{ "slug": slug.current }`);

export const CASE_STUDY_QUERY = defineQuery(`*[_type == "caseStudy" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  clientName,
  clientLogo ${IMAGE},
  platform,
  industry,
  headlineResult,
  headlineResultLabel,
  summary,
  coverImage ${IMAGE},
  services,
  duration,
  metrics[]{ _key, value, label, detail },
  challenge[]{ ..., _type == "image" => ${BODY_IMAGE} },
  approach[]{ ..., _type == "image" => ${BODY_IMAGE} },
  outcome[]{ ..., _type == "image" => ${BODY_IMAGE} },
  testimonial { quote, personName, personRole, personPhoto ${IMAGE} },
  publishedAt,
  "relatedCaseStudies": relatedCaseStudies[]->{
    _id, title, "slug": slug.current, clientName, platform, industry, headlineResult, summary, coverImage ${IMAGE}
  },
  seo { metaTitle, metaDescription, noIndex, shareImage ${IMAGE} }
}`);
