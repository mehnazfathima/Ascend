import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Swords, Map, Hammer, type LucideIcon } from "lucide-react";
import { cn } from "cn";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  getUserProgressSummary,
  getNextRecommendedConcept,
} from "@/lib/queries/content";
import { LevelBadge } from "@/components/concept/level-badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const session = await auth();
  const userId = session!.user.id;

  const [summary, nextConcept, roadmap, savedProjects, solvedAttempts] = await Promise.all([
    getUserProgressSummary(userId),
    getNextRecommendedConcept(userId),
    prisma.roadmapInstance.findFirst({ where: { userId }, orderBy: { createdAt: "desc" } }),
    prisma.userProject.findMany({ where: { userId }, include: { project: true }, take: 3 }),
    prisma.arenaAttempt.findMany({ where: { userId, correct: true }, select: { challengeId: true } }),
  ]);

  const solvedChallengeIds = new Set(solvedAttempts.map((a) => a.challengeId));
  const todaysChallenge = await prisma.arenaChallenge.findFirst({
    where: { published: true, id: { notIn: Array.from(solvedChallengeIds) } },
    orderBy: { id: "asc" },
  });

  const pct = summary.total > 0 ? Math.round((summary.completed / summary.total) * 100) : 0;
  const firstName = (session!.user.name ?? "there").split(" ")[0];

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <div>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Welcome back, {firstName}
        </h1>
        <p className="mt-1.5 text-base text-muted-foreground">Here&apos;s where you left off.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Continue learning */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 lg:col-span-2">
          <div className="absolute inset-y-0 left-0 w-1 bg-primary" />
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Continue learning
          </p>
          {nextConcept ? (
            <>
              <div className="mt-3 flex items-center gap-2">
                <LevelBadge
                  index={nextConcept.level.index}
                  title={nextConcept.level.title}
                  theme={nextConcept.level.colorTheme}
                />
              </div>
              <h2 className="mt-3 font-heading text-2xl font-semibold">{nextConcept.title}</h2>
              <p className="mt-2 text-[0.95rem] text-muted-foreground">{nextConcept.oneLiner}</p>
              <Button className="mt-6" render={<Link href={`/learn/${nextConcept.slug}`} />}>
                Continue <ArrowRight className="size-4" />
              </Button>
            </>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              No concepts published yet — check back soon.
            </p>
          )}
        </div>

        {/* Progress */}
        <div className="flex flex-col rounded-2xl border border-border bg-card p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Knowledge map progress
          </p>
          <div className="mt-3 flex items-baseline gap-2">
            <p className="font-heading text-4xl font-semibold tabular-nums">{pct}%</p>
            <p className="text-sm text-muted-foreground">complete</p>
          </div>
          <Progress value={pct} className="mt-4 h-2.5" />
          <p className="mt-2.5 text-sm text-muted-foreground">
            {summary.completed} of {summary.total} concepts completed
          </p>
          <Button variant="outline" className="mt-auto w-full" render={<Link href="/learn" />}>
            View knowledge map
          </Button>
        </div>
      </div>

      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Keep the momentum going
        </p>
        <div className="grid gap-6 sm:grid-cols-3">
          <DashboardCta
            icon={Swords}
            iconClassName="bg-primary/10 text-primary"
            title={todaysChallenge ? todaysChallenge.title : "AI Arena"}
            description={
              todaysChallenge
                ? `Today's challenge · +${todaysChallenge.xpReward} XP`
                : "You've solved everything published — nice work."
            }
            href={todaysChallenge ? `/arena/${todaysChallenge.slug}` : "/arena"}
            cta={todaysChallenge ? "Take the challenge" : "Browse the arena"}
          />
          <DashboardCta
            icon={Map}
            iconClassName="bg-success/10 text-success"
            title={roadmap ? roadmap.title : "Your roadmap"}
            description={
              roadmap
                ? "Pick up your personalized learning path."
                : "Get a personalized path based on your goals."
            }
            href="/roadmap"
            cta={roadmap ? "View roadmap" : "Generate a roadmap"}
          />
          <DashboardCta
            icon={Hammer}
            iconClassName="bg-chart-4/15 text-chart-4"
            title="Projects"
            description={
              savedProjects.length > 0
                ? `${savedProjects.length} project${savedProjects.length > 1 ? "s" : ""} in progress`
                : "Find a project that matches your level."
            }
            href="/projects"
            cta="Browse projects"
          />
        </div>
      </div>
    </div>
  );
}

function DashboardCta({
  icon: Icon,
  iconClassName,
  title,
  description,
  href,
  cta,
}: {
  icon: LucideIcon;
  iconClassName: string;
  title: string;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <span className={cn("flex size-10 items-center justify-center rounded-full", iconClassName)}>
        <Icon className="size-5" strokeWidth={1.75} />
      </span>
      <h3 className="mt-4 font-heading text-base font-semibold">{title}</h3>
      <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
        {cta} <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
