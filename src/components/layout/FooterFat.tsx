import { Logo } from "./Logo";

const columns = [
  {
    heading: "Read",
    links: [
      { label: "All essays", href: "/blog" },
      { label: "Series", href: "#" },
      { label: "Tutorials", href: "#" },
      { label: "Archive", href: "#" },
    ],
  },
  {
    heading: "Elsewhere",
    links: [
      { label: "RSS feed", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "X / Twitter", href: "#" },
      { label: "Mastodon", href: "#" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "hello@aipro.dev", href: "mailto:hello@aipro.dev" },
      { label: "Pitch an essay", href: "mailto:pitch@aipro.dev" },
      { label: "Colophon", href: "/about#colophon" },
    ],
  },
];

export function FooterFat() {
  return (
    <footer id="about" className="mt-20 pt-12 pb-10">
      <div className="wrap">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div className="max-w-[360px]">
            <Logo />
            <p className="mt-3.5 text-[13px] leading-[1.55] text-ink-3">
              A small publication of long-form essays and tutorials on applied AI, systems, and
              the math underneath. Independent. No sponsors. No paywall.
            </p>
          </div>
          <div className="flex gap-[60px]">
            {columns.map((col) => (
              <div key={col.heading}>
                <h5 className="font-mono m-0 mb-3.5 text-[10.5px] font-normal uppercase tracking-[0.14em] text-ink-3">
                  {col.heading}
                </h5>
                {col.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="block py-1 text-[13.5px] text-ink-2 transition-colors hover:text-ink"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="font-mono mt-12 flex justify-between border-t border-hair pt-[22px] text-[11px] uppercase tracking-[0.1em] text-ink-3">
          <span>© MMXXVI · AI Pro</span>
          <span>Set in Source Serif &amp; Geist · hand-crafted in HTML</span>
        </div>
      </div>
    </footer>
  );
}
