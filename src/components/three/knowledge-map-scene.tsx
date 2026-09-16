"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";

const LEVEL_COUNT = 11;
const THEME_COLORS = ["#c25a2c", "#4f7a5f", "#c99a3e", "#5b6b78", "#a15d4a"];

function nodePosition(i: number): [number, number, number] {
  const t = i / (LEVEL_COUNT - 1);
  const angle = t * Math.PI * 2.6;
  const radius = 2.6;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const y = (t - 0.5) * 3.2;
  return [x, y, z];
}

function Nodes({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const positions = useMemo(
    () => Array.from({ length: LEVEL_COUNT }, (_, i) => nodePosition(i)),
    []
  );

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.16, 24, 24]} />
          <meshStandardMaterial
            color={THEME_COLORS[i % THEME_COLORS.length]}
            emissive={THEME_COLORS[i % THEME_COLORS.length]}
            emissiveIntensity={0.25}
            roughness={0.4}
          />
        </mesh>
      ))}
      {positions.slice(0, -1).map((pos, i) => (
        <Line
          key={i}
          points={[pos, positions[i + 1]]}
          color="#8a8272"
          lineWidth={1}
          transparent
          opacity={0.5}
        />
      ))}
    </group>
  );
}

export function KnowledgeMapScene() {
  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  return (
    <Canvas camera={{ position: [5, 1.5, 5], fov: 42 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.7} />
      <pointLight position={[5, 5, 5]} intensity={40} />
      <Nodes reducedMotion={reducedMotion} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.6}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 1.7}
      />
    </Canvas>
  );
}
