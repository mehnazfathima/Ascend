import Link from "next/link";
import { Bookmark, CheckCircle2, PlayCircle } from "lucide-react";
import { cn } from "cn";

const difficultyColor: Record<string, string> = {
  BEGINNER: "text-success",
  INTERMEDIATE: "text-primary",
  ADVANCED: "text-chart-4",
  PORTFOLIO: "text-chart-5",
};

const statusIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  SAVED: Bookmark,
  IN_PROGRESS: PlayCircle,
  COMPLETED: CheckCircle2,
};

export function ProjectCard({
  slug,
  title,
  description,
  domain,
  difficulty,
  status,
}: {
  slug: string;
  title: string;
  description: string;
  domain: string;
  difficulty: string;
  status?: string;
}) {
  const StatusIcon = status ? statusIcon[status] : null;

  return (
    <Link
      href={`/projects/${slug}`}
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md",
        status === "COMPLETED" && "bg-success/5"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {domain.replace("-", " ")}
        </span>
        {StatusIcon && <StatusIcon className="size-4 text-primary" />}
      </div>
      <h3 className="font-heading text-base font-semibold leading-snug">{title}</h3>
      <p className="line-clamp-2 text-sm text-muted-foreground">{description}</p>
      <span className={cn("mt-auto pt-1 text-xs font-medium", difficultyColor[difficulty] ?? "text-muted-foreground")}>
        {difficulty}
      </span>
    </Link>
  );
}
