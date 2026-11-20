import { createClient, type QueryParams } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

/** Read-only client. The dataset is public, so published content needs no token. */
export const client = createClient({ projectId, dataset, apiVersion, useCdn: true });

/** Refresh cached Sanity data at least this often (seconds), even if the publish webhook never fires. */
const REVALIDATE_SECONDS = 3600;

/** Fetch with cache tags so the webhook in /api/revalidate can refresh pages when content changes. */
export async function sanityFetch<const Query extends string>({
  query,
  params = {},
  tags,
}: {
  query: Query;
  params?: QueryParams;
  tags: string[];
}) {
  return client.fetch(query, params, { next: { tags, revalidate: REVALIDATE_SECONDS } });
}
