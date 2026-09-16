import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { getLevelsWithConcepts } from "@/lib/queries/content";
import { LevelBadge } from "@/components/concept/level-badge";
import { ConceptCard } from "@/components/concept/concept-card";
import { Progress } from "@/components/ui/progress";
import type { ProgressStatus } from "@/lib/constants";

export const metadata: Metadata = { title: "Learn" };

export default async function LearnPage() {
  const session = await auth();
  const levels = await getLevelsWithConcepts(session?.user?.id);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-semibold">The AI Knowledge Map</h1>
        <p className="mt-1 text-muted-foreground">
          Work through it in order, or jump to whatever you&apos;re curious about.
        </p>
      </div>

      <div className="space-y-12">
        {levels.map((level) => {
          const total = level.concepts.length;
          const completed = level.concepts.filter((c) =>
            c.progress?.some((p) => p.status === "COMPLETED")
          ).length;

          return (
            <section key={level.id}>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <LevelBadge index={level.index} title={level.title} theme={level.colorTheme} />
                  <span className="text-sm text-muted-foreground">{level.description}</span>
                </div>
                {total > 0 && (
                  <div className="flex items-center gap-2">
                    <Progress value={(completed / total) * 100} className="w-28" />
                    <span className="text-xs text-muted-foreground">
                      {completed}/{total}
                    </span>
                  </div>
                )}
              </div>

              {total === 0 ? (
                <p className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
                  Concepts for this level are coming soon.
                </p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {level.concepts.map((concept) => (
                    <ConceptCard
                      key={concept.id}
                      slug={concept.slug}
                      cardLabel={concept.cardLabel || concept.title}
                      oneLiner={concept.oneLiner}
                      estimatedMinutes={concept.estimatedMinutes}
                      status={(concept.progress?.[0]?.status ?? "NOT_STARTED") as ProgressStatus}
                    />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
