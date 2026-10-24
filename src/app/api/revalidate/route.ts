import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = { tags?: string[] };

/** Called by a Sanity webhook whenever a post, case study, author or category is published. */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return new Response("Missing SANITY_REVALIDATE_SECRET", { status: 500 });

  const { isValidSignature, body } = await parseBody<WebhookPayload>(req, secret, true);
  if (!isValidSignature) return new Response("Invalid signature", { status: 401 });
  if (!Array.isArray(body?.tags) || !body.tags.length) return new Response("Missing tags", { status: 400 });

  for (const tag of body.tags) revalidateTag(tag, "max");
  return NextResponse.json({ revalidated: body.tags });
}
