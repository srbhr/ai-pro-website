import { makeRng } from "@/lib/rng";

const CLUSTERS = [
  { cx: 120, cy: 110, n: 14, col: "#d6ff3d" },
  { cx: 240, cy: 90, n: 12, col: "#7cb8ff" },
  { cx: 300, cy: 170, n: 14, col: "#c08aff" },
  { cx: 140, cy: 180, n: 10, col: "#ff9a7c" },
];

export function EmbeddingCloud({ seed = 2 }: { seed?: number }) {
  const rng = makeRng(seed);
  const dots: React.ReactNode[] = [];
  CLUSTERS.forEach((cl, ci) => {
    for (let i = 0; i < cl.n; i++) {
      const a = rng() * Math.PI * 2;
      const r = rng() * 34;
      dots.push(
        <circle
          key={`${ci}-${i}`}
          cx={cl.cx + Math.cos(a) * r}
          cy={cl.cy + Math.sin(a) * r}
          r={2 + rng() * 2}
          fill={cl.col}
          fillOpacity={(0.55 + rng() * 0.4).toFixed(2)}
        />,
      );
    }
  });

  return (
    <svg
      viewBox="0 0 400 260"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full text-ink-2"
    >
      <defs>
        <radialGradient id={`rg2-${seed}`} cx="50%" cy="40%" r="70%">
          <stop offset="0" stopColor="#d6ff3d" stopOpacity=".4" />
          <stop offset="1" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="400" height="260" fill="var(--bg-2)" />
      <rect width="400" height="260" fill={`url(#rg2-${seed})`} />
      <g>{dots}</g>
      <text
        x="20"
        y="244"
        fontFamily="var(--font-mono)"
        fontSize="10"
        fill="currentColor"
        opacity=".45"
        letterSpacing="1.5"
      >
        FIG.02 — EMBEDDING SPACE, 2D PROJECTION
      </text>
    </svg>
  );
}
