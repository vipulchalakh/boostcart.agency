import { Bricolage_Grotesque, Caveat_Brush, Inter, JetBrains_Mono, Newsreader } from "next/font/google";

/* Fonts are swapped here only. Free fallbacks for Kaio (display) and "Family" (serif) until licensed. */
export const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

export const sans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const serif = Newsreader({
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal"],
  variable: "--font-newsreader",
  display: "swap",
  preload: false,
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});

export const hand = Caveat_Brush({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-caveat",
  display: "swap",
  preload: false,
});

export const fontVariables = [display, sans, serif, mono, hand].map((f) => f.variable).join(" ");
