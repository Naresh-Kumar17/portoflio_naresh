/**
 * ============================================================
 * SKILLS CONFIGURATION
 * ============================================================
 * Focused exclusively on:
 * 1. Python with Machine Learning Libraries
 * 2. C++ & Systems Programming
 * 3. Web Development
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
      { name: 'Python', status: 'learned', description: 'Primary language for machine learning, data processing, and scripting' },
      { name: 'scikit-learn', status: 'learned', description: 'Supervised/unsupervised algorithms, SVMs, hyperparameter tuning' },
      { name: 'pandas', status: 'learned', description: 'Data wrangling, cleaning, transformation, and series analysis' },
      { name: 'NumPy', status: 'learned', description: 'High-performance vector operations, matrix math, and arrays' },
      { name: 'Matplotlib & Seaborn', status: 'learned', description: 'Statistical data visualization and scientific distribution plotting' },
    ],
  },
  {
    id: 'cpp-systems',
    title: 'C++ & Systems Programming',
    icon: '⚡',
    skills: [
      { name: 'C++', status: 'learned', description: 'Object-Oriented Programming, memory management, and low-level performance' },
      { name: 'OOP Architecture', status: 'learned', description: 'Inheritance, polymorphism, encapsulation, and modular class design' },
      { name: 'Data Structures & Algorithms', status: 'learned', description: 'Efficient algorithmic problem solving, trees, graphs, and memory optimization' },
    ],
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    icon: '🌐',
    skills: [
      { name: 'React 19 & TypeScript', status: 'learned', description: 'Modern typed frontend component architectures and responsive SPAs' },
      { name: 'JavaScript (ES6+)', status: 'learned', description: 'Modern asynchronous programming, DOM interactions, and web APIs' },
      { name: 'HTML5 Canvas & 3D Math', status: 'learned', description: 'Custom mathematical projection rendering, 60 FPS animation loops' },
      { name: 'AWS Amplify Hosting', status: 'learned', description: 'Continuous deployment, Git CI/CD pipelines, and cloud edge delivery' },
    ],
  },
];
