/**
 * Canonical series data. The blog index reads this to render the series arc
 * (published + upcoming episodes). Individual post pages keep their own
 * frontmatter `series` block for the right-rail SeriesCard.
 *
 * Titles can use `*...*` to mark italic accents (rendered via the `italicize`
 * helper on render).
 */

export type SeriesEpisode = {
  part: number;
  /** Short display title, e.g. "Self-attention" (not the full post title). */
  title: string;
  /** Set when this episode is published — links out to /blog/{slug}. */
  slug?: string;
  /** Optional one-line sub-caption. */
  summary?: string;
};

export type Series = {
  key: string;
  /** Display name — may include `*...*` for italic accent. */
  name: string;
  tagline: string;
  episodes: SeriesEpisode[];
};

export const SERIES: Series[] = [
  {
    key: "transformers-by-hand",
    name: "Transformers, *by hand.*",
    tagline:
      "Six essays, from the first dot product of self-attention to a working training loop — derived one step at a time, with code you can run.",
    episodes: [
      {
        part: 0,
        title: "Preface — why write transformers by hand?",
        summary: "A short argument for resisting the urge to just import it.",
      },
      {
        part: 1,
        title: "A slow walk through self-attention, done by hand.",
        slug: "self-attention-by-hand",
        summary:
          "Derive the attention operator from scratch, then implement it in 40 lines of numpy.",
      },
      {
        part: 2,
        title: "FlashAttention, explained IO-first.",
        summary: "Attention from the memory hierarchy up. Why tiles change everything.",
      },
      {
        part: 3,
        title: "Positional encodings, carefully.",
        summary: "Sinusoidal, learned, ALiBi, RoPE — each as a one-paragraph problem solved.",
      },
      {
        part: 4,
        title: "Layer-norm and the things like it.",
        summary: "RMSNorm, pre-norm vs post-norm, and where these decisions actually matter.",
      },
      {
        part: 5,
        title: "The training loop, all of it.",
        summary: "Optimizer, schedule, gradient clipping, and the small details that stabilise it.",
      },
    ],
  },
];

/**
 * Returns the series a post belongs to, if any.
 */
export function findSeriesForSlug(slug: string): {
  series: Series;
  episode: SeriesEpisode;
} | null {
  for (const series of SERIES) {
    const episode = series.episodes.find((e) => e.slug === slug);
    if (episode) return { series, episode };
  }
  return null;
}
