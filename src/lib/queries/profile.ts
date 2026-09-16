import { prisma } from "@/lib/prisma";

export async function getProfileData(userId: string) {
  const [user, stats, completedConcepts, skillTestAttempts, arenaStats, projects] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.userStats.findUnique({ where: { userId } }),
    prisma.userConceptProgress.findMany({
      where: { userId, status: "COMPLETED" },
      include: { concept: { include: { level: true } } },
      orderBy: { completedAt: "desc" },
      take: 8,
    }),
    prisma.skillTestAttempt.findMany({
      where: { userId, completedAt: { not: null } },
      orderBy: { completedAt: "desc" },
      take: 5,
    }),
    prisma.arenaAttempt.findMany({ where: { userId } }),
    prisma.userProject.findMany({
      where: { userId },
      include: { project: true },
      orderBy: { startedAt: "desc" },
    }),
  ]);

  const arenaSolved = new Set(arenaStats.filter((a) => a.correct).map((a) => a.challengeId)).size;
  const arenaAttemptsCount = arenaStats.length;
  const arenaCorrectCount = arenaStats.filter((a) => a.correct).length;

  return {
    user: user!,
    stats,
    completedConcepts,
    skillTestAttempts,
    arena: {
      solved: arenaSolved,
      attempts: arenaAttemptsCount,
      accuracy: arenaAttemptsCount > 0 ? Math.round((arenaCorrectCount / arenaAttemptsCount) * 100) : 0,
    },
    projects,
  };
}
