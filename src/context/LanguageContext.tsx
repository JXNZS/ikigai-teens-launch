import React, { createContext, useContext, useState, useEffect } from "react";
import { type Language, translations } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const getTranslation = (key: string, lang: Language): string => {
  // 1. Handle special namespaces containing dots or custom structure
  if (key.startsWith("faq.questions.")) {
    const subKey = key.slice("faq.questions.".length);
    const translation = translations.faq?.questions?.[lang]?.[subKey] || translations.faq?.questions?.["en"]?.[subKey];
    return translation !== undefined ? translation : subKey;
  }
  if (key.startsWith("faq.strings.")) {
    const subKey = key.slice("faq.strings.".length);
    const translation = translations.faq?.strings?.[lang]?.[subKey] || translations.faq?.strings?.["en"]?.[subKey];
    return translation !== undefined ? translation : subKey;
  }
  if (key.startsWith("values.strings.")) {
    const subKey = key.slice("values.strings.".length);
    const translation = translations.values?.strings?.[lang]?.[subKey] || translations.values?.strings?.["en"]?.[subKey];
    return translation !== undefined ? translation : subKey;
  }
  if (key.startsWith("philosophy.strings.")) {
    const subKey = key.slice("philosophy.strings.".length);
    const translation = translations.philosophy?.strings?.[lang]?.[subKey] || translations.philosophy?.strings?.["en"]?.[subKey];
    return translation !== undefined ? translation : subKey;
  }
  if (key.startsWith("journey.strings.")) {
    const subKey = key.slice("journey.strings.".length);
    const translation = translations.journey?.strings?.[lang]?.[subKey] || translations.journey?.strings?.["en"]?.[subKey];
    return translation !== undefined ? translation : subKey;
  }

  // 2. Standard nested lookup
  const parts = key.split(".");
  let current: any = translations;
  
  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = current[part];
    } else {
      return key;
    }
  }
  
  if (current && typeof current === "object") {
    if (current[lang] !== undefined && current[lang] !== "") {
      return current[lang];
    }
    if (current["en"] !== undefined && current["en"] !== "") {
      return current["en"];
    }
    return key;
  }
  
  return typeof current === "string" ? current : key;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const stored = localStorage.getItem("language");
      if (stored === "en" || stored === "kn") {
        return stored as Language;
      }
    }
    return "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("language", lang);
    }
  };

  const t = (key: string): string => {
    return getTranslation(key, language);
  };

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

interface TranslateProps {
  id: string;
}

export const Translate: React.FC<TranslateProps> = ({ id }) => {
  const { t } = useLanguage();
  return <>{t(id)}</>;
};
