const SNIPPETS = [
  "__global__  void  flash_attn_fwd(",
  "  const half* __restrict__ Q,",
  "  const half* __restrict__ K,",
  "  const half* __restrict__ V,",
  "        half* __restrict__ O,",
  "  int B, int H, int N, int d) {",
  "  __shared__ half sQ[Br][d+4];",
  "  __shared__ half sK[Bc][d+4];",
  "  float m_i = -INFINITY, l_i = 0.f;",
  "  for (int j = 0; j < Tc; ++j) {",
  "    __syncthreads();",
  "    // tile load + dot product",
  "  }",
];

export function CudaCode() {
  return (
    <svg
      viewBox="0 0 400 260"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      <rect width="400" height="260" fill="var(--bg-3)" />
      <g>
        {SNIPPETS.map((s, i) => (
          <g key={i}>
            <text
              x="12"
              y={30 + i * 15}
              fontFamily="var(--font-mono)"
              fontSize="9"
              fill="currentColor"
              fillOpacity="0.3"
            >
              {(i + 1).toString().padStart(2, "0")}
            </text>
            <text
              x="24"
              y={30 + i * 15}
              fontFamily="var(--font-mono)"
              fontSize="10.5"
              fill="currentColor"
              fillOpacity="0.55"
              xmlSpace="preserve"
            >
              {s}
            </text>
          </g>
        ))}
      </g>
      <text
        x="20"
        y="244"
        fontFamily="var(--font-mono)"
        fontSize="10"
        fill="currentColor"
        opacity=".45"
        letterSpacing="1.5"
      >
        FIG.03 — KERNEL PROFILE, FLASHATTENTION-2
      </text>
    </svg>
  );
}
