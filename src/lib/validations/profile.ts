import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  bio: z.string().trim().max(280).optional().or(z.literal("")),
  goal: z.string().trim().max(160).optional().or(z.literal("")),
});
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
