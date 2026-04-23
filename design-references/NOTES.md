# Design Notes — Claudia's AI Pro design system

Extracted from `AI Pro.html`, `About.html`, `Blog Post.html`. When in doubt,
those files are the source of truth. This doc exists so Next.js + Tailwind work
can reference specific numbers without re-parsing 2,900 lines of HTML.

> **Audit note.** An earlier draft of this file had errors (notably: called
> `.topics` a marquee, underspecified `.chart`, skipped edit-mode protocol,
> glossed cover-art generators). This version is a full rewrite against the
> source.

---

## 1. Source files

| File            | Route target    | Purpose                             |
| --------------- | --------------- | ----------------------------------- |
| `AI Pro.html`   | `/`             | Landing: nav, hero, 5-card blog showcase, series strip, big CTA, fat footer |
| `About.html`    | `/about`        | Manifesto, stats, team, contributors, colophon, CTA, slim footer |
| `Blog Post.html`| `/blog/[slug]`  | Article layout with reading progress, TOC rail, series card, next-up |

There is **no designed `/blog` index**. Compose it from the card vocabulary on
the landing page.

The landing page's "About" link points to `#about` (an in-page anchor on the
footer). The About page is a separate route, reached via the logo/other nav.
When porting, route the top-nav "About" to `/about` and keep `#about` as a
backup hash if needed.

---

## 2. Design system

### 2.1 Fonts

Three Google Fonts, all loaded via one `<link>`:

```
Fraunces  — ital, opsz 9..144, wght 300/400/500/600 + italics
Geist     — wght 300/400/500/600
Geist Mono — wght 400/500
```

**Usage:**

- **Fraunces** — display serif. All H1/H2, card H3, article title/subtitle,
  stat numbers, blockquote, series card title, drop cap. The signature move is
  weight 300 upright with inline `<span class="i">` switching to weight 400
  italic for accented words. Large display uses
  `font-variation-settings: "opsz" 144` (body serif drops to `"opsz" 60`).
- **Geist** — all body copy, UI chrome, button labels, author name in byline.
  Loaded with `font-feature-settings: "ss01", "cv11"` on `body`.
- **Geist Mono** — every small label: eyebrows/kickers, meta strings, card
  tags, code blocks, figcaptions, figure/FIG labels, footer credits, share
  pills. Almost always `text-transform: uppercase` with
  `letter-spacing: 0.1–0.14em`. Helper class `.mono` applies
  `font-feature-settings: "ss01"`.

**The hero H1 uses a non-default axis:**

```css
font-variation-settings: "opsz" 144, "SOFT" 30;
```

The `SOFT` axis (Fraunces-specific, 0–100) softens stroke terminals at display
size. Keep it — it's visible.

**Italic accent (`<span class="i">`).** Present inside almost every Fraunces
headline. One step heavier than the surrounding 300, and italic:

```css
.hero h1 .i         { font-style: italic; font-weight: 400; }
.section-head h2 .i { font-style: italic; }
.card h3 .i         { font-style: italic; font-weight: 300; }  /* lighter */
.member h3 .i       { font-style: italic; font-weight: 300; }
h1.title .i         { font-style: italic; font-weight: 400; }
```

The weight is not uniform — card h3 and member h3 drop the accent to 300
(lighter than the surrounding 400), while hero/article H1 lift it to 400
(heavier than surrounding 300). Same pattern, different direction. Don't map
`.i` to a single Tailwind class — emit contextual weight + italic.

### 2.2 Color tokens (OKLCH)

Declared at `:root` (light, default) and overridden on
`html[data-theme="dark"]`. Both the landing and the interior pages include a
complete duplicate of this block at the top of their `<style>`, so **any
consolidation in Tailwind `@theme` must reproduce both modes**.

| Token          | Light                  | Dark                   | Role |
| -------------- | ---------------------- | ---------------------- | ---- |
| `--bg`         | oklch(0.985 0.004 90)  | oklch(0.14 0.008 260)  | page background |
| `--bg-2`       | oklch(0.965 0.006 90)  | oklch(0.17 0.01 260)   | subtle panel / card cover fill |
| `--bg-3`       | oklch(0.94 0.008 90)   | oklch(0.20 0.012 260)  | deeper panel |
| `--ink`        | oklch(0.18 0.01 270)   | oklch(0.97 0.003 90)   | primary text |
| `--ink-2`      | oklch(0.35 .008 270) *(landing)* / oklch(0.38 .008 270) *(about/blog)* | oklch(0.80 0.004 90) | secondary text |
| `--ink-3`      | oklch(0.55 .006 270) *(landing)* / oklch(0.58 .006 270) *(about/blog)* | oklch(0.62 0.006 90) | labels / mono kickers |
| `--hair`       | oklch(0.88 0.006 270)  | oklch(0.30 0.01 260)   | 1px separators |
| `--card`       | oklch(0.995 0.003 90)  | oklch(0.17 0.01 260)   | card / chrome bg |
| `--chrome-1`   | rgba(255,255,255,.95)  | rgba(255,255,255,.35)  | chrome ring bright stop |
| `--chrome-2`   | rgba(180,185,195,.65)  | rgba(180,190,210,.18)  | chrome ring mid stop |
| `--chrome-3`   | rgba(70,75,90,.25)     | rgba(255,255,255,.04)  | chrome ring dark stop |
| `--accent`     | `#d6ff3d` (chartreuse) | same                   | accent — one hex, not OKLCH |
| `--accent-ink` | `#0a0d07`              | same                   | readable text on accent |
| `--shadow`     | `0 1px 0 rgba(20,22,30,.04), 0 10px 30px -18px rgba(20,22,30,.18)` | `0 1px 0 rgba(255,255,255,.02), 0 20px 50px -24px rgba(0,0,0,.7)` | single shadow token (only used on `#tweaks`) |
| `--shader-opacity` | `1` | `1` | runtime-tweakable shader alpha |

Note the subtle `--ink-2` / `--ink-3` drift: the landing uses 0.35/0.55, the
interior pages use 0.38/0.58. Unify on the interior values (slightly lighter
secondary text) — the landing values are a minor inconsistency.

**`color-mix(in oklab, ...)`** is used throughout: nav bg
(`color-mix(... var(--bg), transparent 35%)`), btn hover
(`color-mix(... var(--ink), var(--accent) 8%)`), eyebrow pill bg, grain noise,
big-cta chip. Tailwind v4 supports `color-mix` natively.

**Runtime accent palette** (exposed via `#tweaks`): `#d6ff3d` (default),
`#ff6a3d`, `#7c5cff`, `#3dd6a8`, `#f0f0f0`. `setAccent()` auto-derives
`--accent-ink` by computing luma:

```js
const luma = (0.299*r + 0.587*g + 0.114*b) / 255;
document.documentElement.style.setProperty(
  '--accent-ink', luma > 0.6 ? '#0a0d07' : '#fff'
);
```

**Default theme: `dark`.** From `TWEAK_DEFAULTS.theme`. Persisted in
`localStorage` under key `aipro-theme`. On interior pages the fallback is
hardcoded `'light'` (inconsistency — unify on `'dark'` to match the landing
default).

### 2.3 Layout primitives

| Primitive | Value |
| --------- | ----- |
| `.wrap`   | `max-width: 1240px; margin: 0 auto; padding: 0 32px` |
| Nav height | `56px` |
| Landing hero | `padding: 90px 0 110px`, `text-align: center`, inner `max-width: 920px` |
| About hero | `padding: 120px 0 80px`, left-aligned, inner `max-width: 820px` |
| Article wrap | `padding: 60px 32px 0; grid-template-columns: 1fr 220px; gap: 64px` |
| Standard section | `padding: 120px 0 80px` |

**Breakpoints used in the designs (max-width):** 960 (blog grid → 1 col,
article wrap → 1 col), 900 (team grid → 2 col, colophon → 1 col), 800
(manifesto → 1 col), 720 (stats → 2 col, next-up → 1 col), 560 (team → 1 col).
No `min-width` media queries — design is desktop-first.

### 2.4 Global body behavior

```css
body {
  font-family: 'Geist', ui-sans-serif, system-ui, -apple-system, Helvetica, Arial;
  font-feature-settings: "ss01", "cv11";
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  overflow-x: hidden;
  transition: background .5s ease, color .5s ease;  /* theme-toggle fade */
}
::selection { background: var(--accent); color: var(--accent-ink); }
a { color: inherit; text-decoration: none; }
```

The 0.5s `transition` on body is what makes theme toggle feel polished — don't
drop it.

---

## 3. Signature components / utilities

### 3.1 `.chrome` — brushed-silver 1px ring

Applied to: feature cards, regular cards, stats bar, series strip, big CTA,
series card in right rail, team member cards, contribs strip, next-up cards,
hero figure, post-body figures, post-body callout (via inherited background),
`#tweaks` panel.

```css
.chrome {
  position: relative;
  border-radius: 12px;
  background: var(--card);
  isolation: isolate;
}
.chrome::before {
  content: ""; position: absolute; inset: 0;
  padding: 1px; border-radius: inherit;
  background: conic-gradient(from 210deg at 50% 50%,
    var(--chrome-2) 0deg,
    var(--chrome-1) 60deg,
    var(--chrome-3) 130deg,
    var(--chrome-1) 200deg,
    var(--chrome-2) 270deg,
    var(--chrome-3) 330deg,
    var(--chrome-2) 360deg);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  pointer-events: none; z-index: 1;
}
.chrome::after {
  content: ""; position: absolute; inset: 1px;
  border-radius: calc(12px - 1px);
  background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,0) 30%);
  pointer-events: none; z-index: 0;
}
html[data-theme="dark"] .chrome::after {
  background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,0) 40%);
}
```

Not expressible in core Tailwind utilities. Port as a component class in
`globals.css` inside `@layer components`. The `::after` inner highlight is
subtle but present — reproduce it.

### 3.2 `.grain` — SVG noise overlay

Layered on hero only:

```css
.grain {
  position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  opacity: .35;
  mix-blend-mode: overlay;
}
html[data-theme="dark"] .grain { opacity: .22; }
```

Pure CSS — no JS. Ship as a component class.

### 3.3 `.shader` — Canvas 2D animated background

Three modes (`caustics | ribbon | field`). Canvas 2D only, no WebGL, no deps.
Same `makeShader(canvas)` function instantiates a loop that reads
`canvas.dataset.mode` each frame. All modes:

- Respect `html[data-theme]` live (re-read per frame)
- Read `--accent` live from computed style (recolors when tweaked)
- Use `ResizeObserver` to rebuild at DPR-scaled resolution (`Math.min(dpr, 2)`)
- Run on `requestAnimationFrame` with `t = performance.now()`
- Use `globalCompositeOperation = dark ? 'screen' : 'multiply'` for color blending

**`caustics`** (default):
- Base linear gradient `0→W,0→H`: dark `#0b1524 → #171022`, light `#f4f6f1 → #eef0ea`
- 7 radial gradient "rings" orbiting center, radii animate; colors alternate i%3 between accent, blue (`#5ea8ff`/`#7bb7ff`), magenta (`#c36bff`/`#c794ff`) with hex-alpha suffixes (`66`/`55`/`44`)
- 28 horizontal sine stripes overlaid, stroke `rgba(255,255,255,.035)` (dark) / `rgba(20,30,60,.05)` (light), 3-frequency sum per x

**`ribbon`**:
- Solid fill `#0c0f16` (dark) / `#f6f6f1` (light)
- 40 horizontal bands; each a wavy filled path 40px tall at y = H/2 + sin(...) offset
- Color cycles accent / blue / magenta by normalized i/40

**`field`**:
- Solid fill `#0a0d14` (dark) / `#f4f5ef` (light)
- Grid of 26px-stepped vector arrows; angle = atan2(dy,dx) + sin(...) of distance-to-center; length 55% of step
- Each arrow is a linear-gradient stroke from dim edge color → accent

Applied in two places on landing: hero background (`inset: -10% -5% -20% -5%`
— asymmetric bleed, more on bottom/sides) and big-CTA underlay (opacity .55).
On About: hero background (seed 0) and CTA underlay (seed 2.4). Plus the
**portrait shaders** (see §5.5).

All three modes should respect `prefers-reduced-motion` in the port — the
source doesn't, but we should.

### 3.4 Logo

```html
<a class="logo">
  <b>AI&nbsp;<em class="serif">Pro</em></b>
  <span class="logo-mark" aria-hidden="true"></span>
</a>
```

- `<b>AI</b>` — Geist, weight 500, size 15px, `letter-spacing: 0.14em`,
  `text-transform: uppercase`
- `<em class="serif">Pro</em>` — Fraunces, weight 400, size 18px,
  `letter-spacing: -0.01em`, `font-style: italic`, not uppercased
- `.logo-mark` — 22×22px metallic sphere on rounded-square, order: **after**
  the text:

```css
.logo-mark {
  width: 22px; height: 22px; border-radius: 6px;
  background: radial-gradient(circle at 30% 25%, #fff, #c9ccd4 40%, #6c7280 70%, #20222a);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.5), 0 1px 2px rgba(0,0,0,.3);
}
.logo-mark::after {
  content: ""; position: absolute; inset: 3px;
  border-radius: 4px;
  background: conic-gradient(from 180deg, #e6e8ed, #8a8e98, #e6e8ed, #565b68, #e6e8ed);
  mix-blend-mode: screen;
  opacity: .7;
}
```

The conic-gradient `::after` is the "sheen." Don't drop it.

### 3.5 Buttons

```
.btn         height 44px · padding 0 20px · radius 11px · Geist 500 13.5px · bg --card · color --ink · hover translateY(-1px)
.btn-primary bg --ink · color --bg · hover color-mix(--ink, --accent 8%)
.btn-ghost   bg transparent · color --ink-2 · hover --ink
.btn .arrow  18×18 · radius 4 · bg --accent · color --accent-ink · hover translateX(3px)
```

Always `display: inline-flex; gap: 10px` with the arrow. The `.arrow` is a
separate span containing "→" — not an SVG.

### 3.6 Kicker / eyebrow

Two variants with distinct shapes — **don't merge them**.

**`.eyebrow`** (landing hero only): pill-shaped, with pulsing accent dot.

```css
.eyebrow {
  padding: 6px 12px; border-radius: 999px;
  background: color-mix(in oklab, var(--card), transparent 20%);
  font: 11px 'Geist Mono'; letter-spacing: .12em; text-transform: uppercase;
  color: var(--ink-2);
  display: inline-flex; gap: 10px;
  margin-bottom: 28px;
}
.eyebrow .dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 3px color-mix(in oklab, var(--accent), transparent 75%);
  animation: pulse 2.2s infinite;
}
@keyframes pulse {
  50% { box-shadow: 0 0 0 6px color-mix(in oklab, var(--accent), transparent 90%); }
}
```

**`.kicker`** (About hero, blog post header, blog post "Continue reading",
About CTA): no pill, no pulse, smaller dot.

```css
.kicker {
  font: 11px 'Geist Mono'; letter-spacing: .14em; text-transform: uppercase;
  color: var(--ink-3);
  display: inline-flex; gap: 10px; align-items: center;
  margin-bottom: 22px;   /* 22 on hero, varies by context */
}
.kicker .dot { width: 5px; height: 5px; border-radius: 50%; background: var(--accent); }
```

### 3.7 `.chart` — gradient-clip text

Only used once: on the word "machine." in the landing hero H1. Fades the glyph
vertically into near-invisibility at its base.

```css
.hero h1 .chart {
  background: linear-gradient(180deg,
    var(--ink) 55%,
    color-mix(in oklab, var(--ink), transparent 55%));
  -webkit-background-clip: text; background-clip: text;
  color: transparent;
}
```

Looks like a screen-door fade. Not a highlight — the ink gets lighter from 55%
downward. Keep it; it's signature.

### 3.8 Theme toggle

Button, 34×34, rounded 10px. The SVG path inside is **swapped at runtime** via
`innerHTML`:

```js
themeIcon.innerHTML = dark
  ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'  // crescent
  : '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>'; // sun
```

In React, render both as components and conditionally mount.

### 3.9 Nav link hover (subtle but specific)

```css
.nav-links a::after {
  content: ""; position: absolute; left: 0; right: 0; bottom: 0;
  height: 1px; background: var(--ink);
  transform: scaleX(0); transform-origin: left;
  transition: transform .3s ease;
}
.nav-links a:hover::after { transform: scaleX(1); }
```

Left-origin underline slide. The active-page indicator (on About/Blog, not
Landing) is different:

```css
.nav-links a.active::before { content: "◆"; font-size: 7px; color: var(--accent); margin-right: 6px; }
```

---

## 4. Landing page (`AI Pro.html`)

### 4.1 Nav

- Sticky, `top: 0; z-index: 60`
- `backdrop-filter: saturate(140%) blur(10px)`
- `background: color-mix(in oklab, var(--bg), transparent 35%)`
- `border-bottom: 1px solid var(--hair)`
- Inner uses `.wrap.nav-inner` together: `.wrap` gives max-width + padding,
  `.nav-inner` adds flex/align/justify + `height: 56px`
- Order: left `nav-links` → `flex: 1` spacer → theme-toggle → logo (logo on
  the **right**, not left)
- Links: `font-size: 12.5px; letter-spacing: .04em; color: var(--ink-2)`

### 4.2 Hero

Layers (z-index order): shader canvas (0) → grain (1) → fade `::after` (1) →
`hero-inner` content (2).

```
.hero
├── .shader#shader > canvas#shaderCanvas   (inset: -10% -5% -20% -5%)
├── .grain                                  (noise overlay, mix-blend: overlay)
├── ::after                                 (140px linear-gradient fade to --bg)
└── .wrap.hero-inner (max-w 920px, centered)
    ├── .eyebrow   [pill · pulsing dot · "Issue 14 · new essay every tuesday"]
    ├── h1         [Fraunces 300 clamp(46,8vw,104) line .96 tracking -.035em · opsz 144, SOFT 30]
    │               └── "Notes from the<br><span.i>inside</span> of the <span.chart>machine.</span>"
    ├── p.lede     [17.5px/1.55 · max-w 560 · center]
    ├── .hero-ctas [inline-flex gap 10]
    │   ├── .btn.btn-primary with arrow → "Read the blogs"
    │   └── .btn.btn-ghost               → "About the publication"
    └── .topics    [static flex-wrap, centered, gap 24px · NOT a marquee]
                    Each: <span>Transformers</span> etc. · ::before = "◆" 8px accent
```

**`.topics` is static** — it's a wrapping row of topic labels with accent
diamond markers. The actual marquee is the series strip lower down (§4.4).

### 4.3 Blogs section (`#blogs`)

Section head:

```
.section-head (align-items: end, justify-content: space-between, gap 32)
├── h2  "Recent writing, picked for the curious engineer." (Fraunces 300 clamp(34,4.5vw,56), inline "writing" with .i italic)
└── .meta "27 essays · 4 series · updated weekly" (Geist Mono 11.5 uppercase, --ink-3)
```

Grid:

```css
.blog-grid { display: grid; grid-template-columns: 1.6fr 1fr 1fr; gap: 20px; }
@media (max-width: 960px) { .blog-grid { grid-template-columns: 1fr; } }
```

**5 cards.** The **first** is `.card.chrome.feature`: spans 2 rows, min-height
700px, 38px h3, 400px tall cover. The other four are regular cards (2×2 in
the right two columns): min-height 340px, 22px h3, 180px cover.

Card anatomy:

```
.card.chrome (optional .feature)
├── .cover   [180 or 400 tall · radius 8 · bg --bg-2 · border 1px --hair · overflow hidden]
│   └── .cover-art  (absolute inset 0, SVG viewbox — see §4.7)
├── .tag     (Geist Mono 10.5 uppercase, accent dot, "Series · Transformers · 01/06")
├── h3       (Fraunces 400 22px · .feature: 38px · line 1.05–1.15 · tracking -.015em)
├── p        (Geist 13.5/1.55 --ink-2)
└── .foot    (margin-top auto · flex between · Geist Mono 11 uppercase --ink-3)
    ├── left span   "24 MIN · APR 18"
    └── .read       "Read" or "Open essay" · ::after "→" that translates 4px on hover
```

Card hover: `transform: translateY(-3px)`. The `.foot .read` doesn't change
color on hover (the source has a redundant rule that sets it to `--accent-ink`
and then immediately back to `--ink`); only the arrow translates.

### 4.4 Series strip (THE marquee)

```
.series-strip.chrome (flex · gap 14 · padding 16×22 · radius 12 · mt 80)
├── .label "Active series" (mono uppercase)
└── .items (overflow hidden, edge mask)
    └── .items-track (flex gap 22 · animation marquee 38s linear infinite)
        ├── .item × 5  ("06 Transformers, by hand", etc.)
        │   ├── .num  (mono 11px --ink-3)
        │   └── text  (Geist 13 --ink-2)
        │   └── ::after "/" (--hair · margin-left 22)
        └── .item × 5  (duplicated for seamless loop)
```

```css
.series-strip .items {
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}
@keyframes marquee { to { transform: translateX(-50%); } }
```

The 5 items are: `06 Transformers, by hand`, `04 Build your own embedding
model`, `05 Reading CUDA without flinching`, `03 The production RAG playbook`,
`07 Agents in the real world`.

### 4.5 Big CTA

```
.big-cta.chrome (mt 72 · padding 72×40 · radius 16 · center · overflow hidden · relative)
├── .bg-shader#ctaShader  (absolute inset 0, z 0, opacity .55) with its own canvas
└── inline wrapper (relative, z 2)
    ├── h3  "Writing that respects<br>your <span.i>attention span.</span>" (Fraunces 300 clamp(32,4.2vw,52))
    ├── p   "No newsletter pop-ups. No login. ..." (15px --ink-2 · max-w 460 · center)
    └── .btn.btn-primary with arrow → "Read the blogs"
```

### 4.6 Fat footer (landing only)

Landing footer is the big one. About/Blog use the **slim** variant (§5.9).

```
<footer id="about"> (border-top · padding 48 0 40 · mt 80)
  .wrap
    .footer-inner (flex · justify between · flex-wrap · gap 40)
      .left (max-w 360)
        .logo
        p   "A small publication of long-form essays..."
      .footer-cols (flex · gap 60)
        .footer-col × 3
          h5   mono uppercase (Read / Elsewhere / Contact)
          a × N  block · Geist 13.5 · padding 4 0
    .footer-bottom (mt 48 · pt 22 · border-top --hair · flex between · mono 11)
      © MMXXVI · AI Pro
      Set in Fraunces & Geist · hand-crafted in HTML
```

Column links:
- **Read**: All essays · Series · Tutorials · Archive
- **Elsewhere**: RSS feed · GitHub · X / Twitter · Mastodon
- **Contact**: hello@aipro.dev · Pitch an essay · Colophon

### 4.7 Cover-art generators

All five cards have a `.cover-art` with an inline SVG shell and a JS IIFE at
the bottom of the document that appends generated content. Each has a
bottom-left caption "FIG.0X — ..." in Geist Mono 10–11px, letter-spacing 1.5,
`fill="currentColor"` opacity 0.45–0.55.

| Card | `viewBox`  | Shell                                                                 | Generated content |
| ---- | ---------- | --------------------------------------------------------------------- | ----------------- |
| **1 · Feature — Transformers** | `0 0 600 400` | `<linearGradient id="cg1">` chartreuse→`#2d80ff` at 35% opacity; `<pattern id="grid1">` 24px grid; full rects for gradient + grid; `<rect>` border 300×240 at (150,80) | `#matrix` — 12 cols × 10 rows of 22px rounded rects, x₀=156 y₀=86, `fill="currentColor"` with `fill-opacity = 0.08 + pow(random, 2.2) * 0.6` — soft scattered attention matrix |
| **2 · Embeddings** | `0 0 400 260` | `<radialGradient id="rg2">` accent 40% at (50%,40%) r 70% → transparent; `.cover-art` wrapper has inline `style="color: var(--ink-2)"` | `#cloud` — 4 clusters of 10–14 small circles each, jittered radius ≤34px around centers (120,110), (240,90), (300,170), (140,180); colors `#d6ff3d`, `#7cb8ff`, `#c08aff`, `#ff9a7c`; r 2–4; fill-opacity 0.55–0.95 |
| **3 · CUDA** | `0 0 400 260` | bg `--bg-3`; empty `<path id="wave">`; `#code-lines` group | 13 lines of CUDA code (Geist Mono 10.5, fill currentColor opacity .55) at x=24, y=30+i·15, each with a 2-digit line number at x=12, opacity .3. Snippets literally spell out FlashAttention forward: `__global__ void flash_attn_fwd(` down to `// tile load + dot product` |
| **4 · Agents** | `0 0 400 260` | bg `--bg-2` | `#agent-graph` — 4 nodes (circles r=22, fill `var(--bg)`, stroke currentColor op .5) at PLAN(90,100), ACT(200,70), OBS(310,100), REFLECT(200,160) + edges 0→1, 1→2, 2→3, 3→0, 1→3 as quadratic curves with `stroke-dasharray="3 3"` and 18px upward control point. Labels Geist Mono 9px centered |
| **5 · RAG** | `0 0 400 260` | bg `--bg-3` | `#rag-diagram` — 4 labeled rects: QUERY(24,60,90×40), RETRIEVE(155,40,90×40), RERANK(155,100,90×40), GEN(285,70,90×40); stroke currentColor op .5, fill `var(--bg)`, rx 4. Flow curves 0→1, 0→2, 1→3, 2→3 as cubic beziers. 12 accent-filled "token" rects (10×4 rx 1) in a 4×3 grid at (300,160)+ with staggered opacity 0.3+(i%5)*0.14 |

Port recommendation: convert each to a React component that generates the
nodes deterministically (use a seeded PRNG for the feature matrix — currently
uses `Math.random()` per render, which will hydrate-mismatch). Pass `theme`
and `accent` as props so the `currentColor`/`var(--bg)` fallbacks still work
correctly inside an SVG that's rendered once.

---

## 5. About page (`About.html`)

### 5.1 Nav

Same structure as landing. Differences:

- No `.wrap` wrapper — `.nav-inner` has its own max-width + padding:
  `max-width: 1240px; margin: 0 auto; padding: 0 32px`
- "About" link has `class="active"` which adds the accent ◆ prefix
- "Read blogs" points to `AI%20Pro.html#blogs`

Unify on one nav in the port (use landing's `.wrap + .nav-inner` pattern).

### 5.2 Hero (left-aligned variant)

```
.hero (relative · padding 120 0 80 · overflow hidden)
├── .shader > canvas#heroCanvas   (caustics, seed 0, inset -10%)
├── .grain
├── ::after                        (180px fade to --bg — thicker than landing's 140)
└── .wrap.hero-inner (max-w 820, NOT centered)
    ├── .kicker  "The people · the principles" (no pill, no pulse)
    ├── h1.page-title  Fraunces 300 clamp(48,7vw,96) line .98 tracking -.03em, text-wrap balance
    │                  "A small crew, <span.i>writing slowly,</span> about things that last."
    └── p.lede          Fraunces 300 clamp(18,2.2vw,24) line 1.45 --ink-2 opsz 60
                        "AI Pro is an independent publication. Three writers..."
```

**Lede is Fraunces here, not Geist** — different from landing's Geist lede.

### 5.3 Manifesto

```css
.manifesto { padding: 80px 0 40px; display: grid; grid-template-columns: 280px 1fr; gap: 64px; }
@media (max-width: 800px) { grid-template-columns: 1fr; gap: 24px; }
```

- Left `<h2>` — Geist Mono 11 uppercase --ink-3 margin `6px 0 0` (tiny label)
- Right `.body` — Fraunces 300 28px/1.3 --ink tracking -.015em opsz 60,
  paragraphs with 18px gap, inline `<em>` italic weight 400

### 5.4 Stats

Chrome-ringed bar, `padding: 28px 32px`, `grid-template-columns: repeat(4, 1fr)`, gap 40 (→ 2 cols at 720px, gap 24).

Each stat:

```
.stat
├── .label  (Geist Mono 10.5 uppercase --ink-3, mb 8)
├── .num    (Fraunces 300 48px line 1 tracking -.025em · opsz 144)
│            may contain <span.i>k</span> for "18k"/"42k"
└── .sub    (Geist 12 --ink-3 mt 6)
```

Four stats:
- Essays published · **27** · Since Mar 2024
- Active series · **4** · Transformers · RAG · CUDA · Agents
- Lines of code · **18k** · Every snippet runs
- Readers / week · **42k** · Quiet but steady

### 5.5 Team grid

```css
.team-section { padding: 120px 0 80px; }
.team-grid { grid-template-columns: repeat(3, 1fr); gap: 20px; }
@media (max-width: 900) { repeat(2, 1fr) }
@media (max-width: 560) { 1fr }
```

Each `.member.chrome`:

```
.member (padding 22 · radius 14 · min-h 380 · flex column · hover translateY -3)
├── .portrait (aspect-ratio 5/4 · radius 8 · mb 22 · overflow hidden · bg --bg-2)
│   ├── canvas[data-shader={0|1|2}] (absolute inset 0)
│   ├── .initials   bottom-right · Fraunces 300 italic 56px · opacity .85 · opsz 144
│   └── .caption    bottom-left · Geist Mono 10 uppercase · "PORTRAIT · FIG.0X"
├── .role           (kicker-like, with accent dot · "Founder · writes on transformers")
├── h3              (Fraunces 400 26px · inline .i italic 300 for surname)
├── p.bio           (Geist 13.5/1.55 --ink-2 · mb 20)
└── .foot           (mt auto · flex between)
    ├── .writes     "12 essays" (Geist Mono 10.5 uppercase)
    └── .socials    flex gap 6
        └── a × 3   28×28 rounded-full bg --bg-2, svg 13×13
                    (Twitter X path, LinkedIn, GitHub or Website globe)
```

**Portrait shader variants** (see §3.3's `portraitShader()`):
- Variant 0 (Aarav) — horizontal chromatic ribbon bands
- Variant 1 (Priya) — vector field
- Variant 2 (Sofía) — big orbs / caustics

Members:
- **Aarav Mehta** · Founder · writes on transformers · 12 essays · initials AM
- **Priya Kapoor** · Writes on CUDA & systems · 9 essays · initials PK
- **Sofía Vargas** · Writes on retrieval & agents · 6 essays · initials SV

### 5.6 Contributors

```
.contribs.chrome (mt 64 · padding 24 28 · radius 14 · flex align-center gap 28 · flex-wrap)
├── .label   "Guest contributors" (mono 10.5 uppercase, white-space nowrap)
└── .names   (Fraunces 300 18px/1.5 opsz 60, flex 1)
             Links separated by " · " with underline-offset 3, thickness 1px, --hair color.
             Trailing <em>— and whoever has something worth writing down next.</em>
```

Names: Lena Okafor, Yui Tanaka, Miguel Reyes, Ishaan Desai, Nadia Haddad, Ben
Ostrowski, Ayako Morii, Theo Laurent.

### 5.7 Colophon

```css
.colophon { padding: 80px 0 40px; grid-template-columns: 280px 1fr 1fr; gap: 64px; }
.colophon dl { grid-template-columns: 130px 1fr; gap: 14px 20px; }
```

Two `<dl>` blocks:

1. **Display** — Fraunces · variable, opsz 9–144
   **Text** — Geist · 400 / 500
   **Mono** — Geist Mono · ss01
   **Colour** — OKLCH throughout · chartreuse #D6FF3D
2. **Built with** — HTML, CSS, and an unreasonable amount of care
   **Hosted** — Static, globally, served cold
   **Feed** — `<a>RSS</a>` · `<a>Atom</a>` (underlined)
   **Contact** — `mailto:hello@aipro.dev`

### 5.8 About CTA

```
.big-cta.chrome (margin 80 0 0 · padding 80 40 · overflow hidden)
├── .shader > canvas#ctaCanvas   (caustics, seed 2.4, opacity .6)
└── .inner
    ├── .kicker (centered — unusual — "Want to write with us?")
    ├── h3  Fraunces 300 clamp(32,4.2vw,52)  "Pitch an essay.<br>We <span.i>read everything.</span>"
    ├── p   --ink-2 max-w 480 · "If you've built something hard, debugged..."
    └── .ctas (inline-flex gap 10)
        ├── .btn.btn-primary with arrow → mailto:pitch@aipro.dev  "Pitch an essay"
        └── .btn                        → /blog                    "Read the blogs"
```

Landing big-cta has **one** CTA; About has **two**. The kicker appears above
the headline in About's CTA only.

### 5.9 Slim footer

Used on About and Blog post. One-row flex.

```
footer.site (mt 96 · padding 36 0 · border-top --hair · Geist Mono 11 uppercase --ink-3)
└── .wrap (flex between · gap 24 · flex-wrap)
    ├── © MMXXVI · AI Pro
    ├── <a>Essays</a> <a>Series</a> <a>RSS</a> <a>About</a>  (margin-right 18 on each)
    └── Set in Fraunces & Geist
```

---

## 6. Blog post (`Blog Post.html`)

### 6.1 Reading progress bar

```css
#progress {
  position: fixed; top: 0; left: 0;
  height: 2px; width: 0;
  background: var(--accent);
  z-index: 100;
  transition: width .08s linear;
}
```

Updated on `scroll` listener with `{ passive: true }`:
`pct = scrollTop / (scrollHeight - clientHeight) * 100`.

### 6.2 Article grid + back link

```css
.article-wrap {
  max-width: 1240px; margin: 0 auto; padding: 60px 32px 0;
  display: grid; grid-template-columns: 1fr 220px; gap: 64px;
}
@media (max-width: 960px) { grid-template-columns: 1fr; }
```

Back link (top of left column):

```css
.back { display: inline-flex; gap: 8px; font: 11px Geist Mono; letter-spacing: .14em;
        text-transform: uppercase; color: var(--ink-3); margin-bottom: 40px; }
.back::before { content: "←"; }
```

### 6.3 Post header

```
.post-header (max-w 760)
├── .kicker         "Essay · Series: Transformers, by hand · 01 / 06"
├── h1.title        Fraunces 300 clamp(40,6vw,72) line 1.02 tracking -.03em · opsz 144
│                   "A slow walk through self-attention, <span.i>done by hand.</span>"
├── p.subtitle      Fraunces 300 ITALIC clamp(18,2.2vw,24) line 1.45 --ink-2 · opsz 60
│                   (max-w 620 · italic by default — not via .i)
├── .tags           flex-wrap gap 8 · mb 34
│   ├── .tag.primary  (accent bg · accent-ink color)
│   └── .tag × N      (--card bg · --ink-2 · hover bg --bg-2)
│     [Geist Mono 10.5 uppercase · padding 6 11 · radius 999]
└── .byline         flex gap 16 · mb 36 · Geist Mono 11 uppercase --ink-3
    ├── .avatar     28×28 circle · radial-gradient metallic sphere (same recipe as logo-mark minus ::after)
    ├── .author     "Aarav Mehta" (Geist 13, NOT uppercase, letter-spacing 0)
    ├── .sep        "·" opacity .5
    ├── date        "Apr 18, 2026"
    ├── .sep
    └── "24 min read"
```

First tag uses `.tag.primary`. Tag list for the sample post:
**Transformers** (primary) · Attention · From scratch · Numpy · Math.

### 6.4 Hero figure

```
.hero-img.chrome (aspect 16/9 · radius 14 · overflow hidden · mb 60)
├── .placeholder (inset 0 · display grid place-center)
│   [Striped bg: repeating-linear-gradient 135deg alternating --bg-2 and --bg-3, 10px bands]
│   └── svg viewbox 600 300 · preserveAspectRatio xMidYMid meet (72% width/height)
│       ├── #mx   — 12×12 attention matrix mosaic, exp(-dist*0.5)*(0.7+rand*0.6) diagonal heavy
│       ├── rect 444×220 at (78,40) border
│       ├── <text x=78 y=30>  "A = softmax( Q·Kᵀ / √dₖ )"  (mono 10)
│       └── <text x=78 y=280> "FIG.01 — ATTENTION MATRIX, 12×12 HEAD"
├── .drop     top-right · padding 6 10 · radius 999 · color-mix card bg · mono 10.5 uppercase · "Hero figure"
└── .caption  bottom-left · mono 10.5 uppercase · "Fig. 01 — attention matrix visualized"
```

### 6.5 Post body typography

```css
.post-body { max-width: 680px; font-size: 18px; line-height: 1.7; color: var(--ink-2); }
.post-body > * + * { margin-top: 1.3em; }   /* uniform vertical rhythm */
.post-body p { margin: 0; text-wrap: pretty; }
```

Elements:

| Element | Treatment |
| ------- | --------- |
| `p.lede` | Fraunces 300 22px/1.55, color `--ink`, `opsz 60`. `::first-letter`: Fraunces 400 3.4em, float left, margin `8px 12px 0 0`, line-height .9 — drop cap |
| `h2` | Fraunces 400 32px/1.15 tracking -.02em, `margin: 64px 0 16px`, `scroll-margin-top: 80px`, `opsz 144`. `::before` = "§" 24px `--ink-3` italic with `margin-right: 12px; vertical-align: .08em` |
| `h2 .i` | italic, weight 300 (lighter than surrounding 400) |
| `h3` | Geist 500 17px, `margin: 40px 0 6px`, `text-transform: none` |
| `a` | color `--ink`, `text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 3px; text-decoration-color: var(--hair)`. Hover → `text-decoration-color: var(--accent)` |
| `strong` | color `--ink`, weight 500 |
| `em` | **Fraunces italic 400, 1.02em, color `--ink`** — contextual serif switch inside an otherwise Geist body |
| `blockquote` | Fraunces 300 italic 24px/1.4 color `--ink`, `opsz 144`, `margin: 40px 0`, `padding-left: 28px`, `border-left: 2px solid var(--accent)`. Child `<footer>` reverts to Geist Mono 11 uppercase `--ink-3` margin-top 14 |
| `pre.code` | Geist Mono 13/1.6, `padding: 22px 24px`, radius 12, bg `--card`, color `--ink`, `overflow-x: auto`, `margin: 28px 0`. Syntax tokens: `.k` (accent-ink-mix keyword), `.s` (string `#c98a4b` light / `#e0b089` dark), `.c` (comment `--ink-3` italic), `.n` (normal `--ink`), `.muted` (`--ink-3`) |
| inline `code` | Geist Mono 0.88em, `padding: 2px 6px`, radius 4, bg `--bg-2`, color `--ink` |
| `ul` / `ol` | `padding-left: 22px`. `ul li::marker` color `--accent` |
| `.callout` | `margin: 32px 0`, `padding: 18px 22px`, radius 12, bg `--card`, `display: flex; gap: 14px`, 15px. Contains a `.mark` chip (mono 10.5 uppercase, `--accent-ink` on `--accent` bg, padding 4 8, radius 4, `align-self: flex-start`) + inline body |
| `figure.fig` | `.chrome`, margin 40 0, radius 12. `.body` aspect 16/8, bg `--bg-2`. `figcaption` Geist Mono 11 uppercase `--ink-3`, padding `12px 16px`, `border-top: 1px solid --hair`, bg `--card` |
| `hr` | `border: 0`, `margin: 48px 0`, `text-align: center`, `color: --ink-3`. `::before` = `"◆ ◆ ◆"` 8px letter-spacing 1em |

### 6.6 Post foot

```
.post-foot (max-w 680 · mt 72 · pt 32 · border-top --hair)
├── .share (flex gap 8 · mb 48)
│   └── a × 4  (pill · padding 8 14 · radius 999 · bg --card · mono 11 uppercase --ink-2)
│              Copy link · Share on X · Discuss on HN · Cite as BibTeX
├── .kicker   "Continue reading" (mt 40 · mb 18)
└── .next-up (grid 1fr 1fr · gap 14 · mt 20 · → 1fr at 720)
    └── a.next-card.chrome × 2
        ├── .dir   mono 10.5 uppercase --ink-3 · mb 14
        │          ├── .a ("←" or "→") in --accent
        │          └── "Previous in series" / "Next in series"
        ├── .ttl   Fraunces 400 20px/1.2 tracking -.01em · inline .i italic 300
        └── .sum   Geist 13.5 --ink-2
```

Pair: "Preface — why write transformers by hand?" ← / → "FlashAttention,
explained IO-first."

### 6.7 Right rail (aside.rail)

```css
aside.rail {
  position: sticky; top: 90px; align-self: start;
  font-family: 'Geist Mono', monospace;
  font-size: 11px; letter-spacing: .1em; text-transform: uppercase;
  color: var(--ink-3);
  padding-top: 80px;   /* aligns with first h2 */
}
```

Two `.block` sections:

**"On this page"** (TOC)

```
h6   "On this page" (mono 10.5 uppercase 400)
ul   list-style none, padding 0
 li  padding 6 0 · border-top --hair (first has no border)
  a  display block · Geist 12.5 · letter-spacing .04em · text-transform none · --ink-3
     hover/.active → --ink
     a.active::before = small accent dot (4×4 radius 50%, margin-right 8, vertical-align 3)
```

**Important:** rail links are **Geist, not mono** — and not uppercase. Only
the h6 heading is mono. This is the one place the rail breaks from mono
styling.

**"Series"** (series card)

```
.series-card.chrome (padding 16 · radius 12 · bg --card)
├── .num         "06 PARTS" (chip: --accent-ink on --accent, padding 3 7, radius 4, 10.5, mb 10)
├── .title-ln    "Transformers, by hand." (Fraunces italic 400, 16/1.3, --ink, tracking -.01, text-transform none, mb 10)
└── .ep × 6      (flex between, Geist 12 --ink-2, padding 4 0)
    ├── left  "00 · Preface" (etc.)
    └── .n    right glyph: "—" past · "●" current · "→" upcoming
    [.ep.cur → color --ink]
```

Episodes in sample post: `00 Preface —` · `01 Self-attention ●` (current) ·
`02 FlashAttention →` · `03 Positional →` · `04 Layer-norm →` ·
`05 Training loop →`.

---

## 7. Interactivity

| Behavior | Mechanism | Port recommendation |
| -------- | --------- | ------------------- |
| Theme toggle | `html[data-theme]`, `localStorage('aipro-theme')`, default `dark`, sun/moon SVG path swap | Use `next-themes` with `attribute="data-theme"`, `defaultTheme="dark"`. Keep the 0.5s body transition. |
| Reading progress bar | `scroll` listener calculates `%`, writes `style.width` on `#progress` | Client component on `/blog/[slug]` layout. `passive: true`. |
| TOC scroll-spy | `scroll` listener walks `sections[].offsetTop`, toggles `.active` | Prefer `IntersectionObserver` with `rootMargin: "-120px 0px -70% 0px"` — cleaner than offsetTop math. |
| Nav link underline hover | CSS `::after` scaleX transition | Pure CSS, port as-is. |
| Topic row | Static `flex-wrap` | Pure CSS. |
| Series-strip marquee | CSS `@keyframes marquee` to `translateX(-50%)`, items duplicated | Pure CSS, duplicate items in JSX or use `::after` with `content`. |
| Pulse dot (hero eyebrow) | CSS `@keyframes pulse` on box-shadow | Pure CSS. |
| Hero card cover generators | JS IIFEs generate SVG children | Server-render as React SVG components with deterministic seeds. Avoid client random — will hydrate-mismatch. |
| Shaders (caustics/ribbon/field) | Canvas 2D RAF loop reading `--accent`, `[data-theme]` live | Single `"use client"` `<Shader>` component, `variant` + `seed` props. Respect `prefers-reduced-motion`. |
| Portrait shaders | Same file, variant 0/1/2 per member | Same component, pass `variant`. |
| Accent swatch → `--accent-ink` | JS luma calc `(0.299r + 0.587g + 0.114b) / 255 > 0.6 ? ink : white` | Only needed if we keep the accent-switcher. Otherwise drop and hardcode. |

---

## 8. Tweaks panel / edit-mode protocol

This is **not a user-facing UI**. It's Figma Make / Figma MCP integration.
It's hidden by default (`display: none`) and only shown when the parent frame
posts `__activate_edit_mode`.

**Message contract:**

```js
// Parent → iframe
{ type: "__activate_edit_mode" }   // show the panel
{ type: "__deactivate_edit_mode" } // hide the panel

// Iframe → parent
{ type: "__edit_mode_available" }  // sent on load
{ type: "__edit_mode_set_keys", edits: { shader | accent | opacity | theme } }  // on change
```

**Default values live in a magic-commented block:**

```js
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "shader": "caustics",
  "accent": "#d6ff3d",
  "opacity": 100,
  "theme": "dark"
}/*EDITMODE-END*/;
```

The Figma editor patches the block between those comment markers when an
editor changes a setting.

**Port recommendation.** Drop the panel in production. Preserve the
`TWEAK_DEFAULTS` concept as a typed config object (say
`src/lib/design-config.ts`) that drives the shader variant, accent hex, and
default theme. This gives future Figma re-imports a consistent config surface
without shipping the postMessage bridge. If the editor round-trip is desired
later, wire it in a dev-only client route.

---

## 9. Copy inventory

### Landing hero
- Eyebrow: `Issue 14 · new essay every tuesday`
- H1: `Notes from the<br><i>inside</i> of the <chart>machine.</chart>`
- Lede: `Long-form essays, tutorials and teardowns on the models, the math and the production code that power modern AI. Written to be read — not skimmed.`
- CTAs: `Read the blogs` · `About the publication`
- Topics: `Transformers · Embeddings · RAG · CUDA · Agents · Fine-tuning · Systems`

### Landing blogs section
- H2: `Recent <i>writing</i>, picked<br>for the curious engineer.`
- Meta: `27 essays · 4 series · updated weekly`

### Landing 5 cards (tag · title · summary · meta · cta)
1. `Series · Transformers · 01/06` · `A slow walk through self-attention, <i>done by hand.</i>` · `We derive the attention operator from scratch — queries, keys, values, the softmax trick and why √dₖ shows up. Then we implement it in 40 lines of numpy and compare against a production kernel. No hand-waving.` · `24 MIN READ · APR 18` · `Open essay`
2. `Tutorial · Embeddings` · `Build your own <i>embedding model</i> in a weekend.` · `Contrastive objectives, hard negatives, and when <em>not</em> to reach for a frontier API.` · `18 MIN · APR 11` · `Read`
3. `Deep-dive · CUDA` · `Reading a <i>CUDA kernel</i> without flinching.` · `Warps, tiles, shared memory, and the one mental model that finally made it click.` · `22 MIN · APR 04` · `Read`
4. `Essay · Agents` · `Why <i>long-horizon</i> agents still drift.` · `A post-mortem of six failure modes, with receipts from production traces.` · `14 MIN · MAR 28` · `Read`
5. `Playbook · RAG` · `RAG that <i>actually</i> retrieves.` · `A honest playbook: chunking that works, rerankers worth the latency, eval you can trust.` · `20 MIN · MAR 22` · `Read`

### Landing series strip
`06 Transformers, by hand` · `04 Build your own embedding model` · `05 Reading CUDA without flinching` · `03 The production RAG playbook` · `07 Agents in the real world`

### Landing big CTA
`Writing that respects<br>your <i>attention span.</i>` · `No newsletter pop-ups. No login. Just the essays — open on any device, dark or light, as long as you have coffee.` · `Read the blogs`

### Landing footer blurb
`A small publication of long-form essays and tutorials on applied AI, systems, and the math underneath. Independent. No sponsors. No paywall.`

### About hero
- Kicker: `The people · the principles`
- H1: `A small crew, <i>writing slowly,</i> about things that last.`
- Lede: `AI Pro is an independent publication. Three writers and a rotating cast of guest contributors, all practitioners — shipping models, debugging kernels, running the on-call pager — who take the time to write down what they learn.`

### About manifesto
- Label: `What we're<br>doing here`
- Body: `We believe most AI writing online is too fast, too short, and too impressed with itself. We're trying to do the opposite: essays that are <em>long enough to say something true</em>, with code you can actually run and math we've checked by hand.`
- `No sponsors. No paywall. No newsletter pop-ups. The only thing we're selling is our attention to the subject, and yours in return.`

### About stats
- `Essays published · 27 · Since Mar 2024`
- `Active series · 4 · Transformers · RAG · CUDA · Agents`
- `Lines of code · 18<i>k</i> · Every snippet runs`
- `Readers / week · 42<i>k</i> · Quiet but steady`

### About team
- Section H2: `The <i>writers.</i>` · Meta: `3 authors · 8 contributors · based everywhere`
- Aarav Mehta · role: `Founder · writes on transformers` · bio: `Was training language models when it still felt weird. Writes the slow walkthroughs. Thinks out loud about attention variants, mostly over coffee.` · `12 essays`
- Priya Kapoor · role: `Writes on CUDA & systems` · bio: `Systems person. Has shipped more custom kernels than she'd admit at a dinner party. Likes profiler flamegraphs the way other people like crosswords.` · `9 essays`
- Sofía Vargas · role: `Writes on retrieval & agents` · bio: `Builds retrieval systems at a company you've heard of; writes about the <em>other</em> ninety percent of the job — evaluation, drift, the unglamorous plumbing.` · `6 essays`

### About contributors
Label: `Guest contributors` · Names: `Lena Okafor · Yui Tanaka · Miguel Reyes · Ishaan Desai · Nadia Haddad · Ben Ostrowski · Ayako Morii · Theo Laurent` · trailing `<em>— and whoever has something worth writing down next.</em>`

### About CTA
- Kicker: `Want to write with us?`
- H3: `Pitch an essay.<br>We <i>read everything.</i>`
- Body: `If you've built something hard, debugged something weird, or understood something that took a year to understand — we'd love to help you write it down.`
- CTAs: `Pitch an essay` (mailto) · `Read the blogs`

### Blog post (demo content)
- Kicker: `Essay · Series: Transformers, by hand · 01 / 06`
- Title: `A slow walk through self-attention, <i>done by hand.</i>`
- Subtitle (italic): `We derive the attention operator from first principles — queries, keys, values, the softmax trick and why √dₖ shows up — then implement it in 40 lines of numpy and compare against a production kernel.`
- Tags: `Transformers` (primary) · `Attention` · `From scratch` · `Numpy` · `Math`
- Byline: `Aarav Mehta · Apr 18, 2026 · 24 min read`
- Share: `Copy link · Share on X · Discuss on HN · Cite as BibTeX`
- Next-up pair: `← Previous in series · Preface — why write transformers by hand?` · `Next in series → · FlashAttention, explained IO-first.`

---

## 10. Conversion plan & gotchas

### Plan

1. **Fonts** — `next/font/google` for Fraunces (variable), Geist, Geist Mono.
   Expose as `--font-fraunces`, `--font-geist-sans`, `--font-geist-mono`.
2. **Tokens** — Port the OKLCH token system into `@theme` in `globals.css`.
   Keep both `:root` and `[data-theme="dark"]` variants. Unify `--ink-2/3` on
   the interior values (0.38/0.58). Wire Tailwind dark variant to
   `@custom-variant dark (&:is([data-theme="dark"] *))`.
3. **Utilities in `@layer components`** — `.chrome`, `.grain`, `.eyebrow`,
   `.kicker`, `.btn`/`.btn-primary`/`.btn-ghost`/`.btn .arrow`, `.logo`/`.logo-mark`,
   `.chart` (gradient-clip). These are too bespoke for core utilities.
4. **`<Shader>`** — one `"use client"` component, props `variant: "caustics" |
   "ribbon" | "field"`, `seed: number`, `className?`. Honor
   `prefers-reduced-motion`.
5. **`<Grain>`** — no-op, pure CSS div with `.grain` class.
6. **Cover-art components** — 5 server-rendered SVG components. Use a seeded
   PRNG (mulberry32 or similar) keyed by slug/index so the feature matrix is
   deterministic.
7. **Landing rebuild** — replace `src/app/_sections/{features,pricing,testimonials}`
   with `_sections/{blog-grid,series-strip}`. Keep `_sections/{hero,cta}` but
   rewrite to Claudia's copy/layout. New section order: Hero → BlogGrid →
   SeriesStrip → BigCTA → FatFooter.
8. **About page** — build `_sections/about/{manifesto,stats,team,contributors,
   colophon,cta}`. Team member component handles portrait shader variant 0/1/2.
9. **Blog layout** — `src/app/blog/[slug]/layout.tsx` or a wrapper that adds
   the progress bar and right rail. Extend frontmatter to carry `subtitle`,
   `tags[]` (first as primary), `heroFigure`, `series: { name, part, total }`,
   `tocHeadings: [{ id, label }]`.
10. **MDX components** — override `h2` (with `§` prefix), `em` (context-swap to
    Fraunces italic), `blockquote` (accent border + Fraunces italic), `hr`
    (`◆ ◆ ◆`), `pre`/`code`, `ul` (accent marker), `figure`, plus custom
    `<Callout>`. Lede is a `p` with `className="lede"` — add a JSX component
    or a class convention (`> p:first-of-type`).
11. **Reading progress + TOC** — small `"use client"` component. TOC via
    `IntersectionObserver`.
12. **Theme** — `next-themes` with `attribute="data-theme"`,
    `defaultTheme="dark"`, `storageKey="aipro-theme"`. Custom icon swap.
13. **Slim footer** on `/about` and `/blog/*`, fat footer on `/`. Expose both
    as components, pick per layout.

### Gotchas

- **`dark:` variant must be data-attribute based**, not class. See step 2.
- **`.i` is not one class** — weight differs by context (hero +1 step up,
  cards +1 step down). Do not collapse to `italic`.
- **`text-wrap: balance` / `text-wrap: pretty`** are used on headlines + body.
  Both supported in modern Chrome/Firefox/Safari.
- **`opsz` axis** is active on Fraunces in several sizes. `next/font` with
  variable fonts auto-applies opsz via size — but the SOFT axis on the hero
  needs a manual `font-variation-settings` override on that H1.
- **`mask-composite: exclude` / `-webkit-mask-composite: xor`** — Safari/Chrome
  both fine; no polyfill.
- **`color-mix(in oklab, ...)`** — supported in all current evergreens.
- **Canvas shader hydration** — use `useEffect` to start RAF; don't SSR the
  canvas paint.
- **Cover-art hydration** — currently uses `Math.random()` per render. Port
  must use a deterministic seed, or mark the wrapper as `"use client"` and
  generate in `useEffect`.
- **Don't SSR `window.parent.postMessage`** — the edit-mode code runs after
  mount. Skip in production build entirely; add behind a `NEXT_PUBLIC_EDIT_MODE`
  flag if we want to re-enable it.
- **`#about` anchor vs `/about` route** — landing's top nav points to
  `#about` (footer anchor). The About page is a separate route linked via the
  logo/interior nav. In the port, have the top nav go to `/about` on all
  pages and optionally keep a footer id of `about`.
- **`--ink-2` / `--ink-3` inconsistency** — landing uses 0.35/0.55, interiors
  use 0.38/0.58. Pick one. I'd keep the interior values (more legible).
- **Interior pages default theme fallback `'light'`** (About/Blog JS) vs
  landing's `'dark'`. Unify on `'dark'`.

---

## 11. What changes vs the current scaffold

The scaffold I wrote earlier (`src/app/_sections/{hero,features,pricing,testimonials,cta}`)
is a generic SaaS landing and **does not match** Claudia's designs. Specific
replacements needed:

| Current                    | Replace with                              |
| -------------------------- | ----------------------------------------- |
| `_sections/hero`           | New Hero (shader + grain + eyebrow + H1 with `.i`+`.chart` + lede + 2 CTAs + static `.topics`) |
| `_sections/features`       | **Delete.** Not in designs. |
| `_sections/pricing`        | **Delete.** Not in designs. |
| `_sections/testimonials`   | **Delete.** Not in designs. |
| `_sections/cta`            | New Big CTA (chrome block + shader underlay + headline + body + single primary CTA) |
| —                          | **Add** `_sections/blog-grid` (5-card showcase with feature card spanning 2 rows) |
| —                          | **Add** `_sections/series-strip` (marquee with edge mask) |
| `components/layout/Header` | Rebuild with `.wrap.nav-inner`, theme toggle, accent-dot active modifier on interior pages |
| `components/layout/Footer` | Split into `FooterFat` (landing) and `FooterSlim` (about/blog) |
| `components/ui/Button`     | Rebuild as `.btn` with arrow span variant, primary/ghost, correct heights/tracking |
| `components/mdx/Callout`   | Rebuild as horizontal flex with `.mark` accent chip |
| (blog sample post)         | Replace with the designed post (`A slow walk through self-attention...`); add `subtitle`, `tags` (first as `primary`), `series`, `author` fields |

Route additions:
- `/about` — full About page (currently stub)
- `/blog/[slug]` — add progress bar, right rail, series card, next-up, share row, drop cap lede, `§`-prefix h2, context-swap em
