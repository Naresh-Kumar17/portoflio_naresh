import { motion } from 'motion/react';
import { Monogram } from '../components/Monogram';
import { ScrollReveal, StaggerItem } from '../components/ScrollReveal';
import { MagneticCard } from '../components/MagneticCard';
import { TextReveal } from '../components/TextReveal';
import { useI18n } from '../contexts/I18nContext';
import { profile } from '../data/profile';
import './AboutPage.css';

export function AboutPage() {
  const { t } = useI18n();

  return (
    <main className="page about-page">
      <div className="container container--narrow">
        <ScrollReveal variant="blur">
          <div className="section__header">
            <span className="section__label">{t('about.title')}</span>
            <TextReveal text={t('about.subtitle')} as="h1" className="section__title" />
          </div>
        </ScrollReveal>

        <div className="about-page__content">
          <ScrollReveal delay={100} variant="scale">
            <div className="about-page__photo-section">
              {profile.photo ? (
                <motion.img
                  src={profile.photo}
                  alt={`${profile.name}'s profile photo`}
                  className="about-page__photo"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                />
              ) : (
                <motion.div
                  className="about-page__monogram"
                  whileHover={{ scale: 1.08, rotate: -5 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                  <Monogram size={120} />
                </motion.div>
              )}
              <div className="about-page__intro">
                <motion.h2
                  className="about-page__name"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.3 }}
                >
                  {profile.name}
                </motion.h2>
                <motion.p
                  className="about-page__role"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.4 }}
                >
                  {profile.subtitle}
                </motion.p>
              </div>
            </div>
          </ScrollReveal>

          <div className="about-page__bio">
            {profile.bio.map((para, i) => (
              <ScrollReveal key={i} delay={200 + i * 80} variant="blur" direction={i % 2 === 0 ? 'left' : 'right'}>
                <p>{para}</p>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal staggerChildren={100} delay={300} className="about-page__details">
            <StaggerItem>
              <MagneticCard tiltIntensity={8}>
                <motion.div
                  className="about-page__detail-card"
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <motion.h3
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                  >
                    🎓 Education
                  </motion.h3>
                  <p>{profile.university.degree}</p>
                  <p className="about-page__detail-sub">
                    {profile.university.fullName} — {profile.university.campus}
                  </p>
                  <p className="about-page__detail-sub">
                    {profile.university.startYear} — {profile.university.graduated ? profile.university.endYear : `Expected ${profile.university.endYear}`}
                  </p>
                </motion.div>
              </MagneticCard>
            </StaggerItem>
            <StaggerItem>
              <MagneticCard tiltIntensity={8}>
                <motion.div
                  className="about-page__detail-card"
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <motion.h3
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                  >
                    🎯 Focus Areas
                  </motion.h3>
                  <ul className="about-page__focus-list">
                    {['Data Analysis & Visualization', 'Machine Learning', 'Statistical Modeling', 'Python Development'].map((item, idx) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.08, type: 'spring', stiffness: 150, damping: 16 }}
                        whileHover={{ x: 6, color: 'var(--accent-primary)' }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </MagneticCard>
            </StaggerItem>
            <StaggerItem>
              <MagneticCard tiltIntensity={8}>
                <motion.div
                  className="about-page__detail-card"
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <motion.h3
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                  >
                    💡 Interests
                  </motion.h3>
                  <ul className="about-page__focus-list">
                    {['Problem Solving', 'Open Source', 'Data Storytelling', 'Continuous Learning'].map((item, idx) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.08, type: 'spring', stiffness: 150, damping: 16 }}
                        whileHover={{ x: 6, color: 'var(--accent-primary)' }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </MagneticCard>
            </StaggerItem>
          </ScrollReveal>
        </div>
      </div>
    </main>
  );
}
