"use client";

import { useState } from "react";
import { cn } from "cn";
import { CheckCircle2, XCircle } from "lucide-react";
import type { McqChallengeData } from "@/lib/arena-types";

export function McqChallenge({
  data,
  onAnswer,
}: {
  data: McqChallengeData;
  onAnswer: (correct: boolean) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  function submit(i: number) {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    onAnswer(i === data.answerIndex);
  }

  return (
    <div className="space-y-4">
      {data.code && (
        <pre className="overflow-x-auto rounded-lg border border-border bg-foreground p-4 text-sm text-background">
          <code className="font-mono">{data.code}</code>
        </pre>
      )}
      <div className="grid gap-2">
        {data.options.map((option, i) => {
          const isCorrect = i === data.answerIndex;
          const isSelected = i === selected;
          return (
            <button
              key={i}
              type="button"
              onClick={() => submit(i)}
              disabled={answered}
              className={cn(
                "flex items-center justify-between rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                !answered && "border-border hover:border-primary/50 hover:bg-muted/40",
                answered && isCorrect && "border-success bg-success/10",
                answered && isSelected && !isCorrect && "border-destructive bg-destructive/10",
                answered && !isSelected && !isCorrect && "border-border opacity-60"
              )}
            >
              {option}
              {answered && isCorrect && <CheckCircle2 className="size-4 text-success" />}
              {answered && isSelected && !isCorrect && <XCircle className="size-4 text-destructive" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
