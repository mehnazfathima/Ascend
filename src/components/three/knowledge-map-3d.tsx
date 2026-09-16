"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const KnowledgeMapScene = dynamic(
  () => import("@/components/three/knowledge-map-scene").then((m) => m.KnowledgeMapScene),
  {
    ssr: false,
    loading: () => <Skeleton className="size-full rounded-2xl" />,
  }
);

export function KnowledgeMap3D() {
  return (
    <div className="aspect-square w-full overflow-hidden rounded-2xl border border-border bg-card">
      <KnowledgeMapScene />
    </div>
  );
}
