import Link from "next/link";
import type { Series } from "@/content/series";

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

export function SeriesBlock({ series }: { series: Series }) {
  const publishedCount = series.episodes.filter((e) => e.slug).length;
  const total = series.episodes.length;
  const totalPad = String(total).padStart(2, "0");

  return (
    <article className="chrome overflow-hidden rounded-2xl p-8 max-[640px]:p-6">
      <header className="relative z-[2] mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-hair pb-6">
        <div>
          <div className="font-mono mb-3 inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.14em] text-ink-3">
            <span aria-hidden className="h-[5px] w-[5px] rounded-full bg-accent" />
            Series · {String(publishedCount).padStart(2, "0")} / {totalPad} published
          </div>
          <h3
            className="font-serif m-0 text-[32px] font-light leading-[1.1] tracking-[-0.02em]"
            style={{ fontVariationSettings: '"opsz" 60' }}
          >
            <Italicize text={series.name} />
          </h3>
        </div>
        <p className="max-w-[520px] text-[14px] leading-[1.55] text-ink-2 text-pretty">
          {series.tagline}
        </p>
      </header>

      <ol className="relative z-[2] m-0 list-none p-0">
        {series.episodes.map((ep) => {
          const published = Boolean(ep.slug);
          const part = String(ep.part).padStart(2, "0");

          const inner = (
            <div className="grid grid-cols-[auto_1fr_auto] items-baseline gap-5 py-3.5">
              <span className="font-mono text-[11px] tracking-[0.1em] text-ink-3">{part}</span>
              <div>
                <div
                  className={`font-serif text-[17px] font-normal leading-[1.35] ${
                    published ? "text-ink" : "text-ink-3"
                  }`}
                >
                  {ep.title}
                </div>
                {ep.summary && (
                  <div className="mt-1 text-[13px] leading-[1.5] text-ink-2">{ep.summary}</div>
                )}
              </div>
              <span
                aria-hidden
                className={`font-mono text-[11px] uppercase tracking-[0.12em] ${
                  published ? "text-accent-ink" : "text-ink-3"
                }`}
              >
                {published ? (
                  <span className="rounded bg-accent px-2 py-1 text-accent-ink">Read</span>
                ) : (
                  <span>Upcoming</span>
                )}
              </span>
            </div>
          );

          return (
            <li key={ep.part} className="border-t border-hair first:border-t-0">
              {published ? (
                <Link
                  href={`/blog/${ep.slug}`}
                  className="group block -mx-2 px-2 transition-colors hover:bg-bg-2"
                >
                  {inner}
                </Link>
              ) : (
                <div className="block -mx-2 px-2">{inner}</div>
              )}
            </li>
          );
        })}
      </ol>
    </article>
  );
}
