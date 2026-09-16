import { KnowledgeMapVisual } from "@/components/marketing/knowledge-map-visual";

const levels = [
  { index: 0, title: "AI Foundations", theme: "var(--chart-1)" },
  { index: 1, title: "Python for AI", theme: "var(--chart-2)" },
  { index: 2, title: "Math for AI", theme: "var(--chart-3)" },
  { index: 3, title: "Machine Learning", theme: "var(--chart-4)" },
  { index: 4, title: "Deep Learning", theme: "var(--chart-5)" },
  { index: 5, title: "Computer Vision", theme: "var(--chart-1)" },
  { index: 6, title: "NLP", theme: "var(--chart-2)" },
  { index: 7, title: "Generative AI", theme: "var(--chart-3)" },
  { index: 8, title: "Production AI", theme: "var(--chart-4)" },
  { index: 9, title: "Responsible AI", theme: "var(--chart-5)" },
  { index: 10, title: "AI in the Real World", theme: "var(--chart-1)" },
];

export function KnowledgeMapPreview() {
  return (
    <section id="knowledge-map" className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight">
              A living map of AI.
            </h2>
            <p className="mt-3 max-w-lg text-muted-foreground">
              From what a model even is, to building with LLMs and shipping to
              production — the map keeps growing as AI does.
            </p>
            <div className="mt-10 overflow-x-auto pb-2">
              <ol className="flex min-w-max gap-3 lg:grid lg:min-w-0 lg:grid-cols-3">
                {levels.map((level) => (
                  <li
                    key={level.index}
                    className="flex w-44 flex-col gap-3 rounded-xl border border-border bg-card p-4 lg:w-auto"
                  >
                    <span
                      className="flex size-8 items-center justify-center rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: level.theme }}
                    >
                      {level.index}
                    </span>
                    <span className="text-sm font-medium leading-snug">{level.title}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <KnowledgeMapVisual />
        </div>
      </div>
    </section>
  );
}
