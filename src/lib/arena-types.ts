export type McqChallengeData = {
  kind?: "mcq";
  code?: string;
  scenario?: string;
  options: string[];
  answerIndex: number;
};

export type OrderStepsChallengeData = {
  kind: "order-steps";
  items: string[]; // correct order
};

export type MatchChallengeData = {
  kind: "match";
  pairs: { left: string; right: string }[];
};

export type BucketChallengeData = {
  kind: "bucket";
  buckets: string[];
  items: { label: string; bucket: string }[];
};

export type ChallengeData =
  | McqChallengeData
  | OrderStepsChallengeData
  | MatchChallengeData
  | BucketChallengeData;

export function parseChallengeData(data: string): ChallengeData {
  return JSON.parse(data) as ChallengeData;
}

export const CATEGORY_LABELS: Record<string, string> = {
  "ai-fundamentals": "AI Fundamentals",
  python: "Python",
  math: "Math",
  ml: "Machine Learning",
  "deep-learning": "Deep Learning",
  cv: "Computer Vision",
  nlp: "NLP",
  genai: "Generative AI",
};
