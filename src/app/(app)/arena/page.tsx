import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { getChallenges, getUserSolvedSlugs, getLeaderboard } from "@/lib/queries/arena";
import { ChallengeCard } from "@/components/arena/challenge-card";
import { CATEGORY_LABELS } from "@/lib/arena-types";
import { Trophy } from "lucide-react";

export const metadata: Metadata = { title: "AI Arena" };

export default async function ArenaPage() {
  const session = await auth();
  const userId = session!.user.id;

  const [challenges, solvedSlugs, leaderboard] = await Promise.all([
    getChallenges(),
    getUserSolvedSlugs(userId),
    getLeaderboard(),
  ]);

  const byCategory = new Map<string, typeof challenges>();
  for (const c of challenges) {
    byCategory.set(c.category, [...(byCategory.get(c.category) ?? []), c]);
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-6">
        <div>
          <h1 className="font-heading text-2xl font-semibold">AI Arena</h1>
          <p className="mt-1 text-muted-foreground">
            Short, sharp challenges. Build XP, build a streak.
          </p>
        </div>
        <div className="w-full max-w-xs rounded-xl border border-border bg-card p-4 sm:w-auto">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <Trophy className="size-3.5" /> Leaderboard
          </p>
          <ol className="space-y-1.5">
            {leaderboard.slice(0, 5).map((entry, i) => (
              <li key={entry.id} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-4 text-muted-foreground">{i + 1}</span>
                  {entry.user.name}
                </span>
                <span className="font-medium">{entry.xp} XP</span>
              </li>
            ))}
            {leaderboard.length === 0 && (
              <li className="text-sm text-muted-foreground">No scores yet — be the first.</li>
            )}
          </ol>
        </div>
      </div>

      <div className="space-y-10">
        {Array.from(byCategory.entries()).map(([category, items]) => (
          <section key={category}>
            <h2 className="mb-4 font-heading text-lg font-semibold">
              {CATEGORY_LABELS[category] ?? category}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  slug={challenge.slug}
                  title={challenge.title}
                  category={challenge.category}
                  difficulty={challenge.difficulty}
                  xpReward={challenge.xpReward}
                  solved={solvedSlugs.has(challenge.slug)}
                />
              ))}
            </div>
          </section>
        ))}
        {challenges.length === 0 && (
          <p className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
            Challenges are coming soon.
          </p>
        )}
      </div>
    </div>
  );
}
