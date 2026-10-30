/**
 * ============================================================
 * SKILLS CONFIGURATION
 * ============================================================
 * Focused exclusively on:
 * 1. Python with Machine Learning Libraries & Reliability
 * 2. C++ & Systems Programming
 * 3. Web Development & 3D Visual Computing
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
    id: 'python-ml',
    title: 'Python & Machine Learning Libraries',
    icon: '🐍',
    skills: [
      { name: 'Python 3.11+', status: 'learned', description: 'Primary language for machine learning, data processing, and algorithmic pipelines' },
      { name: 'scikit-learn', status: 'learned', description: 'Supervised/unsupervised algorithms, SVM margin optimization, and train-only 5-fold CV' },
      { name: 'pandas', status: 'learned', description: 'Tabular data wrangling, sentinel detection, temporal alignment, and transformation' },
      { name: 'NumPy', status: 'learned', description: 'High-performance vector operations, N-dimensional matrix math, and statistical arrays' },
      { name: 'imbalanced-learn (SMOTE)', status: 'learned', description: 'Train-only synthetic oversampling and class imbalance risk mitigation' },
      { name: 'FastAPI & Uvicorn', status: 'learned', description: 'High-throughput async REST endpoints for model serving and diagnostic APIs' },
      { name: 'Matplotlib & Seaborn', status: 'learned', description: 'Statistical data visualization and scientific distribution plotting' },
    ],
  },
  {
    id: 'cpp-systems',
    title: 'C++ & Systems Programming',
    icon: '⚡',
    skills: [
      { name: 'C++', status: 'learned', description: 'Object-Oriented Programming, memory management, and deterministic performance' },
      { name: 'OOP Architecture', status: 'learned', description: 'Inheritance, polymorphism, encapsulation, and modular class hierarchies' },
      { name: 'Data Structures & Algorithms', status: 'learned', description: 'Efficient algorithmic problem solving, trees, graphs, and memory optimization' },
    ],
  },
  {
    id: 'web-dev',
    title: 'Web Development & 3D Math',
    icon: '🌐',
    skills: [
      { name: 'React 19 & TypeScript', status: 'learned', description: 'Modern typed frontend component architectures and responsive SPAs' },
      { name: 'HTML5 Canvas 2D Engine', status: 'learned', description: 'Custom mathematical 3D perspective projection and 60 FPS animation loops' },
      { name: 'JavaScript (ES6+)', status: 'learned', description: 'Modern asynchronous programming, DOM interactions, and web APIs' },
      { name: 'AWS Amplify Hosting', status: 'learned', description: 'Continuous deployment, Git CI/CD pipelines, and cloud edge delivery' },
    ],
  },
];
