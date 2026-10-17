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
    id: 'exploratory-data-analysis',
    title: 'Exploratory Data Analysis Pipeline',
    shortDescription:
      'A comprehensive EDA workflow analyzing real-world datasets to uncover patterns, distributions, and relationships between variables.',
    longDescription:
      'Built a structured exploratory data analysis pipeline using Python, pandas, and visualization libraries. The project walks through data loading, cleaning, statistical summaries, distribution analysis, correlation exploration, and visual storytelling.',
    category: 'data-analysis',
    status: 'in-progress',
    featured: true,
    mainFeatured: true,
    technologies: ['Python', 'pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
    insights: [
      'Identified key correlations between features through systematic analysis',
      'Developed reusable functions for common data quality checks',
    ],
    learnings: [
      'The importance of understanding data distributions before modeling',
      'How to handle missing values with context-appropriate strategies',
      'Creating clear, informative visualizations for different audiences',
    ],
    limitations: [
      'Limited to single-dataset analysis — could be extended to comparative studies',
      'Visualization choices could be expanded with interactive libraries',
    ],
    caseStudy: {
      problemStatement:
        'Understanding raw data is the critical first step in any data science project. This project builds a systematic approach to exploring, cleaning, and visualizing datasets.',
      goals: [
        'Create a reusable EDA workflow',
        'Practice data cleaning techniques',
        'Build clear, informative visualizations',
        'Document findings and methodology',
      ],
      methodology:
        'Followed a structured approach: data loading → initial inspection → cleaning → univariate analysis → bivariate analysis → correlation analysis → summary of findings.',
      dataQuality:
        'Addressed missing values, duplicates, and inconsistent data types. Documented each cleaning decision and its rationale.',
      codeSnippets: [
        {
          title: 'Data Quality Assessment',
          language: 'python',
          code: `import pandas as pd
import numpy as np

def assess_data_quality(df: pd.DataFrame) -> dict:
    """Assess data quality metrics for a DataFrame."""
    return {
        'total_rows': len(df),
        'total_columns': len(df.columns),
        'missing_values': df.isnull().sum().to_dict(),
        'missing_pct': (df.isnull().sum() / len(df) * 100).round(2).to_dict(),
        'duplicates': df.duplicated().sum(),
        'dtypes': df.dtypes.value_counts().to_dict(),
    }`,
          explanation:
            'A reusable function that provides a quick overview of data quality issues, helping prioritize cleaning efforts.',
        },
      ],
    },
    date: '2024',
  },
  {
    id: 'data-visualization-gallery',
    title: 'Data Visualization Gallery',
    shortDescription:
      'A collection of publication-quality visualizations exploring different chart types, color palettes, and storytelling techniques.',
    category: 'visualization',
    status: 'in-progress',
    featured: true,
    technologies: ['Python', 'Matplotlib', 'Seaborn'],
    learnings: [
      'How chart type choice affects data interpretation',
      'The role of color in accessible data communication',
    ],
    date: '2024',
  },
  {
    id: 'ml-classification-intro',
    title: 'Introduction to Classification',
    shortDescription:
      'Learning the fundamentals of classification algorithms by implementing and comparing models on structured datasets.',
    category: 'machine-learning',
    status: 'planned',
    featured: true,
    technologies: ['Python', 'scikit-learn', 'pandas', 'NumPy'],
    date: '2025',
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
