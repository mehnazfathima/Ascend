"use client";

import { useRef, useState } from "react";

type Point = { x: number; y: number };

const WIDTH = 400;
const HEIGHT = 260;
const PAD = 24;

const clusterColors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-4)"];

const dataPoints: Point[] = [
  { x: 70, y: 60 }, { x: 95, y: 90 }, { x: 55, y: 100 }, { x: 110, y: 55 }, { x: 80, y: 40 },
  { x: 300, y: 70 }, { x: 330, y: 100 }, { x: 350, y: 60 }, { x: 310, y: 40 }, { x: 340, y: 130 },
  { x: 150, y: 200 }, { x: 190, y: 220 }, { x: 170, y: 180 }, { x: 210, y: 210 }, { x: 140, y: 230 },
];

const initialCentroids: Point[] = [
  { x: 90, y: 130 },
  { x: 320, y: 130 },
  { x: 180, y: 130 },
];

function distance(a: Point, b: Point) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function KMeansVisualizer() {
  const [centroids, setCentroids] = useState(initialCentroids);
  const [dragging, setDragging] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  function toLocalPoint(clientX: number, clientY: number): Point {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    const scaleX = WIDTH / rect.width;
    const scaleY = HEIGHT / rect.height;
    return {
      x: Math.min(Math.max((clientX - rect.left) * scaleX, PAD), WIDTH - PAD),
      y: Math.min(Math.max((clientY - rect.top) * scaleY, PAD), HEIGHT - PAD),
    };
  }

  function nearestCentroidIndex(p: Point) {
    let best = 0;
    let bestDist = Infinity;
    centroids.forEach((c, i) => {
      const d = distance(p, c);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    return best;
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full touch-none select-none"
        onPointerMove={(e) => {
          if (dragging === null) return;
          const p = toLocalPoint(e.clientX, e.clientY);
          setCentroids((cs) => cs.map((c, i) => (i === dragging ? p : c)));
        }}
        onPointerUp={() => setDragging(null)}
        onPointerLeave={() => setDragging(null)}
      >
        {dataPoints.map((p, i) => {
          const cluster = nearestCentroidIndex(p);
          return (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={5}
              style={{ fill: clusterColors[cluster] }}
              opacity={0.55}
            />
          );
        })}
        {centroids.map((c, i) => (
          <circle
            key={i}
            cx={c.x}
            cy={c.y}
            r={9}
            style={{ fill: clusterColors[i], stroke: "var(--card)", strokeWidth: 2 }}
            className="cursor-grab active:cursor-grabbing"
            onPointerDown={(e) => {
              (e.target as Element).setPointerCapture(e.pointerId);
              setDragging(i);
            }}
          />
        ))}
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Drag a centroid — points relabel to whichever is nearest.
      </p>
    </div>
  );
}
