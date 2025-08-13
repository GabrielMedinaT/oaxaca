import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import es from "./locales/es/common.json";
import en from "./locales/en/common.json";
import de from "./locales/de/common.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { common: es },
      en: { common: en },
      de: { common: de },
    },
    supportedLngs: ["es", "en", "de"],
    fallbackLng: "es",
    ns: ["common"],
    defaultNS: "common",
    load: "languageOnly",
    nonExplicitSupportedLngs: true,
    detection: {
      order: ["querystring", "localStorage", "navigator", "htmlTag"],
      lookupQuerystring: "lng",
      caches: ["localStorage"],
    },
    interpolation: { escapeValue: false },
    react: { useSuspense: true },
  });

i18n.on("languageChanged", (lng) => {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("lang", lng);
  }
});

export default i18n;
