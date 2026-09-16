import { prisma } from "@/lib/prisma";

export async function getChallenges() {
  return prisma.arenaChallenge.findMany({
    where: { published: true },
    orderBy: [{ category: "asc" }, { difficulty: "asc" }],
  });
}

export async function getChallengeBySlug(slug: string) {
  return prisma.arenaChallenge.findUnique({ where: { slug } });
}

export async function getUserSolvedSlugs(userId: string) {
  const solved = await prisma.arenaAttempt.findMany({
    where: { userId, correct: true },
    select: { challenge: { select: { slug: true } } },
    distinct: ["challengeId"],
  });
  return new Set(solved.map((s) => s.challenge.slug));
}

export async function getLeaderboard(limit = 10) {
  return prisma.userStats.findMany({
    orderBy: { xp: "desc" },
    take: limit,
    include: { user: { select: { name: true, image: true } } },
  });
}
