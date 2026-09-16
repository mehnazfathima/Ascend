import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Eye, FlaskConical, Code2 } from "lucide-react";
import { Visualizer } from "@/components/visualizers";
import { TryItChallengeBlock } from "@/components/concept/try-it-challenge";
import { parseTryIt } from "@/lib/content-types";

const kindMeta: Record<string, { icon: React.ComponentType<{ className?: string }>; label: string }> = {
  VISUALIZE: { icon: Eye, label: "Visualize" },
  TRY_IT: { icon: FlaskConical, label: "Try it" },
  CODE: { icon: Code2, label: "Code" },
};

export function ConceptSectionBlock({
  section,
}: {
  section: {
    kind: string;
    title: string;
    body: string | null;
    code: string | null;
    visualizerKey: string | null;
    data: string | null;
  };
}) {
  const meta = kindMeta[section.kind];
  const Icon = meta?.icon;

  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 font-heading text-lg font-semibold">
        {Icon && <Icon className="size-4.5 text-primary" />}
        {section.title}
      </h3>

      {section.body && (
        <div className="prose prose-neutral max-w-none text-[0.95rem] leading-relaxed dark:prose-invert prose-headings:font-heading prose-p:text-foreground/90">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{section.body}</ReactMarkdown>
        </div>
      )}

      {section.kind === "VISUALIZE" && section.visualizerKey && (
        <Visualizer visualizerKey={section.visualizerKey} />
      )}

      {section.kind === "TRY_IT" &&
        (() => {
          const challenge = parseTryIt(section.data);
          return challenge ? <TryItChallengeBlock challenge={challenge} /> : null;
        })()}

      {section.kind === "CODE" && section.code && (
        <pre className="overflow-x-auto rounded-lg border border-border bg-foreground p-4 text-sm text-background">
          <code className="font-mono">{section.code}</code>
        </pre>
      )}
    </div>
  );
}
