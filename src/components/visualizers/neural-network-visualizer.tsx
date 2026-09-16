"use client";

import { motion } from "framer-motion";

const WIDTH = 400;
const HEIGHT = 240;
const layers = [3, 4, 4, 2];

function layerX(i: number) {
  const pad = 50;
  return pad + (i * (WIDTH - pad * 2)) / (layers.length - 1);
}

function nodeY(count: number, i: number) {
  const pad = 30;
  if (count === 1) return HEIGHT / 2;
  return pad + (i * (HEIGHT - pad * 2)) / (count - 1);
}

export function NeuralNetworkVisualizer() {
  const nodes = layers.map((count, li) =>
    Array.from({ length: count }, (_, ni) => ({ x: layerX(li), y: nodeY(count, ni) }))
  );

  const edges: { from: { x: number; y: number }; to: { x: number; y: number }; delay: number }[] = [];
  for (let li = 0; li < layers.length - 1; li++) {
    nodes[li].forEach((from) => {
      nodes[li + 1].forEach((to) => {
        edges.push({ from, to, delay: li * 0.35 });
      });
    });
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full">
        {edges.map((edge, i) => (
          <line
            key={i}
            x1={edge.from.x}
            y1={edge.from.y}
            x2={edge.to.x}
            y2={edge.to.y}
            className="stroke-border"
            strokeWidth={1}
          />
        ))}
        {edges.map((edge, i) => (
          <motion.circle
            key={`pulse-${i}`}
            r={3}
            className="fill-primary"
            initial={{ opacity: 0 }}
            animate={{
              cx: [edge.from.x, edge.to.x],
              cy: [edge.from.y, edge.to.y],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 0.9,
              delay: edge.delay,
              repeat: Infinity,
              repeatDelay: layers.length * 0.35,
              ease: "easeInOut",
            }}
          />
        ))}
        {nodes.map((layer, li) =>
          layer.map((n, ni) => (
            <circle
              key={`${li}-${ni}`}
              cx={n.x}
              cy={n.y}
              r={9}
              className="fill-card stroke-foreground/70"
              strokeWidth={1.5}
            />
          ))
        )}
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Data flows forward, layer by layer, until it reaches a prediction.
      </p>
    </div>
  );
}
