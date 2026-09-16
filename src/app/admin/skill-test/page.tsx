import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteSkillTestQuestionAction } from "@/lib/actions/admin";

export const metadata: Metadata = { title: "Admin · Skill Test Questions" };

export default async function AdminSkillTestPage() {
  const questions = await prisma.skillTestQuestion.findMany({ orderBy: [{ category: "asc" }] });

  return (
    <div className="max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Skill Test Questions</h1>
          <p className="mt-1 text-muted-foreground">{questions.length} total</p>
        </div>
        <Button render={<Link href="/admin/skill-test/new" />}><Plus className="size-4" /> New question</Button>
      </div>
      <div className="divide-y divide-border rounded-xl border border-border">
        {questions.map((q) => (
          <div key={q.id} className="flex items-center justify-between gap-3 px-4 py-3">
            <Link href={`/admin/skill-test/${q.id}`} className="flex-1 truncate text-sm font-medium hover:underline">
              {q.prompt}
            </Link>
            <Badge variant="secondary">{q.category}</Badge>
            <Badge variant={q.published ? "default" : "outline"}>{q.published ? "Published" : "Draft"}</Badge>
            <DeleteButton
              action={async () => {
                "use server";
                await deleteSkillTestQuestionAction(q.id);
              }}
            />
          </div>
        ))}
        {questions.length === 0 && <p className="px-4 py-3 text-sm text-muted-foreground">No questions yet.</p>}
      </div>
    </div>
  );
}
