import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  FileText,
  Printer,
  GraduationCap,
  Briefcase,
  Code,
  Eye,
  EyeOff,
  ExternalLink,
  X,
  FileCheck,
} from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import { profile } from '../data/profile';
import { skillCategories } from '../data/skills';
import { projects } from '../data/projects';
import './ResumePage.css';

export function ResumePage() {
  const { t } = useI18n();
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showPreview && previewRef.current) {
      previewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showPreview]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="page resume-page" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      <div className="container container--narrow">
        {/* Dedicated Back Navigation */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Link
            to="/"
            className="btn btn--outline"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              fontSize: '13px',
              fontFamily: 'var(--mono)',
              borderRadius: '999px',
              textDecoration: 'none',
              backdropFilter: 'blur(8px)',
            }}
          >
            <ArrowLeft size={16} />
            <span>← Back to Portfolio</span>
          </Link>
        </div>

        {/* Header with actions */}
        <div className="resume-header-bar">
          <div>
            <span className="section__label">{t('resume.title')}</span>
            <h1 className="resume-page__title">Curriculum Vitae</h1>
          </div>

          <div className="resume-actions">
            <button
              className={`btn btn--sm ${showPreview ? 'btn--accent-active' : 'btn--outline'}`}
              onClick={() => setShowPreview((prev) => !prev)}
              title={showPreview ? 'Hide PDF preview' : 'Preview official PDF document'}
              aria-expanded={showPreview}
            >
              {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
              <span>{showPreview ? 'Hide Preview' : 'Preview PDF'}</span>
            </button>

            <a
              href="/resume.pdf"
              download="Naresh_Kumar_Resume.pdf"
              className="btn btn--primary btn--sm"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              title="Download official PDF to device"
            >
              <Download size={16} />
              <span>Download PDF</span>
            </a>

            <button
              className="btn btn--outline btn--sm"
              onClick={handlePrint}
              title="Print CV"
            >
              <Printer size={16} />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Quick PDF Action Banner */}
        {!showPreview && (
          <div className="resume-pdf-banner">
            <div className="resume-pdf-banner__left">
              <FileCheck size={22} className="resume-pdf-banner__icon" />
              <div>
                <strong className="resume-pdf-banner__title">Official PDF Resume Available</strong>
                <p className="resume-pdf-banner__sub">
                  Looking for the formal 1-page document? Preview it directly here or download the PDF file.
                </p>
              </div>
            </div>
            <div className="resume-pdf-banner__right">
              <button
                type="button"
                className="btn btn--outline btn--sm"
                onClick={() => setShowPreview(true)}
              >
                <Eye size={15} />
                <span>Preview PDF</span>
              </button>
              <a
                href="/resume.pdf"
                download="Naresh_Kumar_Resume.pdf"
                className="btn btn--primary btn--sm"
                style={{ textDecoration: 'none' }}
              >
                <Download size={15} />
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        )}

        {/* PDF Preview Container */}
        {showPreview && (
          <section
            ref={previewRef}
            className="resume-preview-container"
            aria-label="Resume PDF Preview"
          >
            <div className="resume-preview-toolbar">
              <div className="resume-preview-toolbar__meta">
                <FileCheck size={18} className="resume-preview-icon" />
                <span className="resume-preview-filename">Naresh_Kumar_Resume.pdf</span>
                <span className="resume-preview-badge">Official PDF</span>
              </div>
              <div className="resume-preview-toolbar__actions">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline btn--sm"
                  title="Open in new window or tab"
                  style={{ textDecoration: 'none' }}
                >
                  <ExternalLink size={14} />
                  <span>Open in Tab</span>
                </a>
                <a
                  href="/resume.pdf"
                  download="Naresh_Kumar_Resume.pdf"
                  className="btn btn--primary btn--sm"
                  title="Download PDF directly"
                  style={{ textDecoration: 'none' }}
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </a>
                <button
                  type="button"
                  className="btn btn--outline btn--sm resume-preview-close"
                  onClick={() => setShowPreview(false)}
                  title="Close Preview"
                  aria-label="Close Preview"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="resume-preview-body">
              <object
                data="/resume.pdf#view=FitH"
                type="application/pdf"
                className="resume-preview-frame"
                aria-label="Resume PDF Document"
              >
                <iframe
                  src="/resume.pdf#view=FitH"
                  className="resume-preview-frame"
                  title="Resume PDF Viewer"
                >
                  <div className="resume-preview-fallback">
                    <FileText size={42} style={{ color: 'var(--color-primary, #6366f1)' }} />
                    <h3 style={{ margin: '8px 0', fontSize: '18px' }}>PDF Ready to Download</h3>
                    <p style={{ margin: '0 0 16px', color: 'var(--text-secondary)' }}>
                      Your browser does not support inline PDF rendering.
                    </p>
                    <a
                      href="/resume.pdf"
                      download="Naresh_Kumar_Resume.pdf"
                      className="btn btn--primary btn--sm"
                      style={{ textDecoration: 'none' }}
                    >
                      <Download size={16} />
                      <span>Download Naresh_Kumar_Resume.pdf</span>
                    </a>
                  </div>
                </iframe>
              </object>
            </div>
          </section>
        )}

        {/* The Web CV Sheet */}
        <div className="cv-sheet" id="printable-cv">
          {/* Header */}
          <div className="cv-header">
            <div>
              <h2 className="cv-name">{profile.name}</h2>
              <p className="cv-headline">{profile.subtitle}</p>
            </div>
            <div className="cv-contact">
              <div className="cv-contact-item">
                <span>Email:</span>{' '}
                <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
              </div>
              {profile.contact.github && (
                <div className="cv-contact-item">
                  <span>GitHub:</span>{' '}
                  <a
                    href={profile.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github.com/Naresh-Kumar17
                  </a>
                </div>
              )}
              {profile.contact.linkedin && (
                <div className="cv-contact-item">
                  <span>LinkedIn:</span>{' '}
                  <a
                    href={profile.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    linkedin.com/in/naresh-kumar-ds
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
            <p className="cv-summary-text">
              Data Science undergraduate at FAST-NUCES Karachi specializing in machine learning algorithms, statistical modeling, time-series forecasting, and interactive web applications. Experienced in designing end-to-end analytical pipelines from raw datasets to 60 FPS visual computing engines.
            </p>
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
                Focused coursework in data structures, algorithms, probability and statistics, linear algebra, object-oriented programming (C++), and machine learning foundations.
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
              <span>Technical Projects</span>
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
                <div style={{ display: 'flex', gap: '14px', margin: '6px 0 8px', fontSize: '12px', fontFamily: 'var(--mono)' }}>
                  {proj.demo && (
                    <a href={proj.demo} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
                      🌐 Live Web App ↗
                    </a>
                  )}
                  {proj.github && (
                    <a href={proj.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                      📂 GitHub Repository ↗
                    </a>
                  )}
                </div>
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
      </div>
    </main>
  );
}
