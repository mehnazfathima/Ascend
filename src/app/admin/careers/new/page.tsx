import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CareerForm } from "@/components/admin/career-form";

export const metadata: Metadata = { title: "Admin · New career path" };

export default async function NewCareerPage() {
  const allConcepts = await prisma.concept.findMany({ orderBy: { title: "asc" }, select: { id: true, title: true } });

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-semibold">New career path</h1>
      <CareerForm
        originalSlug={null}
        allConcepts={allConcepts}
        defaultValues={{
          slug: "",
          title: "",
          description: "",
          skills: "",
          tools: "",
          exampleApplications: "",
          order: 0,
          conceptIds: [],
        }}
      />
    </div>
  );
}
