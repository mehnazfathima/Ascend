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
import { upsertSkillTestQuestionAction, type SkillTestQuestionFormInput } from "@/lib/actions/admin";
import { SKILL_TEST_QUESTION_TYPES, DIFFICULTIES } from "@/lib/constants";

export function SkillTestQuestionForm({
  defaultValues,
}: {
  defaultValues: SkillTestQuestionFormInput;
}) {
  const router = useRouter();
  const [form, setForm] = useState<SkillTestQuestionFormInput>(defaultValues);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof SkillTestQuestionFormInput>(key: K, value: SkillTestQuestionFormInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    const result = await upsertSkillTestQuestionAction(form);
    setSubmitting(false);
    if (!result.ok) return setError(result.error);
    toast.success("Saved");
    router.push("/admin/skill-test");
    router.refresh();
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Category">
          <Input value={form.category} onChange={(e) => set("category", e.target.value)} placeholder="ai-fundamentals" />
        </Field>
        <Field label="Type">
          <Select value={form.type} onValueChange={(v) => set("type", v as string)}>
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              {SKILL_TEST_QUESTION_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
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
      <Field label='Data (raw JSON — {"scenario"?, "code"?, "options":[...], "answerIndex":0, "explanation":""})'>
        <Textarea
          rows={8}
          className="font-mono text-xs"
          value={form.dataJson}
          onChange={(e) => set("dataJson", e.target.value)}
        />
      </Field>
      <div className="flex items-center gap-3">
        <Switch checked={form.published} onCheckedChange={(v) => set("published", v)} />
        <span className="text-sm">Published</span>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button onClick={handleSubmit} disabled={submitting} size="lg">
        {submitting ? "Saving…" : "Save question"}
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
