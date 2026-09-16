import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ConceptForm } from "@/components/admin/concept-form";
import { parseStringArray } from "@/lib/content-types";

export const metadata: Metadata = { title: "Admin · Edit concept" };

export default async function EditConceptPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [concept, levels, allConcepts] = await Promise.all([
    prisma.concept.findUnique({
      where: { slug },
      include: { explanations: true, sections: { orderBy: { order: "asc" } }, prerequisites: true },
    }),
    prisma.level.findMany({ orderBy: { index: "asc" } }),
    prisma.concept.findMany({ orderBy: { title: "asc" }, select: { id: true, slug: true, title: true } }),
  ]);
  if (!concept) notFound();

  const byDepth = new Map(concept.explanations.map((e) => [e.depth, e.content]));
  const sectionsForForm = concept.sections.map((s) => ({
    kind: s.kind,
    title: s.title,
    body: s.body ?? undefined,
    code: s.code ?? undefined,
    visualizerKey: s.visualizerKey ?? undefined,
    data: s.data ? JSON.parse(s.data) : undefined,
    order: s.order,
  }));

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-semibold">Edit concept</h1>
      <ConceptForm
        originalSlug={slug}
        levels={levels.map((l) => ({ id: l.id, index: l.index, title: l.title }))}
        otherConcepts={allConcepts.filter((c) => c.id !== concept.id)}
        defaultValues={{
          slug: concept.slug,
          title: concept.title,
          cardLabel: concept.cardLabel,
          oneLiner: concept.oneLiner,
          levelId: concept.levelId,
          order: concept.order,
          estimatedMinutes: concept.estimatedMinutes,
          realWorldExamples: parseStringArray(concept.realWorldExamples).join("\n"),
          tags: parseStringArray(concept.tags).join("\n"),
          published: concept.published,
          simple: byDepth.get("SIMPLE") ?? "",
          understand: byDepth.get("UNDERSTAND") ?? "",
          deep: byDepth.get("DEEP") ?? "",
          sectionsJson: sectionsForForm.length > 0 ? JSON.stringify(sectionsForForm, null, 2) : "",
          prerequisiteIds: concept.prerequisites.map((p) => p.prerequisiteId),
        }}
      />
    </div>
  );
}
