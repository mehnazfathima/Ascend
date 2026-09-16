import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SkillTestQuestionForm } from "@/components/admin/skill-test-question-form";

export const metadata: Metadata = { title: "Admin · Edit question" };

export default async function EditSkillTestQuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const question = await prisma.skillTestQuestion.findUnique({ where: { id } });
  if (!question) notFound();

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-semibold">Edit question</h1>
      <SkillTestQuestionForm
        defaultValues={{
          id: question.id,
          type: question.type,
          category: question.category,
          difficulty: question.difficulty,
          prompt: question.prompt,
          dataJson: JSON.stringify(JSON.parse(question.data), null, 2),
          published: question.published,
        }}
      />
    </div>
  );
}
