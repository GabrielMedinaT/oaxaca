import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import EnredaderaSVG from "./EnredaderaSVG";
import "./Caracol.css";

import caracol1 from "../assets/caracol.jpg";
import caracol2 from "../assets/caracol2.jpg";
import caracol3 from "../assets/caracol3.jpg";
import caracol4 from "../assets/caracol4.jpg";

const images = [caracol1, caracol2, caracol3, caracol4];

const sections = [
  {
    image: caracol1,
    text: "Tal vez no ha sido casualidad que hayas llegado hasta aquí. Caracol es un refugio orgánico, tejido de calma y silencio. Su forma te envuelve, como si quisiera recordarte algo que habías olvidado: que el mundo no siempre tiene que ir deprisa. Aquí, cada piedra, cada sombra, cada aroma de madera natural está puesto para acompañarte en ese retorno a lo esencial.",
  },
  {
    image: caracol2,
    text: "Dentro, la luz no irrumpe: se posa. La cama baja, protegida entre texturas de barro y madera, es más que un lugar para dormir: es una invitación a soltar. A veces uno no sabe lo cansado que está, hasta que se detiene de verdad. Y aquí, entre lo sutil y lo simple, detenerse se vuelve inevitable.",
  },
  {
    image: caracol3,
    text: "En lo alto, el altillo mira al corazón de la cúpula. No es solo un lugar elevado: es una especie de templo íntimo. Allí, el cuerpo descansa, pero es el alma la que se abre. Quien sube, siente. Quien siente, entiende que hay momentos en que no hace falta entender nada más.",
  },
  {
    image: caracol4,
    text: "Y cuando mires alrededor y veas que no hay más que lo justo y necesario, recordarás que eso era todo lo que buscabas. Caracol no es una habitación: es una experiencia discreta, pero radical. No te distrae, no te exige. Solo te acoge. Porque si estás aquí, quizás sea porque ya sabías, aunque no lo supieras, que lo necesitabas.",
  },
];

const Caracol = () => {
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
        <title>Caracol – Refugio holístico en Finca Oaxaca</title>
        <meta
          name="description"
          content="Caracol es un refugio íntimo en Finca Oaxaca, diseñado para reconectar con la calma. Descubre una estancia única, rodeado de barro, madera y silencio."
        />
        <meta property="og:title" content="Caracol – Refugio en Finca Oaxaca" />
        <meta
          property="og:description"
          content="Hospédate en Caracol y déjate envolver por la tranquilidad natural de Agaete. Vive una experiencia holística, discreta y esencial."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fincaoaxaca.com/caracol" />
        <meta
          property="og:image"
          content="https://fincaoaxaca.com/assets/caracol.jpg"
        />
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
          Caracol
        </motion.h2>

        <div className="caracol-actions">
          <a
            href="https://www.airbnb.es/rooms/833476686159085268?source_impression_id=p3_1754864715_P3RONwoX2N5zQaSW"
            target="_blank"
            rel="noopener noreferrer"
            className="caracol-reserva-btn"
          >
            Reservar en Airbnb
          </a>
          <a
            href="https://www.booking.com/hotel/es/casa-caracol-agaete.html"
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
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img
              src={section.image}
              alt={`Imagen de Caracol ${idx + 1}`}
              onClick={() => {
                setIndex(idx);
                setOpen(true);
              }}
              className="caracol-img"
            />

            <motion.p
              className="caracol-text"
              initial="hidden"
              animate="visible"
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

export default Caracol;
