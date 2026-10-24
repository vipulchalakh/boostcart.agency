import Image from "next/image";

/** Brand marks live in /public/logos. The CMS stores the platform name; names without a logo (Headless, Other) fall back to text. */
/** `scale` evens out the visual weight: the wide WooCommerce wordmark is shrunk next to the square icon marks. */
const logos: Record<string, { src: string; width: number; height: number; scale?: number } | undefined> = {
  shopify: { src: "/logos/shopify.svg", width: 22, height: 24 },
  woocommerce: { src: "/logos/woocommerce.png", width: 554, height: 144, scale: 0.6 },
  bigcommerce: { src: "/logos/bigcommerce.svg", width: 24, height: 24 },
  magento: { src: "/logos/magento.svg", width: 24, height: 24 },
};

export function PlatformLogo({ platform, size = 16 }: { platform: string; /** Height in px of the square icon marks. */ size?: number }) {
  const logo = logos[platform.trim().toLowerCase()];
  if (!logo) return <span className="eyebrow text-[inherit]">{platform}</span>;
  return <Image src={logo.src} alt={platform} width={logo.width} height={logo.height} unoptimized style={{ height: Math.round(size * (logo.scale ?? 1)) }} className="w-auto object-contain" />;
}
