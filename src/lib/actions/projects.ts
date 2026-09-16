"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { ProjectStatus } from "@/lib/constants";

export async function setUserProjectStatusAction(projectId: string, status: ProjectStatus) {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated");

  await prisma.userProject.upsert({
    where: { userId_projectId: { userId: session.user.id, projectId } },
    update: {
      status,
      startedAt: status !== "SAVED" ? new Date() : undefined,
      completedAt: status === "COMPLETED" ? new Date() : null,
    },
    create: {
      userId: session.user.id,
      projectId,
      status,
      startedAt: status !== "SAVED" ? new Date() : null,
      completedAt: status === "COMPLETED" ? new Date() : null,
    },
  });

  revalidatePath("/projects");
  revalidatePath("/dashboard");
}
