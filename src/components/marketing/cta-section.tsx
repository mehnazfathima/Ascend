import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="rounded-3xl bg-foreground px-8 py-16 text-center text-background sm:px-16">
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Start from zero. Build something real.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-background/70">
          Free to start. No prior AI experience required.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" variant="secondary" render={<Link href="/signup" />}>
            Start Learning
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background"
            render={<Link href="/skill-test" />}
          >
            Take the Skill Test
          </Button>
        </div>
      </div>
    </section>
  );
}
