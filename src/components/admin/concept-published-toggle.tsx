"use client";

import { useTransition } from "react";
import { Switch } from "@/components/ui/switch";
import { toggleConceptPublishedAction } from "@/lib/actions/admin";
import { toast } from "sonner";

export function ConceptPublishedToggle({ slug, published }: { slug: string; published: boolean }) {
  const [pending, startTransition] = useTransition();

  function toggle(next: boolean) {
    startTransition(async () => {
      const result = await toggleConceptPublishedAction(slug, next);
      if (!result.ok) toast.error(result.error);
    });
  }

  return (
    <Switch
      checked={published}
      disabled={pending}
      onCheckedChange={toggle}
      aria-label={published ? "Unpublish" : "Publish"}
    />
  );
}
