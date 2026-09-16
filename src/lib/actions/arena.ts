"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { recordActivity } from "@/lib/gamification";

export async function submitArenaAttemptAction(challengeId: string, correct: boolean) {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated");

  const challenge = await prisma.arenaChallenge.findUnique({ where: { id: challengeId } });
  if (!challenge) throw new Error("Challenge not found");

  const alreadySolved = await prisma.arenaAttempt.findFirst({
    where: { userId: session.user.id, challengeId, correct: true },
  });

  const xpEarned = correct && !alreadySolved ? challenge.xpReward : 0;

  await prisma.arenaAttempt.create({
    data: { userId: session.user.id, challengeId, correct, xpEarned },
  });

  if (xpEarned > 0) {
    await recordActivity(session.user.id, xpEarned);
  }

  revalidatePath("/arena");
  return { xpEarned, firstSolve: correct && !alreadySolved };
}
