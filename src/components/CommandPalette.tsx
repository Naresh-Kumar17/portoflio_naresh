import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, ArrowRight, Moon, Sun, Globe, ExternalLink } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import { useTheme } from '../contexts/ThemeContext';
import { projects } from '../data/projects';
import './CommandPalette.css';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Command {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  category: string;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { t, locale, setLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();

  const commands: Command[] = useMemo(() => {
    const navCommands: Command[] = [
      { id: 'nav-home', label: t('nav.home'), icon: <ArrowRight size={16} />, action: () => { navigate('/'); onClose(); }, category: 'Navigation' },
      { id: 'nav-about', label: t('nav.about'), icon: <ArrowRight size={16} />, action: () => { navigate('/about'); onClose(); }, category: 'Navigation' },
      {
        id: 'nav-skills',
        label: t('nav.skills'),
        icon: <ArrowRight size={16} />,
        action: () => {
          if (location.pathname === '/') {
            window.dispatchEvent(new CustomEvent('cosmos-focus', { detail: 'skills_hub' }));
          } else {
            navigate('/skills');
          }
          onClose();
        },
        category: 'Navigation',
      },
      { id: 'nav-projects', label: t('nav.projects'), icon: <ArrowRight size={16} />, action: () => { navigate('/projects'); onClose(); }, category: 'Navigation' },
      { id: 'nav-education', label: t('nav.education'), icon: <ArrowRight size={16} />, action: () => { navigate('/education'); onClose(); }, category: 'Navigation' },
      { id: 'nav-resume', label: t('nav.resume'), icon: <ArrowRight size={16} />, action: () => { navigate('/resume'); onClose(); }, category: 'Navigation' },
      { id: 'nav-contact', label: t('nav.contact'), icon: <ArrowRight size={16} />, action: () => { navigate('/contact'); onClose(); }, category: 'Navigation' },
    ];

    const liveDemoCommands: Command[] = [
      {
        id: 'live-dataset-doctor',
        label: 'Dataset Doctor · Live on Render',
        description: 'ML reliability and leak-free remediation web application',
        icon: <ExternalLink size={16} />,
        action: () => {
          window.open('https://dataset-doctor-8c7b.onrender.com/', '_blank');
          onClose();
        },
        category: 'Live Apps',
      },
    ];

    const projectCommands: Command[] = projects.map((p) => ({
      id: `project-${p.id}`,
      label: p.title,
      description: p.shortDescription,
      icon: <ArrowRight size={16} />,
      action: () => { navigate(`/projects/${p.id}`); onClose(); },
      category: 'Projects',
    }));

    const actionCommands: Command[] = [
      {
        id: 'toggle-theme',
        label: theme === 'dark' ? t('theme.light') : t('theme.dark'),
        icon: theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />,
        action: () => { toggleTheme(); onClose(); },
        category: 'Actions',
      },
      {
        id: 'toggle-language',
        label: locale === 'en' ? 'اردو میں تبدیل کریں' : 'Switch to English',
        icon: <Globe size={16} />,
        action: () => { setLocale(locale === 'en' ? 'ur' : 'en'); onClose(); },
        category: 'Actions',
      },
    ];

    return [...navCommands, ...liveDemoCommands, ...projectCommands, ...actionCommands];
  }, [navigate, location.pathname, onClose, t, theme, toggleTheme, locale, setLocale]);

  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(q) ||
        cmd.description?.toLowerCase().includes(q) ||
        cmd.category.toLowerCase().includes(q),
    );
  }, [commands, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector('.command-item--active');
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  // Group commands by category
  const grouped: Record<string, Command[]> = {};
  filteredCommands.forEach((cmd) => {
    if (!grouped[cmd.category]) grouped[cmd.category] = [];
    grouped[cmd.category].push(cmd);
  });

  let flatIndex = 0;

  return (
    <div className="command-palette-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Command Palette">
      <div className="command-palette" onClick={(e) => e.stopPropagation()}>
        <div className="command-palette__search">
          <Search size={18} className="command-palette__search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="command-palette__input"
            placeholder={t('search.placeholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={t('search.placeholder')}
          />
          <kbd className="command-palette__kbd">ESC</kbd>
        </div>

        <div className="command-palette__list" ref={listRef} role="listbox">
          {filteredCommands.length === 0 ? (
            <div className="command-palette__empty">{t('search.noResults')}</div>
          ) : (
            Object.entries(grouped).map(([category, cmds]) => (
              <div key={category} className="command-group">
                <span className="command-group__label">{category}</span>
                {cmds.map((cmd) => {
                  const currentIndex = flatIndex++;
                  const isSelected = currentIndex === selectedIndex;
                  return (
                    <div
                      key={cmd.id}
                      role="option"
                      aria-selected={isSelected}
                      className={`command-item ${isSelected ? 'command-item--active' : ''}`}
                      onClick={() => cmd.action()}
                      onMouseEnter={() => setSelectedIndex(currentIndex)}
                    >
                      <span className="command-item__icon">{cmd.icon}</span>
                      <div className="command-item__content">
                        <span className="command-item__label">{cmd.label}</span>
                        {cmd.description && (
                          <span className="command-item__desc">{cmd.description}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="command-palette__footer">
          <span>↑↓ to navigate</span>
          <span>↵ to select</span>
          <span>esc to close</span>
        </div>
      </div>
    </div>
  );
}
