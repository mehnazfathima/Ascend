const NODE_COUNT = 11;
const NODE_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

function nodePosition(i: number) {
  const t = i / (NODE_COUNT - 1);
  const angle = t * Math.PI * 2.6 - Math.PI / 2;
  const radius = 20 + t * 100;
  return {
    cx: 140 + Math.cos(angle) * radius,
    cy: 140 + Math.sin(angle) * radius,
  };
}

const nodes = Array.from({ length: NODE_COUNT }, (_, i) => nodePosition(i));

// A plain, dependency-free SVG replacement for the old react-three-fiber
// scene. That approach caused repeated mobile issues (its canvas blocked
// page scroll and rendered incorrectly on some phones); SVG with viewBox
// scaling is the same reliable pattern the hero's regression visualizer
// already uses.
export function KnowledgeMapVisual() {
  return (
    <div className="aspect-square w-full overflow-hidden rounded-2xl border border-border bg-card">
      <svg viewBox="0 0 280 280" className="size-full">
        <g className="animate-spin-slow">
          {nodes.slice(0, -1).map((pos, i) => (
            <line
              key={`line-${i}`}
              x1={pos.cx}
              y1={pos.cy}
              x2={nodes[i + 1].cx}
              y2={nodes[i + 1].cy}
              stroke="var(--border)"
              strokeWidth={1.5}
            />
          ))}
          {nodes.map((pos, i) => (
            <circle
              key={`node-${i}`}
              cx={pos.cx}
              cy={pos.cy}
              r={9}
              fill={NODE_COLORS[i % NODE_COLORS.length]}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
