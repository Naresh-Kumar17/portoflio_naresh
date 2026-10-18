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
    "I'm a Data Science student at FAST-NUCES Karachi with a deep curiosity for how data can reveal patterns, tell stories, and drive better decisions.",
    "My journey started with an interest in programming and problem-solving. Over time, I discovered that the intersection of code, statistics, and domain knowledge is where the most impactful work happens.",
    "I enjoy the entire data pipeline — from cleaning messy datasets to building visualizations that make complex information accessible. I'm currently deepening my skills in machine learning and statistical modeling.",
    "When I'm not coding, I'm exploring new datasets, reading about emerging AI research, or working on side projects that challenge me to learn something new.",
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
    url: 'https://your-portfolio.netlify.app',
    title: 'Data Science Portfolio',
    description:
      'Personal portfolio of a Data Science student at FAST-NUCES Karachi — turning data into decisions through analysis, visualization, and machine learning.',
    /** Open Graph image path (relative to /public) */
    ogImage: '/og-image.png',
    /** Language */
    lang: 'en',
  },
} as const;

export type Profile = typeof profile;
