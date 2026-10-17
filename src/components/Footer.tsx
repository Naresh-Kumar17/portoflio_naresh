import { Link } from 'react-router-dom';
import { Mail, ArrowUp } from 'lucide-react';
import { Monogram } from './Monogram';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { profile } from '../data/profile';
import { useI18n } from '../contexts/I18nContext';
import './Footer.css';

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const { t } = useI18n();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__top-line" aria-hidden="true" />
      <div className="container">
        <div className="footer__grid">
          {/* Brand column */}
          <div className="footer__brand">
            <Monogram size={44} />
            <p className="footer__tagline">
              {t('hero.headline')}
            </p>
            <p className="footer__description">
              {profile.subtitle}
            </p>
          </div>

          {/* Navigation */}
          <div className="footer__nav">
            <h3 className="footer__nav-title">Navigation</h3>
            <ul className="footer__nav-list">
              <li><Link to="/">{t('nav.home')}</Link></li>
              <li><Link to="/about">{t('nav.about')}</Link></li>
              <li><Link to="/projects">{t('nav.projects')}</Link></li>
              <li><Link to="/skills">{t('nav.skills')}</Link></li>
              <li><Link to="/contact">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer__nav">
            <h3 className="footer__nav-title">Resources</h3>
            <ul className="footer__nav-list">
              <li><Link to="/education">{t('nav.education')}</Link></li>
              <li><Link to="/resume">{t('nav.resume')}</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="footer__nav">
            <h3 className="footer__nav-title">Connect</h3>
            <div className="footer__socials">
              {profile.contact.github && (
                <a
                  href={profile.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link"
                  aria-label="GitHub"
                >
                  <GithubIcon size={20} />
                </a>
              )}
              {profile.contact.linkedin && (
                <a
                  href={profile.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon size={20} />
                </a>
              )}
              {profile.contact.email && (
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="footer__social-link"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {CURRENT_YEAR} {profile.name}. {t('footer.rights')}
          </p>
          <p className="footer__built">
            {t('footer.builtWith')}
          </p>
          <button
            className="footer__back-to-top"
            onClick={scrollToTop}
            aria-label={t('misc.backToTop')}
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
