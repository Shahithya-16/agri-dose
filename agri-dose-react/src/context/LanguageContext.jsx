import { createContext, useContext, useState, useCallback } from 'react';
import { t as translate, tMap as translateMap, tDisease as translateDisease } from '../i18n/translations.js';

const LANG_KEY = 'agridose_lang';
const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => localStorage.getItem(LANG_KEY) || 'en');

  const setLang = useCallback((next) => {
    setLangState(next);
    localStorage.setItem(LANG_KEY, next);
    // Helps screen readers / browser features pick the right language
    document.documentElement.lang = next === 'ta' ? 'ta' : 'en';
  }, []);

  const t = useCallback((key) => translate(lang, key), [lang]);
  const tMap = useCallback((mapName, key) => translateMap(lang, mapName, key), [lang]);
  const tDisease = useCallback((diseaseId) => translateDisease(lang, diseaseId), [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tMap, tDisease }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside a LanguageProvider');
  return ctx;
}

