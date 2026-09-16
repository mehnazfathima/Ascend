"use client";

import { useMemo, useState } from "react";
import { cn } from "cn";
import type { MatchChallengeData } from "@/lib/arena-types";

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function MatchChallenge({
  data,
  onAnswer,
}: {
  data: MatchChallengeData;
  onAnswer: (correct: boolean) => void;
}) {
  const rightItems = useMemo(() => shuffle(data.pairs.map((p) => p.right)), [data.pairs]);
  const [matched, setMatched] = useState<Record<string, string>>({}); // left -> right
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [mistake, setMistake] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  function pickRight(right: string) {
    if (!selectedLeft || finished) return;
    const correctRight = data.pairs.find((p) => p.left === selectedLeft)?.right;
    if (correctRight === right) {
      const next = { ...matched, [selectedLeft]: right };
      setMatched(next);
      setSelectedLeft(null);
      if (Object.keys(next).length === data.pairs.length) {
        setFinished(true);
        onAnswer(true);
      }
    } else {
      setMistake(right);
      setTimeout(() => setMistake(null), 500);
    }
  }

  const usedRights = new Set(Object.values(matched));

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-2">
        {data.pairs.map((p) => {
          const isMatched = !!matched[p.left];
          return (
            <button
              key={p.left}
              type="button"
              disabled={isMatched}
              onClick={() => setSelectedLeft(p.left)}
              className={cn(
                "w-full rounded-lg border px-3.5 py-2.5 text-left text-sm transition-colors",
                isMatched && "border-success bg-success/10 opacity-70",
                !isMatched && selectedLeft === p.left && "border-primary bg-primary/5",
                !isMatched && selectedLeft !== p.left && "border-border hover:border-primary/40"
              )}
            >
              {p.left}
            </button>
          );
        })}
      </div>
      <div className="space-y-2">
        {rightItems.map((right) => {
          const isUsed = usedRights.has(right);
          return (
            <button
              key={right}
              type="button"
              disabled={isUsed}
              onClick={() => pickRight(right)}
              className={cn(
                "w-full rounded-lg border px-3.5 py-2.5 text-left text-sm transition-colors",
                isUsed && "border-success bg-success/10 opacity-70",
                !isUsed && mistake === right && "border-destructive bg-destructive/10",
                !isUsed && mistake !== right && "border-border hover:border-primary/40"
              )}
            >
              {right}
            </button>
          );
        })}
      </div>
      {!finished && Object.keys(matched).length > 0 && (
        <p className="col-span-2 text-xs text-muted-foreground">
          {Object.keys(matched).length} / {data.pairs.length} matched
        </p>
      )}
    </div>
  );
}
