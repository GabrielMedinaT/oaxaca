import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

const LangContext = createContext({
  lang: i18n.resolvedLanguage || "es",
  setLang: () => {},
});

export function useLang() {
  return useContext(LangContext);
}

export default function CambioIdioma({ children }) {
  const [lang, setLangState] = useState(i18n.resolvedLanguage || "es");

  // sincroniza cambios externos (navegador, ?lng=) -> estado React
  useEffect(() => {
    const onChange = (lng) => setLangState(lng);
    i18n.on("languageChanged", onChange);
    return () => i18n.off("languageChanged", onChange);
  }, []);

  // API de cambio (botones): cambia i18next y persiste
  const value = useMemo(
    () => ({
      lang,
      setLang: (lng) => {
        i18n.changeLanguage(lng);
        try { localStorage.setItem("i18nextLng", lng); } catch {}
      },
    }),
    [lang]
  );

  return (
    <I18nextProvider i18n={i18n}>
      <LangContext.Provider value={value}>{children}</LangContext.Provider>
    </I18nextProvider>
  );
}
