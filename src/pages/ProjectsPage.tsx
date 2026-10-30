import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { Search, ExternalLink, ArrowRight, Filter } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { MagneticCard } from '../components/MagneticCard';
import { GithubIcon } from '../components/SocialIcons';
import { TextReveal } from '../components/TextReveal';
import { useI18n } from '../contexts/I18nContext';
import { projects } from '../data/projects';
import './ProjectsPage.css';

export function ProjectsPage() {
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category filter
      if (selectedCategory !== 'all' && project.category !== selectedCategory) {
        return false;
      }
      // Status filter
      if (selectedStatus !== 'all' && project.status !== selectedStatus) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesDesc = project.shortDescription.toLowerCase().includes(query);
        const matchesTech = project.technologies.some((tech) =>
          tech.toLowerCase().includes(query)
        );
        return matchesTitle || matchesDesc || matchesTech;
      }
      return true;
    });
  }, [selectedCategory, selectedStatus, searchQuery]);

  const categories: { label: string; value: string }[] = [
    { label: 'All Projects', value: 'all' },
    { label: 'Machine Learning', value: 'machine-learning' },
    { label: 'Data Science', value: 'data-science' },
    { label: 'Web Development', value: 'web' },
  ];

  const statuses: { label: string; value: string }[] = [
    { label: 'All Statuses', value: 'all' },
    { label: t('projects.status.completed'), value: 'completed' },
    { label: t('projects.status.in-progress'), value: 'in-progress' },
    { label: t('projects.status.planned'), value: 'planned' },
  ];

  return (
    <main className="page projects-page">
      <div className="container">
        <ScrollReveal variant="blur">
          <header className="page__header">
            <span className="section__label">{t('projects.label')}</span>
            <TextReveal as="h1" className="page__title">
              {t('projects.title')}
            </TextReveal>
            <p className="page__description">{t('projects.subtitle')}</p>
          </header>
        </ScrollReveal>

        {/* Filter controls */}
        <ScrollReveal delay={0.1}>
          <div className="projects-controls">
            {/* Search bar */}
            <div className="projects-search">
              <Search size={18} className="projects-search__icon" />
              <input
                type="text"
                placeholder={t('projects.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="projects-search__input"
                aria-label={t('projects.searchPlaceholder')}
              />
            </div>

            {/* Category tabs */}
            <LayoutGroup id="project-categories">
              <div className="filter-group filter-group--categories" role="tablist">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    role="tab"
                    aria-selected={selectedCategory === cat.value}
                    className={`filter-btn ${selectedCategory === cat.value ? 'filter-btn--active' : ''}`}
                    onClick={() => setSelectedCategory(cat.value)}
                  >
                    <span>{cat.label}</span>
                    {selectedCategory === cat.value && (
                      <motion.div
                        layoutId="active-category"
                        className="filter-btn__indicator"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </LayoutGroup>

            {/* Status dropdown / pills */}
            <div className="filter-group filter-group--status">
              <Filter size={14} className="filter-icon" />
              {statuses.map((st) => (
                <button
                  key={st.value}
                  className={`filter-pill ${selectedStatus === st.value ? 'filter-pill--active' : ''}`}
                  onClick={() => setSelectedStatus(st.value)}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Results count */}
        <div className="projects-count">
          <span>
            {t('projects.showing')} <strong>{filteredProjects.length}</strong>{' '}
            {filteredProjects.length === 1 ? t('projects.project') : t('projects.projectsPlural')}
          </span>
        </div>

        {/* Projects grid */}
        {filteredProjects.length > 0 ? (
          <div className="projects-grid">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 120,
                    damping: 16,
                    delay: index * 0.05,
                  }}
                  layout
                >
                  <MagneticCard tiltIntensity={7}>
                    <article className="project-card">
                      <div className="project-card__header">
                        <span className="project-card__category">
                          {project.category.replace('-', ' ')}
                        </span>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          {project.demo && (
                            <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '999px', background: 'rgba(16,185,129,0.15)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)', fontFamily: 'var(--mono)', fontWeight: 600 }}>
                              LIVE APP
                            </span>
                          )}
                          <span className={`project-status-badge project-status-badge--${project.status}`}>
                            {t(`projects.status.${project.status}` as any) || project.status}
                          </span>
                        </div>
                      </div>

                      <h2 className="project-card__title">
                        <Link to={`/projects/${project.id}`}>{project.title}</Link>
                      </h2>

                      <p className="project-card__desc">{project.shortDescription}</p>

                      <div className="project-card__tags">
                        {project.technologies.map((tech) => (
                          <motion.span
                            key={tech}
                            className="tech-tag"
                            whileHover={{ scale: 1.1, y: -2 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>

                      <div className="project-card__footer">
                        <motion.div
                          whileHover={{ x: 4 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                          <Link to={`/projects/${project.id}`} className="project-card__link">
                            <span>{t('projects.viewProject')}</span>
                            <ArrowRight size={16} />
                          </Link>
                        </motion.div>

                        <div className="project-card__actions">
                          {project.github && (
                            <motion.a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="project-icon-link"
                              aria-label={`GitHub repository for ${project.title}`}
                              whileHover={{ scale: 1.2, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <GithubIcon size={18} />
                            </motion.a>
                          )}
                          {project.demo && (
                            <motion.a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="project-icon-link"
                              aria-label={`Live demo for ${project.title}`}
                              whileHover={{ scale: 1.2, rotate: -5 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <ExternalLink size={18} />
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </article>
                  </MagneticCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="projects-empty">
            <p>{t('projects.noResults')}</p>
            <button
              className="btn btn--secondary btn--sm"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedStatus('all');
                setSearchQuery('');
              }}
            >
              {t('projects.resetFilters')}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
