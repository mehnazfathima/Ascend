import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

type Q = {
  slug: string;
  type: string;
  category: "ai-fundamentals" | "python" | "math" | "ml" | "deep-learning";
  difficulty: "EASY" | "MEDIUM" | "HARD";
  prompt: string;
  scenario?: string;
  code?: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

const questions: Q[] = [
  {
    slug: "st-ml-vs-programming",
    type: "MCQ",
    category: "ai-fundamentals",
    difficulty: "EASY",
    prompt: "What best distinguishes machine learning from traditional programming?",
    options: [
      "ML learns patterns from data instead of following hand-written rules",
      "ML always runs faster than traditional code",
      "ML doesn't require any data",
      "ML programs can't make mistakes",
    ],
    answerIndex: 0,
    explanation:
      "Traditional programs follow rules you write explicitly. ML systems learn the rules (parameters) from examples.",
  },
  {
    slug: "st-features-target",
    type: "SCENARIO",
    category: "ai-fundamentals",
    difficulty: "MEDIUM",
    scenario: "You're building a system to predict house prices from square footage, location, and age.",
    prompt: "What are 'square footage', 'location', and 'age' called in ML terms?",
    options: ["Features", "Targets", "Labels", "Hyperparameters"],
    answerIndex: 0,
    explanation:
      "Inputs used to make a prediction are features. The thing you're predicting (price) is the target.",
  },
  {
    slug: "st-inference",
    type: "MCQ",
    category: "ai-fundamentals",
    difficulty: "EASY",
    prompt: "Which best describes 'inference'?",
    options: [
      "Using a trained model to make a prediction on new data",
      "Training a model from scratch",
      "Cleaning and preparing a dataset",
      "Deleting a model's parameters",
    ],
    answerIndex: 0,
    explanation: "Training builds the model; inference is putting it to work on data it hasn't seen before.",
  },
  {
    slug: "st-list-comprehension",
    type: "CODE_READ",
    category: "python",
    difficulty: "EASY",
    code: "nums = [1, 2, 3, 4]\nsquares = [n**2 for n in nums if n % 2 == 0]\nprint(squares)",
    prompt: "What does this print?",
    options: ["[4, 16]", "[1, 4, 9, 16]", "[2, 4]", "Error"],
    answerIndex: 0,
    explanation: "The comprehension keeps only even n (2, 4), then squares them: 4 and 16.",
  },
  {
    slug: "st-zero-division",
    type: "DEBUG",
    category: "python",
    difficulty: "MEDIUM",
    code: "def average(numbers):\n    return sum(numbers) / len(numbers)\n\nprint(average([]))",
    prompt: "What happens when this runs?",
    options: [
      "ZeroDivisionError, because len([]) is 0",
      "It prints 0",
      "It prints None",
      "It prints an empty list",
    ],
    answerIndex: 0,
    explanation:
      "Dividing by len([]) — which is 0 — raises a ZeroDivisionError. Guarding against empty input is a common real-world bug.",
  },
  {
    slug: "st-set-usage",
    type: "MCQ",
    category: "python",
    difficulty: "EASY",
    prompt:
      "Which data structure fits best for storing unique labels with no duplicates and no order requirement?",
    options: ["A set", "A list", "A tuple", "A dictionary"],
    answerIndex: 0,
    explanation: "Sets automatically enforce uniqueness and don't preserve insertion order — exactly this job.",
  },
  {
    slug: "st-mean-vs-median",
    type: "MCQ",
    category: "math",
    difficulty: "EASY",
    prompt:
      "A dataset has values [2, 4, 4, 4, 5, 5, 7, 9]. If you added an outlier of 500, which measure would move the most?",
    options: ["The mean", "The median", "The mode", "Neither — both are affected equally"],
    answerIndex: 0,
    explanation:
      "The mean is pulled hard by extreme values; the median barely moves. That's why skewed data (like income) is often reported with the median.",
  },
  {
    slug: "st-correlation-causation",
    type: "SCENARIO",
    category: "math",
    difficulty: "MEDIUM",
    scenario: "Two features, 'hours studied' and 'exam score', tend to rise and fall together.",
    prompt: "What does a high positive correlation between them tell you?",
    options: [
      "As one increases, the other tends to increase too — but it doesn't prove either causes the other",
      "Studying causes higher scores, guaranteed",
      "The two features are exactly equal",
      "There's no relationship at all",
    ],
    answerIndex: 0,
    explanation: "Correlation captures a statistical relationship, not causation — a classic trap.",
  },
  {
    slug: "st-learning-rate",
    type: "MCQ",
    category: "math",
    difficulty: "MEDIUM",
    prompt: "In gradient descent, what does the learning rate control?",
    options: [
      "How big a step the model takes when updating its weights",
      "How many features the model uses",
      "How much data the model sees",
      "The number of layers in the model",
    ],
    answerIndex: 0,
    explanation: "Too high and it overshoots the minimum; too low and training crawls.",
  },
  {
    slug: "st-spam-classification",
    type: "SCENARIO",
    category: "ml",
    difficulty: "MEDIUM",
    scenario: "You need to predict whether an email is spam or not spam.",
    prompt: "What kind of ML problem is this?",
    options: ["Binary classification", "Regression", "Clustering", "Dimensionality reduction"],
    answerIndex: 0,
    explanation: "Two discrete output classes (spam / not spam) — that's classification.",
  },
  {
    slug: "st-unsupervised-grouping",
    type: "MODEL_SELECT",
    category: "ml",
    difficulty: "MEDIUM",
    scenario:
      "You have unlabeled customer data and want to discover natural groupings, with no known 'correct answer' to check against.",
    prompt: "Which approach fits best?",
    options: [
      "Unsupervised learning, e.g. K-Means clustering",
      "Supervised classification",
      "Linear regression",
      "Reinforcement learning",
    ],
    answerIndex: 0,
    explanation: "No labels to learn from means this is unsupervised territory — clustering finds structure on its own.",
  },
  {
    slug: "st-overfitting-fix",
    type: "DEBUG",
    category: "ml",
    difficulty: "HARD",
    scenario: "A model gets 98% training accuracy but only 65% test accuracy.",
    prompt: "What's the most likely fix?",
    options: [
      "Add regularization or get more training data to reduce overfitting",
      "Train for even more epochs on the same data",
      "Remove the test set entirely",
      "Increase the model's parameter count further",
    ],
    answerIndex: 0,
    explanation:
      "That gap between train and test accuracy is the textbook signature of overfitting — the model memorized training data instead of learning patterns that generalize.",
  },
  {
    slug: "st-imbalanced-metric",
    type: "MCQ",
    category: "ml",
    difficulty: "MEDIUM",
    prompt: "Which metric matters most for a highly imbalanced dataset (99% negative, 1% positive class)?",
    options: [
      "Precision, recall, or F1 — not accuracy alone",
      "Accuracy alone",
      "Mean squared error",
      "R-squared",
    ],
    answerIndex: 0,
    explanation:
      "A model that always predicts 'negative' would score 99% accuracy while being useless — precision/recall/F1 expose that.",
  },
  {
    slug: "st-activation-function",
    type: "MCQ",
    category: "deep-learning",
    difficulty: "EASY",
    prompt: "What is the role of an activation function in a neural network?",
    options: [
      "It introduces non-linearity so the network can learn complex patterns, not just straight lines",
      "It stores the training data",
      "It deletes unused neurons",
      "It counts the number of layers",
    ],
    answerIndex: 0,
    explanation: "Stack linear layers without activations and the whole network collapses into one linear function.",
  },
  {
    slug: "st-loss-spike",
    type: "SCENARIO",
    category: "deep-learning",
    difficulty: "MEDIUM",
    scenario: "You're training a neural network and the loss goes down for a while, then starts climbing again.",
    prompt: "What's the most likely cause?",
    options: [
      "The learning rate is too high, causing the optimizer to overshoot",
      "The model has too few parameters",
      "The dataset is too large",
      "The activation function was removed",
    ],
    answerIndex: 0,
    explanation: "An overshooting optimizer bounces past the minimum instead of settling into it. Lowering the learning rate usually fixes it.",
  },
  {
    slug: "st-cnn-for-images",
    type: "MODEL_SELECT",
    category: "deep-learning",
    difficulty: "MEDIUM",
    scenario: "You need to classify images of cats vs dogs.",
    prompt: "Which architecture is purpose-built for this?",
    options: ["A convolutional neural network (CNN)", "A decision tree", "Linear regression", "K-Means clustering"],
    answerIndex: 0,
    explanation: "CNNs use convolutional filters that exploit spatial structure in images — the standard tool for vision tasks.",
  },
];

async function main() {
  for (const q of questions) {
    const { slug, type, category, difficulty, prompt, ...rest } = q;
    const data = JSON.stringify({
      scenario: rest.scenario,
      code: rest.code,
      options: rest.options,
      answerIndex: rest.answerIndex,
      explanation: rest.explanation,
    });

    const existing = await prisma.skillTestQuestion.findFirst({ where: { id: slug } });
    if (existing) {
      await prisma.skillTestQuestion.update({
        where: { id: slug },
        data: { type, category, difficulty, prompt, data, published: true },
      });
    } else {
      await prisma.skillTestQuestion.create({
        data: { id: slug, type, category, difficulty, prompt, data, published: true },
      });
    }
  }

  const count = await prisma.skillTestQuestion.count();
  console.log(`Skill test questions seeded. Total published questions: ${count}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
