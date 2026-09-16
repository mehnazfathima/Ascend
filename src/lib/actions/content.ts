"use server";

import { auth } from "@/lib/auth";
import { getConceptBySlug, getNextConceptInSequence } from "@/lib/queries/content";
import { parseStringArray } from "@/lib/content-types";
import type { ProgressStatus } from "@/lib/constants";

export type ConceptDetail = {
  slug: string;
  title: string;
  oneLiner: string;
  estimatedMinutes: number;
  level: { index: number; title: string; colorTheme: string };
  status: ProgressStatus;
  prerequisites: { slug: string; title: string }[];
  explanations: { depth: string; content: string }[];
  sections: {
    kind: string;
    title: string;
    body: string | null;
    code: string | null;
    visualizerKey: string | null;
    data: string | null;
  }[];
  realWorldExamples: string[];
  nextConcept: { slug: string; title: string } | null;
};

export async function getConceptDetailAction(slug: string): Promise<ConceptDetail | null> {
  const session = await auth();
  const [concept, nextConcept] = await Promise.all([
    getConceptBySlug(slug, session?.user?.id),
    getNextConceptInSequence(slug),
  ]);
  if (!concept) return null;

  return {
    slug: concept.slug,
    title: concept.title,
    oneLiner: concept.oneLiner,
    estimatedMinutes: concept.estimatedMinutes,
    level: {
      index: concept.level.index,
      title: concept.level.title,
      colorTheme: concept.level.colorTheme,
    },
    status: (concept.progress?.[0]?.status ?? "NOT_STARTED") as ProgressStatus,
    prerequisites: concept.prerequisites.map((p) => ({
      slug: p.prerequisite.slug,
      title: p.prerequisite.title,
    })),
    explanations: concept.explanations.map((e) => ({ depth: e.depth, content: e.content })),
    sections: concept.sections.map((s) => ({
      kind: s.kind,
      title: s.title,
      body: s.body,
      code: s.code,
      visualizerKey: s.visualizerKey,
      data: s.data,
    })),
    realWorldExamples: parseStringArray(concept.realWorldExamples),
    nextConcept: nextConcept ? { slug: nextConcept.slug, title: nextConcept.title } : null,
  };
}
