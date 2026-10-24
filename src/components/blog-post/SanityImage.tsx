import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/sanity/lib/image";

export type SanityImg = {
  asset: unknown;
  hotspot?: unknown;
  crop?: unknown;
  alt?: string | null;
  lqip?: string | null;
  dimensions?: { width: number | null; height: number | null } | null;
};

type Props = {
  image: SanityImg | null | undefined;
  /** Pixel width of the rendered file (the browser still picks via `sizes`). */
  width?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Fixed output ratio (width / height). Omit to keep the original ratio. */
  ratio?: number;
};

/** Sanity image with automatic format, blur placeholder and correct dimensions. */
export function SanityImage({ image, width = 1200, sizes, priority, className, ratio }: Props) {
  if (!image?.asset) return null;
  const natural = image.dimensions?.width && image.dimensions?.height ? image.dimensions.width / image.dimensions.height : 16 / 9;
  const r = ratio ?? natural;
  const height = Math.round(width / r);

  let builder = urlFor(image as SanityImageSource).width(width).auto("format").fit("crop");
  if (ratio) builder = builder.height(height);
  else builder = builder.fit("max");

  return (
    <Image
      src={builder.url()}
      alt={image.alt ?? ""}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={className}
      {...(image.lqip ? { placeholder: "blur" as const, blurDataURL: image.lqip } : {})}
    />
  );
}

/** Same crop as SanityImage but returns the bare URL (for Open Graph, JSON-LD). */
export function imageUrl(image: SanityImg | null | undefined, width: number, height: number) {
  if (!image?.asset) return undefined;
  return urlFor(image as SanityImageSource).width(width).height(height).fit("crop").auto("format").url();
}
