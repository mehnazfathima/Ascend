"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { McqChallenge } from "@/components/arena/mcq-challenge";
import { OrderStepsChallenge } from "@/components/arena/order-steps-challenge";
import { MatchChallenge } from "@/components/arena/match-challenge";
import { BucketChallenge } from "@/components/arena/bucket-challenge";
import { parseChallengeData } from "@/lib/arena-types";
import { submitArenaAttemptAction } from "@/lib/actions/arena";

export function ChallengePlayer({
  challengeId,
  prompt,
  data,
  explanation,
  nextHref,
}: {
  challengeId: string;
  prompt: string;
  data: string;
  explanation: string;
  nextHref: string | null;
}) {
  const parsed = parseChallengeData(data);
  const scenario = "scenario" in parsed ? parsed.scenario : undefined;
  const [result, setResult] = useState<boolean | null>(null);
  const [xpEarned, setXpEarned] = useState(0);

  async function handleAnswer(correct: boolean) {
    setResult(correct);
    const res = await submitArenaAttemptAction(challengeId, correct);
    setXpEarned(res.xpEarned);
    if (res.xpEarned > 0) toast.success(`Correct — +${res.xpEarned} XP`);
  }

  return (
    <div>
      {scenario && (
        <p className="mb-4 rounded-lg bg-muted/40 p-3 text-sm text-muted-foreground">{scenario}</p>
      )}
      <h1 className="mb-6 font-heading text-xl font-semibold leading-snug">{prompt}</h1>

      {(!parsed.kind || parsed.kind === "mcq") && (
        <McqChallenge data={parsed as never} onAnswer={handleAnswer} />
      )}
      {parsed.kind === "order-steps" && (
        <OrderStepsChallenge data={parsed} onAnswer={handleAnswer} />
      )}
      {parsed.kind === "match" && <MatchChallenge data={parsed} onAnswer={handleAnswer} />}
      {parsed.kind === "bucket" && <BucketChallenge data={parsed} onAnswer={handleAnswer} />}

      {result !== null && (
        <div className="mt-6 space-y-4">
          <div
            className={
              result
                ? "flex items-center gap-2 rounded-lg border border-success bg-success/10 px-4 py-3 text-sm"
                : "flex items-center gap-2 rounded-lg border border-destructive bg-destructive/10 px-4 py-3 text-sm"
            }
          >
            {result ? (
              <CheckCircle2 className="size-4 text-success" />
            ) : (
              <XCircle className="size-4 text-destructive" />
            )}
            {result ? `Correct${xpEarned > 0 ? ` — +${xpEarned} XP` : ""}` : "Not quite."}
          </div>
          <p className="text-sm text-muted-foreground">{explanation}</p>
          <div className="flex gap-3">
            <Button variant="outline" render={<Link href="/arena" />}>
              Back to Arena
            </Button>
            {nextHref && (
              <Button render={<Link href={nextHref} />}>
                Next challenge <ArrowRight className="size-4" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
