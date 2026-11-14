import Image from "next/image";
import manifest from "@/lib/mock-manifest.json";

/**
 * A recorded, looping animated WebP of one of the services tile visuals (see scripts/capture-mocks.mjs).
 * Files live in public/mocks/<page>/<n>.webp. Served as-is: animated images must skip the image optimizer.
 */
export function MockImage({ id, alt }: { id: string; alt: string }) {
  const size = (manifest as Record<string, { w: number; h: number }>)[id];
  if (!size) return null;
  return (
    <Image
      src={`/mocks/${id}.webp`}
      alt={alt}
      width={size.w}
      height={size.h}
      unoptimized
      loading="lazy"
      sizes="(min-width: 1024px) 33vw, 100vw"
      className="block h-auto w-full"
    />
  );
}
