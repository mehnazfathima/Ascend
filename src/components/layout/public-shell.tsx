import Link from "next/link";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export async function PublicShell({
  children,
  maxWidth = "max-w-3xl",
}: {
  children: React.ReactNode;
  maxWidth?: string;
}) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60">
        <div className={`mx-auto flex h-16 items-center justify-between px-6 ${maxWidth}`}>
          <Link href="/" className="font-heading text-lg font-semibold tracking-tight">
            ASCEND
          </Link>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" render={<Link href={session?.user ? "/dashboard" : "/login"} />}>
              {session?.user ? "Dashboard" : "Log in"}
            </Button>
          </div>
        </div>
      </header>
      <main className={`mx-auto px-6 py-16 ${maxWidth}`}>{children}</main>
    </div>
  );
}
