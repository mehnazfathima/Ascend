import { prisma } from "@/lib/prisma";
import { CAREER_GOALS } from "@/lib/career-goals";

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

export async function getAdminOverview() {
  const [
    totalUsers,
    newUsers7d,
    newUsers30d,
    activeUsers7d,
    totalArenaAttempts,
    correctArenaAttempts,
    totalSkillTestAttempts,
    skillTestAttempts,
    progressRows,
    roadmapInputs,
    userProjects,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { createdAt: { gte: daysAgo(7) } } }),
    prisma.user.count({ where: { createdAt: { gte: daysAgo(30) } } }),
    prisma.userStats.count({ where: { lastActiveOn: { gte: daysAgo(7) } } }),
    prisma.arenaAttempt.count(),
    prisma.arenaAttempt.count({ where: { correct: true } }),
    prisma.skillTestAttempt.count({ where: { completedAt: { not: null } } }),
    prisma.skillTestAttempt.findMany({
      where: { completedAt: { not: null } },
      select: { scorePercent: true },
    }),
    prisma.userConceptProgress.groupBy({
      by: ["conceptId", "status"],
      _count: { _all: true },
    }),
    prisma.roadmapInstance.findMany({ select: { inputs: true } }),
    prisma.userProject.groupBy({ by: ["projectId"], _count: { _all: true } }),
  ]);

  // Most popular / most completed concepts
  const popularityByConcept = new Map<string, number>();
  const completedByConcept = new Map<string, number>();
  for (const row of progressRows) {
    popularityByConcept.set(
      row.conceptId,
      (popularityByConcept.get(row.conceptId) ?? 0) + row._count._all
    );
    if (row.status === "COMPLETED") {
      completedByConcept.set(row.conceptId, row._count._all);
    }
  }

  const conceptIds = Array.from(popularityByConcept.keys());
  const concepts = await prisma.concept.findMany({
    where: { id: { in: conceptIds } },
    select: { id: true, title: true },
  });
  const titleById = new Map(concepts.map((c) => [c.id, c.title]));

  const mostPopularConcepts = Array.from(popularityByConcept.entries())
    .map(([id, count]) => ({ title: titleById.get(id) ?? "Unknown", count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const mostCompletedConcepts = Array.from(completedByConcept.entries())
    .map(([id, count]) => ({ title: titleById.get(id) ?? "Unknown", count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  // Arena top challenges
  const arenaByChallenge = await prisma.arenaAttempt.groupBy({
    by: ["challengeId"],
    _count: { _all: true },
    orderBy: { _count: { challengeId: "desc" } },
    take: 5,
  });
  const challenges = await prisma.arenaChallenge.findMany({
    where: { id: { in: arenaByChallenge.map((a) => a.challengeId) } },
    select: { id: true, title: true },
  });
  const challengeTitleById = new Map(challenges.map((c) => [c.id, c.title]));
  const topArenaChallenges = arenaByChallenge.map((a) => ({
    title: challengeTitleById.get(a.challengeId) ?? "Unknown",
    count: a._count._all,
  }));

  // Popular career goals (from roadmap generator inputs — a static list, not DB CareerPath)
  const careerGoalCounts = new Map<string, number>();
  for (const r of roadmapInputs) {
    try {
      const parsed = JSON.parse(r.inputs) as { careerGoal?: string };
      if (parsed.careerGoal) {
        careerGoalCounts.set(parsed.careerGoal, (careerGoalCounts.get(parsed.careerGoal) ?? 0) + 1);
      }
    } catch {
      // ignore malformed rows
    }
  }
  const popularCareerGoals = Array.from(careerGoalCounts.entries())
    .map(([slug, count]) => ({
      title: CAREER_GOALS.find((g) => g.slug === slug)?.title ?? slug,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Popular projects
  const projectTemplates = await prisma.projectTemplate.findMany({
    where: { id: { in: userProjects.map((p) => p.projectId) } },
    select: { id: true, title: true },
  });
  const projectTitleById = new Map(projectTemplates.map((p) => [p.id, p.title]));
  const popularProjects = userProjects
    .map((p) => ({ title: projectTitleById.get(p.projectId) ?? "Unknown", count: p._count._all }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const scores = skillTestAttempts.map((a) => a.scorePercent ?? 0);
  const avgSkillTestScore =
    scores.length > 0 ? Math.round(scores.reduce((s, v) => s + v, 0) / scores.length) : 0;

  return {
    totalUsers,
    newUsers7d,
    newUsers30d,
    activeUsers7d,
    arena: {
      totalAttempts: totalArenaAttempts,
      correctRate:
        totalArenaAttempts > 0 ? Math.round((correctArenaAttempts / totalArenaAttempts) * 100) : 0,
      topChallenges: topArenaChallenges,
    },
    skillTest: {
      totalAttempts: totalSkillTestAttempts,
      avgScore: avgSkillTestScore,
    },
    mostPopularConcepts,
    mostCompletedConcepts,
    popularCareerGoals,
    popularProjects,
  };
}

export async function getAdminUsers(query?: string) {
  return prisma.user.findMany({
    where: query
      ? { OR: [{ name: { contains: query } }, { email: { contains: query } }] }
      : undefined,
    orderBy: { createdAt: "desc" },
    include: {
      stats: true,
      _count: { select: { progress: { where: { status: "COMPLETED" } } } },
    },
  });
}
