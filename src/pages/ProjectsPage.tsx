import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { Search, ExternalLink, ArrowRight, Filter, GraduationCap, Rocket, Sparkles } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { MagneticCard } from '../components/MagneticCard';
import { GithubIcon } from '../components/SocialIcons';
import { TextReveal } from '../components/TextReveal';
import { useI18n } from '../contexts/I18nContext';
import { projects, type ProjectType } from '../data/projects';
import './ProjectsPage.css';

export function ProjectsPage() {
  const { t } = useI18n();
  const [selectedType, setSelectedType] = useState<ProjectType | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const academicCount = useMemo(() => projects.filter((p) => p.projectType === 'academic').length, []);
  const personalCount = useMemo(() => projects.filter((p) => p.projectType === 'personal').length, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Primary Project Track (Academic vs Personal)
      if (selectedType !== 'all' && project.projectType !== selectedType) {
        return false;
      }
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
        const matchesCourse = project.course?.toLowerCase().includes(query);
        const matchesTech = project.technologies.some((tech) =>
          tech.toLowerCase().includes(query)
        );
        return matchesTitle || matchesDesc || matchesTech || !!matchesCourse;
      }
      return true;
    });
  }, [selectedType, selectedCategory, selectedStatus, searchQuery]);

  const categories: { label: string; value: string }[] = [
    { label: t('projects.filter.all'), value: 'all' },
    { label: 'Machine Learning', value: 'machine-learning' },
    { label: 'Data Analysis', value: 'data-analysis' },
    { label: 'Systems & C/C++', value: 'systems' },
    { label: 'Visualization', value: 'visualization' },
    { label: 'Assembly & Gaming', value: 'gaming' },
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
          <div className="section__header">
            <span className="section__label">{t('projects.title')}</span>
            <TextReveal text={t('projects.subtitle')} as="h1" className="section__title" />
            <motion.p
              className="section__subtitle"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 120, damping: 18 }}
            >
              Explore independent research, data science models, and rigorous academic coursework projects from FAST-NUCES Karachi.
            </motion.p>
          </div>
        </ScrollReveal>

        {/* Primary Track Switcher: Academic vs Personal */}
        <ScrollReveal delay={80} variant="slide" direction="up">
          <div className="projects-type-switcher-container">
            <div className="projects-type-switcher" role="tablist" aria-label="Select Project Track">
              <button
                type="button"
                role="tab"
                aria-selected={selectedType === 'all'}
                className={`projects-type-btn ${selectedType === 'all' ? 'projects-type-btn--active' : ''}`}
                onClick={() => setSelectedType('all')}
              >
                <Sparkles size={16} />
                <span>All Projects</span>
                <span className="projects-type-badge">{projects.length}</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={selectedType === 'academic'}
                className={`projects-type-btn ${selectedType === 'academic' ? 'projects-type-btn--active' : ''}`}
                onClick={() => setSelectedType('academic')}
              >
                <GraduationCap size={17} />
                <span>Academic Coursework</span>
                <span className="projects-type-badge">{academicCount}</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={selectedType === 'personal'}
                className={`projects-type-btn ${selectedType === 'personal' ? 'projects-type-btn--active' : ''}`}
                onClick={() => setSelectedType('personal')}
              >
                <Rocket size={16} />
                <span>Personal Projects</span>
                <span className="projects-type-badge">{personalCount}</span>
              </button>
            </div>

            {/* Contextual Banner for Selected Track */}
            <AnimatePresence mode="wait">
              {selectedType === 'academic' && (
                <motion.div
                  key="academic-banner"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="projects-track-info-banner projects-track-info-banner--academic"
                >
                  <GraduationCap size={20} className="banner-icon" />
                  <div>
                    <strong>FAST-NUCES Karachi Coursework:</strong> Hands-on computational projects developed for university curriculum in <em>Programming Fundamentals (C & Raylib)</em>, <em>Object-Oriented Programming (C++)</em>, and <em>Computer Organization & Assembly Language (x86 Assembly)</em>.
                  </div>
                </motion.div>
              )}

              {selectedType === 'personal' && (
                <motion.div
                  key="personal-banner"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="projects-track-info-banner projects-track-info-banner--personal"
                >
                  <Rocket size={20} className="banner-icon" />
                  <div>
                    <strong>Independent Initiatives:</strong> Machine learning algorithms, time-series environmental forecasting, road safety risk classifiers, and interactive 3D Web graphics engines.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>

        {/* Filter & Search Controls */}
        <ScrollReveal delay={120} variant="slide" direction="up">
          <div className="projects-controls">
            {/* Search */}
            <div className="projects-search">
              <Search size={18} className="projects-search__icon" />
              <input
                type="text"
                placeholder="Search projects by title, course, keyword, or tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="projects-search__input"
                aria-label="Search projects"
              />
              {searchQuery && (
                <motion.button
                  type="button"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  onClick={() => setSearchQuery('')}
                  className="projects-search__clear"
                  aria-label="Clear search"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              )}
            </div>

            <div className="projects-filters-row">
              {/* Category Pills */}
              <LayoutGroup>
                <div className="projects-pills" role="tablist" aria-label="Filter by category">
                  {categories.map((cat) => (
                    <motion.button
                      key={cat.value}
                      role="tab"
                      aria-selected={selectedCategory === cat.value}
                      className={`projects-pill ${selectedCategory === cat.value ? 'projects-pill--active' : ''}`}
                      onClick={() => setSelectedCategory(cat.value)}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      layout
                    >
                      {cat.label}
                      {selectedCategory === cat.value && (
                        <motion.div
                          layoutId="category-pill-bg"
                          className="projects-pill__active-bg"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </LayoutGroup>

              {/* Status Select */}
              <div className="projects-status-select-wrap">
                <Filter size={15} className="projects-filter-icon" />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="projects-status-select"
                  aria-label="Filter by project status"
                >
                  {statuses.map((st) => (
                    <option key={st.value} value={st.value}>
                      {st.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Project Grid */}
        <AnimatePresence mode="wait">
          {filteredProjects.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="projects-empty card"
            >
              <p className="projects-empty__text">{t('projects.noResults')}</p>
              <motion.button
                type="button"
                className="btn btn--outline"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedType('all');
                  setSelectedCategory('all');
                  setSelectedStatus('all');
                  setSearchQuery('');
                }}
              >
                Reset All Filters
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key={`${selectedType}-${selectedCategory}-${selectedStatus}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="projects-grid"
            >
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
                    <article className={`project-card ${project.projectType === 'academic' ? 'project-card--academic' : ''}`}>
                      <div className="project-card__header">
                        <div className="project-card__badges-group">
                          {project.projectType === 'academic' ? (
                            <span className="project-tag-pill project-tag-pill--academic">
                              <GraduationCap size={13} />
                              <span>{project.course || 'Academic Coursework'}</span>
                            </span>
                          ) : (
                            <span className="project-tag-pill project-tag-pill--personal">
                              <Rocket size={13} />
                              <span>Personal Project</span>
                            </span>
                          )}
                          <span className="project-card__category">
                            {project.category.replace('-', ' ')}
                          </span>
                        </div>
                        <span className={`project-status-badge project-status-badge--${project.status}`}>
                          {t(`projects.status.${project.status}` as any) || project.status}
                        </span>
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
