export type SkillQuestionData = {
  code?: string;
  scenario?: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

export function parseQuestionData(data: string): SkillQuestionData {
  return JSON.parse(data) as SkillQuestionData;
}

export const CATEGORY_LABELS: Record<string, string> = {
  "ai-fundamentals": "AI Fundamentals",
  python: "Python",
  math: "Math for AI",
  ml: "Machine Learning",
  "deep-learning": "Deep Learning",
};

// Loosely maps a weak category to where to pick back up in the knowledge map.
export const CATEGORY_TO_LEVEL_INDEX: Record<string, number> = {
  "ai-fundamentals": 0,
  python: 1,
  math: 2,
  ml: 3,
  "deep-learning": 4,
};
