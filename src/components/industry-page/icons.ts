import {
  Baby, Bed, Bike, Blocks, Cookie, Coffee, Droplets, Dumbbell, Footprints, Gem, Gift, Headphones, HeartPulse, Lamp, Laptop, Leaf,
  Mountain, Palette, Pill, ShieldCheck, Shirt, Smartphone, Sofa, Sparkles, Tent, Utensils, Watch, Wine, type LucideIcon,
} from "lucide-react";
import type { IconKey } from "@content/data";

export const icons: Record<IconKey, LucideIcon> = {
  shirt: Shirt, footprints: Footprints, watch: Watch, sparkles: Sparkles, droplets: Droplets, palette: Palette, "heart-pulse": HeartPulse, pill: Pill,
  dumbbell: Dumbbell, leaf: Leaf, sofa: Sofa, bed: Bed, lamp: Lamp, utensils: Utensils, smartphone: Smartphone, laptop: Laptop, headphones: Headphones,
  gem: Gem, gift: Gift, coffee: Coffee, wine: Wine, cookie: Cookie, mountain: Mountain, bike: Bike, tent: Tent, baby: Baby, blocks: Blocks, "shield-check": ShieldCheck,
};
