import { getCareerGoal } from "@/lib/career-goals";
import type { RoadmapSurveyInput } from "@/lib/validations/roadmap";

export type RoadmapStep = {
  conceptId: string;
  conceptSlug: string;
  conceptTitle: string;
  oneLiner: string;
  levelIndex: number;
  levelTitle: string;
  levelTheme: string;
  estimatedMinutes: number;
  why: string;
  checkpoint: boolean;
};

export type RoadmapResult = {
  steps: RoadmapStep[];
  totalMinutes: number;
  totalDays: number;
  totalWeeks: number;
  careerTitle: string;
};

type LevelWithConcepts = {
  index: number;
  title: string;
  colorTheme: string;
  concepts: {
    id: string;
    slug: string;
    title: string;
    oneLiner: string;
    order: number;
    estimatedMinutes: number;
  }[];
};

const LEVEL_WHY: Record<number, string> = {
  0: "Builds the foundational mental model everything else in AI sits on.",
  1: "The Python skills you'll lean on in almost every exercise ahead.",
  2: "The math intuition behind how models actually learn.",
  3: "Core machine learning — the algorithms behind most real-world AI systems.",
  4: "Deep learning — how modern neural networks are built and trained.",
  5: "Specialized skills for working with images and vision models.",
  6: "Specialized skills for working with text and language.",
  7: "The cutting edge — LLMs, agents, and generative systems.",
};

function skipCount(total: number, tier: 0 | 1 | 2) {
  if (tier === 2) return total;
  if (tier === 1) return Math.floor(total / 2);
  return 0;
}

function tierFor(rating: string, tier1: string, tier2: string): 0 | 1 | 2 {
  if (rating === tier2) return 2;
  if (rating === tier1) return 1;
  return 0;
}

export function generateRoadmap({
  input,
  levels,
  completedConceptIds,
}: {
  input: RoadmapSurveyInput;
  levels: LevelWithConcepts[];
  completedConceptIds: Set<string>;
}): RoadmapResult {
  const goal = getCareerGoal(input.careerGoal);
  const relevant = new Set(goal.levelIndexes);

  const selfAssessedSkip: Record<number, number> = {
    0: skipCount(
      levels.find((l) => l.index === 0)?.concepts.length ?? 0,
      tierFor(input.currentLevel, "some-basics", "intermediate")
    ),
    1: skipCount(
      levels.find((l) => l.index === 1)?.concepts.length ?? 0,
      tierFor(input.pythonLevel, "basic", "comfortable")
    ),
    2: skipCount(
      levels.find((l) => l.index === 2)?.concepts.length ?? 0,
      tierFor(input.mathLevel, "basic", "comfortable")
    ),
  };

  const steps: RoadmapStep[] = [];

  for (const level of [...levels].sort((a, b) => a.index - b.index)) {
    if (!relevant.has(level.index)) continue;

    const skip = selfAssessedSkip[level.index] ?? 0;
    const concepts = [...level.concepts]
      .sort((a, b) => a.order - b.order)
      .filter((c) => !completedConceptIds.has(c.id))
      .filter((c) => c.order >= skip);

    concepts.forEach((concept, i) => {
      steps.push({
        conceptId: concept.id,
        conceptSlug: concept.slug,
        conceptTitle: concept.title,
        oneLiner: concept.oneLiner,
        levelIndex: level.index,
        levelTitle: level.title,
        levelTheme: level.colorTheme,
        estimatedMinutes: concept.estimatedMinutes,
        why: LEVEL_WHY[level.index] ?? "Part of your path toward this goal.",
        checkpoint: i === concepts.length - 1,
      });
    });
  }

  const totalMinutes = steps.reduce((s, step) => s + step.estimatedMinutes, 0);
  const totalDays = Math.max(1, Math.ceil(totalMinutes / input.dailyMinutes));
  const totalWeeks = Math.max(1, Math.ceil(totalDays / 5));

  return { steps, totalMinutes, totalDays, totalWeeks, careerTitle: goal.title };
}
