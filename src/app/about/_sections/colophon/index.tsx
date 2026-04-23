type Entry = { dt: string; dd: React.ReactNode };

const LEFT: Entry[] = [
  { dt: "Display", dd: <><em>Source Serif 4</em> · variable, opsz 8–60</> },
  { dt: "Text", dd: "Geist · 400 / 500" },
  { dt: "Mono", dd: "Geist Mono · ss01" },
  { dt: "Colour", dd: "OKLCH throughout · chartreuse #D6FF3D" },
];

const RIGHT: Entry[] = [
  { dt: "Built with", dd: "HTML, CSS, and an unreasonable amount of care" },
  { dt: "Hosted", dd: "Static, globally, served cold" },
  {
    dt: "Feed",
    dd: (
      <>
        <a href="#" className="underline decoration-1 underline-offset-[3px]">
          RSS
        </a>
        {" · "}
        <a href="#" className="underline decoration-1 underline-offset-[3px]">
          Atom
        </a>
      </>
    ),
  },
  {
    dt: "Contact",
    dd: (
      <a
        href="mailto:hello@aipro.dev"
        className="underline decoration-1 underline-offset-[3px]"
      >
        hello@aipro.dev
      </a>
    ),
  },
];

function DList({ entries }: { entries: Entry[] }) {
  return (
    <dl className="m-0 grid grid-cols-[130px_1fr] gap-x-5 gap-y-3.5">
      {entries.map((e) => (
        <span key={e.dt} className="contents">
          <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-3">{e.dt}</dt>
          <dd className="m-0 text-[14px] leading-[1.5] text-ink">{e.dd}</dd>
        </span>
      ))}
    </dl>
  );
}

export function Colophon() {
  return (
    <section
      id="colophon"
      className="grid grid-cols-[280px_1fr_1fr] gap-16 pt-[80px] pb-[40px] max-[900px]:grid-cols-1 max-[900px]:gap-5"
    >
      <h2 className="font-mono m-0 mt-1.5 text-[11px] font-normal uppercase tracking-[0.14em] text-ink-3">
        Colophon
      </h2>
      <DList entries={LEFT} />
      <DList entries={RIGHT} />
    </section>
  );
}
