"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { upsertArenaChallengeAction, type ArenaFormInput } from "@/lib/actions/admin";
import { ARENA_CHALLENGE_TYPES, DIFFICULTIES } from "@/lib/constants";

export function ArenaForm({
  originalSlug,
  defaultValues,
}: {
  originalSlug: string | null;
  defaultValues: ArenaFormInput;
}) {
  const router = useRouter();
  const [form, setForm] = useState<ArenaFormInput>(defaultValues);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof ArenaFormInput>(key: K, value: ArenaFormInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    const result = await upsertArenaChallengeAction(originalSlug, form);
    setSubmitting(false);
    if (!result.ok) return setError(result.error);
    toast.success("Saved");
    router.push("/admin/arena");
    router.refresh();
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Slug">
          <Input value={form.slug} onChange={(e) => set("slug", e.target.value)} />
        </Field>
        <Field label="Title">
          <Input value={form.title} onChange={(e) => set("title", e.target.value)} />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Category">
          <Input value={form.category} onChange={(e) => set("category", e.target.value)} />
        </Field>
        <Field label="Type">
          <Select value={form.type} onValueChange={(v) => set("type", v as string)}>
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              {ARENA_CHALLENGE_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Difficulty">
          <Select value={form.difficulty} onValueChange={(v) => set("difficulty", v as string)}>
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              {DIFFICULTIES.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
      </div>
      <Field label="Prompt">
        <Textarea rows={2} value={form.prompt} onChange={(e) => set("prompt", e.target.value)} />
      </Field>
      <Field label='Data (raw JSON — shape depends on type, e.g. {"options":[...],"answerIndex":0} or {"kind":"order-steps","items":[...]})'>
        <Textarea
          rows={8}
          className="font-mono text-xs"
          value={form.dataJson}
          onChange={(e) => set("dataJson", e.target.value)}
        />
      </Field>
      <Field label="Explanation">
        <Textarea rows={2} value={form.explanation} onChange={(e) => set("explanation", e.target.value)} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="XP reward">
          <Input type="number" value={form.xpReward} onChange={(e) => set("xpReward", Number(e.target.value))} />
        </Field>
        <div className="flex items-end gap-3 pb-2">
          <Switch checked={form.published} onCheckedChange={(v) => set("published", v)} />
          <span className="text-sm">Published</span>
        </div>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button onClick={handleSubmit} disabled={submitting} size="lg">
        {submitting ? "Saving…" : "Save challenge"}
      </Button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
