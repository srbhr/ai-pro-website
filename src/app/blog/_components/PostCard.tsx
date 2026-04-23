import Link from "next/link";
import type { PostMeta } from "@/lib/blog";

export function PostCard({ post }: { post: PostMeta }) {
  const formatted = post.date
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(post.date))
    : "";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="chrome group block rounded-2xl p-6 transition-colors"
    >
      <div className="font-mono relative z-[2] mb-2 flex items-center gap-2 text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
        <time dateTime={post.date}>{formatted}</time>
        {post.tags.length > 0 && <span aria-hidden>·</span>}
        <div className="flex gap-1">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-bg-2 px-2 py-0.5">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <h2
        className="font-serif relative z-[2] m-0 mb-2 text-[24px] font-normal leading-[1.15] tracking-[-0.015em] group-hover:underline"
        style={{ fontVariationSettings: '"opsz" 60' }}
      >
        {post.title}
      </h2>
      <p className="relative z-[2] m-0 text-[14px] leading-[1.55] text-ink-2">
        {post.description}
      </p>
    </Link>
  );
}
