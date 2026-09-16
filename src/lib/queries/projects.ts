import { prisma } from "@/lib/prisma";
import type { ProjectDifficulty } from "@/lib/constants";

export async function getProjectTemplates(filter: { domain?: string; difficulty?: ProjectDifficulty }) {
  return prisma.projectTemplate.findMany({
    where: {
      ...(filter.domain ? { domain: filter.domain } : {}),
      ...(filter.difficulty ? { difficulty: filter.difficulty } : {}),
    },
    orderBy: { title: "asc" },
    include: { career: true },
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.projectTemplate.findUnique({
    where: { slug },
    include: {
      career: true,
      requiredConcepts: { include: { concept: true } },
    },
  });
}

export async function getUserProjectsMap(userId: string) {
  const rows = await prisma.userProject.findMany({ where: { userId } });
  return new Map(rows.map((r) => [r.projectId, r]));
}

const DIFFICULTY_ORDER: ProjectDifficulty[] = ["BEGINNER", "INTERMEDIATE", "ADVANCED", "PORTFOLIO"];

export function recommendDifficulty(completedConcepts: number): ProjectDifficulty {
  if (completedConcepts < 5) return "BEGINNER";
  if (completedConcepts < 14) return "INTERMEDIATE";
  if (completedConcepts < 24) return "ADVANCED";
  return "PORTFOLIO";
}

export { DIFFICULTY_ORDER };
