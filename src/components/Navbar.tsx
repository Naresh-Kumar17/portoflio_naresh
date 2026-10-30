import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Moon, Sun, Menu, X, Languages, Search } from 'lucide-react';
import { Monogram } from './Monogram';
import { useTheme } from '../contexts/ThemeContext';
import { useI18n } from '../contexts/I18nContext';
import { useScrollPosition } from '../hooks/useAnimations';
import { profile } from '../data/profile';
import './Navbar.css';

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useI18n();
  const scrollY = useScrollPosition();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isScrolled = scrollY > 50;

  // Close mobile menu on route change
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    if (mobileOpen) {
      setMobileOpen(false);
    }
  }

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { to: '/', label: 'Naresh' },
    { to: '/skills', label: 'Skills' },
    { to: '/projects', label: 'Projects' },
    { to: '/resume', label: 'Resume' },
  ];

  return (
    <header
      className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
      role="banner"
    >
      <nav className="navbar__inner container--wide" aria-label="Main navigation">
        <Link to="/" className="navbar__brand" aria-label={`${profile.name} - Home`}>
          <Monogram size={34} />
          <span className="navbar__name">
            {profile.name} <span className="navbar__brand-slash">/</span> <span className="navbar__brand-sub">DS</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="navbar__links" role="list">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <li key={link.to} style={{ position: 'relative' }}>
                <Link
                  to={link.to}
                  className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-indicator"
                      className="navbar__active-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="navbar__actions">
          <button
            className="navbar__action-btn"
            onClick={onOpenCommandPalette}
            aria-label="Open command palette (Ctrl+K)"
            title="Search (Ctrl+K)"
          >
            <Search size={18} />
          </button>

          <button
            className="navbar__action-btn"
            onClick={() => setLocale(locale === 'en' ? 'ur' : 'en')}
            aria-label={`Switch to ${locale === 'en' ? 'Urdu' : 'English'}`}
            title={locale === 'en' ? 'اردو' : 'English'}
          >
            <Languages size={18} />
          </button>

          <button
            className="navbar__action-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t('theme.light') : t('theme.dark')}
            title={theme === 'dark' ? t('theme.light') : t('theme.dark')}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="navbar__mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`navbar__mobile ${mobileOpen ? 'navbar__mobile--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="navbar__mobile-overlay" onClick={() => setMobileOpen(false)} />
        <div className="navbar__mobile-panel">
          <ul className="navbar__mobile-links" role="list">
            {navLinks.map((link, i) => (
              <li key={link.to} style={{ animationDelay: `${i * 50}ms` }}>
                <Link
                  to={link.to}
                  className={`navbar__mobile-link ${location.pathname === link.to ? 'navbar__mobile-link--active' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
