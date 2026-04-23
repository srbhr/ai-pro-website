import { Source_Serif_4, Geist, Geist_Mono } from "next/font/google";

/**
 * Source Serif 4 — variable (opsz 8-60, wght 200-900) + italic.
 * Replaces Fraunces (on the impeccable reflex-reject list). Chosen for its
 * rigorous, long-form editorial character — matches "slow · rigorous · unimpressed".
 */
export const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

export const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  weight: ["400", "500"],
});
