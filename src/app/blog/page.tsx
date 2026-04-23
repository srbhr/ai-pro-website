import type { Metadata } from "next";
import { FooterSlim } from "@/components/layout/FooterSlim";
import { Header } from "@/components/layout/Header";
import { listPosts } from "@/lib/blog";
import { PostCard } from "./_components/PostCard";

export const metadata: Metadata = {
  title: "Essays — AI Pro",
  description: "Long-form essays, tutorials and teardowns on modern AI.",
};

export default async function BlogIndexPage() {
  const posts = await listPosts();
  return (
    <>
      <Header variant="blog" />
      <main className="wrap pt-[60px] pb-20">
        <header className="mb-12 flex flex-wrap items-end justify-between gap-8">
          <h1
            className="font-serif m-0 max-w-[680px] text-[clamp(34px,4.5vw,56px)] font-light leading-none tracking-[-0.025em]"
            style={{ fontVariationSettings: '"opsz" 60' }}
          >
            Essays, picked for the <span className="italic font-normal">curious engineer.</span>
          </h1>
          <div className="font-mono whitespace-nowrap pb-2.5 text-[11.5px] uppercase tracking-[0.14em] text-ink-3">
            {posts.length} {posts.length === 1 ? "essay" : "essays"} · updated weekly
          </div>
        </header>
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
      <FooterSlim />
    </>
  );
}
