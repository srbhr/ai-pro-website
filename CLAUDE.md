# CLAUDE.md — AI Pro

This file is loaded automatically by Claude Code and gives future sessions
the context they need to work on this project without re-deriving it.

## Project

Next.js 15 + React 19 + TypeScript + Tailwind CSS v4 port of Claudia's HTML/CSS
designs (kept in `design-references/`) for the AI Pro publication. MDX-driven
blog with scroll-spy TOC, reading progress, and an editorial type system.

- **Designs (source of truth)**: `design-references/*.html`
- **Extracted design notes**: `design-references/NOTES.md`
- **Runtime design principles**: `.impeccable.md` (read this before any UI work)

## Design Context

### Users

AI Pro serves a **mix of three overlapping readers**, and design must not
compromise any of them:

1. Senior ML / infra engineers shipping AI to production — skim-resistant,
   code-respecting, allergic to hype.
2. Curious software generalists who want depth without being practitioners yet.
3. Researchers / academics who expect rigour, citations, and math.

Job to be done: **read a long-form piece end-to-end and come out wiser**.

### Brand personality

**Slow · rigorous · unimpressed.** No exceptions. Concrete implications:

- Long-form reading is the product. Skim-encouragement is off-brand.
- Details must be correct — OKLCH colour, opsz axes, working code, cited claims.
- No hype. No emoji. No "AI-powered" copy. No sparkles or glowing orbs.

Emotional goal: **the reader finishes an essay feeling the writer respected
their time.**

### Aesthetic direction

Editorial-technical. Closer to a printed technical manual or NYRB essay than a
SaaS landing page. Dark theme is the default (engineers reading at night on
large monitors and phones).

**Anti-references — flag and fix any drift toward these:**

- Generic SaaS landing (Vercel/Linear: cards, pricing, testimonials, FAQ stacks)
- Tech-blog template (Medium/Dev.to: sidebars, clap buttons, "related posts")
- AI-blog template (purple-blue gradients, neon accents, sparkles, "AI-powered")
- Newsletter-popup / Substack (email-capture modals, subscribe walls)

### Design principles (override stylistic preference in disagreement)

1. **Copy before ornament.** If decoration doesn't serve reading, cut it.
2. **Typography is the voice.** Display + body + mono pairing is the strongest
   identity signal. Italic accents inside headlines are the signature move.
3. **The accent is rare.** 60/30/10 on visual weight — chartreuse should feel
   earned when it appears, not sprayed across the page.
4. **Reading is the feature.** Nav/rail/footer never compete with body copy.
5. **Reject reflex moves.** No gradient text, no side-stripe borders, no glass
   cards, no hero metric layouts, no generic card grids.

### Open design decisions

- **Serif family swap.** Fraunces (Claudia's pick) is on the impeccable
  skill's reflex-reject list. Swapping to a less common variable serif —
  shortlist: Source Serif 4, Besley, Tiempos, Signifier.
- **Accent hue.** Chartreuse `#D6FF3D` may be too loud for "slow/rigorous."
  Potentially re-evaluate post-swap.
- **Shader system.** Placeholder only; a different shader solution will be
  plugged in later. Positioning contract (`.shader` class + data attrs) is
  preserved.

## Tech notes

- **Theme switching**: `next-themes` with `attribute="data-theme"`,
  `defaultTheme="dark"`, `storageKey="aipro-theme"`.
- **Tailwind tokens**: OKLCH colours wired into `@theme` as
  `bg-bg`, `text-ink`, `text-ink-2`, `text-ink-3`, `border-hair`, `bg-accent`,
  `text-accent-ink`, `bg-bg-2`, `bg-bg-3`, `bg-card`. Prefer these over
  inline `style={{ color: "var(--ink-2)" }}`.
- **Inline `style={}` allowed for**: `fontVariationSettings` (opsz/SOFT axes
  have no Tailwind utility) and the `Shader` component's style pass-through.
  Everything else should be a utility or a component class.
- **Component classes (`@layer components`) are reserved for** bespoke patterns
  that can't be utilities: pseudo-elements with specific content, `@keyframes`,
  `mask-composite`, raw MDX-emitted DOM. See `globals.css` for the current
  list — `.chrome`, `.grain`, `.shader`, `.pulse-dot`, `.btn`/variants,
  `.logo-mark`, `.nav-link`, `.marquee-item`, `.post-body`.
- **MDX**: `@next/mdx` + `remark-frontmatter` + `remark-mdx-frontmatter`.
  Posts live in `src/content/blog/*.mdx`. Heading IDs auto-generated via
  `github-slugger` in `src/components/mdx/headings.tsx`.

## Doing design work

Before any UI work:

1. Read `.impeccable.md` (canonical Design Context).
2. Cross-reference the source at `design-references/` — those HTML files are
   the visual source of truth for anything Claudia already designed.
3. For anything *not* in her designs (blog index, 404, empty states), apply
   the Design Principles above and keep it consistent with existing sections.
