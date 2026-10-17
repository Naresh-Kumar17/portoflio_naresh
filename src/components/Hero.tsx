import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, FileText, MessageCircle, Rotate3d, GraduationCap, Sparkles } from 'lucide-react';
import { ThreeHeroCanvas } from './ThreeHeroCanvas';
import { profile } from '../data/profile';
import { useI18n } from '../contexts/I18nContext';
import { useReducedMotion } from '../hooks/useAnimations';
import './Hero.css';

/**
 * ThreeUI / MotionSites inspired Hero Section
 * High-craft typography, real student focus, tech stack ribbon,
 * and an interactive 3D Data Core centerpiece with drag-to-spin physics.
 */
export function Hero() {
  const { t } = useI18n();
  const reducedMotion = useReducedMotion();

  const springTransition = {
    type: 'spring' as const,
    stiffness: 120,
    damping: 18,
    mass: 0.7,
  };

  const techBadges = ['Python', 'SQL', 'pandas', 'NumPy', 'scikit-learn', 'Three.js'];

  return (
    <section className="hero" id="hero" aria-label="Introduction">
      {/* Subtle ambient lighting orbs */}
      <div className="hero__orb hero__orb--violet" aria-hidden="true" />
      <div className="hero__orb hero__orb--cyan" aria-hidden="true" />

      <div className="hero__content container">
        <div className="hero__grid">
          {/* Left Column: Authentic Content & Action */}
          <div className="hero__text">
            {/* Status Pill */}
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.05 }}
              className="hero__status-badge"
            >
              <span className="hero__status-dot" aria-hidden="true" />
              <span>BS Data Science • FAST-NUCES Karachi</span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.15 }}
              className="hero__heading-wrap"
            >
              <span className="hero__greeting">
                {profile.name} <span className="hero__slash">/</span> BS Data Science
              </span>
              <h1 className="hero__headline">
                Turning complex data into <em>meaningful stories</em> & <em>predictive intelligence</em>.
              </h1>
            </motion.div>

            {/* Subtitle / Bio summary */}
            <motion.p
              initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.25 }}
              className="hero__description"
            >
              Undergraduate Data Science student focused on exploratory data pipelines, statistical modeling, and applied machine learning architectures.
            </motion.p>

            {/* Tech Stack Ribbon */}
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.32 }}
              className="hero__tech-ribbon"
            >
              <span className="hero__tech-label">Core Stack:</span>
              <div className="hero__tech-chips">
                {techBadges.map((tech) => (
                  <span key={tech} className="hero__tech-chip">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.4 }}
              className="hero__actions"
            >
              <motion.div
                whileHover={reducedMotion ? {} : { scale: 1.03, y: -2 }}
                whileTap={reducedMotion ? {} : { scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <Link to="/projects" className="btn btn--primary btn--lg">
                  {t('hero.cta.projects')}
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={reducedMotion ? {} : { scale: 1.03, y: -2 }}
                whileTap={reducedMotion ? {} : { scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <Link to="/resume" className="btn btn--secondary btn--lg">
                  <FileText size={18} aria-hidden="true" />
                  <span>Resume / CV</span>
                </Link>
              </motion.div>

              <motion.div
                whileHover={reducedMotion ? {} : { scale: 1.03, y: -2 }}
                whileTap={reducedMotion ? {} : { scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <Link to="/contact" className="btn btn--outline btn--lg">
                  <MessageCircle size={18} aria-hidden="true" />
                  <span>{t('hero.cta.contact')}</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: ThreeUI 3D Interactive Centerpiece */}
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...springTransition, delay: 0.2 }}
            className="hero__visual"
          >
            <div className="hero__3d-stage">
              {/* Interactive 3D Canvas */}
              <ThreeHeroCanvas />

              {/* Interactive Helper Badge */}
              <div className="hero__3d-badge">
                <Rotate3d size={14} className="hero__3d-badge-icon" />
                <span>Interactive 3D Data Core • Drag to rotate</span>
              </div>

              {/* Corner Metadata Chips */}
              <div className="hero__3d-chip hero__3d-chip--top">
                <GraduationCap size={15} />
                <span>FAST-NUCES '29</span>
              </div>

              <div className="hero__3d-chip hero__3d-chip--bottom">
                <Sparkles size={14} />
                <span>Statistical Modeling & ML</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        animate={reducedMotion ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="hero__scroll"
        aria-hidden="true"
      >
        <span className="hero__scroll-text">Scroll to explore</span>
        <div className="hero__scroll-line" />
      </motion.div>
    </section>
  );
}
