/**
 * ============================================================
 * SKILLS CONFIGURATION
 * ============================================================
 * Categorized skills with honest status labels.
 * status: 'learned' | 'learning' | 'planned'
 * ============================================================
 */

export type SkillStatus = 'learned' | 'learning' | 'planned';

export interface Skill {
  name: string;
  icon?: string;
  status: SkillStatus;
  description?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    icon: '⟨/⟩',
    skills: [
      { name: 'Python', status: 'learned', description: 'Primary language for data analysis and scripting' },
      { name: 'SQL', status: 'learning', description: 'Database queries and data manipulation' },
      { name: 'JavaScript', status: 'learning', description: 'Web development and visualization' },
      { name: 'R', status: 'planned', description: 'Statistical computing and graphics' },
    ],
  },
  {
    id: 'data-analysis',
    title: 'Data Analysis & Visualization',
    icon: '📊',
    skills: [
      { name: 'pandas', status: 'learned', description: 'Data manipulation and analysis' },
      { name: 'NumPy', status: 'learned', description: 'Numerical computing and array operations' },
      { name: 'Matplotlib', status: 'learned', description: 'Static visualizations and plots' },
      { name: 'Seaborn', status: 'learned', description: 'Statistical data visualization' },
      { name: 'Plotly', status: 'planned', description: 'Interactive web-based visualizations' },
    ],
  },
  {
    id: 'ml-ai',
    title: 'Machine Learning & AI',
    icon: '🤖',
    skills: [
      { name: 'scikit-learn', status: 'learning', description: 'Machine learning algorithms and tools' },
      { name: 'TensorFlow', status: 'planned', description: 'Deep learning framework' },
      { name: 'Statistics', status: 'learning', description: 'Statistical methods and hypothesis testing' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    icon: '🛠️',
    skills: [
      { name: 'Git & GitHub', status: 'learned', description: 'Version control and collaboration' },
      { name: 'Jupyter Notebooks', status: 'learned', description: 'Interactive computing and analysis' },
      { name: 'VS Code', status: 'learned', description: 'Code editor and development environment' },
      { name: 'Data Cleaning', status: 'learned', description: 'Handling missing values, outliers, and inconsistencies' },
    ],
  },
  {
    id: 'fundamentals',
    title: 'Core Fundamentals',
    icon: '📐',
    skills: [
      { name: 'Linear Algebra', status: 'learning', description: 'Mathematical foundation for ML' },
      { name: 'Probability', status: 'learning', description: 'Probabilistic reasoning and distributions' },
      { name: 'Data Structures', status: 'learned', description: 'Efficient data organization and access' },
      { name: 'Algorithms', status: 'learning', description: 'Problem-solving techniques and optimization' },
    ],
  },
];
