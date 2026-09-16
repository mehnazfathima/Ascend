import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ChevronLeft, ArrowRight } from "lucide-react";
import { auth } from "@/lib/auth";
import { getConceptBySlug, getNextConceptInSequence } from "@/lib/queries/content";
import { Button } from "@/components/ui/button";
import { parseStringArray } from "@/lib/content-types";
import type { ProgressStatus } from "@/lib/constants";
import { LevelBadge } from "@/components/concept/level-badge";
import { ExplanationTabs } from "@/components/concept/explanation-tabs";
import { ConceptSectionBlock } from "@/components/concept/concept-section";
import { MarkCompleteButton } from "@/components/concept/mark-complete-button";
import { Separator } from "@/components/ui/separator";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const concept = await getConceptBySlug(slug);
  return { title: concept?.title ?? "Concept" };
}

export default async function ConceptPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth();
  const [concept, nextConcept] = await Promise.all([
    getConceptBySlug(slug, session?.user?.id),
    getNextConceptInSequence(slug),
  ]);
  if (!concept) notFound();

  const realWorldExamples = parseStringArray(concept.realWorldExamples);
  const status = (concept.progress?.[0]?.status ?? "NOT_STARTED") as ProgressStatus;

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/learn"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" /> Back to the knowledge map
      </Link>

      <div className="mb-2 flex items-center gap-3">
        <LevelBadge index={concept.level.index} title={concept.level.title} theme={concept.level.colorTheme} />
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="size-3.5" /> {concept.estimatedMinutes} min
        </span>
      </div>

      <h1 className="font-heading text-3xl font-semibold tracking-tight">{concept.title}</h1>
      <p className="mt-2 text-lg text-muted-foreground">{concept.oneLiner}</p>

      <div className="mt-5">
        <MarkCompleteButton conceptSlug={concept.slug} status={status} />
      </div>

      {concept.prerequisites.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          Prerequisites:
          {concept.prerequisites.map((p) => (
            <Link
              key={p.prerequisiteId}
              href={`/learn/${p.prerequisite.slug}`}
              className="rounded-full border border-border px-2.5 py-0.5 text-xs hover:border-primary/50 hover:text-foreground"
            >
              {p.prerequisite.title}
            </Link>
          ))}
        </div>
      )}

      <Separator className="my-8" />

      <ExplanationTabs explanations={concept.explanations} />

      {concept.sections.length > 0 && (
        <div className="mt-10 space-y-10">
          {concept.sections.map((section) => (
            <ConceptSectionBlock key={section.id} section={section} />
          ))}
        </div>
      )}

      {realWorldExamples.length > 0 && (
        <div className="mt-10">
          <h3 className="font-heading text-lg font-semibold">Where is this used?</h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {realWorldExamples.map((example) => (
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

      <Separator className="my-10" />
      <div className="flex flex-col items-center gap-4 pb-4 sm:flex-row sm:justify-between">
        <MarkCompleteButton conceptSlug={concept.slug} status={status} />
        {nextConcept && (
          <Button variant="outline" render={<Link href={`/learn/${nextConcept.slug}`} />}>
            Next: {nextConcept.title} <ArrowRight className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
