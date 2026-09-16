"use client";

import { useState } from "react";
import { cn } from "cn";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BucketChallengeData } from "@/lib/arena-types";

export function BucketChallenge({
  data,
  onAnswer,
}: {
  data: BucketChallengeData;
  onAnswer: (correct: boolean) => void;
}) {
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  function assign(bucket: string) {
    if (!selectedItem || answered) return;
    setAssignments((prev) => ({ ...prev, [selectedItem]: bucket }));
    setSelectedItem(null);
  }

  function submit() {
    setAnswered(true);
    const correct = data.items.every((item) => assignments[item.label] === item.bucket);
    onAnswer(correct);
  }

  const allAssigned = data.items.every((item) => assignments[item.label]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {data.items.map((item) => {
          const assignedTo = assignments[item.label];
          const isCorrect = answered && assignedTo === item.bucket;
          const isWrong = answered && assignedTo && assignedTo !== item.bucket;
          return (
            <button
              key={item.label}
              type="button"
              disabled={!!assignedTo || answered}
              onClick={() => setSelectedItem(item.label)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                assignedTo && !answered && "opacity-40",
                !assignedTo && selectedItem === item.label && "border-primary bg-primary/5",
                !assignedTo && selectedItem !== item.label && "border-border hover:border-primary/40",
                isCorrect && "border-success bg-success/10 opacity-100",
                isWrong && "border-destructive bg-destructive/10 opacity-100"
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {data.buckets.map((bucket) => (
          <button
            key={bucket}
            type="button"
            onClick={() => assign(bucket)}
            disabled={answered}
            className="min-h-24 rounded-xl border-2 border-dashed border-border p-3 text-left transition-colors hover:border-primary/40"
          >
            <p className="mb-2 text-sm font-medium">{bucket}</p>
            <div className="flex flex-wrap gap-1.5">
              {data.items
                .filter((item) => assignments[item.label] === bucket)
                .map((item) => (
                  <span
                    key={item.label}
                    className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground"
                  >
                    {item.label}
                  </span>
                ))}
            </div>
          </button>
        ))}
      </div>

      {!answered && (
        <Button onClick={submit} disabled={!allAssigned}>
          <Check className="size-4" /> Check answers
        </Button>
      )}
    </div>
  );
}
