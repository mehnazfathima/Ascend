import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/components/admin/project-form";

export const metadata: Metadata = { title: "Admin · New project" };

export default async function NewProjectPage() {
  const [allConcepts, careers] = await Promise.all([
    prisma.concept.findMany({ orderBy: { title: "asc" }, select: { id: true, title: true } }),
    prisma.careerPath.findMany({ orderBy: { title: "asc" }, select: { id: true, title: true } }),
  ]);

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-semibold">New project</h1>
      <ProjectForm
        originalSlug={null}
        allConcepts={allConcepts}
        careers={careers}
        defaultValues={{
          slug: "",
          title: "",
          description: "",
          domain: "tabular",
          difficulty: "BEGINNER",
          skillsPracticed: "",
          techStack: "",
          milestones: "",
          expectedResult: "",
          advancedIdeas: "",
          careerId: null,
          conceptIds: [],
        }}
      />
    </div>
  );
}
