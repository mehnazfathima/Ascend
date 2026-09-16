"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toStringArrayJson } from "@/lib/content-types";
import type { ActionResult } from "@/lib/actions/auth";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Admin access required");
  }
  return session.user;
}

function linesToArray(value: string): string[] {
  return value
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function tryParseJson(value: string): { ok: true; data: unknown } | { ok: false; error: string } {
  try {
    return { ok: true, data: JSON.parse(value) };
  } catch {
    return { ok: false, error: "That data field isn't valid JSON." };
  }
}

// ---------- Users ----------

export async function toggleUserDisabledAction(userId: string, disabled: boolean): Promise<ActionResult> {
  const me = await requireAdmin();
  if (userId === me.id) {
    return { ok: false, error: "You can't disable your own account." };
  }
  await prisma.user.update({ where: { id: userId }, data: { disabled } });
  revalidatePath("/admin/users");
  return { ok: true };
}

// ---------- Concepts ----------

export type ConceptFormInput = {
  slug: string;
  title: string;
  cardLabel: string;
  oneLiner: string;
  levelId: string;
  order: number;
  estimatedMinutes: number;
  realWorldExamples: string; // newline separated
  tags: string; // newline separated
  published: boolean;
  simple: string;
  understand: string;
  deep: string;
  sectionsJson: string;
  prerequisiteIds: string[];
};

export async function upsertConceptAction(
  originalSlug: string | null,
  input: ConceptFormInput
): Promise<ActionResult> {
  await requireAdmin();

  if (!input.slug.trim() || !input.title.trim()) {
    return { ok: false, error: "Slug and title are required." };
  }

  let sections: unknown[] = [];
  if (input.sectionsJson.trim()) {
    const parsed = tryParseJson(input.sectionsJson);
    if (!parsed.ok) return { ok: false, error: `Sections: ${parsed.error}` };
    if (!Array.isArray(parsed.data)) return { ok: false, error: "Sections must be a JSON array." };
    sections = parsed.data;
  }

  const data = {
    slug: input.slug.trim(),
    title: input.title.trim(),
    cardLabel: input.cardLabel.trim() || input.title.trim(),
    oneLiner: input.oneLiner.trim(),
    levelId: input.levelId,
    order: input.order,
    estimatedMinutes: input.estimatedMinutes,
    realWorldExamples: toStringArrayJson(linesToArray(input.realWorldExamples)),
    tags: toStringArrayJson(linesToArray(input.tags)),
    published: input.published,
  };

  const concept = originalSlug
    ? await prisma.concept.update({ where: { slug: originalSlug }, data })
    : await prisma.concept.create({ data });

  await prisma.conceptExplanation.deleteMany({ where: { conceptId: concept.id } });
  await prisma.conceptExplanation.createMany({
    data: [
      { conceptId: concept.id, depth: "SIMPLE", content: input.simple },
      { conceptId: concept.id, depth: "UNDERSTAND", content: input.understand },
      { conceptId: concept.id, depth: "DEEP", content: input.deep },
    ].filter((e) => e.content.trim().length > 0),
  });

  await prisma.conceptSection.deleteMany({ where: { conceptId: concept.id } });
  if (sections.length > 0) {
    await prisma.conceptSection.createMany({
      data: (sections as Record<string, unknown>[]).map((s, i) => ({
        conceptId: concept.id,
        kind: String(s.kind ?? "CODE"),
        title: String(s.title ?? "Untitled"),
        body: s.body ? String(s.body) : null,
        code: s.code ? String(s.code) : null,
        visualizerKey: s.visualizerKey ? String(s.visualizerKey) : null,
        data: s.data ? JSON.stringify(s.data) : null,
        order: typeof s.order === "number" ? s.order : i,
      })),
    });
  }

  await prisma.conceptPrerequisite.deleteMany({ where: { conceptId: concept.id } });
  if (input.prerequisiteIds.length > 0) {
    await prisma.conceptPrerequisite.createMany({
      data: input.prerequisiteIds.map((prerequisiteId) => ({
        conceptId: concept.id,
        prerequisiteId,
      })),
    });
  }

  revalidatePath("/admin/concepts");
  revalidatePath("/learn");
  return { ok: true };
}

export async function deleteConceptAction(slug: string): Promise<ActionResult> {
  await requireAdmin();
  await prisma.concept.delete({ where: { slug } });
  revalidatePath("/admin/concepts");
  revalidatePath("/learn");
  return { ok: true };
}

export async function toggleConceptPublishedAction(slug: string, published: boolean): Promise<ActionResult> {
  await requireAdmin();
  await prisma.concept.update({ where: { slug }, data: { published } });
  revalidatePath("/admin/concepts");
  revalidatePath("/learn");
  return { ok: true };
}

// ---------- Arena Challenges ----------

export type ArenaFormInput = {
  slug: string;
  title: string;
  category: string;
  type: string;
  difficulty: string;
  prompt: string;
  dataJson: string;
  explanation: string;
  xpReward: number;
  published: boolean;
};

export async function upsertArenaChallengeAction(
  originalSlug: string | null,
  input: ArenaFormInput
): Promise<ActionResult> {
  await requireAdmin();
  const parsed = tryParseJson(input.dataJson);
  if (!parsed.ok) return { ok: false, error: `Data: ${parsed.error}` };

  const data = {
    slug: input.slug.trim(),
    title: input.title.trim(),
    category: input.category.trim(),
    type: input.type,
    difficulty: input.difficulty,
    prompt: input.prompt.trim(),
    data: JSON.stringify(parsed.data),
    explanation: input.explanation.trim(),
    xpReward: input.xpReward,
    published: input.published,
  };

  if (originalSlug) {
    await prisma.arenaChallenge.update({ where: { slug: originalSlug }, data });
  } else {
    await prisma.arenaChallenge.create({ data });
  }
  revalidatePath("/admin/arena");
  revalidatePath("/arena");
  return { ok: true };
}

export async function deleteArenaChallengeAction(slug: string): Promise<ActionResult> {
  await requireAdmin();
  await prisma.arenaChallenge.delete({ where: { slug } });
  revalidatePath("/admin/arena");
  revalidatePath("/arena");
  return { ok: true };
}

// ---------- Career Paths ----------

export type CareerFormInput = {
  slug: string;
  title: string;
  description: string;
  skills: string;
  tools: string;
  exampleApplications: string;
  order: number;
  conceptIds: string[];
};

export async function upsertCareerPathAction(
  originalSlug: string | null,
  input: CareerFormInput
): Promise<ActionResult> {
  await requireAdmin();
  if (!input.slug.trim() || !input.title.trim()) {
    return { ok: false, error: "Slug and title are required." };
  }

  const data = {
    slug: input.slug.trim(),
    title: input.title.trim(),
    description: input.description.trim(),
    skills: toStringArrayJson(linesToArray(input.skills)),
    tools: toStringArrayJson(linesToArray(input.tools)),
    exampleApplications: toStringArrayJson(linesToArray(input.exampleApplications)),
    order: input.order,
  };

  const career = originalSlug
    ? await prisma.careerPath.update({ where: { slug: originalSlug }, data })
    : await prisma.careerPath.create({ data });

  await prisma.careerConcept.deleteMany({ where: { careerId: career.id } });
  if (input.conceptIds.length > 0) {
    await prisma.careerConcept.createMany({
      data: input.conceptIds.map((conceptId) => ({ careerId: career.id, conceptId })),
    });
  }

  revalidatePath("/admin/careers");
  revalidatePath("/career");
  return { ok: true };
}

export async function deleteCareerPathAction(slug: string): Promise<ActionResult> {
  await requireAdmin();
  await prisma.careerPath.delete({ where: { slug } });
  revalidatePath("/admin/careers");
  revalidatePath("/career");
  return { ok: true };
}

// ---------- Project Templates ----------

export type ProjectFormInput = {
  slug: string;
  title: string;
  description: string;
  domain: string;
  difficulty: string;
  skillsPracticed: string;
  techStack: string;
  milestones: string;
  expectedResult: string;
  advancedIdeas: string;
  careerId: string | null;
  conceptIds: string[];
};

export async function upsertProjectTemplateAction(
  originalSlug: string | null,
  input: ProjectFormInput
): Promise<ActionResult> {
  await requireAdmin();
  if (!input.slug.trim() || !input.title.trim()) {
    return { ok: false, error: "Slug and title are required." };
  }

  const data = {
    slug: input.slug.trim(),
    title: input.title.trim(),
    description: input.description.trim(),
    domain: input.domain.trim(),
    difficulty: input.difficulty,
    skillsPracticed: toStringArrayJson(linesToArray(input.skillsPracticed)),
    techStack: toStringArrayJson(linesToArray(input.techStack)),
    milestones: toStringArrayJson(linesToArray(input.milestones)),
    expectedResult: input.expectedResult.trim(),
    advancedIdeas: toStringArrayJson(linesToArray(input.advancedIdeas)),
    careerId: input.careerId || null,
  };

  const project = originalSlug
    ? await prisma.projectTemplate.update({ where: { slug: originalSlug }, data })
    : await prisma.projectTemplate.create({ data });

  await prisma.projectConcept.deleteMany({ where: { projectId: project.id } });
  if (input.conceptIds.length > 0) {
    await prisma.projectConcept.createMany({
      data: input.conceptIds.map((conceptId) => ({ projectId: project.id, conceptId })),
    });
  }

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  return { ok: true };
}

export async function deleteProjectTemplateAction(slug: string): Promise<ActionResult> {
  await requireAdmin();
  await prisma.projectTemplate.delete({ where: { slug } });
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  return { ok: true };
}

// ---------- Skill Test Questions ----------

export type SkillTestQuestionFormInput = {
  id: string | null;
  type: string;
  category: string;
  difficulty: string;
  prompt: string;
  dataJson: string;
  published: boolean;
};

export async function upsertSkillTestQuestionAction(
  input: SkillTestQuestionFormInput
): Promise<ActionResult> {
  await requireAdmin();
  const parsed = tryParseJson(input.dataJson);
  if (!parsed.ok) return { ok: false, error: `Data: ${parsed.error}` };

  const data = {
    type: input.type,
    category: input.category.trim(),
    difficulty: input.difficulty,
    prompt: input.prompt.trim(),
    data: JSON.stringify(parsed.data),
    published: input.published,
  };

  if (input.id) {
    await prisma.skillTestQuestion.update({ where: { id: input.id }, data });
  } else {
    await prisma.skillTestQuestion.create({ data });
  }
  revalidatePath("/admin/skill-test");
  revalidatePath("/skill-test");
  return { ok: true };
}

export async function deleteSkillTestQuestionAction(id: string): Promise<ActionResult> {
  await requireAdmin();
  await prisma.skillTestQuestion.delete({ where: { id } });
  revalidatePath("/admin/skill-test");
  revalidatePath("/skill-test");
  return { ok: true };
}
