import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { translations, type Locale } from '../data/translations';

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === 'undefined') return 'en';
    const stored = localStorage.getItem('portfolio-locale');
    if (stored === 'en' || stored === 'ur') return stored;
    return 'en';
  });

  const dir = locale === 'ur' ? 'rtl' : 'ltr';
  const isRTL = locale === 'ur';

  useEffect(() => {
    document.documentElement.setAttribute('lang', locale);
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem('portfolio-locale', locale);
  }, [locale, dir]);

  const setLocale = (l: Locale) => setLocaleState(l);

  const t = useCallback(
    (key: string): string => {
      return translations[locale]?.[key] ?? translations.en[key] ?? key;
    },
    [locale],
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, dir, isRTL }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
