import Link from "next/link";
import { CheckCircle2, Flag } from "lucide-react";
import { LevelBadge } from "@/components/concept/level-badge";
import type { RoadmapResult } from "@/lib/roadmap-engine";

export function RoadmapView({
  roadmap,
  title,
  completedSlugs,
}: {
  roadmap: RoadmapResult;
  title: string;
  completedSlugs: Set<string>;
}) {
  return (
    <div>
      <div className="rounded-2xl border border-border bg-card p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Your roadmap
        </p>
        <h1 className="mt-1 font-heading text-2xl font-semibold">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {roadmap.steps.length} concepts · roughly {roadmap.totalWeeks}{" "}
          {roadmap.totalWeeks === 1 ? "week" : "weeks"} at your pace
        </p>
      </div>

      <ol className="relative mt-8 space-y-3 border-l border-border pl-6">
        {roadmap.steps.map((step, i) => {
          const completed = completedSlugs.has(step.conceptSlug);
          return (
            <li key={step.conceptId} className="relative">
              <span
                className={`absolute -left-[29px] top-3 flex size-3.5 items-center justify-center rounded-full ${
                  completed ? "bg-success" : "bg-border"
                }`}
              />
              <Link
                href={`/learn/${step.conceptSlug}`}
                className="block rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Step {i + 1}</span>
                    <LevelBadge index={step.levelIndex} title={step.levelTitle} theme={step.levelTheme} />
                  </div>
                  {completed && <CheckCircle2 className="size-4 text-success" />}
                </div>
                <h3 className="mt-2 font-heading text-base font-semibold">{step.conceptTitle}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.oneLiner}</p>
                <p className="mt-2 text-xs text-muted-foreground/80">{step.why}</p>
              </Link>

              {step.checkpoint && (
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-secondary/60 px-3.5 py-2.5 text-xs font-medium text-secondary-foreground">
                  <Flag className="size-3.5 text-primary" />
                  Checkpoint — try an{" "}
                  <Link href="/arena" className="underline underline-offset-2">
                    Arena challenge
                  </Link>{" "}
                  on {step.levelTitle} before moving on.
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
