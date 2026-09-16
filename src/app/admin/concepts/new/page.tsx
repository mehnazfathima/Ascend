import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ConceptForm } from "@/components/admin/concept-form";

export const metadata: Metadata = { title: "Admin · New concept" };

export default async function NewConceptPage() {
  const [levels, allConcepts] = await Promise.all([
    prisma.level.findMany({ orderBy: { index: "asc" } }),
    prisma.concept.findMany({ orderBy: { title: "asc" }, select: { id: true, slug: true, title: true } }),
  ]);

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-semibold">New concept</h1>
      <ConceptForm
        originalSlug={null}
        levels={levels.map((l) => ({ id: l.id, index: l.index, title: l.title }))}
        otherConcepts={allConcepts}
        defaultValues={{
          slug: "",
          title: "",
          cardLabel: "",
          oneLiner: "",
          levelId: levels[0]?.id ?? "",
          order: 0,
          estimatedMinutes: 15,
          realWorldExamples: "",
          tags: "",
          published: true,
          simple: "",
          understand: "",
          deep: "",
          sectionsJson: "",
          prerequisiteIds: [],
        }}
      />
    </div>
  );
}
