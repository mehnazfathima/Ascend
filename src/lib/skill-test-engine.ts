import { CATEGORY_LABELS } from "@/lib/skill-test-types";

export type ScoredQuestion = {
  questionId: string;
  category: string;
  correct: boolean;
};

export type CategoryBreakdown = {
  category: string;
  label: string;
  correct: number;
  total: number;
  percent: number;
};

export type SkillTestResults = {
  scorePercent: number;
  totalCorrect: number;
  totalQuestions: number;
  byCategory: CategoryBreakdown[];
  strengths: CategoryBreakdown[];
  improve: CategoryBreakdown[];
  recommendedCategory: string | null;
};

export function computeResults(scored: ScoredQuestion[]): SkillTestResults {
  const grouped = new Map<string, { correct: number; total: number }>();
  for (const q of scored) {
    const entry = grouped.get(q.category) ?? { correct: 0, total: 0 };
    entry.total += 1;
    if (q.correct) entry.correct += 1;
    grouped.set(q.category, entry);
  }

  const byCategory: CategoryBreakdown[] = Array.from(grouped.entries()).map(
    ([category, { correct, total }]) => ({
      category,
      label: CATEGORY_LABELS[category] ?? category,
      correct,
      total,
      percent: total > 0 ? Math.round((correct / total) * 100) : 0,
    })
  );

  const totalCorrect = scored.filter((q) => q.correct).length;
  const totalQuestions = scored.length;
  const scorePercent = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  const strengths = byCategory.filter((c) => c.percent >= 75).sort((a, b) => b.percent - a.percent);
  const improve = byCategory.filter((c) => c.percent < 60).sort((a, b) => a.percent - b.percent);

  const recommendedCategory = improve[0]?.category ?? byCategory.sort((a, b) => a.percent - b.percent)[0]?.category ?? null;

  return { scorePercent, totalCorrect, totalQuestions, byCategory, strengths, improve, recommendedCategory };
}
