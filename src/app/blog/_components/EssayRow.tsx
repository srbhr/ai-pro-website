import Link from "next/link";
import type { PostMeta } from "@/lib/blog";

/** Renders *italic* segments in a string as inline styled spans. */
function Italicize({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("*") && p.endsWith("*") ? (
          <span key={i} className="italic font-normal">
            {p.slice(1, -1)}
          </span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

export function EssayRow({ post }: { post: PostMeta }) {
  const date = post.date
    ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" })
        .format(new Date(post.date))
        .toUpperCase()
    : "";
  const year = post.date ? new Date(post.date).getFullYear() : "";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid grid-cols-[80px_1fr_auto] items-baseline gap-8 border-t border-hair py-6 transition-colors hover:bg-bg-2 max-[640px]:grid-cols-1 max-[640px]:gap-2"
    >
      <div className="font-mono flex flex-col text-[11px] uppercase tracking-[0.14em] text-ink-3">
        <span>{date}</span>
        <span className="opacity-60">{year}</span>
      </div>

      <div>
        <h3
          className="font-serif m-0 text-[22px] font-normal leading-[1.2] tracking-[-0.015em] text-ink group-hover:underline decoration-hair underline-offset-[6px]"
          style={{ fontVariationSettings: '"opsz" 60' }}
        >
          <Italicize text={post.title} />
        </h3>
        {post.description && (
          <p className="m-0 mt-2 max-w-[620px] text-[14.5px] leading-[1.55] text-ink-2 text-pretty">
            {post.description}
          </p>
        )}
        <div className="font-mono mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
          {post.kicker && <span>{post.kicker}</span>}
          {post.readTime && (
            <>
              <span aria-hidden className="opacity-40">
                ·
              </span>
              <span>{post.readTime.replace(" read", "")}</span>
            </>
          )}
          {post.author && (
            <>
              <span aria-hidden className="opacity-40">
                ·
              </span>
              <span>{post.author}</span>
            </>
          )}
        </div>
      </div>

      <span
        aria-hidden
        className="font-mono justify-self-end text-[11px] uppercase tracking-[0.12em] text-ink-3 transition-colors group-hover:text-ink max-[640px]:hidden"
      >
        Read →
      </span>
    </Link>
  );
}
