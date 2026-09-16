"use client";

import { useTransition } from "react";
import { Bookmark, PlayCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setUserProjectStatusAction } from "@/lib/actions/projects";
import type { ProjectStatus } from "@/lib/constants";
import { toast } from "sonner";

export function ProjectStatusActions({
  projectId,
  status,
}: {
  projectId: string;
  status?: ProjectStatus;
}) {
  const [pending, startTransition] = useTransition();

  function setStatus(next: ProjectStatus, message?: string) {
    startTransition(async () => {
      await setUserProjectStatusAction(projectId, next);
      if (message) toast.success(message);
    });
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={status === "SAVED" ? "secondary" : "outline"}
        disabled={pending}
        onClick={() => setStatus("SAVED", "Saved to your projects")}
      >
        <Bookmark className="size-4" /> Save
      </Button>
      <Button
        variant={status === "IN_PROGRESS" ? "secondary" : "outline"}
        disabled={pending}
        onClick={() => setStatus("IN_PROGRESS", "Marked in progress")}
      >
        <PlayCircle className="size-4" /> Start
      </Button>
      <Button
        variant={status === "COMPLETED" ? "secondary" : "default"}
        disabled={pending}
        onClick={() => setStatus("COMPLETED", "Nice — project completed")}
      >
        <CheckCircle2 className="size-4" /> Mark complete
      </Button>
    </div>
  );
}
