import { z } from "zod";

export const skillTestSubmissionSchema = z.object({
  answers: z
    .array(
      z.object({
        questionId: z.string(),
        answerIndex: z.number().int().min(0),
      })
    )
    .min(1),
});
export type SkillTestSubmission = z.infer<typeof skillTestSubmissionSchema>;
