import { Header } from "@/components/layout/Header";
import { FooterFat } from "@/components/layout/FooterFat";
import { BigCTA } from "./_sections/big-cta";
import { BlogGrid } from "./_sections/blog-grid";
import { Hero } from "./_sections/hero";
import { SeriesStrip } from "./_sections/series-strip";

export default function Home() {
  return (
    <>
      <Header variant="landing" />
      <Hero />
      <BlogGrid />
      <SeriesStrip />
      <BigCTA />
      <FooterFat />
    </>
  );
}
