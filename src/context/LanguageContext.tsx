import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Language, translations, Translations } from "@/lib/i18n";
import { getLanguageFromPath, getPathForLanguage, detectBrowserLanguage } from "@/lib/languageUtils";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [language, setLanguageState] = useState<Language>(() => {
    if (location.pathname === "/" || location.pathname === "") {
      return detectBrowserLanguage();
    }
    return getLanguageFromPath(location.pathname);
  });

  // Auto-redirect when landing on bare root "/" to detected browser/system language
  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "") {
      const detected = detectBrowserLanguage();
      if (detected === "ru" || detected === "en") {
        navigate(`/${detected}${location.search}${location.hash}`, { replace: true });
      }
    }
  }, [location.pathname, location.search, location.hash, navigate]);

  // Sync state if pathname changes externally (e.g. browser back/forward buttons or direct navigation)
  useEffect(() => {
    const langFromPath = getLanguageFromPath(location.pathname);
    if (langFromPath !== language) {
      setLanguageState(langFromPath);
      document.documentElement.lang = langFromPath;
    }
  }, [location.pathname, language]);

  const setLanguage = useCallback(
    (newLang: Language) => {
      try {
        localStorage.setItem("user_lang", newLang);
      } catch {
        // Ignore storage errors
      }

      setLanguageState(newLang);
      document.documentElement.lang = newLang;
      const targetUrl = getPathForLanguage(
        newLang,
        location.pathname,
        location.search,
        location.hash
      );
      const currentUrl = `${location.pathname}${location.search}${location.hash}`;
      if (targetUrl !== currentUrl) {
        navigate(targetUrl);
      }
    },
    [location.pathname, location.search, location.hash, navigate]
  );

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
