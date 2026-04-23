import { makeRng } from "@/lib/rng";

export function AttentionMatrix({ seed = 1 }: { seed?: number }) {
  const rng = makeRng(seed);
  const cols = 12;
  const rows = 10;
  const size = 22;
  const x0 = 156;
  const y0 = 86;

  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const v = Math.pow(rng(), 2.2);
      cells.push(
        <rect
          key={`${r}-${c}`}
          x={x0 + c * size}
          y={y0 + r * size}
          width={size - 2}
          height={size - 2}
          rx={2}
          fill="currentColor"
          fillOpacity={(0.08 + v * 0.6).toFixed(2)}
        />,
      );
    }
  }

  return (
    <svg
      viewBox="0 0 600 400"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id={`cg1-${seed}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#d6ff3d" stopOpacity=".35" />
          <stop offset="1" stopColor="#2d80ff" stopOpacity=".35" />
        </linearGradient>
        <pattern id={`grid1-${seed}`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path
            d="M24 0H0V24"
            fill="none"
            stroke="currentColor"
            strokeOpacity=".18"
            strokeWidth=".5"
          />
        </pattern>
      </defs>
      <rect width="600" height="400" fill={`url(#cg1-${seed})`} />
      <rect width="600" height="400" fill={`url(#grid1-${seed})`} />
      <rect
        x="150"
        y="80"
        width="300"
        height="240"
        rx="6"
        fill="none"
        stroke="currentColor"
        strokeOpacity=".4"
      />
      <g opacity=".85">{cells}</g>
      <text
        x="30"
        y="370"
        fontFamily="var(--font-mono)"
        fontSize="11"
        fill="currentColor"
        opacity=".55"
        letterSpacing="1.5"
      >
        FIG.01 — ATTENTION, EXPLAINED FROM FIRST PRINCIPLES
      </text>
    </svg>
  );
}
