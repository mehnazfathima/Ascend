import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getProjectBySlug } from "@/lib/queries/projects";
import { parseStringArray } from "@/lib/content-types";
import { ProjectStatusActions } from "@/components/projects/project-status-actions";
import type { ProjectStatus } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  return { title: project?.title ?? "Project" };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, session] = await Promise.all([getProjectBySlug(slug), auth()]);
  if (!project) notFound();

  const userProject = await prisma.userProject.findUnique({
    where: { userId_projectId: { userId: session!.user.id, projectId: project.id } },
  });

  const skills = parseStringArray(project.skillsPracticed);
  const techStack = parseStringArray(project.techStack);
  const milestones = parseStringArray(project.milestones);
  const advancedIdeas = parseStringArray(project.advancedIdeas);

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/projects" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="size-4" /> Back to Projects
      </Link>

      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-primary">
        <span>{project.domain.replace("-", " ")}</span> · <span>{project.difficulty.toLowerCase()}</span>
      </div>
      <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight">{project.title}</h1>
      <p className="mt-3 text-lg text-muted-foreground">{project.description}</p>

      {project.career && (
        <p className="mt-3 text-sm text-muted-foreground">
          Good fit for:{" "}
          <Link href={`/career/${project.career.slug}`} className="font-medium text-foreground underline underline-offset-4">
            {project.career.title}
          </Link>
        </p>
      )}

      <div className="mt-6">
        <ProjectStatusActions projectId={project.id} status={userProject?.status as ProjectStatus | undefined} />
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-heading text-base font-semibold">Skills you&apos;ll practice</h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {skills.map((s) => (
              <span key={s} className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">{s}</span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-heading text-base font-semibold">Tech stack</h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {techStack.map((t) => (
              <span key={t} className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {project.requiredConcepts.length > 0 && (
        <div className="mt-6 rounded-2xl border border-border bg-card p-5">
          <h3 className="font-heading text-base font-semibold">Concepts required</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.requiredConcepts.map((link) => (
              <Link
                key={link.conceptId}
                href={`/learn/${link.concept.slug}`}
                className="rounded-full border border-border px-3 py-1 text-sm hover:border-primary/40 hover:bg-muted/40"
              >
                {link.concept.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10">
        <h3 className="mb-4 font-heading text-lg font-semibold">Milestones</h3>
        <ol className="space-y-2">
          {milestones.map((m, i) => (
            <li key={m} className="flex items-start gap-3 rounded-lg border border-border px-4 py-3 text-sm">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">
                {i + 1}
              </span>
              {m}
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-secondary/40 p-6">
        <h3 className="font-heading text-base font-semibold">Expected result</h3>
        <p className="mt-2 text-sm text-muted-foreground">{project.expectedResult}</p>
      </div>

      {advancedIdeas.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-3 font-heading text-base font-semibold">Make it advanced</h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {advancedIdeas.map((idea) => (
              <li key={idea} className="rounded-lg bg-muted/30 px-3.5 py-2.5 text-sm text-foreground/90">{idea}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
