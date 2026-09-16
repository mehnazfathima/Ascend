import type { Metadata } from "next";
import { getSkillTestQuestions } from "@/lib/actions/skill-test";
import { SkillTestFlow } from "@/components/skill-test/skill-test-flow";

export const metadata: Metadata = { title: "Skill Test" };

export default async function SkillTestPage() {
  const questions = await getSkillTestQuestions();
  return <SkillTestFlow questions={questions} />;
}
