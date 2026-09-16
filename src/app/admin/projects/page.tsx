import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteProjectTemplateAction } from "@/lib/actions/admin";

export const metadata: Metadata = { title: "Admin · Projects" };

export default async function AdminProjectsPage() {
  const projects = await prisma.projectTemplate.findMany({ orderBy: { title: "asc" } });

  return (
    <div className="max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Projects</h1>
          <p className="mt-1 text-muted-foreground">{projects.length} total</p>
        </div>
        <Button render={<Link href="/admin/projects/new" />}><Plus className="size-4" /> New project</Button>
      </div>
      <div className="divide-y divide-border rounded-xl border border-border">
        {projects.map((p) => (
          <div key={p.id} className="flex items-center justify-between gap-3 px-4 py-3">
            <Link href={`/admin/projects/${p.slug}`} className="flex-1 text-sm font-medium hover:underline">
              {p.title}
            </Link>
            <Badge variant="secondary">{p.domain}</Badge>
            <Badge variant="outline">{p.difficulty}</Badge>
            <DeleteButton
              action={async () => {
                "use server";
                await deleteProjectTemplateAction(p.slug);
              }}
            />
          </div>
        ))}
        {projects.length === 0 && <p className="px-4 py-3 text-sm text-muted-foreground">No projects yet.</p>}
      </div>
    </div>
  );
}
