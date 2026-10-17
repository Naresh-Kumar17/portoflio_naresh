import { motion } from 'motion/react';
import { ScrollReveal, StaggerItem } from '../components/ScrollReveal';
import { MagneticCard } from '../components/MagneticCard';
import { TextReveal } from '../components/TextReveal';
import { useI18n } from '../contexts/I18nContext';
import { skillCategories, type SkillStatus } from '../data/skills';
import './SkillsPage.css';

function SkillStatusLabel({ status }: { status: SkillStatus }) {
  const { t } = useI18n();
  const labels: Record<SkillStatus, string> = {
    learned: t('skills.status.learned'),
    learning: t('skills.status.learning'),
    planned: t('skills.status.planned'),
  };
  return (
    <span className={`skill-status skill-status--${status}`}>
      {labels[status]}
    </span>
  );
}

export function SkillsPage() {
  const { t } = useI18n();

  return (
    <main className="page skills-page">
      <div className="container">
        <ScrollReveal variant="blur">
          <div className="section__header">
            <span className="section__label">{t('skills.title')}</span>
            <TextReveal text={t('skills.subtitle')} as="h1" className="section__title" />
            <motion.p
              className="section__subtitle"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 120, damping: 18 }}
            >
              Technologies and tools I use in my data science journey. Skills are labeled honestly by current proficiency level.
            </motion.p>
          </div>
        </ScrollReveal>

        {/* Legend */}
        <ScrollReveal delay={100} variant="slide" direction="left">
          <div className="skills-legend">
            <motion.div
              className="skills-legend__item"
              whileHover={{ scale: 1.08, x: 4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <span className="skills-legend__dot skills-legend__dot--learned" />
              <span>{t('skills.status.learned')}</span>
            </motion.div>
            <motion.div
              className="skills-legend__item"
              whileHover={{ scale: 1.08, x: 4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <span className="skills-legend__dot skills-legend__dot--learning" />
              <span>{t('skills.status.learning')}</span>
            </motion.div>
            <motion.div
              className="skills-legend__item"
              whileHover={{ scale: 1.08, x: 4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <span className="skills-legend__dot skills-legend__dot--planned" />
              <span>{t('skills.status.planned')}</span>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Skill Categories with stagger */}
        <ScrollReveal staggerChildren={80} className="skills-grid">
          {skillCategories.map((category) => (
            <StaggerItem key={category.id}>
              <MagneticCard tiltIntensity={7}>
                <div className="skill-category">
                  <div className="skill-category__header">
                    <motion.span
                      className="skill-category__icon"
                      aria-hidden="true"
                      whileHover={{ scale: 1.3, rotate: 15 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                    >
                      {category.icon}
                    </motion.span>
                    <h2 className="skill-category__title">{category.title}</h2>
                  </div>
                  <ul className="skill-category__list">
                    {category.skills.map((skill, skillIdx) => (
                      <motion.li
                        key={skill.name}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          type: 'spring',
                          stiffness: 150,
                          damping: 16,
                          delay: skillIdx * 0.05,
                        }}
                        whileHover={{
                          scale: 1.03,
                          x: 6,
                          backgroundColor: 'var(--accent-gradient-subtle)',
                        }}
                        className="skill-item"
                      >
                        <div className="skill-item__info">
                          <span className="skill-item__name">{skill.name}</span>
                          <SkillStatusLabel status={skill.status} />
                        </div>
                        {skill.description && (
                          <p className="skill-item__desc">{skill.description}</p>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </MagneticCard>
            </StaggerItem>
          ))}
        </ScrollReveal>
      </div>
    </main>
  );
}
