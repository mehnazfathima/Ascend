"use client";

import { useTransition } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setConceptProgressAction } from "@/lib/actions/progress";
import { toast } from "sonner";

export function MarkCompleteButton({
  conceptSlug,
  status,
}: {
  conceptSlug: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
}) {
  const [pending, startTransition] = useTransition();
  const completed = status === "COMPLETED";

  function toggle() {
    startTransition(async () => {
      await setConceptProgressAction(conceptSlug, completed ? "NOT_STARTED" : "COMPLETED");
      if (!completed) toast.success("Concept completed — +20 XP");
    });
  }

  return (
    <Button
      onClick={toggle}
      disabled={pending}
      variant={completed ? "secondary" : "default"}
    >
      <CheckCircle2 className="size-4" />
      {completed ? "Completed" : "Mark as complete"}
    </Button>
  );
}
