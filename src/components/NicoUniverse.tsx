import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Compass } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { profile } from '../data/profile';
import './NicoUniverse.css';

/* ── Types & Interfaces ── */
export interface MapNode {
  id: string;
  label: string;
  category: 'core' | 'data' | 'ai' | 'projects' | 'education' | 'connect';
  hubId?: string;
  x: number;
  y: number;
  radius: number;
  title: string;
  lead: string;
  details?: string;
  tags?: string[];
  meta?: { label: string; value: string }[];
  link?: string;
  github?: string;
  demo?: string;
  date?: string;
}

interface Edge {
  from: string;
  to: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  core: '#9B8FFF',     // Signature Iris Lavender
  data: '#00B0CD',     // Data Stream Cyan
  ai: '#E84FD0',       // Neural Magenta / Pink
  projects: '#CFFF04', // Cyber Citron / Acid Lime
  education: '#FF6A3D',// Coral Sunset
  connect: '#9B8FFF',  // Lavender Accent
};

export function NicoUniverse({ onSwitchToList }: { onSwitchToList?: () => void }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const miniCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Active state
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [hoveredNode, setHoveredNode] = useState<MapNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<MapNode | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Camera State (world coordinates)
  const cameraRef = useRef({
    x: 0,
    y: 0,
    zoom: 1.0,
    targetX: 0,
    targetY: 0,
    targetZoom: 1.0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    camStartX: 0,
    camStartY: 0,
  });

  /* ── 1. Define Network Nodes & Constellation Graph ── */
  const { nodes, edges, hubs } = useMemo(() => {
    const n: MapNode[] = [
      // ── Core Center Hub ──
      {
        id: 'naresh',
        label: 'NARESH KUMAR',
        category: 'core',
        x: 0,
        y: 0,
        radius: 28,
        title: 'Naresh Kumar',
        lead: 'Undergraduate Data Science student at FAST-NUCES Karachi focused on exploratory data pipelines, statistical modeling, and machine learning architectures.',
        details: 'Bridging algorithmic theory and empirical intelligence to discover insights hidden in complex datasets.',
        meta: [
          { label: 'ROLE', value: 'Data Science Researcher' },
          { label: 'UNIVERSITY', value: 'FAST-NUCES Karachi' },
          { label: 'FOCUS', value: 'Statistical AI & Data Storytelling' },
          { label: 'GRADUATION', value: '2029 (Expected)' },
        ],
        tags: ['Python', 'SQL', 'pandas', 'scikit-learn', 'Three.js'],
      },

      // ── Hub 1: Data Science Hub (Top-Right) ──
      {
        id: 'hub_data',
        label: 'DATA SCIENCE',
        category: 'data',
        x: 280,
        y: -180,
        radius: 20,
        title: 'Data Science & Statistical Modeling',
        lead: 'Comprehensive pipeline engineering from ingestion, wrangling, and feature synthesis to predictive inference.',
        details: 'Mastering numerical computing and distribution analytics to answer critical real-world questions.',
        tags: ['Exploratory Analysis', 'Feature Engineering', 'Statistical Testing'],
      },
      {
        id: 'eda_pipeline',
        label: 'EDA Pipeline',
        category: 'data',
        hubId: 'hub_data',
        x: 420,
        y: -230,
        radius: 13,
        title: 'Exploratory Data Analysis Pipeline',
        lead: 'Automated data cleaning, outlier detection, and statistical correlation matrix generators.',
        details: 'Engineered a repeatable framework that accelerated data preparation cycles by 60% with full audit reporting.',
        tags: ['pandas', 'NumPy', 'Seaborn', 'Matplotlib'],
        demo: '/projects/exploratory-data-analysis',
      },
      {
        id: 'data_viz',
        label: 'Data Visualizer',
        category: 'data',
        hubId: 'hub_data',
        x: 340,
        y: -310,
        radius: 12,
        title: 'Interactive Telemetry Visualizer',
        lead: 'Custom SVG & Canvas visual analytical engines with live variance and correlation sliders.',
        tags: ['Data Viz', 'Telemetry', 'SVG', 'Math Models'],
      },
      {
        id: 'sql_analytics',
        label: 'SQL & Modeling',
        category: 'data',
        hubId: 'hub_data',
        x: 440,
        y: -110,
        radius: 11,
        title: 'Relational Database Intelligence',
        lead: 'Complex window queries, analytical CTEs, schema optimization, and normalized data warehouse models.',
        tags: ['PostgreSQL', 'SQLite', 'Database Schemas'],
      },

      // ── Hub 2: Machine Learning Hub (Right-Bottom) ──
      {
        id: 'hub_ai',
        label: 'MACHINE LEARNING',
        category: 'ai',
        x: 320,
        y: 190,
        radius: 20,
        title: 'Applied Machine Learning & AI',
        lead: 'Supervised and unsupervised architectures designed for high recall, precision, and reliable real-time inference.',
        tags: ['scikit-learn', 'PyTorch', 'Model Evaluation', 'Hyperparameter Tuning'],
      },
      {
        id: 'churn_ai',
        label: 'Churn Intelligence',
        category: 'ai',
        hubId: 'hub_ai',
        x: 480,
        y: 160,
        radius: 14,
        title: 'Customer Churn Prediction Engine',
        lead: 'Predictive retention classification engine delivering 87% ROC-AUC on enterprise subscriber telemetry.',
        details: 'Identified key drivers of churn using SHAP feature importance analysis and actionable customer cohort clustering.',
        tags: ['Random Forest', 'XGBoost', 'scikit-learn', 'SHAP'],
        demo: '/projects/customer-churn-prediction',
      },
      {
        id: 'med_img',
        label: 'Medical Imaging',
        category: 'ai',
        hubId: 'hub_ai',
        x: 420,
        y: 280,
        radius: 13,
        title: 'Medical Image Classification',
        lead: 'Deep convolutional neural network architecture for automated radiological anomaly detection.',
        tags: ['PyTorch', 'CNN', 'Computer Vision', 'Deep Learning'],
        demo: '/projects/medical-image-classification',
      },
      {
        id: 'house_pred',
        label: 'Housing Valuation',
        category: 'ai',
        hubId: 'hub_ai',
        x: 260,
        y: 320,
        radius: 12,
        title: 'Predictive Real Estate Valuation',
        lead: 'Gradient boosted regression engine modeling multidimensional urban property price indices.',
        tags: ['Regression', 'Gradient Boosting', 'Feature Engineering'],
        demo: '/projects/housing-price-prediction',
      },

      // ── Hub 3: Education & Academic (Left-Bottom) ──
      {
        id: 'hub_edu',
        label: 'FAST-NUCES',
        category: 'education',
        x: -300,
        y: 170,
        radius: 20,
        title: 'National University of Computer & Emerging Sciences',
        lead: 'Enrolled in premier Data Science undergraduate program at FAST-NUCES Karachi Campus.',
        details: 'Rigorous academic focus on linear algebra, discrete math, multivariable calculus, and algorithmic efficiency.',
        meta: [
          { label: 'DEGREE', value: 'BS Data Science' },
          { label: 'YEARS', value: '2025 — 2029' },
          { label: 'LOCATION', value: 'Karachi, Pakistan' },
        ],
        tags: ['FAST-NUCES', 'Academic Excellence', 'Algorithms'],
      },
      {
        id: 'edu_courses',
        label: 'Core Coursework',
        category: 'education',
        hubId: 'hub_edu',
        x: -430,
        y: 120,
        radius: 11,
        title: 'Foundational Coursework',
        lead: 'Data Structures, Probability & Statistics, Linear Algebra, Machine Learning Theory.',
        tags: ['Linear Algebra', 'Calculus', 'Probability'],
      },
      {
        id: 'edu_fast',
        label: 'Karachi Campus',
        category: 'education',
        hubId: 'hub_edu',
        x: -390,
        y: 270,
        radius: 11,
        title: 'Campus Research & Labs',
        lead: 'Collaborative development in state-of-the-art computing laboratories and research groups.',
        tags: ['Research', 'Collab', 'Computing Labs'],
      },

      // ── Hub 4: Projects Showcase (Top-Left) ──
      {
        id: 'hub_projects',
        label: 'PROJECT LABS',
        category: 'projects',
        x: -260,
        y: -190,
        radius: 20,
        title: 'Project Showcases & Case Studies',
        lead: 'End-to-end analytical solutions, public GitHub repositories, and interactive web deployments.',
        tags: ['Open Source', 'Case Studies', 'Interactive Demos'],
      },
      {
        id: 'proj_overview',
        label: 'All Projects (5+)',
        category: 'projects',
        hubId: 'hub_projects',
        x: -390,
        y: -140,
        radius: 12,
        title: 'Project Portfolio Archive',
        lead: 'Explore detailed methodology documentation, code snippets, and verification datasets.',
        tags: ['Case Studies', 'Insights', 'Pipelines'],
      },
      {
        id: 'proj_3d',
        label: '3D Telemetry Canvas',
        category: 'projects',
        hubId: 'hub_projects',
        x: -340,
        y: -290,
        radius: 12,
        title: 'WebGL Generative Art Core',
        lead: 'Physics-driven geodesic data core built in Three.js with custom shader illumination.',
        tags: ['Three.js', 'WebGL', 'Generative Art'],
      },

      // ── Hub 5: Connections & Links (Top-Center) ──
      {
        id: 'hub_connect',
        label: 'CONNECT',
        category: 'connect',
        x: 0,
        y: -300,
        radius: 18,
        title: "Let's Connect & Collaborate",
        lead: 'Open for research inquiries, internship opportunities, and collaborative data science projects.',
        meta: [
          { label: 'EMAIL', value: profile.contact.email },
          { label: 'GITHUB', value: profile.contact.github },
          { label: 'LINKEDIN', value: profile.contact.linkedin },
        ],
        tags: ['Collaborations', 'Inquiries', 'Open Source'],
      },
      {
        id: 'link_github',
        label: 'GitHub Repo',
        category: 'connect',
        hubId: 'hub_connect',
        x: -120,
        y: -380,
        radius: 12,
        title: 'GitHub Repositories',
        lead: 'Browse open-source codebases, notebooks, and reproducible experiment pipelines.',
        link: profile.contact.github,
        tags: ['GitHub', 'Git', 'Open Source'],
      },
      {
        id: 'link_linkedin',
        label: 'LinkedIn Profile',
        category: 'connect',
        hubId: 'hub_connect',
        x: 120,
        y: -380,
        radius: 12,
        title: 'LinkedIn Network',
        lead: 'Professional timeline, achievements, and academic milestones.',
        link: profile.contact.linkedin,
        tags: ['LinkedIn', 'Networking'],
      },
    ];

    const e: Edge[] = [
      // Core to Domain Hubs
      { from: 'naresh', to: 'hub_data' },
      { from: 'naresh', to: 'hub_ai' },
      { from: 'naresh', to: 'hub_edu' },
      { from: 'naresh', to: 'hub_projects' },
      { from: 'naresh', to: 'hub_connect' },

      // Cross-Hub Connectors (Nico Borja Constellation style)
      { from: 'hub_data', to: 'hub_ai' },
      { from: 'hub_ai', to: 'hub_edu' },
      { from: 'hub_edu', to: 'hub_projects' },
      { from: 'hub_projects', to: 'hub_connect' },
      { from: 'hub_data', to: 'hub_connect' },

      // Data Hub Children
      { from: 'hub_data', to: 'eda_pipeline' },
      { from: 'hub_data', to: 'data_viz' },
      { from: 'hub_data', to: 'sql_analytics' },
      { from: 'eda_pipeline', to: 'data_viz' },

      // AI Hub Children
      { from: 'hub_ai', to: 'churn_ai' },
      { from: 'hub_ai', to: 'med_img' },
      { from: 'hub_ai', to: 'house_pred' },
      { from: 'churn_ai', to: 'house_pred' },

      // Education Hub Children
      { from: 'hub_edu', to: 'edu_courses' },
      { from: 'hub_edu', to: 'edu_fast' },

      // Projects Hub Children
      { from: 'hub_projects', to: 'proj_overview' },
      { from: 'hub_projects', to: 'proj_3d' },

      // Connect Hub Children
      { from: 'hub_connect', to: 'link_github' },
      { from: 'hub_connect', to: 'link_linkedin' },
    ];

    const h = n.filter(item => !item.hubId);

    return { nodes: n, edges: e, hubs: h };
  }, []);

  /* ── 2. Background Starfield Setup ── */
  const stars = useMemo(() => {
    return Array.from({ length: 140 }, () => ({
      x: (Math.random() - 0.5) * 2600,
      y: (Math.random() - 0.5) * 2600,
      size: 0.6 + Math.random() * 1.6,
      brightness: 0.2 + Math.random() * 0.8,
      speed: 0.0003 + Math.random() * 0.0006,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  /* ── 3. Smooth Camera Navigation & Zooming ── */
  const focusNode = useCallback((node: MapNode, targetZoom = 1.25) => {
    cameraRef.current.targetX = -node.x;
    cameraRef.current.targetY = -node.y;
    cameraRef.current.targetZoom = targetZoom;
  }, []);

  const resetView = useCallback(() => {
    cameraRef.current.targetX = 0;
    cameraRef.current.targetY = 0;
    cameraRef.current.targetZoom = 1.0;
    setSelectedTab('all');
  }, []);

  /* ── 4. Main Canvas Rendering Loop ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      time += 0.016;

      // Smooth Camera Interpolation (Spring-like lerp)
      const cam = cameraRef.current;
      cam.x += (cam.targetX - cam.x) * 0.08;
      cam.y += (cam.targetY - cam.y) * 0.08;
      cam.zoom += (cam.targetZoom - cam.zoom) * 0.08;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Deep Obsidian Canvas Background
      const isDark = theme === 'dark';
      ctx.fillStyle = isDark ? '#100E1A' : '#F6F5F0';
      ctx.fillRect(0, 0, width, height);

      // Translate to center + camera offset
      const cx = width / 2;
      const cy = height / 2;
      ctx.translate(cx, cy);
      ctx.scale(cam.zoom, cam.zoom);
      ctx.translate(cam.x, cam.y);

      // ── A. Render Ambient Stars ──
      for (const s of stars) {
        const pulse = 0.5 + 0.5 * Math.sin(time * 2 + s.phase);
        const alpha = s.brightness * (0.3 + 0.7 * pulse);
        ctx.fillStyle = isDark
          ? `rgba(180, 175, 220, ${alpha * 0.75})`
          : `rgba(90, 80, 110, ${alpha * 0.5})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── B. Render Concentric Domain Orbits & Boundaries ──
      for (const hub of hubs) {
        if (hub.id === 'naresh') {
          // Central breathing halo
          ctx.strokeStyle = isDark ? 'rgba(155, 143, 255, 0.12)' : 'rgba(112, 94, 255, 0.1)';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 6]);
          ctx.beginPath();
          ctx.arc(hub.x, hub.y, 140 + Math.sin(time) * 4, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
        } else {
          // Domain boundary ring
          const col = CATEGORY_COLORS[hub.category] || '#9B8FFF';
          ctx.strokeStyle = `${col}22`;
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 5]);
          ctx.beginPath();
          ctx.arc(hub.x, hub.y, 90, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // ── C. Render Constellation Curved Telemetry Lines ──
      for (const edge of edges) {
        const source = nodes.find(n => n.id === edge.from);
        const target = nodes.find(n => n.id === edge.to);
        if (!source || !target) continue;

        const isFiltered =
          selectedTab === 'all' ||
          source.category === selectedTab ||
          target.category === selectedTab ||
          source.id === 'naresh';

        const strokeAlpha = isFiltered ? (isDark ? 0.35 : 0.25) : 0.06;
        const color = CATEGORY_COLORS[target.category] || '#9B8FFF';

        ctx.strokeStyle = `${color}${Math.round(strokeAlpha * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = isFiltered ? 1.4 : 0.8;

        // Elegant curved dotted arc
        const midX = (source.x + target.x) / 2 + (target.y - source.y) * 0.08;
        const midY = (source.y + target.y) / 2 - (target.x - source.x) * 0.08;

        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.quadraticCurveTo(midX, midY, target.x, target.y);
        ctx.stroke();

        // Flowing data packet along curve
        if (isFiltered) {
          const tPacket = (time * 0.4 + (source.x % 10) * 0.1) % 1;
          const px = (1 - tPacket) * (1 - tPacket) * source.x + 2 * (1 - tPacket) * tPacket * midX + tPacket * tPacket * target.x;
          const py = (1 - tPacket) * (1 - tPacket) * source.y + 2 * (1 - tPacket) * tPacket * midY + tPacket * tPacket * target.y;

          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(px, py, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── D. Render Nodes & Floating Labels ──
      for (const node of nodes) {
        const isHovered = hoveredNode?.id === node.id;
        const isSelected = selectedNode?.id === node.id;
        const isFiltered = selectedTab === 'all' || node.category === selectedTab || node.id === 'naresh';
        const col = CATEGORY_COLORS[node.category] || '#9B8FFF';

        const nodeAlpha = isFiltered ? 1 : 0.25;

        ctx.save();
        ctx.globalAlpha = nodeAlpha;

        // Outer glow on hover or hub
        if (isHovered || isSelected || node.radius > 16) {
          const glowRad = node.radius * (isHovered ? 2.4 : 1.8);
          const grad = ctx.createRadialGradient(node.x, node.y, node.radius * 0.5, node.x, node.y, glowRad);
          grad.addColorStop(0, `${col}66`);
          grad.addColorStop(1, `${col}00`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(node.x, node.y, glowRad, 0, Math.PI * 2);
          ctx.fill();
        }

        // Concentric outer pulsing ring for Hubs
        if (node.radius >= 18) {
          ctx.strokeStyle = `${col}88`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 5 + Math.sin(time * 3 + node.x) * 2, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Inner solid core
        ctx.fillStyle = isHovered ? '#FFFFFF' : col;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        // Inner rim border
        ctx.strokeStyle = isDark ? '#100E1A' : '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Node Label (Monospace architectural typography)
        ctx.font = node.radius >= 18
          ? '600 11.5px "JetBrains Mono", monospace'
          : '500 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.letterSpacing = '0.08em';

        // Label shadow for legibility
        ctx.shadowColor = isDark ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)';
        ctx.shadowBlur = 4;
        ctx.fillStyle = isDark
          ? (isHovered ? '#FFFFFF' : 'rgba(250, 250, 247, 0.88)')
          : (isHovered ? '#000000' : 'rgba(16, 14, 26, 0.88)');

        ctx.fillText(node.label, node.x, node.y + node.radius + 7);
        ctx.restore();
      }

      ctx.restore();

      // Render minimap sync
      renderMinimap();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [nodes, edges, hubs, stars, hoveredNode, selectedNode, selectedTab, theme]);

  /* ── 5. Render Minimap Radar ── */
  const renderMinimap = useCallback(() => {
    const mini = miniCanvasRef.current;
    if (!mini) return;
    const mctx = mini.getContext('2d');
    if (!mctx) return;

    const w = mini.clientWidth;
    const h = mini.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    if (mini.width !== w * dpr || mini.height !== h * dpr) {
      mini.width = w * dpr;
      mini.height = h * dpr;
    }

    mctx.save();
    mctx.scale(dpr, dpr);
    mctx.clearRect(0, 0, w, h);

    const isDark = theme === 'dark';

    // Map bounds
    const scale = 0.12;
    const mcx = w / 2;
    const mcy = h / 2;

    // Subtle radar grid line
    mctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
    mctx.lineWidth = 1;
    mctx.beginPath();
    mctx.arc(mcx, mcy, 45, 0, Math.PI * 2);
    mctx.stroke();

    // Draw all node dots
    for (const node of nodes) {
      const nx = mcx + node.x * scale;
      const ny = mcy + node.y * scale;
      const col = CATEGORY_COLORS[node.category] || '#9B8FFF';

      mctx.fillStyle = col;
      mctx.beginPath();
      mctx.arc(nx, ny, node.radius > 16 ? 3.5 : 2, 0, Math.PI * 2);
      mctx.fill();
    }

    // Viewport box
    const cam = cameraRef.current;
    const viewW = (window.innerWidth / cam.zoom) * scale;
    const viewH = (window.innerHeight / cam.zoom) * scale;
    const vx = mcx + (-cam.x) * scale - viewW / 2;
    const vy = mcy + (-cam.y) * scale - viewH / 2;

    mctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.4)';
    mctx.lineWidth = 1.2;
    mctx.strokeRect(vx, vy, viewW, viewH);

    mctx.restore();
  }, [nodes, theme]);

  /* ── 6. Mouse & Touch Interactions ── */
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only drag with left click
    if (e.button !== 0) return;
    const cam = cameraRef.current;
    cam.isDragging = true;
    cam.dragStartX = e.clientX;
    cam.dragStartY = e.clientY;
    cam.camStartX = cam.targetX;
    cam.camStartY = cam.targetY;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setMousePos({ x: e.clientX, y: e.clientY });

    const cam = cameraRef.current;

    // Handle Pan Dragging
    if (cam.isDragging) {
      const deltaX = (e.clientX - cam.dragStartX) / cam.zoom;
      const deltaY = (e.clientY - cam.dragStartY) / cam.zoom;
      cam.targetX = cam.camStartX + deltaX;
      cam.targetY = cam.camStartY + deltaY;
      return;
    }

    // Hover Detection
    const rect = canvas.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const mouseWorldX = (e.clientX - rect.left - cx) / cam.zoom - cam.x;
    const mouseWorldY = (e.clientY - rect.top - cy) / cam.zoom - cam.y;

    let found: MapNode | null = null;
    for (const node of nodes) {
      const dist = Math.hypot(node.x - mouseWorldX, node.y - mouseWorldY);
      if (dist <= node.radius + 6) {
        found = node;
        break;
      }
    }

    setHoveredNode(found);
    canvas.style.cursor = found ? 'pointer' : (cam.isDragging ? 'grabbing' : 'grab');
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const cam = cameraRef.current;
    const dragDist = Math.hypot(e.clientX - cam.dragStartX, e.clientY - cam.dragStartY);
    cam.isDragging = false;

    // If it was a quick click and not a drag, open the hovered node
    if (dragDist < 6 && hoveredNode) {
      handleNodeClick(hoveredNode);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const cam = cameraRef.current;
    const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
    cam.targetZoom = Math.max(0.4, Math.min(2.5, cam.targetZoom * zoomFactor));
  };

  const handleNodeClick = (node: MapNode) => {
    focusNode(node, 1.4);
    setSelectedNode(node);
  };

  const handleTabClick = (category: string) => {
    setSelectedTab(category);
    if (category === 'all') {
      resetView();
    } else {
      const targetHub = hubs.find(h => h.category === category);
      if (targetHub) {
        focusNode(targetHub, 1.15);
      }
    }
  };

  return (
    <div className="nico-universe" onWheel={handleWheel}>
      {/* ── Main Constellation Canvas & Radial Vignette ── */}
      <canvas
        ref={canvasRef}
        className="nico-canvas"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />
      <div className="nico-vig" />

      {/* ── Top Left Wordmark ── */}
      <div className="nico-wordmark" onClick={resetView}>
        <span className="nico-wordmark__title">{profile.name}</span>
        <span className="nico-wordmark__subtitle">Data Science • FAST-NUCES</span>
      </div>

      {/* ── Minimap Radar (Top Left) ── */}
      <div className="nico-minimap-wrap">
        <div className="nico-minilbl">
          <span className="nico-minilbl__dot" />
          <span>SITE MAP · you are here</span>
        </div>
        <canvas
          ref={miniCanvasRef}
          className="nico-minimap"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = (e.clientX - rect.left - rect.width / 2) / 0.12;
            const clickY = (e.clientY - rect.top - rect.height / 2) / 0.12;
            cameraRef.current.targetX = -clickX;
            cameraRef.current.targetY = -clickY;
          }}
        />
      </div>

      {/* ── Top Center Filter Tabs (Nico Borja Frosted Capsules) ── */}
      <nav className="nico-tabs" aria-label="Explore network areas">
        <button
          type="button"
          className={`nico-tab ${selectedTab === 'all' ? 'on' : ''}`}
          onClick={() => handleTabClick('all')}
        >
          <i style={{ background: '#FFFFFF' }} />
          <span>ALL</span>
        </button>
        <button
          type="button"
          className={`nico-tab ${selectedTab === 'data' ? 'on' : ''}`}
          onClick={() => handleTabClick('data')}
        >
          <i style={{ background: CATEGORY_COLORS.data }} />
          <span>DATA SCIENCE</span>
        </button>
        <button
          type="button"
          className={`nico-tab ${selectedTab === 'ai' ? 'on' : ''}`}
          onClick={() => handleTabClick('ai')}
        >
          <i style={{ background: CATEGORY_COLORS.ai }} />
          <span>MACHINE LEARNING</span>
        </button>
        <button
          type="button"
          className={`nico-tab ${selectedTab === 'projects' ? 'on' : ''}`}
          onClick={() => handleTabClick('projects')}
        >
          <i style={{ background: CATEGORY_COLORS.projects }} />
          <span>PROJECTS</span>
        </button>
        <button
          type="button"
          className={`nico-tab ${selectedTab === 'education' ? 'on' : ''}`}
          onClick={() => handleTabClick('education')}
        >
          <i style={{ background: CATEGORY_COLORS.education }} />
          <span>EDUCATION</span>
        </button>
        <button
          type="button"
          className={`nico-tab ${selectedTab === 'connect' ? 'on' : ''}`}
          onClick={() => handleTabClick('connect')}
        >
          <i style={{ background: CATEGORY_COLORS.connect }} />
          <span>CONNECT</span>
        </button>
      </nav>

      {/* ── Top Right Controls: View Switcher & Theme Toggle ── */}
      <div className="nico-top-right">
        {onSwitchToList && (
          <button
            type="button"
            className="nico-btn-pill"
            onClick={onSwitchToList}
            title="Switch to Editorial Scroll View"
          >
            <Compass size={14} />
            <span>LIST VIEW</span>
          </button>
        )}
        <button
          type="button"
          className="nico-btn-pill"
          onClick={toggleTheme}
          aria-label="Toggle Light/Dark Theme"
        >
          <span>{theme === 'dark' ? '☀ LIGHT' : '☾ DARK'}</span>
        </button>
      </div>

      {/* ── Floating Tooltip on Hover (#tip) ── */}
      {hoveredNode && (
        <div
          className={`nico-tip ${hoveredNode ? 'visible' : ''}`}
          style={{ left: mousePos.x, top: mousePos.y }}
        >
          <div className="nico-tip__name">
            <span
              className="nico-tip__dot"
              style={{ background: CATEGORY_COLORS[hoveredNode.category] }}
            />
            <span>{hoveredNode.title}</span>
          </div>
          <div className="nico-tip__category">
            {hoveredNode.category.toUpperCase()} • CLICK TO OPEN ↗
          </div>
        </div>
      )}

      {/* ── Bottom Radar Controls & Hint ── */}
      <div className="nico-bottom-bar">
        <span>DRAG TO PAN • SCROLL TO ZOOM • CLICK ANY NODE TO EXPLORE</span>
      </div>

      {/* ── Slide-Over Document Sheet (#page & #doc) ── */}
      <div
        className={`nico-sheet ${selectedNode ? 'open' : ''}`}
        aria-hidden={!selectedNode}
      >
        {/* Spacer top click to return to the map */}
        <div
          className="nico-sheet__spacer"
          onClick={() => setSelectedNode(null)}
          title="Click to return to the map"
        >
          <span className="nico-sheet__ret-hint">↖ CLICK HERE TO RETURN TO THE MAP</span>
        </div>

        {/* Document Content */}
        {selectedNode && (
          <div className="nico-sheet__doc">
            <div className="nico-sheet__topbar">
              <button
                type="button"
                className="nico-sheet__back-btn"
                onClick={() => setSelectedNode(null)}
              >
                <ArrowLeft size={14} />
                <span>BACK TO THE MAP</span>
              </button>
              <span className="nico-sheet__number">
                {selectedNode.category.toUpperCase()} // NODE
              </span>
            </div>

            <div className="nico-sheet__category">
              {selectedNode.category.toUpperCase()}
            </div>
            <h1 className="nico-sheet__title">{selectedNode.title}</h1>
            <p className="nico-sheet__lead">{selectedNode.lead}</p>

            {/* Metadata Strip */}
            {selectedNode.meta && selectedNode.meta.length > 0 && (
              <div className="nico-sheet__meta">
                {selectedNode.meta.map((m, i) => (
                  <div key={i} className="nico-sheet__meta-item">
                    <div className="nico-sheet__meta-k">{m.label}</div>
                    <div className="nico-sheet__meta-v">{m.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Detailed Body Copy */}
            {selectedNode.details && (
              <div className="nico-sheet__body">
                <h2 className="nico-sheet__subheading">Architecture & Approach</h2>
                <p>{selectedNode.details}</p>
              </div>
            )}

            {/* Tags */}
            {selectedNode.tags && (
              <div className="nico-sheet__tags">
                {selectedNode.tags.map(t => (
                  <span key={t} className="nico-sheet__tag">
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="nico-sheet__actions">
              {selectedNode.demo && (
                <button
                  type="button"
                  className="nico-sheet__btn nico-sheet__btn--primary"
                  onClick={() => navigate(selectedNode.demo!)}
                >
                  <span>VIEW CASE STUDY</span>
                  <ExternalLink size={14} />
                </button>
              )}
              {selectedNode.link && (
                <a
                  href={selectedNode.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nico-sheet__btn nico-sheet__btn--secondary"
                >
                  <span>OPEN EXTERNAL LINK</span>
                  <ExternalLink size={14} />
                </a>
              )}
              <button
                type="button"
                className="nico-sheet__btn nico-sheet__btn--secondary"
                onClick={() => setSelectedNode(null)}
              >
                <span>RETURN TO NETWORK</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
