"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { ExplanationDepth } from "@/lib/constants";

const depthMeta: Record<ExplanationDepth, string> = {
  SIMPLE: "🟢 Simple",
  UNDERSTAND: "🟡 Understand",
  DEEP: "🔵 Deep dive",
};

const order: ExplanationDepth[] = ["SIMPLE", "UNDERSTAND", "DEEP"];

export function ExplanationTabs({
  explanations,
}: {
  explanations: { depth: string; content: string }[];
}) {
  const byDepth = new Map(explanations.map((e) => [e.depth, e.content]));
  const available = order.filter((d) => byDepth.has(d));
  if (available.length === 0) return null;

  return (
    <Tabs defaultValue={available[0]} className="w-full">
      <TabsList>
        {available.map((depth) => (
          <TabsTrigger key={depth} value={depth}>
            {depthMeta[depth]}
          </TabsTrigger>
        ))}
      </TabsList>
      {available.map((depth) => (
        <TabsContent key={depth} value={depth} className="mt-5">
          <div className="prose prose-neutral max-w-none text-[0.95rem] leading-relaxed dark:prose-invert prose-headings:font-heading prose-p:text-foreground/90 prose-li:text-foreground/90">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{byDepth.get(depth)}</ReactMarkdown>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
