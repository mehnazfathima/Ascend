import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ArenaForm } from "@/components/admin/arena-form";

export const metadata: Metadata = { title: "Admin · Edit challenge" };

export default async function EditArenaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const challenge = await prisma.arenaChallenge.findUnique({ where: { slug } });
  if (!challenge) notFound();

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-semibold">Edit challenge</h1>
      <ArenaForm
        originalSlug={slug}
        defaultValues={{
          slug: challenge.slug,
          title: challenge.title,
          category: challenge.category,
          type: challenge.type,
          difficulty: challenge.difficulty,
          prompt: challenge.prompt,
          dataJson: JSON.stringify(JSON.parse(challenge.data), null, 2),
          explanation: challenge.explanation,
          xpReward: challenge.xpReward,
          published: challenge.published,
        }}
      />
    </div>
  );
}
