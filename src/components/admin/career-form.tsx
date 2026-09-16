"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertCareerPathAction, type CareerFormInput } from "@/lib/actions/admin";

type ConceptOption = { id: string; title: string };

export function CareerForm({
  originalSlug,
  allConcepts,
  defaultValues,
}: {
  originalSlug: string | null;
  allConcepts: ConceptOption[];
  defaultValues: CareerFormInput;
}) {
  const router = useRouter();
  const [form, setForm] = useState<CareerFormInput>(defaultValues);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof CareerFormInput>(key: K, value: CareerFormInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    const result = await upsertCareerPathAction(originalSlug, form);
    setSubmitting(false);
    if (!result.ok) return setError(result.error);
    toast.success("Saved");
    router.push("/admin/careers");
    router.refresh();
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Slug"><Input value={form.slug} onChange={(e) => set("slug", e.target.value)} /></Field>
        <Field label="Title"><Input value={form.title} onChange={(e) => set("title", e.target.value)} /></Field>
      </div>
      <Field label="Description">
        <Textarea rows={2} value={form.description} onChange={(e) => set("description", e.target.value)} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Skills (one per line)">
          <Textarea rows={4} value={form.skills} onChange={(e) => set("skills", e.target.value)} />
        </Field>
        <Field label="Tools (one per line)">
          <Textarea rows={4} value={form.tools} onChange={(e) => set("tools", e.target.value)} />
        </Field>
        <Field label="Example applications (one per line)">
          <Textarea rows={4} value={form.exampleApplications} onChange={(e) => set("exampleApplications", e.target.value)} />
        </Field>
      </div>
      <Field label="Order">
        <Input type="number" value={form.order} onChange={(e) => set("order", Number(e.target.value))} />
      </Field>
      <Field label="Required concepts">
        <div className="grid max-h-48 grid-cols-2 gap-1.5 overflow-y-auto rounded-lg border border-border p-3">
          {allConcepts.map((c) => (
            <label key={c.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.conceptIds.includes(c.id)}
                onChange={(e) =>
                  set(
                    "conceptIds",
                    e.target.checked
                      ? [...form.conceptIds, c.id]
                      : form.conceptIds.filter((id) => id !== c.id)
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
        {submitting ? "Saving…" : "Save career path"}
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
