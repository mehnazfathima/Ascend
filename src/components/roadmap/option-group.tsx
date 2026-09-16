"use client";

import { cn } from "cn";

export function OptionGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string; description?: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium">{label}</p>
      <div className="grid gap-2 sm:grid-cols-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "rounded-lg border px-3.5 py-2.5 text-left text-sm transition-colors",
              value === opt.value
                ? "border-primary bg-primary/5 text-foreground"
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
            )}
          >
            <span className="block font-medium">{opt.label}</span>
            {opt.description && (
              <span className="mt-0.5 block text-xs text-muted-foreground">
                {opt.description}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
