import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, Layers, CheckCircle2, AlertCircle, Lightbulb, Database, Sparkles, GraduationCap, Rocket } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { MagneticCard } from '../components/MagneticCard';
import { GithubIcon } from '../components/SocialIcons';
import { DataVisualizer } from '../components/DataVisualizer';
import { useI18n } from '../contexts/I18nContext';
import { projects, getRelatedProjects } from '../data/projects';
import './ProjectDetailPage.css';

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useI18n();

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const related = getRelatedProjects(project.id, 2);

  return (
    <main className="page project-detail-page">
      <div className="container">
        {/* Back navigation */}
        <ScrollReveal>
          <div className="project-detail__nav">
            <Link to="/projects" className="project-detail__back">
              <ArrowLeft size={16} />
              <span>Back to all projects</span>
            </Link>
          </div>
        </ScrollReveal>

        {/* Header Hero */}
        <ScrollReveal delay={100}>
          <div className="project-detail__header card">
            <div className="project-detail__meta-top">
              {project.projectType === 'academic' ? (
                <span className="project-tag-pill project-tag-pill--academic" style={{ fontSize: '0.75rem' }}>
                  <GraduationCap size={14} />
                  <span>{project.course ? `FAST-NUCES · ${project.course}` : 'Academic Coursework'}</span>
                </span>
              ) : (
                <span className="project-tag-pill project-tag-pill--personal" style={{ fontSize: '0.75rem' }}>
                  <Rocket size={14} />
                  <span>Personal Project</span>
                </span>
              )}
              <span className="project-detail__category">
                {project.category.replace('-', ' ')}
              </span>
              <span className={`project-status-badge project-status-badge--${project.status}`}>
                {t(`projects.status.${project.status}` as any) || project.status}
              </span>
              {project.date && (
                <span className="project-detail__date">
                  <Calendar size={14} />
                  <span>{project.date}</span>
                </span>
              )}
            </div>

            <h1 className="project-detail__title">{project.title}</h1>
            <p className="project-detail__summary">
              {project.longDescription || project.shortDescription}
            </p>

            <div className="project-detail__tech-list">
              {project.technologies.map((tech) => (
                <span key={tech} className="tech-tag tech-tag--accent">
                  {tech}
                </span>
              ))}
            </div>

            {/* External Links */}
            <div className="project-detail__links">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  <GithubIcon size={18} />
                  <span>View Repository</span>
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline"
                >
                  <ExternalLink size={18} />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Interactive Data Sandbox for visualization/data projects */}
        {(project.category === 'data-science' || project.category === 'web') && (
          <ScrollReveal delay={150}>
            <section className="project-detail__section">
              <DataVisualizer />
            </section>
          </ScrollReveal>
        )}

        {/* Case Study Content */}
        {project.caseStudy && (
          <div className="project-detail__case-study">
            {/* Problem & Goals */}
            <ScrollReveal delay={200}>
              <div className="case-study-grid">
                {project.caseStudy.problemStatement && (
                  <div className="case-study-card card">
                    <div className="case-study-card__header">
                      <div className="case-study-icon case-study-icon--alert">
                        <AlertCircle size={20} />
                      </div>
                      <h2 className="case-study-card__title">The Problem</h2>
                    </div>
                    <p className="case-study-card__text">
                      {project.caseStudy.problemStatement}
                    </p>
                  </div>
                )}

                {project.caseStudy.goals && project.caseStudy.goals.length > 0 && (
                  <div className="case-study-card card">
                    <div className="case-study-card__header">
                      <div className="case-study-icon case-study-icon--success">
                        <CheckCircle2 size={20} />
                      </div>
                      <h2 className="case-study-card__title">Project Objectives</h2>
                    </div>
                    <ul className="case-study-list">
                      {project.caseStudy.goals.map((goal, idx) => (
                        <li key={idx} className="case-study-list__item">
                          <span className="case-study-list__bullet" />
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* Methodology & Data Quality */}
            <ScrollReveal delay={250}>
              <div className="case-study-grid">
                {project.caseStudy.methodology && (
                  <div className="case-study-card card">
                    <div className="case-study-card__header">
                      <div className="case-study-icon case-study-icon--violet">
                        <Layers size={20} />
                      </div>
                      <h2 className="case-study-card__title">Methodology</h2>
                    </div>
                    <p className="case-study-card__text">
                      {project.caseStudy.methodology}
                    </p>
                  </div>
                )}

                {project.caseStudy.dataQuality && (
                  <div className="case-study-card card">
                    <div className="case-study-card__header">
                      <div className="case-study-icon case-study-icon--cyan">
                        <Database size={20} />
                      </div>
                      <h2 className="case-study-card__title">Data Quality & Cleaning</h2>
                    </div>
                    <p className="case-study-card__text">
                      {project.caseStudy.dataQuality}
                    </p>
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* Code Walkthrough */}
            {project.caseStudy.codeSnippets && project.caseStudy.codeSnippets.length > 0 && (
              <ScrollReveal delay={300}>
                <section className="project-detail__code-section card">
                  <div className="code-section__header">
                    <h2 className="code-section__title">Implementation & Code Highlights</h2>
                    <p className="code-section__subtitle">
                      Annotated snippets highlighting key functions and architectural decisions.
                    </p>
                  </div>

                  {project.caseStudy.codeSnippets.map((snippet, sIdx) => (
                    <div key={sIdx} className="snippet-block">
                      <div className="snippet-block__bar">
                        <span className="snippet-block__title">{snippet.title}</span>
                        <span className="snippet-block__lang">{snippet.language}</span>
                      </div>
                      <pre className="snippet-block__pre">
                        <code>{snippet.code}</code>
                      </pre>
                      <p className="snippet-block__explanation">
                        <strong>Explanation:</strong> {snippet.explanation}
                      </p>
                    </div>
                  ))}
                </section>
              </ScrollReveal>
            )}
          </div>
        )}

        {/* Insights & Key Learnings */}
        <ScrollReveal delay={350}>
          <div className="project-detail__insights-grid">
            {project.insights && project.insights.length > 0 && (
              <div className="card insights-card">
                <div className="insights-card__header">
                  <Sparkles size={20} className="text-cyan" />
                  <h2 className="insights-card__title">Verified Insights</h2>
                </div>
                <ul className="insights-list">
                  {project.insights.map((ins, i) => (
                    <li key={i} className="insights-list__item">
                      {ins}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.learnings && project.learnings.length > 0 && (
              <div className="card insights-card">
                <div className="insights-card__header">
                  <Lightbulb size={20} className="text-violet" />
                  <h2 className="insights-card__title">Key Learnings</h2>
                </div>
                <ul className="insights-list">
                  {project.learnings.map((lrn, i) => (
                    <li key={i} className="insights-list__item">
                      {lrn}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Limitations & Future Work */}
        {project.limitations && project.limitations.length > 0 && (
          <ScrollReveal delay={400}>
            <div className="card project-limitations">
              <h2 className="project-limitations__title">Limitations & Future Improvements</h2>
              <p className="project-limitations__intro">
                Honest evaluation of technical constraints and planned improvements for subsequent iterations:
              </p>
              <ul className="insights-list">
                {project.limitations.map((lim, i) => (
                  <li key={i} className="insights-list__item">
                    {lim}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        )}

        {/* Related Projects */}
        {related.length > 0 && (
          <ScrollReveal delay={450}>
            <section className="related-projects">
              <h2 className="related-projects__title">{t('projects.related')}</h2>
              <div className="related-projects__grid">
                {related.map((rel) => (
                  <MagneticCard key={rel.id} tiltIntensity={7}>
                    <Link
                      to={`/projects/${rel.id}`}
                      className="related-project-card"
                    >
                      <span className="related-project-card__category">
                        {rel.category.replace('-', ' ')}
                      </span>
                      <h3 className="related-project-card__title">{rel.title}</h3>
                      <p className="related-project-card__desc">{rel.shortDescription}</p>
                      <div className="related-project-card__tech">
                        {rel.technologies.slice(0, 3).map((t) => (
                          <span key={t} className="tech-tag">
                            {t}
                          </span>
                        ))}
                      </div>
                    </Link>
                  </MagneticCard>
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}
      </div>
    </main>
  );
}
