// Helpers for the JSON-string fields Concept/ConceptSection store (SQLite has
// no native array/json column type Prisma can query into, so lists are kept
// as JSON strings and parsed at the boundary).

export function parseStringArray(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

export function toStringArrayJson(values: string[]): string {
  return JSON.stringify(values);
}

export type TryItChallenge = {
  prompt: string;
  options?: string[];
  answerIndex?: number;
  hint?: string;
  explanation?: string;
};

export function parseTryIt(data: string | null | undefined): TryItChallenge | null {
  if (!data) return null;
  try {
    return JSON.parse(data) as TryItChallenge;
  } catch {
    return null;
  }
}
