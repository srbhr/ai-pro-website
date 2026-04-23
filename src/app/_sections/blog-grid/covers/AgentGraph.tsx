const NODES = [
  { x: 90, y: 100, label: "PLAN" },
  { x: 200, y: 70, label: "ACT" },
  { x: 310, y: 100, label: "OBS" },
  { x: 200, y: 160, label: "REFLECT" },
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [1, 3],
];

export function AgentGraph() {
  return (
    <svg
      viewBox="0 0 400 260"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      <rect width="400" height="260" fill="var(--bg-2)" />
      {EDGES.map(([a, b], i) => {
        const n1 = NODES[a];
        const n2 = NODES[b];
        const midX = (n1.x + n2.x) / 2;
        const midY = (n1.y + n2.y) / 2 - 18;
        return (
          <path
            key={i}
            d={`M${n1.x},${n1.y} Q${midX},${midY} ${n2.x},${n2.y}`}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        );
      })}
      {NODES.map((n, i) => (
        <g key={i}>
          <circle
            cx={n.x}
            cy={n.y}
            r={22}
            fill="var(--bg)"
            stroke="currentColor"
            strokeOpacity="0.5"
          />
          <text
            x={n.x}
            y={n.y + 3}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="9"
            fill="currentColor"
            fillOpacity="0.8"
            letterSpacing="1"
          >
            {n.label}
          </text>
        </g>
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
        FIG.04 — PLAN-EXECUTE-REFLECT LOOP
      </text>
    </svg>
  );
}
