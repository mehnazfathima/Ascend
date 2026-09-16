import { LinearRegressionVisualizer } from "@/components/visualizers/linear-regression-visualizer";
import { KMeansVisualizer } from "@/components/visualizers/kmeans-visualizer";
import { NeuralNetworkVisualizer } from "@/components/visualizers/neural-network-visualizer";

export const visualizerRegistry = {
  "linear-regression": LinearRegressionVisualizer,
  "k-means": KMeansVisualizer,
  "neural-network": NeuralNetworkVisualizer,
} satisfies Record<string, React.ComponentType>;

export type VisualizerKey = keyof typeof visualizerRegistry;

export function Visualizer({ visualizerKey }: { visualizerKey: string }) {
  const Component = visualizerRegistry[visualizerKey as VisualizerKey];
  if (!Component) return null;
  return <Component />;
}
