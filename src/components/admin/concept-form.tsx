"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { upsertConceptAction, type ConceptFormInput } from "@/lib/actions/admin";

type Level = { id: string; index: number; title: string };
type ConceptOption = { id: string; slug: string; title: string };

export function ConceptForm({
  originalSlug,
  levels,
  otherConcepts,
  defaultValues,
}: {
  originalSlug: string | null;
  levels: Level[];
  otherConcepts: ConceptOption[];
  defaultValues: ConceptFormInput;
}) {
  const router = useRouter();
  const [form, setForm] = useState<ConceptFormInput>(defaultValues);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof ConceptFormInput>(key: K, value: ConceptFormInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    const result = await upsertConceptAction(originalSlug, form);
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    toast.success("Saved");
    router.push("/admin/concepts");
    router.refresh();
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Slug">
          <Input value={form.slug} onChange={(e) => set("slug", e.target.value)} />
        </Field>
        <Field label="Title">
          <Input value={form.title} onChange={(e) => set("title", e.target.value)} />
        </Field>
      </div>

      <Field label={'Card label (short name shown on the grid card, e.g. "RAG")'}>
        <Input value={form.cardLabel} onChange={(e) => set("cardLabel", e.target.value)} />
      </Field>

      <Field label="One-liner">
        <Input value={form.oneLiner} onChange={(e) => set("oneLiner", e.target.value)} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Level">
          <Select value={form.levelId} onValueChange={(v) => set("levelId", v as string)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {levels.map((l) => (
                <SelectItem key={l.id} value={l.id}>
                  {l.index} · {l.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Order">
          <Input
            type="number"
            value={form.order}
            onChange={(e) => set("order", Number(e.target.value))}
          />
        </Field>
        <Field label="Estimated minutes">
          <Input
            type="number"
            value={form.estimatedMinutes}
            onChange={(e) => set("estimatedMinutes", Number(e.target.value))}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Real-world examples (one per line)">
          <Textarea
            rows={4}
            value={form.realWorldExamples}
            onChange={(e) => set("realWorldExamples", e.target.value)}
          />
        </Field>
        <Field label="Tags (one per line)">
          <Textarea rows={4} value={form.tags} onChange={(e) => set("tags", e.target.value)} />
        </Field>
      </div>

      <div className="flex items-center gap-3">
        <Switch checked={form.published} onCheckedChange={(v) => set("published", v)} />
        <span className="text-sm">Published</span>
      </div>

      <div className="space-y-4 rounded-xl border border-border p-4">
        <p className="text-sm font-medium">Explanations</p>
        <Field label="🟢 Simple">
          <Textarea rows={4} value={form.simple} onChange={(e) => set("simple", e.target.value)} />
        </Field>
        <Field label="🟡 Understand">
          <Textarea
            rows={5}
            value={form.understand}
            onChange={(e) => set("understand", e.target.value)}
          />
        </Field>
        <Field label="🔵 Deep dive">
          <Textarea rows={5} value={form.deep} onChange={(e) => set("deep", e.target.value)} />
        </Field>
      </div>

      <Field label="Sections (raw JSON array — kind, title, body?, code?, visualizerKey?, data?, order)">
        <Textarea
          rows={8}
          className="font-mono text-xs"
          placeholder='[{"kind":"CODE","title":"Code","code":"print(1)","order":0}]'
          value={form.sectionsJson}
          onChange={(e) => set("sectionsJson", e.target.value)}
        />
      </Field>

      <Field label="Prerequisites">
        <div className="grid max-h-48 grid-cols-2 gap-1.5 overflow-y-auto rounded-lg border border-border p-3">
          {otherConcepts.map((c) => (
            <label key={c.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.prerequisiteIds.includes(c.id)}
                onChange={(e) =>
                  set(
                    "prerequisiteIds",
                    e.target.checked
                      ? [...form.prerequisiteIds, c.id]
                      : form.prerequisiteIds.filter((id) => id !== c.id)
                  )
                }
              />
              {c.title}
            </label>
          ))}
        </div>
      </Field>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button onClick={handleSubmit} disabled={submitting} size="lg">
        {submitting ? "Saving…" : "Save concept"}
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
