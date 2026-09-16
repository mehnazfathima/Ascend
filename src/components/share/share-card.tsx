"use client";

import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ShareCard({
  eyebrow,
  headline,
  stat,
  statLabel,
  shareText,
}: {
  eyebrow: string;
  headline: string;
  stat: string;
  statLabel: string;
  shareText: string;
}) {
  async function copyShareText() {
    try {
      await navigator.clipboard.writeText(shareText);
      toast.success("Copied — paste it anywhere");
    } catch {
      toast.error("Couldn't copy — try selecting the text manually");
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-foreground text-background">
      <div className="p-6 sm:p-8">
        <p className="text-xs font-medium uppercase tracking-wide text-background/50">{eyebrow}</p>
        <p className="mt-2 font-heading text-xl font-semibold leading-snug">{headline}</p>
        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="font-heading text-4xl font-semibold text-primary">{stat}</p>
            <p className="text-sm text-background/60">{statLabel}</p>
          </div>
          <span className="font-heading text-sm font-semibold tracking-tight text-background/70">ASCEND</span>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-background/10 bg-background/5 px-6 py-3 sm:px-8">
        <span className="text-xs text-background/50">Learn. Understand. Build.</span>
        <Button variant="secondary" size="sm" onClick={copyShareText}>
          <Share2 className="size-3.5" /> Share
        </Button>
      </div>
    </div>
  );
}
