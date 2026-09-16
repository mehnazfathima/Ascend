"use client";

import { cn } from "cn";
import type { ProjectDifficulty } from "@/lib/constants";

const DOMAINS = [
  { value: "", label: "All domains" },
  { value: "tabular", label: "Tabular / ML" },
  { value: "computer-vision", label: "Computer Vision" },
  { value: "nlp", label: "NLP" },
  { value: "genai", label: "Generative AI" },
];

const DIFFICULTIES: { value: ProjectDifficulty | ""; label: string }[] = [
  { value: "", label: "Any level" },
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "ADVANCED", label: "Advanced" },
  { value: "PORTFOLIO", label: "Portfolio" },
];

export function ProjectFilters({
  domain,
  difficulty,
  recommended,
}: {
  domain: string;
  difficulty: string;
  recommended: ProjectDifficulty;
}) {
  return (
    <form method="get" className="mb-8 space-y-4">
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Domain</p>
        <div className="flex flex-wrap gap-2">
          {DOMAINS.map((d) => (
            <FilterChip key={d.value} name="domain" value={d.value} label={d.label} active={domain === d.value} />
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Difficulty <span className="normal-case text-muted-foreground/70">(recommended: {recommended.toLowerCase()})</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {DIFFICULTIES.map((d) => (
            <FilterChip key={d.value} name="difficulty" value={d.value} label={d.label} active={difficulty === d.value} />
          ))}
        </div>
      </div>
      <noscript>
        <button type="submit" className="rounded-lg border border-border px-3 py-1.5 text-sm">
          Apply filters
        </button>
      </noscript>
    </form>
  );
}

function FilterChip({
  name,
  value,
  label,
  active,
}: {
  name: string;
  value: string;
  label: string;
  active: boolean;
}) {
  return (
    <label
      className={cn(
        "cursor-pointer rounded-full border px-3.5 py-1.5 text-sm transition-colors",
        active ? "border-primary bg-primary/5 text-foreground" : "border-border text-muted-foreground hover:border-primary/40"
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={active}
        className="hidden"
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
      />
      {label}
    </label>
  );
}
