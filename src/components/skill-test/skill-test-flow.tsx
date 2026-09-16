"use client";

import { useState } from "react";
import { Target, Clock, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SkillTestRunner } from "@/components/skill-test/skill-test-runner";

type Question = {
  id: string;
  type: string;
  category: string;
  difficulty: string;
  prompt: string;
  data: string;
};

export function SkillTestFlow({ questions }: { questions: Question[] }) {
  const [started, setStarted] = useState(false);

  if (started) return <SkillTestRunner questions={questions} />;

  return (
    <div className="text-center">
      <Target className="mx-auto size-10 text-primary" strokeWidth={1.5} />
      <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight">
        Where do you actually stand?
      </h1>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">
        Scenario and reasoning questions across AI fundamentals, Python, math,
        ML, and deep learning — not trivia. Find out what to learn next.
      </p>
      <div className="mx-auto mt-6 flex max-w-sm items-center justify-center gap-6 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <ListChecks className="size-4" /> {questions.length} questions
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="size-4" /> ~{Math.max(5, Math.round(questions.length * 0.8))} min
        </span>
      </div>
      <Button size="lg" className="mt-8" onClick={() => setStarted(true)} disabled={questions.length === 0}>
        {questions.length === 0 ? "No questions published yet" : "Start the skill test"}
      </Button>
    </div>
  );
}
