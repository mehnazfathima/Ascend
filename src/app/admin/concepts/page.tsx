import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { ConceptPublishedToggle } from "@/components/admin/concept-published-toggle";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteConceptAction } from "@/lib/actions/admin";

export const metadata: Metadata = { title: "Admin · Concepts" };

export default async function AdminConceptsPage() {
  const levels = await prisma.level.findMany({
    orderBy: { index: "asc" },
    include: { concepts: { orderBy: { order: "asc" } } },
  });

  return (
    <div className="max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Concepts</h1>
          <p className="mt-1 text-muted-foreground">
            {levels.reduce((s, l) => s + l.concepts.length, 0)} total
          </p>
        </div>
        <Button render={<Link href="/admin/concepts/new" />}>
          <Plus className="size-4" /> New concept
        </Button>
      </div>

      <div className="space-y-8">
        {levels.map((level) => (
          <div key={level.id}>
            <h2 className="mb-3 font-heading text-sm font-semibold text-muted-foreground">
              Level {level.index} · {level.title}
            </h2>
            <div className="divide-y divide-border rounded-xl border border-border">
              {level.concepts.map((concept) => (
                <div key={concept.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <Link
                    href={`/admin/concepts/${concept.slug}`}
                    className="flex-1 text-sm font-medium hover:underline"
                  >
                    {concept.title}
                  </Link>
                  <ConceptPublishedToggle slug={concept.slug} published={concept.published} />
                  <DeleteButton
                    action={async () => {
                      "use server";
                      await deleteConceptAction(concept.slug);
                    }}
                  />
                </div>
              ))}
              {level.concepts.length === 0 && (
                <p className="px-4 py-3 text-sm text-muted-foreground">No concepts yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
