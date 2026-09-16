"use client";

import { Clock, ChevronRight } from "lucide-react";
import { cn } from "cn";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { LevelBadge } from "@/components/concept/level-badge";
import { ExplanationTabs } from "@/components/concept/explanation-tabs";
import { ConceptSectionBlock } from "@/components/concept/concept-section";
import { MarkCompleteButton } from "@/components/concept/mark-complete-button";
import type { ConceptDetail } from "@/lib/actions/content";

export function ConceptModal({
  open,
  onOpenChange,
  detail,
  loading,
  onNavigate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  detail: ConceptDetail | null;
  loading: boolean;
  onNavigate: (slug: string) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] w-full overflow-y-auto p-6 sm:max-w-2xl">
        <DialogTitle
          className={cn("font-heading text-2xl font-semibold tracking-tight", loading && "sr-only")}
        >
          {detail?.title ?? "Loading concept"}
        </DialogTitle>

        {loading || !detail ? (
          <ConceptModalSkeleton />
        ) : (
          <div className="space-y-5">
            <div className="-mt-3 flex items-center gap-3">
              <LevelBadge index={detail.level.index} title={detail.level.title} theme={detail.level.colorTheme} />
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="size-3.5" /> {detail.estimatedMinutes} min
              </span>
            </div>

            <DialogDescription className="-mt-2 text-base">{detail.oneLiner}</DialogDescription>

            <MarkCompleteButton conceptSlug={detail.slug} status={detail.status} />

            {detail.prerequisites.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                Prerequisites:
                {detail.prerequisites.map((p) => (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => onNavigate(p.slug)}
                    className="rounded-full border border-border px-2.5 py-0.5 text-xs hover:border-primary/50 hover:text-foreground"
                  >
                    {p.title}
                  </button>
                ))}
              </div>
            )}

            <Separator className="!my-6" />

            <ExplanationTabs explanations={detail.explanations} />

            {detail.sections.length > 0 && (
              <div className="space-y-8">
                {detail.sections.map((section, i) => (
                  <ConceptSectionBlock key={i} section={section} />
                ))}
              </div>
            )}

            {detail.realWorldExamples.length > 0 && (
              <div>
                <h3 className="font-heading text-base font-semibold">Where is this used?</h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {detail.realWorldExamples.map((example) => (
                    <li
                      key={example}
                      className="rounded-lg border border-border bg-muted/30 px-3.5 py-2.5 text-sm text-foreground/90"
                    >
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Separator className="!my-6" />
            <div className="flex flex-col items-center gap-4 pb-1 sm:flex-row sm:justify-between">
              <MarkCompleteButton conceptSlug={detail.slug} status={detail.status} />
              {detail.nextConcept && (
                <button
                  type="button"
                  onClick={() => onNavigate(detail.nextConcept!.slug)}
                  className="inline-flex items-center gap-1 rounded-lg border border-border px-3.5 py-2 text-sm font-medium hover:border-primary/50"
                >
                  Next: {detail.nextConcept.title} <ChevronRight className="size-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function ConceptModalSkeleton() {
  return (
    <div className="space-y-4 py-1">
      <div className="h-5 w-32 animate-pulse rounded-full bg-muted" />
      <div className="h-4 w-full animate-pulse rounded bg-muted" />
      <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
      <div className="mt-4 h-48 w-full animate-pulse rounded-xl bg-muted" />
    </div>
  );
}
