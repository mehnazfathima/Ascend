import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MarketingMobileNav } from "@/components/marketing/marketing-mobile-nav";

const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#knowledge-map", label: "Knowledge map" },
  { href: "/career", label: "Careers" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="font-heading text-lg font-semibold tracking-tight">
          ASCEND
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <MarketingMobileNav />
          <Button variant="ghost" size="sm" render={<Link href="/login" />}>
            Log in
          </Button>
          <Button size="sm" render={<Link href="/signup" />}>
            Start Learning
          </Button>
        </div>
      </nav>
    </header>
  );
}
