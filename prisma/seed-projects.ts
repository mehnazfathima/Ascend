import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

type Project = {
  slug: string;
  title: string;
  description: string;
  domain: "tabular" | "computer-vision" | "nlp" | "genai";
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "PORTFOLIO";
  skillsPracticed: string[];
  techStack: string[];
  milestones: string[];
  expectedResult: string;
  advancedIdeas: string[];
  careerSlug?: string;
  conceptSlugs: string[];
};

const projects: Project[] = [
  {
    slug: "house-price-predictor",
    title: "House Price Predictor",
    description: "Predict house prices from square footage, location, and a handful of other features using linear regression.",
    domain: "tabular",
    difficulty: "BEGINNER",
    skillsPracticed: ["Data cleaning", "Linear regression", "Model evaluation"],
    techStack: ["Python", "Pandas", "scikit-learn"],
    milestones: [
      "Load and explore a real housing dataset",
      "Clean missing values and select features",
      "Split into train/test sets",
      "Train a linear regression model",
      "Evaluate with MAE and R², and plot predictions vs. actual prices",
    ],
    expectedResult: "A working script that predicts a house's price from its features, with a reported error metric you can explain.",
    advancedIdeas: ["Add more features and compare against a random forest", "Handle categorical features like neighborhood properly", "Deploy it behind a simple API"],
    careerSlug: "data-analyst",
    conceptSlugs: ["data-and-features", "linear-regression", "model-evaluation"],
  },
  {
    slug: "spam-email-classifier",
    title: "Spam Email Classifier",
    description: "Build a classifier that separates spam from legitimate email using logistic regression on text features.",
    domain: "nlp",
    difficulty: "BEGINNER",
    skillsPracticed: ["Text preprocessing", "TF-IDF", "Logistic regression", "Classification metrics"],
    techStack: ["Python", "scikit-learn", "Pandas"],
    milestones: [
      "Load a labeled spam/ham email dataset",
      "Tokenize and vectorize the text with TF-IDF",
      "Train a logistic regression classifier",
      "Evaluate with precision, recall, and F1 — not just accuracy",
      "Inspect the words the model weights most heavily",
    ],
    expectedResult: "A spam filter you can feed a new email and get back a spam probability, plus a clear read on where it makes mistakes.",
    advancedIdeas: ["Compare against a Naive Bayes baseline", "Try word embeddings instead of TF-IDF", "Wrap it in a simple CLI or web form"],
    careerSlug: "nlp-engineer",
    conceptSlugs: ["logistic-regression", "nlp-basics", "model-evaluation"],
  },
  {
    slug: "customer-segmentation",
    title: "Customer Segmentation with K-Means",
    description: "Group customers into meaningful segments from purchase behavior data, with no labels to guide you.",
    domain: "tabular",
    difficulty: "INTERMEDIATE",
    skillsPracticed: ["Unsupervised learning", "Feature scaling", "Cluster interpretation"],
    techStack: ["Python", "scikit-learn", "Matplotlib"],
    milestones: [
      "Load a customer transactions dataset",
      "Engineer features like recency, frequency, and monetary value",
      "Scale features and run K-Means",
      "Use the elbow method to choose K",
      "Profile and name each resulting segment",
    ],
    expectedResult: "A small set of clearly distinct customer segments, each with a plain-English profile you could hand to a marketing team.",
    advancedIdeas: ["Compare K-Means against hierarchical clustering", "Reduce dimensions with PCA first and visualize the clusters", "Turn it into a live-updating dashboard"],
    careerSlug: "data-scientist",
    conceptSlugs: ["kmeans-clustering", "pca", "stats-essentials"],
  },
  {
    slug: "handwritten-digit-classifier",
    title: "Handwritten Digit Classifier",
    description: "Train a neural network to recognize handwritten digits from raw pixel data.",
    domain: "computer-vision",
    difficulty: "INTERMEDIATE",
    skillsPracticed: ["Neural networks", "Training loops", "Evaluating classifiers"],
    techStack: ["Python", "PyTorch", "NumPy"],
    milestones: [
      "Load and normalize the MNIST digit dataset",
      "Build a small fully-connected neural network",
      "Write the training loop: forward pass, loss, backward pass, optimizer step",
      "Track training and validation accuracy across epochs",
      "Visualize a few of the model's mistakes",
    ],
    expectedResult: "A neural network that classifies handwritten digits with over 95% accuracy, trained entirely by you.",
    advancedIdeas: ["Swap the dense network for a CNN and compare accuracy", "Add dropout and see the effect on overfitting", "Deploy it with a drawable canvas front-end"],
    careerSlug: "cv-engineer",
    conceptSlugs: ["neural-networks", "backpropagation"],
  },
  {
    slug: "image-classifier-cnn",
    title: "CNN Image Classifier",
    description: "Train a convolutional neural network to classify real photos into categories.",
    domain: "computer-vision",
    difficulty: "ADVANCED",
    skillsPracticed: ["CNN architecture", "Data augmentation", "Transfer learning basics"],
    techStack: ["Python", "PyTorch", "torchvision"],
    milestones: [
      "Load a labeled image dataset and set up augmentation",
      "Build a small CNN from scratch",
      "Train it and track loss/accuracy curves",
      "Fine-tune a pretrained model and compare results",
      "Analyze a confusion matrix of your model's errors",
    ],
    expectedResult: "A CNN-based image classifier, with a clear before/after comparison against a pretrained model you fine-tuned.",
    advancedIdeas: ["Add Grad-CAM visualizations to see what the model is 'looking at'", "Deploy it as a small web app with live camera input", "Extend it to a larger, messier real-world dataset"],
    careerSlug: "cv-engineer",
    conceptSlugs: ["cnn", "cv-basics"],
  },
  {
    slug: "sentiment-analyzer",
    title: "Product Review Sentiment Analyzer",
    description: "Classify product reviews as positive or negative, and analyze what drives sentiment.",
    domain: "nlp",
    difficulty: "INTERMEDIATE",
    skillsPracticed: ["Text preprocessing", "Feature engineering for text", "Model comparison"],
    techStack: ["Python", "scikit-learn", "Pandas"],
    milestones: [
      "Load a labeled product review dataset",
      "Preprocess text: tokenize, remove stop words, lemmatize",
      "Build TF-IDF features and train two different classifiers",
      "Compare their precision/recall trade-offs",
      "Extract the most sentiment-heavy words per class",
    ],
    expectedResult: "A sentiment classifier plus a short written analysis of what language most strongly signals positive vs. negative reviews.",
    advancedIdeas: ["Try a pretrained transformer-based sentiment model and compare", "Handle sarcasm/negation edge cases explicitly", "Build a small dashboard summarizing sentiment over time"],
    careerSlug: "nlp-engineer",
    conceptSlugs: ["nlp-basics", "logistic-regression", "model-evaluation"],
  },
  {
    slug: "rag-document-assistant",
    title: "RAG Assistant Over Your Own Documents",
    description: "Build a question-answering assistant that retrieves relevant chunks from your own documents before answering.",
    domain: "genai",
    difficulty: "ADVANCED",
    skillsPracticed: ["Embeddings", "Vector search", "Prompt construction", "RAG architecture"],
    techStack: ["Python", "An LLM API", "A vector database"],
    milestones: [
      "Chunk a set of your own documents (notes, PDFs, docs)",
      "Embed each chunk and store the vectors",
      "Embed an incoming question and retrieve the top-k relevant chunks",
      "Construct a prompt that includes retrieved context",
      "Evaluate answer quality against questions with known correct answers",
    ],
    expectedResult: "A working assistant that answers questions correctly using your own documents — and can honestly say 'I don't know' when the answer isn't in them.",
    advancedIdeas: ["Add citations pointing back to the source chunk", "Handle multi-turn conversations with memory", "Add re-ranking to improve retrieval precision"],
    careerSlug: "genai-engineer",
    conceptSlugs: ["rag", "llms-prompting", "nlp-basics"],
  },
  {
    slug: "tool-calling-agent",
    title: "Tool-Calling Research Agent",
    description: "Build an agent that can search, calculate, and reason through a multi-step task using tool calling.",
    domain: "genai",
    difficulty: "PORTFOLIO",
    skillsPracticed: ["Agent design", "Tool/function calling", "Error handling for LLM systems", "Evaluation of agentic behavior"],
    techStack: ["Python", "An LLM API with tool-calling support"],
    milestones: [
      "Define 2-3 tools the agent can call (e.g. web search, a calculator, a file reader)",
      "Build the agent loop: plan, call a tool, observe the result, decide next step",
      "Add guardrails against infinite loops and failed tool calls",
      "Test it on a genuinely multi-step task end to end",
      "Write an evaluation set of tasks and measure success rate",
    ],
    expectedResult: "A working agent that reliably completes a real multi-step task, with a written evaluation of where it succeeds and fails.",
    advancedIdeas: ["Add a planning step that's reviewed before execution", "Let the agent ask a clarifying question when it's stuck", "Add memory across multiple sessions"],
    careerSlug: "ai-engineer",
    conceptSlugs: ["ai-agents", "llms-prompting"],
  },
  {
    slug: "churn-prediction-portfolio",
    title: "Customer Churn Prediction (Portfolio)",
    description: "A full, presentation-ready churn prediction project: from raw data to a deployed, explained model.",
    domain: "tabular",
    difficulty: "PORTFOLIO",
    skillsPracticed: ["Full ML pipeline", "Feature engineering", "Model comparison", "Explainability", "Deployment basics"],
    techStack: ["Python", "scikit-learn", "FastAPI", "Docker"],
    milestones: [
      "Clean and explore a real churn dataset",
      "Engineer features and handle class imbalance",
      "Train and compare logistic regression, random forest, and gradient boosting",
      "Explain the winning model's predictions (feature importance / SHAP-style reasoning)",
      "Serve the model behind a simple API and write up the results",
    ],
    expectedResult: "A polished, end-to-end project: cleaned data, a compared set of models, a clear winner with an explanation, and a working API — genuinely portfolio-ready.",
    advancedIdeas: ["Add a monitoring dashboard for prediction drift", "A/B test the model's business impact on a holdout group", "Package the whole pipeline for one-command retraining"],
    careerSlug: "ml-engineer",
    conceptSlugs: ["random-forest", "bias-variance", "model-evaluation"],
  },
  {
    slug: "loan-default-decision-tree",
    title: "Loan Default Risk (Decision Tree)",
    description: "Build an interpretable model for loan default risk that you can actually explain to a non-technical reviewer.",
    domain: "tabular",
    difficulty: "BEGINNER",
    skillsPracticed: ["Decision trees", "Feature importance", "Interpretability"],
    techStack: ["Python", "scikit-learn"],
    milestones: [
      "Load a loan applications dataset",
      "Train a decision tree with a limited depth",
      "Visualize the tree and trace a few individual predictions",
      "Compare a shallow vs. a deep tree's train/test accuracy",
      "Write a plain-English explanation of the top 3 decision splits",
    ],
    expectedResult: "A decision tree model you can visualize and explain end to end, plus a clear demonstration of overfitting on the deep version.",
    advancedIdeas: ["Upgrade to a random forest and compare accuracy vs. interpretability", "Add cost-sensitive evaluation (false negatives are costlier here)", "Build a simple interactive tool to test 'what-if' applicants"],
    careerSlug: "data-analyst",
    conceptSlugs: ["decision-trees", "bias-variance"],
  },
  {
    slug: "movie-recommender-knn",
    title: "Movie Recommender (KNN)",
    description: "Recommend movies to a user based on similarity to movies they've already liked.",
    domain: "tabular",
    difficulty: "BEGINNER",
    skillsPracticed: ["KNN", "Similarity metrics", "Feature representation"],
    techStack: ["Python", "Pandas", "scikit-learn"],
    milestones: [
      "Load a movie ratings dataset",
      "Represent each movie as a feature vector (genre, ratings pattern)",
      "Use KNN to find the most similar movies to a given one",
      "Build a simple 'recommend 5 movies like this one' function",
      "Sanity-check recommendations by hand for a few movies you know",
    ],
    expectedResult: "A working recommender: give it a movie, get back a short list of genuinely similar ones.",
    advancedIdeas: ["Try collaborative filtering instead of content-based similarity", "Handle the cold-start problem for new movies", "Add a simple web UI to browse recommendations"],
    careerSlug: "data-scientist",
    conceptSlugs: ["knn", "data-and-features"],
  },
  {
    slug: "named-entity-tagger",
    title: "Named Entity Tagger",
    description: "Extract people, organizations, and locations from raw text.",
    domain: "nlp",
    difficulty: "ADVANCED",
    skillsPracticed: ["Sequence labeling", "Evaluation of extraction tasks", "Working with pretrained NLP models"],
    techStack: ["Python", "A pretrained NLP library"],
    milestones: [
      "Load a labeled NER dataset",
      "Run a pretrained named-entity model as a baseline",
      "Evaluate precision/recall per entity type",
      "Fine-tune on your own small labeled examples",
      "Build a function that highlights entities in new text",
    ],
    expectedResult: "An entity extractor you can feed any paragraph and get back tagged people, places, and organizations, with measured accuracy.",
    advancedIdeas: ["Extend it to a custom entity type relevant to a domain you care about", "Add relationship extraction between entities", "Wrap it as a small API"],
    careerSlug: "nlp-engineer",
    conceptSlugs: ["nlp-basics", "transformers-attention"],
  },
  {
    slug: "ai-writing-assistant",
    title: "AI Writing Assistant",
    description: "Build a focused writing assistant that rewrites, summarizes, and critiques text via an LLM.",
    domain: "genai",
    difficulty: "INTERMEDIATE",
    skillsPracticed: ["Prompt engineering", "API integration", "Structuring LLM output"],
    techStack: ["Python or JavaScript", "An LLM API"],
    milestones: [
      "Define 3 clear writing tasks (e.g. tighten, summarize, critique tone)",
      "Design and iterate on prompts for each task",
      "Build a small interface to paste text and get structured output back",
      "Add few-shot examples to improve consistency",
      "Test against tricky inputs and refine the prompts",
    ],
    expectedResult: "A genuinely useful writing tool you'd actually use, with prompts you iterated on and can explain the reasoning behind.",
    advancedIdeas: ["Add streaming output for a snappier feel", "Let users save and compare multiple rewrite options", "Add a lightweight evaluation set to catch prompt regressions"],
    careerSlug: "ai-engineer",
    conceptSlugs: ["llms-prompting"],
  },
];

async function main() {
  const conceptBySlug = new Map((await prisma.concept.findMany()).map((c) => [c.slug, c]));
  const careerBySlug = new Map((await prisma.careerPath.findMany()).map((c) => [c.slug, c]));

  for (const p of projects) {
    const career = p.careerSlug ? careerBySlug.get(p.careerSlug) : undefined;
    const payload = {
      title: p.title,
      description: p.description,
      domain: p.domain,
      difficulty: p.difficulty,
      skillsPracticed: JSON.stringify(p.skillsPracticed),
      techStack: JSON.stringify(p.techStack),
      milestones: JSON.stringify(p.milestones),
      expectedResult: p.expectedResult,
      advancedIdeas: JSON.stringify(p.advancedIdeas),
      careerId: career?.id ?? null,
    };

    const record = await prisma.projectTemplate.upsert({
      where: { slug: p.slug },
      update: payload,
      create: { slug: p.slug, ...payload },
    });

    await prisma.projectConcept.deleteMany({ where: { projectId: record.id } });
    for (const slug of p.conceptSlugs) {
      const concept = conceptBySlug.get(slug);
      if (!concept) continue;
      await prisma.projectConcept.create({ data: { projectId: record.id, conceptId: concept.id } });
    }
  }

  console.log("Projects seeded:", await prisma.projectTemplate.count());
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
