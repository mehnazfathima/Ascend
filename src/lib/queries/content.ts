import { prisma } from "@/lib/prisma";

export async function getLevelsWithConcepts(userId?: string) {
  const levels = await prisma.level.findMany({
    orderBy: { index: "asc" },
    include: {
      concepts: {
        where: { published: true },
        orderBy: { order: "asc" },
        include: {
          progress: { where: { userId: userId ?? "__none__" } },
        },
      },
    },
  });
  return levels;
}

export async function getConceptBySlug(slug: string, userId?: string) {
  const concept = await prisma.concept.findUnique({
    where: { slug },
    include: {
      level: true,
      explanations: true,
      sections: { orderBy: { order: "asc" } },
      prerequisites: {
        include: { prerequisite: { select: { slug: true, title: true, oneLiner: true } } },
      },
      progress: { where: { userId: userId ?? "__none__" } },
    },
  });
  return concept;
}

export async function getNextConceptInSequence(currentSlug: string) {
  const concepts = await prisma.concept.findMany({
    where: { published: true },
    orderBy: [{ level: { index: "asc" } }, { order: "asc" }],
    select: { slug: true, title: true },
  });
  const index = concepts.findIndex((c) => c.slug === currentSlug);
  if (index === -1 || index === concepts.length - 1) return null;
  return concepts[index + 1];
}

export async function getUserProgressSummary(userId: string) {
  const [total, completed] = await Promise.all([
    prisma.concept.count({ where: { published: true } }),
    prisma.userConceptProgress.count({ where: { userId, status: "COMPLETED" } }),
  ]);
  return { total, completed };
}

export async function getNextRecommendedConcept(userId: string) {
  const inProgress = await prisma.userConceptProgress.findFirst({
    where: { userId, status: "IN_PROGRESS" },
    include: { concept: { include: { level: true } } },
    orderBy: { updatedAt: "desc" },
  });
  if (inProgress) return inProgress.concept;

  const completedIds = await prisma.userConceptProgress.findMany({
    where: { userId, status: "COMPLETED" },
    select: { conceptId: true },
  });
  const completedSet = new Set(completedIds.map((c) => c.conceptId));

  const concepts = await prisma.concept.findMany({
    where: { published: true },
    orderBy: [{ level: { index: "asc" } }, { order: "asc" }],
    include: { level: true },
  });

  return concepts.find((c) => !completedSet.has(c.id)) ?? concepts[0] ?? null;
}
