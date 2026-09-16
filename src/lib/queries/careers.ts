import { prisma } from "@/lib/prisma";

export async function getCareerPaths() {
  return prisma.careerPath.findMany({ orderBy: { order: "asc" } });
}

export async function getCareerBySlug(slug: string) {
  return prisma.careerPath.findUnique({
    where: { slug },
    include: {
      concepts: { include: { concept: { include: { level: true } } } },
      projects: true,
    },
  });
}
