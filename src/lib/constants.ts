// Enum-like string unions. Kept as plain strings in the DB (SQLite has no
// native enum type, and this keeps the schema portable to Postgres later).

export const ROLES = ["STUDENT", "ADMIN"] as const;
export type Role = (typeof ROLES)[number];

export const LEVEL_THEMES = ["ember", "forest", "gold", "slate", "clay"] as const;
export type LevelTheme = (typeof LEVEL_THEMES)[number];

export const EXPLANATION_DEPTHS = ["SIMPLE", "UNDERSTAND", "DEEP"] as const;
export type ExplanationDepth = (typeof EXPLANATION_DEPTHS)[number];

export const SECTION_KINDS = [
  "VISUALIZE",
  "REAL_WORLD",
  "TRY_IT",
  "CODE",
  "WHERE_USED",
] as const;
export type SectionKind = (typeof SECTION_KINDS)[number];

export const PROGRESS_STATUSES = ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"] as const;
export type ProgressStatus = (typeof PROGRESS_STATUSES)[number];

export const DIFFICULTIES = ["EASY", "MEDIUM", "HARD"] as const;
export type Difficulty = (typeof DIFFICULTIES)[number];

export const PROJECT_DIFFICULTIES = [
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
  "PORTFOLIO",
] as const;
export type ProjectDifficulty = (typeof PROJECT_DIFFICULTIES)[number];

export const PROJECT_STATUSES = ["SAVED", "IN_PROGRESS", "COMPLETED"] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export const ARENA_CHALLENGE_TYPES = [
  "MCQ",
  "DRAG_DROP",
  "MATCH",
  "ORDER_STEPS",
  "SPOT_MISTAKE",
  "CODE",
  "PREDICT_OUTPUT",
] as const;
export type ArenaChallengeType = (typeof ARENA_CHALLENGE_TYPES)[number];

export const SKILL_TEST_QUESTION_TYPES = [
  "MCQ",
  "SCENARIO",
  "MODEL_SELECT",
  "CODE_READ",
  "DEBUG",
  "ORDER_STEPS",
] as const;
export type SkillTestQuestionType = (typeof SKILL_TEST_QUESTION_TYPES)[number];
