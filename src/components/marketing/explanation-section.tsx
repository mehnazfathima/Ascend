import { ExplanationLevelsDemo } from "@/components/marketing/explanation-levels-demo";

export function ExplanationSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <h2 className="font-heading text-3xl font-semibold tracking-tight">
            Every hard idea, explained three ways.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Never lost in jargon. Switch depth on any concept — from a plain-English
            analogy to the underlying math — whenever you&apos;re ready for more.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Concept card · Neural Networks
          </p>
          <h3 className="font-heading mb-6 text-xl font-semibold">
            What is a neural network?
          </h3>
          <ExplanationLevelsDemo />
        </div>
      </div>
    </section>
  );
}
