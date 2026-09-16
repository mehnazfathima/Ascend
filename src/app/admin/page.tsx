import type { Metadata } from "next";
import { getAdminOverview } from "@/lib/queries/admin";
import { BarList } from "@/components/admin/bar-list";

export const metadata: Metadata = { title: "Admin Overview" };

export default async function AdminOverviewPage() {
  const data = await getAdminOverview();

  return (
    <div className="max-w-6xl space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-semibold">Overview</h1>
        <p className="mt-1 text-muted-foreground">How ASCEND is actually being used.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Total users" value={data.totalUsers} />
        <StatCard label="New (7d)" value={data.newUsers7d} />
        <StatCard label="New (30d)" value={data.newUsers30d} />
        <StatCard label="Active (7d)" value={data.activeUsers7d} />
        <StatCard label="Arena attempts" value={data.arena.totalAttempts} sub={`${data.arena.correctRate}% correct`} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Skill test attempts" value={data.skillTest.totalAttempts} sub={`avg score ${data.skillTest.avgScore}%`} />
        <StatCard label="Most attempted challenge" value={data.arena.topChallenges[0]?.title ?? "—"} />
        <StatCard label="Most popular concept" value={data.mostPopularConcepts[0]?.title ?? "—"} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 font-heading text-base font-semibold">Most popular concepts</h2>
          <BarList items={data.mostPopularConcepts} colorVar="--chart-1" />
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 font-heading text-base font-semibold">Most completed concepts</h2>
          <BarList items={data.mostCompletedConcepts} colorVar="--chart-2" />
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 font-heading text-base font-semibold">Top Arena challenges</h2>
          <BarList items={data.arena.topChallenges} colorVar="--chart-3" />
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 font-heading text-base font-semibold">Popular career goals (roadmap)</h2>
          <BarList items={data.popularCareerGoals} colorVar="--chart-4" />
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
          <h2 className="mb-4 font-heading text-base font-semibold">Popular projects</h2>
          <BarList items={data.popularProjects} colorVar="--chart-5" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1.5 truncate font-heading text-xl font-semibold" title={String(value)}>
        {value}
      </p>
      {sub && <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}
