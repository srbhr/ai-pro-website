const LINKS = [
  { label: "Copy link", href: "#" },
  { label: "Share on X", href: "#" },
  { label: "Discuss on HN", href: "#" },
  { label: "Cite as BibTeX", href: "#" },
];

export function ShareRow() {
  return (
    <div className="mb-12 flex gap-2">
      {LINKS.map((l) => (
        <a
          key={l.label}
          href={l.href}
          className="font-mono inline-flex items-center gap-2 rounded-full bg-card px-3.5 py-2 text-[11px] uppercase tracking-[0.12em] text-ink-2 transition-colors hover:text-ink"
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}
