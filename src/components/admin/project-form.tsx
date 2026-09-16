"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { upsertProjectTemplateAction, type ProjectFormInput } from "@/lib/actions/admin";
import { PROJECT_DIFFICULTIES } from "@/lib/constants";

type ConceptOption = { id: string; title: string };
type CareerOption = { id: string; title: string };

export function ProjectForm({
  originalSlug,
  allConcepts,
  careers,
  defaultValues,
}: {
  originalSlug: string | null;
  allConcepts: ConceptOption[];
  careers: CareerOption[];
  defaultValues: ProjectFormInput;
}) {
  const router = useRouter();
  const [form, setForm] = useState<ProjectFormInput>(defaultValues);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof ProjectFormInput>(key: K, value: ProjectFormInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    const result = await upsertProjectTemplateAction(originalSlug, form);
    setSubmitting(false);
    if (!result.ok) return setError(result.error);
    toast.success("Saved");
    router.push("/admin/projects");
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
        <Field label="Domain">
          <Input value={form.domain} onChange={(e) => set("domain", e.target.value)} placeholder="tabular / computer-vision / nlp / genai" />
        </Field>
        <Field label="Difficulty">
          <Select value={form.difficulty} onValueChange={(v) => set("difficulty", v as string)}>
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              {PROJECT_DIFFICULTIES.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Career path (optional)">
          <Select value={form.careerId ?? "none"} onValueChange={(v) => set("careerId", v === "none" ? null : v)}>
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {careers.map((c) => <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Skills practiced (one per line)">
          <Textarea rows={4} value={form.skillsPracticed} onChange={(e) => set("skillsPracticed", e.target.value)} />
        </Field>
        <Field label="Tech stack (one per line)">
          <Textarea rows={4} value={form.techStack} onChange={(e) => set("techStack", e.target.value)} />
        </Field>
      </div>
      <Field label="Milestones (one per line, in order)">
        <Textarea rows={5} value={form.milestones} onChange={(e) => set("milestones", e.target.value)} />
      </Field>
      <Field label="Expected result">
        <Textarea rows={2} value={form.expectedResult} onChange={(e) => set("expectedResult", e.target.value)} />
      </Field>
      <Field label="Advanced ideas (one per line)">
        <Textarea rows={3} value={form.advancedIdeas} onChange={(e) => set("advancedIdeas", e.target.value)} />
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
        {submitting ? "Saving…" : "Save project"}
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
