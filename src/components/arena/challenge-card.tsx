import Link from "next/link";
import { CheckCircle2, Zap } from "lucide-react";
import { cn } from "cn";

const difficultyColor: Record<string, string> = {
  EASY: "text-success",
  MEDIUM: "text-primary",
  HARD: "text-destructive",
};

export function ChallengeCard({
  slug,
  title,
  category,
  difficulty,
  xpReward,
  solved,
}: {
  slug: string;
  title: string;
  category: string;
  difficulty: string;
  xpReward: number;
  solved: boolean;
}) {
  return (
    <Link
      href={`/arena/${slug}`}
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md",
        solved && "bg-success/5"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {category.replace("-", " ")}
        </span>
        {solved && <CheckCircle2 className="size-4 text-success" />}
      </div>
      <h3 className="font-heading text-base font-semibold leading-snug">{title}</h3>
      <div className="mt-auto flex items-center justify-between pt-1 text-xs">
        <span className={cn("font-medium", difficultyColor[difficulty] ?? "text-muted-foreground")}>
          {difficulty}
        </span>
        <span className="flex items-center gap-1 text-muted-foreground">
          <Zap className="size-3.5" /> {xpReward} XP
        </span>
      </div>
    </Link>
  );
}
