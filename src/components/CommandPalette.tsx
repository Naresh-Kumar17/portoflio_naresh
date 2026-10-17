import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Moon, Sun, Globe } from 'lucide-react';
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
  const { t, locale, setLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();

  const commands: Command[] = useMemo(() => {
    const navCommands: Command[] = [
      { id: 'nav-home', label: t('nav.home'), icon: <ArrowRight size={16} />, action: () => { navigate('/'); onClose(); }, category: 'Navigation' },
      { id: 'nav-about', label: t('nav.about'), icon: <ArrowRight size={16} />, action: () => { navigate('/about'); onClose(); }, category: 'Navigation' },
      { id: 'nav-skills', label: t('nav.skills'), icon: <ArrowRight size={16} />, action: () => { navigate('/skills'); onClose(); }, category: 'Navigation' },
      { id: 'nav-projects', label: t('nav.projects'), icon: <ArrowRight size={16} />, action: () => { navigate('/projects'); onClose(); }, category: 'Navigation' },
      { id: 'nav-education', label: t('nav.education'), icon: <ArrowRight size={16} />, action: () => { navigate('/education'); onClose(); }, category: 'Navigation' },
      { id: 'nav-resume', label: t('nav.resume'), icon: <ArrowRight size={16} />, action: () => { navigate('/resume'); onClose(); }, category: 'Navigation' },
      { id: 'nav-contact', label: t('nav.contact'), icon: <ArrowRight size={16} />, action: () => { navigate('/contact'); onClose(); }, category: 'Navigation' },
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

    return [...navCommands, ...projectCommands, ...actionCommands];
  }, [navigate, onClose, t, theme, toggleTheme, locale, setLocale]);

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q),
    );
  }, [commands, query]);

  // Reset state when opened
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (prevIsOpen !== isOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((i) => Math.max(i - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (filtered[selectedIndex]) {
            filtered[selectedIndex].action();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, filtered, selectedIndex]);

  // Scroll selected item into view
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const selected = list.children[selectedIndex] as HTMLElement;
    selected?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  if (!isOpen) return null;

  // Group commands by category
  const grouped = filtered.reduce<Record<string, Command[]>>((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {});

  let globalIndex = -1;

  return (
    <div className="cmd-palette" role="dialog" aria-modal="true" aria-label="Command palette">
      <div className="cmd-palette__overlay" onClick={onClose} />
      <div className="cmd-palette__panel">
        <div className="cmd-palette__search">
          <Search size={18} className="cmd-palette__search-icon" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-palette__input"
            placeholder={t('cmd.placeholder')}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            aria-label="Search commands"
            autoComplete="off"
          />
          <kbd className="cmd-palette__kbd" aria-hidden="true">ESC</kbd>
        </div>

        <div className="cmd-palette__results" ref={listRef} role="listbox">
          {filtered.length === 0 ? (
            <div className="cmd-palette__empty">{t('cmd.noResults')}</div>
          ) : (
            Object.entries(grouped).map(([category, cmds]) => (
              <div key={category} className="cmd-palette__group">
                <div className="cmd-palette__group-label">{category}</div>
                {cmds.map((cmd) => {
                  globalIndex++;
                  const index = globalIndex;
                  return (
                    <button
                      key={cmd.id}
                      className={`cmd-palette__item ${index === selectedIndex ? 'cmd-palette__item--active' : ''}`}
                      onClick={cmd.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      role="option"
                      aria-selected={index === selectedIndex}
                    >
                      <span className="cmd-palette__item-icon">{cmd.icon}</span>
                      <span className="cmd-palette__item-content">
                        <span className="cmd-palette__item-label">{cmd.label}</span>
                        {cmd.description && (
                          <span className="cmd-palette__item-desc">{cmd.description}</span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
