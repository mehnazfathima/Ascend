"use client";

import { useState } from "react";
import { ArrowUp, ArrowDown, Check } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import type { OrderStepsChallengeData } from "@/lib/arena-types";

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function OrderStepsChallenge({
  data,
  onAnswer,
}: {
  data: OrderStepsChallengeData;
  onAnswer: (correct: boolean) => void;
}) {
  const [order, setOrder] = useState<string[]>(() => shuffle(data.items));
  const [answered, setAnswered] = useState(false);

  function move(index: number, dir: -1 | 1) {
    if (answered) return;
    setOrder((current) => {
      const next = [...current];
      const target = index + dir;
      if (target < 0 || target >= next.length) return next;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function submit() {
    setAnswered(true);
    const correct = order.every((item, i) => item === data.items[i]);
    onAnswer(correct);
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Arrange these into the correct order.</p>
      <ol className="space-y-2">
        {order.map((item, i) => {
          const isCorrectPosition = data.items[i] === item;
          return (
            <li
              key={item}
              className={cn(
                "flex items-center gap-3 rounded-lg border px-3.5 py-2.5 text-sm",
                answered
                  ? isCorrectPosition
                    ? "border-success bg-success/10"
                    : "border-destructive bg-destructive/10"
                  : "border-border"
              )}
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">
                {i + 1}
              </span>
              <span className="flex-1">{item}</span>
              {!answered && (
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => move(i, -1)}
                    className="rounded p-1 text-muted-foreground hover:bg-muted"
                    aria-label="Move up"
                  >
                    <ArrowUp className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, 1)}
                    className="rounded p-1 text-muted-foreground hover:bg-muted"
                    aria-label="Move down"
                  >
                    <ArrowDown className="size-3.5" />
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ol>
      {!answered && (
        <Button onClick={submit}>
          <Check className="size-4" /> Check order
        </Button>
      )}
    </div>
  );
}
