import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteCareerPathAction } from "@/lib/actions/admin";

export const metadata: Metadata = { title: "Admin · Career Paths" };

export default async function AdminCareersPage() {
  const careers = await prisma.careerPath.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Career Paths</h1>
          <p className="mt-1 text-muted-foreground">{careers.length} total</p>
        </div>
        <Button render={<Link href="/admin/careers/new" />}><Plus className="size-4" /> New career path</Button>
      </div>
      <div className="divide-y divide-border rounded-xl border border-border">
        {careers.map((c) => (
          <div key={c.id} className="flex items-center justify-between gap-3 px-4 py-3">
            <Link href={`/admin/careers/${c.slug}`} className="flex-1 text-sm font-medium hover:underline">
              {c.title}
            </Link>
            <DeleteButton
              action={async () => {
                "use server";
                await deleteCareerPathAction(c.slug);
              }}
            />
          </div>
        ))}
        {careers.length === 0 && <p className="px-4 py-3 text-sm text-muted-foreground">No career paths yet.</p>}
      </div>
    </div>
  );
}
