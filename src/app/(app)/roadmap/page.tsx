import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { RoadmapForm } from "@/components/roadmap/roadmap-form";
import { RoadmapView } from "@/components/roadmap/roadmap-view";
import { RegenerateToggle } from "@/components/roadmap/regenerate-toggle";
import type { RoadmapResult } from "@/lib/roadmap-engine";

export const metadata: Metadata = { title: "Roadmap" };

export default async function RoadmapPage() {
  const session = await auth();
  const userId = session!.user.id;

  const [latest, completed] = await Promise.all([
    prisma.roadmapInstance.findFirst({ where: { userId }, orderBy: { createdAt: "desc" } }),
    prisma.userConceptProgress.findMany({
      where: { userId, status: "COMPLETED" },
      include: { concept: { select: { slug: true } } },
    }),
  ]);

  const completedSlugs = new Set(completed.map((c) => c.concept.slug));

  if (!latest) {
    return (
      <div className="mx-auto max-w-2xl">
        <RoadmapForm />
      </div>
    );
  }

  const roadmap = JSON.parse(latest.generatedSteps) as RoadmapResult;

  return (
    <div className="mx-auto max-w-2xl">
      <RoadmapView roadmap={roadmap} title={latest.title} completedSlugs={completedSlugs} />
      <div className="mt-10">
        <RegenerateToggle>
          <RoadmapForm />
        </RegenerateToggle>
      </div>
    </div>
  );
}
