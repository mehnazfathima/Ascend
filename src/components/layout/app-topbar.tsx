import { Flame, Zap } from "lucide-react";
import { MobileNav } from "@/components/layout/mobile-nav";
import { UserMenu } from "@/components/layout/user-menu";

export function AppTopbar({
  name,
  email,
  image,
  isAdmin,
  xp,
  streak,
}: {
  name: string;
  email: string;
  image?: string | null;
  isAdmin?: boolean;
  xp: number;
  streak: number;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/60 bg-background/80 px-4 backdrop-blur-md lg:px-8">
      <div className="flex items-center gap-2">
        <MobileNav isAdmin={isAdmin} />
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-3 sm:flex">
          <span className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            <Flame className="size-3.5 text-primary" /> {streak}
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            <Zap className="size-3.5 text-primary" /> {xp} XP
          </span>
        </div>
        <UserMenu name={name} email={email} image={image} />
      </div>
    </header>
  );
}
