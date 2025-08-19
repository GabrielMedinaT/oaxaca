import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import EnredaderaSVG from "./EnredaderaSVG";



import iguana1 from "../assets/iguana1.jpg";
import iguana2 from "../assets/iguana2.jpg";
import iguana3 from "../assets/iguana3.jpg";
import iguana4 from "../assets/iguana4.jpg";
import iguana5 from "../assets/iguana5.jpg";
import iguana6 from "../assets/iguana6.jpg";
import iguana7 from "../assets/iguana7.jpg";

const images = [iguana1, iguana2, iguana3, iguana4, iguana5, iguana6, iguana7];

const Iguana = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // textos desde i18n (array)
  const sectionTexts = t("iguana.sections", { returnObjects: true }) || [];
  const sections = images.map((img, i) => ({
    image: img,
    text: sectionTexts[i] || "",
  }));

  const letterAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.02, duration: 0.4 },
    }),
  };

  return (
    <>
      <Helmet>
        <title>{t("iguana.seo.title")}</title>
        <meta name="description" content={t("iguana.seo.description")} />
        <meta name="robots" content="index, follow" />
        <meta property="og:locale" content={t("iguana.seo.ogLocale", { defaultValue: "es_ES" })} />
        <meta property="og:site_name" content="Finca Oaxaca" />
        <meta property="og:title" content={t("iguana.seo.ogTitle")} />
        <meta property="og:description" content={t("iguana.seo.ogDescription")} />
        <meta property="og:url" content="https://fincaoaxaca.com/iguana" />
        <meta property="og:image" content="https://fincaoaxaca.com/assets/iguana1.jpg" />
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
          {t("iguana.title")}
        </motion.h2>

        <div className="caracol-actions">
          <a
            href="https://www.airbnb.es/rooms/53715271?source_impression_id=p3_1754863491_P30OAqOLZZPmPoX9"
            target="_blank" rel="noopener noreferrer"
            className="caracol-reserva-btn"
          >
            {t("iguana.cta.airbnb")}
          </a>
          <a
            href="https://www.booking.com/hotel/es/finca-oaxaca-casa-iguana.html"
            target="_blank" rel="noopener noreferrer"
            className="caracol-reserva-btn-booking"
          >
            {t("iguana.cta.booking")}
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
              alt={t("iguana.imageAlt", { n: idx + 1 })}
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

export default Iguana;
