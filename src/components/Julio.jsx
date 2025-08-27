import React from "react";
import "./css/Julio.css";
import { useTranslation, Trans } from "react-i18next";

const YT = ({ id, title }) => (
  <div className="video-embed">
    <iframe
      title={title}
      width="100%"
      height="400"
      src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
    />
  </div>
);

const NewsCard = ({ title, desc, href, source }) => (
  <a className="news-card" href={href} target="_blank" rel="noopener noreferrer">
    <div className="news-meta"><span className="news-source">{source}</span></div>
    <h4 className="news-title">{title}</h4>
    {desc && <p className="news-desc">{desc}</p>}
  </a>
);

export default function Julio() {
  const { t } = useTranslation();

  return (
    <section className="julio-container">
      <div className="julio-content">
        {/* HERO */}
        <header className="julio-hero">
          <div>
            <h2 className="julio-title">{t("julio.title")}</h2>
            <p className="julio-subtitle">{t("julio.subtitle")}</p>
          </div>
        </header>

        {/* BIO */}
        <article className="julio-section">
          <h3>{t("julio.bio.title")}</h3>
          <p className="julio-description">{t("julio.bio.p1")}</p>
        </article>

        {/* TRAYECTORIA */}
        <article className="julio-section">
          <h3>{t("julio.career.title")}</h3>
          <ul className="julio-list">
            <li><Trans i18nKey="julio.career.items.0" components={{ strong: <strong/> }} /></li>
            <li><Trans i18nKey="julio.career.items.1" components={{ strong: <strong/> }} /></li>
            <li><Trans i18nKey="julio.career.items.2" components={{ strong: <strong/> }} /></li>
            <li>{t("julio.career.items.3")}</li>
          </ul>
        </article>

        {/* MASTERCHEF */}
        <article className="julio-section">
          <h3>{t("julio.masterchef.title")}</h3>
          <p className="julio-description">{t("julio.masterchef.desc")}</p>
          <YT id="6ttdJ0A9x8E" title={t("julio.masterchef.videoTitle4")} />
          <p className="julio-note">
            <a
              href="https://www.rtve.es/play/videos/masterchef/masterchef-3-clase-de-cocina-mexicana/3147188/"
              target="_blank" rel="noopener noreferrer"
            >
              {t("julio.masterchef.linkMc3")}
            </a>
          </p>
        </article>

        {/* RECONOCIMIENTOS */}
        <article className="julio-section">
          <h3>{t("julio.awards.title")}</h3>
          <ul className="julio-list">
            <li>{t("julio.awards.items.0")}</li>
            <li><Trans i18nKey="julio.awards.items.1" components={{ strong: <strong/> }} /></li>
          </ul>
          <YT id="oyIZI8Zt14o" title={t("julio.awards.videoTitle")} />
        </article>

        {/* PRENSA */}
        <article className="julio-section">
          <h3>{t("julio.press.title")}</h3>
          <div className="news-grid">
            <NewsCard
              source={t("julio.press.sources.senado")}
              title={t("julio.press.cards.0.title")}
              desc={t("julio.press.cards.0.desc")}
              href="https://comunicacionsocial.senado.gob.mx/multimedia/galeria/9032-reconocimiento-al-chef-mexicano-julio-cesar-valdez-por-su-gran-labor-como-embajador-de-la-cultura-y-gastronomia-mexicana-en-el-mundo"
            />
            <NewsCard
              source={t("julio.press.sources.cronica")}
              title={t("julio.press.cards.1.title")}
              desc={t("julio.press.cards.1.desc")}
              href="https://www.cronica.com.mx/cultura/distinguen-chef-julio-cesar-valdez-llevar-cocina-poblana-espana.html"
            />
            <NewsCard
              source={t("julio.press.sources.tribuna")}
              title={t("julio.press.cards.2.title")}
              desc={t("julio.press.cards.2.desc")}
              href="https://tribunanoticias.mx/reconoce-senado-de-la-republica-al-chef-julio-cesar-valdez/"
            />
            <NewsCard
              source={t("julio.press.sources.rtve")}
              title={t("julio.press.cards.3.title")}
              desc={t("julio.press.cards.3.desc")}
              href="https://www.rtve.es/play/videos/masterchef/masterchef-4-clase-cocina-mexicana/3633495/"
            />
          </div>
        </article>
      </div>
    </section>
  );
}
