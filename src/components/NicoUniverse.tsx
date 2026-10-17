import { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './NicoUniverse.css';

/* ── Naresh Kumar Data Science Constellation Dataset ── */
export const NARESH_DB = {
  N: [
    {
      id: "naresh",
      name: "Naresh",
      region: "entry",
      x: 0,
      y: 0.23,
      r: 1.55,
      z: 0,
      kicker: "Undergraduate Data Science Researcher",
      links: [
        ["Explore Academic Foundations · FAST-NUCES", "#/fast_nuces"],
        ["GitHub Repository", "https://github.com/Naresh-Kumar17"]
      ],
      sum: "Data Science undergraduate at FAST-NUCES Karachi turning statistical pipelines into empirical decisions.",
      body: "Pursuing BS Data Science at National University of Computer and Emerging Sciences (FAST-NUCES) Karachi (2025–2029). Focused on exploratory data pipelines, statistical modeling, machine learning benchmarks, and visual narratives. Understanding the math first, then designing computational systems that reveal insights in complex data.",
      cap: "Naresh Kumar · FAST-NUCES Karachi",
      role: "Student, Data Scientist & Computational Thinker",
      duration: "FAST-NUCES Karachi · 2025 → 2029",
      impact: "Building modular, reproducible data pipelines and exploratory statistical frameworks.",
      scope: "Rigorous coursework in computational statistics, linear algebra, algorithms, and practical machine learning using Python, pandas, NumPy, and scikit-learn.",
      skills: [
        ["Python & Data Ecosystem", "core"],
        ["Exploratory Data Analysis", "core"],
        ["Machine Learning · Scikit-Learn", "grew"],
        ["Statistical Inference", "grew"],
        ["SQL & Relational Schemas", "core"]
      ],
      story: "My journey started with a fascination for patterns in data and code. Studying Data Science at FAST-NUCES provides the mathematical rigor, algorithmic thinking, and empirical experimentation needed to tackle real-world data challenges."
    },
    {
      id: "contacto",
      name: "Let's Connect",
      region: "entry",
      x: -2.6,
      y: 1.15,
      r: 0.5,
      z: 0.1,
      kicker: "Contact & Collaboration",
      sum: "Open for discussions, research collaborations, and internships.",
      body: "Interested in data science pipelines, applied machine learning, or research projects? Reach out through any channel below.",
      cap: "Contact",
      links: [
        ["Email · vishnaninaresh8@gmail.com", "mailto:vishnaninaresh8@gmail.com"],
        ["GitHub · Naresh-Kumar17", "https://github.com/Naresh-Kumar17"],
        ["Portfolio Repository", "https://github.com/Naresh-Kumar17/protoflio_naresh"],
        ["FAST-NUCES Karachi", "https://khi.nu.edu.pk/"]
      ]
    },
    {
      id: "collaborate",
      name: "Project Brief",
      region: "entry",
      x: -3.15,
      y: -0.6,
      r: 0.55,
      z: 0,
      kicker: "Collaborations",
      sum: "Data exploration, statistical modeling, and interactive dashboards.",
      body: "Available for research projects, open-source data science tools, and end-to-end data pipeline builds.",
      cap: "Work Together"
    },
    {
      id: "fast_nuces",
      name: "FAST-NUCES",
      region: "special",
      x: 2.81,
      y: 1.56,
      r: 2.35,
      z: 0.4,
      kicker: "Flagship Academic Foundation · BS Data Science",
      sum: "National University of Computer & Emerging Sciences — Premier computing education.",
      body: "FAST-NUCES Karachi is Pakistan's premier computing university. The BS Data Science program blends deep computer science theory, discrete mathematics, linear algebra, probability, data structures, and hands-on machine learning.",
      cap: "FAST-NUCES Karachi Campus",
      url: "https://khi.nu.edu.pk/",
      urlLabel: "FAST-NUCES Karachi Portal ↗",
      role: "Undergraduate Student · BS Data Science (Batch 2025–2029)",
      duration: "2025 → 2029 · Karachi, Pakistan",
      impact: "Mastering core CS and statistical foundations across rigorous academic semesters.",
      scope: "Curriculum covers Programming Fundamentals, Object Oriented Programming, Data Structures, Discrete Mathematics, Linear Algebra, Multivariate Calculus, Probability & Statistics, and Machine Learning.",
      objectives: [
        "Master foundational mathematics and algorithmic complexity.",
        "Implement scalable data processing and machine learning pipelines.",
        "Apply data science methodologies to solve complex empirical problems."
      ],
      impacts: [
        "Rigorous foundation in computer science principles and software engineering.",
        "Comprehensive training in statistical hypothesis testing and probability theory.",
        "Practical laboratory implementations in Python, C++, and SQL."
      ],
      skills: [
        ["Computer Science Foundations", "core"],
        ["Linear Algebra & Calculus", "core"],
        ["Data Structures & Algorithms", "core"],
        ["Probability & Statistics", "core"]
      ]
    },
    {
      id: "ai",
      name: "Machine Learning",
      region: "ai",
      x: -3.74,
      y: 2.57,
      r: 1.45,
      z: 0.3,
      kicker: "Domain ① · Model Training, Evaluation & Benchmarking",
      links: [["Classification Benchmark Lab", "#/classification_lab"]],
      sum: "Formulating machine learning pipelines, feature transformation, and evaluation metrics.",
      body: "Machine learning requires more than just calling fit() and predict(). It requires systematic feature engineering, cross-validation, hyperparameter tuning, and clear metric diagnostics to prevent data leakage and overfitting.",
      role: "Model Developer & Machine Learning Practitioner",
      duration: "2024 → ongoing",
      impact: "Designing robust classification and regression pipelines with reproducible benchmarks.",
      scope: "Working with scikit-learn, XGBoost, feature pipelines, regression modeling, and classification diagnostics (ROC-AUC, Precision-Recall, F1-score).",
      skills: [
        ["Scikit-Learn Workflows", "core"],
        ["Supervised Learning", "core"],
        ["Feature Engineering", "grew"],
        ["Model Evaluation & Metrics", "grew"]
      ]
    },
    {
      id: "classification_lab",
      name: "Classification Lab",
      region: "ai",
      x: -5.93,
      y: 3.59,
      r: 0.75,
      z: 0.5,
      kicker: "Machine Learning",
      sum: "Comparative benchmark across Logistic Regression, Random Forests, and SVMs.",
      body: "A structured machine learning benchmark evaluating classification performance across multi-class datasets. Evaluates decision boundaries, confusion matrices, and precision-recall trade-offs.",
      cap: "Classification Benchmarks",
      role: "Lead Experimenter",
      duration: "2024–2025",
      impact: "Systematic comparison of 5 classification architectures on structured tabular data.",
      skills: [
        ["Logistic Regression", "core"],
        ["Random Forests", "grew"],
        ["Cross-Validation", "core"]
      ]
    },
    {
      id: "network",
      name: "Graph Analytics",
      region: "ai",
      x: -5.46,
      y: 1.48,
      r: 0.7,
      z: 0.1,
      kicker: "Graph Intelligence",
      sum: "Network graphs, centrality analysis, and topological data structures.",
      body: "Exploring graphs to discover relationships, community clusters, and central bridge nodes across connected datasets.",
      cap: "Graph Network Visualization",
      role: "Graph Analytics Developer",
      duration: "2025",
      skills: [
        ["NetworkX & Graph Theory", "grew"],
        ["Centrality Metrics", "core"],
        ["D3.js Graph Visuals", "grew"]
      ]
    },
    {
      id: "scikit_toolkit",
      name: "Scikit Toolkit",
      region: "ai",
      x: 0,
      y: 3.82,
      r: 0.78,
      z: 0.2,
      kicker: "Model Engineering",
      sum: "Modular preprocessing pipelines, transformers, and cross-validation harnesses.",
      body: "Reusable scikit-learn Pipeline abstractions for imputation, scaling, one-hot encoding, and hyperparameter search.",
      cap: "Scikit-Learn Modular Toolkit",
      skills: [
        ["ColumnTransformer", "core"],
        ["GridSearchCV & Optuna", "grew"],
        ["Pipeline Architecture", "core"]
      ]
    },
    {
      id: "growth",
      name: "Analytics & BI",
      region: "growth",
      x: 6.16,
      y: -0.47,
      r: 1.45,
      z: -0.3,
      kicker: "Domain ② · Business Intelligence & Statistical Inference",
      sum: "Transforming raw business records into actionable KPI metrics and decisions.",
      body: "Analytics bridges data science and decision making. Connecting SQL extraction, cohorts, funnel metrics, and statistical hypothesis testing to evaluate performance and user behavior.",
      role: "Data Analyst & Metrics Architect",
      duration: "2024 → ongoing",
      impact: "Designing clean SQL reporting layers and reproducible cohort retention analyses.",
      skills: [
        ["SQL Querying & Joins", "core"],
        ["Cohort Analysis", "core"],
        ["A/B Testing Foundations", "grew"],
        ["KPI Dashboard Design", "core"]
      ]
    },
    {
      id: "sql_analytics",
      name: "SQL Analytics Lab",
      region: "growth",
      x: 5.07,
      y: 1.09,
      r: 0.95,
      z: 0.2,
      kicker: "Relational Intelligence",
      sum: "Complex aggregations, window functions, and schema normalization.",
      body: "Advanced SQL queries leveraging CTEs, window functions (ROW_NUMBER, LAG, LEAD), and multi-table joins to analyze transactional databases.",
      cap: "SQL Analytics & Schema Design",
      skills: [
        ["PostgreSQL / MySQL", "core"],
        ["Window Functions", "core"],
        ["CTEs & Indexing", "grew"]
      ]
    },
    {
      id: "kpi_dashboards",
      name: "Decision Dashboards",
      region: "growth",
      x: 6.79,
      y: -2.57,
      r: 0.8,
      z: 0,
      kicker: "Visual Reporting",
      sum: "Interactive KPI reporting dashboards for data monitoring.",
      body: "Designing visual layouts that prioritize key decision variables without clutter or cognitive overhead.",
      cap: "KPI Reporting Suite",
      skills: [
        ["Interactive Dashboards", "core"],
        ["Visual Hierarchy", "core"]
      ]
    },
    {
      id: "stats_inference",
      name: "Inference & A/B",
      region: "growth",
      x: 4.99,
      y: -2.42,
      r: 0.7,
      z: 0.1,
      kicker: "Statistical Inference",
      sum: "Hypothesis testing, p-values, confidence intervals, and power calculations.",
      body: "Rigorous statistical inference: two-sample t-tests, Mann-Whitney U tests, chi-square tests, and bootstrap confidence intervals to validate differences.",
      cap: "Hypothesis Testing Lab",
      skills: [
        ["Hypothesis Testing", "core"],
        ["Bootstrap Methods", "grew"],
        ["Confidence Intervals", "core"]
      ]
    },
    {
      id: "business_metrics",
      name: "Business Metrics",
      region: "growth",
      x: 8.11,
      y: 1.01,
      r: 0.9,
      z: 0.2,
      kicker: "Empirical Metrics",
      sum: "Customer lifetime value, churn probability, and engagement cohorts.",
      body: "Modeling customer acquisition, retention curves, and revenue churn using survival curves and statistical distributions.",
      skills: [
        ["Retention Curves", "core"],
        ["Cohort Metrics", "core"]
      ]
    },
    {
      id: "data_storytelling",
      name: "Data Storytelling",
      region: "growth",
      x: 8.35,
      y: -1.17,
      r: 0.8,
      z: -0.1,
      kicker: "Communication",
      sum: "Crafting narratives from data that non-technical stakeholders understand.",
      body: "A technical analysis without a clear narrative fails to impact decisions. Translating statistical conclusions into clear, actionable prose.",
      skills: [["Visual Narratives", "core"], ["Technical Writing", "core"]]
    },
    {
      id: "predictive_modeling",
      name: "Predictive Models",
      region: "growth",
      x: 6.01,
      y: -4.13,
      r: 0.65,
      z: -0.2,
      kicker: "Predictive Analytics",
      sum: "Time-series forecasting and trend decomposition.",
      body: "Exploring moving averages, exponential smoothing, and trend decomposition to model time-varying signals.",
      skills: [["Time Series", "grew"], ["Trend Decomposition", "core"]]
    },
    {
      id: "feature_eng",
      name: "Feature Engineering",
      region: "growth",
      x: 7.88,
      y: -2.89,
      r: 0.7,
      z: 0,
      kicker: "Data Preprocessing",
      sum: "Domain feature synthesis, target encoding, and outlier management.",
      body: "Crafting domain-specific features that maximize model signal while minimizing variance and multicollinearity.",
      skills: [["Feature Synthesis", "core"], ["Correlation Analysis", "core"]]
    },
    {
      id: "ml_foundations",
      name: "ML Foundations",
      region: "growth",
      x: 7.2,
      y: -4.5,
      r: 0.62,
      z: -0.3,
      kicker: "Core Theory",
      sum: "The mathematical backbone of machine learning algorithms.",
      body: "Cost functions, bias-variance tradeoff, regularization (L1/L2), and convex optimization principles.",
      skills: [["Loss Functions", "core"], ["Regularization", "core"]]
    },
    {
      id: "data",
      name: "Data Science & EDA",
      region: "data",
      x: -4.29,
      y: -2.11,
      r: 1.35,
      z: -0.2,
      kicker: "Domain ③ · Exploratory Data Analysis & Visualization",
      links: [["EDA Pipeline Case Study", "#/eda_pipeline"]],
      sum: "Raw data in; verified distributions, clean features, and confident decisions out.",
      body: "The core of my data science practice. Deep exploratory data analysis using Python, pandas, NumPy, Matplotlib, and Seaborn. Systematic profiling of distributions, correlations, outliers, and missing value patterns.",
      role: "Data Science Researcher & Pipeline Developer",
      duration: "2024 → ongoing",
      impact: "Building modular, reproducible data analysis workflows with automated quality checks.",
      scope: "From raw unstructured or messy CSV/SQL datasets to cleaned, standardized, and richly visualized data assets ready for modeling.",
      skills: [
        ["pandas DataFrames", "core"],
        ["NumPy Vectorization", "core"],
        ["Data Quality Assessment", "core"],
        ["Seaborn & Matplotlib", "core"]
      ]
    },
    {
      id: "eda_pipeline",
      name: "EDA Pipeline",
      region: "data",
      x: -2.11,
      y: -3.51,
      r: 0.95,
      z: 0.3,
      kicker: "Flagship Project · Data Science",
      sum: "A comprehensive exploratory data analysis workflow analyzing real-world datasets.",
      body: "Built a structured exploratory data analysis pipeline using Python, pandas, and visualization libraries. The project walks through automated data ingestion, cleaning, missing value profiling, statistical summaries, distribution analysis, correlation exploration, and visual storytelling.",
      cap: "EDA Pipeline Architecture",
      url: "https://github.com/Naresh-Kumar17/protoflio_naresh",
      urlLabel: "View on GitHub ↗",
      role: "Lead Developer & Analyst",
      duration: "2024 · Active Project",
      impact: "Standardized exploratory methodology adopted across multiple university data projects.",
      objectives: [
        "Create a reusable, modular EDA workflow in Python.",
        "Systematize data cleaning decisions with clear rationale.",
        "Produce publication-quality visualizations for distribution and correlation analysis."
      ],
      impacts: [
        "Reusable assess_data_quality() function reporting missingness, duplicates, and type mismatches.",
        "Comprehensive visualization suite handling univariate and bivariate distributions.",
        "Clean, well-documented Jupyter notebook architecture."
      ],
      skills: [
        ["Python", "core"],
        ["pandas", "core"],
        ["Matplotlib & Seaborn", "core"],
        ["Statistical Profiling", "core"]
      ]
    },
    {
      id: "viz_gallery",
      name: "Visualization Gallery",
      region: "data",
      x: -6.55,
      y: -3.2,
      r: 0.85,
      z: -0.4,
      kicker: "Data Visualization",
      sum: "A collection of publication-grade visualizations exploring chart types and color palettes.",
      body: "Exploring how chart type choice, typography, and perceptual color palettes impact data interpretation. Comparing heatmaps, violin plots, faceted histograms, and scatter plots.",
      cap: "Visual Design & Perception",
      skills: [
        ["Visual Encoding", "core"],
        ["Color Perception", "core"],
        ["Information Design", "grew"]
      ]
    },
    {
      id: "data_quality",
      name: "Data Quality Engine",
      region: "data",
      x: -5.4,
      y: -1.2,
      r: 0.6,
      z: 0.1,
      kicker: "Data Reliability",
      sum: "Automated assertion testing and data quality profiling scripts.",
      body: "Validating schema constraints, null thresholds, value ranges, and distribution shifts before ingestion into analytical models.",
      skills: [["Schema Validation", "core"], ["Assertion Testing", "core"]]
    },
    {
      id: "data_cleaning",
      name: "Cleaning & Normalization",
      region: "data",
      x: -6.2,
      y: -1.8,
      r: 0.55,
      z: -0.1,
      kicker: "Preprocessing",
      sum: "Systematic handling of outliers, categorical encoding, and datetime parsing.",
      body: "Standardizing string fields, handling timezones, and applying robust scaling to skewed variables.",
      skills: [["Data Normalization", "core"], ["Robust Scaling", "core"]]
    },
    {
      id: "musica",
      name: "Mathematics",
      region: "musica",
      x: 0.78,
      y: -3.74,
      r: 1.4,
      z: 0.4,
      kicker: "Domain ④ · Algorithmic & Mathematical Foundations",
      sum: "Linear algebra, multivariable calculus, and discrete mathematical structures.",
      body: "Mathematics is the language of machine learning. Deepening mastery of matrix decomposition (SVD, Eigendecomposition), vector spaces, gradient computation, and probability theory.",
      role: "Mathematical Foundations Researcher",
      duration: "Continuous",
      impact: "Grounding empirical code in rigorous mathematical and algorithmic theory.",
      skills: [
        ["Linear Algebra & Matrices", "core"],
        ["Multivariate Calculus", "core"],
        ["Discrete Mathematics", "core"],
        ["Algorithm Complexity", "core"]
      ]
    },
    {
      id: "linear_algebra",
      name: "Linear Algebra Lab",
      region: "musica",
      x: 2.73,
      y: -4.84,
      r: 0.7,
      z: -0.3,
      kicker: "Linear Algebra",
      sum: "Vector projections, eigenvalues, eigenvectors, and dimensionality reduction.",
      body: "Hands-on implementations of matrix multiplications, orthogonal projections, and principal component analysis (PCA) from first principles using NumPy.",
      skills: [["Eigenvalues & PCA", "core"], ["Vector Spaces", "core"], ["NumPy Linear Algebra", "core"]]
    },
    {
      id: "probability_stats",
      name: "Probability & Stats",
      region: "musica",
      x: -0.55,
      y: -5.3,
      r: 0.85,
      z: 0.2,
      kicker: "Stochastic Systems",
      sum: "Probability distributions, Bayes theorem, and random variables.",
      body: "Modeling random phenomena using Gaussian, Poisson, Binomial, and Exponential distributions. Applying Bayes theorem for posterior probability calculations.",
      skills: [["Bayesian Probability", "core"], ["Probability Distributions", "core"]]
    },
    {
      id: "algorithmic_ds",
      name: "Data Structures",
      region: "musica",
      x: -2.34,
      y: -5.93,
      r: 0.62,
      z: -0.1,
      kicker: "Computer Science",
      sum: "Trees, graphs, hash tables, and asymptotic Big-O runtime analysis.",
      body: "Implementing and optimizing core computer science data structures with rigorous complexity analysis.",
      skills: [["Asymptotic Analysis", "core"], ["Hash Tables & Trees", "core"]]
    },
    {
      id: "optimization",
      name: "Optimization & Gradients",
      region: "musica",
      x: 1.6,
      y: -6,
      r: 0.6,
      z: 0.1,
      kicker: "Optimization",
      sum: "Gradient descent, learning rates, momentum, and convex loss surfaces.",
      body: "Visualizing cost function contours and implementing gradient descent variants (batch, stochastic, mini-batch) in pure Python.",
      skills: [["Gradient Descent", "core"], ["Convex Optimization", "grew"]]
    },
    {
      id: "discrete_math",
      name: "Discrete Math & Logic",
      region: "musica",
      x: -0.4,
      y: -6.2,
      r: 0.62,
      z: 0,
      kicker: "Formal Logic",
      sum: "Propositional logic, set theory, combinatorics, and proof techniques.",
      body: "Foundations of computational reasoning: truth tables, predicate calculus, mathematical induction, and graph connectivity.",
      skills: [["Formal Logic", "core"], ["Proof by Induction", "core"]]
    },
    {
      id: "coursework",
      name: "Coursework",
      region: "special",
      x: 5.5,
      y: 2.4,
      r: 0.8,
      z: 0.2,
      kicker: "Academic Curriculum",
      sum: "Core degree coursework at FAST-NUCES Karachi.",
      body: "Comprehensive curriculum tracking across computational sciences, programming, and statistics.",
      cap: "FAST-NUCES Academic Curriculum",
      skills: [["C++ & Python", "core"], ["Software Design", "core"]]
    },
    {
      id: "dev_environment",
      name: "Dev Environment",
      region: "special",
      x: 2.2,
      y: 3.4,
      r: 0.85,
      z: 0.3,
      kicker: "Engineering Tooling",
      sum: "Modern developer workflow: Linux, Git, VS Code, and reproducible notebooks.",
      body: "Building an efficient, keyboard-driven development environment with version control, virtual environments, and continuous code quality.",
      skills: [["Git & GitHub", "core"], ["Linux / Terminal", "core"], ["Jupyter Labs", "core"]]
    },
    {
      id: "manifesto",
      name: "Manifesto",
      region: "special",
      x: 3.7,
      y: -1.2,
      r: 0.72,
      z: 0.1,
      kicker: "Scientific Methodology",
      sum: "Guiding principles for ethical, empirical data science.",
      body: "01 Understand the generation mechanism: never model what you haven't inspected. 02 Respect the data: missing values are information, not inconveniences. 03 Strive for simplicity: prefer interpretable models that solve the problem over opaque architectures that obscure it. 04 Verify empirically: reproducible experiments over optimistic assumptions.",
      cap: "Data Science Manifesto"
    },
    {
      id: "technical_writing",
      name: "Technical Notes",
      region: "special",
      x: 4.68,
      y: 3.59,
      r: 0.55,
      z: 0.1,
      kicker: "Documentation",
      sum: "Documenting learnings, algorithm implementations, and benchmarks.",
      body: "Writing clear technical explanations, reproducible experiments, and well-commented code repositories.",
      url: "https://github.com/Naresh-Kumar17",
      urlLabel: "Read GitHub Repositories ↗"
    }
  ],
  E: [
    ["naresh", "contacto"],
    ["naresh", "collaborate"],
    ["naresh", "fast_nuces"],
    ["naresh", "ai"],
    ["naresh", "growth"],
    ["naresh", "data"],
    ["naresh", "musica"],
    ["fast_nuces", "coursework"],
    ["fast_nuces", "dev_environment"],
    ["fast_nuces", "manifesto"],
    ["fast_nuces", "technical_writing"],
    ["ai", "classification_lab"],
    ["ai", "network"],
    ["ai", "scikit_toolkit"],
    ["growth", "sql_analytics"],
    ["growth", "kpi_dashboards"],
    ["growth", "stats_inference"],
    ["growth", "business_metrics"],
    ["growth", "data_storytelling"],
    ["growth", "predictive_modeling"],
    ["growth", "feature_eng"],
    ["growth", "ml_foundations"],
    ["data", "eda_pipeline"],
    ["data", "viz_gallery"],
    ["data", "data_quality"],
    ["data", "data_cleaning"],
    ["musica", "linear_algebra"],
    ["musica", "probability_stats"],
    ["musica", "algorithmic_ds"],
    ["musica", "optimization"],
    ["musica", "discrete_math"],
    ["eda_pipeline", "viz_gallery"],
    ["eda_pipeline", "data_quality"],
    ["classification_lab", "scikit_toolkit"],
    ["sql_analytics", "kpi_dashboards"],
    ["linear_algebra", "optimization"],
    ["probability_stats", "stats_inference"],
    ["data", "ai"],
    ["ai", "growth"],
    ["growth", "fast_nuces"],
    ["data", "musica"]
  ]
};

const COLOR: Record<string, string> = {
  entry: '#9B8FFF',     // Iris Lavender
  ai: '#E84FD0',        // Neural Magenta
  growth: '#FF6A3D',    // Coral Sunset
  data: '#00B0CD',      // Data Stream Cyan
  musica: '#FF3D7A',    // Electric Rose
  special: '#CFFF04'    // Cyber Citron / Acid Lime
};

const RLAB: Record<string, string> = {
  entry: 'Naresh',
  ai: 'Machine Learning',
  growth: 'Analytics & BI',
  data: 'Data Science & EDA',
  musica: 'Mathematics',
  special: 'FAST-NUCES Systems'
};

const REG: [string, string][] = [
  ['entry', 'NARESH'],
  ['data', 'DATA SCIENCE'],
  ['ai', 'MACHINE LEARNING'],
  ['growth', 'ANALYTICS'],
  ['musica', 'MATHEMATICS'],
  ['special', 'FAST-NUCES']
];

const REGION_TO_HUB: Record<string, string> = {
  entry: 'naresh',
  data: 'data',
  ai: 'ai',
  growth: 'growth',
  musica: 'musica',
  special: 'fast_nuces',
};

const PARENTS = new Set(['ai', 'growth', 'data', 'musica', 'special', 'entry']);

export interface NicoUniverseProps {
  onSwitchToList?: () => void;
}

export function NicoUniverse({ onSwitchToList }: NicoUniverseProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const N = NARESH_DB.N;
    const E = NARESH_DB.E;
    const idIndex: Record<string, number> = Object.fromEntries(N.map((n: any, i: number) => [n.id, i]));
    const byId: Record<string, any> = Object.fromEntries(N.map((n: any) => [n.id, n]));

    const childrenIdx: Record<number, number[]> = {};
    N.forEach((n: any, i: number) => {
      const hubId = REGION_TO_HUB[n.region];
      const hubIdx = hubId ? idIndex[hubId] : undefined;
      if (hubIdx !== undefined && i !== hubIdx) {
        (childrenIdx[hubIdx] = childrenIdx[hubIdx] || []).push(i);
      }
    });

    const c = root.querySelector('#c') as HTMLCanvasElement;
    const ctx = c.getContext('2d')!;
    const mini = root.querySelector('#mini') as HTMLCanvasElement;
    const mctx = mini.getContext('2d')!;
    const tip = root.querySelector('#tip') as HTMLDivElement;
    const galleryEl = root.querySelector('#gallery') as HTMLElement;
    const pageEl = root.querySelector('#page') as HTMLDivElement;
    const docEl = root.querySelector('#doc') as HTMLDivElement;
    const tabsEl = root.querySelector('#tabs') as HTMLDivElement;
    const backBtn = root.querySelector('#back') as HTMLElement;
    const spacer = root.querySelector('#spacer') as HTMLElement;

    let W = (c.width = window.innerWidth);
    let H = (c.height = window.innerHeight);
    let SC = 1, LBL = 1;

    // Origin center
    const cx0 = N.reduce((a, n) => a + n.x, 0) / N.length;
    const cy0 = N.reduce((a, n) => a + n.y, 0) / N.length;
    let orgR = 1;
    for (const n of N) {
      const d = Math.hypot(n.x - cx0, n.y - cy0);
      if (d > orgR) orgR = d;
    }

    function resize() {
      W = c.width = window.innerWidth;
      H = c.height = window.innerHeight;
      const span = W <= 760 ? 1.6 : 2.35;
      SC = Math.min(W, H) / (orgR * span);
      LBL = W <= 760 ? 1.5 : 1;
    }
    window.addEventListener('resize', resize);
    resize();
// ── Particles, Stars, Haze & Quantum Clusters ──
    const stars = Array.from({ length: 560 }, () => ({
      x: Math.random(),
      y: Math.random(),
      b: Math.pow(Math.random(), 1.9),
      tw: Math.random() * 6.28,
    }));

    function gauss() {
      let u = 0, v = 0;
      while (!u) u = Math.random();
      while (!v) v = Math.random();
      return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    }

    const haze: any[] = [];
    for (let i = 0; i < 1500; i++) {
      const e = E[(Math.random() * E.length) | 0];
      const a = idIndex[e[0]], b = idIndex[e[1]];
      const na = N[a] as any, nb = N[b] as any;
      const u = Math.random();
      haze.push({
        x: na.x + (nb.x - na.x) * u + gauss() * 0.5,
        y: na.y + (nb.y - na.y) * u + gauss() * 0.5,
        z: (na.z || 0) + ((nb.z || 0) - (na.z || 0)) * u,
        b: Math.pow(Math.random(), 2.4) * 0.6,
        ph: Math.random() * 6.283,
        sp: 0.2 + Math.random() * 0.5,
        sz: 0.5 + Math.random() * 1.1,
      });
    }

    // Attach clusters to nodes
    for (const n of N as any[]) {
      n.cl = [];
      const cnt = Math.round(18 + n.r * 18);
      for (let j = 0; j < cnt; j++) {
        const u = Math.random();
        n.cl.push({
          a: Math.random() * 6.283,
          rr: Math.sqrt(u) * (0.85 + Math.random() * 0.55),
          sz: 0.7 + Math.random() * 1.25,
          b: Math.pow(Math.random(), 1.5),
          ph: Math.random() * 6.283,
          sp: 0.4 + Math.random() * 0.8,
          jz: (Math.random() - 0.5) * 0.35,
        });
      }
    }

    // ── State Variables ──
    let mode: 'cold' | 'field' | 'page' | 'trans' = 'cold';
    let P = 0, transDir = 1, playing = false;
    let camZoom = 1, coldP = 0;
    let fieldSel: string | null = 'naresh';
    let focusSet = new Set<number>([idIndex['naresh']]);
    let hoverId: string | null = null;
    let galMode: 'area' | 'node' | null = null;
    let galNode: string | null = null;

    let curRot = 0, curBr = 1, lastTs = 0;
    let fieldCX = 0.5, fieldCXt = 0.5;
    let userZoom = 1, viewRot = 0, viewTiltX = 0, userInteracted = false;

    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    function proj(wx: number, wy: number, wz: number = 0): [number, number, number] {
      let x = wx - cx0, y = wy - cy0, z = (wz || 0) * 1.3;
      const sp = curRot, cs = Math.cos(sp), sn = Math.sin(sp);
      let px = x * cs - y * sn, py = x * sn + y * cs;
      const ay = viewRot, cay = Math.cos(ay), say = Math.sin(ay);
      let x1 = px * cay - z * say, z1 = px * say + z * cay;
      const ax = viewTiltX, cax = Math.cos(ax), sax = Math.sin(ax);
      let y1 = py * cax - z1 * sax, z2 = py * sax + z1 * cax;
      x1 *= curBr; y1 *= curBr;
      const persp = 5.5 / (5.5 - z2 * 0.5);
      const Z = camZoom * userZoom * persp;
      return [W * fieldCX + x1 * SC * Z, H / 2 - y1 * SC * Z, persp];
    }

    // ── Interaction: Pointer, Drag, Click ──
    let isDragging = false, dragStartX = 0, dragStartY = 0;
    let startRot = 0, startTilt = 0;

    c.addEventListener('pointerdown', (e: PointerEvent) => {
      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      startRot = viewRot;
      startTilt = viewTiltX;
      userInteracted = true;
    });

    window.addEventListener('pointermove', (e: PointerEvent) => {
      const mouseX = e.clientX, mouseY = e.clientY;
      if (isDragging) {
        const dx = (mouseX - dragStartX) / W;
        const dy = (mouseY - dragStartY) / H;
        viewRot = startRot + dx * 2.5;
        viewTiltX = Math.max(-0.6, Math.min(0.6, startTilt + dy * 1.8));
      }

      // Check node hover in field mode
      if (mode === 'field') {
        let best: any = null, bestDist = 28;
        for (let i = 0; i < N.length; i++) {
          const [sx, sy] = proj(N[i].x, N[i].y, (N[i] as any).z);
          const d = Math.hypot(mouseX - sx, mouseY - sy);
          if (d < Math.max(bestDist, N[i].r * 18 * userZoom)) {
            bestDist = d;
            best = N[i];
          }
        }
        if (best !== hoverId) {
          hoverId = best ? best.id : null;
          if (best) showTip(best, mouseX, mouseY);
          else hideTip();
        } else if (best) {
          tip.style.left = mouseX + 'px';
          tip.style.top = mouseY + 'px';
        }
      }
    });

    window.addEventListener('pointerup', (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      const dist = Math.hypot(e.clientX - dragStartX, e.clientY - dragStartY);
      if (dist < 6) {
        handleCanvasClick(e.clientX, e.clientY);
      }
    });

    c.addEventListener('wheel', (e: WheelEvent) => {
      e.preventDefault();
      userInteracted = true;
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      userZoom = Math.max(0.6, Math.min(2.8, userZoom * delta));
    }, { passive: false });

    function handleCanvasClick(clientX: number, clientY: number) {
      if (mode !== 'field') return;
      for (let i = 0; i < N.length; i++) {
        const [sx, sy] = proj(N[i].x, N[i].y, (N[i] as any).z);
        const hitR = Math.max(24, N[i].r * 18 * userZoom);
        if (Math.hypot(clientX - sx, clientY - sy) <= hitR) {
          const clickedNode = N[i];
          if (fieldSel === clickedNode.id) {
            openPage(clickedNode.id);
          } else {
            setFieldFocus(clickedNode.id);
          }
          return;
        }
      }
      goHome();
    }

    function showTip(n: any, x: number, y: number) {
      const col = COLOR[n.region];
      tip.querySelector('.nm')!.innerHTML =
        '<span class="tdot" style="background:' + col + ';box-shadow:0 0 8px ' + col + '"></span>' + n.name;
      tip.querySelector('.kc')!.textContent = n.kicker || '';
      tip.querySelector('.go')!.textContent = 'PROYECTO · click para explorar →';
      tip.style.borderColor = col;
      tip.style.opacity = '1';
      tip.style.left = x + 'px';
      tip.style.top = y + 'px';
    }

    function hideTip() {
      tip.style.opacity = '0';
    }

    function setFieldFocus(rawId: string) {
      const targetId = REGION_TO_HUB[rawId] || rawId;
      const n = byId[targetId];
      if (!n) return;

      fieldSel = targetId;
      const i = idIndex[targetId];
      if (i === undefined) return;

      const isParent = PARENTS.has(n.region) && (targetId === n.region || targetId === 'fast_nuces' || targetId === 'naresh');

      if (targetId === 'naresh') {
        focusSet = new Set([i, ...(childrenIdx[i] || [])]);
        galMode = 'area';
        galNode = 'naresh';
      } else if (isParent) {
        focusSet = new Set([i, ...(childrenIdx[i] || [])]);
        galMode = 'area';
        galNode = targetId;
      } else {
        focusSet = new Set([i]);
        galMode = 'node';
        galNode = targetId;
      }
      setTabsOn();
      renderGallery();
    }

    function goHome() {
      mode = 'field';
      P = 0;
      playing = false;
      hoverId = null;
      hideTip();
      fieldSel = null;
      focusSet = new Set();
      galMode = null;
      galNode = null;
      userZoom = 1;
      viewRot = 0;
      viewTiltX = 0;
      userInteracted = false;
      fieldCX = fieldCXt = 0.5;
      setTabsOn();
      renderGallery();
    }

    function openPage(id: string) {
      galMode = null;
      galNode = null;
      renderGallery();
      hideTip();
      buildPage(byId[id]);
      mode = 'trans';
      transDir = 1;
      playing = true;
    }

    function returnHome() {
      hoverId = null;
      hideTip();
      if (mode !== 'field') {
        mode = 'trans';
        transDir = -1;
        playing = true;
      }
      goHome();
    }

    backBtn.onclick = returnHome;
    if (spacer) spacer.onclick = returnHome;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        returnHome();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

        // ── Build Category Tabs ──
    function buildTabs() {
      tabsEl.innerHTML = '';
      const allBtn = document.createElement('button');
      allBtn.className = 't on';
      allBtn.type = 'button';
      allBtn.innerHTML = '<i></i>ALL';
      allBtn.onclick = (e) => {
        e.stopPropagation();
        if (mode !== 'field') {
          mode = 'field';
          playing = false;
          pageEl.style.opacity = '0';
          pageEl.style.pointerEvents = 'none';
        }
        goHome();
      };
      tabsEl.appendChild(allBtn);

      REG.forEach(([r, lbl]) => {
        const d = document.createElement('button');
        d.className = 't';
        d.type = 'button';
        d.dataset.r = r;
        const col = COLOR[r];
        d.innerHTML = '<i style="background:' + col + ';box-shadow:0 0 8px ' + col + '"></i>' + lbl;
        d.onclick = (e) => {
          e.stopPropagation();
          if (mode !== 'field') {
            mode = 'field';
            playing = false;
            pageEl.style.opacity = '0';
            pageEl.style.pointerEvents = 'none';
          }
          hoverId = null;
          hideTip();
          userInteracted = true;
          const targetHub = REGION_TO_HUB[r] || r;
          setFieldFocus(targetHub);
        };
        tabsEl.appendChild(d);
      });
      setTabsOn();
    }
    buildTabs();

    function setTabsOn() {
      const activeRegion = fieldSel && byId[fieldSel] ? byId[fieldSel].region : null;
      tabsEl.querySelectorAll('.t').forEach((t: any) => {
        const r = t.dataset.r;
        if (!r) {
          const isAll = !fieldSel || fieldSel === 'naresh';
          t.classList.toggle('on', isAll);
          t.style.background = isAll ? '#FAFAF7' : 'rgba(14, 12, 24, 0.75)';
          t.style.color = isAll ? '#06070D' : 'rgba(255, 255, 255, 0.85)';
          t.style.borderColor = isAll ? '#FAFAF7' : 'rgba(255, 255, 255, 0.22)';
          t.style.fontWeight = isAll ? '700' : '500';
        } else {
          const isOn = r === activeRegion;
          t.classList.toggle('on', isOn);
          t.style.background = isOn ? COLOR[r] : 'rgba(14, 12, 24, 0.75)';
          t.style.color = isOn ? '#06070D' : 'rgba(255, 255, 255, 0.85)';
          t.style.borderColor = isOn ? COLOR[r] : 'rgba(255, 255, 255, 0.22)';
          t.style.fontWeight = isOn ? '700' : '500';
        }
      });
    }

    // ── Side Gallery Drawer (#gallery) ──
    function renderGallery() {
      if (!galMode || !galNode || mode === 'page') {
        galleryEl.classList.remove('show');
        galleryEl.innerHTML = '';
        return;
      }
      const n = byId[galNode];
      if (!n) return;

      const acc = COLOR[n.region];
      galleryEl.style.setProperty('--cc', acc);
      galleryEl.classList.add('show');

      const isNode = galMode === 'node';
      const enterCTA = isNode
        ? '<button class="genter" data-enter="' + n.id + '">↦ Entrar al proyecto →</button>'
        : '';

      const items = galMode === 'area'
        ? (childrenIdx[idIndex[n.id]] || []).map((ix) => N[ix])
        : E.filter((e) => e[0] === n.id || e[1] === n.id).map((e) => byId[e[0] === n.id ? e[1] : e[0]]);

      const cardsHTML = items.map((m: any) => `
        <div class="gcard" data-go="${m.id}" style="--cc:${COLOR[m.region]}" title="${m.name}">
          <span class="gdot" style="background:${COLOR[m.region]};box-shadow:0 0 6px ${COLOR[m.region]}"></span>
          <div class="gcc">
            <span class="gcn">${m.name}</span>
            <span class="gcs">${m.kicker || RLAB[m.region]}</span>
          </div>
          <span class="gco">→</span>
        </div>
      `).join('');

      galleryEl.innerHTML = `
        <button class="gback" data-back="1">↖ Volver al mapa</button>
        <div class="ghead"><i style="background:${acc};box-shadow:0 0 6px ${acc}"></i><span class="gtag">${RLAB[n.region]}</span></div>
        <div class="gname">${n.name}</div>
        <div class="gdesc">${n.sum || n.body || ''}</div>
        ${enterCTA}
        <div class="gcaplab">Proyectos Relacionados (${items.length})</div>
        ${cardsHTML}
      `;

      galleryEl.querySelectorAll('[data-enter]').forEach((btn: any) => {
        btn.onclick = () => openPage(btn.dataset.enter);
      });
      galleryEl.querySelectorAll('[data-go]').forEach((card: any) => {
        card.onclick = () => setFieldFocus(card.dataset.go);
      });
      galleryEl.querySelectorAll('[data-back]').forEach((btn: any) => {
        btn.onclick = () => goHome();
      });
    }

    // ── Full Editorial Page (#page / #doc) ──
    function buildPage(n: any) {
      if (!n) return;
      const acc = COLOR[n.region];
      document.documentElement.style.setProperty('--acc', acc);
      pageEl.style.setProperty('--cc', acc);

      const metaItems = [
        ['En el mapa', RLAB[n.region]],
        ['Rol', n.role || 'Data Science Research'],
        ['Periodo', n.duration || '2024–2025'],
        ['Impacto', n.impact || 'Reproducible analytics & pipelines']
      ];

      const metaHTML = `
        <div class="meta">
          ${metaItems.map(([k, v]) => `<div><div class="k">${k}</div><div class="v">${v}</div></div>`).join('')}
        </div>
      `;

      const skillsHTML = n.skills
        ? `
          <div class="pdetail">
            <h3>Habilidades & Herramientas</h3>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;">
              ${n.skills.map(([s]: any) => `<span class="tag" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.18);padding:5px 12px;border-radius:999px;font-family:var(--mono);font-size:11px;">${s}</span>`).join('')}
            </div>
          </div>
        `
        : '';

      const cta = n.url
        ? `<a class="cta" href="${n.url}" target="_blank" style="display:inline-flex;align-items:center;gap:8px;margin:20px 0;background:${acc};color:#000;padding:12px 24px;border-radius:8px;font-family:var(--mono);font-size:13px;font-weight:700;text-decoration:none;">${n.urlLabel || 'Abrir Proyecto ↗'}</a>`
        : '';

      const linksHTML = n.links
        ? `
          <div class="links" style="margin:20px 0;display:flex;gap:12px;flex-wrap:wrap;">
            ${n.links.map(([title, url]: any) => `<a class="lk" href="${url}" target="_blank" style="color:${acc};font-family:var(--mono);font-size:12px;text-decoration:none;border-bottom:1px solid ${acc};">${title} ↗</a>`).join('')}
          </div>
        `
        : '';

      docEl.innerHTML = `
        <div class="kicker">${n.kicker || ''}</div>
        <h1 class="title">${n.name}</h1>
        <p class="lead">${n.sum || ''}</p>
        ${cta}
        ${linksHTML}
        ${metaHTML}
        <div class="pbody" style="font-family:var(--sans);font-size:17px;line-height:1.7;color:var(--ink2);margin:30px 0;">
          <p>${n.body || ''}</p>
          ${n.scope ? `<p><strong>Alcance:</strong> ${n.scope}</p>` : ''}
          ${n.story ? `<p><strong>Contexto:</strong> ${n.story}</p>` : ''}
        </div>
        ${skillsHTML}
        <div class="pgfoot" style="margin-top:60px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.12);display:flex;justify-content:space-between;">
          <span class="lk" data-ret="1" style="cursor:pointer;color:${acc};font-family:var(--mono);font-size:13px;">↑ Volver al Mapa</span>
        </div>
      `;

      docEl.querySelectorAll('[data-ret]').forEach((el: any) => {
        el.onclick = returnHome;
      });
    }

    // ── Main Frame Animation Loop ──
    let animId: number;

    function frame(ts: number) {
      const t = (ts || 0) / 1000;
      const dt = Math.min(0.05, ((ts || 0) - lastTs) / 1000 || 0);
      lastTs = ts || 0;

      if (playing) {
        P += (transDir * dt) / 0.85;
        if (P >= 1) {
          P = 1;
          playing = false;
          if (mode === 'trans' && transDir > 0) {
            mode = 'page';
            pageEl.style.opacity = '1';
            pageEl.style.pointerEvents = 'auto';
          }
        }
        if (P <= 0) {
          P = 0;
          playing = false;
          if (transDir < 0) {
            mode = 'field';
            docEl.innerHTML = '';
            pageEl.style.opacity = '0';
            pageEl.style.pointerEvents = 'none';
          }
        }
      }

      if (mode === 'cold') {
        coldP += dt / 1.0;
        if (coldP >= 1) {
          coldP = 1;
          mode = 'field';
          setFieldFocus('naresh');
        }
        camZoom = lerp(0.6, 1.0, ease(coldP));
      } else {
        camZoom = 1;
      }

      if ((mode === 'field' || mode === 'cold') && !userInteracted) {
        curRot += dt * 0.08;
      } else if (mode === 'page') {
        curRot += dt * 0.02;
      }
      curBr = 1 + Math.sin(t * 0.5) * 0.02;

      // Adjust camera horizontal center when gallery panel is active
      const galShown = mode === 'field' && !!galMode && window.innerWidth > 760;
      fieldCXt = galShown ? 0.32 : 0.5;
      fieldCX += (fieldCXt - fieldCX) * 0.08;

      const fieldLike = mode === 'field' || mode === 'cold';
      const eViz = fieldLike ? 0 : ease(P);
      const LITE = theme === 'light';

      // 1. Background fill
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = LITE ? '#EFE7D4' : '#100E1A';
      ctx.fillRect(0, 0, W, H);

      // 2. Stars field
      ctx.globalCompositeOperation = LITE ? 'source-over' : 'lighter';
      const bgA = curRot * 0.0105, cb = Math.cos(bgA), sb = Math.sin(bgA);
      for (const s of stars) {
        const a = (0.16 + s.b * 0.74) * (0.55 + 0.45 * Math.sin(t * 0.6 + s.tw)) * (1 - eViz * 0.4);
        const sz = s.b > 0.55 ? 2.2 : (s.b > 0.25 ? 1.5 : 1);
        const dx = s.x - 0.5, dy = s.y - 0.5;
        const rx = dx * cb - dy * sb + 0.5, ry = dx * sb + dy * cb + 0.5;
        ctx.fillStyle = LITE ? `rgba(58,64,84,${a})` : `rgba(216,224,244,${Math.min(1, a * 1.15)})`;
        ctx.fillRect(rx * W, ry * H, sz, sz);
      }

      // 3. Volumetric Nebula Haze
      if (eViz < 0.98) {
        for (const p of haze) {
          const pr = proj(p.x, p.y, p.z);
          const X = pr[0], Y = pr[1];
          const tw = 0.6 + 0.4 * Math.sin(t * p.sp + p.ph);
          const a = (0.04 + p.b * 0.35) * tw * (1 - eViz);
          if (a <= 0.005) continue;
          ctx.fillStyle = LITE ? `rgba(70,75,95,${a * 0.7})` : `rgba(155,143,255,${a})`;
          ctx.beginPath();
          ctx.arc(X, Y, Math.max(0.5, p.sz * 2.2 * pr[2]), 0, 6.283);
          ctx.fill();
        }
      }

      // 4. Edges & Curved Photons
      ctx.globalCompositeOperation = LITE ? 'source-over' : 'lighter';
      for (const e of E) {
        const a = idIndex[e[0]], b = idIndex[e[1]];
        if (a === undefined || b === undefined) continue;
        const na = N[a] as any, nb = N[b] as any;
        const [x1, y1] = proj(na.x, na.y, na.z || 0);
        const [x2, y2] = proj(nb.x, nb.y, nb.z || 0);

        const isFocus = focusSet.has(a) || focusSet.has(b);
        const alpha = isFocus ? 0.8 : (focusSet.size ? 0.15 : 0.4);
        const col = COLOR[na.region] || '#9B8FFF';

        // Draw curved bezier line with travelling photons
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - Math.hypot(x2 - x1, y2 - y1) * 0.12;
        ctx.strokeStyle = LITE ? `rgba(36,40,54,${alpha * 0.62})` : `rgba(220,228,245,${alpha * 0.45})`;
        ctx.lineWidth = isFocus ? 1.5 : 1;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(mx, my, x2, y2);
        ctx.stroke();

        // Travelling photon dots
        const nd = isFocus ? 3 : 1;
        const A = col.match(/\w\w/g)!.map((h) => parseInt(h, 16));
        for (let i = 0; i < nd; i++) {
          const u = (t * 0.25 + i / nd) % 1;
          const ix = (1 - u) * (1 - u) * x1 + 2 * (1 - u) * u * mx + u * u * x2;
          const iy = (1 - u) * (1 - u) * y1 + 2 * (1 - u) * u * my + u * u * y2;
          ctx.fillStyle = `rgba(${A[0]},${A[1]},${A[2]},${alpha})`;
          ctx.beginPath();
          ctx.arc(ix, iy, 1.8, 0, 6.283);
          ctx.fill();
        }
      }

      // 5. Draw Nodes & Labels
      for (let i = 0; i < N.length; i++) {
        const n = N[i] as any;
        const [sx, sy, persp] = proj(n.x, n.y, n.z);
        const R = n.r * 18 * camZoom * userZoom * persp;
        const col = COLOR[n.region];
        const isHover = hoverId === n.id;
        const isSel = fieldSel === n.id;
        const isFocus = focusSet.has(i);
        const alpha = isFocus || isHover || isSel ? 1.0 : (focusSet.size ? 0.35 : 0.85);

        const A = col.match(/\w\w/g)!.map((h) => parseInt(h, 16));

        // Draw quantum particle cluster around node
        for (const p of n.cl) {
          const rad = p.rr * R;
          const x = sx + Math.cos(p.a) * rad;
          const y = sy + Math.sin(p.a) * rad * 0.92;
          const tw = 0.62 + 0.38 * Math.sin(t * p.sp + p.ph);
          const a = (0.05 + p.b * 0.55) * tw * alpha;
          ctx.fillStyle = `rgba(${A[0]},${A[1]},${A[2]},${a})`;
          ctx.beginPath();
          ctx.arc(x, y, p.sz, 0, 6.283);
          ctx.fill();
        }

        // Draw node center & outer halo ring
        ctx.globalCompositeOperation = 'source-over';
        ctx.beginPath();
        ctx.arc(sx, sy, R, 0, 6.283);
        ctx.fillStyle = LITE ? '#FAF7EE' : '#100E1A';
        ctx.fill();
        ctx.lineWidth = isSel || isHover ? 2.5 : 1.5;
        ctx.strokeStyle = col;
        ctx.stroke();

        // Glowing center dot
        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(3, R * 0.28), 0, 6.283);
        ctx.fillStyle = col;
        ctx.fill();

        // Node Label
        ctx.font = `${isSel ? '700' : '500'} ${Math.max(10, Math.round(11 * LBL))}px "Martian Mono", monospace`;
        ctx.fillStyle = LITE ? '#0A0A0A' : '#FAFAF7';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(n.name, sx + R + 7, sy);
      }

      // 6. Draw Minimap Radar (#mini)
      drawMinimap(t);

      animId = requestAnimationFrame(frame);
    }

    function drawMinimap(t: number) {
      const MW = (mini.width = 204);
      const MH = (mini.height = 138);
      mctx.clearRect(0, 0, MW, MH);

      const cx = MW / 2, cy = MH / 2;
      const scale = Math.min(MW, MH) / (orgR * 2.8);

      // Minimap sweep radar angle
      const radarAng = (t * 1.5) % 6.283;
      mctx.strokeStyle = 'rgba(155,143,255,0.22)';
      mctx.lineWidth = 1;
      mctx.beginPath();
      mctx.moveTo(cx, cy);
      mctx.lineTo(cx + Math.cos(radarAng) * (MW / 2), cy + Math.sin(radarAng) * (MH / 2));
      mctx.stroke();

      // Nodes on minimap
      for (const n of N as any[]) {
        const nx = cx + (n.x - cx0) * scale;
        const ny = cy - (n.y - cy0) * scale;
        mctx.fillStyle = COLOR[n.region];
        mctx.beginPath();
        mctx.arc(nx, ny, n.r * 2.2, 0, 6.283);
        mctx.fill();
      }

      // Camera indicator dot
      mctx.fillStyle = '#CFFF04';
      mctx.beginPath();
      mctx.arc(cx, cy, 3, 0, 6.283);
      mctx.fill();
    }

    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [theme]);

  return (
    <div ref={containerRef} className="nico-universe-wrapper">
      <canvas id="c" />
      <div id="vig" />
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="glassfx" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.011 0.014" numOctaves={2} seed={7} result="n" />
          <feGaussianBlur in="n" stdDeviation="0.6" result="ns" />
          <feDisplacementMap in="SourceGraphic" in2="ns" scale={22} xChannelSelector="R" yChannelSelector="G" result="d" />
          <feGaussianBlur in="d" stdDeviation="2.2" />
        </filter>
      </svg>

      {/* ── Wordmark & Origin Branding ── */}
      <div id="wordmark">NARESH KUMAR</div>

      <div id="origenmark">
        <svg className="nuc" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="12.5" stroke="rgba(255,255,255,.22)" strokeWidth="1" />
          <ellipse cx="20" cy="20" rx="17" ry="6.4" stroke="rgba(207,255,4,.5)" strokeWidth="1">
            <animateTransform attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="7s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="20" cy="20" rx="17" ry="6.4" stroke="rgba(0,176,205,.5)" strokeWidth="1">
            <animateTransform attributeName="transform" type="rotate" from="65 20 20" to="425 20 20" dur="9s" repeatCount="indefinite" />
          </ellipse>
          <circle cx="20" cy="20" r="3.2" fill="#CFFF04" />
        </svg>
        <span className="lbl"><b>THE ORIGIN</b><s>DATA SCIENCE · FAST-NUCES</s></span>
      </div>

      <button id="themebtn" aria-label="Switch between light and dark" onClick={toggleTheme}>
        <span className="ti">{theme === 'light' ? '☾' : '☀'}</span>
        <span className="tl">{theme === 'light' ? 'Dark' : 'Light'}</span>
      </button>

      {/* ── Switch to Editorial List View (Optional fallback) ── */}
      {onSwitchToList && (
        <button
          type="button"
          onClick={onSwitchToList}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 14,
            background: 'rgba(8,10,16,0.65)',
            border: '1px solid rgba(255,255,255,0.22)',
            borderRadius: '999px',
            color: '#FAFAF7',
            padding: '8px 16px',
            fontFamily: 'var(--mono)',
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
          }}
        >
          Editorial View ↓
        </button>
      )}

      {/* ── Category Filter Tabs ── */}
      <div id="tabs" />

      {/* ── Minimap ── */}
      <div id="minilbl">SITE MAP · you are here</div>
      <canvas id="mini" />

      {/* ── Tooltip ── */}
      <div id="tip">
        <div className="nm" />
        <div className="kc" />
        <div className="go" />
      </div>

      {/* ── Side Gallery Drawer (#gallery) ── */}
      <aside id="gallery" />

      {/* ── Full Editorial Case Study Reader (#page / #doc) ── */}
      <div id="pagetop">
        <span className="num" id="chnum" />
        <span className="back" id="back">↖ Back to the map</span>
      </div>

      <div id="page">
        <div className="spacer" id="spacer">
          <span className="ret">↖ click here to return to the map</span>
        </div>
        <div className="doc" id="doc" />
      </div>
    </div>
  );
}
