import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/components/admin/project-form";
import { parseStringArray } from "@/lib/content-types";

export const metadata: Metadata = { title: "Admin · Edit project" };

export default async function EditProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [project, allConcepts, careers] = await Promise.all([
    prisma.projectTemplate.findUnique({ where: { slug }, include: { requiredConcepts: true } }),
    prisma.concept.findMany({ orderBy: { title: "asc" }, select: { id: true, title: true } }),
    prisma.careerPath.findMany({ orderBy: { title: "asc" }, select: { id: true, title: true } }),
  ]);
  if (!project) notFound();

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-semibold">Edit project</h1>
      <ProjectForm
        originalSlug={slug}
        allConcepts={allConcepts}
        careers={careers}
        defaultValues={{
          slug: project.slug,
          title: project.title,
          description: project.description,
          domain: project.domain,
          difficulty: project.difficulty,
          skillsPracticed: parseStringArray(project.skillsPracticed).join("\n"),
          techStack: parseStringArray(project.techStack).join("\n"),
          milestones: parseStringArray(project.milestones).join("\n"),
          expectedResult: project.expectedResult,
          advancedIdeas: parseStringArray(project.advancedIdeas).join("\n"),
          careerId: project.careerId,
          conceptIds: project.requiredConcepts.map((c) => c.conceptId),
        }}
      />
    </div>
  );
}
