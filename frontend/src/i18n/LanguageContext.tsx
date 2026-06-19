import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
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

const LanguageContext =
  createContext<LanguageContextValue | null>(null);

function getStoredLanguage(): Language {
  try {
    const storedLanguage = localStorage.getItem(
      LANGUAGE_STORAGE_KEY
    );

    if (
      storedLanguage === "ru" ||
      storedLanguage === "en"
    ) {
      return storedLanguage;
    }
  } catch {
    // Local storage may be unavailable in restricted environments.
  }

  // Primary language for the first RuStore release.
  return "ru";
}

function getTranslationValue(
  language: Language,
  key: string
): string {
  const keys = key.split(".");
  let currentValue: unknown = translations[language];

  for (const currentKey of keys) {
    if (
      typeof currentValue === "object" &&
      currentValue !== null &&
      currentKey in currentValue
    ) {
      currentValue = (
        currentValue as Record<string, unknown>
      )[currentKey];
    } else {
      return key;
    }
  }

  return typeof currentValue === "string"
    ? currentValue
    : key;
}

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguageState] =
    useState<Language>(getStoredLanguage);

  const setLanguage = useCallback(
    (nextLanguage: Language) => {
      setLanguageState(nextLanguage);

      try {
        localStorage.setItem(
          LANGUAGE_STORAGE_KEY,
          nextLanguage
        );
      } catch {
        // UI still works even when storage is unavailable.
      }
    },
    []
  );

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "en" ? "ru" : "en");
  }, [language, setLanguage]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t: (key: string) =>
        getTranslationValue(language, key),
    }),
    [language, setLanguage, toggleLanguage]
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
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}
