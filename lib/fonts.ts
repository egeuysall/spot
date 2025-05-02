import { DM_Sans, DM_Mono } from "next/font/google";
import { Merriweather } from "next/font/google";

// Merriweather font (for body)
export const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-merriweather",
});

// DM Sans font (for UI text)
export const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

// DM Mono font (for code blocks)
export const dmMono = DM_Mono({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
});
