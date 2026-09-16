import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import {
  LayoutDashboard,
  Users,
  Layers,
  Swords,
  Compass,
  Hammer,
  Target,
  ArrowLeft,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/concepts", label: "Concepts", icon: Layers },
  { href: "/admin/arena", label: "Arena Challenges", icon: Swords },
  { href: "/admin/careers", label: "Career Paths", icon: Compass },
  { href: "/admin/projects", label: "Projects", icon: Hammer },
  { href: "/admin/skill-test", label: "Skill Test Questions", icon: Target },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 border-r border-border bg-secondary/30 px-4 py-6 lg:flex lg:flex-col">
        <Link href="/admin" className="mb-6 px-2 font-heading text-base font-semibold tracking-tight">
          ASCEND Admin
        </Link>
        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground"
            >
              <item.icon className="size-4" strokeWidth={1.75} />
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> View as student
        </Link>
      </aside>
      <main className="flex-1 px-5 py-8 lg:px-10">{children}</main>
    </div>
  );
}
