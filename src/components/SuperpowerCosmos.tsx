import { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './SuperpowerCosmos.css';

interface DrawnLabelBox {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/* ── Naresh Kumar Data Science Constellation Dataset ── */
const NARESH_DB = {
  N: [
    /* ── UPPER-LEFT ANCHOR: NARESH ── */
    {
      id: "naresh",
      name: "Naresh",
      region: "entry",
      x: -16.0,
      y: 10.0,
      r: 1.85,
      z: 0,
      labelPos: "top",
      kicker: "Data Science Student & ML Practitioner",
      links: [
        ["Featured Projects", "/projects"],
        ["GitHub · Naresh-Kumar17", "https://github.com/Naresh-Kumar17"],
        ["Portfolio Repository", "https://github.com/Naresh-Kumar17/portoflio_naresh"]
      ],
      sum: "Data Science undergraduate at FAST-NUCES Karachi turning statistical pipelines and machine learning algorithms into empirical decisions.",
      body: "Pursuing BS Data Science at National University of Computer and Emerging Sciences (FAST-NUCES) Karachi. Passionate about machine learning pipelines, time-series forecasting, statistical modeling, and interactive visual computing. Focused on mastering foundational theory first, then engineering reproducible computational systems that solve real-world problems.",
      cap: "Naresh Kumar · FAST-NUCES Karachi",
      photo: "/profile.png",
      role: "Student, Data Scientist & ML Practitioner",
      duration: "FAST-NUCES Karachi · 2025 → 2029",
      impact: "Designing robust machine learning classifiers, time-series forecasting models, and reproducible data pipelines.",
      scope: "Core focus on Machine Learning, Statistical Inference, Data Structures & Algorithms, with practical implementations in Python, C++, and Web technologies.",
      skills: [
        ["Python & ML Libraries", "core"],
        ["Support Vector Machines (SVM)", "core"],
        ["Time-Series Forecasting", "core"],
        ["C++ & Systems", "core"],
        ["AWS Amplify & Web Dev", "core"]
      ],
      story: "My journey started with a fascination for patterns in data and algorithmic logic. Studying Data Science at FAST-NUCES provides the rigorous mathematical backing, empirical experimentation, and software design skills needed to build production-grade intelligent systems."
    },

    /* ── SPOKE 1: UP-LEFT → SKILLS (IN-PAGE CASE STUDY) ── */
    {
      id: "skills_hub",
      name: "Skills",
      region: "skills",
      x: -42.0,
      y: 28.0,
      r: 1.5,
      z: 0.15,
      labelPos: "left",
      kicker: "Core Competencies & Case Studies",
      links: [],
      sum: "In-page technical case study covering Python ML, C++ systems, and modern Web engineering.",
      body: "In-depth case study of computational capabilities: 1. Python with Machine Learning Libraries (scikit-learn, pandas, NumPy, Matplotlib, Seaborn, SMOTE, FastAPI). 2. C++ & Systems Programming (OOP Architecture, Data Structures & Algorithms, Memory Efficiency). 3. Web Development & Cloud Deployment (React 19, TypeScript, HTML5 Canvas 2D perspective engine, AWS Amplify Hosting). 4. Environmental Time-Series Forecasting (Air Quality, STL decomposition).",
      cap: "Technical Superpowers",
      role: "Core Capabilities",
      duration: "Continual Mastery",
      skills: [
        ["Python & ML Ecosystem", "core"],
        ["C++ & OOP Architecture", "core"],
        ["React 19 & TypeScript", "core"],
        ["AWS Amplify Hosting", "core"]
      ]
    },

    /* ── SPOKE 2: STRAIGHT LEFT → ABOUT ── */
    {
      id: "about_me",
      name: "About Naresh",
      region: "entry",
      x: -42.0,
      y: 10.0,
      r: 1.05,
      z: 0.1,
      labelPos: "left",
      kicker: "Background & Aspirations",
      sum: "Data Science undergraduate, machine learning developer, and computational thinker.",
      body: "I am an undergraduate student in Data Science at FAST-NUCES Karachi. My focus spans applied machine learning, time-series environmental forecasting, road safety risk prediction, and fullstack interactive data applications.",
      cap: "Naresh Kumar · Biography",
      photo: "/profile.png",
      role: "Undergraduate Researcher",
      duration: "2025 → Present",
      impact: "Developed open-source projects across handwritten digit recognition, environmental forecasting, and road safety risk prediction.",
      skills: [
        ["Machine Learning Architecture", "core"],
        ["Empirical Research", "core"],
        ["Data Storytelling", "core"],
        ["FAST-NUCES Karachi", "core"]
      ]
    },

    /* ── SPOKE 3: DOWN-LEFT → LET'S CONNECT ── */
    {
      id: "contacto",
      name: "Let's Connect",
      region: "entry",
      x: -40.0,
      y: -6.0,
      r: 1.0,
      z: -0.1,
      labelPos: "left",
      kicker: "Open for Opportunities",
      sum: "Get in touch for internships, data science research, and software collaborations.",
      links: [
        ["Send an Email", "mailto:wdnaresh@gmail.com"],
        ["LinkedIn Profile", "https://www.linkedin.com/in/naresh-kumar-ds"],
        ["GitHub Profile", "https://github.com/Naresh-Kumar17"]
      ],
      cap: "Contact & Collaboration",
      role: "Open for Work",
      duration: "Immediate Availability",
      skills: [["Collaborative Research", "core"], ["Open Source", "core"]]
    },

    /* ── SPOKE 4: UP-RIGHT → RESUME ── */
    {
      id: "resume_hub",
      name: "Resume",
      region: "entry",
      x: 6.0,
      y: 28.0,
      r: 1.45,
      z: 0.15,
      labelPos: "top",
      kicker: "Curriculum Vitae",
      links: [
        ["View Full CV Page", "/resume"]
      ],
      sum: "Data Science student at FAST-NUCES Karachi specializing in machine learning pipelines, time-series forecasting, and cloud-hosted web apps.",
      body: "Curriculum Vitae overview covering academic degree at FAST-NUCES Karachi (BS Data Science 2025–2029), technical competencies (Python ML, C++, Web Dev, AWS Amplify), and key projects with quantitative validation.",
      cap: "Curriculum Vitae & Qualifications",
      role: "Data Scientist & ML Practitioner",
      duration: "2025 → 2029",
      impact: "Developed predictive classifiers, time-series forecasting models, and 60 FPS interactive visual engines.",
      skills: [
        ["Machine Learning Models", "core"],
        ["Data Science Pipelines", "core"],
        ["C++ & Systems", "core"],
        ["AWS Amplify Hosting", "core"]
      ]
    },

    /* ── SPOKE 5: DOWN-RIGHT → PROJECTS (MAIN PROJECT HUB) ── */
    {
      id: "growth",
      name: "Projects",
      region: "growth",
      x: 14.0,
      y: -10.0,
      r: 1.75,
      z: 0.1,
      labelPos: "bottom",
      kicker: "Portfolio Showcase",
      links: [
        ["GitHub Repositories", "https://github.com/Naresh-Kumar17"]
      ],
      sum: "Engineered projects categorized into Web Development, Machine Learning, and Data Science.",
      body: "Unified showcase of projects spanning applied machine learning classifiers, environmental time-series forecasting, automated data quality platforms, and high-performance interactive 3D web applications.",
      role: "Data Scientist & Software Developer",
      duration: "2024 → ongoing",
      impact: "Delivering end-to-end data systems and interactive 3D computing interfaces.",
      skills: [
        ["Machine Learning Models", "core"],
        ["Data Science & Forecasting", "core"],
        ["Interactive Web Applications", "core"]
      ]
    },

    /* ── PROJECT SPOKE 1: STRAIGHT RIGHT → WEB DEVELOPMENT ── */
    {
      id: "web_category",
      name: "Web Development",
      region: "web",
      x: 38.0,
      y: -4.0,
      r: 1.35,
      z: 0.15,
      labelPos: "top",
      kicker: "Project Category 01",
      links: [
        ["Interactive 3D Cosmos", "https://github.com/Naresh-Kumar17/portoflio_naresh"]
      ],
      sum: "High-performance interactive web computing, 3D math projection engines, and cloud hosting.",
      body: "Modern web applications architected with React 19, TypeScript, HTML5 Canvas 2D math engines, and AWS Amplify CI/CD hosting.",
      cap: "Web Development Projects",
      role: "Web & Frontend Architect",
      duration: "2026 · Active",
      skills: [["React 19", "core"], ["TypeScript", "core"], ["HTML5 Canvas", "core"], ["AWS Amplify", "core"]]
    },
    {
      id: "cosmos_portfolio",
      name: "3D Cosmos Portfolio",
      region: "web",
      x: 56.0,
      y: -4.0,
      r: 1.05,
      z: 0.2,
      labelPos: "right",
      kicker: "Featured Project · Web Development",
      sum: "Custom mathematical 3D constellation cosmos engine built with React 19, TypeScript, and HTML5 Canvas.",
      body: "Designed and developed this portfolio to showcase machine learning research, data science pipelines, and software projects. Implemented a custom 3D perspective projection engine on HTML5 Canvas, Box-Muller Gaussian volumetric nebula haze, travelling photon bezier curves, and smooth camera physics.",
      cap: "Interactive 3D Cosmos Portfolio",
      url: "https://github.com/Naresh-Kumar17/portoflio_naresh",
      urlLabel: "View GitHub Repository ↗",
      role: "Frontend & Canvas Architect",
      duration: "2026 · Active",
      skills: [
        ["React 19 & TypeScript", "core"],
        ["HTML5 Canvas 2D Engine", "core"],
        ["3D Perspective Geometry", "core"],
        ["AWS Amplify Hosting", "core"]
      ]
    },

    /* ── PROJECT SPOKE 2: DOWN-RIGHT → MACHINE LEARNING ── */
    {
      id: "ml_category",
      name: "Machine Learning",
      region: "ai",
      x: 32.0,
      y: -24.0,
      r: 1.35,
      z: 0.15,
      labelPos: "right",
      kicker: "Project Category 02",
      links: [
        ["SVM Handwritten Digits", "https://github.com/Naresh-Kumar17/svm-handwritten-digits"],
        ["Road Accident Severity", "https://github.com/Naresh-Kumar17/Road-Accident-Severity"]
      ],
      sum: "Supervised classifiers, margin maximization, kernel optimization, and class-imbalanced risk estimation.",
      body: "Applied ML systems evaluating non-linear decision boundaries, ROC metrics, and SMOTE resampling techniques.",
      cap: "Machine Learning Projects",
      role: "ML Practitioner",
      duration: "2025 · Completed",
      skills: [["Support Vector Machines", "core"], ["SMOTE Resampling", "core"], ["Scikit-Learn", "core"]]
    },
    {
      id: "svm_digits",
      name: "SVM Digit Recognition",
      region: "ai",
      x: 48.0,
      y: -19.5,
      r: 1.0,
      z: 0.2,
      labelPos: "right",
      kicker: "Machine Learning Project",
      sum: "Support Vector Machine classifier for handwritten digit recognition with kernel optimization and ROC diagnostics.",
      body: "Trained and evaluated SVM models with RBF and polynomial kernels, tuning C and gamma regularization parameters to optimize digit boundary separation.",
      cap: "SVM Handwritten Digits",
      url: "https://github.com/Naresh-Kumar17/svm-handwritten-digits",
      urlLabel: "View on GitHub ↗",
      role: "Lead Developer",
      duration: "2025 · Completed",
      skills: [["Python", "core"], ["scikit-learn", "core"], ["SVM Kernels", "core"], ["Matplotlib", "core"]]
    },
    {
      id: "accident_severity",
      name: "Road Accident Risk",
      region: "ai",
      x: 48.0,
      y: -28.5,
      r: 1.0,
      z: 0.2,
      labelPos: "right",
      kicker: "Machine Learning Project",
      sum: "Risk prediction pipeline predicting traffic collision injury severity with SMOTE class rebalancing.",
      body: "Tackled severe class imbalance using SMOTE and feature engineering across environmental and geometric conditions to maximize recall on critical incidents.",
      cap: "Road Accident Severity",
      url: "https://github.com/Naresh-Kumar17/Road-Accident-Severity",
      urlLabel: "View on GitHub ↗",
      role: "Lead Developer",
      duration: "2025 · Completed",
      skills: [["Python", "core"], ["pandas", "core"], ["SMOTE", "core"], ["Risk Classification", "core"]]
    },

    /* ── PROJECT SPOKE 3: STRAIGHT DOWN → DATA SCIENCE ── */
    {
      id: "ds_category",
      name: "Data Science",
      region: "data",
      x: 14.0,
      y: -28.0,
      r: 1.35,
      z: 0.15,
      labelPos: "bottom",
      kicker: "Project Category 03",
      links: [
        ["Dataset Doctor", "https://github.com/Naresh-Kumar17/Dataset-Doctor"],
        ["Air Quality Forecasting", "https://github.com/Naresh-Kumar17/Air_Quality_Forcasating-"]
      ],
      sum: "Time-series forecasting, leak-free ML remediation, trend decomposition, and automated quality platforms.",
      body: "Data science workflows analyzing particulate matter, meteorological variables, and leak-free remediation algorithms.",
      cap: "Data Science Projects",
      role: "Data Scientist",
      duration: "2024–2026 · Active",
      skills: [["Time-Series Forecasting", "core"], ["pandas", "core"], ["Statistical Modeling", "core"], ["Leak-Free ML", "core"]]
    },
    {
      id: "dataset_doctor",
      name: "Dataset Doctor",
      region: "data",
      x: 4.0,
      y: -41.0,
      r: 1.15,
      z: 0.25,
      labelPos: "bottom",
      kicker: "ML Reliability & Remediation Platform",
      sum: "The Data-to-Model Quality, ML Reliability & Leak-Free Remediation Platform with train-only 5-fold CV benchmarks and 117 passing tests.",
      body: "Upload raw tabular data, uncover silent data traps (target leaks, sentinels, impossible boundaries, class imbalance), and benchmark candidate repairs with 5-fold cross-validation strictly on training data. Enforces the non-negotiable invariant: Split first, lock test partition immediately with zero leakage, and export standalone reproduce.py scripts. Validated with 117 passing pytest tests (Gate 8 PASS) and live on Render.",
      cap: "Dataset Doctor Platform",
      url: "https://github.com/Naresh-Kumar17/Dataset-Doctor",
      urlLabel: "View on GitHub ↗",
      links: [
        ["Live App on Render", "https://dataset-doctor-8c7b.onrender.com/"],
        ["GitHub Repository", "https://github.com/Naresh-Kumar17/Dataset-Doctor"]
      ],
      role: "Architect & Lead Creator",
      duration: "2026 · Live on Render",
      skills: [
        ["Python 3.11+", "core"],
        ["FastAPI & Uvicorn", "core"],
        ["scikit-learn", "core"],
        ["imbalanced-learn", "core"],
        ["Zero Leakage", "core"],
        ["117 Tests Passing", "core"]
      ]
    },
    {
      id: "air_quality",
      name: "Air Quality Forecasting",
      region: "data",
      x: 24.0,
      y: -41.0,
      r: 1.0,
      z: 0.25,
      labelPos: "bottom",
      kicker: "Data Science Project",
      sum: "Time-series forecasting model analyzing particulate matter and meteorological trends to forecast AQI episodes.",
      body: "Developed an end-to-end framework handling temporal gaps, seasonal decomposition (STL), and lagged rolling features for air quality predictions.",
      cap: "Air Quality Forecasting",
      url: "https://github.com/Naresh-Kumar17/Air_Quality_Forcasating-",
      urlLabel: "View on GitHub ↗",
      role: "Lead Researcher",
      duration: "2025 · Completed",
      skills: [["Python", "core"], ["pandas", "core"], ["Time-Series", "core"], ["Predictive Modeling", "core"]]
    }
  ],
  E: [
    /* ── Naresh spokes (5 edges to 5 surrounding nodes) ── */
    ["naresh", "skills_hub"],
    ["naresh", "about_me"],
    ["naresh", "contacto"],
    ["naresh", "resume_hub"],
    ["naresh", "growth"],

    /* ── Projects spokes (3 edges to 3 category nodes) ── */
    ["growth", "web_category"],
    ["growth", "ml_category"],
    ["growth", "ds_category"],

    /* ── Web category branch ── */
    ["web_category", "cosmos_portfolio"],

    /* ── Machine Learning category branch ── */
    ["ml_category", "svm_digits"],
    ["ml_category", "accident_severity"],

    /* ── Data Science category branch ── */
    ["ds_category", "dataset_doctor"],
    ["ds_category", "air_quality"]
  ]
};

const COLOR: Record<string, string> = {
  entry: '#9B8FFF',     // Iris Lavender / Naresh
  skills: '#00B0CD',    // Cyan / Skills
  growth: '#FFAA00',    // Amber Gold / Projects
  ai: '#E84FD0',        // Neural Magenta / ML
  data: '#22C55E',      // Emerald Green / Data Science
  web: '#38BDF8'        // Sky Blue / Web Development
};

const RLAB: Record<string, string> = {
  entry: 'Naresh',
  skills: 'Skills',
  growth: 'Projects',
  ai: 'Machine Learning',
  data: 'Data Science',
  web: 'Web Development'
};

const REGION_TO_HUB: Record<string, string> = {
  entry: 'naresh',
  skills: 'skills_hub',
  growth: 'growth',
  ai: 'ml_category',
  data: 'ds_category',
  web: 'web_category'
};

const CATEGORY_MAP: Record<string, string[]> = {
  growth: ['web_category', 'ml_category', 'ds_category'],
  web_category: ['cosmos_portfolio'],
  ml_category: ['svm_digits', 'accident_severity'],
  ds_category: ['dataset_doctor', 'air_quality'],
  skills_hub: ['naresh'],
  resume_hub: ['naresh'],
  about_me: ['naresh'],
  contacto: ['naresh'],
  naresh: ['skills_hub', 'about_me', 'contacto', 'resume_hub', 'growth'],
};

const PARENT_MAP: Record<string, string> = {
  web_category: 'growth',
  ml_category: 'growth',
  ds_category: 'growth',
  cosmos_portfolio: 'web_category',
  svm_digits: 'ml_category',
  accident_severity: 'ml_category',
  dataset_doctor: 'ds_category',
  air_quality: 'ds_category',
  skills_hub: 'naresh',
  resume_hub: 'naresh',
  about_me: 'naresh',
  contacto: 'naresh',
  growth: 'naresh',
};

interface TourStop {
  id: string;
  nodeId: string;
  stepNum: number;
  durationSec: number;
  camX: number;
  camY: number;
  camZoom: number;
  badge: string;
  badgeCol: string;
  title: string;
  subtitle: string;
  story: string;
  highlightSkills: string[];
  actionLabel?: string;
  actionUrl?: string;
  isExternalUrl?: boolean;
}

const TOUR_STOPS: TourStop[] = [
  {
    id: 'origin',
    nodeId: 'naresh',
    stepNum: 1,
    durationSec: 10,
    camX: -16.0,
    camY: 10.0,
    camZoom: 1.45,
    badge: 'THE ORIGIN',
    badgeCol: '#9B8FFF',
    title: 'Naresh Kumar',
    subtitle: 'BS Data Science · FAST-NUCES Karachi',
    story: 'Transforming empirical data pipelines into robust mathematical solutions. Specializing in machine learning classifiers, time-series forecasting, and interactive visual computing.',
    highlightSkills: ['FAST-NUCES Karachi', 'Machine Learning', 'Statistical Pipelines'],
    actionLabel: 'Explore Identity',
    actionUrl: '#naresh'
  },
  {
    id: 'doctor',
    nodeId: 'dataset_doctor',
    stepNum: 2,
    durationSec: 10,
    camX: 4.0,
    camY: -41.0,
    camZoom: 1.5,
    badge: 'FLAGSHIP PLATFORM',
    badgeCol: '#22C55E',
    title: 'Dataset Doctor',
    subtitle: 'The Data-to-Model Quality & ML Reliability Platform',
    story: 'Catches silent data traps before model training: target leakage, sentinel values, and class imbalance. Enforces split-first zero leakage with 117 passing pytest tests.',
    highlightSkills: ['117 Tests Passing', 'Train-Only 5-Fold CV', 'FastAPI', 'Zero Leakage'],
    actionLabel: 'Launch App on Render ↗',
    actionUrl: 'https://dataset-doctor-8c7b.onrender.com/',
    isExternalUrl: true
  },
  {
    id: 'ml_models',
    nodeId: 'ml_category',
    stepNum: 3,
    durationSec: 10,
    camX: 32.0,
    camY: -24.0,
    camZoom: 1.4,
    badge: 'MACHINE LEARNING',
    badgeCol: '#E84FD0',
    title: 'Supervised Models & SMOTE',
    subtitle: 'SVM Digit Classification & Road Accident Severity',
    story: 'Maximizing non-linear hyperplane separation with RBF kernels for digit recognition, and balancing extreme casualty distributions via synthetic SMOTE sampling.',
    highlightSkills: ['Support Vector Machines', 'SMOTE Resampling', 'scikit-learn', 'ROC-AUC'],
    actionLabel: 'View GitHub Repos ↗',
    actionUrl: 'https://github.com/Naresh-Kumar17/svm-handwritten-digits',
    isExternalUrl: true
  },
  {
    id: 'forecasting',
    nodeId: 'air_quality',
    stepNum: 4,
    durationSec: 10,
    camX: 24.0,
    camY: -41.0,
    camZoom: 1.5,
    badge: 'DATA SCIENCE',
    badgeCol: '#22C55E',
    title: 'Air Quality Forecasting',
    subtitle: 'Time-Series Decomposition & Environmental Prediction',
    story: 'End-to-end framework predicting AQI spikes and particulate concentration. Features Seasonal-Trend Decomposition (STL), lagged temporal rolling windows, and meteorological covariates.',
    highlightSkills: ['Time-Series Forecasting', 'STL Decomposition', 'Rolling Features', 'pandas'],
    actionLabel: 'View Source Code ↗',
    actionUrl: 'https://github.com/Naresh-Kumar17/Air_Quality_Forcasating-',
    isExternalUrl: true
  },
  {
    id: 'cosmos',
    nodeId: 'cosmos_portfolio',
    stepNum: 5,
    durationSec: 10,
    camX: 56.0,
    camY: -4.0,
    camZoom: 1.45,
    badge: 'WEB COMPUTING',
    badgeCol: '#38BDF8',
    title: '3D Constellation Cosmos',
    subtitle: 'Custom Perspective 3D Engine on HTML5 Canvas',
    story: 'Engineered entirely from scratch with React 19 and Canvas 2D math without bulky 3D engines. Features Gaussian volumetric haze, travelling photon curves, and automated collision avoidance.',
    highlightSkills: ['React 19', 'TypeScript', 'HTML5 Canvas 2D', 'AWS Amplify CI/CD'],
    actionLabel: 'View Portfolio Repo ↗',
    actionUrl: 'https://github.com/Naresh-Kumar17/portoflio_naresh',
    isExternalUrl: true
  },
  {
    id: 'resume',
    nodeId: 'resume_hub',
    stepNum: 6,
    durationSec: 10,
    camX: 6.0,
    camY: 28.0,
    camZoom: 1.45,
    badge: 'QUALIFICATIONS',
    badgeCol: '#FFAA00',
    title: 'Curriculum Vitae',
    subtitle: 'Academic Background, Research & Direct Contact',
    story: 'Full qualifications, academic course history at FAST-NUCES Karachi, and open technical availability for Machine Learning and Data Science opportunities.',
    highlightSkills: ['FAST-NUCES 2025–2029', 'Machine Learning', 'Available for Collaboration'],
    actionLabel: 'Open Resume Sheet →',
    actionUrl: '/resume',
    isExternalUrl: false
  }
];

class CelestialAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private droneGain: GainNode | null = null;
  private chordGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;
  private isMuted: boolean = false;
  private isRunning: boolean = false;

  start() {
    if (this.isRunning) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, now);
      this.masterGain.gain.exponentialRampToValueAtTime(this.isMuted ? 0.0001 : 0.28, now + 1.5);
      this.masterGain.connect(this.ctx.destination);

      // Low pass filter with subtle resonance
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(320, now);
      this.filter.Q.setValueAtTime(2.5, now);
      this.filter.connect(this.masterGain);

      // LFO slowly sweeps filter cutoff (cosmic breathing effect)
      this.lfo = this.ctx.createOscillator();
      this.lfoGain = this.ctx.createGain();
      this.lfo.frequency.setValueAtTime(0.12, now);
      this.lfoGain.gain.setValueAtTime(120, now);
      this.lfo.connect(this.lfoGain);
      this.lfoGain.connect(this.filter.frequency);
      this.lfo.start(now);

      // Drone Oscillators (warm interstellar fundamental)
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.32, now);
      this.droneGain.connect(this.filter);

      // Oscillator 1: 55Hz (A1) sawtooth
      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc1.type = 'sawtooth';
      this.droneOsc1.frequency.setValueAtTime(55, now);
      this.droneOsc1.connect(this.droneGain);
      this.droneOsc1.start(now);

      // Oscillator 2: 110.3Hz slightly detuned triangle for chorusing
      this.droneOsc2 = this.ctx.createOscillator();
      this.droneOsc2.type = 'triangle';
      this.droneOsc2.frequency.setValueAtTime(110.3, now);
      this.droneOsc2.connect(this.droneGain);
      this.droneOsc2.start(now);

      // Chord bus
      this.chordGain = this.ctx.createGain();
      this.chordGain.gain.setValueAtTime(0.2, now);
      this.chordGain.connect(this.filter);

      this.isRunning = true;
    } catch (e) {
      console.warn('AudioContext failed:', e);
    }
  }

  playChordForStep(stepIndex: number) {
    if (!this.ctx || !this.chordGain || this.isMuted) return;
    try {
      const chords = [
        [220.00, 261.63, 329.63, 392.00], // Am7 (Stop 1: Origin)
        [174.61, 220.00, 261.63, 349.23], // Fmaj7 (Stop 2: Dataset Doctor)
        [146.83, 220.00, 261.63, 329.63], // Dm9 (Stop 3: ML)
        [196.00, 246.94, 293.66, 392.00], // Gadd9 (Stop 4: Air Quality)
        [261.63, 329.63, 392.00, 523.25], // Cmaj7 (Stop 5: 3D Cosmos)
        [164.81, 246.94, 329.63, 392.00], // Em7 (Stop 6: Resume)
      ];
      const notes = chords[stepIndex % chords.length];
      const now = this.ctx.currentTime;

      notes.forEach((freq, i) => {
        if (!this.ctx || !this.chordGain) return;
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        noteGain.gain.setValueAtTime(0.0001, now);
        noteGain.gain.exponentialRampToValueAtTime(0.1 / notes.length, now + 1.2);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 9.5);

        osc.connect(noteGain);
        noteGain.connect(this.chordGain);

        osc.start(now);
        osc.stop(now + 9.8);
      });
    } catch (_) {}
  }

  playChime(pitchMultiplier: number = 1.0) {
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const baseFreq = 523.25 * pitchMultiplier;
      const freqs = [baseFreq, baseFreq * 1.5, baseFreq * 2.0, baseFreq * 2.25];

      freqs.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const noteTime = now + idx * 0.08;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteTime);

        g.gain.setValueAtTime(0.0001, noteTime);
        g.gain.exponentialRampToValueAtTime(0.09, noteTime + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, noteTime + 1.8);

        osc.connect(g);
        g.connect(this.masterGain);

        osc.start(noteTime);
        osc.stop(noteTime + 1.9);
      });
    } catch (_) {}
  }

  toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      try {
        this.masterGain.gain.cancelScheduledValues(now);
        if (this.isMuted) {
          this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
        } else {
          this.masterGain.gain.exponentialRampToValueAtTime(0.28, now + 0.4);
        }
      } catch (_) {}
    }
    return this.isMuted;
  }

  stop() {
    if (!this.isRunning) return;
    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      try {
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
      } catch (_) {}
    }
    setTimeout(() => {
      try {
        if (this.lfo) this.lfo.stop();
        if (this.droneOsc1) this.droneOsc1.stop();
        if (this.droneOsc2) this.droneOsc2.stop();
        if (this.ctx && this.ctx.state !== 'closed') {
          this.ctx.close();
        }
      } catch (_) {}
      this.isRunning = false;
      this.ctx = null;
    }, 900);
  }
}

export interface SuperpowerCosmosProps {
  onSwitchToList?: () => void;
}

export function SuperpowerCosmos({}: SuperpowerCosmosProps = {}) {
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
    const topEl = root.querySelector('#pagetop') as HTMLElement;
    const resetOrbitBtn = root.querySelector('#reset-orbit') as HTMLElement;
    const zoomInBtn = root.querySelector('#zoom-in') as HTMLElement;
    const zoomOutBtn = root.querySelector('#zoom-out') as HTMLElement;

    if (resetOrbitBtn) {
      resetOrbitBtn.onclick = (e) => {
        e.stopPropagation();
        goHome();
      };
    }
    if (zoomInBtn) {
      zoomInBtn.onclick = (e) => {
        e.stopPropagation();
        userInteracted = true;
        userZoom = Math.min(2.8, userZoom * 1.25);
      };
    }
    if (zoomOutBtn) {
      zoomOutBtn.onclick = (e) => {
        e.stopPropagation();
        userInteracted = true;
        userZoom = Math.max(0.6, userZoom * 0.8);
      };
    }
    
    let W = (c.width = window.innerWidth);
    let H = (c.height = window.innerHeight);
    let SC = 1, LBL = 1;

    // Origin center: Centered directly on Naresh at (0, 0)
    const cx0 = 6.0;
    const cy0 = -7.0;
    const orgR = 56.0;

    function resize() {
      W = c.width = window.innerWidth;
      H = c.height = window.innerHeight;
      const span = W <= 760 ? 1.6 : 2.15;
      SC = Math.min(W, H) / (orgR * span);
      LBL = W <= 760 ? 1.2 : 1;
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
    let userZoom = 1, viewRot = 0, viewTiltX = 0.18, userInteracted = false;

    // ── 60-Second Guided Tour State & Web Audio Synthesizer ──
    let isTourActive = false;
    let isTourPaused = false;
    let tourStopIndex = 0;
    let tourStopElapsed = 0;
    let tourTotalElapsed = 0;
    let curCamX = cx0;
    let curCamY = cy0;
    let targetCamX = cx0;
    let targetCamY = cy0;
    let targetCamZoom = 1.0;

    const audioEngine = new CelestialAudioEngine();

    const sat = (v: number) => Math.max(0, Math.min(1, v));
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    function proj(wx: number, wy: number, wz: number = 0): [number, number, number] {
      const x = wx - curCamX, y = wy - curCamY, z = (wz || 0) * 1.3;
      // Ambient slow yaw + user horizontal rotation (turntable)
      const totalYaw = curRot + viewRot;
      const cy = Math.cos(totalYaw), sy = Math.sin(totalYaw);
      let x1 = x * cy - z * sy;
      let z1 = x * sy + z * cy;

      // Vertical tilt (pitch)
      const ax = viewTiltX;
      const cax = Math.cos(ax), sax = Math.sin(ax);
      let y1 = y * cax - z1 * sax;
      let z2 = y * sax + z1 * cax;

      x1 *= curBr; y1 *= curBr;

      // Mathematically bounded camera depth (never <= 0, never negative, never crashes)
      const CAM_DIST = 140.0;
      const depth = Math.max(30.0, CAM_DIST - z2);
      const persp = CAM_DIST / depth;
      const Z = Math.max(0.2, camZoom * userZoom * persp);
      return [W * fieldCX + x1 * SC * Z, H / 2 - y1 * SC * Z, persp];
    }

    // ── Interaction: Pointer, Drag, Click ──
    let isDragging = false, dragStartX = 0, dragStartY = 0;
    let startRot = 0, startTilt = 0;

    c.style.cursor = 'grab';

    c.addEventListener('pointerdown', (e: PointerEvent) => {
      isDragging = true;
      c.style.cursor = 'grabbing';
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      startRot = viewRot;
      startTilt = viewTiltX;
      userInteracted = true;
      try {
        c.setPointerCapture(e.pointerId);
      } catch (_) {}
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
        let best: any = null, bestDist = 36;
        for (let i = 0; i < N.length; i++) {
          const [sx, sy] = proj(N[i].x, N[i].y, (N[i] as any).z);
          const d = Math.hypot(mouseX - sx, mouseY - sy);
          if (d < Math.max(bestDist, N[i].r * 22 * userZoom)) {
            bestDist = d;
            best = N[i];
          }
        }
        if (best !== hoverId) {
          hoverId = best ? best.id : null;
          c.style.cursor = isDragging ? 'grabbing' : (best ? 'pointer' : 'grab');
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
      c.style.cursor = hoverId ? 'pointer' : 'grab';
      const dist = Math.hypot(e.clientX - dragStartX, e.clientY - dragStartY);
      if (dist < 8) {
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
        const hitR = Math.max(32, N[i].r * 22 * userZoom);
                if (Math.hypot(clientX - sx, clientY - sy) <= hitR) {
          const clickedNode = N[i];
          if (clickedNode.id === 'resume_hub') {
            window.location.assign('/resume');
            return;
          }
          setFieldFocus(clickedNode.id);
          return;
        }
      }
      // Clicked on empty space: close gallery drawer & return to all
      if (galMode) {
        goHome();
      }
    }

    function showTip(n: any, x: number, y: number) {
      const col = COLOR[n.region];
      tip.querySelector('.nm')!.innerHTML =
        '<span class="tdot" style="background:' + col + ';box-shadow:0 0 8px ' + col + '"></span>' + n.name;
      tip.querySelector('.kc')!.textContent = n.kicker || '';
      let cta = 'EXPLORE · click to inspect →';
      if (n.id === 'skills_hub') cta = 'SKILLS · click to view case study →';
      else if (n.id === 'resume_hub') cta = 'RESUME · click to view full CV →';
      tip.querySelector('.go')!.textContent = cta;
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

      const children = CATEGORY_MAP[targetId] || [];
      const childrenIndices = children.map((cId: string) => idIndex[cId]).filter((idx: number | undefined) => idx !== undefined);

      focusSet = new Set([i, ...childrenIndices]);
      galMode = children.length > 0 ? 'area' : 'node';
      galNode = targetId;

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
      targetCamX = cx0;
      targetCamY = cy0;
      targetCamZoom = 1.0;
      setTabsOn();
      renderGallery();
    }

    // Editorial page mode disabled in favor of dedicated /skills and /resume pages

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

    const tourToggleBtn = root.querySelector('#tour-toggle-btn') as HTMLButtonElement | null;
    const tourOverlay = root.querySelector('#cosmos-tour-overlay') as HTMLDivElement | null;
    const tourStoryCard = root.querySelector('#tour-story-card') as HTMLDivElement | null;
    const tourProgressFill = root.querySelector('#tour-progress-fill') as HTMLDivElement | null;
    const tourTimeText = root.querySelector('#tour-time-text') as HTMLSpanElement | null;
    const tourPrevBtn = root.querySelector('#tour-prev-btn') as HTMLButtonElement | null;
    const tourPauseBtn = root.querySelector('#tour-pause-btn') as HTMLButtonElement | null;
    const tourNextBtn = root.querySelector('#tour-next-btn') as HTMLButtonElement | null;
    const tourSoundBtn = root.querySelector('#tour-sound-btn') as HTMLButtonElement | null;
    const tourCloseBtn = root.querySelector('#tour-close-btn') as HTMLButtonElement | null;

    function renderTourCard(stop: TourStop) {
      if (!tourStoryCard) return;
      tourStoryCard.innerHTML = `
        <div class="tour-header">
          <span class="tour-step-chip" style="background:${stop.badgeCol}1f;color:${stop.badgeCol};border:1px solid ${stop.badgeCol}55;">
            <span class="tour-chip-dot" style="background:${stop.badgeCol};box-shadow:0 0 8px ${stop.badgeCol};"></span>
            ${stop.badge} · STOP 0${stop.stepNum} OF 06
          </span>
        </div>
        <h2 class="tour-title">${stop.title}</h2>
        <h3 class="tour-subtitle" style="color:${stop.badgeCol}">${stop.subtitle}</h3>
        <p class="tour-story">${stop.story}</p>
        <div class="tour-skills">
          ${stop.highlightSkills.map((sk: string) => `<span class="tour-skill-tag">${sk}</span>`).join('')}
        </div>
        ${stop.actionUrl ? `
          <div class="tour-action-row">
            <a href="${stop.actionUrl}" ${stop.isExternalUrl ? 'target="_blank" rel="noopener noreferrer"' : ''} class="tour-action-link" style="background:${stop.badgeCol};color:#06070D;">
              ${stop.actionLabel || 'Explore More →'}
            </a>
          </div>
        ` : ''}
      `;

      if (tourOverlay) {
        tourOverlay.querySelectorAll('.tour-step-dot').forEach((dot: any) => {
          const s = parseInt(dot.dataset.step, 10);
          dot.classList.toggle('active', s === tourStopIndex);
          if (s === tourStopIndex) {
            dot.style.background = stop.badgeCol;
            dot.style.borderColor = stop.badgeCol;
            dot.style.color = '#06070D';
          } else {
            dot.style.background = '';
            dot.style.borderColor = '';
            dot.style.color = '';
          }
        });
      }
    }

    function goToTourStop(index: number) {
      tourStopIndex = Math.max(0, Math.min(TOUR_STOPS.length - 1, index));
      tourStopElapsed = 0;
      tourTotalElapsed = tourStopIndex * 10;
      const stop = TOUR_STOPS[tourStopIndex];

      targetCamX = stop.camX;
      targetCamY = stop.camY;
      targetCamZoom = stop.camZoom;

      const nodeIdx = idIndex[stop.nodeId];
      if (nodeIdx !== undefined) {
        const children = CATEGORY_MAP[stop.nodeId] || [];
        const childIndices = children.map((cId: string) => idIndex[cId]).filter((x: number | undefined) => x !== undefined);
        focusSet = new Set([nodeIdx, ...childIndices]);
        fieldSel = stop.nodeId;
      }

      audioEngine.playChime(1.0 + tourStopIndex * 0.08);
      audioEngine.playChordForStep(tourStopIndex);
      renderTourCard(stop);
      updateTourUI();
    }

    function updateTourUI() {
      if (!isTourActive) return;
      const totalSec = Math.min(60, Math.floor(tourTotalElapsed));
      const pct = Math.min(100, (tourTotalElapsed / 60) * 100);
      if (tourProgressFill) {
        tourProgressFill.style.width = `${pct.toFixed(1)}%`;
      }
      if (tourTimeText) {
        const secStr = totalSec < 10 ? `0${totalSec}` : `${totalSec}`;
        tourTimeText.textContent = `${secStr}s / 60s`;
      }
    }

    function toggleTourPause() {
      isTourPaused = !isTourPaused;
      if (tourPauseBtn) {
        tourPauseBtn.textContent = isTourPaused ? '▶' : '⏸';
        tourPauseBtn.title = isTourPaused ? 'Resume Tour' : 'Pause Tour';
      }
    }

    function startTour() {
      isTourActive = true;
      isTourPaused = false;
      tourStopIndex = 0;
      tourStopElapsed = 0;
      tourTotalElapsed = 0;
      userInteracted = true;

      galMode = null;
      galNode = null;
      galleryEl.classList.remove('show');

      if (tourToggleBtn) {
        tourToggleBtn.classList.add('touring');
        tourToggleBtn.innerHTML = '<span class="tour-btn-icon">⏹</span><span class="tour-btn-text">Exit Tour</span>';
      }
      if (tourOverlay) {
        tourOverlay.classList.add('active');
      }
      if (tourPauseBtn) {
        tourPauseBtn.textContent = '⏸';
      }

      audioEngine.start();
      goToTourStop(0);
    }

    function stopTour() {
      isTourActive = false;
      isTourPaused = false;
      tourStopElapsed = 0;
      tourTotalElapsed = 0;

      if (tourToggleBtn) {
        tourToggleBtn.classList.remove('touring');
        tourToggleBtn.innerHTML = '<span class="tour-hud-pulse"></span><span class="tour-btn-icon">▶</span><span class="tour-btn-text">60s Tour</span>';
      }
      if (tourOverlay) {
        tourOverlay.classList.remove('active');
      }

      audioEngine.stop();
      targetCamX = cx0;
      targetCamY = cy0;
      targetCamZoom = 1.0;
      goHome();
    }

    function finishTour() {
      isTourPaused = true;
      if (tourProgressFill) tourProgressFill.style.width = '100%';
      if (tourTimeText) tourTimeText.textContent = '60s / 60s';
      audioEngine.playChime(1.5);

      if (tourStoryCard) {
        tourStoryCard.innerHTML = `
          <div class="tour-header">
            <span class="tour-step-chip" style="background:#22C55E22;color:#22C55E;border:1px solid #22C55E66;">
              <span class="tour-chip-dot" style="background:#22C55E;box-shadow:0 0 8px #22C55E;"></span>
              TOUR COMPLETE · 60s FLIGHT COMPLETED
            </span>
          </div>
          <h2 class="tour-title">Flight Journey Complete</h2>
          <h3 class="tour-subtitle" style="color:#22C55E;">Constellation Explored</h3>
          <p class="tour-story">
            You have explored the core data science platforms, machine learning models, and engineering architectures.
            Feel free to orbit, zoom, or click any star cluster on the map to inspect in-depth case studies!
          </p>
          <div class="tour-action-row" style="gap:10px;">
            <button id="tour-replay-btn" type="button" class="tour-action-link" style="background:#9B8FFF;color:#06070D;cursor:pointer;border:none;">
              ⟲ Replay Tour
            </button>
            <button id="tour-finish-close-btn" type="button" class="tour-action-link" style="background:rgba(255,255,255,0.12);color:var(--ink);cursor:pointer;border:1px solid rgba(255,255,255,0.2);">
              Explore Freely ↗
            </button>
          </div>
        `;

        const replayBtn = tourStoryCard.querySelector('#tour-replay-btn') as HTMLButtonElement | null;
        if (replayBtn) {
          replayBtn.onclick = () => {
            isTourPaused = false;
            goToTourStop(0);
          };
        }
        const finishCloseBtn = tourStoryCard.querySelector('#tour-finish-close-btn') as HTMLButtonElement | null;
        if (finishCloseBtn) {
          finishCloseBtn.onclick = () => {
            stopTour();
          };
        }
      }
    }

    if (tourToggleBtn) {
      tourToggleBtn.onclick = (e) => {
        e.stopPropagation();
        if (isTourActive) {
          stopTour();
        } else {
          startTour();
        }
      };
    }
    if (tourPrevBtn) {
      tourPrevBtn.onclick = (e) => {
        e.stopPropagation();
        if (tourStopIndex > 0) {
          goToTourStop(tourStopIndex - 1);
        }
      };
    }
    if (tourNextBtn) {
      tourNextBtn.onclick = (e) => {
        e.stopPropagation();
        if (tourStopIndex < TOUR_STOPS.length - 1) {
          goToTourStop(tourStopIndex + 1);
        } else {
          finishTour();
        }
      };
    }
    if (tourPauseBtn) {
      tourPauseBtn.onclick = (e) => {
        e.stopPropagation();
        toggleTourPause();
      };
    }
    if (tourSoundBtn) {
      tourSoundBtn.onclick = (e) => {
        e.stopPropagation();
        const muted = audioEngine.toggleMute();
        tourSoundBtn.textContent = muted ? '🔇' : '🔊';
        tourSoundBtn.title = muted ? 'Unmute Audio' : 'Mute Audio';
      };
    }
    if (tourCloseBtn) {
      tourCloseBtn.onclick = (e) => {
        e.stopPropagation();
        stopTour();
      };
    }
    if (tourOverlay) {
      tourOverlay.querySelectorAll('.tour-step-dot').forEach((pill: any) => {
        pill.onclick = (e: MouseEvent) => {
          e.stopPropagation();
          const step = parseInt(pill.dataset.step, 10);
          if (!isNaN(step)) {
            if (!isTourActive) {
              startTour();
            }
            goToTourStop(step);
          }
        };
      });
    }


    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isTourActive) {
          stopTour();
        } else {
          returnHome();
        }
      } else if (e.code === 'Space' && isTourActive) {
        e.preventDefault();
        toggleTourPause();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const handleCosmosFocus = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && byId[detail]) {
        hoverId = null;
        hideTip();
        userInteracted = true;
        if (isTourActive) stopTour();
        setFieldFocus(detail);
      }
    };
    window.addEventListener('cosmos-focus', handleCosmosFocus);

    // ── Build Category Tabs ──
    const COSMOS_TABS = [
      { id: 'naresh', label: 'NARESH', col: '#9B8FFF', action: () => setFieldFocus('naresh') },
      { id: 'skills', label: 'SKILLS', col: '#00B0CD', action: () => setFieldFocus('skills_hub') },
      { id: 'projects', label: 'PROJECTS', col: '#FFAA00', action: () => setFieldFocus('growth') },
      { id: 'resume', label: 'RESUME', col: '#E84FD0', action: () => { window.location.assign('/resume'); } },
    ];

    function buildTabs() {
      tabsEl.innerHTML = '';
      COSMOS_TABS.forEach((tab) => {
        const d = document.createElement('button');
        d.className = 't' + (tab.id === 'naresh' ? ' on' : '');
        d.type = 'button';
        d.dataset.tabId = tab.id;
        d.dataset.col = tab.col;
        d.innerHTML = '<i style="background:' + tab.col + ';box-shadow:0 0 8px ' + tab.col + '"></i>' + tab.label;
        d.onclick = (e) => {
          e.stopPropagation();
          if (mode !== 'field') {
            mode = 'field';
            playing = false;
            P = 0;
            pageEl.style.opacity = '0';
            pageEl.style.display = 'none';
            pageEl.style.pointerEvents = 'none';
            docEl.innerHTML = '';
          }
          hoverId = null;
          hideTip();
          userInteracted = true;
          if (isTourActive) stopTour();
          tab.action();
        };
        tabsEl.appendChild(d);
      });
      setTabsOn();
    }
    buildTabs();

    function setTabsOn() {
      tabsEl.querySelectorAll('.t').forEach((t: any) => {
        const id = t.dataset.tabId;
        const col = t.dataset.col || '#FAFAF7';
        const isProjectActive = (fieldSel === 'growth' || fieldSel === 'ml_category' || fieldSel === 'ds_category' || fieldSel === 'web_category' || fieldSel === 'svm_digits' || fieldSel === 'accident_severity' || fieldSel === 'air_quality' || fieldSel === 'dataset_doctor' || fieldSel === 'cosmos_portfolio');
        const isSkillsActive = fieldSel === 'skills_hub';
        const isNareshActive = !fieldSel || fieldSel === 'naresh' || fieldSel === 'about_me' || fieldSel === 'contacto';

        const isResumeActive = fieldSel === 'resume_hub';
        const isOn = (id === 'naresh' && isNareshActive) ||
                     (id === 'projects' && isProjectActive) ||
                     (id === 'skills' && isSkillsActive) ||
                     (id === 'resume' && isResumeActive);

        t.classList.toggle('on', isOn);
        t.style.background = isOn ? col : 'rgba(14, 12, 24, 0.75)';
        t.style.color = isOn ? '#06070D' : 'rgba(255, 255, 255, 0.85)';
        t.style.borderColor = isOn ? col : 'rgba(255, 255, 255, 0.22)';
        t.style.fontWeight = isOn ? '700' : '500';
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

      const acc = COLOR[n.region] || '#9B8FFF';
      galleryEl.style.setProperty('--cc', acc);
      galleryEl.classList.add('show');

      const parentId = PARENT_MAP[n.id];
      const backLabel = parentId && byId[parentId] ? `← Back to ${byId[parentId].name}` : '↖ Return to Map';

      let actionButtons = '';
      if (n.id === 'skills_hub') {
        actionButtons = `
          <a href="/skills" class="genter" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;margin:16px 0 10px;width:100%;text-align:center;background:#00B0CD;color:#06070D;font-weight:700;">
            📖 Open Full Skills Documentation Page →
          </a>
        `;
      } else if (n.id === 'resume_hub') {
        actionButtons = `
          <a href="/resume" class="genter" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;margin:16px 0 10px;width:100%;text-align:center;background:#E84FD0;color:#06070D;font-weight:700;">
            📄 Open Full Resume Sheet →
          </a>
        `;
      } else if (n.url) {
        actionButtons = `
          <div style="display:flex;gap:10px;flex-wrap:wrap;margin:14px 0 8px;">
            <a href="${n.url}" target="_blank" rel="noopener noreferrer" class="genter" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;width:100%;">
              ${n.urlLabel || 'View on GitHub ↗'}
            </a>
          </div>
        `;
      }

      // Specialized In-Page Case Study for Skills Hub & Naresh
      let customDossierHTML = '';
      if (n.id === 'skills_hub') {
        customDossierHTML = `
          <div style="margin:16px 0 10px;display:flex;flex-direction:column;gap:12px;">
            <div style="padding:14px;border-radius:10px;background:rgba(0,176,205,0.06);border:1px solid rgba(0,176,205,0.3);">
              <div style="font-family:var(--mono);font-size:11px;font-weight:700;color:#00B0CD;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px;">
                01 · Python with Machine Learning Libraries
              </div>
              <p style="font-size:12.5px;line-height:1.55;color:var(--ink2);margin:0 0 8px;">
                Supervised classification, SVM kernel margin optimization, train-only 5-fold cross-validation, and class-imbalanced risk estimation.
              </p>
              <div style="display:flex;flex-wrap:wrap;gap:5px;">
                <span style="font-family:var(--mono);font-size:10px;padding:2px 7px;border-radius:999px;background:rgba(255,255,255,0.06);color:var(--ink3);">scikit-learn</span>
                <span style="font-family:var(--mono);font-size:10px;padding:2px 7px;border-radius:999px;background:rgba(255,255,255,0.06);color:var(--ink3);">pandas</span>
                <span style="font-family:var(--mono);font-size:10px;padding:2px 7px;border-radius:999px;background:rgba(255,255,255,0.06);color:var(--ink3);">NumPy</span>
                <span style="font-family:var(--mono);font-size:10px;padding:2px 7px;border-radius:999px;background:rgba(255,255,255,0.06);color:var(--ink3);">SMOTE</span>
                <span style="font-family:var(--mono);font-size:10px;padding:2px 7px;border-radius:999px;background:rgba(255,255,255,0.06);color:var(--ink3);">FastAPI</span>
              </div>
            </div>

            <div style="padding:14px;border-radius:10px;background:rgba(155,143,255,0.06);border:1px solid rgba(155,143,255,0.3);">
              <div style="font-family:var(--mono);font-size:11px;font-weight:700;color:#9B8FFF;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px;">
                02 · C++ & Systems Programming
              </div>
              <p style="font-size:12.5px;line-height:1.55;color:var(--ink2);margin:0 0 8px;">
                Memory hierarchy optimization, deterministic RAII lifecycles, and modular OOP software architectures at FAST-NUCES Karachi.
              </p>
              <div style="display:flex;flex-wrap:wrap;gap:5px;">
                <span style="font-family:var(--mono);font-size:10px;padding:2px 7px;border-radius:999px;background:rgba(255,255,255,0.06);color:var(--ink3);">C++20</span>
                <span style="font-family:var(--mono);font-size:10px;padding:2px 7px;border-radius:999px;background:rgba(255,255,255,0.06);color:var(--ink3);">Data Structures</span>
                <span style="font-family:var(--mono);font-size:10px;padding:2px 7px;border-radius:999px;background:rgba(255,255,255,0.06);color:var(--ink3);">Algorithms</span>
                <span style="font-family:var(--mono);font-size:10px;padding:2px 7px;border-radius:999px;background:rgba(255,255,255,0.06);color:var(--ink3);">Complexity</span>
              </div>
            </div>

            <div style="padding:14px;border-radius:10px;background:rgba(56,189,248,0.06);border:1px solid rgba(56,189,248,0.3);">
              <div style="font-family:var(--mono);font-size:11px;font-weight:700;color:#38BDF8;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px;">
                03 · Web Development & Visual Computing
              </div>
              <p style="font-size:12.5px;line-height:1.55;color:var(--ink2);margin:0 0 8px;">
                Mathematical 3D perspective projection engines on HTML5 Canvas 2D, React 19, strict TypeScript, and continuous cloud delivery.
              </p>
              <div style="display:flex;flex-wrap:wrap;gap:5px;">
                <span style="font-family:var(--mono);font-size:10px;padding:2px 7px;border-radius:999px;background:rgba(255,255,255,0.06);color:var(--ink3);">React 19</span>
                <span style="font-family:var(--mono);font-size:10px;padding:2px 7px;border-radius:999px;background:rgba(255,255,255,0.06);color:var(--ink3);">TypeScript</span>
                <span style="font-family:var(--mono);font-size:10px;padding:2px 7px;border-radius:999px;background:rgba(255,255,255,0.06);color:var(--ink3);">HTML5 Canvas</span>
                <span style="font-family:var(--mono);font-size:10px;padding:2px 7px;border-radius:999px;background:rgba(255,255,255,0.06);color:var(--ink3);">AWS Amplify</span>
              </div>
            </div>
          </div>
        `;
      } else if (n.id === 'about_me' || n.id === 'naresh') {
        customDossierHTML = `
          <div style="margin:16px 0 12px;display:flex;align-items:center;gap:16px;padding:14px;border-radius:12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.12);">
            <img src="/profile.png" alt="Naresh Kumar" style="width:68px;height:68px;border-radius:50%;object-fit:cover;border:2px solid ${acc};box-shadow:0 0 14px ${acc}66;" />
            <div>
              <div style="font-weight:700;font-size:15px;color:var(--ink);">Naresh Kumar</div>
              <div style="font-size:12px;color:${acc};font-family:var(--mono);margin-top:2px;">BS Data Science · FAST-NUCES Karachi</div>
              <div style="font-size:11px;color:var(--ink3);margin-top:2px;">2025 – 2029</div>
            </div>
          </div>
        `;
      }

      const skillsHTML = n.skills && n.skills.length > 0 && n.id !== 'skills_hub'
        ? `
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin:12px 0 6px;">
            ${n.skills.map(([s]: any) => `<span style="font-family:var(--mono);font-size:10.5px;padding:3px 9px;border-radius:999px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.16);color:var(--ink2);">${s}</span>`).join('')}
          </div>
        `
        : '';

      const items: any[] = CATEGORY_MAP[n.id]
        ? CATEGORY_MAP[n.id].map((id: string) => byId[id]).filter(Boolean)
        : [];

      let sectionLabel = 'Connected Knowledge Nodes';
      if (n.id === 'growth') sectionLabel = 'Project Categories';
      else if (n.id === 'ml_category') sectionLabel = 'Machine Learning Projects';
      else if (n.id === 'ds_category') sectionLabel = 'Data Science Projects';
      else if (n.id === 'web_category') sectionLabel = 'Web Development Projects';
      else if (n.id === 'resume_hub') sectionLabel = 'Curriculum Vitae';

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
        <div class="ghead">
          <button class="gback" data-back="true">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            ${backLabel}
          </button>
          <span class="gchip" style="background:${acc}22;color:${acc};border:1px solid ${acc}55;">
            ${n.kicker || RLAB[n.region]}
          </span>
        </div>

        <div class="gname">${n.name}</div>
        <div class="gdesc">${n.sum || n.body || ''}</div>
        ${customDossierHTML}
        ${actionButtons}
        ${skillsHTML}
        ${items.length > 0 ? `<div class="gcaplab">${sectionLabel} (${items.length})</div>${cardsHTML}` : ''}
      `;

      galleryEl.querySelectorAll('[data-go]').forEach((card: any) => {
        card.onclick = () => {
          const target = card.dataset.go;
          if (target === 'resume_hub') {
            window.location.assign('/resume');
            return;
          }
          setFieldFocus(target);
        };
      });
      galleryEl.querySelectorAll('[data-back]').forEach((btn: any) => {
        btn.onclick = () => {
          if (parentId && byId[parentId]) {
            setFieldFocus(parentId);
          } else {
            goHome();
          }
        };
      });
    }

    // Full editorial overlay removed

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

      if (isTourActive) {
        const easeSpeed = 2.8;
        curCamX += (targetCamX - curCamX) * Math.min(1, dt * easeSpeed);
        curCamY += (targetCamY - curCamY) * Math.min(1, dt * easeSpeed);
        camZoom += (targetCamZoom - camZoom) * Math.min(1, dt * easeSpeed);

        if (!isTourPaused) {
          tourStopElapsed += dt;
          tourTotalElapsed += dt;
          updateTourUI();

          if (tourStopElapsed >= TOUR_STOPS[tourStopIndex].durationSec) {
            if (tourStopIndex < TOUR_STOPS.length - 1) {
              goToTourStop(tourStopIndex + 1);
            } else {
              finishTour();
            }
          }
        }
      } else {
        curCamX += (cx0 - curCamX) * Math.min(1, dt * 2.5);
        curCamY += (cy0 - curCamY) * Math.min(1, dt * 2.5);
      }

      if (mode === 'cold') {
        coldP += dt / 1.0;
        if (coldP >= 1) {
          coldP = 1;
          mode = 'field';
          setFieldFocus('naresh');
        }
        camZoom = lerp(0.6, 1.0, ease(coldP));
      } else if (!isTourActive) {
        camZoom = 1;
      }

      // Continuous ambient celestial rotation (keeps gently revolving)
      if (!isDragging) {
        curRot += dt * (userInteracted ? 0.018 : 0.022);
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

      // 5. Draw Nodes & Labels with dynamic collision avoidance
      const HUB_IDS = new Set(Object.values(REGION_TO_HUB));
      const drawnLabels: DrawnLabelBox[] = [];
      for (let i = 0; i < N.length; i++) {
        const n = N[i] as any;
        const [sx, sy, persp] = proj(n.x, n.y, n.z);
        const R = Math.max(4, n.r * 18 * camZoom * userZoom * persp);
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

        // Node Label with dynamic collision avoidance (never overlaps)
        const isHub = HUB_IDS.has(n.id);
        const isCategoryFocused = fieldSel && fieldSel !== 'naresh';
        const shouldShowLabel =
          isHub ||
          isHover ||
          isSel ||
          (isCategoryFocused && isFocus) ||
          userZoom >= 1.5;

        if (shouldShowLabel) {
          ctx.save();
          const fontSize = isHub
            ? Math.max(11, Math.round(12.5 * LBL))
            : Math.max(9, Math.round(10 * LBL));
          ctx.font = `${isHub || isSel ? '700' : '500'} ${fontSize}px "Martian Mono", monospace`;

          const labelText = isHub ? n.name.toUpperCase() : n.name;
          const textMetrics = ctx.measureText(labelText);
          const textW = textMetrics.width;
          const textH = fontSize;
          const padX = 6, padY = 3.5;

          const preferredPos = (n as any).labelPos || (n.x < -2 ? 'left' : 'right');
          const candidatePositions = [preferredPos, 'top', 'bottom', 'right', 'left'];

          let chosenBox = { boxX: 0, boxY: 0, textX: 0, textY: 0, align: 'left' as CanvasTextAlign };
          let foundNonOverlapping = false;

          for (const pos of candidatePositions) {
            let bX = 0, bY = 0, tX = 0, tY = 0, al: CanvasTextAlign = 'left';
            if (pos === 'top') {
              bX = sx - textW / 2 - padX;
              bY = sy - R - textH - padY * 2 - 6;
              tX = sx;
              tY = sy - R - textH / 2 - padY - 6;
              al = 'center';
            } else if (pos === 'bottom') {
              bX = sx - textW / 2 - padX;
              bY = sy + R + 6;
              tX = sx;
              tY = sy + R + 6 + textH / 2 + padY;
              al = 'center';
            } else if (pos === 'left') {
              bX = sx - R - 8 - textW - padX * 2;
              bY = sy - textH / 2 - padY;
              tX = sx - R - 8 - padX;
              tY = sy;
              al = 'right';
            } else {
              bX = sx + R + 8 - padX;
              bY = sy - textH / 2 - padY;
              tX = sx + R + 8;
              tY = sy;
              al = 'left';
            }

            const candidateRect = {
              id: n.id,
              x1: bX,
              y1: bY,
              x2: bX + textW + padX * 2,
              y2: bY + textH + padY * 2,
            };

            const collides = drawnLabels.some((prev: DrawnLabelBox) =>
              !(candidateRect.x2 + 4 < prev.x1 ||
                candidateRect.x1 - 4 > prev.x2 ||
                candidateRect.y2 + 4 < prev.y1 ||
                candidateRect.y1 - 4 > prev.y2)
            );

            if (!collides) {
              chosenBox = { boxX: bX, boxY: bY, textX: tX, textY: tY, align: al };
              drawnLabels.push(candidateRect);
              foundNonOverlapping = true;
              break;
            }
          }

          if (!foundNonOverlapping) {
            const bX = sx + R + 8 - padX;
            const bY = sy - textH / 2 - padY + (drawnLabels.length % 2 === 0 ? 14 : -14);
            const tX = sx + R + 8;
            const tY = bY + padY + textH / 2;
            chosenBox = { boxX: bX, boxY: bY, textX: tX, textY: tY, align: 'left' };
            drawnLabels.push({ id: n.id, x1: bX, y1: bY, x2: bX + textW + padX * 2, y2: bY + textH + padY * 2 });
          }

          const { boxX, boxY, textX, textY, align } = chosenBox;

          // Frosted background pill for high contrast and zero clutter
          ctx.globalCompositeOperation = 'source-over';
          ctx.fillStyle = LITE ? 'rgba(239, 231, 212, 0.92)' : 'rgba(12, 10, 20, 0.88)';
          ctx.strokeStyle = isSel || isHover ? col : (LITE ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.16)');
          ctx.lineWidth = isSel || isHover ? 1.5 : 0.8;

          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(boxX, boxY, textW + padX * 2, textH + padY * 2, 4);
          } else {
            ctx.rect(boxX, boxY, textW + padX * 2, textH + padY * 2);
          }
          ctx.fill();
          ctx.stroke();

          // High contrast label text
          ctx.fillStyle = isSel || isHover
            ? col
            : (isHub ? (LITE ? '#0A0A0A' : '#FAFAF7') : (LITE ? '#333333' : '#C4C8D8'));
          ctx.textAlign = align;
          ctx.textBaseline = 'middle';
          ctx.fillText(labelText, textX, textY);
          ctx.restore();
        }
      }

      // 6. Draw Minimap Radar (#mini)
      drawMinimap(t);
      // ── DOM sync for #page, #gallery, #pagetop ──
      const isPage = (mode === 'trans' || mode === 'page');
      const pop = isPage ? sat((P - 0.25) / 0.55) : 0;
      pageEl.style.opacity = String(pop);
      pageEl.style.display = (isPage || pop > 0.01) ? 'block' : 'none';
      pageEl.style.pointerEvents = (isPage && P > 0.55) ? 'auto' : 'none';
      docEl.style.transform = 'translateY(' + ((1 - ease(sat((P - 0.3) / 0.7))) * 70) + 'px)';
      if (topEl) {
        const chO = isPage ? sat((P - 0.5) / 0.4) : 0;
        topEl.style.opacity = String(chO);
        topEl.style.pointerEvents = chO > 0.5 ? 'auto' : 'none';
      }
      galleryEl.classList.toggle('show', mode === 'field' && !!galMode);

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
        const nx = cx + (n.x - curCamX) * scale;
        const ny = cy - (n.y - curCamY) * scale;
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
      window.removeEventListener('cosmos-focus', handleCosmosFocus);
      audioEngine.stop();
    };
  }, [theme]);

  return (
    <div ref={containerRef} className="superpower-cosmos-wrapper">
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

      {/* ── 60-Second Guided Flight Tour Overlay ── */}
      <div id="cosmos-tour-overlay" className="cosmos-tour-overlay">
        <div className="tour-card-container">
          <div className="tour-timeline-wrap">
            <div className="tour-timeline-bar">
              <div id="tour-progress-fill" className="tour-progress-fill" style={{ width: '0%' }} />
            </div>
            <div className="tour-timeline-info">
              <span id="tour-time-text" className="tour-time-text">00s / 60s</span>
              <span className="tour-total-label">60s GUIDED FLIGHT TOUR</span>
            </div>
          </div>

          <div id="tour-story-card" className="tour-story-card" />

          <div className="tour-control-bar">
            <div className="tour-step-pills" id="tour-step-pills">
              {TOUR_STOPS.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  className={`tour-step-dot ${idx === 0 ? 'active' : ''}`}
                  data-step={idx}
                  title={`Stop ${idx + 1}: ${s.title}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <div className="tour-nav-btns">
              <button id="tour-prev-btn" className="tour-nav-btn" type="button" title="Previous Stop" aria-label="Previous Stop">
                ◀
              </button>
              <button id="tour-pause-btn" className="tour-nav-btn tour-pause-btn" type="button" title="Pause / Resume" aria-label="Pause / Resume">
                ⏸
              </button>
              <button id="tour-next-btn" className="tour-nav-btn" type="button" title="Next Stop" aria-label="Next Stop">
                ▶
              </button>
              <button id="tour-sound-btn" className="tour-nav-btn tour-sound-btn" type="button" title="Mute / Unmute Audio" aria-label="Mute / Unmute Audio">
                🔊
              </button>
              <button id="tour-close-btn" className="tour-nav-btn tour-exit-btn" type="button" title="Exit Tour" aria-label="Exit Tour">
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Interactive HUD Controls (Easy to Use) ── */}
      <div className="cosmos-hud">
        <div className="hud-hint">
          <span>Drag to orbit</span>
          <span className="dot">·</span>
          <span>Scroll to zoom</span>
          <span className="dot">·</span>
          <span>Click node to inspect</span>
        </div>
        <div className="hud-actions">
          <button
            id="tour-toggle-btn"
            className="tour-hud-btn"
            type="button"
            title="Take 60-Second Guided Flight Tour with Ambient Music"
            aria-label="Take 60-Second Guided Flight Tour with Ambient Music"
          >
            <span className="tour-hud-pulse" />
            <span className="tour-btn-icon">▶</span>
            <span className="tour-btn-text">60s Tour</span>
          </button>
          <button id="reset-orbit" type="button" title="Center View" aria-label="Center View">
            ⟲ Center
          </button>
          <button id="zoom-in" type="button" title="Zoom In" aria-label="Zoom In">
            +
          </button>
          <button id="zoom-out" type="button" title="Zoom Out" aria-label="Zoom Out">
            −
          </button>
        </div>
      </div>
    </div>
  );
}
