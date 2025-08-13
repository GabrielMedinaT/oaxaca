import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import EnredaderaSVG from "./EnredaderaSVG";

//import "./Caracol.css";

import quetzal1 from "../assets/quetzal.jpg";
import quetzal2 from "../assets/quetzal2.jpg";
import quetzal3 from "../assets/quetzal3.jpg";
import quetzal4 from "../assets/quetzal4.jpg";

const images = [quetzal1, quetzal2, quetzal3, quetzal4];

const Quetzal = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const sectionTexts = t("quetzal.sections", { returnObjects: true }) || [];
  const sections = images.map((img, i) => ({ image: img, text: sectionTexts[i] || "" }));

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
        <title>{t("quetzal.seo.title")}</title>
        <meta name="description" content={t("quetzal.seo.description")} />
        <meta property="og:title" content={t("quetzal.seo.ogTitle")} />
        <meta property="og:description" content={t("quetzal.seo.ogDescription")} />
        <meta property="og:url" content="https://fincaoaxaca.com/quetzal" />
        <meta property="og:image" content="https://fincaoaxaca.com/assets/quetzal.jpg" />
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
          {t("quetzal.title")}
        </motion.h2>

        <div className="caracol-actions">
          <a
            href="https://www.airbnb.es/rooms/1254848960032414437?source_impression_id=p3_1754864715_P3BrR9z5UI_BwVTd"
            target="_blank" rel="noopener noreferrer"
            className="caracol-reserva-btn"
          >
            {t("quetzal.cta.airbnb")}
          </a>
          <a
            href="https://www.booking.com/hotel/es/casa-quetzal.html"
            target="_blank" rel="noopener noreferrer"
            className="caracol-reserva-btn-booking"
          >
            {t("quetzal.cta.booking")}
          </a>
        </div>

        {sections.map((section, idx) => (
          <motion.div
            className={`caracol-section ${idx % 2 === 0 ? "row-normal" : "row-reverse"}`}
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <img
              src={section.image}
              alt={t("quetzal.imageAlt", { n: idx + 1 })}
              loading="eager" decoding="async"
              className="caracol-img"
              onClick={() => { setIndex(idx); setOpen(true); }}
            />
            <motion.p className="caracol-text" initial="hidden" whileInView="visible" viewport={{ once: true }}>
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

export default Quetzal;
