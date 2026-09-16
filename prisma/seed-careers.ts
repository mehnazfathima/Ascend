import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

type Career = {
  slug: string;
  title: string;
  description: string;
  skills: string[];
  tools: string[];
  exampleApplications: string[];
  order: number;
  conceptSlugs: string[];
};

const ML_CORE = [
  "what-is-ai", "ai-ml-dl", "data-and-features", "models-and-training", "train-test-validation",
  "python-basics", "python-data-structures", "numpy-pandas",
  "vectors-and-matrices", "derivatives-and-gradients",
  "linear-regression", "logistic-regression", "knn", "decision-trees", "random-forest",
  "kmeans-clustering", "pca", "bias-variance", "model-evaluation",
  "neural-networks", "backpropagation",
];

const careers: Career[] = [
  {
    slug: "ml-engineer",
    title: "ML Engineer",
    description: "Builds and ships machine learning systems end-to-end — from messy data to a model running in production.",
    skills: ["Python", "Statistics", "Model evaluation", "Feature engineering", "ML pipelines"],
    tools: ["scikit-learn", "Pandas", "PyTorch", "Docker", "MLflow"],
    exampleApplications: ["Fraud detection at banks", "Product recommendation engines", "Demand forecasting for retail"],
    order: 0,
    conceptSlugs: ML_CORE,
  },
  {
    slug: "ai-engineer",
    title: "AI Engineer",
    description: "Builds applications on top of large language models — agents, RAG systems, and LLM-powered products.",
    skills: ["Prompt engineering", "API integration", "Vector search", "System design"],
    tools: ["LLM APIs", "LangChain", "Vector databases", "Python"],
    exampleApplications: ["AI coding assistants", "Customer support agents", "Document Q&A systems"],
    order: 1,
    conceptSlugs: ["what-is-ai", "ai-ml-dl", "data-and-features", "models-and-training", "python-basics", "python-data-structures", "numpy-pandas", "nlp-basics", "llms-prompting", "rag", "ai-agents"],
  },
  {
    slug: "data-scientist",
    title: "Data Scientist",
    description: "Turns raw data into insight and predictive models — equal parts statistics, code, and storytelling.",
    skills: ["Statistics", "Experimentation", "SQL", "Data visualization", "Predictive modeling"],
    tools: ["Pandas", "Jupyter", "scikit-learn", "SQL", "Matplotlib"],
    exampleApplications: ["A/B test analysis for product decisions", "Churn prediction models", "Market segmentation studies"],
    order: 2,
    conceptSlugs: ["what-is-ai", "ai-ml-dl", "data-and-features", "models-and-training", "train-test-validation", "python-basics", "python-data-structures", "numpy-pandas", "vectors-and-matrices", "probability-basics", "stats-essentials", "derivatives-and-gradients", "linear-regression", "logistic-regression", "knn", "decision-trees", "random-forest", "kmeans-clustering", "pca", "bias-variance", "model-evaluation"],
  },
  {
    slug: "data-analyst",
    title: "Data Analyst",
    description: "Answers business questions with data — the clearest, fastest path from numbers to decisions.",
    skills: ["SQL", "Statistics", "Dashboards", "Communication"],
    tools: ["SQL", "Pandas", "Tableau / Looker", "Python"],
    exampleApplications: ["Sales performance dashboards", "Customer behavior reports", "Operational efficiency analysis"],
    order: 3,
    conceptSlugs: ["what-is-ai", "ai-ml-dl", "data-and-features", "models-and-training", "python-basics", "numpy-pandas", "probability-basics", "stats-essentials", "linear-regression", "model-evaluation"],
  },
  {
    slug: "cv-engineer",
    title: "Computer Vision Engineer",
    description: "Teaches machines to see — building systems that understand images and video.",
    skills: ["Deep learning", "Image processing", "CNN architectures", "Model optimization"],
    tools: ["PyTorch", "OpenCV", "CUDA", "ONNX"],
    exampleApplications: ["Manufacturing defect detection", "Medical imaging diagnosis", "Autonomous vehicle perception"],
    order: 4,
    conceptSlugs: [...ML_CORE, "cv-basics", "cnn"],
  },
  {
    slug: "nlp-engineer",
    title: "NLP Engineer",
    description: "Builds systems that understand and generate human language.",
    skills: ["Deep learning", "Tokenization & embeddings", "Transformers", "Language task evaluation"],
    tools: ["PyTorch", "Hugging Face", "spaCy", "Transformers library"],
    exampleApplications: ["Sentiment analysis for customer feedback", "Document classification systems", "Machine translation"],
    order: 5,
    conceptSlugs: [...ML_CORE, "nlp-basics", "transformers-attention"],
  },
  {
    slug: "genai-engineer",
    title: "Generative AI Engineer",
    description: "Builds products powered by generative models — text, image, and multimodal.",
    skills: ["Prompting", "Fine-tuning", "RAG architecture", "Agent design"],
    tools: ["LLM APIs", "Fine-tuning frameworks (LoRA)", "Vector databases", "LangChain / LlamaIndex"],
    exampleApplications: ["AI writing assistants", "Personalized content generation", "Multimodal search products"],
    order: 6,
    conceptSlugs: ["what-is-ai", "ai-ml-dl", "data-and-features", "models-and-training", "python-basics", "python-data-structures", "numpy-pandas", "neural-networks", "nlp-basics", "transformers-attention", "llms-prompting", "rag", "ai-agents"],
  },
  {
    slug: "ai-researcher",
    title: "AI Researcher",
    description: "Pushes the boundaries of what AI can do — deep technical work on new methods and architectures.",
    skills: ["Advanced math", "Deep learning theory", "Experimental design", "Paper implementation"],
    tools: ["PyTorch", "Research papers", "Distributed training", "Jupyter"],
    exampleApplications: ["Developing new model architectures", "Improving training efficiency", "Advancing model safety techniques"],
    order: 7,
    conceptSlugs: ["what-is-ai", "ai-ml-dl", "data-and-features", "models-and-training", "train-test-validation", "vectors-and-matrices", "probability-basics", "stats-essentials", "derivatives-and-gradients", "linear-regression", "logistic-regression", "bias-variance", "model-evaluation", "neural-networks", "backpropagation", "cnn", "nlp-basics", "transformers-attention"],
  },
  {
    slug: "mlops-engineer",
    title: "MLOps Engineer",
    description: "Keeps ML systems running reliably in production — the bridge between data science and software engineering.",
    skills: ["Software engineering", "CI/CD", "Monitoring", "Cloud infrastructure"],
    tools: ["Docker", "Kubernetes", "MLflow", "Cloud platforms (AWS / GCP)"],
    exampleApplications: ["Automated model retraining pipelines", "Real-time model monitoring dashboards", "Scalable model-serving infrastructure"],
    order: 8,
    conceptSlugs: ["what-is-ai", "ai-ml-dl", "data-and-features", "models-and-training", "train-test-validation", "python-basics", "python-data-structures", "numpy-pandas", "linear-regression", "logistic-regression", "random-forest", "bias-variance", "model-evaluation", "neural-networks"],
  },
];

async function main() {
  const conceptBySlug = new Map((await prisma.concept.findMany()).map((c) => [c.slug, c]));

  for (const career of careers) {
    const record = await prisma.careerPath.upsert({
      where: { slug: career.slug },
      update: {
        title: career.title,
        description: career.description,
        skills: JSON.stringify(career.skills),
        tools: JSON.stringify(career.tools),
        exampleApplications: JSON.stringify(career.exampleApplications),
        order: career.order,
      },
      create: {
        slug: career.slug,
        title: career.title,
        description: career.description,
        skills: JSON.stringify(career.skills),
        tools: JSON.stringify(career.tools),
        exampleApplications: JSON.stringify(career.exampleApplications),
        order: career.order,
      },
    });

    await prisma.careerConcept.deleteMany({ where: { careerId: record.id } });
    for (const slug of career.conceptSlugs) {
      const concept = conceptBySlug.get(slug);
      if (!concept) continue;
      await prisma.careerConcept.create({ data: { careerId: record.id, conceptId: concept.id } });
    }
  }

  console.log("Careers seeded:", await prisma.careerPath.count());
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
