"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { toggleUserDisabledAction } from "@/lib/actions/admin";

export function UserDisableToggle({
  userId,
  disabled,
  isSelf,
}: {
  userId: string;
  disabled: boolean;
  isSelf: boolean;
}) {
  const [pending, startTransition] = useTransition();

  function toggle(next: boolean) {
    startTransition(async () => {
      const result = await toggleUserDisabledAction(userId, next);
      if (!result.ok) toast.error(result.error);
    });
  }

  return (
    <Switch
      checked={!disabled}
      disabled={pending || isSelf}
      onCheckedChange={(checked) => toggle(!checked)}
      aria-label={disabled ? "Enable user" : "Disable user"}
    />
  );
}
