export type CareerGoal = {
  slug: string;
  title: string;
  /** Level indexes relevant to this goal, in the order they should be studied. */
  levelIndexes: number[];
};

export const CAREER_GOALS: CareerGoal[] = [
  { slug: "explore", title: "Not sure yet — show me everything", levelIndexes: [0, 1, 2, 3, 4, 5, 6, 7] },
  { slug: "ml-engineer", title: "ML Engineer", levelIndexes: [0, 1, 2, 3, 4] },
  { slug: "ai-engineer", title: "AI Engineer", levelIndexes: [0, 1, 2, 3, 4, 7] },
  { slug: "data-scientist", title: "Data Scientist", levelIndexes: [0, 1, 2, 3] },
  { slug: "data-analyst", title: "Data Analyst", levelIndexes: [0, 1, 2] },
  { slug: "cv-engineer", title: "Computer Vision Engineer", levelIndexes: [0, 1, 2, 3, 4, 5] },
  { slug: "nlp-engineer", title: "NLP Engineer", levelIndexes: [0, 1, 2, 3, 4, 6] },
  { slug: "genai-engineer", title: "Generative AI Engineer", levelIndexes: [0, 1, 2, 3, 4, 7] },
  { slug: "ai-researcher", title: "AI Researcher", levelIndexes: [0, 1, 2, 3, 4, 5, 6, 7] },
  { slug: "mlops-engineer", title: "MLOps Engineer", levelIndexes: [0, 1, 2, 3, 4] },
];

export function getCareerGoal(slug: string): CareerGoal {
  return CAREER_GOALS.find((c) => c.slug === slug) ?? CAREER_GOALS[0];
}
