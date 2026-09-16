"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export function RegenerateToggle({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <Button variant="outline" onClick={() => setOpen(true)}>
        <RefreshCw className="size-4" /> Regenerate roadmap
      </Button>
    );
  }

  return <div className="mt-4">{children}</div>;
}
