import Link from "next/link";
import type { ReactNode } from "react";

export type BlogCardProps = {
  href: string;
  tag: string;
  title: ReactNode;
  summary: ReactNode;
  meta: string;
  readLabel?: string;
  cover: ReactNode;
  feature?: boolean;
  seriesBadge?: string;
};

export function BlogCard({
  href,
  tag,
  title,
  summary,
  meta,
  readLabel = "Read",
  cover,
  feature,
  seriesBadge,
}: BlogCardProps) {
  return (
    <Link
      href={href}
      className={`chrome group relative flex cursor-pointer flex-col rounded-2xl p-[22px] transition-transform duration-[250ms] hover:-translate-y-[3px] ${
        feature ? "row-span-2 min-h-[700px]" : "min-h-[340px]"
      }`}
    >
      <div
        className={`relative z-[2] mb-[18px] overflow-hidden rounded-lg border border-hair bg-bg-2 ${
          feature ? "h-[400px]" : "h-[180px]"
        }`}
      >
        {cover}
      </div>

      <div className="font-mono relative z-[2] mb-2.5 inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
        <span aria-hidden className="h-[5px] w-[5px] rounded-full bg-accent" />
        {tag}
        {seriesBadge && <span className="font-mono ml-1.5">· {seriesBadge}</span>}
      </div>

      <h3
        className={`font-serif relative z-[2] m-0 mb-2.5 font-normal tracking-[-0.015em] text-balance ${
          feature ? "text-[38px] leading-[1.05]" : "text-[22px] leading-[1.15]"
        }`}
      >
        {title}
      </h3>

      <p
        className={`relative z-[2] m-0 leading-[1.55] text-ink-2 text-pretty ${
          feature ? "text-[15px] max-w-[520px]" : "text-[13.5px]"
        }`}
      >
        {summary}
      </p>

      <div className="font-mono relative z-[2] mt-auto flex items-center justify-between pt-5 text-[11px] uppercase tracking-[0.1em] text-ink-3">
        <span>{meta}</span>
        <span className="inline-flex items-center gap-1.5 text-ink">
          {readLabel}
          <span
            aria-hidden
            className="inline-block transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
