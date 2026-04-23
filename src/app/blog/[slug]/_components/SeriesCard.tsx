export type SeriesEpisode = {
  label: string;
  state: "past" | "current" | "upcoming";
};

export type SeriesCardProps = {
  parts: string;
  title: React.ReactNode;
  episodes: SeriesEpisode[];
};

const MARKER: Record<SeriesEpisode["state"], string> = {
  past: "—",
  current: "●",
  upcoming: "→",
};

export function SeriesCard({ parts, title, episodes }: SeriesCardProps) {
  return (
    <div>
      <h6 className="font-mono m-0 mb-3.5 text-[10.5px] font-normal uppercase tracking-[0.14em] text-ink-3">
        Series
      </h6>
      <div className="chrome rounded-xl bg-card p-4">
        <span className="font-mono relative z-[2] mb-2.5 inline-block rounded bg-accent px-[7px] py-[3px] text-[10.5px] uppercase tracking-[0.14em] text-accent-ink">
          {parts}
        </span>
        <div className="font-serif relative z-[2] mb-2.5 text-[16px] font-normal italic normal-case leading-[1.3] tracking-[-0.01em] text-ink">
          {title}
        </div>
        {episodes.map((ep, i) => (
          <div
            key={i}
            className={`font-sans relative z-[2] flex justify-between py-1 text-[12px] normal-case tracking-normal ${
              ep.state === "current" ? "text-ink" : "text-ink-2"
            }`}
          >
            <span>{ep.label}</span>
            <span className="font-mono text-[11px] text-ink-3">{MARKER[ep.state]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
