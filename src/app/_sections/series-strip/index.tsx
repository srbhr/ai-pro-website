const SERIES = [
  { num: "06", label: "Transformers, by hand" },
  { num: "04", label: "Build your own embedding model" },
  { num: "05", label: "Reading CUDA without flinching" },
  { num: "03", label: "The production RAG playbook" },
  { num: "07", label: "Agents in the real world" },
];

export function SeriesStrip() {
  const doubled = [...SERIES, ...SERIES];
  return (
    <div className="wrap">
      <div className="chrome mt-20 flex items-center gap-3.5 rounded-xl px-[22px] py-4">
        <span className="font-mono relative z-[2] text-[11px] uppercase tracking-[0.14em] text-ink-3">
          Active series
        </span>
        <div
          className="relative z-[2] flex flex-1 gap-[22px] overflow-hidden"
          style={{
            maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          }}
        >
          <div className="flex gap-[22px] animate-marquee">
            {doubled.map((s, i) => (
              <span key={i} className="marquee-item">
                <span className="font-mono text-[11px] text-ink-3">{s.num}</span>
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
