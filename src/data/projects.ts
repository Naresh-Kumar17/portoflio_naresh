/**
 * ============================================================
 * PROJECTS CONFIGURATION
 * ============================================================
 * Add your projects here. Each project has metadata for
 * filtering, recommendations, and case study generation.
 *
 * status: 'completed' | 'in-progress' | 'planned'
 * featured: true for homepage showcase
 * ============================================================
 */

export type ProjectStatus = 'completed' | 'in-progress' | 'planned';
export type ProjectCategory = 'data-analysis' | 'machine-learning' | 'visualization' | 'other';

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription?: string;
  category: ProjectCategory;
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
  {
    id: 'svm-handwritten-digits',
    title: 'SVM Handwritten Digits Recognition',
    shortDescription:
      'Support Vector Machine classifier for handwritten digit recognition with kernel optimization, hyperparameter tuning, and multiclass decision boundary analysis.',
    longDescription:
      'Trained and evaluated Support Vector Machine (SVM) models on standard handwritten digit datasets. Explored linear, polynomial, and RBF kernels, optimizing regularization parameter C and kernel coefficient gamma. Implemented confusion matrix diagnostics, ROC curves, and cross-validation pipelines.',
    category: 'machine-learning',
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
      'Nico Borja-inspired 3D constellation universe built from scratch with pure mathematical perspective projection, particle nebula clouds, and responsive editorial drawer.',
    longDescription:
      'Designed and developed this portfolio to showcase data science research and software projects. Implemented a custom 3D perspective projection engine on HTML5 Canvas, Box-Muller Gaussian volumetric nebula haze, travelling photon bezier curves, and smooth camera physics.',
    category: 'visualization',
    status: 'completed',
    featured: true,
    technologies: ['React 19', 'TypeScript', 'HTML5 Canvas', '3D Geometry', 'Vite'],
    github: 'https://github.com/Naresh-Kumar17/protoflio_naresh',
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
    status: 'in-progress',
    featured: false,
    technologies: ['Python', 'pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
    date: '2024',
  },
];

/**
 * Get related projects based on shared technologies and categories.
 * Returns genuinely related projects, not artificial recommendations.
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

  // Only return projects with meaningful connection (score > 0)
  return scored
    .filter((s) => s.score > 0)
    .slice(0, maxResults)
    .map((s) => s.project);
}

export function getProjectsByCategory(category?: ProjectCategory): Project[] {
  if (!category) return projects;
  return projects.filter((p) => p.category === category);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getMainFeaturedProject(): Project | undefined {
  return projects.find((p) => p.mainFeatured);
}
