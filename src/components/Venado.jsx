import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import EnredaderaSVG from "./EnredaderaSVG";

//import "./Caracol.css";

import venado1 from "../assets/venado-1.jpg";
import venado2 from "../assets/venado-2.jpg";
import venado3 from "../assets/venado-3.jpg";
import venado4 from "../assets/venado-4.jpg";
import venado5 from "../assets/venado-5.jpg";
import venado6 from "../assets/venado-6.jpg";
import venado7 from "../assets/venado-7.jpg";
import venado8 from "../assets/venado-8.jpg";
import venado9 from "../assets/venado-9.jpg";

const images = [venado1, venado2, venado3, venado4, venado5, venado6, venado7, venado8, venado9];

const Venado = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const sectionTexts = t("venado.sections", { returnObjects: true }) || [];
  const sections = images.map((img, i) => ({ image: img, text: sectionTexts[i] || "" }));

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
        <title>{t("venado.seo.title")}</title>
        <meta name="description" content={t("venado.seo.description")} />
        <meta property="og:title" content={t("venado.seo.ogTitle")} />
        <meta property="og:description" content={t("venado.seo.ogDescription")} />
        <meta property="og:url" content="https://fincaoaxaca.com/venado" />
        <meta property="og:image" content="https://fincaoaxaca.com/assets/venado-1.jpg" />
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
          {t("venado.title")}
        </motion.h2>

        <div className="caracol-actions">
          <a
            href="https://www.airbnb.es/rooms/1254866858731670693?source_impression_id=p3_1754866148_P3VmhSzsMMfvL_fD"
            target="_blank" rel="noopener noreferrer"
            className="caracol-reserva-btn"
          >
            {t("venado.cta.airbnb")}
          </a>
        <a
            href="https://www.booking.com/hotel/es/casa-venado.html"
            target="_blank" rel="noopener noreferrer"
            className="caracol-reserva-btn-booking"
          >
            {t("venado.cta.booking")}
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
              alt={t("venado.imageAlt", { n: idx + 1 })}
              loading="eager"
              decoding="async"
              className="caracol-img"
              onClick={() => { setIndex(idx); setOpen(true); }}
            />

            <motion.p className="caracol-text" initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {String(section.text).split("").map((char, i) => (
                <motion.span key={i} custom={i} variants={letterAnimation}>{char}</motion.span>
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

export default Venado;
