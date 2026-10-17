import { useState } from 'react';
import { Download, FileText, Printer, GraduationCap, Briefcase, Code } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { useI18n } from '../contexts/I18nContext';
import { profile } from '../data/profile';
import { skillCategories } from '../data/skills';
import { projects } from '../data/projects';
import './ResumePage.css';

export function ResumePage() {
  const { t } = useI18n();
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const handleDownload = () => {
    if (profile.resumePath) {
      window.open(profile.resumePath, '_blank');
    } else {
      setDownloadNotice(t('resume.notAvailable'));
      setTimeout(() => setDownloadNotice(null), 4000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="page resume-page">
      <div className="container">
        {/* Header with actions */}
        <ScrollReveal>
          <div className="resume-header-bar">
            <div>
              <span className="section__label">{t('resume.title')}</span>
              <h1 className="resume-page__title">Curriculum Vitae</h1>
            </div>

            <div className="resume-actions">
              <button
                type="button"
                className="btn btn--outline"
                onClick={handlePrint}
                title="Print CV"
              >
                <Printer size={16} />
                <span>Print</span>
              </button>
              <button
                type="button"
                className="btn btn--primary"
                onClick={handleDownload}
                title="Download PDF"
              >
                <Download size={16} />
                <span>{t('resume.download')}</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {downloadNotice && (
          <div className="resume-notice alert alert--warning" role="alert">
            <FileText size={18} />
            <span>{downloadNotice}</span>
          </div>
        )}

        {/* Printable/Online CV Sheet */}
        <ScrollReveal delay={100}>
          <div className="resume-sheet card">
            {/* CV Header */}
            <div className="cv-header">
              <div className="cv-header__info">
                <h2 className="cv-name">{profile.name}</h2>
                <p className="cv-title">{profile.subtitle}</p>
                <p className="cv-institution">
                  {profile.university.fullName} — {profile.university.campus} Campus
                </p>
              </div>

              <div className="cv-contact-col">
                {profile.contact.email && (
                  <div className="cv-contact-item">
                    <span>Email:</span>{' '}
                    <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
                  </div>
                )}
                {profile.contact.github && (
                  <div className="cv-contact-item">
                    <span>GitHub:</span>{' '}
                    <a href={profile.contact.github} target="_blank" rel="noopener noreferrer">
                      {profile.contact.github.replace('https://', '')}
                    </a>
                  </div>
                )}
                {profile.contact.linkedin && (
                  <div className="cv-contact-item">
                    <span>LinkedIn:</span>{' '}
                    <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer">
                      {profile.contact.linkedin.replace('https://', '')}
                    </a>
                  </div>
                )}
                <div className="cv-contact-item">
                  <span>Location:</span> Karachi, Pakistan
                </div>
              </div>
            </div>

            {/* Summary */}
            <section className="cv-section">
              <h3 className="cv-section__title">
                <FileText size={18} className="cv-section__icon" />
                <span>Executive Summary</span>
              </h3>
              <p className="cv-summary-text">{profile.bio[0]}</p>
              <p className="cv-summary-text">{profile.bio[2]}</p>
            </section>

            {/* Education */}
            <section className="cv-section">
              <h3 className="cv-section__title">
                <GraduationCap size={18} className="cv-section__icon" />
                <span>Education</span>
              </h3>

              <div className="cv-entry">
                <div className="cv-entry__head">
                  <div className="cv-entry__primary">
                    <span className="cv-entry__role">{profile.university.degree}</span>
                    <span className="cv-entry__org">{profile.university.fullName}</span>
                  </div>
                  <span className="cv-entry__dates">
                    {profile.university.startYear} — {profile.university.endYear} (Expected)
                  </span>
                </div>
                <p className="cv-entry__desc">
                  Focused coursework in data structures, algorithms, probability and statistics, linear algebra, and data wrangling.
                </p>
              </div>
            </section>

            {/* Technical Skills */}
            <section className="cv-section">
              <h3 className="cv-section__title">
                <Code size={18} className="cv-section__icon" />
                <span>Technical Skills</span>
              </h3>

              <div className="cv-skills-grid">
                {skillCategories.map((cat) => (
                  <div key={cat.id} className="cv-skill-group">
                    <strong className="cv-skill-group__name">{cat.title}:</strong>{' '}
                    <span className="cv-skill-group__items">
                      {cat.skills.map((s) => s.name).join(', ')}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Selected Projects */}
            <section className="cv-section">
              <h3 className="cv-section__title">
                <Briefcase size={18} className="cv-section__icon" />
                <span>Selected Academic & Technical Projects</span>
              </h3>

              {projects.map((proj) => (
                <div key={proj.id} className="cv-entry">
                  <div className="cv-entry__head">
                    <div className="cv-entry__primary">
                      <span className="cv-entry__role">{proj.title}</span>
                      <span className="cv-entry__tech-inline">
                        ({proj.technologies.join(', ')})
                      </span>
                    </div>
                    {proj.date && <span className="cv-entry__dates">{proj.date}</span>}
                  </div>
                  <p className="cv-entry__desc">{proj.shortDescription}</p>
                  {proj.insights && (
                    <ul className="cv-bullets">
                      {proj.insights.map((ins, i) => (
                        <li key={i}>{ins}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
