/**
 * ============================================================
 * EDUCATION TIMELINE
 * ============================================================
 */

export interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  subtitle?: string;
  description: string;
  type: 'milestone' | 'semester' | 'achievement' | 'goal';
  /** Relevant coursework or topics */
  coursework?: string[];
  /** Is this a current / active entry? */
  current?: boolean;
}

export const educationTimeline: TimelineEntry[] = [
  {
    id: 'admission',
    year: '2025',
    title: 'Started at FAST-NUCES Karachi',
    subtitle: 'BS Data Science',
    description:
      'Began my journey in Data Science, building a strong foundation in programming, mathematics, and computational thinking.',
    type: 'milestone',
    coursework: [
      'Introduction to Computing',
      'Calculus',
      'Applied Physics',
    ],
  },
  {
    id: 'semester-3',
    year: '2026',
    title: 'Deepening Technical Skills',
    subtitle: 'Core coursework in data and algorithms',
    description:
      'Focused on data structures, object-oriented programming, and probability & statistics — the building blocks for data science work.',
    type: 'semester',
    current: true,
    coursework: [
      'Data Structures',
      'Object-Oriented Programming',
      'Probability & Statistics',
      'Linear Algebra',
      'Discrete Mathematics',
    ],
  },
  {
    id: 'future-ml',
    year: '2027',
    title: 'Machine Learning & Advanced Topics',
    subtitle: 'Planned coursework',
    description:
      'Looking forward to courses in machine learning, database systems, and data mining that will build on my current foundations.',
    type: 'goal',
    coursework: [
      'Machine Learning',
      'Database Systems',
      'Data Mining',
    ],
  },
  {
    id: 'graduation',
    year: '2029',
    title: 'Expected Graduation',
    subtitle: 'BS Data Science — FAST-NUCES Karachi',
    description:
      'Working toward completing my degree with strong technical skills and a portfolio of meaningful projects.',
    type: 'goal',
  },
];
