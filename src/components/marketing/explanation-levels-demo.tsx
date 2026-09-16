"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const levels = [
  {
    value: "simple",
    label: "🟢 Simple",
    body: "A neural network is a pattern-matching machine. Show it thousands of examples, and it slowly learns which inputs tend to go with which outputs — like learning to recognize a friend's face after seeing it enough times.",
  },
  {
    value: "understand",
    label: "🟡 Understand",
    body: "It's made of layers of simple units (\"neurons\"). Each connection has a weight. Data flows forward through the layers, and after each prediction the network measures its error and adjusts the weights slightly — backpropagation — so it's a little more right next time.",
  },
  {
    value: "deep",
    label: "🔵 Deep dive",
    body: "Forward pass: a = σ(Wx + b) at each layer. Loss is computed against the target, then the gradient of the loss with respect to every weight is found via the chain rule (backprop) and used to update weights via gradient descent — typically Adam, with a learning rate, batching, and regularization to prevent overfitting.",
  },
];

export function ExplanationLevelsDemo() {
  return (
    <Tabs defaultValue="simple" className="w-full">
      <TabsList className="w-full sm:w-auto">
        {levels.map((level) => (
          <TabsTrigger key={level.value} value={level.value}>
            {level.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {levels.map((level) => (
        <TabsContent key={level.value} value={level.value} className="mt-5">
          <p className="text-base leading-relaxed text-foreground/90">{level.body}</p>
        </TabsContent>
      ))}
    </Tabs>
  );
}
