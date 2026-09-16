import type { Metadata } from "next";
import { SkillTestQuestionForm } from "@/components/admin/skill-test-question-form";

export const metadata: Metadata = { title: "Admin · New question" };

export default function NewSkillTestQuestionPage() {
  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-semibold">New question</h1>
      <SkillTestQuestionForm
        defaultValues={{
          id: null,
          type: "MCQ",
          category: "ai-fundamentals",
          difficulty: "MEDIUM",
          prompt: "",
          dataJson: '{\n  "options": ["", "", "", ""],\n  "answerIndex": 0,\n  "explanation": ""\n}',
          published: true,
        }}
      />
    </div>
  );
}
