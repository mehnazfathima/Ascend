import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CareerForm } from "@/components/admin/career-form";
import { parseStringArray } from "@/lib/content-types";

export const metadata: Metadata = { title: "Admin · Edit career path" };

export default async function EditCareerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [career, allConcepts] = await Promise.all([
    prisma.careerPath.findUnique({ where: { slug }, include: { concepts: true } }),
    prisma.concept.findMany({ orderBy: { title: "asc" }, select: { id: true, title: true } }),
  ]);
  if (!career) notFound();

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-semibold">Edit career path</h1>
      <CareerForm
        originalSlug={slug}
        allConcepts={allConcepts}
        defaultValues={{
          slug: career.slug,
          title: career.title,
          description: career.description,
          skills: parseStringArray(career.skills).join("\n"),
          tools: parseStringArray(career.tools).join("\n"),
          exampleApplications: parseStringArray(career.exampleApplications).join("\n"),
          order: career.order,
          conceptIds: career.concepts.map((c) => c.conceptId),
        }}
      />
    </div>
  );
}
