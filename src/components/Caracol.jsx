import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import EnredaderaSVG from "./EnredaderaSVG";


import caracol1 from "../assets/caracol.webp";
import caracol2 from "../assets/caracol2.webp";
import caracol3 from "../assets/caracol3.webp";
import caracol4 from "../assets/caracol4.webp";

const images = [caracol1, caracol2, caracol3, caracol4];

const Caracol = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // Trae los textos como array desde i18n
  const sectionTexts = t("caracol.sections", { returnObjects: true }) || [];

  // Empareja cada texto con su imagen
  const sections = images.map((img, i) => ({
    image: img,
    text: sectionTexts[i] || "", // por si faltara alguna traducción
  }));

  const letterAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.02, duration: 0.4 },
    }),
  };

  return (
    <>
      <Helmet>
        <title>{t("caracol.seo.title")}</title>
        <meta name="description" content={t("caracol.seo.description")} />
        <meta property="og:title" content={t("caracol.seo.ogTitle")} />
        <meta property="og:description" content={t("caracol.seo.ogDescription")} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fincaoaxaca.com/caracol" />
        <meta property="og:image" content="https://fincaoaxaca.com/assets/caracol.jpg" />
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
          {t("caracol.title")}
        </motion.h2>

        <div className="caracol-actions">
          <a
            href="https://www.airbnb.es/rooms/833476686159085268?source_impression_id=p3_1754864715_P3RONwoX2N5zQaSW"
            target="_blank"
            rel="noopener noreferrer"
            className="caracol-reserva-btn"
          >
            {t("caracol.cta.airbnb")}
          </a>
          <a
            href="https://www.booking.com/hotel/es/casa-caracol-agaete.html"
            target="_blank"
            rel="noopener noreferrer"
            className="caracol-reserva-btn-booking"
          >
            {t("caracol.cta.booking")}
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
              alt={t("caracol.imageAlt", { n: idx + 1 })}
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
      </section>
    </>
  );
};

export default Caracol;
