"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { recordActivity } from "@/lib/gamification";
import type { ProgressStatus } from "@/lib/constants";

const CONCEPT_COMPLETE_XP = 20;

export async function setConceptProgressAction(
  conceptSlug: string,
  status: ProgressStatus
) {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated");

  const concept = await prisma.concept.findUnique({ where: { slug: conceptSlug } });
  if (!concept) throw new Error("Concept not found");

  const wasCompleted = await prisma.userConceptProgress.findUnique({
    where: { userId_conceptId: { userId: session.user.id, conceptId: concept.id } },
  });

  await prisma.userConceptProgress.upsert({
    where: { userId_conceptId: { userId: session.user.id, conceptId: concept.id } },
    update: { status, completedAt: status === "COMPLETED" ? new Date() : null },
    create: {
      userId: session.user.id,
      conceptId: concept.id,
      status,
      completedAt: status === "COMPLETED" ? new Date() : null,
    },
  });

  if (status === "COMPLETED" && wasCompleted?.status !== "COMPLETED") {
    await recordActivity(session.user.id, CONCEPT_COMPLETE_XP);
  }

  revalidatePath("/learn");
  revalidatePath(`/learn/${conceptSlug}`);
  revalidatePath("/dashboard");
}
