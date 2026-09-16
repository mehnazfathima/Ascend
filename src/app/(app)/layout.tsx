import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { AppTopbar } from "@/components/layout/app-topbar";
import Link from "next/link";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const stats = await prisma.userStats.findUnique({
    where: { userId: session.user.id },
  });

  const isAdmin = session.user.role === "ADMIN";

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-sidebar-border bg-sidebar px-4 py-6 lg:flex lg:flex-col">
        <Link href="/dashboard" className="mb-8 px-3 font-heading text-lg font-semibold tracking-tight">
          ASCEND
        </Link>
        <SidebarNav isAdmin={isAdmin} />
      </aside>
      <div className="flex min-h-screen flex-1 flex-col">
        <AppTopbar
          name={session.user.name ?? "You"}
          email={session.user.email ?? ""}
          image={session.user.image}
          isAdmin={isAdmin}
          xp={stats?.xp ?? 0}
          streak={stats?.streakCount ?? 0}
        />
        <main className="flex-1 px-4 py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
