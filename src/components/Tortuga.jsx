import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import EnredaderaSVG from "./EnredaderaSVG";

//import "./Caracol.css";

import tortuga1 from "../assets/tortuga.jpg";
import tortuga2 from "../assets/tortuga2.jpg";
import tortuga3 from "../assets/tortuga3.jpg";
import tortuga4 from "../assets/tortuga4.jpg";
import tortuga5 from "../assets/tortuga5.jpg";

const images = [tortuga1, tortuga2, tortuga3, tortuga4, tortuga5];

const Tortuga = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  // Textos desde i18n (array)
  const sectionTexts = t("tortuga.sections", { returnObjects: true }) || [];
  const sections = images.map((img, i) => ({ image: img, text: sectionTexts[i] || "" }));

  const letterAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.02, duration: 0.4 } }),
  };

  const noches = fechaInicio && fechaFin
    ? (new Date(fechaFin) - new Date(fechaInicio)) / (1000 * 60 * 60 * 24)
    : 0;

  return (
    <>
      <Helmet>
        <title>{t("tortuga.seo.title")}</title>
        <meta name="description" content={t("tortuga.seo.description")} />
        <meta property="og:title" content={t("tortuga.seo.ogTitle")} />
        <meta property="og:description" content={t("tortuga.seo.ogDescription")} />
        <meta property="og:url" content="https://fincaoaxaca.com/tortuga" />
        <meta property="og:image" content="https://fincaoaxaca.com/assets/tortuga.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <EnredaderaSVG />

      <section className="caracol-wrap">
        <motion.h2
          className="caracol-title"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {t("tortuga.title")}
        </motion.h2>

        <div className="caracol-actions">
          <a
            href="https://www.airbnb.es/rooms/583679793860083965?source_impression_id=p3_1754865179_P3Uu7hgjlKF6mo08"
            target="_blank" rel="noopener noreferrer"
            className="caracol-reserva-btn"
          >
            {t("tortuga.cta.airbnb")}
          </a>
          <a
            href="https://www.booking.com/hotel/es/casa-tortuga-finca-oaxaca.html"
            target="_blank" rel="noopener noreferrer"
            className="caracol-reserva-btn-booking"
          >
            {t("tortuga.cta.booking")}
          </a>
        </div>

        {sections.map((section, idx) => (
          <motion.div
            className={`caracol-section ${idx % 2 === 0 ? "row-normal" : "row-reverse"}`}
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img
              src={section.image}
              alt={t("tortuga.imageAlt", { n: idx + 1 })}
              onClick={() => { setIndex(idx); setOpen(true); }}
              className="caracol-img"
            />
            <motion.p className="caracol-text" initial="hidden" animate="visible">
              {String(section.text).split("").map((char, i) => (
                <motion.span key={i} custom={i} variants={letterAnimation}>
                  {char}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
        ))}

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={images.map((src) => ({ src }))}
        />

        {/* Resumen de precio (opcional) */}
        {fechaInicio && fechaFin && noches > 0 && (
          <div className="resumen-precio">
            <p><strong>{t("tortuga.price.perNight")}:</strong> 65 €</p>
            <p><strong>{t("tortuga.price.nights")}:</strong> {noches}</p>
            <p><strong>{t("tortuga.price.total")}:</strong> {noches * 65} €</p>
          </div>
        )}

        {/* Selector de fechas (UI opcional sin Stripe) */}
        {/*
        <div className="reserva-form">
          <h3>{t("tortuga.price.title")}</h3>
          <label>
            {t("tortuga.price.checkin")}
            <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
          </label>
          <label>
            {t("tortuga.price.checkout")}
            <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
          </label>
        </div>
        */}
      </section>
    </>
  );
};

export default Tortuga;
