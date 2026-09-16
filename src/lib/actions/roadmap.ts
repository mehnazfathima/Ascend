"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getLevelsWithConcepts } from "@/lib/queries/content";
import { roadmapSurveySchema } from "@/lib/validations/roadmap";
import { generateRoadmap } from "@/lib/roadmap-engine";
import { getCareerGoal } from "@/lib/career-goals";

export async function generateRoadmapAction(input: unknown) {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated");

  const parsed = roadmapSurveySchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const levels = await getLevelsWithConcepts();
  const completed = await prisma.userConceptProgress.findMany({
    where: { userId: session.user.id, status: "COMPLETED" },
    select: { conceptId: true },
  });

  const result = generateRoadmap({
    input: parsed.data,
    levels,
    completedConceptIds: new Set(completed.map((c) => c.conceptId)),
  });

  const goal = getCareerGoal(parsed.data.careerGoal);

  const instance = await prisma.roadmapInstance.create({
    data: {
      userId: session.user.id,
      title: `Path to ${goal.title}`,
      inputs: JSON.stringify(parsed.data),
      generatedSteps: JSON.stringify(result),
    },
  });

  revalidatePath("/roadmap");
  revalidatePath("/dashboard");
  return { ok: true as const, id: instance.id };
}
