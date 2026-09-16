"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ArrowRight, CheckCircle2, Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "cn";
import { parseQuestionData } from "@/lib/skill-test-types";
import { submitSkillTestAction } from "@/lib/actions/skill-test";
import { ShareCard } from "@/components/share/share-card";
import type { SkillTestResults } from "@/lib/skill-test-engine";

type Question = {
  id: string;
  type: string;
  category: string;
  difficulty: string;
  prompt: string;
  data: string;
};

export function SkillTestRunner({ questions }: { questions: Question[] }) {
  const { data: session } = useSession();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState<SkillTestResults | null>(null);

  const question = questions[index];
  const parsedData = useMemo(() => (question ? parseQuestionData(question.data) : null), [question]);
  const progress = ((index) / questions.length) * 100;
  const isLast = index === questions.length - 1;

  async function handleNext() {
    if (selected === null || !question) return;
    const nextAnswers = { ...answers, [question.id]: selected };
    setAnswers(nextAnswers);

    if (!isLast) {
      setIndex((i) => i + 1);
      setSelected(null);
      return;
    }

    setSubmitting(true);
    const result = await submitSkillTestAction({
      answers: Object.entries(nextAnswers).map(([questionId, answerIndex]) => ({
        questionId,
        answerIndex,
      })),
    });
    setSubmitting(false);
    if (result.ok) setResults(result.results);
  }

  if (results) return <SkillTestResultsView results={results} isSignedIn={!!session?.user} />;

  if (!question) {
    return <p className="text-muted-foreground">No skill test questions are published yet.</p>;
  }

  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <Progress value={progress} className="flex-1" />
        <span className="text-xs text-muted-foreground">
          {index + 1} / {questions.length}
        </span>
      </div>

      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-primary">
        {question.category.replace("-", " ")} · {question.difficulty.toLowerCase()}
      </p>

      {parsedData?.scenario && (
        <p className="mb-4 rounded-lg bg-muted/40 p-3 text-sm text-muted-foreground">
          {parsedData.scenario}
        </p>
      )}

      <h2 className="font-heading text-xl font-semibold leading-snug">{question.prompt}</h2>

      {parsedData?.code && (
        <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-foreground p-4 text-sm text-background">
          <code className="font-mono">{parsedData.code}</code>
        </pre>
      )}

      <div className="mt-6 grid gap-2">
        {parsedData?.options.map((option, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSelected(i)}
            className={cn(
              "rounded-lg border px-4 py-3 text-left text-sm transition-colors",
              selected === i
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/40 hover:bg-muted/40"
            )}
          >
            {option}
          </button>
        ))}
      </div>

      <Button className="mt-8" disabled={selected === null || submitting} onClick={handleNext}>
        {submitting ? "Scoring…" : isLast ? "See my results" : "Next"}
        <ArrowRight className="size-4" />
      </Button>
    </div>
  );
}

function SkillTestResultsView({
  results,
  isSignedIn,
}: {
  results: SkillTestResults;
  isSignedIn: boolean;
}) {
  return (
    <div>
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Your score
        </p>
        <p className="font-heading text-6xl font-semibold text-primary">{results.scorePercent}%</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {results.totalCorrect} of {results.totalQuestions} correct
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-sm">
        <ShareCard
          eyebrow="ASCEND Skill Test"
          headline="I just took the AI Skill Test"
          stat={`${results.scorePercent}%`}
          statLabel={`${results.totalCorrect} of ${results.totalQuestions} correct`}
          shareText={`I scored ${results.scorePercent}% on ASCEND's AI Skill Test 🎯 Take yours: ${typeof window !== "undefined" ? window.location.origin : ""}/skill-test`}
        />
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="flex items-center gap-2 font-heading text-base font-semibold">
            <TrendingUp className="size-4 text-success" /> Strengths
          </h3>
          {results.strengths.length > 0 ? (
            <ul className="mt-3 space-y-2 text-sm">
              {results.strengths.map((s) => (
                <li key={s.category} className="flex items-center justify-between">
                  <span>{s.label}</span>
                  <span className="text-muted-foreground">{s.percent}%</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              No category cleared 75% yet — plenty of room to build strengths.
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="flex items-center gap-2 font-heading text-base font-semibold">
            <TrendingDown className="size-4 text-primary" /> Concepts to improve
          </h3>
          {results.improve.length > 0 ? (
            <ul className="mt-3 space-y-2 text-sm">
              {results.improve.map((s) => (
                <li key={s.category} className="flex items-center justify-between">
                  <span>{s.label}</span>
                  <span className="text-muted-foreground">{s.percent}%</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">Solid across the board.</p>
          )}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-secondary/40 p-6">
        <h3 className="flex items-center gap-2 font-heading text-base font-semibold">
          <Sparkles className="size-4 text-primary" /> Recommended next step
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {results.recommendedCategory
            ? `Start with the knowledge map's ${results.recommendedCategory.replace("-", " ")} concepts — that's where a focused pass will help most.`
            : "Head into the knowledge map and keep building from where you are."}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button render={<Link href="/learn" />}>
            Go to the knowledge map <ArrowRight className="size-4" />
          </Button>
          <Button variant="outline" render={<Link href="/roadmap" />}>
            Get a personalized roadmap
          </Button>
        </div>
      </div>

      {isSignedIn ? (
        <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-sm text-muted-foreground">
          <CheckCircle2 className="size-4 text-success" /> Saved to your profile — +40 XP
        </p>
      ) : (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link href="/signup" className="font-medium text-foreground underline underline-offset-4">
            Create a free account
          </Link>{" "}
          to save this result and get a roadmap built around it.
        </p>
      )}
    </div>
  );
}
