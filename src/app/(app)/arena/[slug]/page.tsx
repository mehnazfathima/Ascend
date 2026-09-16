import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getChallengeBySlug } from "@/lib/queries/arena";
import { ChallengePlayer } from "@/components/arena/challenge-player";
import { CATEGORY_LABELS } from "@/lib/arena-types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const challenge = await getChallengeBySlug(slug);
  return { title: challenge?.title ?? "Challenge" };
}

export default async function ArenaChallengePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const challenge = await getChallengeBySlug(slug);
  if (!challenge) notFound();

  const siblings = await prisma.arenaChallenge.findMany({
    where: { published: true, category: challenge.category },
    orderBy: { title: "asc" },
    select: { slug: true },
  });
  const currentIndex = siblings.findIndex((s) => s.slug === slug);
  const next = currentIndex >= 0 ? siblings[currentIndex + 1] : undefined;

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/arena"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" /> Back to Arena
      </Link>

      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-primary">
        {CATEGORY_LABELS[challenge.category] ?? challenge.category} · {challenge.difficulty.toLowerCase()}
      </p>

      <ChallengePlayer
        challengeId={challenge.id}
        prompt={challenge.prompt}
        data={challenge.data}
        explanation={challenge.explanation}
        nextHref={next ? `/arena/${next.slug}` : null}
      />
    </div>
  );
}
