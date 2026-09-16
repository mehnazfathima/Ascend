import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <span className="font-heading font-semibold text-foreground">ASCEND</span>
        <p>Learn. Understand. Build.</p>
        <div className="flex gap-5">
          <Link href="/career" className="hover:text-foreground">Careers</Link>
          <Link href="/skill-test" className="hover:text-foreground">Skill Test</Link>
          <Link href="/login" className="hover:text-foreground">Log in</Link>
        </div>
      </div>
    </footer>
  );
}
