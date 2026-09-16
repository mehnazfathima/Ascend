import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteArenaChallengeAction } from "@/lib/actions/admin";

export const metadata: Metadata = { title: "Admin · Arena Challenges" };

export default async function AdminArenaPage() {
  const challenges = await prisma.arenaChallenge.findMany({ orderBy: [{ category: "asc" }, { title: "asc" }] });

  return (
    <div className="max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Arena Challenges</h1>
          <p className="mt-1 text-muted-foreground">{challenges.length} total</p>
        </div>
        <Button render={<Link href="/admin/arena/new" />}><Plus className="size-4" /> New challenge</Button>
      </div>
      <div className="divide-y divide-border rounded-xl border border-border">
        {challenges.map((c) => (
          <div key={c.id} className="flex items-center justify-between gap-3 px-4 py-3">
            <Link href={`/admin/arena/${c.slug}`} className="flex-1 text-sm font-medium hover:underline">
              {c.title}
            </Link>
            <Badge variant="secondary">{c.category}</Badge>
            <Badge variant={c.published ? "default" : "outline"}>{c.published ? "Published" : "Draft"}</Badge>
            <DeleteButton
              action={async () => {
                "use server";
                await deleteArenaChallengeAction(c.slug);
              }}
            />
          </div>
        ))}
        {challenges.length === 0 && <p className="px-4 py-3 text-sm text-muted-foreground">No challenges yet.</p>}
      </div>
    </div>
  );
}
