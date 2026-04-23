import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FooterSlim } from "@/components/layout/FooterSlim";
import { Header } from "@/components/layout/Header";
import { listSlugs } from "@/lib/blog";
import { NextUp } from "./_components/NextUp";
import { ReadingProgress } from "./_components/ReadingProgress";
import { SeriesCard } from "./_components/SeriesCard";
import { ShareRow } from "./_components/ShareRow";
import { TableOfContents, type TocItem } from "./_components/TableOfContents";

type Params = { slug: string };

type PostFrontmatter = {
  title?: string;
  subtitle?: string;
  kicker?: string;
  tags?: string[];
  primaryTag?: string;
  author?: string;
  date?: string;
  readTime?: string;
  heroCaption?: string;
  heroDrop?: string;
  series?: {
    name: string;
    part: number;
    total: number;
    episodes: { label: string; state: "past" | "current" | "upcoming" }[];
  };
  toc?: TocItem[];
  nextUp?: {
    direction: "prev" | "next";
    label: string;
    title: string;
    summary: string;
    href: string;
  }[];
};

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await listSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

async function loadPost(slug: string) {
  try {
    return await import(`@/content/blog/${slug}.mdx`);
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadPost(slug);
  const fm = post?.frontmatter as PostFrontmatter | undefined;
  if (!fm) return {};
  return {
    title: `${fm.title} — AI Pro`,
    description: fm.subtitle,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) notFound();

  const MDXContent = post.default;
  const fm = (post.frontmatter ?? {}) as PostFrontmatter;

  const formattedDate = fm.date
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(fm.date))
    : "";

  return (
    <>
      <ReadingProgress />
      <Header variant="blog" />

      <div className="mx-auto grid max-w-[1240px] grid-cols-[1fr_220px] gap-16 px-8 pt-[60px] max-[960px]:grid-cols-1">
        <article>
          <Link
            href="/blog"
            className="font-mono mb-10 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-ink-3 hover:text-ink before:content-['←']"
          >
            Back to essays
          </Link>

          <header className="max-w-[760px]">
            {fm.kicker && (
              <div className="font-mono mb-[22px] inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.14em] text-ink-3">
                <span aria-hidden className="h-[5px] w-[5px] rounded-full bg-accent" />
                <span>{fm.kicker}</span>
              </div>
            )}

            <h1
              className="font-serif m-0 mb-[22px] text-[clamp(40px,6vw,72px)] font-light leading-[1.02] tracking-[-0.03em] text-balance"
              style={{ fontVariationSettings: '"opsz" 60' }}
              dangerouslySetInnerHTML={{ __html: renderTitle(fm.title ?? slug) }}
            />

            {fm.subtitle && (
              <p
                className="font-serif m-0 mb-[26px] max-w-[620px] text-[clamp(18px,2.2vw,24px)] font-light italic leading-[1.45] text-ink-2 text-pretty"
                style={{ fontVariationSettings: '"opsz" 60' }}
              >
                {fm.subtitle}
              </p>
            )}

            {fm.tags && fm.tags.length > 0 && (
              <div className="mb-[34px] flex flex-wrap gap-2">
                {fm.tags.map((tag) => {
                  const primary = tag === fm.primaryTag;
                  return (
                    <a
                      key={tag}
                      href="#"
                      className={`font-mono rounded-full px-[11px] py-1.5 text-[10.5px] uppercase tracking-[0.12em] transition-colors ${
                        primary
                          ? "bg-accent text-accent-ink"
                          : "bg-card text-ink-2 hover:bg-bg-2 hover:text-ink"
                      }`}
                    >
                      {tag}
                    </a>
                  );
                })}
              </div>
            )}

            <div className="font-mono mb-9 flex items-center gap-4 text-[11px] uppercase tracking-[0.1em] text-ink-3">
              <span
                aria-hidden
                className="h-7 w-7 shrink-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,#fff,#c9ccd4_40%,#6c7280_70%,#20222a)]"
              />
              {fm.author && (
                <span className="font-sans text-[13px] normal-case tracking-normal text-ink">
                  {fm.author}
                </span>
              )}
              {formattedDate && (
                <>
                  <span className="opacity-50">·</span>
                  <span>{formattedDate}</span>
                </>
              )}
              {fm.readTime && (
                <>
                  <span className="opacity-50">·</span>
                  <span>{fm.readTime}</span>
                </>
              )}
            </div>
          </header>

          {fm.heroCaption && (
            <div className="chrome relative mb-[60px] overflow-hidden rounded-2xl aspect-[16/9]">
              <div
                aria-hidden
                className="absolute inset-0 grid place-items-center bg-[repeating-linear-gradient(135deg,var(--bg-2)_0_10px,var(--bg-3)_10px_20px)]"
              />
              {fm.heroDrop && (
                <span className="font-mono absolute right-5 top-4 rounded-full bg-card px-2.5 py-1.5 text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
                  {fm.heroDrop}
                </span>
              )}
              <span className="font-mono absolute bottom-[18px] left-5 text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
                {fm.heroCaption}
              </span>
            </div>
          )}

          <div className="post-body">
            <MDXContent />
          </div>

          <div className="mt-[72px] max-w-[680px] border-t border-hair pt-8">
            <ShareRow />
            {fm.nextUp && fm.nextUp.length > 0 && (
              <>
                <div className="font-mono mt-10 mb-[18px] inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.14em] text-ink-3">
                  <span aria-hidden className="h-[5px] w-[5px] rounded-full bg-accent" />
                  Continue reading
                </div>
                <NextUp items={fm.nextUp} />
              </>
            )}
          </div>
        </article>

        <aside className="sticky top-[90px] self-start pt-20">
          {fm.toc && fm.toc.length > 0 && <TableOfContents items={fm.toc} />}
          {fm.series && (
            <SeriesCard
              parts={`${String(fm.series.total).padStart(2, "0")} PARTS`}
              title={fm.series.name}
              episodes={fm.series.episodes}
            />
          )}
        </aside>
      </div>

      <FooterSlim />
    </>
  );
}

function renderTitle(title: string): string {
  const escaped = title
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped.replace(/\*(.+?)\*/g, '<span class="italic font-normal">$1</span>');
}
