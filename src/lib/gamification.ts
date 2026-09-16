import { prisma } from "@/lib/prisma";

function isSameCalendarDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function daysBetween(a: Date, b: Date) {
  const msPerDay = 1000 * 60 * 60 * 24;
  const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((utcB - utcA) / msPerDay);
}

/** Awards XP and updates the daily streak. Call on any completed learning action. */
export async function recordActivity(userId: string, xpDelta: number) {
  const now = new Date();
  const existing = await prisma.userStats.findUnique({ where: { userId } });

  if (!existing) {
    return prisma.userStats.create({
      data: { userId, xp: Math.max(xpDelta, 0), streakCount: 1, lastActiveOn: now },
    });
  }

  let streakCount = existing.streakCount;
  if (!existing.lastActiveOn || !isSameCalendarDay(existing.lastActiveOn, now)) {
    const gap = existing.lastActiveOn ? daysBetween(existing.lastActiveOn, now) : null;
    streakCount = gap === 1 ? existing.streakCount + 1 : 1;
  }

  return prisma.userStats.update({
    where: { userId },
    data: {
      xp: Math.max(existing.xp + xpDelta, 0),
      streakCount,
      lastActiveOn: now,
    },
  });
}
