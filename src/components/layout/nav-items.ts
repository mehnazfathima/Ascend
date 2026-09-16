import {
  LayoutDashboard,
  Layers,
  Map,
  Target,
  Swords,
  Compass,
  Hammer,
  User,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/learn", label: "Learn", icon: Layers },
  { href: "/roadmap", label: "Roadmap", icon: Map },
  { href: "/skill-test", label: "Skill Test", icon: Target },
  { href: "/arena", label: "AI Arena", icon: Swords },
  { href: "/career", label: "Career Map", icon: Compass },
  { href: "/projects", label: "Projects", icon: Hammer },
  { href: "/profile", label: "Profile", icon: User },
];
