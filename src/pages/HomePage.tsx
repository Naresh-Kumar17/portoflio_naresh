import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink, Network } from 'lucide-react';
import { Hero } from '../components/Hero';
import { NicoUniverse } from '../components/NicoUniverse';
import { ScrollReveal, StaggerItem } from '../components/ScrollReveal';
import { MagneticCard } from '../components/MagneticCard';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { TextReveal } from '../components/TextReveal';
import { useI18n } from '../contexts/I18nContext';
import { profile } from '../data/profile';
import { getFeaturedProjects, getMainFeaturedProject, type ProjectStatus } from '../data/projects';
import { skillCategories } from '../data/skills';
import './HomePage.css';

function StatusBadge({ status }: { status: ProjectStatus }) {
  const { t } = useI18n();
  return (
    <span className={`status-badge status-badge--${status}`}>
      {t(`projects.status.${status}`)}
    </span>
  );
}

export function HomePage() {
  const { t } = useI18n();
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const mainProject = getMainFeaturedProject();
  const featuredProjects = getFeaturedProjects().filter((p) => !p.mainFeatured);
  const topSkills = skillCategories
    .flatMap((c) => c.skills)
    .filter((s) => s.status === 'learned')
    .slice(0, 8);

  const learnedCount = skillCategories.flatMap((c) => c.skills).filter((s) => s.status === 'learned').length;

  if (viewMode === 'map') {
    return <NicoUniverse onSwitchToList={() => setViewMode('list')} />;
  }

  return (
    <main>
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 100 }}>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => setViewMode('map')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 30px rgba(155, 143, 255, 0.4)' }}
        >
          <Network size={16} />
          <span>EXPLORE MAP VIEW</span>
        </button>
      </div>

      <Hero />

      {/* ── About Preview ── */}
      <section className="section" id="about-preview">
        <div className="container">
          <ScrollReveal variant="blur">
            <div className="section__header">
              <span className="section__label">{t('about.title')}</span>
              <TextReveal text={t('about.subtitle')} as="h2" className="section__title" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={120} variant="slide" direction="up">
            <div className="home-about">
              <div className="home-about__text">
                {profile.bio.slice(0, 2).map((para, i) => (
                  <ScrollReveal key={i} delay={200 + i * 120} variant="fade" direction="left">
                    <p>{para}</p>
                  </ScrollReveal>
                ))}
                <motion.div
                  whileHover={{ scale: 1.06, x: 6 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  style={{ width: 'fit-content' }}
                >
                  <Link to="/about" className="btn btn--secondary">
                    More about me <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </div>
              <ScrollReveal staggerChildren={100} className="home-about__stats">
                <StaggerItem>
                  <MagneticCard tiltIntensity={8}>
                    <div className="home-about__stat">
                      <AnimatedCounter
                        end={learnedCount}
                        suffix="+"
                        className="home-about__stat-value gradient-text"
                      />
                      <span className="home-about__stat-label">Skills Learned</span>
                    </div>
                  </MagneticCard>
                </StaggerItem>
                <StaggerItem>
                  <MagneticCard tiltIntensity={8}>
                    <div className="home-about__stat">
                      <AnimatedCounter
                        end={profile.university.startYear}
                        className="home-about__stat-value gradient-text"
                        duration={2500}
                      />
                      <span className="home-about__stat-label">Started at FAST</span>
                    </div>
                  </MagneticCard>
                </StaggerItem>
                <StaggerItem>
                  <MagneticCard tiltIntensity={8}>
                    <div className="home-about__stat">
                      <AnimatedCounter
                        end={3}
                        suffix="+"
                        className="home-about__stat-value gradient-text"
                      />
                      <span className="home-about__stat-label">Featured Projects</span>
                    </div>
                  </MagneticCard>
                </StaggerItem>
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Skills Preview ── */}
      <section className="section section--alt" id="skills-preview">
        <div className="container">
          <ScrollReveal variant="blur">
            <div className="section__header">
              <span className="section__label">{t('skills.title')}</span>
              <TextReveal text={t('skills.subtitle')} as="h2" className="section__title" />
            </div>
          </ScrollReveal>
          <ScrollReveal staggerChildren={60} className="home-skills">
            {topSkills.map((skill, index) => (
              <StaggerItem key={skill.name}>
                <motion.div
                  whileHover={{ scale: 1.12, y: -6, rotate: index % 2 === 0 ? 2 : -2 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="home-skill-chip"
                >
                  <span className="home-skill-chip__name">{skill.name}</span>
                </motion.div>
              </StaggerItem>
            ))}
          </ScrollReveal>
          <ScrollReveal delay={300} variant="fade">
            <div style={{ marginTop: 'var(--space-8)', textAlign: 'center' }}>
              <motion.div
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                style={{ display: 'inline-block' }}
              >
                <Link to="/skills" className="btn btn--secondary">
                  View all skills <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section className="section" id="projects-preview">
        <div className="container">
          <ScrollReveal variant="blur">
            <div className="section__header">
              <span className="section__label">{t('projects.title')}</span>
              <TextReveal text={t('projects.subtitle')} as="h2" className="section__title" />
            </div>
          </ScrollReveal>

          {/* Main featured project in 3D MagneticCard */}
          {mainProject && (
            <ScrollReveal delay={120} variant="scale">
              <MagneticCard tiltIntensity={5} className="home-featured-project-wrap">
                <Link to={`/projects/${mainProject.id}`} className="home-featured-project">
                  <div className="home-featured-project__content">
                    <div className="home-featured-project__meta">
                      <motion.span
                        className="tag"
                        animate={{ boxShadow: ['0 0 0px rgba(139,92,246,0)', '0 0 12px rgba(139,92,246,0.4)', '0 0 0px rgba(139,92,246,0)'] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      >
                        {t('projects.featured')}
                      </motion.span>
                      <StatusBadge status={mainProject.status} />
                    </div>
                    <h3 className="home-featured-project__title">{mainProject.title}</h3>
                    <p className="home-featured-project__desc">{mainProject.shortDescription}</p>
                    <div className="home-featured-project__tech">
                      {mainProject.technologies.map((tech) => (
                        <span key={tech} className="tag">{tech}</span>
                      ))}
                    </div>
                    <motion.span
                      className="btn btn--ghost"
                      whileHover={{ x: 6, color: 'var(--accent-primary)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      {t('projects.viewProject')} <ArrowRight size={16} />
                    </motion.span>
                  </div>
                  <div className="home-featured-project__visual">
                    <div className="home-featured-project__placeholder">
                      <svg viewBox="0 0 200 150" aria-hidden="true">
                        <rect x="10" y="10" width="180" height="130" rx="8" fill="none" stroke="var(--border-primary)" strokeWidth="1" />
                        <line x1="30" y1="120" x2="50" y2="60" stroke="var(--violet-400)" strokeWidth="2" opacity="0.6" />
                        <line x1="50" y1="60" x2="70" y2="80" stroke="var(--violet-400)" strokeWidth="2" opacity="0.6" />
                        <line x1="70" y1="80" x2="90" y2="40" stroke="var(--cyan-400)" strokeWidth="2" opacity="0.6" />
                        <line x1="90" y1="40" x2="110" y2="55" stroke="var(--cyan-400)" strokeWidth="2" opacity="0.6" />
                        <line x1="110" y1="55" x2="130" y2="30" stroke="var(--violet-400)" strokeWidth="2" opacity="0.6" />
                        <line x1="130" y1="30" x2="150" y2="50" stroke="var(--violet-400)" strokeWidth="2" opacity="0.6" />
                        <line x1="150" y1="50" x2="170" y2="45" stroke="var(--cyan-400)" strokeWidth="2" opacity="0.6" />
                        <circle cx="30" cy="120" r="3" fill="var(--violet-400)" />
                        <circle cx="50" cy="60" r="3" fill="var(--violet-400)" />
                        <circle cx="70" cy="80" r="3" fill="var(--violet-400)" />
                        <circle cx="90" cy="40" r="3" fill="var(--cyan-400)" />
                        <circle cx="110" cy="55" r="3" fill="var(--cyan-400)" />
                        <circle cx="130" cy="30" r="3" fill="var(--violet-400)" />
                        <circle cx="150" cy="50" r="3" fill="var(--violet-400)" />
                        <circle cx="170" cy="45" r="3" fill="var(--cyan-400)" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </MagneticCard>
            </ScrollReveal>
          )}

          {/* Supporting projects in 3D MagneticCard with stagger */}
          <ScrollReveal staggerChildren={100} className="home-projects-grid">
            {featuredProjects.map((project) => (
              <StaggerItem key={project.id}>
                <MagneticCard tiltIntensity={8}>
                  <Link to={`/projects/${project.id}`} className="home-project-card">
                    <div className="home-project-card__meta">
                      <StatusBadge status={project.status} />
                      {project.date && <span className="home-project-card__date">{project.date}</span>}
                    </div>
                    <h3 className="home-project-card__title">{project.title}</h3>
                    <p className="home-project-card__desc">{project.shortDescription}</p>
                    <div className="home-project-card__tech">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="tag">{tech}</span>
                      ))}
                    </div>
                    <div className="home-project-card__footer">
                      <motion.span
                        className="btn btn--ghost btn--sm"
                        whileHover={{ x: 4 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        {t('projects.viewProject')} <ArrowRight size={14} />
                      </motion.span>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn--ghost btn--sm"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`${project.title} on GitHub`}
                        >
                          <ExternalLink size={14} /> GitHub
                        </a>
                      )}
                    </div>
                  </Link>
                </MagneticCard>
              </StaggerItem>
            ))}
          </ScrollReveal>

          <ScrollReveal delay={250} variant="elastic">
            <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
              <motion.div
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                style={{ display: 'inline-block' }}
              >
                <Link to="/projects" className="btn btn--primary btn--lg">
                  {t('projects.viewAll')} <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="section section--cta">
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal variant="blur" distance={50}>
            <TextReveal
              text={t('contact.subtitle')}
              as="h2"
              className="gradient-text"
              delay={100}
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 120, damping: 18 }}
              style={{ marginBottom: 'var(--space-8)', margin: '0 auto var(--space-8)' }}
            >
              I'm always open to discussing data science, interesting projects, or collaboration opportunities.
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              style={{ display: 'inline-block' }}
            >
              <Link to="/contact" className="btn btn--primary btn--lg">
                {t('contact.title')} <ArrowRight size={18} />
              </Link>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
