import type { Metadata } from "next";
import Link from "next/link";
import { Flame, Zap, BookOpenCheck, Swords, Target } from "lucide-react";
import { auth } from "@/lib/auth";
import { getProfileData } from "@/lib/queries/profile";
import { EditProfileForm } from "@/components/profile/edit-profile-form";
import { ShareCard } from "@/components/share/share-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const metadata: Metadata = { title: "Profile" };

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

export default async function ProfilePage() {
  const session = await auth();
  const data = await getProfileData(session!.user.id);
  const { user, stats, completedConcepts, skillTestAttempts, arena, projects } = data;

  const bestScore = skillTestAttempts.reduce(
    (max, a) => Math.max(max, a.scorePercent ?? 0),
    0
  );

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <div className="flex flex-wrap items-center gap-4">
        <Avatar className="size-16">
          {user.image && <AvatarImage src={user.image} alt={user.name} />}
          <AvatarFallback className="text-lg">{initials(user.name)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-heading text-2xl font-semibold">{user.name}</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile icon={Flame} label="Day streak" value={stats?.streakCount ?? 0} />
        <StatTile icon={Zap} label="Total XP" value={stats?.xp ?? 0} />
        <StatTile icon={BookOpenCheck} label="Concepts completed" value={completedConcepts.length} />
        <StatTile icon={Swords} label="Arena accuracy" value={`${arena.accuracy}%`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 font-heading text-lg font-semibold">Edit profile</h2>
          <EditProfileForm
            defaultValues={{ name: user.name, bio: user.bio ?? "", goal: user.goal ?? "" }}
          />
        </div>

        <ShareCard
          eyebrow="ASCEND"
          headline={`${user.name.split(" ")[0]}'s learning progress`}
          stat={`${completedConcepts.length}`}
          statLabel="concepts completed"
          shareText={`I've completed ${completedConcepts.length} AI concepts on ASCEND with a ${stats?.streakCount ?? 0}-day streak. Learn AI from zero at ASCEND.`}
        />
      </div>

      {skillTestAttempts.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-3 flex items-center gap-2 font-heading text-lg font-semibold">
            <Target className="size-4 text-primary" /> Skill test
          </h2>
          <p className="text-sm text-muted-foreground">
            Best score: <span className="font-medium text-foreground">{bestScore}%</span> across{" "}
            {skillTestAttempts.length} attempt{skillTestAttempts.length > 1 ? "s" : ""}.
          </p>
        </div>
      )}

      {completedConcepts.length > 0 && (
        <div>
          <h2 className="mb-4 font-heading text-lg font-semibold">Recently completed</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {completedConcepts.map((p) => (
              <Link
                key={p.id}
                href={`/learn/${p.concept.slug}`}
                className="rounded-lg border border-border px-3.5 py-2.5 text-sm hover:border-primary/40 hover:bg-muted/40"
              >
                {p.concept.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div>
          <h2 className="mb-4 font-heading text-lg font-semibold">Projects</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {projects.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.project.slug}`}
                className="flex items-center justify-between rounded-lg border border-border px-3.5 py-2.5 text-sm hover:border-primary/40 hover:bg-muted/40"
              >
                {p.project.title}
                <span className="text-xs text-muted-foreground">{p.status.replace("_", " ").toLowerCase()}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatTile({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <Icon className="size-4 text-primary" />
      <p className="mt-2 font-heading text-2xl font-semibold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
