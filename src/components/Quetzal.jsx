import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import EnredaderaSVG from "./EnredaderaSVG";

import "./Caracol.css";

import quetzal1 from "../assets/quetzal.jpg";
import quetzal2 from "../assets/quetzal2.jpg";
import quetzal3 from "../assets/quetzal3.jpg";
import quetzal4 from "../assets/quetzal4.jpg";

const images = [quetzal1, quetzal2, quetzal3, quetzal4];


const sections = [
  {
    image: quetzal1,
    text: "Quetzal es más que una estancia: es una pausa entre mundos. Al llegar, no entras solo en un espacio físico, sino en una energía que te llama desde mucho antes. Aquí, la arquitectura y la naturaleza se mezclan como si lo hubieran planeado juntas. Es un umbral. Y si lo estás cruzando, no es por azar.",
  },
  {
    image: quetzal2,
    text: "El interior respira contigo. Cada rincón invita al recogimiento. Hay quietud, pero no vacío. Hay belleza, pero sin exceso. El descanso aquí no es solo del cuerpo, sino de todo lo que traías encima sin darte cuenta. Es como si el lugar supiera exactamente lo que necesitas soltar.",
  },
  {
    image: quetzal3,
    text: "La luz entra como una guía silenciosa. Se posa en la madera, en las fibras, en tus pensamientos. El tiempo se diluye. Empiezas a recordar cómo era estar presente sin exigencias, sin deberes. Solo estar. Solo sentir. Como si Quetzal no fuera un lugar, sino un estado del alma.",
  },
  {
    image: quetzal4,
    text: "Cuando salgas, quizás no notes el cambio de inmediato. Pero algo dentro de ti se habrá reordenado. Menos ruido. Más propósito. Y una certeza: necesitabas este respiro. Quetzal no busca impresionarte. Solo quiere que recuerdes lo que era habitarte de verdad.",
  },
];

const Quetzal = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const letterAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.02,
        duration: 0.4,
      },
    }),
  };

  return (
    <>
      <Helmet>
        <title>Quetzal – Alojamiento en Finca Oaxaca</title>
        <meta
          name="description"
          content="Quetzal es un refugio íntimo en Finca Oaxaca. Luz suave, arquitectura natural y una energía que invita al recogimiento y la introspección."
        />
        <meta
          property="og:title"
          content="Quetzal – Alojamiento en Finca Oaxaca"
        />
        <meta
          property="og:description"
          content="Descubre Quetzal: una pausa entre mundos, un espacio donde el alma respira y el tiempo se vuelve presencia."
        />
        <meta property="og:url" content="https://fincaoaxaca.com/quetzal" />
        <meta
          property="og:image"
          content="https://fincaoaxaca.com/assets/quetzal.jpg"
        />
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
          Quetzal
        </motion.h2>

        <div className="caracol-actions">
          <a
            href="https://www.airbnb.es/rooms/1254848960032414437?source_impression_id=p3_1754864715_P3BrR9z5UI_BwVTd"
            target="_blank"
            rel="noopener noreferrer"
            className="caracol-reserva-btn"
          >
            Reservar en Airbnb
          </a>
          <a
            href="https://www.booking.com/hotel/es/casa-quetzal.html"
            target="_blank"
            rel="noopener noreferrer"
            className="caracol-reserva-btn-booking"
          >
            Reservar en Booking
          </a>
        </div>
        {sections.map((section, idx) => (
          <motion.div
            className={`caracol-section ${
              idx % 2 === 0 ? "row-normal" : "row-reverse"
            }`}
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <img
              src={section.image}
              alt={`Imagen ${idx + 1}`}
              loading="eager"
              decoding="async"
              className="caracol-img"
              onClick={() => {
                setIndex(idx);
                setOpen(true);
              }}
            />

            <motion.p
              className="caracol-text"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {section.text.split("").map((char, i) => (
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
