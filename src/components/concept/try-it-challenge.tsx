"use client";

import { useState } from "react";
import { cn } from "cn";
import { CheckCircle2, XCircle } from "lucide-react";
import type { TryItChallenge } from "@/lib/content-types";

export function TryItChallengeBlock({ challenge }: { challenge: TryItChallenge }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  if (!challenge.options || challenge.answerIndex === undefined) {
    return (
      <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm text-foreground/90">
        {challenge.prompt}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">{challenge.prompt}</p>
      <div className="grid gap-2">
        {challenge.options.map((option, i) => {
          const isCorrect = i === challenge.answerIndex;
          const isSelected = i === selected;
          return (
            <button
              key={i}
              type="button"
              onClick={() => {
                setSelected(i);
                setRevealed(true);
              }}
              className={cn(
                "flex items-center justify-between rounded-lg border px-3.5 py-2.5 text-left text-sm transition-colors",
                !revealed && "border-border hover:border-primary/50 hover:bg-muted/50",
                revealed && isCorrect && "border-success bg-success/10",
                revealed && isSelected && !isCorrect && "border-destructive bg-destructive/10",
                revealed && !isSelected && !isCorrect && "border-border opacity-60"
              )}
            >
              {option}
              {revealed && isCorrect && <CheckCircle2 className="size-4 text-success" />}
              {revealed && isSelected && !isCorrect && (
                <XCircle className="size-4 text-destructive" />
              )}
            </button>
          );
        })}
      </div>
      {revealed && challenge.explanation && (
        <p className="rounded-lg bg-muted/40 p-3 text-sm text-muted-foreground">
          {challenge.explanation}
        </p>
      )}
    </div>
  );
}
