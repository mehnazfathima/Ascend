import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { getCareerPaths } from "@/lib/queries/careers";
import { parseStringArray } from "@/lib/content-types";

export const metadata: Metadata = { title: "Career Map" };

export default async function CareerMapPage() {
  const careers = await getCareerPaths();

  return (
    <div>
      <div className="mb-10 text-center">
        <Compass className="mx-auto size-10 text-primary" strokeWidth={1.5} />
        <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight">
          What can AI take you toward?
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          Pick a path to see exactly what to learn, what tools to know, and
          where it&apos;s actually used.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {careers.map((career) => {
          const skills = parseStringArray(career.skills);
          return (
            <Link
              key={career.id}
              href={`/career/${career.slug}`}
              className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <h3 className="font-heading text-base font-semibold">{career.title}</h3>
              <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">
                {career.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {skills.slice(0, 3).map((skill) => (
                  <span key={skill} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">
                    {skill}
                  </span>
                ))}
              </div>
              <span className="mt-1 flex items-center gap-1 text-sm font-medium text-primary">
                See the path <ArrowRight className="size-3.5" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
