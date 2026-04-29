import type { Metadata } from "next";
import { FooterSlim } from "@/components/layout/FooterSlim";
import { Header } from "@/components/layout/Header";
import { Colophon } from "./_sections/colophon";
import { Contributors } from "./_sections/contributors";
import { AboutCTA } from "./_sections/cta";
import { AboutHero } from "./_sections/hero";
import { Manifesto } from "./_sections/manifesto";
import { Stats } from "./_sections/stats";
import { Team } from "./_sections/team";

export const metadata: Metadata = {
  title: "About — AI Pro",
  description:
    "A small crew, writing slowly, about things that last. Three writers and a rotating cast of guest contributors.",
};

export default function AboutPage() {
  return (
    <>
      <Header variant="about" />
      <AboutHero />
      <section className="mx-auto max-w-[1240px] px-8">
        <Manifesto />
        <Stats />
      </section>
      <section className="mx-auto max-w-[1240px] px-8">
        <Team />
        <Contributors />
      </section>
      <section className="mx-auto max-w-[1240px] px-8">
        <Colophon />
        <AboutCTA />
      </section>
      <FooterSlim />
    </>
  );
}
