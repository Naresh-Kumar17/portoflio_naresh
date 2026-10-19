/**
 * ============================================================
 * PROJECTS CONFIGURATION
 * ============================================================
 * Categorized into Academic Coursework and Personal Projects.
 * status: 'completed' | 'in-progress' | 'planned'
 * projectType: 'personal' | 'academic'
 * ============================================================
 */

export type ProjectStatus = 'completed' | 'in-progress' | 'planned';
export type ProjectType = 'personal' | 'academic';
export type ProjectCategory =
  | 'data-analysis'
  | 'machine-learning'
  | 'visualization'
  | 'systems'
  | 'gaming'
  | 'other';

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription?: string;
  category: ProjectCategory;
  projectType: ProjectType;
  /** Specific academic course name if applicable */
  course?: string;
  status: ProjectStatus;
  featured: boolean;
  /** Main featured project (only one should be true) */
  mainFeatured?: boolean;
  technologies: string[];
  /** Image path relative to /public */
  image?: string;
  /** GitHub repo URL */
  github?: string;
  /** Live demo URL */
  demo?: string;
  /** Dataset source URL */
  datasetSource?: string;
  /** Dataset description */
  datasetDescription?: string;
  /** Key insights — only for completed projects with verified results */
  insights?: string[];
  /** What you learned */
  learnings?: string[];
  /** Limitations and potential improvements */
  limitations?: string[];
  /** Case study sections (for detailed project pages) */
  caseStudy?: {
    problemStatement?: string;
    goals?: string[];
    methodology?: string;
    exploration?: string;
    dataQuality?: string;
    results?: string;
    codeSnippets?: { title: string; code: string; language: string; explanation: string }[];
  };
  /** Date string for display */
  date?: string;
}

export const projects: Project[] = [
  /* ────────────────────────────────────────────────────────────
   * 1. PERSONAL PROJECTS
   * ──────────────────────────────────────────────────────────── */
  {
    id: 'svm-handwritten-digits',
    title: 'SVM Handwritten Digits Recognition',
    shortDescription:
      'Support Vector Machine classifier for handwritten digit recognition with kernel optimization, hyperparameter tuning, and multiclass decision boundary analysis.',
    longDescription:
      'Trained and evaluated Support Vector Machine (SVM) models on standard handwritten digit datasets. Explored linear, polynomial, and RBF kernels, optimizing regularization parameter C and kernel coefficient gamma. Implemented confusion matrix diagnostics, ROC curves, and cross-validation pipelines.',
    category: 'machine-learning',
    projectType: 'personal',
    status: 'completed',
    featured: true,
    mainFeatured: true,
    technologies: ['Python', 'scikit-learn', 'SVM', 'NumPy', 'Matplotlib'],
    github: 'https://github.com/Naresh-Kumar17/svm-handwritten-digits',
    insights: [
      'RBF kernel outperformed linear kernels on non-linear pixel boundary separations',
      'Systematic grid search over C and gamma yielded superior generalizability on unseen test sets',
    ],
    learnings: [
      'Deep understanding of support vectors, margins, and kernel tricks',
      'Multiclass strategies: One-vs-Rest (OvR) vs One-vs-One (OvO)',
      'Pixel normalization and feature scaling impact on SVM convergence',
    ],
    date: '2025',
  },
  {
    id: 'air-quality-forecasting',
    title: 'Air Quality Forecasting',
    shortDescription:
      'Time-series forecasting model analyzing particulate matter and meteorological trends to predict air quality indices with trend decomposition.',
    longDescription:
      'Developed an end-to-end time-series analysis framework predicting air quality and pollutant concentrations. Handled time-series interpolation, seasonal decomposition (STL), stationarity checks (ADF tests), and predictive regression modeling to forecast hazardous AQI episodes.',
    category: 'data-analysis',
    projectType: 'personal',
    status: 'completed',
    featured: true,
    technologies: ['Python', 'pandas', 'Time-Series', 'Matplotlib', 'Predictive Modeling'],
    github: 'https://github.com/Naresh-Kumar17/Air_Quality_Forcasating-',
    insights: [
      'Identified strong diurnal and seasonal cycles strongly correlated with temperature inversions',
      'Lagged rolling window features significantly improved short-term particulate matter predictions',
    ],
    learnings: [
      'Handling temporal data gaps, resampling frequencies, and rolling statistics',
      'Time-series cross-validation without temporal data leakage',
    ],
    date: '2025',
  },
  {
    id: 'road-accident-severity',
    title: 'Road Accident Severity Prediction',
    shortDescription:
      'Machine learning framework predicting traffic collision severity based on environmental conditions, road geometry, and temporal factors.',
    longDescription:
      'Built a risk prediction pipeline analyzing road accident records. Tackled severe class imbalance using SMOTE and class-weighting, engineered spatial/temporal interaction terms, and trained gradient boosted decision trees and ensemble classifiers to predict injury severity levels.',
    category: 'machine-learning',
    projectType: 'personal',
    status: 'completed',
    featured: true,
    technologies: ['Python', 'pandas', 'scikit-learn', 'Feature Engineering', 'Classification'],
    github: 'https://github.com/Naresh-Kumar17/Road-Accident-Severity',
    insights: [
      'Lighting conditions, weather severity, and junction geometry emerged as primary predictors of severe injury',
      'Threshold tuning on class probabilities achieved significantly higher recall on critical severity incidents',
    ],
    learnings: [
      'Techniques for high-dimensional categorical encoding and target encoding',
      'Balancing precision and recall trade-offs for high-consequence safety predictions',
    ],
    date: '2025',
  },
  {
    id: 'cosmos-portfolio',
    title: 'Interactive 3D Cosmos Portfolio',
    shortDescription:
      'Custom mathematical 3D constellation cosmos engine built with React 19, TypeScript, and HTML5 Canvas with zero heavy engine overhead.',
    longDescription:
      'Designed and developed this portfolio to showcase data science research and software projects. Implemented a custom 3D perspective projection engine on HTML5 Canvas, Box-Muller Gaussian volumetric nebula haze, travelling photon bezier curves, and smooth camera physics.',
    category: 'visualization',
    projectType: 'personal',
    status: 'completed',
    featured: true,
    technologies: ['React 19', 'TypeScript', 'HTML5 Canvas', '3D Geometry', 'Vite'],
    github: 'https://github.com/Naresh-Kumar17/portoflio_naresh',
    insights: [
      'Vanilla Canvas 2D engine with hardware-accelerated CSS glassmorphism offers superior framerates and memory efficiency over heavy WebGL frameworks',
      'Selective progressive disclosure of labels creates a clean astronomical aesthetic without cognitive visual clutter',
    ],
    learnings: [
      '3D camera projection mathematics: yaw, pitch, perspective divide, and coordinate transformations',
      'Optimizing canvas draw loops and avoiding garbage collection overhead during 60 FPS animation',
    ],
    date: '2026',
  },
  {
    id: 'exploratory-data-analysis',
    title: 'Exploratory Data Analysis Pipeline',
    shortDescription:
      'A comprehensive EDA workflow analyzing real-world datasets to uncover patterns, distributions, and relationships between variables.',
    longDescription:
      'Built a structured exploratory data analysis pipeline using Python, pandas, and visualization libraries. The project walks through data loading, cleaning, statistical summaries, distribution analysis, correlation exploration, and visual storytelling.',
    category: 'data-analysis',
    projectType: 'personal',
    status: 'completed',
    featured: false,
    technologies: ['Python', 'pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
    date: '2024',
  },

  /* ────────────────────────────────────────────────────────────
   * 2. ACADEMIC PROJECTS (FAST-NUCES Coursework)
   * ──────────────────────────────────────────────────────────── */
  {
    id: 'bank-management-system',
    title: 'Bank Management System (C & Raylib)',
    shortDescription:
      'Interactive graphical Bank Management System developed in C utilizing Raylib for UI rendering, account records management, transaction processing, and file persistence.',
    longDescription:
      'Developed for the Programming Fundamentals course at FAST-NUCES Karachi. Designed with modular procedural C architecture, implementing account creation, deposit/withdrawal validation, PIN security, transaction ledger logging, and dynamic 2D GUI elements rendered in Raylib.',
    category: 'systems',
    projectType: 'academic',
    course: 'Programming Fundamentals',
    status: 'completed',
    featured: true,
    technologies: ['C', 'Raylib', 'File Handling', 'Data Structures', 'Procedural C'],
    github: 'https://github.com/Naresh-Kumar17/Bank-Management-System-C-Raylib',
    insights: [
      'Engineered binary file handling mechanisms to persist user accounts and balance state across application restarts',
      'Custom Raylib event loop decoupled state updates from 60 FPS graphics rendering',
    ],
    learnings: [
      'Low-level memory management and pointer arithmetic in C',
      'File streams, buffer allocation, and atomic write operations for financial records',
      'Implementing event-driven GUI buttons and input fields without high-level frameworks',
    ],
    date: '2024',
  },
  {
    id: 'cricket-match-management-system',
    title: 'Cricket Match Management System',
    shortDescription:
      'Comprehensive cricket scoring and tournament simulation platform architected with strict Object-Oriented Programming principles in C++.',
    longDescription:
      'Coursework project for Object-Oriented Programming (OOP) at FAST-NUCES Karachi. Built using advanced C++ object hierarchies: abstract base classes, operator overloading, run-time polymorphism for innings calculations, bowler spell tracking, and real-time commentary logs.',
    category: 'systems',
    projectType: 'academic',
    course: 'Object-Oriented Programming (OOP)',
    status: 'completed',
    featured: true,
    technologies: ['C++', 'OOP', 'Inheritance', 'Polymorphism', 'File I/O'],
    github: 'https://github.com/Naresh-Kumar17/Cricket-Match-Management-System',
    insights: [
      'Hierarchical class structure separating Player, Batsman, Bowler, Team, and Match models ensures high cohesion and loose coupling',
      'Automated run-rate, extras, and strike-rate calculations updated dynamically ball-by-ball',
    ],
    learnings: [
      'Mastery of OOP tenets: Encapsulation, Abstraction, Inheritance, and Polymorphism in C++',
      'Destructors and dynamic memory allocation to prevent memory leaks during extended match tournaments',
      'Operator overloading for intuitive score and team comparisons',
    ],
    date: '2025',
  },
  {
    id: '2048-assembly-game',
    title: '2048 Game (x86 Assembly)',
    shortDescription:
      'Hardware-level implementation of the classic 2048 tile-sliding game written in x86 Assembly utilizing BIOS/DOS interrupts and direct register manipulation.',
    longDescription:
      'Developed for the Computer Organization & Assembly Language (COAL) course at FAST-NUCES Karachi. Features direct CPU register memory operations (AX, BX, CX, DX, SI, DI), 4x4 matrix shift-and-merge algorithms, keyboard scan-code polling via INT 16h, color video buffer manipulation via INT 10h, and high-score tracking.',
    category: 'gaming',
    projectType: 'academic',
    course: 'Computer Organization & Assembly Language (COAL)',
    status: 'completed',
    featured: true,
    technologies: ['x86 Assembly', 'COAL', 'BIOS Interrupts', 'Hardware Registers', 'Low-Level Graphics'],
    github: 'https://github.com/Naresh-Kumar17/2048-Game',
    insights: [
      'Shift and merge matrix traversal written purely in x86 instructions with zero high-level language abstractions',
      'Optimized register usage minimizing memory bus read/write cycles',
    ],
    learnings: [
      'Low-level x86 instruction set architecture, addressing modes, and flag registers',
      'Hardware interrupts for real-time keyboard input polling and video display modes',
      'Debugging assembly memory offsets, stack frames, and segment registers',
    ],
    date: '2025',
  },
];

/**
 * Get related projects based on shared technologies and categories.
 */
export function getRelatedProjects(
  projectId: string,
  maxResults: number = 3,
): Project[] {
  const current = projects.find((p) => p.id === projectId);
  if (!current) return [];

  const others = projects.filter((p) => p.id !== projectId);

  const scored = others.map((p) => {
    let score = 0;
    // Same project type (academic vs personal)
    if (p.projectType === current.projectType) score += 2;
    // Same category
    if (p.category === current.category) score += 3;
    // Shared technologies
    const shared = p.technologies.filter((t) =>
      current.technologies.includes(t),
    );
    score += shared.length;
    return { project: p, score };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored
    .filter((s) => s.score > 0)
    .slice(0, maxResults)
    .map((s) => s.project);
}

export function getProjectsByCategory(category?: ProjectCategory): Project[] {
  if (!category) return projects;
  return projects.filter((p) => p.category === category);
}

export function getProjectsByType(type: ProjectType): Project[] {
  return projects.filter((p) => p.projectType === type);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getMainFeaturedProject(): Project | undefined {
  return projects.find((p) => p.mainFeatured);
}
