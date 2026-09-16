import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RegressionPreview } from "@/components/marketing/regression-preview";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pt-16 pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:pt-24 lg:pb-28">
      <div>
        <p className="mb-5 inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          A living map of AI — from zero to building
        </p>
        <h1 className="font-heading text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
          Learn AI from zero.
        </h1>
        <p className="mt-5 max-w-lg text-lg text-muted-foreground">
          An interactive learning platform that takes you from your first AI
          concept to building real-world AI projects. Understand the ideas.
          Practice them. Build something real.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button size="lg" render={<Link href="/signup" />}>
            Start Learning
          </Button>
          <Button size="lg" variant="outline" render={<Link href="/skill-test" />}>
            Take the Skill Test
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          No prior experience needed. Learn. Understand. Build.
        </p>
      </div>
      <RegressionPreview />
    </section>
  );
}
