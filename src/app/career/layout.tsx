import { PublicShell } from "@/components/layout/public-shell";

export default function CareerLayout({ children }: { children: React.ReactNode }) {
  return <PublicShell maxWidth="max-w-5xl">{children}</PublicShell>;
}
