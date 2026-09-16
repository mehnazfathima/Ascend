import { Map, Target, Swords, Layers, Hammer, Compass } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Interactive learning",
    description:
      "Every concept is a card you explore, not a page you scroll — visualize it, try it, then see the code.",
  },
  {
    icon: Map,
    title: "AI roadmap",
    description:
      "Tell us your goal and time budget. Get an ordered path through the knowledge map, with reasons for every step.",
  },
  {
    icon: Target,
    title: "Skill assessment",
    description:
      "Scenario and reasoning questions, not just trivia — see exactly what you know and what to learn next.",
  },
  {
    icon: Swords,
    title: "AI Arena",
    description:
      "Short, sharp challenges across Python, math, ML, and GenAI. Build a streak, not just a score.",
  },
  {
    icon: Hammer,
    title: "Real-world projects",
    description:
      "From your first script to portfolio-grade builds — projects that get harder as you do.",
  },
  {
    icon: Compass,
    title: "Career paths",
    description:
      "ML Engineer, CV Engineer, NLP Engineer, AI Researcher — see exactly what each path requires.",
  },
];

export function FeatureGrid() {
  return (
    <section id="how-it-works" className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight">
            The product is the learning experience.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Not a chatbot. Not a video library. A place built to make AI
            actually click.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <feature.icon className="size-5 text-primary" strokeWidth={1.75} />
              <h3 className="mt-4 font-heading text-lg font-semibold">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
