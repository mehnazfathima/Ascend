"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { OptionGroup } from "@/components/roadmap/option-group";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CAREER_GOALS } from "@/lib/career-goals";
import { generateRoadmapAction } from "@/lib/actions/roadmap";
import type { RoadmapSurveyInput } from "@/lib/validations/roadmap";

const timeOptions = [15, 30, 60, 90, 120];

export function RoadmapForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<RoadmapSurveyInput>({
    currentLevel: "complete-beginner",
    pythonLevel: "none",
    mathLevel: "none",
    careerGoal: "explore",
    dailyMinutes: 30,
    learningStyle: "hands-on",
  });

  function submit() {
    setError(null);
    startTransition(async () => {
      const result = await generateRoadmapAction(form);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <div className="space-y-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div>
        <h1 className="font-heading text-2xl font-semibold">Build your roadmap</h1>
        <p className="mt-1 text-muted-foreground">
          A few questions, and we&apos;ll order the knowledge map around your goal.
        </p>
      </div>

      <OptionGroup
        label="How would you describe your AI knowledge today?"
        value={form.currentLevel}
        onChange={(v) => setForm((f) => ({ ...f, currentLevel: v }))}
        options={[
          { value: "complete-beginner", label: "Complete beginner" },
          { value: "some-basics", label: "Some basics" },
          { value: "intermediate", label: "Intermediate" },
        ]}
      />

      <OptionGroup
        label="Python experience?"
        value={form.pythonLevel}
        onChange={(v) => setForm((f) => ({ ...f, pythonLevel: v }))}
        options={[
          { value: "none", label: "None" },
          { value: "basic", label: "Basic" },
          { value: "comfortable", label: "Comfortable" },
        ]}
      />

      <OptionGroup
        label="Math experience?"
        value={form.mathLevel}
        onChange={(v) => setForm((f) => ({ ...f, mathLevel: v }))}
        options={[
          { value: "none", label: "None" },
          { value: "basic", label: "Basic" },
          { value: "comfortable", label: "Comfortable" },
        ]}
      />

      <OptionGroup
        label="Preferred learning style?"
        value={form.learningStyle}
        onChange={(v) => setForm((f) => ({ ...f, learningStyle: v }))}
        options={[
          { value: "reading", label: "Reading" },
          { value: "visual", label: "Visual" },
          { value: "hands-on", label: "Hands-on" },
        ]}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-medium">Career goal</p>
          <Select
            value={form.careerGoal}
            onValueChange={(v) => setForm((f) => ({ ...f, careerGoal: v as string }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CAREER_GOALS.map((goal) => (
                <SelectItem key={goal.slug} value={goal.slug}>
                  {goal.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium">Time available per day</p>
          <Select
            value={String(form.dailyMinutes)}
            onValueChange={(v) => setForm((f) => ({ ...f, dailyMinutes: Number(v) }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map((m) => (
                <SelectItem key={m} value={String(m)}>
                  {m} minutes
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button onClick={submit} disabled={pending} size="lg" className="w-full sm:w-auto">
        {pending ? "Building your roadmap…" : "Generate my roadmap"}
      </Button>
    </div>
  );
}
