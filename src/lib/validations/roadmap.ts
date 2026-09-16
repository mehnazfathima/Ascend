import { z } from "zod";

export const roadmapSurveySchema = z.object({
  currentLevel: z.enum(["complete-beginner", "some-basics", "intermediate"]),
  pythonLevel: z.enum(["none", "basic", "comfortable"]),
  mathLevel: z.enum(["none", "basic", "comfortable"]),
  careerGoal: z.string().min(1),
  dailyMinutes: z.coerce.number().min(10).max(240),
  learningStyle: z.enum(["reading", "visual", "hands-on"]),
});
export type RoadmapSurveyInput = z.infer<typeof roadmapSurveySchema>;
