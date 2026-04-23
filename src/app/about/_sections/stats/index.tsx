import type { ReactNode } from "react";

type Stat = {
  label: string;
  num: ReactNode;
  sub: string;
};

const STATS: Stat[] = [
  { label: "Essays published", num: "27", sub: "Since Mar 2024" },
  { label: "Active series", num: "4", sub: "Transformers · RAG · CUDA · Agents" },
  {
    label: "Lines of code",
    num: (
      <>
        18<span className="italic">k</span>
      </>
    ),
    sub: "Every snippet runs",
  },
  {
    label: "Readers / week",
    num: (
      <>
        42<span className="italic">k</span>
      </>
    ),
    sub: "Quiet but steady",
  },
];

export function Stats() {
  return (
    <div className="chrome mt-5 grid grid-cols-4 gap-10 rounded-xl px-8 py-7 max-[720px]:grid-cols-2 max-[720px]:gap-6">
      {STATS.map((s) => (
        <div key={s.label} className="relative z-[2]">
          <div className="font-mono mb-2 text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
            {s.label}
          </div>
          <div
            className="font-serif text-[48px] font-light leading-none tracking-[-0.025em] text-ink"
            style={{ fontVariationSettings: '"opsz" 60' }}
          >
            {s.num}
          </div>
          <div className="mt-1.5 text-[12px] text-ink-3">{s.sub}</div>
        </div>
      ))}
    </div>
  );
}
