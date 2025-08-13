import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const Landing = () => {
  const { t, i18n } = useTranslation();
  const renders = useRef(0);
  renders.current++;

  // Log cada render de Landing + idioma actual
  console.log("[Landing] render", {
    language: i18n.language,
    resolved: i18n.resolvedLanguage,
    renders: renders.current,
  });

  // Logea el título traducido en cada render (para ver si cambia realmente)
  console.log("[Landing] title:", t("landing.meta.title"));

  // Escucha el evento global de cambio de idioma
  useEffect(() => {
    const onChange = (lng) => {
      console.log("[Landing] languageChanged event ->", lng);
      console.log("[Landing] title after change:", t("landing.meta.title"));
    };
    i18n.on("languageChanged", onChange);
    return () => i18n.off("languageChanged", onChange);
  }, [i18n, t]);

  return (
    <>
      <Helmet>
        <title>{t("landing.meta.title")}</title>
        <meta name="description" content={t("landing.meta.description")} />
        <meta property="og:title" content={t("landing.meta.ogTitle")} />
        <meta
          property="og:description"
          content={t("landing.meta.ogDescription")}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fincaoaxaca.com/" />
        <meta
          property="og:image"
          content="https://fincaoaxaca.com/og-image.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="datos">
        <div className="logo"></div>
        <h3>
          <a
            href="https://www.google.com/maps/place//data=!4m2!3m1!1s0xc408b2a894389e5:0x5764d465be41d8bd?sa=X&ved=1t:8290&ictx=111"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("landing.address")}
          </a>
        </h3>
        <h3>
          <a href="tel:+34683463315">{t("landing.call")}</a>
        </h3>
        <h3>
          <a
            href="https://wa.me/34683463315?text=Hola,%20quiero%20más%20información"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("landing.whatsapp")}
          </a>
        </h3>
      </div>
    </>
  );
};

export default Landing;
