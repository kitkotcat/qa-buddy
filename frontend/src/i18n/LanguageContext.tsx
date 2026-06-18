import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { translations } from "./translations";
import type { Language } from "./translations";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
};

const LANGUAGE_STORAGE_KEY = "qa-buddy-language";

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getStoredLanguage(): Language {
  const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);

  if (storedLanguage === "ru" || storedLanguage === "en") {
    return storedLanguage;
  }

  return "en";
}

function getTranslationValue(language: Language, key: string): string {
  const keys = key.split(".");
  let currentValue: unknown = translations[language];

  for (const currentKey of keys) {
    if (
      typeof currentValue === "object" &&
      currentValue !== null &&
      currentKey in currentValue
    ) {
      currentValue = (currentValue as Record<string, unknown>)[currentKey];
    } else {
      return key;
    }
  }

  return typeof currentValue === "string" ? currentValue : key;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getStoredLanguage);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ru" : "en");
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t: (key: string) => getTranslationValue(language, key),
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
