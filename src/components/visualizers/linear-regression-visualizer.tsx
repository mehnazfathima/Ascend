"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

type Point = { x: number; y: number };

const WIDTH = 400;
const HEIGHT = 280;
const PAD = 28;

const defaultPoints: Point[] = [
  { x: 60, y: 210 },
  { x: 120, y: 180 },
  { x: 170, y: 150 },
  { x: 230, y: 120 },
  { x: 280, y: 95 },
  { x: 340, y: 60 },
];

function fitLine(points: Point[]) {
  const n = points.length;
  const sumX = points.reduce((s, p) => s + p.x, 0);
  const sumY = points.reduce((s, p) => s + p.y, 0);
  const sumXY = points.reduce((s, p) => s + p.x * p.y, 0);
  const sumXX = points.reduce((s, p) => s + p.x * p.x, 0);
  const denom = n * sumXX - sumX * sumX;
  const m = denom === 0 ? 0 : (n * sumXY - sumX * sumY) / denom;
  const b = (sumY - m * sumX) / n;
  return { m, b };
}

export function LinearRegressionVisualizer({
  caption = "Drag a point — watch the model refit in real time.",
  initialPoints = defaultPoints,
}: {
  caption?: string;
  initialPoints?: Point[];
}) {
  const [points, setPoints] = useState(initialPoints);
  const [dragging, setDragging] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const { m, b } = fitLine(points);
  const x1 = PAD;
  const x2 = WIDTH - PAD;
  const y1 = Math.min(Math.max(m * x1 + b, PAD), HEIGHT - PAD);
  const y2 = Math.min(Math.max(m * x2 + b, PAD), HEIGHT - PAD);

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

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full touch-none select-none"
        onPointerMove={(e) => {
          if (dragging === null) return;
          const p = toLocalPoint(e.clientX, e.clientY);
          setPoints((pts) => pts.map((pt, i) => (i === dragging ? p : pt)));
        }}
        onPointerUp={() => setDragging(null)}
        onPointerLeave={() => setDragging(null)}
      >
        <line x1={PAD} y1={HEIGHT - PAD} x2={WIDTH - PAD} y2={HEIGHT - PAD} className="stroke-border" strokeWidth={1} />
        <line x1={PAD} y1={PAD} x2={PAD} y2={HEIGHT - PAD} className="stroke-border" strokeWidth={1} />
        <motion.line
          x1={x1}
          animate={{ y1, x2, y2 }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
          className="stroke-primary"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        {points.map((p, i) => (
          <motion.circle
            key={i}
            animate={{ cx: p.x, cy: p.y }}
            transition={{ type: dragging === i ? false : "spring", stiffness: 300, damping: 20 }}
            r={7}
            className="fill-foreground cursor-grab active:cursor-grabbing"
            onPointerDown={(e) => {
              (e.target as Element).setPointerCapture(e.pointerId);
              setDragging(i);
            }}
          />
        ))}
      </svg>
      {caption && (
        <p className="mt-2 text-center text-xs text-muted-foreground">{caption}</p>
      )}
    </div>
  );
}
