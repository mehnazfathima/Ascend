import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ArrowRight } from "lucide-react";
import { auth } from "@/lib/auth";
import { getCareerBySlug } from "@/lib/queries/careers";
import { parseStringArray } from "@/lib/content-types";
import { Button } from "@/components/ui/button";
import { LevelBadge } from "@/components/concept/level-badge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const career = await getCareerBySlug(slug);
  return { title: career?.title ?? "Career" };
}

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [career, session] = await Promise.all([getCareerBySlug(slug), auth()]);
  if (!career) notFound();

  const skills = parseStringArray(career.skills);
  const tools = parseStringArray(career.tools);
  const applications = parseStringArray(career.exampleApplications);

  const byLevel = new Map<string, { index: number; title: string; theme: string; concepts: typeof career.concepts }>();
  for (const link of career.concepts) {
    const level = link.concept.level;
    const key = level.id;
    if (!byLevel.has(key)) {
      byLevel.set(key, { index: level.index, title: level.title, theme: level.colorTheme, concepts: [] });
    }
    byLevel.get(key)!.concepts.push(link);
  }
  const levels = Array.from(byLevel.values()).sort((a, b) => a.index - b.index);

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/career" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="size-4" /> Back to Career Map
      </Link>

      <h1 className="font-heading text-3xl font-semibold tracking-tight">{career.title}</h1>
      <p className="mt-3 text-lg text-muted-foreground">{career.description}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button size="lg" render={<Link href={session?.user ? "/roadmap" : "/signup"} />}>
          Build my roadmap for this <ArrowRight className="size-4" />
        </Button>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-heading text-base font-semibold">Skills required</h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {skills.map((s) => (
              <span key={s} className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">{s}</span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-heading text-base font-semibold">Tools & technologies</h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tools.map((t) => (
              <span key={t} className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-5">
        <h3 className="font-heading text-base font-semibold">Where this shows up</h3>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {applications.map((a) => (
            <li key={a} className="rounded-lg bg-muted/30 px-3.5 py-2.5 text-sm text-foreground/90">{a}</li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 font-heading text-lg font-semibold">Concepts required</h3>
        <div className="space-y-6">
          {levels.map((level) => (
            <div key={level.title}>
              <LevelBadge index={level.index} title={level.title} theme={level.theme} />
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {level.concepts.map((link) => (
                  <Link
                    key={link.conceptId}
                    href={`/learn/${link.concept.slug}`}
                    className="rounded-lg border border-border px-3.5 py-2.5 text-sm hover:border-primary/40 hover:bg-muted/40"
                  >
                    {link.concept.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
