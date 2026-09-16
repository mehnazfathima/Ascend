"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { recordActivity } from "@/lib/gamification";
import { skillTestSubmissionSchema } from "@/lib/validations/skill-test";
import { parseQuestionData } from "@/lib/skill-test-types";
import { computeResults, type SkillTestResults } from "@/lib/skill-test-engine";

const SKILL_TEST_XP = 40;

export async function submitSkillTestAction(
  input: unknown
): Promise<{ ok: true; results: SkillTestResults; attemptId: string | null } | { ok: false; error: string }> {
  const parsed = skillTestSubmissionSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Invalid submission." };
  }

  const questionIds = parsed.data.answers.map((a) => a.questionId);
  const questions = await prisma.skillTestQuestion.findMany({
    where: { id: { in: questionIds } },
  });
  const questionById = new Map(questions.map((q) => [q.id, q]));

  const scored = parsed.data.answers
    .map((a) => {
      const question = questionById.get(a.questionId);
      if (!question) return null;
      const data = parseQuestionData(question.data);
      return {
        questionId: a.questionId,
        category: question.category,
        correct: data.answerIndex === a.answerIndex,
      };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);

  const results = computeResults(scored);

  const session = await auth();
  let attemptId: string | null = null;

  if (session?.user) {
    const attempt = await prisma.skillTestAttempt.create({
      data: {
        userId: session.user.id,
        completedAt: new Date(),
        scorePercent: results.scorePercent,
        resultsJson: JSON.stringify(results),
        answers: {
          create: parsed.data.answers.map((a) => ({
            questionId: a.questionId,
            answerJson: JSON.stringify({ answerIndex: a.answerIndex }),
            correct: scored.find((s) => s.questionId === a.questionId)?.correct ?? false,
          })),
        },
      },
    });
    attemptId = attempt.id;
    await recordActivity(session.user.id, SKILL_TEST_XP);
  }

  return { ok: true, results, attemptId };
}

export async function getSkillTestQuestions() {
  return prisma.skillTestQuestion.findMany({ where: { published: true } });
}
