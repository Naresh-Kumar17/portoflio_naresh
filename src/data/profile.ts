/**
 * ============================================================
 * PROFILE CONFIGURATION
 * ============================================================
 * This is the single source of truth for all personal
 * information displayed on the portfolio. Edit the values
 * below to personalize your site.
 * ============================================================
 */

export const profile = {
  /** Your public display name (used in hero, navbar, footer, SEO) */
  name: 'Naresh Kumar',

  /** Initials for the monogram (2 characters recommended) */
  initials: 'NK',

  /** Your subtitle / tagline */
  subtitle: 'Data Science Student at FAST-NUCES Karachi',

  /** Hero headline */
  headline: 'Turning data into decisions.',

  /**
   * Short bio for the About section.
   * Write in first person. Keep it authentic.
   */
  bio: [
    "I'm a Data Science student at FAST-NUCES Karachi with a deep passion for turning statistical pipelines and machine learning algorithms into empirical decisions.",
    "My focus spans applied machine learning, leak-free data remediation, environmental time-series forecasting, and interactive 3D visual computing.",
    "I engineer reproducible computational systems, from building diagnostic platforms like Dataset Doctor to optimizing margin classifiers with Support Vector Machines.",
    "When I'm not developing computational models, I study algorithmic complexity in C++, explore modern web engines, and contribute to open-source software.",
  ],

  /** Profile photo path (relative to /public) */
  photo: '/profile.png' as string | null,

  /** Contact information */
  contact: {
    email: 'wdnaresh@gmail.com',
    github: 'https://github.com/Naresh-Kumar17',
    linkedin: 'https://www.linkedin.com/in/naresh-kumar-ds',
  },

  /** Resume file path (relative to /public) — set to null until provided */
  resumePath: null as string | null,

  /** University / Education */
  university: {
    name: 'FAST-NUCES',
    fullName: 'National University of Computer and Emerging Sciences',
    campus: 'Karachi',
    degree: 'Bachelor of Science in Data Science',
    /** Set your actual start/end years */
    startYear: 2025,
    endYear: 2029,
    /** Set to true only when you have actually graduated */
    graduated: false,
  },

  /** Site-level SEO & deployment config */
  site: {
    /** Your deployed URL (update before deployment) */
    url: 'https://nareshkumar17.netlify.app',
    title: 'Naresh Kumar · Data Science & ML Portfolio',
    description:
      'Personal portfolio of Naresh Kumar, Data Science student at FAST-NUCES Karachi — turning data into decisions through machine learning, reliable remediation, and interactive computing.',
    /** Open Graph image path (relative to /public) */
    ogImage: '/og-image.png',
    /** Language */
    lang: 'en',
  },
} as const;

export type Profile = typeof profile;
