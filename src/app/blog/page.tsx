import type { Metadata } from "next";
import Link from "next/link";
import { FooterSlim } from "@/components/layout/FooterSlim";
import { Header } from "@/components/layout/Header";
import { SERIES } from "@/content/series";
import { listPosts, tagCounts } from "@/lib/blog";
import { EssayRow } from "./_components/EssayRow";
import { SeriesBlock } from "./_components/SeriesBlock";

export const metadata: Metadata = {
  title: "Essays — AI Pro",
  description:
    "Long-form essays, tutorials and teardowns on modern AI — in series and standalone.",
};

export default async function BlogIndexPage() {
  const posts = await listPosts();
  const tags = tagCounts(posts);
  const seriesPublishedCount = SERIES.reduce(
    (n, s) => n + s.episodes.filter((e) => e.slug).length,
    0,
  );

  return (
    <>
      <Header variant="blog" />

      <main className="wrap pt-[60px] pb-20">
        {/* ============ Header ============ */}
        <header className="mb-24 max-w-[720px]">
          <div className="font-mono mb-6 inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.14em] text-ink-3">
            <span aria-hidden className="h-[5px] w-[5px] rounded-full bg-accent" />
            <span>The archive</span>
          </div>
          <h1
            className="font-serif m-0 mb-6 text-[clamp(48px,7vw,88px)] font-light leading-[0.98] tracking-[-0.03em] text-balance"
            style={{ fontVariationSettings: '"opsz" 60' }}
          >
            All <span className="italic font-normal">essays.</span>
          </h1>
          <p
            className="font-serif m-0 max-w-[580px] text-[clamp(17px,1.8vw,21px)] font-light italic leading-[1.5] text-ink-2 text-pretty"
            style={{ fontVariationSettings: '"opsz" 60' }}
          >
            Long-form writing on the math, the code, and the systems underneath modern AI.
            In series and standalone. Updated when something is actually worth saying.
          </p>
        </header>

        {/* ============ Series ============ */}
        {SERIES.length > 0 && (
          <section className="mb-24">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-hair pb-5">
              <h2
                className="font-serif m-0 text-[clamp(28px,3.2vw,40px)] font-light leading-none tracking-[-0.02em]"
                style={{ fontVariationSettings: '"opsz" 60' }}
              >
                In <span className="italic">series.</span>
              </h2>
              <span className="font-mono pb-0.5 text-[11px] uppercase tracking-[0.14em] text-ink-3">
                {SERIES.length} active ·{" "}
                {seriesPublishedCount} of{" "}
                {SERIES.reduce((n, s) => n + s.episodes.length, 0)} published
              </span>
            </div>

            <div className="flex flex-col gap-6">
              {SERIES.map((s) => (
                <SeriesBlock key={s.key} series={s} />
              ))}
            </div>
          </section>
        )}

        {/* ============ All essays ============ */}
        <section className="mb-20">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-hair pb-5">
            <h2
              className="font-serif m-0 text-[clamp(28px,3.2vw,40px)] font-light leading-none tracking-[-0.02em]"
              style={{ fontVariationSettings: '"opsz" 60' }}
            >
              All <span className="italic">writing.</span>
            </h2>
            <span className="font-mono pb-0.5 text-[11px] uppercase tracking-[0.14em] text-ink-3">
              {posts.length} {posts.length === 1 ? "essay" : "essays"}
            </span>
          </div>

          <div>
            {posts.map((p) => (
              <EssayRow key={p.slug} post={p} />
            ))}
          </div>
        </section>

        {/* ============ Topics ============ */}
        {tags.length > 0 && (
          <section>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-hair pb-5">
              <h2
                className="font-serif m-0 text-[clamp(28px,3.2vw,40px)] font-light leading-none tracking-[-0.02em]"
                style={{ fontVariationSettings: '"opsz" 60' }}
              >
                By <span className="italic">topic.</span>
              </h2>
              <span className="font-mono pb-0.5 text-[11px] uppercase tracking-[0.14em] text-ink-3">
                {tags.length} topics
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {tags.map(({ tag, count }) => (
                <Link
                  key={tag}
                  href="#"
                  className="font-mono group inline-flex items-baseline gap-2 rounded-full bg-card px-4 py-2 text-[11px] uppercase tracking-[0.12em] text-ink-2 transition-colors hover:bg-bg-2 hover:text-ink"
                >
                  <span>{tag}</span>
                  <span className="text-[10px] text-ink-3 group-hover:text-ink-2">{count}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <FooterSlim />
    </>
  );
}
