import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { getUserProgressSummary } from "@/lib/queries/content";
import { getProjectTemplates, getUserProjectsMap, recommendDifficulty } from "@/lib/queries/projects";
import { ProjectFilters } from "@/components/projects/project-filters";
import { ProjectCard } from "@/components/projects/project-card";
import type { ProjectDifficulty } from "@/lib/constants";

export const metadata: Metadata = { title: "Projects" };

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ domain?: string; difficulty?: string }>;
}) {
  const { domain = "", difficulty = "" } = await searchParams;
  const session = await auth();
  const userId = session!.user.id;

  const [summary, projects, userProjects] = await Promise.all([
    getUserProgressSummary(userId),
    getProjectTemplates({
      domain: domain || undefined,
      difficulty: (difficulty as ProjectDifficulty) || undefined,
    }),
    getUserProjectsMap(userId),
  ]);

  const recommended = recommendDifficulty(summary.completed);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-semibold">Projects</h1>
        <p className="mt-1 text-muted-foreground">
          Build something real. Projects get harder as you do.
        </p>
      </div>

      <ProjectFilters domain={domain} difficulty={difficulty} recommended={recommended} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            slug={project.slug}
            title={project.title}
            description={project.description}
            domain={project.domain}
            difficulty={project.difficulty}
            status={userProjects.get(project.id)?.status}
          />
        ))}
      </div>

      {projects.length === 0 && (
        <p className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
          No projects match those filters yet — try broadening them.
        </p>
      )}
    </div>
  );
}
