import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

type Challenge = {
  slug: string;
  title: string;
  category: "ai-fundamentals" | "python" | "math" | "ml" | "deep-learning" | "cv" | "nlp" | "genai";
  type: "MCQ" | "DRAG_DROP" | "MATCH" | "ORDER_STEPS" | "SPOT_MISTAKE" | "CODE" | "PREDICT_OUTPUT";
  difficulty: "EASY" | "MEDIUM" | "HARD";
  prompt: string;
  data: Record<string, unknown>;
  explanation: string;
  xpReward: number;
};

const challenges: Challenge[] = [
  {
    slug: "ar-ai-vs-rules",
    title: "AI vs. hand-written rules",
    category: "ai-fundamentals",
    type: "MCQ",
    difficulty: "EASY",
    prompt: "Which of these is a machine learning system, not a hand-coded rules engine?",
    data: {
      options: [
        "A spam filter that learned to flag emails from thousands of labeled examples",
        "A tax calculator that applies a fixed formula from the tax code",
        "A thermostat that turns on heat below 18°C",
        "A script that renames files by their extension",
      ],
      answerIndex: 0,
    },
    explanation: "The other three follow rules a person wrote directly. The spam filter learned its rules from data.",
    xpReward: 10,
  },
  {
    slug: "ar-bucket-supervised",
    title: "Sort: supervised or unsupervised?",
    category: "ai-fundamentals",
    type: "DRAG_DROP",
    difficulty: "MEDIUM",
    prompt: "Sort each task into the right category.",
    data: {
      kind: "bucket",
      buckets: ["Supervised learning", "Unsupervised learning"],
      items: [
        { label: "Predicting house price from labeled sales data", bucket: "Supervised learning" },
        { label: "Grouping customers with no labels into segments", bucket: "Unsupervised learning" },
        { label: "Classifying emails as spam using labeled examples", bucket: "Supervised learning" },
        { label: "Finding topics in a pile of unlabeled documents", bucket: "Unsupervised learning" },
      ],
    },
    explanation: "Supervised learning needs labeled examples (input + correct answer). Unsupervised learning finds structure with no labels at all.",
    xpReward: 15,
  },
  {
    slug: "ar-ml-pipeline-order",
    title: "Order the ML workflow",
    category: "ai-fundamentals",
    type: "ORDER_STEPS",
    difficulty: "MEDIUM",
    prompt: "Put these steps of a typical ML project in the right order.",
    data: {
      kind: "order-steps",
      items: [
        "Collect and clean the data",
        "Split into train and test sets",
        "Train the model",
        "Evaluate on the test set",
        "Deploy the model",
      ],
    },
    explanation: "Data first, then a fair train/test split before any training happens, then train, evaluate honestly, and only then ship it.",
    xpReward: 15,
  },
  {
    slug: "ar-python-list-vs-tuple",
    title: "List vs. tuple",
    category: "python",
    type: "MCQ",
    difficulty: "EASY",
    prompt: "Which statement about Python lists and tuples is correct?",
    data: {
      options: [
        "Lists are mutable, tuples are immutable",
        "Tuples are mutable, lists are immutable",
        "Both are immutable",
        "Both are mutable",
      ],
      answerIndex: 0,
    },
    explanation: "You can append/remove from a list after creating it. A tuple is locked in once created — that's the whole point of using one.",
    xpReward: 10,
  },
  {
    slug: "ar-python-predict-output",
    title: "Predict the output",
    category: "python",
    type: "PREDICT_OUTPUT",
    difficulty: "MEDIUM",
    prompt: "What does this print?",
    data: {
      code: 'data = {"a": 1, "b": 2}\nfor k, v in data.items():\n    if v % 2 == 0:\n        print(k)',
      options: ["b", "a", "a\\nb", "Nothing"],
      answerIndex: 0,
    },
    explanation: "Only v=2 (key 'b') is even, so only 'b' gets printed.",
    xpReward: 15,
  },
  {
    slug: "ar-python-spot-mistake",
    title: "Spot the mistake",
    category: "python",
    type: "SPOT_MISTAKE",
    difficulty: "MEDIUM",
    prompt: "This function is supposed to return the average, but has a bug. What's wrong?",
    data: {
      code: "def average(nums):\n    total = 0\n    for n in nums:\n        total = n\n    return total / len(nums)",
      options: [
        "`total = n` overwrites instead of accumulating — it should be `total += n`",
        "`len(nums)` should be `len(total)`",
        "The function is missing a `return` statement",
        "Nothing is wrong",
      ],
      answerIndex: 0,
    },
    explanation: "Each loop iteration replaces total instead of adding to it, so the function ends up dividing only the last value by the count.",
    xpReward: 15,
  },
  {
    slug: "ar-math-match-terms",
    title: "Match the math term",
    category: "math",
    type: "MATCH",
    difficulty: "MEDIUM",
    prompt: "Match each term to its definition.",
    data: {
      kind: "match",
      pairs: [
        { left: "Mean", right: "The sum of values divided by how many there are" },
        { left: "Variance", right: "How spread out the values are from the mean" },
        { left: "Gradient", right: "The direction and rate of steepest change of a function" },
        { left: "Correlation", right: "How strongly two variables move together" },
      ],
    },
    explanation: "These four show up constantly in ML — worth having rock solid.",
    xpReward: 15,
  },
  {
    slug: "ar-math-derivative-role",
    title: "What a derivative tells you",
    category: "math",
    type: "MCQ",
    difficulty: "MEDIUM",
    prompt: "In the context of training a model, what does a derivative (gradient) of the loss tell you?",
    data: {
      options: [
        "Which direction to adjust a weight to reduce the loss, and how steeply",
        "The final accuracy of the model",
        "How many training examples are needed",
        "The number of layers in the model",
      ],
      answerIndex: 0,
    },
    explanation: "Gradient descent literally follows the negative gradient — the direction that decreases loss fastest.",
    xpReward: 15,
  },
  {
    slug: "ar-ml-model-select-scenario",
    title: "Choose the right model",
    category: "ml",
    type: "MCQ",
    difficulty: "MEDIUM",
    prompt: "You need to predict a continuous number (tomorrow's temperature) from historical weather data. What's a reasonable first model to try?",
    data: {
      scenario: "Small, clean tabular dataset. Interpretability matters — your team wants to explain predictions.",
      options: ["Linear regression", "K-Means clustering", "A GAN", "PCA"],
      answerIndex: 0,
    },
    explanation: "Continuous output + interpretability need = a great fit for linear regression as a first baseline.",
    xpReward: 15,
  },
  {
    slug: "ar-ml-order-cross-val",
    title: "Order: evaluating a model properly",
    category: "ml",
    type: "ORDER_STEPS",
    difficulty: "HARD",
    prompt: "Arrange these steps in the correct order for properly evaluating a model.",
    data: {
      kind: "order-steps",
      items: [
        "Split data into train and test sets before touching the model",
        "Tune hyperparameters using only the training set (e.g. via cross-validation)",
        "Fit the final model on the full training set",
        "Evaluate once on the held-out test set",
      ],
    },
    explanation: "The test set must stay untouched until the very end — peeking at it during tuning silently inflates your real-world performance estimate.",
    xpReward: 20,
  },
  {
    slug: "ar-ml-bucket-metrics",
    title: "Sort the evaluation metrics",
    category: "ml",
    type: "DRAG_DROP",
    difficulty: "HARD",
    prompt: "Sort each metric by the kind of problem it's used for.",
    data: {
      kind: "bucket",
      buckets: ["Regression", "Classification"],
      items: [
        { label: "RMSE", bucket: "Regression" },
        { label: "F1 score", bucket: "Classification" },
        { label: "R²", bucket: "Regression" },
        { label: "Precision", bucket: "Classification" },
        { label: "MAE", bucket: "Regression" },
        { label: "ROC-AUC", bucket: "Classification" },
      ],
    },
    explanation: "Regression metrics measure numeric error. Classification metrics measure how well predicted classes match true classes.",
    xpReward: 20,
  },
  {
    slug: "ar-dl-activation-spot",
    title: "Spot the mistake: no activation",
    category: "deep-learning",
    type: "SPOT_MISTAKE",
    difficulty: "HARD",
    prompt: "A teammate stacks 5 dense layers with no activation function between any of them. What's wrong with this network?",
    data: {
      options: [
        "Without non-linear activations, the stack collapses mathematically into a single linear layer",
        "Nothing — more layers always means more power",
        "It will train faster than normal",
        "It can't process numerical data",
      ],
      answerIndex: 0,
    },
    explanation: "Composing linear functions gives you another linear function. Activations are what let deep networks learn curved, complex decision boundaries.",
    xpReward: 20,
  },
  {
    slug: "ar-dl-cnn-vs-dense",
    title: "CNN or plain dense network?",
    category: "deep-learning",
    type: "MCQ",
    difficulty: "MEDIUM",
    prompt: "For classifying photos of handwritten digits, why would a CNN typically outperform a plain fully-connected network of similar size?",
    data: {
      options: [
        "Convolutional filters exploit local spatial patterns (edges, curves) shared across the image",
        "CNNs don't need any training data",
        "CNNs can only be used for text",
        "Dense networks can't process numbers",
      ],
      answerIndex: 0,
    },
    explanation: "A small filter sliding across the image can detect an edge anywhere — a dense layer would have to relearn that pattern separately at every pixel position.",
    xpReward: 15,
  },
  {
    slug: "ar-cv-pixels",
    title: "How images become data",
    category: "cv",
    type: "MCQ",
    difficulty: "EASY",
    prompt: "A 28×28 grayscale image is fed into a model. How many numbers does the model actually see?",
    data: {
      options: ["784 (one per pixel)", "28", "56", "1"],
      answerIndex: 0,
    },
    explanation: "28 × 28 = 784 pixel intensity values — that's the raw numeric input before any processing.",
    xpReward: 10,
  },
  {
    slug: "ar-nlp-tfidf-vs-bow",
    title: "TF-IDF vs. bag of words",
    category: "nlp",
    type: "MCQ",
    difficulty: "MEDIUM",
    prompt: "What does TF-IDF add on top of a plain bag-of-words count?",
    data: {
      options: [
        "It downweights words that appear in almost every document, so common words matter less",
        "It removes all punctuation",
        "It translates text to another language",
        "It converts words into images",
      ],
      answerIndex: 0,
    },
    explanation: "A word like 'the' appears everywhere and carries little signal — TF-IDF's inverse-document-frequency term suppresses it automatically.",
    xpReward: 15,
  },
  {
    slug: "ar-nlp-tokenize-order",
    title: "Order a basic NLP pipeline",
    category: "nlp",
    type: "ORDER_STEPS",
    difficulty: "MEDIUM",
    prompt: "Arrange these text-preprocessing steps in a sensible order.",
    data: {
      kind: "order-steps",
      items: [
        "Tokenize the raw text into words",
        "Remove stop words",
        "Stem or lemmatize the remaining words",
        "Convert tokens into numeric features (e.g. TF-IDF)",
      ],
    },
    explanation: "You need tokens before you can filter or normalize them, and numeric features come last since models need numbers, not words.",
    xpReward: 15,
  },
  {
    slug: "ar-genai-rag-scenario",
    title: "When RAG earns its keep",
    category: "genai",
    type: "MCQ",
    difficulty: "MEDIUM",
    prompt: "You want an LLM assistant to answer questions using your company's internal, frequently-updated docs — without retraining the model every time a doc changes. What's the standard approach?",
    data: {
      options: [
        "Retrieval-augmented generation (RAG): fetch relevant chunks at query time and feed them to the model as context",
        "Fine-tune the model on the docs every night",
        "Ask the model to guess based on its training data",
        "Increase the model's temperature",
      ],
      answerIndex: 0,
    },
    explanation: "RAG keeps the model frozen and just changes what it's shown at query time — perfect for content that changes often.",
    xpReward: 20,
  },
  {
    slug: "ar-genai-agent-tools",
    title: "Agents and tool calling",
    category: "genai",
    type: "MCQ",
    difficulty: "HARD",
    prompt: "An LLM agent needs to check today's weather before answering. What lets it actually do that, rather than guessing?",
    data: {
      options: [
        "Tool/function calling — the model requests a real function be run and gets the result back",
        "A bigger context window",
        "A lower temperature setting",
        "Training the model from scratch on weather data",
      ],
      answerIndex: 0,
    },
    explanation: "Tool calling is what turns an LLM from 'a text generator' into 'a system that can take real actions and use fresh data.'",
    xpReward: 20,
  },
];

async function main() {
  for (const c of challenges) {
    const existing = await prisma.arenaChallenge.findFirst({ where: { id: c.slug } });
    const payload = {
      slug: c.slug,
      title: c.title,
      category: c.category,
      type: c.type,
      difficulty: c.difficulty,
      prompt: c.prompt,
      data: JSON.stringify(c.data),
      explanation: c.explanation,
      xpReward: c.xpReward,
      published: true,
    };
    if (existing) {
      await prisma.arenaChallenge.update({ where: { id: c.slug }, data: payload });
    } else {
      await prisma.arenaChallenge.create({ data: { id: c.slug, ...payload } });
    }
  }

  const count = await prisma.arenaChallenge.count();
  console.log(`Arena challenges seeded. Total published: ${count}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
