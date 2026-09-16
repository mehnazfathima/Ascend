import type { Metadata } from "next";
import { ArenaForm } from "@/components/admin/arena-form";

export const metadata: Metadata = { title: "Admin · New challenge" };

export default function NewArenaPage() {
  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-semibold">New challenge</h1>
      <ArenaForm
        originalSlug={null}
        defaultValues={{
          slug: "",
          title: "",
          category: "ai-fundamentals",
          type: "MCQ",
          difficulty: "EASY",
          prompt: "",
          dataJson: '{\n  "options": ["", "", "", ""],\n  "answerIndex": 0\n}',
          explanation: "",
          xpReward: 10,
          published: true,
        }}
      />
    </div>
  );
}
