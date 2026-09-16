import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

type Depth = "SIMPLE" | "UNDERSTAND" | "DEEP";
type Explanation = { depth: Depth; content: string };
type Section = {
  kind: "VISUALIZE" | "TRY_IT" | "CODE";
  title: string;
  body?: string;
  code?: string;
  visualizerKey?: string;
  data?: Record<string, unknown>;
  order: number;
};
type ConceptSeed = {
  slug: string;
  title: string;
  cardLabel: string;
  oneLiner: string;
  levelIndex: number;
  order: number;
  estimatedMinutes: number;
  realWorldExamples: string[];
  tags: string[];
  explanations: Explanation[];
  sections?: Section[];
  prerequisites?: string[];
};

const levels = [
  { index: 0, slug: "ai-foundations", title: "AI Foundations", colorTheme: "ember", description: "The mental model everything else in AI builds on — what a model actually is, and how it learns." },
  { index: 1, slug: "python-for-ai", title: "Python for AI", colorTheme: "forest", description: "Just enough Python to read, write, and reason about the code AI actually runs on." },
  { index: 2, slug: "math-for-ai", title: "Math for AI", colorTheme: "gold", description: "The intuition behind vectors, probability, and optimization — building toward how models learn." },
  { index: 3, slug: "machine-learning", title: "Machine Learning", colorTheme: "slate", description: "The core algorithms behind most real-world AI systems, and how to tell if they're actually working." },
  { index: 4, slug: "deep-learning", title: "Deep Learning", colorTheme: "clay", description: "How neural networks are built and trained, and what makes them different from classical ML." },
  { index: 5, slug: "computer-vision", title: "Computer Vision", colorTheme: "ember", description: "Teaching machines to make sense of images and video." },
  { index: 6, slug: "nlp", title: "NLP", colorTheme: "forest", description: "Teaching machines to make sense of language." },
  { index: 7, slug: "generative-ai", title: "Generative AI", colorTheme: "gold", description: "LLMs, retrieval, and agents — building with the models everyone's talking about." },
  { index: 8, slug: "production-ai", title: "Production AI", colorTheme: "slate", description: "Shipping models as real, reliable systems." },
  { index: 9, slug: "responsible-ai", title: "Responsible AI", colorTheme: "clay", description: "Bias, safety, and the judgment calls that come with deploying AI." },
  { index: 10, slug: "ai-real-world", title: "AI in the Real World", colorTheme: "ember", description: "Where all of this actually gets used, industry by industry." },
];

const concepts: ConceptSeed[] = [
  // ---------------- LEVEL 0: AI FOUNDATIONS ----------------
  {
    slug: "what-is-ai",
    title: "What is Artificial Intelligence?",
    cardLabel: "What is AI?",
    oneLiner: "Getting a machine to do things that normally need human judgment.",
    levelIndex: 0, order: 0, estimatedMinutes: 10,
    realWorldExamples: ["Voice assistants understanding spoken requests", "Netflix predicting what you'll want to watch next", "Spam filters deciding what belongs in your inbox"],
    tags: ["fundamentals"],
    explanations: [
      { depth: "SIMPLE", content: "AI is when a computer does something that would normally require a person to think it through — like recognizing a face, translating a sentence, or recommending a movie. It's not one thing; it's a whole toolbox of techniques for making that possible." },
      { depth: "UNDERSTAND", content: "\"AI\" is an umbrella term, not a specific technique. It covers everything from simple rule-based systems (\"if temperature < 18, turn on heat\") to modern machine learning systems that learn their own rules from data. What almost all modern AI has in common: instead of a programmer writing out every rule by hand, the system is shown examples and learns patterns from them.\n\nMost of what people mean by \"AI\" today — recommendation engines, voice assistants, image recognition, chatbots — is really **machine learning**, a specific approach within the broader AI field." },
      { depth: "DEEP", content: "Formally, AI research spans symbolic reasoning (logic, search, planning), and statistical/learning-based approaches (machine learning, deep learning). The field's founding definition (Turing, 1950) asked whether a machine could exhibit behavior indistinguishable from a human's — a definition about *behavior*, not internal mechanism, which is why such wildly different techniques (decision trees, neural networks, search algorithms) all fall under \"AI.\" Modern practical AI is dominated by statistical learning because it scales with data and compute in a way hand-written rules never could." },
    ],
  },
  {
    slug: "ai-ml-dl",
    title: "AI vs. Machine Learning vs. Deep Learning",
    cardLabel: "AI vs ML vs DL",
    oneLiner: "Three nested circles, not three different things.",
    levelIndex: 0, order: 1, estimatedMinutes: 10,
    realWorldExamples: ["A chess engine using search (AI, not ML)", "A credit-scoring model trained on past loans (ML)", "A self-driving car's vision system (deep learning)"],
    tags: ["fundamentals"],
    explanations: [
      { depth: "SIMPLE", content: "Think of three nested circles. AI is the biggest one — any technique that makes a machine act smart. Machine learning (ML) is a circle inside it — AI that learns from data instead of following fixed rules. Deep learning is a smaller circle inside ML — machine learning that uses many-layered neural networks, especially good at messy data like images, audio, and text." },
      { depth: "UNDERSTAND", content: "**AI** is the goal (smart behavior). **Machine learning** is one strategy for getting there: instead of a person writing rules, the system learns statistical patterns from labeled or unlabeled examples. **Deep learning** is a specific family of ML models — neural networks with multiple (\"deep\") layers — that turned out to be extremely good at learning from raw, unstructured data like pixels or raw text, where classical ML usually needed a person to hand-engineer useful features first.\n\nSo: every deep learning system is a machine learning system, and every machine learning system is an AI system — but not the reverse. A hard-coded chess-move search tree is AI, but it's not ML, because nothing was learned from data." },
      { depth: "DEEP", content: "The practical dividing line between classical ML and deep learning is *representation learning*. Classical models (linear regression, decision trees, SVMs) operate on features a human chose (e.g. \"square footage,\" \"word count\"). Deep networks learn their own intermediate representations directly from raw input via composed non-linear transformations — each layer builds more abstract features from the last (edges → shapes → object parts → objects, in a CNN). This is why deep learning needs more data and compute than classical ML for the same task, but it also removes the ceiling that hand-engineered features impose." },
    ],
  },
  {
    slug: "data-and-features",
    title: "Data, Features & Targets",
    cardLabel: "Data & Features",
    oneLiner: "The raw material every model learns from, and the vocabulary for talking about it.",
    levelIndex: 0, order: 2, estimatedMinutes: 12,
    realWorldExamples: ["Predicting a house's price from its size, location, and age", "Flagging a transaction as fraud from spending patterns", "Recommending a song from a user's listening history"],
    tags: ["fundamentals", "data"],
    explanations: [
      { depth: "SIMPLE", content: "A **feature** is one piece of input information a model uses to make a decision — like a house's square footage. The **target** is the thing you're trying to predict — like the house's price. A row of features paired with its target is one example the model learns from." },
      { depth: "UNDERSTAND", content: "Say you're predicting house prices. Your **features** might be square footage, number of bedrooms, and neighborhood. Your **target** is the sale price. Each historical house sale is one row of data: features in, target out. A model's whole job during training is to find a pattern that maps features to target as accurately as possible across many such rows.\n\nNot all data starts out usable — real-world data is messy, has missing values, and often needs cleaning and transforming before it's fed to a model. That prep work (called feature engineering) is often where most of the actual effort in a project goes." },
      { depth: "DEEP", content: "Formally, a dataset is a set of examples {(x⁽ⁱ⁾, y⁽ⁱ⁾)}, where x⁽ⁱ⁾ ∈ ℝⁿ is a feature vector (n features) and y⁽ⁱ⁾ is the target — a real number for regression, a class label for classification. Feature quality bounds model quality: a model can't learn a relationship that isn't represented in its features (this is why feature engineering, and later, representation learning, matter so much). Feature scaling, encoding categorical variables, and handling missing data are standard preprocessing steps that materially affect how well many algorithms — especially distance-based ones like KNN — perform." },
    ],
    sections: [
      { kind: "TRY_IT", title: "Try it", order: 0, data: { prompt: "You're predicting whether a customer will cancel their subscription. Which of these is the target, not a feature?", options: ["Whether the customer canceled (yes/no)", "How many days since their last login", "How many support tickets they've filed", "Their subscription plan tier"], answerIndex: 0, explanation: "The target is the outcome you're trying to predict. The other three describe the customer — those are features you'd use to predict it." } },
    ],
  },
  {
    slug: "models-and-training",
    title: "Models, Training & Inference",
    cardLabel: "Training",
    oneLiner: "A model is a function with knobs; training is how those knobs get turned.",
    levelIndex: 0, order: 3, estimatedMinutes: 12,
    realWorldExamples: ["A trained spam classifier scoring a new incoming email", "A recommendation model updated nightly on the latest clicks", "A fraud model's threshold (hyperparameter) tuned to balance false alarms"],
    tags: ["fundamentals"],
    explanations: [
      { depth: "SIMPLE", content: "A **model** is the thing that makes predictions — you can think of it as a function with adjustable knobs. **Training** is the process of turning those knobs using example data until the predictions get good. **Inference** is using the finished model to make a prediction on something new it hasn't seen before." },
      { depth: "UNDERSTAND", content: "A model's **parameters** are the knobs that get learned automatically during training (like the slope and intercept in a line of best fit). **Hyperparameters** are settings a person chooses before training even starts (like how many trees to build, or how fast the model should learn) — they control *how* training happens, not what gets learned.\n\nTraining = show the model examples, measure how wrong its predictions are, adjust the parameters to be less wrong, repeat. Once training is done, the model is frozen and ready for **inference**: feed it new input, get a prediction back, with no further learning happening." },
      { depth: "DEEP", content: "A model is a parameterized function f(x; θ) that maps input x to a prediction ŷ. Training is an optimization problem: find θ that minimizes a loss function L(ŷ, y) averaged over the training set. Parameters θ are learned via the optimization procedure (e.g. gradient descent); hyperparameters (learning rate, regularization strength, tree depth, number of layers) are set externally and typically chosen via a validation set or search procedure, since they define the *shape* of the optimization problem rather than being solved by it. Inference is simply evaluating f(x; θ) at a fixed, already-learned θ." },
    ],
  },
  {
    slug: "train-test-validation",
    title: "Train, Test & Validation Data",
    cardLabel: "Train/Test Split",
    oneLiner: "Why you never grade a model's homework with the answer key it studied from.",
    levelIndex: 0, order: 4, estimatedMinutes: 12,
    realWorldExamples: ["Holding out last month's sales to fairly test a forecasting model", "Using a validation set to pick the best tree depth before final testing", "A Kaggle competition's hidden test set that no one can see during training"],
    tags: ["fundamentals", "evaluation"],
    explanations: [
      { depth: "SIMPLE", content: "You split your data into separate piles: one to teach the model (**training data**), one to help you tune it while building (**validation data**), and one you only look at once, right at the end, to see how well it really works (**test data**). If you let the model see the test data early, your evaluation lies to you." },
      { depth: "UNDERSTAND", content: "**Training data** is what the model directly learns patterns from. **Validation data** is a separate slice used *during development* — to compare different models or hyperparameter settings — without contaminating the final evaluation. **Test data** is untouched until the very end; it's your best honest estimate of how the model will perform on data it's never seen, which is the whole point of building it.\n\nA common split is roughly 70% train / 15% validation / 15% test, though the right ratios depend on how much data you have. The critical rule: never let information from validation or test data leak into training." },
      { depth: "DEEP", content: "This split exists to produce an unbiased estimate of generalization error. If you tune hyperparameters against the test set, you're implicitly fitting to it, and your test score becomes optimistic — this is why a separate validation set (or k-fold cross-validation) is used for model selection, leaving the test set as a single, final, untouched check. With small datasets, k-fold cross-validation is often preferred over a single validation split: the data is divided into k folds, the model is trained k times (each time holding out a different fold), and performance is averaged — this uses the data more efficiently while still respecting the train/evaluate separation." },
    ],
  },

  // ---------------- LEVEL 1: PYTHON FOR AI ----------------
  {
    slug: "python-basics",
    title: "Variables, Types & Control Flow",
    cardLabel: "Python Basics",
    oneLiner: "The building blocks every Python script — including every ML script — is made of.",
    levelIndex: 1, order: 0, estimatedMinutes: 20,
    realWorldExamples: ["A loop that preprocesses 10,000 image files", "A conditional that filters out invalid rows in a dataset", "A function that computes a model's accuracy"],
    tags: ["python"],
    explanations: [
      { depth: "SIMPLE", content: "Variables store values. Types describe what kind of value it is (a number, text, true/false). Conditions (`if`) let code make decisions, loops (`for`/`while`) let code repeat, and functions let you package up steps to reuse. That's most of what you need to start reading ML code." },
      { depth: "UNDERSTAND", content: "Python's core types you'll see constantly: `int`/`float` (numbers), `str` (text), `bool` (True/False). A variable is just a name pointing at a value: `learning_rate = 0.01`. `if`/`elif`/`else` branches based on a condition. `for item in collection:` loops over each item; `while condition:` loops until the condition is false. A `def` block defines a reusable function with inputs (parameters) and an output (`return`).\n\nAlmost every ML script is built from exactly these pieces: loop over data, transform it with conditions and functions, and pass the result into a model." },
      { depth: "DEEP", content: "Python is dynamically typed (a variable's type is checked at runtime, not compile time) and uses reference semantics for mutable objects — assigning a list to a new variable name doesn't copy it, both names point at the same object in memory, which matters a lot once you're passing NumPy arrays and DataFrames around. Functions are first-class objects, meaning they can be passed as arguments — a pattern used constantly in ML code (e.g. passing a loss function or activation function into a training loop)." },
    ],
    sections: [
      { kind: "CODE", title: "Code", order: 0, code: "def is_valid_score(score):\n    return 0 <= score <= 100\n\nscores = [92, -5, 78, 150, 60]\nvalid_scores = [s for s in scores if is_valid_score(s)]\nprint(valid_scores)  # [92, 78, 60]" },
    ],
  },
  {
    slug: "python-data-structures",
    title: "Lists, Dicts, Sets & Tuples",
    cardLabel: "Lists & Dicts",
    oneLiner: "The containers that hold every dataset you'll ever touch in Python.",
    levelIndex: 1, order: 1, estimatedMinutes: 18,
    realWorldExamples: ["A dictionary mapping each word to how often it appears", "A list of feature vectors fed into a model batch by batch", "A set used to quickly check for duplicate user IDs"],
    tags: ["python"],
    explanations: [
      { depth: "SIMPLE", content: "A **list** is an ordered, changeable collection: `[1, 2, 3]`. A **dictionary** maps keys to values: `{\"name\": \"Ada\"}`. A **set** holds unique items with no duplicates. A **tuple** is like a list but locked — it can't be changed after creation. A **class** lets you bundle related data and behavior together into your own custom type." },
      { depth: "UNDERSTAND", content: "You'll reach for each of these constantly: lists for ordered sequences of examples, dictionaries for looking things up by name (like a row of features, or a word-to-count mapping), sets for deduplication and fast membership checks, and tuples for fixed, small groupings that shouldn't change (like an (x, y) coordinate).\n\nClasses come in once you're organizing more complex code — a custom `Dataset` class, for example, might bundle the data itself together with methods for loading and transforming it." },
      { depth: "DEEP", content: "Performance matters here: checking `x in my_list` is O(n) — it has to scan every element — while `x in my_set` or `x in my_dict` is O(1) average case, thanks to hashing. This is why deduplicating or doing repeated lookups against a large list is a classic performance bug; switching to a set or dict fixes it instantly. Tuples being immutable also makes them hashable, so they can be used as dictionary keys or set members — a plain list cannot." },
    ],
    sections: [
      { kind: "CODE", title: "Code", order: 0, code: "word_counts = {}\nfor word in \"the cat sat on the mat\".split():\n    word_counts[word] = word_counts.get(word, 0) + 1\n\nprint(word_counts)  # {'the': 2, 'cat': 1, 'sat': 1, 'on': 1, 'mat': 1}" },
    ],
  },
  {
    slug: "numpy-pandas",
    title: "NumPy & Pandas",
    cardLabel: "NumPy & Pandas",
    oneLiner: "Fast arrays for math, and spreadsheet-like tables for real datasets.",
    levelIndex: 1, order: 2, estimatedMinutes: 20,
    realWorldExamples: ["Computing a whole column of predictions in one vectorized operation", "Loading a CSV of sales data and grouping it by region", "Normalizing an image's pixel values before feeding it to a model"],
    tags: ["python", "data"],
    explanations: [
      { depth: "SIMPLE", content: "**NumPy** gives Python fast arrays and the math operations to go with them — nearly every ML library is built on top of it. **Pandas** gives you DataFrames: spreadsheet-like tables that make it easy to load, clean, filter, and summarize real datasets." },
      { depth: "UNDERSTAND", content: "NumPy arrays let you do math on entire collections of numbers at once (`array * 2` doubles every element) instead of writing a manual loop — this is called **vectorization**, and it's both far more concise and far faster than plain Python loops, because the looping happens in optimized C code under the hood.\n\nPandas builds on NumPy to give you a `DataFrame` — rows and columns, like a spreadsheet, with labels. You'll use it to load a CSV, inspect and clean it (handle missing values, filter rows, group and aggregate), and hand the cleaned result off to a model." },
      { depth: "DEEP", content: "NumPy's speed comes from storing data in contiguous, fixed-type memory blocks and pushing operations down into compiled C loops (and often SIMD-vectorized instructions), avoiding Python's per-element interpreter overhead entirely. Broadcasting lets NumPy apply operations across arrays of different shapes without manually copying data (e.g. adding a shape-(3,) vector to every row of a shape-(100, 3) matrix). Pandas DataFrames are essentially a collection of NumPy arrays (one per column) with an index and axis labels layered on top, which is why most Pandas operations ultimately compile down to the same fast array math." },
    ],
    sections: [
      { kind: "CODE", title: "Code", order: 0, code: "import numpy as np\nimport pandas as pd\n\nprices = np.array([100, 150, 200])\ndiscounted = prices * 0.9  # vectorized, no loop\n\ndf = pd.DataFrame({\"item\": [\"A\", \"B\", \"C\"], \"price\": prices})\nprint(df[df[\"price\"] > 120])" },
    ],
    prerequisites: ["python-data-structures"],
  },

  // ---------------- LEVEL 2: MATH FOR AI ----------------
  {
    slug: "vectors-and-matrices",
    title: "Vectors & Matrices",
    cardLabel: "Vectors",
    oneLiner: "The language every model's data and parameters are actually written in.",
    levelIndex: 2, order: 0, estimatedMinutes: 15,
    realWorldExamples: ["A word represented as a 300-number vector capturing its meaning", "An image stored as a matrix of pixel values", "A neural network layer's weights stored as a matrix"],
    tags: ["math"],
    explanations: [
      { depth: "SIMPLE", content: "A **vector** is just a list of numbers, like [3, 1, 4]. A **matrix** is a grid of numbers — rows and columns. Almost everything in ML — a row of features, an image, a set of model weights — is stored and manipulated as vectors and matrices, because that lets you do huge amounts of math on them very quickly." },
      { depth: "UNDERSTAND", content: "A single example's features become a vector: a house with 3 bedrooms, 2 bathrooms, 1800 sqft might be represented as [3, 2, 1800]. A whole dataset of many examples stacks those vectors into a matrix — one row per example, one column per feature. Model weights are also vectors or matrices, and a prediction is often literally a matrix multiplication between the input matrix and the weight matrix.\n\nThis is why linear algebra matters for ML: it's not abstract math bolted on — it's the actual data structure and the actual operation your model runs, at every single step." },
      { depth: "DEEP", content: "A vector x ∈ ℝⁿ; a matrix W ∈ ℝᵐˣⁿ maps vectors from ℝⁿ to ℝᵐ via matrix-vector multiplication Wx. A linear layer in a neural network is literally y = Wx + b. Operations like the dot product (x · y = Σxᵢyᵢ) measure similarity/alignment between vectors and underlie everything from cosine similarity in embeddings to attention scores in transformers. GPUs are fast at ML specifically because matrix multiplication parallelizes extremely well across thousands of cores." },
    ],
  },
  {
    slug: "probability-basics",
    title: "Probability & Distributions",
    cardLabel: "Probability",
    oneLiner: "How models express and reason about uncertainty.",
    levelIndex: 2, order: 1, estimatedMinutes: 15,
    realWorldExamples: ["A spam filter outputting '92% likely spam' instead of a flat yes/no", "A weather model's forecast distribution over tomorrow's temperature", "A language model's probability distribution over the next word"],
    tags: ["math"],
    explanations: [
      { depth: "SIMPLE", content: "Probability is a number between 0 and 1 describing how likely something is. A **distribution** describes the probability of every possible outcome — like the odds of rolling each number on a die. Most ML models don't just output a single guess; they output probabilities, which is what lets them express \"pretty sure\" versus \"not sure at all.\"" },
      { depth: "UNDERSTAND", content: "A classification model doesn't just say \"cat\" — it typically outputs a probability distribution over all possible classes, like {cat: 0.85, dog: 0.10, bird: 0.05}. Whichever is highest becomes the prediction, but the full distribution is often more useful, since it tells you how confident the model actually is.\n\nThe **normal (Gaussian) distribution** — the classic bell curve — shows up constantly in ML: many real-world quantities cluster around an average with predictable spread, and a lot of statistical methods assume roughly this shape." },
      { depth: "DEEP", content: "A probability distribution assigns a probability to every possible outcome of a random variable, summing (or integrating, for continuous variables) to 1. Classification models are typically trained to output a valid probability distribution over classes via a softmax function, and trained with a loss (cross-entropy) that directly measures how well that predicted distribution matches reality. Bayes' theorem — P(A|B) = P(B|A)P(A) / P(B) — underlies an entire family of models (naive Bayes) and is the conceptual backbone of how models should update beliefs given new evidence." },
    ],
  },
  {
    slug: "stats-essentials",
    title: "Mean, Variance & Correlation",
    cardLabel: "Statistics",
    oneLiner: "The handful of numbers that summarize a dataset's shape.",
    levelIndex: 2, order: 2, estimatedMinutes: 15,
    realWorldExamples: ["Reporting median income instead of mean to avoid distortion by outliers", "Standardizing features so no one column dominates a model just by having bigger numbers", "Spotting that two features are redundant because they're highly correlated"],
    tags: ["math", "statistics"],
    explanations: [
      { depth: "SIMPLE", content: "**Mean** is the average. **Median** is the middle value. **Variance** and **standard deviation** measure how spread out the data is. **Correlation** measures how strongly two things move together. These are the basic vocabulary for describing what a dataset actually looks like before you model it." },
      { depth: "UNDERSTAND", content: "Mean can be misleading with outliers (one billionaire skews the average income of a room); median is more robust. Variance measures average squared distance from the mean — a high-variance feature is spread out, a low-variance one is tightly clustered. Standard deviation is just the square root of variance, in the original units, which makes it easier to interpret.\n\nCorrelation (ranging from -1 to 1) tells you whether two variables tend to move together (positive), oppositely (negative), or independently (near 0) — but crucially, correlation never proves one causes the other. Covariance is the unnormalized version of correlation, before it's scaled into that -1 to 1 range." },
      { depth: "DEEP", content: "Variance: Var(X) = E[(X − μ)²]. Standard deviation: σ = √Var(X). Covariance between two variables: Cov(X, Y) = E[(X − μₓ)(Y − μᵧ)]; Pearson correlation normalizes this by both standard deviations: ρ = Cov(X, Y) / (σₓσᵧ), bounding it to [-1, 1]. These statistics matter operationally too: feature standardization (subtracting the mean, dividing by the standard deviation) is a near-universal preprocessing step because many algorithms — gradient descent, KNN, PCA — behave poorly or inconsistently when features are on very different scales." },
    ],
  },
  {
    slug: "derivatives-and-gradients",
    title: "Derivatives, Gradients & Optimization",
    cardLabel: "Gradients",
    oneLiner: "How a model figures out which direction to adjust itself to get better.",
    levelIndex: 2, order: 3, estimatedMinutes: 18,
    realWorldExamples: ["A model's weights nudged slightly after every batch of training data", "Tuning a thermostat's response curve to minimize overshoot", "Finding the fastest route by minimizing total travel time"],
    tags: ["math", "optimization"],
    explanations: [
      { depth: "SIMPLE", content: "A **derivative** tells you how much a function's output changes when you nudge its input slightly — the slope. A **gradient** is that same idea for functions with many inputs at once. Models use gradients to figure out exactly which direction to adjust their internal knobs to reduce their error, a little at a time — that process is called **optimization**." },
      { depth: "UNDERSTAND", content: "Imagine standing on a hillside in fog, trying to reach the bottom (the lowest error). You can't see the whole landscape, but you can feel which way is downhill right where you're standing — that's the gradient. Take a small step downhill, recheck the slope, step again. Repeat that enough times and you reach the bottom (or close to it).\n\nThat's exactly what training a model does: the \"landscape\" is the loss function (how wrong the model is), the \"position\" is the model's current parameters, and each step is a small parameter update in the direction that reduces error the fastest — called **gradient descent**." },
      { depth: "DEEP", content: "For a function f(θ), the gradient ∇f(θ) is the vector of partial derivatives with respect to each parameter, pointing in the direction of steepest *increase*. Gradient descent updates parameters via θ ← θ − α∇f(θ), where α is the learning rate — subtracting the gradient moves toward steepest *decrease*. Too large an α overshoots and can diverge; too small converges painfully slowly. In deep learning, the gradient of the loss with respect to every parameter is computed efficiently via backpropagation (the chain rule applied layer by layer), and modern optimizers (SGD with momentum, Adam) adapt the effective step size per parameter based on the history of past gradients, converging faster and more reliably than plain gradient descent." },
    ],
    sections: [
      { kind: "TRY_IT", title: "Try it", order: 0, data: { prompt: "During training, the loss barely decreases each step and training takes forever. What's the most likely fix?", options: ["Increase the learning rate", "Decrease the number of features", "Switch to a different programming language", "Add more layers to slow it down"], answerIndex: 0, explanation: "Painfully slow convergence is the classic symptom of too small a learning rate — the steps downhill are too tiny." } },
    ],
  },

  // ---------------- LEVEL 3: MACHINE LEARNING ----------------
  {
    slug: "linear-regression",
    title: "Linear Regression",
    cardLabel: "Linear Regression",
    oneLiner: "Fitting the straightest line through your data to predict a number.",
    levelIndex: 3, order: 0, estimatedMinutes: 18,
    realWorldExamples: ["Predicting house prices from square footage", "Forecasting monthly revenue from ad spend", "Estimating delivery time from distance and traffic"],
    tags: ["ml", "regression"],
    explanations: [
      { depth: "SIMPLE", content: "Linear regression draws the straight line that best fits your data points, so you can use it to predict a number for new inputs. More square footage tends to mean a higher price — linear regression finds exactly how much higher, on average, per square foot." },
      { depth: "UNDERSTAND", content: "The model learns two things from your data: a slope (how much the prediction changes per unit of input) and an intercept (the baseline prediction when input is zero). During training, it searches for the line that minimizes the total distance between the line and all the actual data points — usually measured as squared error, so bigger misses are penalized more than small ones.\n\nWith more than one feature, it's the same idea generalized: each feature gets its own weight, and the prediction is a weighted sum of all of them plus an intercept." },
      { depth: "DEEP", content: "The model: ŷ = w·x + b (or, with one feature, ŷ = mx + b). Training minimizes mean squared error: MSE = (1/n)Σ(yᵢ − ŷᵢ)². This has a closed-form solution (the normal equation, via linear algebra) for small datasets, or can be solved iteratively with gradient descent for larger ones — both arrive at the same optimal weights, since MSE is convex in w and b. Key assumptions: the true relationship is approximately linear, and errors are roughly homoscedastic (similar variance across the input range) — violating these doesn't break the algorithm, but does undermine how much you should trust it." },
    ],
    sections: [
      { kind: "VISUALIZE", title: "Visualize", order: 0, body: "Drag any point and watch the best-fit line recompute instantly — that's least-squares regression happening live.", visualizerKey: "linear-regression" },
      { kind: "TRY_IT", title: "Try it", order: 1, data: { prompt: "You're predicting a continuous number (price) from continuous features (size). What's the right family of model to reach for first?", options: ["Regression", "Classification", "Clustering", "Dimensionality reduction"], answerIndex: 0, explanation: "Continuous, numeric output means regression, not classification (discrete categories) or clustering (no labels at all)." } },
      { kind: "CODE", title: "Code", order: 2, code: "from sklearn.linear_model import LinearRegression\n\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\n\nprediction = model.predict(X_test)\nprint(model.coef_, model.intercept_)" },
    ],
    prerequisites: ["data-and-features", "vectors-and-matrices"],
  },
  {
    slug: "logistic-regression",
    title: "Logistic Regression",
    cardLabel: "Logistic Regression",
    oneLiner: "Linear regression's cousin, built for yes/no questions.",
    levelIndex: 3, order: 1, estimatedMinutes: 16,
    realWorldExamples: ["Predicting whether a customer will churn", "Classifying an email as spam or not spam", "Estimating the probability a loan applicant defaults"],
    tags: ["ml", "classification"],
    explanations: [
      { depth: "SIMPLE", content: "Despite the name, logistic regression is for classification, not predicting a number — it answers yes/no (or category A/B/C) questions. Instead of a straight line, it outputs a probability between 0 and 1, like \"78% chance this is spam.\"" },
      { depth: "UNDERSTAND", content: "Logistic regression starts the same way linear regression does — a weighted sum of the features — but then squashes that number through a special S-shaped curve (the sigmoid function) so the output always lands between 0 and 1. That number is interpreted as a probability, and a threshold (often 0.5) turns it into a final yes/no decision.\n\nIt's trained to make the predicted probabilities match reality as closely as possible, using a loss function suited to probabilities (cross-entropy) rather than the squared-error loss used for plain number prediction." },
      { depth: "DEEP", content: "Model: p = σ(w·x + b), where σ(z) = 1 / (1 + e⁻ᶻ) is the sigmoid function. Training minimizes binary cross-entropy: −(1/n)Σ[yᵢ log(pᵢ) + (1−yᵢ)log(1−pᵢ)], which heavily penalizes confident wrong predictions. Unlike linear regression's MSE, this loss has no closed-form solution — it's solved iteratively via gradient descent. The decision boundary (where p = 0.5) is linear in feature space, which is why logistic regression, despite handling classification, is still considered a *linear* model — it can only separate classes with a straight line (or hyperplane) unless you engineer non-linear features into it." },
    ],
    sections: [
      { kind: "TRY_IT", title: "Try it", order: 0, data: { prompt: "A logistic regression model outputs 0.62 for a given email. What does that mean?", options: ["The model estimates a 62% probability the email is spam", "The email is 62% of the way through processing", "The model is 62% accurate overall", "The email has 62 spam keywords"], answerIndex: 0, explanation: "Logistic regression's raw output is a probability for the positive class — here, a 62% estimated chance of spam." } },
      { kind: "CODE", title: "Code", order: 1, code: "from sklearn.linear_model import LogisticRegression\n\nmodel = LogisticRegression()\nmodel.fit(X_train, y_train)\n\nprobabilities = model.predict_proba(X_test)\nlabels = model.predict(X_test)" },
    ],
    prerequisites: ["linear-regression"],
  },
  {
    slug: "knn",
    title: "K-Nearest Neighbors",
    cardLabel: "KNN",
    oneLiner: "Predict by asking: what do the most similar examples look like?",
    levelIndex: 3, order: 2, estimatedMinutes: 14,
    realWorldExamples: ["Recommending products similar to ones a customer already bought", "Classifying a handwritten digit by comparing it to labeled examples", "Flagging a transaction as fraud because it resembles known fraud cases"],
    tags: ["ml", "classification"],
    explanations: [
      { depth: "SIMPLE", content: "K-Nearest Neighbors doesn't really \"learn\" a formula — it just remembers all the training data. To predict something new, it finds the K most similar examples it already knows, and goes with whatever they mostly agree on." },
      { depth: "UNDERSTAND", content: "\"Similar\" usually means close in feature space — measured with something like Euclidean distance. To classify a new point, KNN finds the K closest labeled points and takes a majority vote among their labels (for regression, it averages their values instead). K is a hyperparameter you choose: small K is sensitive to noise, large K smooths things out but can blur real boundaries between classes.\n\nKNN has no real \"training\" phase beyond storing the data — all the work happens at prediction time, which is why it's called a **lazy learner**." },
      { depth: "DEEP", content: "For a query point x, KNN computes distance (commonly Euclidean: √Σ(xᵢ−x'ᵢ)²) to every training point, sorts, takes the K nearest, and aggregates their labels (majority vote for classification, mean for regression). Its accuracy is highly sensitive to feature scaling — a feature measured in the thousands will dominate the distance calculation unless features are standardized first. Prediction cost is O(n) per query against the full training set (or O(log n) with spatial index structures like KD-trees, which degrade in high dimensions) — this is the core practical weakness that limits KNN's use on very large datasets." },
    ],
    sections: [
      { kind: "CODE", title: "Code", order: 0, code: "from sklearn.neighbors import KNeighborsClassifier\n\nmodel = KNeighborsClassifier(n_neighbors=5)\nmodel.fit(X_train, y_train)\nprediction = model.predict(X_test)" },
    ],
    prerequisites: ["data-and-features"],
  },
  {
    slug: "decision-trees",
    title: "Decision Trees",
    cardLabel: "Decision Trees",
    oneLiner: "A model that predicts by asking a series of yes/no questions.",
    levelIndex: 3, order: 3, estimatedMinutes: 16,
    realWorldExamples: ["A loan approval model you can literally read and explain to a regulator", "Medical triage rules that branch on symptoms", "A customer segmentation tree splitting on purchase behavior"],
    tags: ["ml", "classification"],
    explanations: [
      { depth: "SIMPLE", content: "A decision tree predicts by asking a series of yes/no questions about the features — \"is income over $50k?\", then \"is credit score over 700?\" — branching deeper until it reaches an answer. It's easy to read and explain because you can literally trace the path of questions." },
      { depth: "UNDERSTAND", content: "During training, the tree picks the question at each step that best splits the data into more \"pure\" groups (groups that are mostly one class, or have low spread for regression). It keeps splitting recursively until it reaches a stopping point — a maximum depth, a minimum group size, or groups that are already pure.\n\nTrees are popular because they're interpretable (you can visualize and explain every decision) and handle a mix of numeric and categorical features naturally, without needing much preprocessing. Their big weakness: a single deep tree tends to overfit, memorizing quirks of the training data instead of learning general patterns." },
      { depth: "DEEP", content: "At each node, the tree chooses the feature and threshold that maximizes \"information gain\" — the reduction in impurity from parent to children. Common impurity measures: Gini impurity (1 − Σpᵢ²) or entropy (−Σpᵢ log₂ pᵢ) for classification, variance reduction for regression. This greedy, recursive splitting is why a single unconstrained tree tends to overfit — it will keep splitting until each leaf is pure, effectively memorizing the training set. Constraints like max depth, minimum samples per leaf, or pruning after the fact are the standard fixes, and they're precisely why ensembles like random forests (many shallower, decorrelated trees) tend to outperform any single deep tree." },
    ],
    sections: [
      { kind: "CODE", title: "Code", order: 0, code: "from sklearn.tree import DecisionTreeClassifier\n\nmodel = DecisionTreeClassifier(max_depth=4)\nmodel.fit(X_train, y_train)\nprint(model.feature_importances_)" },
    ],
    prerequisites: ["data-and-features"],
  },
  {
    slug: "random-forest",
    title: "Random Forest",
    cardLabel: "Random Forest",
    oneLiner: "Many imperfect decision trees, voting together, beat any one of them alone.",
    levelIndex: 3, order: 4, estimatedMinutes: 15,
    realWorldExamples: ["A production fraud-detection model built on hundreds of trees", "Feature importance rankings used to explain what drives customer churn", "Kaggle-winning tabular models before gradient boosting became dominant"],
    tags: ["ml", "ensemble"],
    explanations: [
      { depth: "SIMPLE", content: "A random forest trains a whole bunch of decision trees, each on a slightly different random slice of the data, and then lets them vote on the final prediction. Individually, each tree is a bit noisy — but averaged together, their mistakes tend to cancel out." },
      { depth: "UNDERSTAND", content: "This is an example of **ensemble learning** — combining many weaker models into a stronger one. Each tree in the forest is trained on a random sample of the training data (with replacement) and considers only a random subset of features at each split. That randomness makes the individual trees different from each other (decorrelated), which is exactly what makes their averaged vote so much more stable and accurate than any single tree.\n\nRandom forests are a strong, low-maintenance default for many tabular problems: they handle non-linear relationships and feature interactions well, and are much less prone to overfitting than a single unconstrained tree." },
      { depth: "DEEP", content: "Random forests combine two sources of randomness: bootstrap aggregating (\"bagging\") — each tree trains on a random sample drawn with replacement — and random feature subsetting at each split. Both are designed specifically to decorrelate the trees; averaging correlated models barely reduces variance, but averaging decorrelated ones reduces it substantially, per the standard variance-of-the-mean argument: Var(average of m models) shrinks toward Var(single model)/m as correlation between models drops. The trade-off versus a single tree: much better generalization, at the cost of interpretability — you can still extract feature importances, but you can no longer trace one clean decision path." },
    ],
    prerequisites: ["decision-trees"],
  },
  {
    slug: "kmeans-clustering",
    title: "K-Means Clustering",
    cardLabel: "K-Means",
    oneLiner: "Grouping data into K clusters with no labels required.",
    levelIndex: 3, order: 5, estimatedMinutes: 15,
    realWorldExamples: ["Segmenting customers into groups for targeted marketing", "Compressing an image's colors down to a palette of K colors", "Grouping similar news articles with no predefined categories"],
    tags: ["ml", "unsupervised", "clustering"],
    explanations: [
      { depth: "SIMPLE", content: "K-Means groups data into K clusters based purely on how close points are to each other — no labels needed. You choose K (how many groups you want), and the algorithm figures out where the natural groupings are." },
      { depth: "UNDERSTAND", content: "The algorithm places K \"centroids\" (cluster centers), assigns every point to its nearest centroid, then moves each centroid to the average position of the points assigned to it — and repeats that assign-then-move cycle until the centroids stop moving. \n\nBecause there are no labels to check against, this is **unsupervised learning** — the goal isn't to predict a known answer, but to discover structure that was already there in the data." },
      { depth: "DEEP", content: "K-Means minimizes within-cluster sum of squared distances: Σₖ Σ_{x∈Cₖ} ||x − μₖ||², alternating between the assignment step (assign each point to its nearest centroid) and the update step (recompute each centroid as the mean of its assigned points) — this is a form of coordinate descent, and it's guaranteed to converge, but only to a local optimum, which is why K-Means is typically run several times from different random initializations and the best result is kept. Choosing K is itself a modeling decision, commonly guided by the \"elbow method\" (plotting within-cluster variance against K and looking for the point of diminishing returns) or the silhouette score." },
    ],
    sections: [
      { kind: "VISUALIZE", title: "Visualize", order: 0, body: "Drag a centroid and watch every point instantly relabel to whichever centroid is now nearest.", visualizerKey: "k-means" },
      { kind: "CODE", title: "Code", order: 1, code: "from sklearn.cluster import KMeans\n\nmodel = KMeans(n_clusters=3, n_init=10)\nlabels = model.fit_predict(X)\nprint(model.cluster_centers_)" },
    ],
    prerequisites: ["data-and-features"],
  },
  {
    slug: "pca",
    title: "Dimensionality Reduction (PCA)",
    cardLabel: "PCA",
    oneLiner: "Compressing many features down to the few that actually carry the signal.",
    levelIndex: 3, order: 6, estimatedMinutes: 15,
    realWorldExamples: ["Compressing a 1000-feature genomics dataset down to visualize in 2D", "Speeding up training by dropping redundant, correlated features", "Denoising sensor data by keeping only the dominant patterns"],
    tags: ["ml", "unsupervised"],
    explanations: [
      { depth: "SIMPLE", content: "Principal Component Analysis (PCA) takes data with a lot of features and compresses it down to fewer features, while losing as little information as possible. It's how you go from, say, 500 columns to 10 that still capture almost everything important." },
      { depth: "UNDERSTAND", content: "PCA works by finding new directions (combinations of your original features) that capture the most variation in the data. The first \"principal component\" is the single direction along which the data varies the most; the second captures the most *remaining* variation, and so on — each one uncorrelated with the last.\n\nBy keeping only the first few components, you get a much smaller set of features that still preserves most of what makes the data varied and informative — useful for visualization (compressing to 2D or 3D to plot), speeding up training, and reducing noise from redundant, correlated features." },
      { depth: "DEEP", content: "PCA computes the eigenvectors of the data's covariance matrix; these eigenvectors are the principal components, and their corresponding eigenvalues indicate how much variance each one explains. Projecting the data onto the top-k eigenvectors (by eigenvalue) gives the best possible k-dimensional linear approximation of the original data, in a least-squares sense. Because it's a *linear* projection, PCA can't capture non-linear structure — that's where non-linear dimensionality reduction methods (t-SNE, UMAP) come in, typically used for visualization rather than as a preprocessing step for downstream models." },
    ],
    prerequisites: ["vectors-and-matrices", "data-and-features"],
  },
  {
    slug: "bias-variance",
    title: "Bias, Variance & Overfitting",
    cardLabel: "Overfitting",
    oneLiner: "The core tension in every ML model: too simple, or too obsessed with the training data.",
    levelIndex: 3, order: 7, estimatedMinutes: 16,
    realWorldExamples: ["A model that memorized training images but fails on new ones", "Adding regularization to stop a model from chasing noise", "Choosing a simpler model on purpose because the complex one didn't generalize"],
    tags: ["ml", "evaluation"],
    explanations: [
      { depth: "SIMPLE", content: "**Underfitting** is when a model is too simple to capture the real pattern — it does poorly even on the data it trained on. **Overfitting** is the opposite: the model memorizes the training data so closely, including its noise and quirks, that it fails on new data. The goal is the sweet spot in between." },
      { depth: "UNDERSTAND", content: "**Bias** is error from a model being too simple to capture the true pattern (high bias = underfitting). **Variance** is error from a model being too sensitive to the specific training data it happened to see (high variance = overfitting) — a tiny change in the training set would produce a very different model. You want low bias *and* low variance, but there's usually a trade-off: making a model more flexible reduces bias but increases variance, and vice versa.\n\n**Regularization** is a family of techniques that deliberately limits a model's flexibility to fight overfitting — for example, penalizing large weights so the model can't fit noise too aggressively." },
      { depth: "DEEP", content: "Expected test error decomposes as: Error = Bias² + Variance + Irreducible noise. A high-bias model has systematic error regardless of which training set it saw (e.g. fitting a line to clearly curved data). A high-variance model's predictions swing wildly depending on the exact training sample (e.g. a very deep, unconstrained decision tree). The classic diagnostic: large gap between training and validation error signals high variance (overfitting); high error on *both* signals high bias (underfitting). Regularization techniques like L1/L2 weight penalties, dropout, or early stopping directly trade a small increase in bias for a larger reduction in variance — the goal isn't zero training error, it's the model complexity that minimizes *validation* error." },
    ],
    sections: [
      { kind: "TRY_IT", title: "Try it", order: 0, data: { prompt: "A model scores 99% accuracy on training data but only 68% on validation data. What's happening?", options: ["Overfitting — high variance", "Underfitting — high bias", "The model is perfectly calibrated", "The validation set is mislabeled"], answerIndex: 0, explanation: "A big train/validation gap, with training performance near-perfect, is the textbook signature of overfitting (high variance)." } },
    ],
    prerequisites: ["model-evaluation"],
  },
  {
    slug: "model-evaluation",
    title: "Model Evaluation Metrics",
    cardLabel: "Evaluation Metrics",
    oneLiner: "How to know if a model is actually good, not just confident.",
    levelIndex: 3, order: 8, estimatedMinutes: 18,
    realWorldExamples: ["Choosing F1 score over accuracy for a rare-disease detector", "Reporting RMSE to communicate a price model's typical error in dollars", "Using a confusion matrix to see exactly which classes a model confuses"],
    tags: ["ml", "evaluation"],
    explanations: [
      { depth: "SIMPLE", content: "Once a model makes predictions, you need a number (or several) to say how good it actually is. For predicting numbers, common ones are MAE, MSE, RMSE, and R². For classification, it's accuracy, precision, recall, F1, and the confusion matrix. Picking the *right* metric for the situation matters as much as the model itself." },
      { depth: "UNDERSTAND", content: "**For regression:** MAE (mean absolute error) is the average size of the error, in plain units. MSE (mean squared error) does the same but squares errors first, punishing big misses harder. RMSE is just the square root of MSE, back in the original units. R² tells you what fraction of the variation in the target your model actually explains (1.0 is perfect).\n\n**For classification:** accuracy is just \"percent correct\" — but it's misleading on imbalanced data (a model that always guesses \"not fraud\" can still be 99% accurate if fraud is rare). Precision asks \"of everything I flagged positive, how much was actually positive?\" Recall asks \"of everything actually positive, how much did I catch?\" F1 balances the two. A confusion matrix lays out exactly where predictions went right or wrong, category by category. ROC-AUC measures how well the model separates classes across every possible decision threshold." },
      { depth: "DEEP", content: "MAE = (1/n)Σ|yᵢ−ŷᵢ|; MSE = (1/n)Σ(yᵢ−ŷᵢ)²; RMSE = √MSE; R² = 1 − (SS_res / SS_tot). Precision = TP/(TP+FP); Recall = TP/(TP+FN); F1 = 2·(Precision·Recall)/(Precision+Recall) — the harmonic mean, which punishes a big imbalance between precision and recall more than a simple average would. ROC-AUC plots true positive rate against false positive rate across all thresholds and measures the area under that curve (0.5 = random guessing, 1.0 = perfect separation) — it's threshold-independent, which makes it useful for comparing models before you've committed to an operating threshold. The right metric is a business decision as much as a technical one: a cancer screening model should weight recall (catching real cases) far higher than precision, because a false negative is much more costly than a false positive." },
    ],
    sections: [
      { kind: "TRY_IT", title: "Try it", order: 0, data: { prompt: "You're building a model to detect a rare disease (1% of patients have it). Why is accuracy a poor primary metric here?", options: ["A model that always predicts 'no disease' would score 99% accuracy while catching zero real cases", "Accuracy is always the best metric for every problem", "Accuracy can't be computed for classification models", "Accuracy only works for regression"], answerIndex: 0, explanation: "On heavily imbalanced data, accuracy can look great while the model is useless — precision, recall, and F1 expose what's actually happening." } },
    ],
  },

  // ---------------- LEVEL 4: DEEP LEARNING ----------------
  {
    slug: "neural-networks",
    title: "Neural Networks",
    cardLabel: "Neural Networks",
    oneLiner: "Layers of simple units that combine to learn very complex patterns.",
    levelIndex: 4, order: 0, estimatedMinutes: 20,
    realWorldExamples: ["Recognizing handwritten digits on a check", "Powering the recommendation engine behind a streaming app", "The foundation underneath every modern image and language model"],
    tags: ["deep-learning"],
    explanations: [
      { depth: "SIMPLE", content: "A neural network is made of layers of simple units (\"neurons\"), each doing a small weighted calculation. Data flows through layer after layer, each one building slightly more complex features from the last, until the final layer produces a prediction. Stack enough of these layers and the network can learn surprisingly complex patterns." },
      { depth: "UNDERSTAND", content: "Each neuron takes several inputs, multiplies each by a learned weight, adds them up plus a bias term, and passes the result through an **activation function** — a small non-linear twist that's what lets the whole network learn curves and complex patterns rather than just straight lines. Neurons are organized into layers: an input layer, one or more hidden layers, and an output layer.\n\nThe very first, simplest version of this — a single layer, no hidden layers — is called a **perceptron**. Modern networks stack many hidden layers (hence \"deep\" learning), each building more abstract representations from the one before it." },
      { depth: "DEEP", content: "A single neuron computes a = φ(w·x + b), where φ is a non-linear activation function (ReLU, sigmoid, tanh). Without φ, stacking linear layers would collapse mathematically into a single linear transformation — non-linearity is what gives depth its expressive power. A fully-connected (\"dense\") layer applies this to every neuron in the layer simultaneously: a = φ(Wx + b), where W is now a weight matrix. Universal approximation theorems show that even a single sufficiently-wide hidden layer can approximate any continuous function arbitrarily well in principle — in practice, depth (more layers, each narrower) tends to be far more parameter-efficient than width for learning hierarchical, real-world patterns." },
    ],
    sections: [
      { kind: "VISUALIZE", title: "Visualize", order: 0, body: "Watch data pulse forward through the network, layer by layer, toward a prediction.", visualizerKey: "neural-network" },
      { kind: "CODE", title: "Code", order: 1, code: "import torch.nn as nn\n\nmodel = nn.Sequential(\n    nn.Linear(10, 32),\n    nn.ReLU(),\n    nn.Linear(32, 1),\n)" },
    ],
    prerequisites: ["linear-regression", "derivatives-and-gradients"],
  },
  {
    slug: "activation-functions",
    title: "Activation Functions",
    cardLabel: "Activations",
    oneLiner: "The small non-linear twist that's the entire reason depth helps.",
    levelIndex: 4, order: 1, estimatedMinutes: 14,
    realWorldExamples: ["ReLU used in nearly every hidden layer of modern vision models", "Softmax turning a language model's raw scores into next-word probabilities", "Sigmoid squashing a binary classifier's output into a 0–1 probability"],
    tags: ["deep-learning"],
    explanations: [
      { depth: "SIMPLE", content: "An activation function decides how much a neuron \"fires\" given its input. Without one, stacking layers would be pointless — a network of purely linear layers collapses into one big straight line. A tiny bend at every neuron is what lets the whole network bend around real, complicated patterns." },
      { depth: "UNDERSTAND", content: "**ReLU** (rectified linear unit) is the default choice for hidden layers: it outputs the input directly if positive, zero otherwise — simple, fast, and it avoids a problem older functions had where gradients shrink to nothing in deep networks. **Sigmoid** squashes any input into (0, 1), which is why it's still used for binary classification output. **Softmax** generalizes that to multiple classes, turning a list of raw scores into a proper probability distribution that sums to 1 — used in the final layer of almost every classifier with more than two classes.\n\nThe choice of activation function is small on paper but has a real practical effect on how easily a network trains." },
      { depth: "DEEP", content: "ReLU(z) = max(0, z); its constant gradient of 1 for z > 0 is a major reason deep networks with ReLU train faster and more reliably than with sigmoid/tanh, whose gradients saturate (approach 0) for large |z|, causing the **vanishing gradient problem** — the further back you go through many layers, the more that shrinking gradient compounds, and early layers barely learn. ReLU's own failure mode is \"dying ReLUs\" (a neuron stuck outputting 0 for all inputs, so its gradient is permanently 0) — variants like Leaky ReLU or GELU address this by allowing a small non-zero gradient for negative inputs. Softmax(z)ᵢ = e^{zᵢ} / Σⱼe^{zⱼ}, paired with cross-entropy loss, gives a numerically well-behaved gradient for multi-class classification, which is why that pairing is close to universal in classifier output layers." },
    ],
    sections: [
      { kind: "TRY_IT", title: "Try it", order: 0, data: { prompt: "A deep network with sigmoid activations in every hidden layer trains painfully slowly, with early layers barely updating. What's the likely cause?", options: ["Vanishing gradients — sigmoid's gradient shrinks toward 0 for large inputs, and that shrinkage compounds across many layers", "The learning rate is too high", "The model has too few parameters", "Sigmoid can only be used for regression"], answerIndex: 0, explanation: "This is the classic vanishing gradient problem, and it's exactly why ReLU replaced sigmoid/tanh as the default hidden-layer activation in deep networks." } },
    ],
    prerequisites: ["neural-networks"],
  },
  {
    slug: "loss-functions",
    title: "Loss Functions",
    cardLabel: "Loss Functions",
    oneLiner: "The single number a model is trying to make as small as possible.",
    levelIndex: 4, order: 2, estimatedMinutes: 14,
    realWorldExamples: ["MSE guiding a house-price model toward smaller dollar errors", "Cross-entropy guiding a spam classifier toward confident, correct probabilities", "A custom loss that penalizes missed fraud far more than false alarms"],
    tags: ["deep-learning", "optimization"],
    explanations: [
      { depth: "SIMPLE", content: "A loss function turns \"how wrong was the prediction\" into a single number the model can try to shrink. Different tasks need different loss functions — predicting a number needs a different notion of \"wrong\" than predicting a category does." },
      { depth: "UNDERSTAND", content: "For regression (predicting a number), **mean squared error (MSE)** is the standard choice — it punishes big misses much more than small ones, since the error gets squared. For classification, **cross-entropy loss** is standard — it compares the model's predicted probabilities to the true label, and punishes confident *wrong* answers especially harshly.\n\nThe loss function is what the optimizer (gradient descent) is actually minimizing during training — it's the compass. Choosing the wrong loss for the task (say, using MSE for a classification problem) will still technically train a model, but it won't optimize for what actually matters." },
      { depth: "DEEP", content: "MSE = (1/n)Σ(yᵢ − ŷᵢ)², whose gradient with respect to a prediction is linear in the error, making it smooth to optimize but sensitive to outliers (a single huge miss dominates the loss). Cross-entropy for binary classification: −(1/n)Σ[yᵢlog(pᵢ) + (1−yᵢ)log(1−pᵢ)]; for multi-class, it generalizes to −Σᵢ yᵢ log(pᵢ) over the true class's predicted probability. Cross-entropy's gradient, when paired with softmax or sigmoid output, simplifies cleanly to (prediction − target), which is part of why that pairing is the default. Robust alternatives like Huber loss (quadratic for small errors, linear for large ones) trade a small amount of smoothness for reduced sensitivity to outliers, useful when a dataset has noisy labels or extreme values." },
    ],
    prerequisites: ["derivatives-and-gradients", "model-evaluation"],
  },
  {
    slug: "backpropagation",
    title: "Backpropagation & Gradient Descent",
    cardLabel: "Backprop",
    oneLiner: "How a neural network figures out exactly which of its thousands of weights to blame.",
    levelIndex: 4, order: 3, estimatedMinutes: 20,
    realWorldExamples: ["Training a network on millions of images over many epochs", "Adam optimizer adaptively adjusting each weight's step size", "A loss curve steadily dropping as training progresses"],
    tags: ["deep-learning", "optimization"],
    explanations: [
      { depth: "SIMPLE", content: "After a neural network makes a prediction, backpropagation is how it figures out how much each individual weight — out of potentially millions — contributed to the error, so it knows exactly how to adjust each one. Then gradient descent actually makes those small adjustments, over and over, until the network gets good." },
      { depth: "UNDERSTAND", content: "**Forward propagation**: data flows through the network, layer by layer, producing a prediction. A **loss function** compares that prediction to the true answer and produces a single number measuring how wrong it was. **Backpropagation** then works backward through the network, using calculus (the chain rule) to compute exactly how much each individual weight contributed to that error.\n\nOnce every weight's contribution (its gradient) is known, an **optimizer** — like plain SGD, or the more adaptive Adam — nudges each weight a small step in the direction that reduces the error. Repeat this whole forward-loss-backward-update cycle thousands of times, over many passes through the data (epochs), and the network gradually gets better." },
      { depth: "DEEP", content: "Backprop is the chain rule applied systematically: for a loss L and a weight w in an earlier layer, ∂L/∂w is computed by multiplying local derivatives along the path from that weight to the loss, layer by layer, reusing intermediate computations (this is what makes it efficient — O(one forward pass + one backward pass) rather than recomputing from scratch per weight). Plain SGD updates w ← w − α∇L(w); momentum-based methods add a running average of past gradients to smooth out noisy updates; Adam additionally adapts the effective learning rate per parameter based on estimates of both the gradient's mean and variance, which is why it tends to converge faster and more robustly than plain SGD with less manual learning-rate tuning, at the cost of some generalization performance in certain settings." },
    ],
    sections: [
      { kind: "CODE", title: "Code", order: 0, code: "for epoch in range(epochs):\n    predictions = model(X_train)\n    loss = loss_fn(predictions, y_train)\n    optimizer.zero_grad()\n    loss.backward()   # backpropagation\n    optimizer.step()  # gradient descent update" },
    ],
    prerequisites: ["neural-networks", "loss-functions"],
  },
  {
    slug: "cnn",
    title: "Convolutional Neural Networks",
    cardLabel: "CNNs",
    oneLiner: "Neural networks built to exploit the spatial structure in images.",
    levelIndex: 4, order: 4, estimatedMinutes: 18,
    realWorldExamples: ["Classifying medical scans for signs of disease", "Detecting defects on a manufacturing line from camera images", "The backbone behind most modern image recognition systems"],
    tags: ["deep-learning", "computer-vision"],
    explanations: [
      { depth: "SIMPLE", content: "A CNN is a neural network built specifically for images. Instead of treating every pixel independently, it slides small filters across the image to detect patterns — edges, curves, textures — that can appear anywhere in the picture, then builds those simple patterns up into more complex ones, layer by layer." },
      { depth: "UNDERSTAND", content: "A **convolutional filter** is a small grid of learned weights that slides across the image, computing a response at every position — effectively asking \"how much does this local patch look like the pattern I'm detecting?\" Early layers tend to learn simple filters (edges, colors); deeper layers combine those into more complex ones (shapes, textures, eventually object parts).\n\nBecause the same filter is reused at every position, a CNN can recognize a pattern anywhere in the image without needing to relearn it separately for every location — that's the key efficiency a plain fully-connected network doesn't have. **Pooling** layers are typically mixed in to shrink the image progressively, keeping the most important information while reducing computation." },
      { depth: "DEEP", content: "A convolutional layer applies a small kernel (e.g. 3×3) across the input via sliding-window dot products, producing a feature map; multiple kernels per layer each learn to detect a different pattern. This gives CNNs two crucial properties fully-connected layers lack: parameter sharing (the same small kernel is reused across every spatial position, drastically reducing parameter count versus a dense layer) and translation equivariance (a detected pattern shifts in the output exactly as it shifts in the input). Pooling (typically max-pooling) downsamples feature maps, providing a degree of translation invariance and reducing computation for deeper layers. Modern architectures stack many convolutional blocks, often with skip connections (as in ResNets) to allow much deeper networks to train effectively." },
    ],
    prerequisites: ["neural-networks"],
  },
  {
    slug: "rnn-lstm",
    title: "RNNs & LSTMs",
    cardLabel: "RNNs",
    oneLiner: "Neural networks built with a memory, for data that comes in a sequence.",
    levelIndex: 4, order: 5, estimatedMinutes: 16,
    realWorldExamples: ["Predicting the next word before transformers took over that job", "Forecasting a stock price from its recent history", "Recognizing speech, one audio frame at a time"],
    tags: ["deep-learning", "sequences"],
    explanations: [
      { depth: "SIMPLE", content: "A recurrent neural network (RNN) reads a sequence one step at a time — like reading a sentence word by word — and keeps a running \"memory\" of what it's seen so far, which it carries forward and updates at every step. An LSTM is a smarter version of this that's much better at remembering things from many steps earlier." },
      { depth: "UNDERSTAND", content: "At each time step, an RNN combines the current input with its memory of everything before it (called the **hidden state**) to produce an output and an updated memory. This makes RNNs a natural fit for sequences — text, audio, time series — where order matters and earlier context affects what comes next.\n\nPlain RNNs struggle to remember information from far back in a long sequence — by the time you're 50 words into a sentence, the memory of word 1 has mostly faded. **LSTMs** (Long Short-Term Memory networks) fix this with a more deliberate memory mechanism: internal \"gates\" that learn what to keep, what to forget, and what to output at each step, letting important information survive much longer sequences." },
      { depth: "DEEP", content: "A vanilla RNN updates its hidden state as hₜ = φ(Wₓxₜ + Wₕhₜ₋₁ + b), reusing the same weights at every time step. Training uses backpropagation through time (BPTT), which unrolls the recurrence across steps — but repeatedly multiplying by the same recurrent weight matrix causes gradients to either vanish or explode over long sequences, making vanilla RNNs unable to learn long-range dependencies in practice. LSTMs address this with a separate cell state and three learned gates (forget, input, output) that additively — rather than multiplicatively at every step — control what information persists, giving gradients a much more direct path backward through time. This class of models was the dominant architecture for sequence tasks before transformers' attention mechanism (which processes the whole sequence in parallel rather than step by step) largely replaced them for most large-scale applications." },
    ],
    prerequisites: ["neural-networks"],
  },
  {
    slug: "transfer-learning",
    title: "Transfer Learning & Fine-Tuning",
    cardLabel: "Transfer Learning",
    oneLiner: "Starting from a model that already learned a lot, instead of from scratch.",
    levelIndex: 4, order: 6, estimatedMinutes: 15,
    realWorldExamples: ["Fine-tuning an ImageNet-trained model to classify a company's own product photos", "Adapting a pretrained language model to a specific customer-support domain", "A startup building a working image classifier from a few hundred images instead of millions"],
    tags: ["deep-learning"],
    explanations: [
      { depth: "SIMPLE", content: "Training a big model from nothing takes huge amounts of data and compute. Transfer learning skips most of that: you start from a model someone already trained on a massive, general dataset, and adapt it to your specific, smaller task instead — much faster, and it often works better too." },
      { depth: "UNDERSTAND", content: "A model trained on millions of general images (or a huge amount of general text) has already learned broadly useful patterns — edges and shapes for vision, grammar and word relationships for language. Transfer learning reuses that learned knowledge: you take the pretrained model, and either freeze most of it and retrain just the last layer or two on your own data, or **fine-tune** the whole thing with a small learning rate on your data.\n\nThis is now the default starting point for most real-world deep learning projects — very few teams train a large model completely from scratch, because the pretrained starting point already encodes so much useful general knowledge." },
      { depth: "DEEP", content: "Early layers of a trained network tend to learn general, broadly transferable features (edges/textures in vision, syntax in language); later layers learn more task-specific features. **Feature extraction** freezes the pretrained backbone entirely and trains only a new head on top; **fine-tuning** unfreezes some or all of the pretrained weights and continues training them, typically with a much smaller learning rate than training from scratch, to avoid catastrophically overwriting the useful pretrained knowledge (\"catastrophic forgetting\"). The right amount to fine-tune depends on how similar your target task is to the original training data and how much labeled data you have — more data and a more different task generally justify unfreezing more of the network." },
    ],
    prerequisites: ["neural-networks"],
  },

  // ---------------- LEVEL 5: COMPUTER VISION ----------------
  {
    slug: "cv-basics",
    title: "Images as Data",
    cardLabel: "Images as Data",
    oneLiner: "How a picture becomes a grid of numbers a model can actually process.",
    levelIndex: 5, order: 0, estimatedMinutes: 14,
    realWorldExamples: ["Resizing and normalizing photos before feeding them into a classifier", "Converting a color image to grayscale to simplify a detection task", "Augmenting a small training set by flipping and rotating images"],
    tags: ["computer-vision"],
    explanations: [
      { depth: "SIMPLE", content: "To a computer, an image is just a grid of numbers — one number per pixel (grayscale) or three (red, green, blue) for color. Before a model can use an image, it usually needs some preprocessing: resizing to a consistent size, normalizing pixel values to a standard range, and sometimes converting to grayscale." },
      { depth: "UNDERSTAND", content: "A grayscale image is a 2D grid (height × width) of intensity values, typically 0–255. A color image adds a third dimension for the red, green, and blue channels, so a 224×224 color image is really a 224×224×3 block of numbers. Preprocessing steps — resizing every image to the same dimensions, normalizing pixel values to roughly 0–1 or -1 to 1 — matter because models expect consistent, well-scaled input.\n\n**Data augmentation** (randomly flipping, rotating, or cropping training images) is a common trick to effectively grow a small dataset and make the model more robust to variations it'll see in the real world." },
      { depth: "DEEP", content: "An RGB image is stored as a tensor of shape (H, W, 3) (or (3, H, W), depending on framework convention), with pixel values as 8-bit integers (0–255) before normalization. Normalization (rescaling to zero mean, unit variance, often per-channel using dataset-wide statistics) improves optimization stability for the same reason feature scaling matters in classical ML. Preprocessing decisions here aren't cosmetic — they directly affect what a downstream CNN can learn, since the network only ever sees the numbers, not the image." },
    ],
    prerequisites: ["vectors-and-matrices"],
  },
  {
    slug: "image-classification",
    title: "Image Classification",
    cardLabel: "Classification",
    oneLiner: "Answering: what's the one main thing in this picture?",
    levelIndex: 5, order: 1, estimatedMinutes: 14,
    realWorldExamples: ["Sorting uploaded photos into categories automatically", "Identifying a plant species from a leaf photo", "Flagging inappropriate content on a social platform"],
    tags: ["computer-vision", "deep-learning"],
    explanations: [
      { depth: "SIMPLE", content: "Image classification means giving a whole image a single label — \"cat,\" \"dog,\" \"not safe for work.\" It's the most basic computer vision task: one image in, one category out, usually with a confidence score attached." },
      { depth: "UNDERSTAND", content: "A classifier is typically a CNN (or a transformer-based vision model) that ends in a layer producing one score per possible class, turned into probabilities via softmax. Training uses labeled examples — images paired with their correct category — and cross-entropy loss to push the predicted probabilities toward the true label.\n\nIn practice, almost no one trains an image classifier completely from scratch anymore: the standard approach is transfer learning, starting from a model pretrained on a huge general dataset (like ImageNet) and fine-tuning it on your specific categories, which needs far less data than training from zero." },
      { depth: "DEEP", content: "Modern image classifiers are evaluated with top-1 accuracy (is the single highest-probability class correct?) and top-5 accuracy (is the correct class among the model's top 5 guesses?) — useful when classes are visually similar or a dataset has ambiguous labels. Class imbalance is a common real-world complication: if 95% of training images are one class, accuracy alone can be misleading, and techniques like class-weighted loss or oversampling the minority class are standard fixes. Beyond CNNs, Vision Transformers (ViTs) treat an image as a sequence of patches and apply the same self-attention mechanism used in language models, and at sufficient data and compute scale, they match or exceed CNN performance on classification benchmarks." },
    ],
    sections: [
      { kind: "TRY_IT", title: "Try it", order: 0, data: { prompt: "Your image classifier gets 95% accuracy, but 95% of your training images are the same class. What should you check first?", options: ["Whether the model is just predicting the majority class every time", "Whether the images are large enough", "Whether the learning rate is too low", "Whether you used enough epochs"], answerIndex: 0, explanation: "With severe class imbalance, accuracy can be high purely by predicting the majority class — always check precision/recall per class before trusting the headline number." } },
    ],
    prerequisites: ["cnn", "cv-basics"],
  },
  {
    slug: "object-detection",
    title: "Object Detection",
    cardLabel: "Detection",
    oneLiner: "Finding every object in an image, and drawing a box around each one.",
    levelIndex: 5, order: 2, estimatedMinutes: 16,
    realWorldExamples: ["A self-driving car locating pedestrians, cars, and signs in real time", "Retail cameras counting how many items are on a shelf", "Security footage flagging every person that enters a frame"],
    tags: ["computer-vision", "deep-learning"],
    explanations: [
      { depth: "SIMPLE", content: "Object detection goes a step beyond classification: instead of one label for the whole image, it finds *every* object of interest, draws a bounding box around each, and labels each one. \"There's a dog here, a person there, and a bike over there\" — with exact locations, not just a single answer." },
      { depth: "UNDERSTAND", content: "A detector has to solve two problems at once: *where* are the objects (localization — the bounding boxes) and *what* are they (classification — the labels). Modern detectors like YOLO (\"You Only Look Once\") process the whole image in a single pass, predicting boxes and class probabilities simultaneously across a grid, which is what makes them fast enough for real-time use like video.\n\nDetectors are trained on images labeled with bounding boxes rather than just a single category, and evaluated with metrics that check both whether the right object was found *and* whether the predicted box actually overlaps the true one closely enough." },
      { depth: "DEEP", content: "**Intersection over Union (IoU)** measures how well a predicted box overlaps the ground-truth box: IoU = (area of overlap) / (area of union); a detection is typically only counted correct if IoU exceeds a threshold (commonly 0.5). **Non-max suppression** removes duplicate overlapping boxes for the same object, keeping only the highest-confidence one. **Mean Average Precision (mAP)** — averaging precision across classes and IoU thresholds — is the standard benchmark metric. Architecturally, two-stage detectors (like Faster R-CNN) first propose candidate regions and then classify each, trading speed for accuracy; single-stage detectors (YOLO, SSD) predict boxes and classes directly in one pass, trading a little accuracy for the speed needed in real-time applications like autonomous driving." },
    ],
    prerequisites: ["cnn", "image-classification"],
  },
  {
    slug: "image-segmentation",
    title: "Image Segmentation",
    cardLabel: "Segmentation",
    oneLiner: "Labeling every single pixel, not just drawing a box around an object.",
    levelIndex: 5, order: 3, estimatedMinutes: 15,
    realWorldExamples: ["A medical model outlining a tumor's exact shape in a scan", "A self-driving car distinguishing drivable road from sidewalk, pixel by pixel", "Background removal in a video call app"],
    tags: ["computer-vision", "deep-learning"],
    explanations: [
      { depth: "SIMPLE", content: "Image segmentation labels every pixel in an image, not just drawing a rough box like object detection does. The result is a precise outline of exactly where each object is — useful whenever the exact shape matters, not just the rough location." },
      { depth: "UNDERSTAND", content: "**Semantic segmentation** labels every pixel by category (\"road,\" \"sky,\" \"person\") but doesn't distinguish between two separate objects of the same category. **Instance segmentation** goes further, separately outlining each individual object, so two overlapping people get two distinct masks rather than one blob labeled \"person.\"\n\nBecause the output is itself a full-resolution image (a mask, same size as the input), segmentation models typically use an encoder-decoder architecture: the encoder shrinks the image down while extracting features (like a normal CNN), and the decoder expands it back up to full resolution to produce a precise, pixel-level output." },
      { depth: "DEEP", content: "Architectures like U-Net use an encoder-decoder structure with skip connections that pass high-resolution spatial detail directly from early encoder layers to the corresponding decoder layers — without those skip connections, the decoder would only have access to heavily downsampled, spatially coarse features, and fine object boundaries would blur. Segmentation is typically trained with per-pixel cross-entropy loss, often combined with a region-overlap loss like Dice loss (based on the same intersection-over-union idea as detection, but computed over the full mask) since per-pixel accuracy alone can look deceptively good on datasets dominated by background pixels. Instance segmentation architectures (like Mask R-CNN) extend object detection by adding a per-detected-box mask-prediction branch on top." },
    ],
    prerequisites: ["cnn", "object-detection"],
  },
  {
    slug: "data-augmentation",
    title: "Data Augmentation",
    cardLabel: "Augmentation",
    oneLiner: "Making a small dataset behave like a bigger, more varied one.",
    levelIndex: 5, order: 4, estimatedMinutes: 12,
    realWorldExamples: ["Flipping and rotating training photos so a model isn't thrown off by orientation", "Randomly cropping images so a model doesn't rely on objects always being centered", "Adding synthetic noise to make a model robust to blurry real-world photos"],
    tags: ["computer-vision", "ml"],
    explanations: [
      { depth: "SIMPLE", content: "Data augmentation creates new, slightly modified training examples from the ones you already have — flipping an image, rotating it, cropping it, adjusting brightness — without needing to collect any new data. It's a cheap, effective way to reduce overfitting and make a model more robust." },
      { depth: "UNDERSTAND", content: "A model trained only on perfectly centered, well-lit photos will struggle the moment it sees a real-world photo taken at an angle, cropped oddly, or under different lighting. Augmentation exposes the model to that variation during training itself: the same underlying image, shown many slightly different ways, teaches the model that a cat rotated 15° is still a cat.\n\nCommon image augmentations include horizontal flips, small rotations, random crops, color jitter, and adding noise. The right augmentations depend on the task — flipping text upside down would be a bad augmentation for reading digits, since a flipped \"6\" looks like a \"9.\"" },
      { depth: "DEEP", content: "Augmentation is a form of regularization: by expanding the effective training distribution without collecting new labeled data, it reduces the gap between training and validation performance, directly fighting overfitting — the same underlying goal as dropout or weight decay, achieved through the data rather than the model. Augmentations must be label-preserving for the task at hand (a horizontal flip preserves the label \"cat,\" but would break a task that depends on left/right orientation, like reading text). More advanced techniques — Mixup (blending two images and their labels proportionally) and CutMix (pasting a patch from one image onto another) — go beyond simple geometric transforms and have been shown to further improve generalization and robustness in modern vision training pipelines." },
    ],
    prerequisites: ["cv-basics"],
  },

  // ---------------- LEVEL 6: NLP ----------------
  {
    slug: "nlp-basics",
    title: "Text as Data & Tokenization",
    cardLabel: "Tokenization",
    oneLiner: "How words become numbers a model can actually learn from.",
    levelIndex: 6, order: 0, estimatedMinutes: 18,
    realWorldExamples: ["A search engine matching queries to relevant documents via TF-IDF", "A spam filter's bag-of-words feature representation", "Tokenizing a sentence before feeding it into any language model"],
    tags: ["nlp"],
    explanations: [
      { depth: "SIMPLE", content: "Models can't read text directly — text has to be broken into pieces (**tokenization**) and turned into numbers first. Along the way, common filler words (**stop words**) are often removed, and words get trimmed down to a base form (**stemming**/**lemmatization**) so \"running\" and \"run\" count as the same thing." },
      { depth: "UNDERSTAND", content: "**Tokenization** splits text into units — usually words, sometimes smaller sub-word pieces. **Stop words** (\"the\", \"is\", \"and\") carry little meaning on their own and are often filtered out. **Stemming** crudely chops word endings (\"running\" → \"run\"); **lemmatization** does the same job more carefully using actual grammar rules, so it correctly handles irregular cases (\"better\" → \"good\").\n\nOnce text is cleaned and tokenized, it needs to become numbers. **Bag of words** just counts how often each word appears, ignoring order entirely. **TF-IDF** improves on that by downweighting words that appear in almost every document (like \"the\"), so genuinely distinctive words stand out more." },
      { depth: "DEEP", content: "Bag-of-words represents a document as a vector over the vocabulary, where each dimension is a word's count — this discards word order entirely and produces very high-dimensional, sparse vectors. TF-IDF refines this: TF(term, doc) × IDF(term), where IDF(term) = log(N / documents containing term) — a term appearing in every document gets an IDF near 0, effectively zeroing it out regardless of raw frequency. Both approaches are now largely superseded for deep learning pipelines by learned embeddings (Word2Vec, and ultimately transformer-based contextual embeddings), which capture semantic similarity that pure counting cannot — but bag-of-words/TF-IDF remain fast, strong baselines and are still widely used for search and simpler classification tasks." },
    ],
    sections: [
      { kind: "CODE", title: "Code", order: 0, code: "from sklearn.feature_extraction.text import TfidfVectorizer\n\ndocs = [\"the cat sat on the mat\", \"the dog chased the cat\"]\nvectorizer = TfidfVectorizer(stop_words=\"english\")\nX = vectorizer.fit_transform(docs)\nprint(vectorizer.get_feature_names_out())" },
      { kind: "TRY_IT", title: "Try it", order: 1, data: { prompt: "Why does TF-IDF downweight a word like 'the' even if it appears many times in a document?", options: ["Because it appears in almost every document, so its inverse-document-frequency term is near zero", "Because 'the' is always removed before TF-IDF runs", "Because TF-IDF only counts nouns", "Because short words are automatically ignored"], answerIndex: 0, explanation: "TF-IDF's IDF term specifically suppresses words that show up across nearly all documents, since they carry little distinguishing signal." } },
    ],
  },
  {
    slug: "word-embeddings",
    title: "Word Embeddings",
    cardLabel: "Embeddings",
    oneLiner: "Turning words into numbers where similar meanings end up close together.",
    levelIndex: 6, order: 1, estimatedMinutes: 15,
    realWorldExamples: ["A search engine matching 'inexpensive' to a query for 'cheap'", "Recommendation systems representing products as vectors to find similar ones", "The very first layer of nearly every modern language model"],
    tags: ["nlp", "deep-learning"],
    explanations: [
      { depth: "SIMPLE", content: "A word embedding represents each word as a list of numbers (a vector), chosen so that words with similar meanings end up close together in that number space. \"King\" and \"queen\" land near each other; \"king\" and \"banana\" land far apart — purely from how the words are used in context, with no dictionary involved." },
      { depth: "UNDERSTAND", content: "Unlike bag-of-words, which treats every word as totally unrelated to every other word, embeddings capture *meaning*: they're learned by training a model to predict a word from its surrounding context (or vice versa) across huge amounts of text, so words that tend to appear in similar contexts end up with similar vectors.\n\nA famous property of early embedding models like Word2Vec: vector arithmetic captures relationships — the vector for \"king\" minus \"man\" plus \"woman\" lands very close to the vector for \"queen.\" This showed embeddings weren't just measuring similarity, they were capturing structured relationships between concepts." },
      { depth: "DEEP", content: "Word2Vec learns embeddings via one of two training objectives: skip-gram (predict surrounding context words from a center word) or CBOW (predict the center word from its context) — in both cases, the embedding is a byproduct of a simple prediction task, extracted as the learned weight matrix once training finishes. These are **static** embeddings — the word \"bank\" gets exactly one vector, regardless of whether it means a riverbank or a financial bank, which is a real limitation. Modern **contextual embeddings**, produced by transformer models, solve this: the same word gets a different vector depending on its surrounding sentence, since the embedding is computed fresh through self-attention over the actual context each time — this is a major reason transformer-based language understanding surpassed static embeddings for most NLP tasks." },
    ],
    prerequisites: ["nlp-basics", "vectors-and-matrices"],
  },
  {
    slug: "sentiment-analysis",
    title: "Sentiment Analysis",
    cardLabel: "Sentiment",
    oneLiner: "Automatically telling whether text is positive, negative, or neutral.",
    levelIndex: 6, order: 2, estimatedMinutes: 12,
    realWorldExamples: ["Scoring thousands of product reviews to spot a dip in customer satisfaction", "Monitoring social media mentions of a brand in real time", "Flagging an angry customer support message for priority handling"],
    tags: ["nlp"],
    explanations: [
      { depth: "SIMPLE", content: "Sentiment analysis is text classification with a specific goal: deciding whether a piece of text expresses a positive, negative, or neutral opinion. It's one of the most common real-world uses of NLP — reading thousands of reviews or messages far faster than a person could." },
      { depth: "UNDERSTAND", content: "At its core, sentiment analysis is just classification: text goes in, a label (positive/negative/neutral, or a 1–5 star rating) comes out. Simple approaches score text based on lists of positive and negative words; modern approaches fine-tune a pretrained language model on labeled examples of text paired with their true sentiment.\n\nReal-world sentiment is trickier than it sounds: sarcasm (\"oh great, another delay\"), mixed opinions within one sentence, and domain-specific language (\"sick\" is positive in some slang, negative in medical text) are classic failure cases that keyword-based approaches handle badly and modern context-aware models handle much better." },
      { depth: "DEEP", content: "Lexicon-based approaches (summing precomputed sentiment scores for known words) are fast and interpretable but brittle — they can't handle negation properly (\"not bad\" scores as negative from the word \"bad\" alone unless negation is explicitly handled) and miss context entirely. Fine-tuning a pretrained transformer (adding a classification head on top and training on labeled sentiment data) is now the standard approach, since contextual embeddings naturally capture negation, sarcasm cues, and domain nuance far better than word-level scoring. In production, sentiment models are typically evaluated per-class with precision/recall rather than raw accuracy, since real-world sentiment datasets are often imbalanced (mostly positive reviews, say), and confusing neutral with mildly negative is a common, costly failure mode worth monitoring specifically." },
    ],
    prerequisites: ["word-embeddings"],
  },
  {
    slug: "named-entity-recognition",
    title: "Named Entity Recognition",
    cardLabel: "NER",
    oneLiner: "Picking out the people, places, and organizations mentioned in text.",
    levelIndex: 6, order: 3, estimatedMinutes: 13,
    realWorldExamples: ["Pulling company names and dollar amounts out of financial news automatically", "Extracting patient names and medications from clinical notes", "Auto-tagging people and locations mentioned in a news article"],
    tags: ["nlp"],
    explanations: [
      { depth: "SIMPLE", content: "Named Entity Recognition (NER) scans text and picks out specific real-world things it mentions — people's names, organizations, locations, dates, amounts of money — and labels what type each one is. It turns unstructured text into a structured list of \"who, where, what, when.\"" },
      { depth: "UNDERSTAND", content: "Unlike sentiment analysis, which classifies a whole piece of text, NER works at the word (or sub-word) level: it labels each token as belonging to an entity type (PERSON, ORGANIZATION, LOCATION, DATE, MONEY) or as not being part of any entity at all. A sentence like \"Apple hired Maria in Austin last March\" gets tagged: Apple → ORGANIZATION, Maria → PERSON, Austin → LOCATION, last March → DATE.\n\nThis makes NER a foundational tool for turning messy, free-form text — news articles, emails, legal documents — into structured data that can be searched, filtered, or fed into a database." },
      { depth: "DEEP", content: "NER is typically framed as a sequence labeling problem, using a tagging scheme like BIO (Beginning, Inside, Outside an entity) so multi-word entities (\"New York City\") are correctly grouped as one entity rather than three separate ones. Classical approaches used conditional random fields (CRFs) over hand-engineered features; modern approaches fine-tune a pretrained transformer with a token-classification head, using its contextual embeddings to disambiguate cases a purely local model would miss (\"Washington\" as a person's surname versus a city depends entirely on surrounding context). Evaluation typically uses entity-level precision/recall/F1 rather than token-level accuracy, since correctly tagging most tokens of a multi-word entity but missing one still counts as a wrong extraction for anything downstream that expects the whole entity." },
    ],
    prerequisites: ["word-embeddings"],
  },
  {
    slug: "transformers-attention",
    title: "Transformers & Attention",
    cardLabel: "Attention",
    oneLiner: "The architecture behind essentially every modern language model.",
    levelIndex: 6, order: 4, estimatedMinutes: 20,
    realWorldExamples: ["The architecture underneath GPT, Claude, and virtually every modern LLM", "Machine translation that considers a whole sentence's context at once", "Long-document summarization that tracks relationships across paragraphs"],
    tags: ["nlp", "deep-learning"],
    explanations: [
      { depth: "SIMPLE", content: "A transformer is a neural network architecture built around **attention** — a mechanism that lets the model look at every other word in a sentence at once and decide which ones matter most for understanding each word. It's the architecture behind essentially every modern language model." },
      { depth: "UNDERSTAND", content: "Older sequence models processed text one word at a time, in order, which made it hard to connect words that were far apart. Attention solves this directly: for every word, the model computes how much it should \"attend to\" every other word in the sequence, all at once, regardless of distance. In the sentence \"the trophy didn't fit in the suitcase because it was too big,\" attention is what lets the model figure out that \"it\" refers to the trophy, not the suitcase.\n\nBecause transformers process the whole sequence in parallel rather than one step at a time, they're also dramatically faster to train on modern hardware — which is a big part of why they scaled so well." },
      { depth: "DEEP", content: "Self-attention computes, for each token, a weighted sum over all tokens' \"value\" vectors, where the weights come from comparing that token's \"query\" vector against every token's \"key\" vector: Attention(Q,K,V) = softmax(QKᵀ/√dₖ)V. Multi-head attention runs several of these in parallel with different learned projections, letting the model capture different kinds of relationships simultaneously. Because attention has no inherent notion of order, positional encodings are added to token embeddings to inject sequence position. Stacking many transformer blocks (self-attention + feed-forward layers, with residual connections and layer normalization) is what modern LLMs are built from — trained at massive scale, this architecture is what enabled the current generation of large language models." },
    ],
    prerequisites: ["neural-networks", "word-embeddings"],
  },

  // ---------------- LEVEL 7: GENERATIVE AI ----------------
  {
    slug: "llms-prompting",
    title: "LLMs & Prompting",
    cardLabel: "LLMs",
    oneLiner: "Large language models, and how the words you give them shape what they do.",
    levelIndex: 7, order: 0, estimatedMinutes: 18,
    realWorldExamples: ["A coding assistant that explains and writes code from natural language", "A customer support bot answering questions in plain language", "Drafting and editing writing based on a short instruction"],
    tags: ["genai", "nlp"],
    explanations: [
      { depth: "SIMPLE", content: "A large language model (LLM) is a huge neural network trained on enormous amounts of text to predict what word comes next. That simple training goal turns out to produce a model that can write, explain, translate, and reason surprisingly well. **Prompting** is how you instruct it — the wording, structure, and examples you give it heavily shape the quality of what comes back." },
      { depth: "UNDERSTAND", content: "LLMs are trained on a deceptively simple task — predict the next word (or token) given everything before it — but trained on such a vast amount of text, at such scale, that this produces broad, flexible capabilities: answering questions, writing code, summarizing, reasoning through problems.\n\n**Prompting** is the practical skill of getting good output from an LLM: being specific about the task, providing relevant context, giving examples of the format you want (\"few-shot\" prompting), and breaking complex asks into clear steps. The same model can perform dramatically differently depending purely on how it's prompted." },
      { depth: "DEEP", content: "LLMs are typically decoder-only transformers trained via next-token prediction (autoregressive language modeling) over massive text corpora, then further refined via instruction tuning and reinforcement learning from human feedback (RLHF) to better follow instructions and match human preferences. At inference, the model doesn't \"know\" facts in a database sense — it generates each token as a probability distribution over the vocabulary, conditioned on everything before it, sampled according to settings like temperature (higher = more random/creative, lower = more deterministic). This generative, probabilistic nature is also the root of hallucination: the model produces plausible-sounding token sequences, not verified facts, which is precisely the gap techniques like RAG are designed to close." },
    ],
    prerequisites: ["transformers-attention"],
  },
  {
    slug: "rag",
    title: "Retrieval-Augmented Generation (RAG)",
    cardLabel: "RAG",
    oneLiner: "Giving an LLM real, current documents to read before it answers.",
    levelIndex: 7, order: 1, estimatedMinutes: 18,
    realWorldExamples: ["A support chatbot answering from your company's actual, up-to-date docs", "A legal research assistant citing real case law it retrieved", "A internal search tool that answers questions instead of just listing links"],
    tags: ["genai"],
    explanations: [
      { depth: "SIMPLE", content: "An LLM only knows what it learned during training — it can't see your private documents, and its knowledge has a cutoff date. RAG fixes this: before answering, the system fetches relevant documents (or chunks of them) related to the question, and hands them to the model as extra context, so it can answer using real, current information instead of guessing." },
      { depth: "UNDERSTAND", content: "The \"retrieval\" step usually works via **embeddings**: every document (and the user's question) gets converted into a vector that captures its meaning, and these vectors are stored in a **vector database**. When a question comes in, the system finds the documents whose embeddings are most similar to the question's embedding, and passes those chunks to the LLM along with the question — so the model is effectively answering an open-book exam instead of relying purely on memory.\n\nThis avoids the need to retrain or fine-tune the model every time your documents change — you just update what's in the vector database." },
      { depth: "DEEP", content: "Documents are chunked (split into passages sized to fit context windows well) and each chunk is embedded via a text embedding model into a dense vector capturing semantic meaning; these vectors are indexed in a vector database (e.g. using approximate nearest-neighbor search like HNSW for speed at scale). At query time, the question is embedded with the same model, the top-k most similar chunks are retrieved by vector similarity (commonly cosine similarity), and those chunks are inserted into the LLM's prompt as context before it generates an answer. RAG quality depends heavily on chunking strategy, embedding model quality, and retrieval precision — a great LLM fed irrelevant retrieved context will still answer poorly, so it's as much a search/retrieval engineering problem as a modeling one." },
    ],
    prerequisites: ["llms-prompting"],
  },
  {
    slug: "embeddings-vector-search",
    title: "Embeddings & Vector Search",
    cardLabel: "Vector Search",
    oneLiner: "Finding the most relevant text by meaning, not by matching keywords.",
    levelIndex: 7, order: 2, estimatedMinutes: 14,
    realWorldExamples: ["Semantic search that finds 'how to cancel my plan' even when the doc says 'terminate subscription'", "The retrieval engine underneath every RAG system", "Finding visually or semantically similar products in an e-commerce catalog"],
    tags: ["genai", "nlp"],
    explanations: [
      { depth: "SIMPLE", content: "A text embedding model converts a sentence or document into a vector — a list of numbers capturing its meaning. Vector search then finds the closest vectors to a query, which means finding text with *similar meaning*, even if it doesn't share a single exact word with the query." },
      { depth: "UNDERSTAND", content: "Traditional keyword search matches literal words: searching \"cheap laptop\" won't find a page that only says \"affordable notebook computer.\" Embedding-based (semantic) search fixes this by comparing meaning instead of exact words — both phrases land near each other in vector space, so the search finds it anyway.\n\nA **vector database** stores millions of these embeddings and is optimized to quickly find the nearest ones to any new query vector — this fast nearest-neighbor lookup is the engine underneath every RAG system, semantic search feature, and recommendation-by-similarity tool." },
      { depth: "DEEP", content: "Similarity between two embeddings is typically measured with cosine similarity (the angle between vectors, ignoring magnitude) or dot product; both are cheap to compute and correlate well with semantic similarity for embeddings trained with a contrastive objective (pulling similar pairs together, pushing dissimilar pairs apart, during training). Exact nearest-neighbor search is O(n) per query against every stored vector, which doesn't scale to millions of documents — production vector databases instead use approximate nearest-neighbor (ANN) algorithms like HNSW (hierarchical navigable small-world graphs) or IVF, trading a small amount of recall for orders-of-magnitude faster lookup. Hybrid search — combining keyword search (which excels at exact terms like product codes) with vector search (which excels at paraphrase and meaning) — often outperforms either approach alone in production retrieval systems." },
    ],
    prerequisites: ["word-embeddings", "vectors-and-matrices"],
  },
  {
    slug: "ai-agents",
    title: "AI Agents & Tool Calling",
    cardLabel: "AI Agents",
    oneLiner: "LLMs that don't just talk — they can take real actions and use live data.",
    levelIndex: 7, order: 3, estimatedMinutes: 18,
    realWorldExamples: ["An assistant that checks your calendar and books a meeting", "A coding agent that runs tests and iterates on a fix automatically", "A research agent that searches the web, reads results, and synthesizes an answer"],
    tags: ["genai"],
    explanations: [
      { depth: "SIMPLE", content: "An AI agent is an LLM given the ability to take actions — not just generate text, but actually call real tools (search the web, run code, check a calendar) and use the results to decide what to do next. Instead of one single response, an agent can work through a task in multiple steps." },
      { depth: "UNDERSTAND", content: "**Tool calling** (also called function calling) is the mechanism that makes this possible: the model is told what tools are available and what they do, and when it decides a tool would help, it outputs a structured request to call that tool with specific arguments. The application runs the actual tool, feeds the result back to the model, and the model continues — deciding whether it now has enough information to answer, or needs another tool call.\n\nAn **agent workflow** chains this loop together: plan, act (call a tool), observe the result, and repeat until the task is done. This is what lets an LLM go from \"a text generator\" to \"a system that can actually get things done.\"" },
      { depth: "DEEP", content: "Practically, the model is provided a schema describing available tools (name, description, expected arguments) as part of its context. When the model determines a tool call is useful, it emits a structured output (rather than free text) matching that schema; the orchestrating application executes the real function and appends the result back into the conversation as a new message, and the model continues generating with that new information available. Agent loops built on this (plan → act → observe → repeat) enable multi-step task completion, but introduce real engineering challenges: error handling when a tool call fails, guarding against infinite loops, controlling cost/latency as steps multiply, and evaluating whether the agent's chosen sequence of actions was actually correct — a much harder evaluation problem than checking a single generated response." },
    ],
    prerequisites: ["llms-prompting"],
  },
  {
    slug: "fine-tuning-llms",
    title: "Fine-Tuning LLMs",
    cardLabel: "Fine-tuning",
    oneLiner: "Teaching a general-purpose LLM your specific style, task, or knowledge.",
    levelIndex: 7, order: 4, estimatedMinutes: 15,
    realWorldExamples: ["Fine-tuning a model to always respond in a company's brand voice", "Training a model on a specific technical domain's terminology", "Instruction-tuning a base model so it reliably follows commands rather than just completing text"],
    tags: ["genai", "deep-learning"],
    explanations: [
      { depth: "SIMPLE", content: "Fine-tuning takes an already-trained LLM and continues training it on a smaller, focused set of examples so it gets better at a specific task, style, or domain — without starting from scratch. It's the LLM version of transfer learning: adapt a general model instead of building a new one." },
      { depth: "UNDERSTAND", content: "Prompting and fine-tuning solve similar problems in different ways: prompting steers a model's behavior *at request time* with instructions and examples, while fine-tuning actually changes the model's weights *ahead of time* so the desired behavior becomes its new default. Fine-tuning is worth the extra effort when a task needs to happen consistently, at scale, without repeating a long prompt every time, or when the desired behavior is hard to fully specify in a prompt alone (like a very particular tone or format).\n\nMost fine-tuning today doesn't retrain a full model from scratch — it uses parameter-efficient techniques that adjust only a small number of additional weights, which is dramatically cheaper while still meaningfully steering the model's behavior." },
      { depth: "DEEP", content: "Full fine-tuning updates every parameter of the base model — effective but expensive in compute and storage, since it produces an entirely new copy of a potentially enormous model. **LoRA** (Low-Rank Adaptation) instead freezes the original weights and injects small trainable low-rank matrices into each layer, learning only a tiny fraction of the parameters while approximating the effect of full fine-tuning — this is now the standard efficient approach. Instruction tuning (fine-tuning on (instruction, response) pairs) is what turns a raw next-token-prediction base model into one that reliably follows commands; RLHF (reinforcement learning from human feedback) goes a step further, training a reward model on human preference rankings and using it to further optimize the LLM's outputs toward what people actually prefer, which is largely what separates a raw pretrained model from a polished assistant model." },
    ],
    prerequisites: ["llms-prompting", "transfer-learning"],
  },
  {
    slug: "diffusion-models",
    title: "Diffusion Models & Image Generation",
    cardLabel: "Diffusion",
    oneLiner: "Generating images by learning to undo noise, one step at a time.",
    levelIndex: 7, order: 5, estimatedMinutes: 16,
    realWorldExamples: ["Generating an illustration from a text description", "AI-assisted photo editing that fills in or extends part of an image", "Generating product mockups or concept art from a prompt"],
    tags: ["genai", "computer-vision"],
    explanations: [
      { depth: "SIMPLE", content: "Diffusion models generate images by starting with pure random noise and gradually \"denoising\" it, step by step, into a coherent picture — guided by a text prompt describing what should appear. It's the technology behind most modern text-to-image tools." },
      { depth: "UNDERSTAND", content: "During training, the model is shown real images with increasing amounts of random noise added to them, and learns to predict and remove that noise, one small step at a time. Once trained, generation runs this process in reverse: start from pure noise, and repeatedly ask the model \"what noise should I remove to make this look more like a real image (and match this text prompt)?\" — after enough steps, a coherent image emerges.\n\nThis is a very different approach from earlier generative models like GANs (Generative Adversarial Networks), which pit a generator against a discriminator in competition — diffusion models have become dominant for image generation largely because they train more stably and produce more diverse, higher-quality results." },
      { depth: "DEEP", content: "The forward process gradually adds Gaussian noise to a real image over many steps until it becomes indistinguishable from pure noise; the model is trained to predict the noise added at each step, given the noisy image and the current timestep. Sampling reverses this: starting from random noise, the model iteratively predicts and subtracts noise, guided by a text prompt via cross-attention between the image representation and text embeddings from a language encoder (this is how the prompt actually steers what gets generated). **Latent diffusion** (used by Stable Diffusion and similar models) runs this whole process in a compressed latent space rather than raw pixel space, using a separately trained autoencoder to compress and decompress images — this is what makes generation computationally feasible on consumer hardware rather than requiring pixel-space diffusion's much higher cost." },
    ],
    prerequisites: ["cnn", "llms-prompting"],
  },
  {
    slug: "hallucinations-limitations",
    title: "Hallucinations & Limitations",
    cardLabel: "Hallucinations",
    oneLiner: "Why confident-sounding AI answers aren't always true — and what to do about it.",
    levelIndex: 7, order: 6, estimatedMinutes: 14,
    realWorldExamples: ["An LLM confidently citing a court case that doesn't exist", "A chatbot inventing a plausible-sounding but wrong product feature", "A coding assistant referencing a library function that was never real"],
    tags: ["genai"],
    explanations: [
      { depth: "SIMPLE", content: "A **hallucination** is when an LLM generates something that sounds fluent and confident but is factually wrong or entirely made up. It happens because the model is fundamentally predicting plausible-sounding text, not looking up verified facts — so \"sounds right\" and \"is right\" aren't the same thing to it." },
      { depth: "UNDERSTAND", content: "LLMs generate text by predicting the most statistically likely next token given everything before it — they have no built-in mechanism for fact-checking themselves against reality. This means a model can produce a wrong answer with exactly the same fluent, confident tone as a correct one, which makes hallucinations genuinely dangerous in contexts where accuracy matters (legal, medical, financial).\n\nCommon mitigations: **RAG** (grounding the model's answer in retrieved real documents instead of relying on memorized training knowledge), asking the model to cite its sources, lowering the generation temperature for more deterministic output, and — critically — keeping a human in the loop to verify anything high-stakes." },
      { depth: "DEEP", content: "Hallucination is a natural consequence of how LLMs are trained and sampled: next-token prediction optimizes for locally plausible continuations, not global factual consistency, and there's no explicit \"I don't know\" signal baked into standard training objectives — a model is often more rewarded (during training) for producing a fluent, specific-sounding answer than a hedged, uncertain one. Techniques to reduce (not eliminate) hallucination include RAG (constraining generation to retrieved, verifiable context), fine-tuning specifically to improve calibration (so confidence expressed matches actual accuracy), and self-consistency methods that sample multiple answers and check for agreement. No current technique fully eliminates hallucination — it remains an open research problem, and the practical takeaway for building real systems is to design for it explicitly: cite sources, show confidence signals, and add verification steps rather than trusting raw model output at face value." },
    ],
    prerequisites: ["llms-prompting"],
  },

  // ---------------- LEVEL 8: PRODUCTION AI ----------------
  {
    slug: "mlops-basics",
    title: "MLOps Basics",
    cardLabel: "MLOps",
    oneLiner: "Everything it takes to keep a model running reliably after it's trained.",
    levelIndex: 8, order: 0, estimatedMinutes: 15,
    realWorldExamples: ["A model retraining pipeline that runs automatically every week on fresh data", "Version-controlling datasets and model artifacts, not just code", "A CI pipeline that runs evaluation checks before a new model is allowed to deploy"],
    tags: ["production"],
    explanations: [
      { depth: "SIMPLE", content: "MLOps is DevOps for machine learning: the practices and tooling for reliably building, deploying, and maintaining models in production — not just training one once in a notebook and calling it done. A model that works great in an experiment can still fail badly in the real world without this discipline." },
      { depth: "UNDERSTAND", content: "Training a good model is often the easier half of the problem. MLOps covers everything around it: versioning data and models (so you can reproduce or roll back any result), automating retraining pipelines, testing model quality before deployment the same way you'd test code, and monitoring performance once it's live.\n\nThe core difference from regular software engineering: ML systems can silently degrade even when the *code* never changes, because the real world the model is making predictions about keeps changing underneath it — which is why ongoing monitoring, not just one-time testing, is essential." },
      { depth: "DEEP", content: "A mature MLOps pipeline typically includes: data validation (catching schema changes or corrupted inputs before they reach training), experiment tracking (recording hyperparameters, metrics, and artifacts for every training run so results are reproducible and comparable), automated evaluation gates (a new model candidate must beat defined thresholds before it's allowed to deploy), and a deployment strategy that limits blast radius (canary releases or shadow deployments, tested in this level's Deployment and A/B Testing concepts). The reproducibility requirement is what most distinguishes ML infrastructure from typical software infrastructure: a production incident needs to be traceable not just to a code change, but potentially to a data change, a retraining run, or upstream feature-pipeline drift." },
    ],
    prerequisites: ["model-evaluation"],
  },
  {
    slug: "model-deployment",
    title: "Model Deployment & APIs",
    cardLabel: "Deployment",
    oneLiner: "Turning a trained model file into something an app can actually call.",
    levelIndex: 8, order: 1, estimatedMinutes: 15,
    realWorldExamples: ["A recommendation model served behind a REST API for a website to call", "A model packaged into a container and deployed to run on autoscaling infrastructure", "An on-device model running directly on a phone with no server round-trip"],
    tags: ["production"],
    explanations: [
      { depth: "SIMPLE", content: "A trained model, by itself, is just a file. Deployment is the process of wrapping it in a service that other software can actually call — usually an API that takes some input, runs it through the model, and returns a prediction, all within an acceptable amount of time." },
      { depth: "UNDERSTAND", content: "The most common pattern: wrap the model in a small web server that exposes a prediction endpoint, then package that server (with all its dependencies) into a container so it runs identically everywhere, from a developer's laptop to production infrastructure. From there, a hosting platform handles running that container reliably, and scaling the number of running copies up or down based on demand.\n\nThere's an important split in how predictions get served: **online (real-time) inference**, where each request gets a fast, individual prediction (a live recommendation, a fraud check), versus **batch inference**, where predictions are computed in bulk on a schedule (nightly churn scores for every customer) — the two have very different latency, cost, and infrastructure requirements." },
      { depth: "DEEP", content: "Real-time serving has to account for the full inference latency budget, not just the model's raw compute time: input validation, feature lookups (often from a separate feature store), the model forward pass, and response serialization all add up, and a slow tail (p99 latency) matters as much as the average, since a single slow request can bottleneck downstream systems. Serving large models efficiently often relies on techniques covered in the Latency & Cost concept — batching concurrent requests together, quantization, and dedicated inference runtimes (like ONNX Runtime or TensorRT) that optimize the computation graph specifically for inference rather than training. A critical, easy-to-miss failure mode: **training-serving skew** — subtle differences between how features are computed during training versus at serving time (different code paths, different data freshness) that silently degrade a model's real-world accuracy even though nothing about the model itself changed." },
    ],
    prerequisites: ["mlops-basics"],
  },
  {
    slug: "model-monitoring",
    title: "Model Monitoring & Drift",
    cardLabel: "Monitoring",
    oneLiner: "How to notice a model quietly getting worse before it causes real damage.",
    levelIndex: 8, order: 2, estimatedMinutes: 14,
    realWorldExamples: ["A fraud model's accuracy slowly dropping as fraud tactics evolve", "A demand-forecasting model missing badly after a sudden market shift", "Alerting when the distribution of incoming request data shifts from what the model was trained on"],
    tags: ["production"],
    explanations: [
      { depth: "SIMPLE", content: "Once a model is deployed, its job isn't done — the world it's making predictions about keeps changing, and the model doesn't automatically know that. Monitoring means continuously tracking a live model's performance and the data flowing into it, so you catch problems before they cause real damage." },
      { depth: "UNDERSTAND", content: "**Drift** is the general term for a model's accuracy degrading over time because the real world has shifted away from what it was trained on. **Data drift** is when the incoming input data's statistical properties change (customer behavior shifts, a new product category appears). **Concept drift** is when the actual relationship between inputs and outcomes changes (what used to predict fraud no longer does, because fraudsters adapted).\n\nBecause you often don't have ground-truth labels immediately (you might not know for weeks whether a loan actually defaulted), monitoring frequently has to rely on proxy signals — tracking the distribution of predictions and inputs, not just final accuracy — to catch problems early." },
      { depth: "DEEP", content: "Data drift is commonly detected by comparing the statistical distribution of live input features against the training distribution, using measures like population stability index (PSI) or Kolmogorov–Smirnov tests, flagging features whose distribution has shifted meaningfully. Concept drift is harder to detect directly without timely ground truth, so systems often rely on delayed feedback loops (once true outcomes eventually arrive, backfill and recompute accuracy) or proxy metrics like prediction confidence distributions and business KPIs correlated with model quality. A robust monitoring setup treats model quality as a first-class production concern with the same rigor as system uptime: dashboards, alerting thresholds, and — critically — a clear, tested retraining or rollback plan for when drift is detected, since detecting a problem without a response plan doesn't actually protect anything." },
    ],
    prerequisites: ["model-deployment"],
  },
  {
    slug: "ab-testing-models",
    title: "A/B Testing Models",
    cardLabel: "A/B Testing",
    oneLiner: "Proving a new model is actually better before betting the whole system on it.",
    levelIndex: 8, order: 3, estimatedMinutes: 13,
    realWorldExamples: ["Routing 5% of traffic to a new recommendation model and comparing click-through rate", "A shadow deployment that scores real traffic without affecting any actual decisions", "Rolling a new fraud model out gradually instead of switching everyone over at once"],
    tags: ["production", "evaluation"],
    explanations: [
      { depth: "SIMPLE", content: "A/B testing a model means running the new version alongside the old one on real traffic, splitting users between them, and comparing what actually happens — not just trusting offline evaluation metrics. A model that looks better in testing doesn't always translate into better real-world outcomes, so this is the step that actually proves it." },
      { depth: "UNDERSTAND", content: "Offline evaluation (accuracy, F1, RMSE on a held-out test set) tells you how a model performs on historical data — but real-world behavior can differ, since live traffic can shift over time, and the metric that matters (revenue, engagement, user trust) isn't always the same as the metric optimized during training. An A/B test closes that gap: route a small percentage of real traffic to the new model, keep the rest on the current one, and compare real business outcomes between the two groups.\n\n**Shadow deployment** is a lower-risk variant: the new model runs on real traffic and its predictions are logged for comparison, but it never actually affects what users see — useful for catching problems before any real exposure." },
      { depth: "DEEP", content: "A well-run model A/B test needs randomized assignment (to avoid confounding — comparing a new model's weekday performance against an old model's weekend performance would be misleading), a predetermined primary metric and minimum sample size (calculated via a power analysis) to avoid stopping early on noise, and awareness that many simultaneous secondary metrics inflate the chance of a false positive by chance alone. Gradual rollout strategies — canary releases (start at 1–5% of traffic, expand if healthy) — limit the blast radius of a bad model reaching production. Because ML models can fail in ways traditional software doesn't (subtly worse decisions rather than a crash), A/B testing is often paired with guardrail metrics — safety thresholds that trigger an automatic rollback if a new model regresses a critical outcome, even if the primary metric it was tested for looks fine." },
    ],
    prerequisites: ["model-evaluation", "model-deployment"],
  },
  {
    slug: "latency-cost",
    title: "Latency & Cost at Scale",
    cardLabel: "Latency & Cost",
    oneLiner: "Why a model that works in a demo can still be too slow or too expensive to ship.",
    levelIndex: 8, order: 4, estimatedMinutes: 14,
    realWorldExamples: ["Quantizing a large model so it fits and runs fast on a phone", "Batching many requests together to use a GPU efficiently instead of one at a time", "Caching a common LLM response instead of regenerating it every time"],
    tags: ["production"],
    explanations: [
      { depth: "SIMPLE", content: "A model that gives great answers is useless in production if it's too slow or too expensive to run at real scale. Serving predictions to millions of users, or running a large language model on every request, costs real compute — and making that fast and affordable is its own engineering problem, separate from making the model accurate." },
      { depth: "UNDERSTAND", content: "**Latency** is how long a single prediction takes — critical for anything real-time, like a chat response or a fraud check during checkout. **Throughput** is how many predictions a system can handle per second — critical at scale. **Cost** scales with how much compute each prediction consumes, multiplied by how many predictions you're serving.\n\nCommon techniques to improve all three: **quantization** (using lower-precision numbers for model weights, trading a small amount of accuracy for much faster, cheaper computation), **batching** (processing multiple requests together to use hardware like GPUs efficiently instead of one at a time), **caching** (skipping recomputation for identical or very similar requests), and choosing a smaller, cheaper model when a task doesn't need a massive one's full capability." },
      { depth: "DEEP", content: "Quantization reduces numerical precision (e.g. 32-bit floats down to 8-bit integers) for weights and/or activations, shrinking memory footprint and speeding up computation substantially, since lower-precision arithmetic is both faster and reduces memory-bandwidth bottlenecks — modern hardware is often bottlenecked on moving data, not raw arithmetic. Dynamic batching groups concurrent inference requests into a single forward pass, dramatically improving GPU utilization versus serving requests one at a time, at the cost of a small added latency while requests are collected into a batch — a direct throughput/latency trade-off tuned per use case. For LLMs specifically, techniques like KV-caching (reusing previously computed attention keys/values instead of recomputing them for every new generated token) and speculative decoding (using a smaller, faster model to draft tokens that a larger model verifies) are now standard for making autoregressive generation fast enough for real-time chat at acceptable cost." },
    ],
    prerequisites: ["mlops-basics"],
  },

  // ---------------- LEVEL 9: RESPONSIBLE AI ----------------
  {
    slug: "bias-fairness",
    title: "Bias & Fairness",
    cardLabel: "Bias & Fairness",
    oneLiner: "How models can learn and amplify unfair patterns from the data they're trained on.",
    levelIndex: 9, order: 0, estimatedMinutes: 15,
    realWorldExamples: ["A hiring model trained on historical resumes that learned to disadvantage certain groups", "A facial recognition system performing worse on underrepresented skin tones", "A loan approval model indirectly discriminating through a proxy variable like zip code"],
    tags: ["responsible-ai"],
    explanations: [
      { depth: "SIMPLE", content: "A model learns whatever patterns exist in its training data — including unfair, biased ones, if they're present. If historical hiring data reflects past discrimination, a model trained on it can learn to repeat that discrimination, just automated and at scale, often without anyone intending it to." },
      { depth: "UNDERSTAND", content: "Bias can creep in from multiple places: the training data itself (reflecting historical inequities), the labels (if human annotators' judgments were themselves biased), or the choice of what to optimize for (a metric that's easy to measure but is itself an imperfect proxy for what's actually fair). A model doesn't need to be given a protected attribute (like race) directly to discriminate on it — it can learn the same pattern through a correlated **proxy variable** (like zip code standing in for race), which makes bias genuinely hard to fully eliminate by simply removing a sensitive column.\n\nThere isn't one single, universally agreed-upon mathematical definition of \"fair\" — different fairness criteria (equal accuracy across groups, equal false-positive rates, equal representation in outcomes) can actually conflict with each other, which is part of why this is as much an ethical and organizational question as a purely technical one." },
      { depth: "DEEP", content: "Common formal fairness criteria include demographic parity (positive prediction rate should be equal across groups), equalized odds (true positive and false positive rates should be equal across groups), and predictive parity (precision should be equal across groups) — a well-known impossibility result shows that, except in special cases, these criteria cannot all be satisfied simultaneously when base rates differ between groups, forcing an explicit, context-dependent choice about which notion of fairness matters most for a given application. Mitigation techniques operate at different stages: pre-processing (reweighting or resampling training data), in-processing (adding a fairness constraint or penalty directly into the training objective), and post-processing (adjusting decision thresholds per group after training). None of these is a complete, automatic fix — auditing a model's outcomes across relevant subgroups, and involving domain and ethics expertise in defining what \"fair\" means for a specific deployment, remains essential and cannot be fully delegated to a metric." },
    ],
    sections: [
      { kind: "TRY_IT", title: "Try it", order: 0, data: { prompt: "A hiring model was trained without using race as a feature at all, but still shows a racial disparity in who it recommends. What's the most likely explanation?", options: ["It learned the pattern indirectly through a correlated proxy variable, like zip code or school name", "This is impossible if race wasn't used as a feature", "The model must have a bug in its code", "The training data must be corrupted"], answerIndex: 0, explanation: "Removing a sensitive attribute doesn't remove bias if other features correlate with it — this is one of the most common and underestimated sources of model bias." } },
    ],
    prerequisites: ["data-and-features"],
  },
  {
    slug: "ai-safety-alignment",
    title: "AI Safety & Alignment",
    cardLabel: "AI Safety",
    oneLiner: "Making sure a powerful model actually does what we intend, not just what we literally asked.",
    levelIndex: 9, order: 1, estimatedMinutes: 15,
    realWorldExamples: ["An LLM refusing to help generate harmful content, even when cleverly prompted", "Red-teaming a model by deliberately trying to make it misbehave before release", "A recommendation algorithm optimized for engagement that unintentionally promotes harmful content"],
    tags: ["responsible-ai"],
    explanations: [
      { depth: "SIMPLE", content: "**Alignment** is the challenge of making an AI system actually pursue what we genuinely want, not just what we literally specified — those two things can differ in surprising ways. **Safety** is the broader practice of preventing an AI system from causing harm, whether through misuse, malfunction, or unintended side effects of optimizing for the wrong thing." },
      { depth: "UNDERSTAND", content: "A classic problem: a system optimized purely for one measurable goal (like \"maximize engagement\") can find ways to hit that number that weren't intended and aren't actually good (like promoting outrage-inducing content, because it drives clicks) — this is called **specification gaming** or **reward hacking**, and it shows up in real deployed systems, not just theory.\n\nFor LLMs specifically, safety work includes preventing the model from producing harmful, dangerous, or deceptive content, resisting attempts to manipulate it into bypassing its guidelines (\"jailbreaking\"), and — through techniques like RLHF — steering the model's behavior toward being genuinely helpful and honest rather than just superficially compliant." },
      { depth: "DEEP", content: "The alignment problem is fundamentally about the gap between a specified objective and the true underlying intent — any measurable proxy objective can, in principle, be gamed in ways that technically satisfy it while violating what was actually wanted, and this gap tends to grow more consequential as a system becomes more capable and optimizes harder against its objective. RLHF is the dominant current technique for aligning LLM behavior with human preferences: a reward model is trained on human preference comparisons between candidate outputs, and the LLM is then optimized against that learned reward signal — but this only aligns the model with what human raters *preferred to see*, which can diverge from what's actually true, safe, or genuinely in the user's interest, particularly in ambiguous or adversarial cases. Red-teaming (systematically probing a model for failure modes and harmful outputs before deployment) and constitutional/rule-based approaches (having the model critique and revise its own outputs against explicit principles) are complementary techniques used to catch and reduce these gaps before a system reaches real users." },
    ],
    prerequisites: ["llms-prompting"],
  },
  {
    slug: "privacy-data-protection",
    title: "Privacy & Data Protection",
    cardLabel: "Privacy",
    oneLiner: "Keeping the people whose data trains a model from being exposed by it.",
    levelIndex: 9, order: 2, estimatedMinutes: 13,
    realWorldExamples: ["A language model memorizing and reproducing a snippet of sensitive training data verbatim", "Anonymizing patient records before using them to train a healthcare model", "A company's data retention policy for AI training datasets, to comply with regulation"],
    tags: ["responsible-ai"],
    explanations: [
      { depth: "SIMPLE", content: "Models learn from data, and that data often includes personal or sensitive information about real people. Privacy in AI is about making sure that information doesn't leak back out — whether through a model memorizing and reproducing it, or through careless handling of the training data itself." },
      { depth: "UNDERSTAND", content: "A surprising and important fact: large models can sometimes **memorize** specific pieces of their training data — especially rare or unusual text — and reproduce it verbatim when prompted the right way, which is a real privacy risk if that training data contained sensitive information. This is different from the model \"understanding\" something; it's closer to accidental storage.\n\nCommon mitigations include removing personally identifiable information from training data before it's used, limiting how long raw data is retained, and — for sensitive domains — following formal regulations (like healthcare's HIPAA or Europe's GDPR) that place specific legal requirements on how personal data can be collected, stored, and used." },
      { depth: "DEEP", content: "Membership inference attacks (determining whether a specific record was part of a model's training set, based on how confidently it predicts on that record) and extraction attacks (prompting a model to reproduce memorized training text) are the two main practical privacy threats studied against trained models — both are more effective against outlier or rare training examples, which the model had to \"memorize\" more directly rather than generalize from. **Differential privacy** is the leading formal technique for provable protection: it adds carefully calibrated noise during training so that the presence or absence of any single individual's data has a bounded, quantifiable effect on the final model, at the cost of some model accuracy — a genuine, measurable privacy/utility trade-off rather than a free win. Regulatory frameworks like GDPR additionally grant individuals rights (like the right to have their data deleted) that are technically difficult to fully honor once data has already been baked into a trained model's weights, which is an active, unresolved area of both research and policy." },
    ],
    prerequisites: ["data-and-features"],
  },
  {
    slug: "explainability",
    title: "Explainability & Interpretability",
    cardLabel: "Explainability",
    oneLiner: "Understanding why a model made the decision it made — not just what it decided.",
    levelIndex: 9, order: 3, estimatedMinutes: 14,
    realWorldExamples: ["Explaining to a rejected loan applicant which factors drove the decision", "A doctor wanting to see which symptoms a diagnosis model weighted most heavily", "Debugging why a model is making a surprising prediction on a specific case"],
    tags: ["responsible-ai"],
    explanations: [
      { depth: "SIMPLE", content: "Some models — like a small decision tree — are naturally easy to read and explain. Others — like a large neural network with millions of parameters — are effectively a \"black box\": accurate, but hard for a human to understand *why* it made a specific decision. Explainability is the set of techniques for opening that box up, at least partially." },
      { depth: "UNDERSTAND", content: "There's often a real trade-off between accuracy and interpretability: simple models (linear regression, small decision trees) are easy to explain but sometimes less accurate; complex models (deep neural networks, large ensembles) are often more accurate but much harder to interpret directly. For high-stakes decisions — loans, medical diagnoses, criminal justice — being able to explain a decision isn't optional, it's often a legal or ethical requirement, which sometimes pushes teams to choose a more interpretable model over a marginally more accurate black-box one.\n\nFor black-box models where you can't avoid the complexity, **post-hoc explanation techniques** approximate or probe the model's behavior after the fact — for example, showing which input features mattered most for one specific prediction, even without fully explaining the model's internal logic." },
      { depth: "DEEP", content: "**SHAP** (SHapley Additive exPlanations) assigns each feature a contribution value for a specific prediction, grounded in cooperative game theory (treating features as \"players\" splitting credit for the prediction \"payout\") — it's model-agnostic and provides locally accurate, additive explanations, but is computationally expensive for models with many features. **LIME** (Local Interpretable Model-agnostic Explanations) instead approximates a complex model's behavior *locally*, near one specific prediction, with a simple, interpretable model (like a small linear model) — fast, but the explanation is only valid in a small neighborhood around that one prediction, not globally. Both are approximations, not literal readouts of a model's actual internal reasoning, and inherit a real limitation: an explanation technique can appear to give a plausible, human-readable story for a prediction while not necessarily reflecting the true underlying computation the model performed — a caveat worth taking seriously in high-stakes explainability use cases." },
    ],
    prerequisites: ["decision-trees", "neural-networks"],
  },
  {
    slug: "ai-regulation",
    title: "AI Regulation & Governance",
    cardLabel: "Regulation",
    oneLiner: "The emerging rules for who's accountable when an AI system causes harm.",
    levelIndex: 9, order: 4, estimatedMinutes: 13,
    realWorldExamples: ["The EU AI Act's risk-based rules for different categories of AI use", "A company's internal AI review process before shipping a new model feature", "Disclosure requirements for AI-generated content"],
    tags: ["responsible-ai"],
    explanations: [
      { depth: "SIMPLE", content: "As AI systems make more consequential decisions, governments and organizations are building rules for how they should be built, tested, and deployed responsibly — covering things like transparency, accountability, and extra scrutiny for high-risk uses like hiring, lending, and healthcare." },
      { depth: "UNDERSTAND", content: "Regulatory approaches vary, but a common pattern is **risk-based regulation**: low-risk AI uses (like a spam filter) face light or no specific requirements, while high-risk uses (like a system that affects someone's access to a job, loan, or medical care) face much stricter requirements — documentation, testing, human oversight, and the ability to explain and appeal decisions.\n\nBeyond government regulation, many organizations have their own internal **AI governance** processes: review boards that evaluate a new model's risks before it ships, requirements for bias testing and documentation, and clear ownership for who's accountable if something goes wrong — governance that often needs to exist well before external regulation catches up to a fast-moving technology." },
      { depth: "DEEP", content: "The EU AI Act is the most comprehensive example of risk-tiered regulation to date, categorizing AI systems into unacceptable risk (banned outright, like certain social-scoring systems), high-risk (subject to strict conformity assessment, documentation, and human oversight requirements — covering domains like employment, credit, and critical infrastructure), limited risk (transparency obligations, like disclosing AI-generated content), and minimal risk (largely unregulated). Model cards and datasheets — structured documentation describing a model's intended use, training data, known limitations, and evaluation results — have emerged as a practical governance tool that predates formal regulation in many organizations, functioning similarly to a nutrition label for a deployed model. A genuinely hard, unresolved question across most regulatory frameworks is liability: when an AI system causes harm through a decision no single person directly made, responsibility has to be assigned across model developers, deployers, and operators in ways existing legal frameworks weren't originally designed to handle." },
    ],
  },

  // ---------------- LEVEL 10: AI IN THE REAL WORLD ----------------
  {
    slug: "ai-in-healthcare",
    title: "AI in Healthcare",
    cardLabel: "Healthcare",
    oneLiner: "Where AI is genuinely changing diagnosis, treatment, and care — and where it isn't (yet).",
    levelIndex: 10, order: 0, estimatedMinutes: 13,
    realWorldExamples: ["A CNN flagging suspicious regions in a mammogram for radiologist review", "A model predicting which ICU patients are at risk of deteriorating soon", "Drug discovery models predicting how promising a candidate molecule is"],
    tags: ["industry"],
    explanations: [
      { depth: "SIMPLE", content: "In healthcare, AI is mostly used to *assist* clinicians, not replace them — flagging things worth a closer look, predicting risk, and speeding up research — while the final judgment call almost always stays with a trained human professional. The stakes of getting it wrong are unusually high, which shapes how carefully this field moves." },
      { depth: "UNDERSTAND", content: "Computer vision models assist radiologists by flagging potentially concerning regions in scans (a second pair of eyes, not a replacement diagnosis). Predictive models flag patients at elevated risk — of readmission, of sepsis, of deterioration — early enough for a care team to intervene. In drug discovery, models predict which candidate molecules are worth the enormous cost of actually testing, narrowing a huge search space down to promising leads.\n\nHealthcare AI faces some of the strictest requirements of any AI application: rigorous clinical validation, explainability for regulatory approval, and careful handling of highly sensitive patient data (see Privacy & Data Protection) — none of which are optional extras here." },
      { depth: "DEEP", content: "Clinical AI tools generally require regulatory clearance (e.g. FDA approval in the US) that demands validated performance on representative patient populations, since a model trained predominantly on one demographic can perform meaningfully worse on underrepresented groups — a direct real-world instance of the bias and fairness concerns covered earlier in this curriculum. Most deployed clinical models are explicitly framed as **decision support** rather than autonomous diagnosis, both for regulatory and liability reasons and because current models, however accurate on benchmarks, lack the broader clinical context and accountability a physician provides. The field's hardest ongoing challenge isn't raw model accuracy — many models already match or exceed specialist performance on narrow benchmark tasks — but generalization: a model validated at one hospital, on one patient population, with one set of equipment, often performs worse when deployed elsewhere, which is why rigorous external validation is treated as essential rather than a formality." },
    ],
    prerequisites: ["image-classification"],
  },
  {
    slug: "ai-in-finance",
    title: "AI in Finance",
    cardLabel: "Finance",
    oneLiner: "How AI actually gets used to price risk, catch fraud, and move markets.",
    levelIndex: 10, order: 1, estimatedMinutes: 13,
    realWorldExamples: ["A real-time model scoring every card transaction for fraud risk", "Credit scoring models estimating a loan applicant's default risk", "Algorithmic trading systems executing strategies faster than any human could"],
    tags: ["industry"],
    explanations: [
      { depth: "SIMPLE", content: "Finance was one of the earliest industries to adopt machine learning at scale, largely because it already had huge amounts of structured historical data and a clear, measurable goal: predict risk (of fraud, of default, of price movement) accurately and fast." },
      { depth: "UNDERSTAND", content: "**Fraud detection** models score transactions in real time, balancing catching real fraud (recall) against not blocking legitimate purchases (precision) — exactly the precision/recall trade-off covered earlier in this curriculum, with real financial consequences on both sides. **Credit scoring** models estimate the probability a borrower will repay a loan, directly affecting who gets approved and at what interest rate — which is why fairness and explainability (covered earlier) are especially scrutinized here, and often legally mandated.\n\n**Algorithmic trading** uses models to make or inform trading decisions at speeds no human could match, ranging from simple rule-based strategies to sophisticated predictive models reacting to market signals in milliseconds." },
      { depth: "DEEP", content: "Financial ML operates under some of the heaviest regulatory scrutiny of any industry: credit models in many jurisdictions are legally required to provide adverse action reasons (a specific, understandable explanation for why an application was denied), which directly constrains the choice between a more accurate black-box model and a more interpretable one — this is a direct real-world instance of the accuracy/interpretability trade-off from the Explainability concept. Fraud detection is a genuinely adversarial setting, unlike most ML applications: fraudsters actively adapt their behavior in response to what detection models catch, causing real concept drift that requires continuous retraining and monitoring, not a one-time deployment. Time-series aspects of financial data (autocorrelation, non-stationarity, regime changes) also make the standard random train/test split actively misleading here — financial models are typically validated with strictly time-ordered splits, training on the past and testing only on later, unseen periods, to avoid an overly optimistic evaluation." },
    ],
    prerequisites: ["model-evaluation"],
  },
  {
    slug: "ai-in-retail",
    title: "AI in Retail & Marketing",
    cardLabel: "Retail",
    oneLiner: "The recommendation engines, demand forecasts, and personalization behind modern shopping.",
    levelIndex: 10, order: 2, estimatedMinutes: 12,
    realWorldExamples: ["A recommendation engine suggesting what to buy next", "A demand-forecasting model deciding how much inventory to stock", "Dynamic pricing that adjusts based on demand in real time"],
    tags: ["industry"],
    explanations: [
      { depth: "SIMPLE", content: "Retail and marketing were among the first industries to build entire products around machine learning — recommendation engines, personalized search results, and demand forecasting are all now standard, largely invisible infrastructure behind most online shopping experiences." },
      { depth: "UNDERSTAND", content: "**Recommendation systems** predict what a customer is likely to want next, based on their own behavior (\"you bought a tent, here's a sleeping bag\") and the behavior of similar customers (**collaborative filtering**) — the same similarity-based intuition behind KNN, applied to products and people instead of raw features. **Demand forecasting** predicts future sales to inform inventory and staffing decisions, where being wrong in either direction is costly (overstock ties up capital; understock loses sales).\n\n**Personalization** extends this further — tailoring search results, homepage layout, and promotions per individual user — which raises real privacy considerations (covered earlier) around how much behavioral data is collected and how it's used." },
      { depth: "DEEP", content: "Collaborative filtering comes in two main flavors: user-based (find users with similar purchase/rating history, recommend what they liked) and item-based (find items frequently interacted with alongside a given item) — both traditionally implemented via matrix factorization, decomposing a sparse user-item interaction matrix into lower-dimensional user and item embeddings whose dot product approximates a predicted preference score, conceptually similar to the dimensionality reduction covered in PCA. Modern large-scale recommendation systems combine this collaborative signal with content-based features (product attributes, text embeddings of descriptions) and are typically evaluated with ranking metrics (like NDCG) rather than plain accuracy, since what matters is getting the *best* few items near the top of a list, not correctly classifying every item. The cold-start problem — how to recommend anything sensible for a brand-new user or product with no interaction history yet — remains one of the field's persistent, only partially solved challenges." },
    ],
    prerequisites: ["knn"],
  },
  {
    slug: "self-driving-cars",
    title: "Autonomous Vehicles",
    cardLabel: "Self-Driving Cars",
    oneLiner: "Stacking perception, prediction, and planning into a system that drives itself.",
    levelIndex: 10, order: 3, estimatedMinutes: 14,
    realWorldExamples: ["A vehicle's perception system identifying pedestrians, other cars, and lane markings in real time", "Predicting whether a pedestrian at a crosswalk is about to step into the road", "Planning a safe path around a double-parked car"],
    tags: ["industry", "computer-vision"],
    explanations: [
      { depth: "SIMPLE", content: "A self-driving car isn't one single AI model — it's a whole pipeline of systems working together: seeing the world (perception), predicting what everything around it will do next (prediction), and deciding what to do in response (planning) — all running continuously, many times per second, with safety as the overriding constraint." },
      { depth: "UNDERSTAND", content: "**Perception** uses computer vision (object detection, segmentation) plus other sensors (radar, lidar) to build a real-time picture of everything around the vehicle — other cars, pedestrians, lane markings, traffic signals. **Prediction** takes that picture and forecasts what each nearby agent is likely to do next — will that pedestrian cross, will that car merge. **Planning** then decides the vehicle's own next action, balancing safety, comfort, and getting to the destination.\n\nBecause a wrong prediction can have severe real-world consequences, autonomous vehicle systems are typically layered with extensive redundancy, conservative fallback behaviors, and simulation-based testing across an enormous range of scenarios before anything touches a public road." },
      { depth: "DEEP", content: "Perception fuses multiple sensor modalities — cameras (rich semantic detail, but sensitive to lighting/weather), lidar (precise 3D distance measurement, robust to lighting), and radar (works well in poor weather, coarser resolution) — since each has different, complementary failure modes, and combining them (sensor fusion) is more robust than relying on any single one. Prediction models have to reason probabilistically about multiple possible futures for each nearby agent (a pedestrian might cross or might not), since committing to a single most-likely prediction and ignoring lower-probability but higher-consequence outcomes is a known source of dangerous failures. The overall system is typically validated through a combination of massive-scale simulation (testing against rare, dangerous 'edge case' scenarios that would be unsafe or impractical to collect enough real-world data for) and structured real-world test-driving with safety drivers, precisely because the tail of rare-but-critical scenarios is where most of the real engineering and safety difficulty lives." },
    ],
    prerequisites: ["object-detection"],
  },
  {
    slug: "ai-in-education",
    title: "AI in Education",
    cardLabel: "Education",
    oneLiner: "Adaptive learning, tutoring, and automated feedback — including in tools like this one.",
    levelIndex: 10, order: 4, estimatedMinutes: 12,
    realWorldExamples: ["An adaptive platform adjusting question difficulty based on a student's answers", "An AI tutor answering follow-up questions in plain language", "Automated essay feedback highlighting structure and argument clarity"],
    tags: ["industry"],
    explanations: [
      { depth: "SIMPLE", content: "AI in education covers tools that adapt to an individual learner — adjusting difficulty, generating personalized explanations, and providing feedback at a scale no single teacher could offer one-on-one to every student. Done well, it complements teachers; it isn't meant to replace the human relationship at the core of learning." },
      { depth: "UNDERSTAND", content: "**Adaptive learning** systems track what a student has and hasn't mastered, and adjust what's shown next accordingly — reviewing a shaky concept instead of plowing ahead, or skipping material a student has clearly already mastered. **AI tutoring** (increasingly LLM-based) can answer follow-up questions, explain a concept a different way when the first explanation didn't land, and provide practice tailored to a specific weak spot — all core ideas behind interactive platforms like this one.\n\n**Automated feedback and grading** tools use NLP to assess writing for structure, clarity, or correctness far faster than a human could at scale, though they're generally best used to augment a teacher's judgment on nuance and creativity rather than fully replace it." },
      { depth: "DEEP", content: "Adaptive learning systems often draw on techniques from **knowledge tracing** — modeling a student's evolving mastery of specific skills over time from their sequence of responses, to predict what they're likely to get right or wrong next and choose what to show accordingly, conceptually similar to a recommendation system but optimizing for learning outcomes rather than engagement. LLM-based tutoring introduces the same hallucination risk covered earlier in this curriculum in an especially consequential context — a confidently wrong explanation can actively mislead a learner who has no way to verify it, which is why grounding responses in verified curriculum content (via RAG-style retrieval) and encouraging students toward verification, rather than blind trust, matters even more here than in lower-stakes uses. A genuinely open, actively studied question is how personalized, AI-assisted learning affects long-term retention and deeper understanding compared to traditional methods — the field has more evidence for short-term engagement and immediate performance gains than for those longer-term outcomes." },
    ],
    prerequisites: ["llms-prompting"],
  },
  {
    slug: "robotics-ai",
    title: "Robotics & AI",
    cardLabel: "Robotics",
    oneLiner: "Where AI has to reason about, and act within, the physical world in real time.",
    levelIndex: 10, order: 5, estimatedMinutes: 13,
    realWorldExamples: ["A warehouse robot navigating around obstacles and other robots", "A robotic arm learning to grasp irregularly shaped objects", "A drone adjusting its flight path in real time based on visual input"],
    tags: ["industry"],
    explanations: [
      { depth: "SIMPLE", content: "Robotics AI is about controlling a physical machine that has to sense, decide, and act in the real world in real time — which is a meaningfully harder problem than most software AI, because the real world is messy, physics doesn't wait, and mistakes have physical consequences." },
      { depth: "UNDERSTAND", content: "A robot combines perception (computer vision and other sensors to understand its surroundings, much like an autonomous vehicle) with **control** — the algorithms that translate a decision (\"move the arm here\") into precise physical motor commands, accounting for real-world physics like momentum, friction, and imperfect actuators.\n\n**Reinforcement learning** — where an agent learns by trial and error, receiving rewards for good actions and penalties for bad ones — is a natural fit for robotics: a robot arm can learn to grasp an object through repeated attempts, gradually improving, though training directly on physical hardware is slow and can damage equipment, so much of this training happens first in simulation before transferring to the real robot." },
      { depth: "DEEP", content: "The **sim-to-real gap** is one of the field's central practical challenges: a policy trained entirely in simulation often performs worse on a real robot, because simulated physics, sensor noise, and dynamics never perfectly match reality — techniques like domain randomization (deliberately varying simulated lighting, friction, and object properties during training) help the resulting policy generalize better to the messier real world it'll actually face. Robotic control typically operates in a tight closed loop — perceive, decide, act, repeat, many times per second — with hard real-time constraints that most other AI applications don't face: a vision model in a photo app can take an extra 200ms without consequence, but that same delay in a robot's control loop can mean a missed grasp or a collision. Modern approaches increasingly combine classical control theory (which offers strong, provable stability guarantees but struggles with truly novel or unstructured situations) with learned components (which handle novel situations more gracefully but offer far weaker guarantees) — precisely because pure learning-based control is still difficult to fully trust in safety-critical physical settings." },
    ],
    prerequisites: ["cnn"],
  },
];

async function main() {
  for (const level of levels) {
    await prisma.level.upsert({
      where: { index: level.index },
      update: { slug: level.slug, title: level.title, description: level.description, colorTheme: level.colorTheme },
      create: level,
    });
  }

  const levelByIndex = new Map(
    (await prisma.level.findMany()).map((l) => [l.index, l])
  );

  for (const c of concepts) {
    const level = levelByIndex.get(c.levelIndex);
    if (!level) throw new Error(`Level ${c.levelIndex} not found for concept ${c.slug}`);

    const concept = await prisma.concept.upsert({
      where: { slug: c.slug },
      update: {
        title: c.title,
        cardLabel: c.cardLabel,
        oneLiner: c.oneLiner,
        levelId: level.id,
        order: c.order,
        estimatedMinutes: c.estimatedMinutes,
        realWorldExamples: JSON.stringify(c.realWorldExamples),
        tags: JSON.stringify(c.tags),
        published: true,
      },
      create: {
        slug: c.slug,
        title: c.title,
        cardLabel: c.cardLabel,
        oneLiner: c.oneLiner,
        levelId: level.id,
        order: c.order,
        estimatedMinutes: c.estimatedMinutes,
        realWorldExamples: JSON.stringify(c.realWorldExamples),
        tags: JSON.stringify(c.tags),
        published: true,
      },
    });

    await prisma.conceptExplanation.deleteMany({ where: { conceptId: concept.id } });
    await prisma.conceptExplanation.createMany({
      data: c.explanations.map((e) => ({ conceptId: concept.id, depth: e.depth, content: e.content })),
    });

    await prisma.conceptSection.deleteMany({ where: { conceptId: concept.id } });
    if (c.sections?.length) {
      await prisma.conceptSection.createMany({
        data: c.sections.map((s) => ({
          conceptId: concept.id,
          kind: s.kind,
          title: s.title,
          body: s.body ?? null,
          code: s.code ?? null,
          visualizerKey: s.visualizerKey ?? null,
          data: s.data ? JSON.stringify(s.data) : null,
          order: s.order,
        })),
      });
    }
  }

  const conceptBySlug = new Map(
    (await prisma.concept.findMany()).map((c) => [c.slug, c])
  );

  await prisma.conceptPrerequisite.deleteMany({});
  for (const c of concepts) {
    if (!c.prerequisites?.length) continue;
    const concept = conceptBySlug.get(c.slug);
    if (!concept) continue;
    for (const prereqSlug of c.prerequisites) {
      const prereq = conceptBySlug.get(prereqSlug);
      if (!prereq) continue;
      await prisma.conceptPrerequisite.create({
        data: { conceptId: concept.id, prerequisiteId: prereq.id },
      });
    }
  }

  const counts = {
    levels: await prisma.level.count(),
    concepts: await prisma.concept.count(),
    explanations: await prisma.conceptExplanation.count(),
    sections: await prisma.conceptSection.count(),
    prerequisites: await prisma.conceptPrerequisite.count(),
  };
  console.log("Seed complete:", counts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
