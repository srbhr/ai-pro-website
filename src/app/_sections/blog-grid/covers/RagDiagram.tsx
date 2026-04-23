const BOXES = [
  { x: 24, y: 60, w: 90, h: 40, label: "QUERY" },
  { x: 155, y: 40, w: 90, h: 40, label: "RETRIEVE" },
  { x: 155, y: 100, w: 90, h: 40, label: "RERANK" },
  { x: 285, y: 70, w: 90, h: 40, label: "GEN" },
];

const LINES: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
];

export function RagDiagram() {
  return (
    <svg
      viewBox="0 0 400 260"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      <rect width="400" height="260" fill="var(--bg-3)" />
      {BOXES.map((b, i) => (
        <g key={i}>
          <rect
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            rx={4}
            fill="var(--bg)"
            stroke="currentColor"
            strokeOpacity="0.5"
          />
          <text
            x={b.x + b.w / 2}
            y={b.y + b.h / 2 + 4}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="9"
            fill="currentColor"
            fillOpacity="0.75"
            letterSpacing="1.5"
          >
            {b.label}
          </text>
        </g>
      ))}
      {LINES.map(([a, b], i) => {
        const A = BOXES[a];
        const B = BOXES[b];
        const x1 = A.x + A.w;
        const y1 = A.y + A.h / 2;
        const x2 = B.x;
        const y2 = B.y + B.h / 2;
        return (
          <path
            key={i}
            d={`M${x1},${y1} C${(x1 + x2) / 2},${y1} ${(x1 + x2) / 2},${y2} ${x2},${y2}`}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
        );
      })}
      {Array.from({ length: 12 }).map((_, i) => (
        <rect
          key={i}
          x={300 + (i % 4) * 15}
          y={160 + Math.floor(i / 4) * 8}
          width={10}
          height={4}
          rx={1}
          fill="var(--accent)"
          fillOpacity={(0.3 + (i % 5) * 0.14).toFixed(2)}
        />
      ))}
      <text
        x="20"
        y="244"
        fontFamily="var(--font-mono)"
        fontSize="10"
        fill="currentColor"
        opacity=".45"
        letterSpacing="1.5"
      >
        FIG.05 — RETRIEVAL WITH RERANK
      </text>
    </svg>
  );
}
