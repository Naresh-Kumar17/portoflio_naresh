import { motion } from 'motion/react';
import { GraduationCap, BookOpen, Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { ScrollReveal, StaggerItem } from '../components/ScrollReveal';
import { TextReveal } from '../components/TextReveal';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { useI18n } from '../contexts/I18nContext';
import { profile } from '../data/profile';
import { educationTimeline, type TimelineEntry } from '../data/education';
import './EducationPage.css';

export function EducationPage() {
  const { t } = useI18n();

  const getTimelineIcon = (type: TimelineEntry['type']) => {
    switch (type) {
      case 'milestone':
        return <Award size={18} />;
      case 'semester':
        return <BookOpen size={18} />;
      case 'achievement':
        return <CheckCircle2 size={18} />;
      default:
        return <Calendar size={18} />;
    }
  };

  return (
    <main className="page education-page">
      <div className="container">
        <ScrollReveal variant="blur">
          <div className="section__header">
            <span className="section__label">{t('education.title')}</span>
            <TextReveal text={t('education.subtitle')} as="h1" className="section__title" />
            <motion.p
              className="section__subtitle"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 120, damping: 18 }}
            >
              Formal academic foundation at one of Pakistan's premier computing institutions.
            </motion.p>
          </div>
        </ScrollReveal>

        {/* Institution Highlight Card */}
        <ScrollReveal delay={100} variant="scale">
          <div className="education-card card">
            <div className="education-card__top">
              <div className="education-card__logo-wrap">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
                >
                  <GraduationCap size={36} className="education-card__logo-icon" />
                </motion.div>
              </div>
              <div className="education-card__info">
                <div className="education-card__badges">
                  <motion.span
                    className="badge badge--primary"
                    animate={{ boxShadow: ['0 0 0px rgba(139,92,246,0)', '0 0 15px rgba(139,92,246,0.3)', '0 0 0px rgba(139,92,246,0)'] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    Active Student
                  </motion.span>
                  <span className="badge badge--outline">{profile.university.degree}</span>
                </div>
                <h2 className="education-card__univ">{profile.university.fullName}</h2>
                <div className="education-card__location">
                  <MapPin size={16} />
                  <span>{profile.university.campus} Campus</span>
                </div>
              </div>
            </div>

            <ScrollReveal staggerChildren={80} className="education-card__meta-grid">
              <StaggerItem>
                <div className="education-meta-box">
                  <span className="education-meta-box__label">Degree Program</span>
                  <span className="education-meta-box__val">{profile.university.degree}</span>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="education-meta-box">
                  <span className="education-meta-box__label">Duration</span>
                  <span className="education-meta-box__val">
                    <AnimatedCounter end={profile.university.startYear} duration={1500} /> — {profile.university.endYear} (Expected)
                  </span>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="education-meta-box">
                  <span className="education-meta-box__label">Current Status</span>
                  <span className="education-meta-box__val">
                    {profile.university.graduated ? 'Graduated' : 'Undergraduate Student'}
                  </span>
                </div>
              </StaggerItem>
            </ScrollReveal>
          </div>
        </ScrollReveal>

        {/* Academic Journey Timeline */}
        <ScrollReveal delay={150} variant="fade">
          <div className="timeline-section">
            <TextReveal
              text="Academic Milestones & Coursework"
              as="h2"
              className="timeline-section__title"
              delay={200}
            />
            <div className="timeline">
              {educationTimeline.map((item, idx) => (
                <motion.div
                  key={item.id}
                  className={`timeline__item ${item.current ? 'timeline__item--current' : ''}`}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 16,
                    delay: idx * 0.1,
                  }}
                >
                  <div className="timeline__marker">
                    <motion.div
                      className="timeline__icon"
                      whileHover={{ scale: 1.25, rotate: 10 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                    >
                      {getTimelineIcon(item.type)}
                    </motion.div>
                    {idx < educationTimeline.length - 1 && (
                      <motion.div
                        className="timeline__line"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.1 + 0.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{ transformOrigin: 'top' }}
                      />
                    )}
                  </div>

                  <motion.div
                    className="timeline__content card"
                    whileHover={{ y: -4, boxShadow: 'var(--card-hover-shadow)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <div className="timeline__header">
                      <span className="timeline__year">{item.year}</span>
                      {item.current && (
                        <motion.span
                          className="timeline__status-badge"
                          animate={{ boxShadow: ['0 0 0px rgba(6,182,212,0)', '0 0 12px rgba(6,182,212,0.4)', '0 0 0px rgba(6,182,212,0)'] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          Current Focus
                        </motion.span>
                      )}
                    </div>

                    <h3 className="timeline__title">{item.title}</h3>
                    {item.subtitle && <p className="timeline__subtitle">{item.subtitle}</p>}
                    <p className="timeline__desc">{item.description}</p>

                    {item.coursework && item.coursework.length > 0 && (
                      <div className="timeline__coursework">
                        <span className="timeline__coursework-title">Relevant Coursework:</span>
                        <div className="timeline__course-tags">
                          {item.coursework.map((course, ci) => (
                            <motion.span
                              key={course}
                              className="course-chip"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{
                                type: 'spring',
                                stiffness: 200,
                                damping: 15,
                                delay: ci * 0.04,
                              }}
                              whileHover={{ scale: 1.1, y: -2 }}
                            >
                              {course}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
