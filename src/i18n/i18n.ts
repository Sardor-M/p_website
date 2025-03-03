import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { useEffect } from "react";
import { initReactI18next, useTranslation } from "react-i18next";

import enTranslations from "@/components/Common/langs/en.json";
import uzTranslations from "@/components/Common/langs/uz.json";

/**
 * {@link https://www.i18next.com/overview/configuration-options}
 * {@link https://github.com/i18next/i18next-browser-languageDetector}
 * */
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      uz: {
        translation: uzTranslations
      }
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default () => {
  const { i18n: i18nInstance } = useTranslation();

  useEffect(() => {
    if (!["uz", "en"].includes(i18nInstance.language)) {
      i18nInstance.changeLanguage("en");
    }
  }, []);
};