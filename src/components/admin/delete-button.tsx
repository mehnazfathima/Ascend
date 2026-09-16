"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function DeleteButton({
  action,
  confirmMessage = "Delete this? This can't be undone.",
}: {
  action: () => Promise<void>;
  confirmMessage?: string;
}) {
  const [pending, startTransition] = useTransition();

  function handleClick() {
    if (!window.confirm(confirmMessage)) return;
    startTransition(async () => {
      try {
        await action();
        toast.success("Deleted");
      } catch {
        toast.error("Couldn't delete that");
      }
    });
  }

  return (
    <Button variant="ghost" size="icon" disabled={pending} onClick={handleClick} aria-label="Delete">
      <Trash2 className="size-4 text-destructive" />
    </Button>
  );
}
