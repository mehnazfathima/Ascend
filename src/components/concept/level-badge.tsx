import { themeColorVar } from "@/components/concept/level-theme";
import type { LevelTheme } from "@/lib/constants";

export function LevelBadge({
  index,
  title,
  theme,
}: {
  index: number;
  title: string;
  theme: string;
}) {
  const color = themeColorVar[theme as LevelTheme] ?? themeColorVar.ember;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
      <span
        className="flex size-4 items-center justify-center rounded-full text-[10px] font-semibold text-white"
        style={{ backgroundColor: color }}
      >
        {index}
      </span>
      {title}
    </span>
  );
}
