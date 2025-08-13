import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import EnredaderaSVG from "./EnredaderaSVG";

//import "./Caracol.css";

import puma1 from "../assets/puma1.jpg";
import puma2 from "../assets/puma2.jpg";
import puma3 from "../assets/puma3.jpg";
import puma4 from "../assets/puma4.jpg";
import puma5 from "../assets/puma5.jpg";
import puma6 from "../assets/puma6.jpg";
import puma7 from "../assets/puma7.jpg";
import puma9 from "../assets/puma9.jpg";
import puma10 from "../assets/puma10.jpg";
import puma11 from "../assets/puma11.jpg";

const images = [puma1,puma2,puma3,puma4,puma5,puma6,puma7,puma9,puma10,puma11];

const Puma = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // textos desde i18n
  const sectionTexts = t("puma.sections", { returnObjects: true }) || [];
  const sections = images.map((img, i) => ({ image: img, text: sectionTexts[i] || "" }));

  const letterAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.02, duration: 0.4 } }),
  };

  return (
    <>
      <Helmet>
        <title>{t("puma.seo.title")}</title>
        <meta name="description" content={t("puma.seo.description")} />
        <meta property="og:title" content={t("puma.seo.ogTitle")} />
        <meta property="og:description" content={t("puma.seo.ogDescription")} />
        <meta property="og:url" content="https://fincaoaxaca.com/puma" />
        <meta property="og:image" content="https://fincaoaxaca.com/assets/puma1.jpg" />
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
          {t("puma.title")}
        </motion.h2>

        <div className="caracol-actions">
          <a
            href="https://www.airbnb.es/rooms/53715274?source_impression_id=p3_1754864715_P3s2TADYvStmtY__"
            target="_blank" rel="noopener noreferrer"
            className="caracol-reserva-btn"
          >
            {t("puma.cta.airbnb")}
          </a>
          <a
            href="https://www.booking.com/hotel/es/casa-puma-agaete.html"
            target="_blank" rel="noopener noreferrer"
            className="caracol-reserva-btn-booking"
          >
            {t("puma.cta.booking")}
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
              alt={t("puma.imageAlt", { n: idx + 1 })}
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

export default Puma;
