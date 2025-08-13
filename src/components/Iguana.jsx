import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import EnredaderaSVG from "./EnredaderaSVG";

import "./Caracol.css";

import iguana1 from "../assets/iguana1.jpg";
import iguana2 from "../assets/iguana2.jpg";
import iguana3 from "../assets/iguana3.jpg";
import iguana4 from "../assets/iguana4.jpg";
import iguana5 from "../assets/iguana5.jpg";
import iguana6 from "../assets/iguana6.jpg";
import iguana7 from "../assets/iguana7.jpg";

const images = [iguana1, iguana2, iguana3, iguana4, iguana5, iguana6, iguana7];

const sections = [
  {
    image: iguana1,
    text: "En Iguana, todo comienza en el porche: un rincón simple, con una silla de forja y un cactus que saluda al sol. Aquí se siente la brisa, se escuchan las voces suaves del pueblo, y el día empieza sin prisas.",
  },
  {
    image: iguana2,
    text: "Dentro, el salón se abre como los brazos de un amigo. La madera, las texturas artesanas y la luz natural crean un ambiente donde lo cotidiano se convierte en refugio. Es un espacio que invita a estar juntos, sin necesidad de grandes planes.",
  },
  {
    image: iguana3,
    text: "En cada rincón, hay detalles que no buscan destacar, sino hacer hogar: una lámpara colgante, un sombrero que parece haber estado siempre ahí, o una mesa donde se puede charlar durante horas mientras cae la tarde.",
  },
  {
    image: iguana4,
    text: "El dormitorio principal combina descanso y calma. La luz entra con delicadeza, y todo invita a un sueño profundo. Es un lugar para recargar, pero también para soñar.",
  },
  {
    image: iguana5,
    text: "La habitación doble es perfecta para compartir. Confortable y serena, parece pensada para esas noches de conversación entre hermanos, primos o amigos que se reencuentran.",
  },
  {
    image: iguana6,
    text: "El baño combina lo rústico con lo funcional, sin perder el encanto. Cada detalle está ahí para que te sientas en casa, desde la estantería de madera hasta el espejo enmarcado.",
  },
  {
    image: iguana7,
    text: "Iguana no es solo un alojamiento: es una pequeña pausa en el tiempo. Ideal para familias o grupos que buscan reconectar, compartir y sentirse parte de algo más lento, más humano, más real.",
  },
];

const Iguana = () => {
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
  <title>Iguana – Alojamiento acogedor en Finca Oaxaca</title>
  <meta
    name="description"
    content="Descubre Iguana: un refugio cálido en Finca Oaxaca. Espacios con alma, detalles artesanales, ideal para familias que buscan desconectar y reconectar."
  />
  <meta name="robots" content="index, follow" />
  <meta property="og:locale" content="es_ES" />
  <meta property="og:site_name" content="Finca Oaxaca" />
  <meta
    property="og:title"
    content="Iguana – Alojamiento en Finca Oaxaca"
  />
  <meta
    property="og:description"
    content="Iguana es más que una casa: es una experiencia de calma, conexión y belleza simple en la naturaleza."
  />
  <meta property="og:url" content="https://fincaoaxaca.com/iguana" />
  <meta
    property="og:image"
    content="https://fincaoaxaca.com/assets/iguana1.jpg"
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
          Iguana
        </motion.h2>

        <div className="caracol-actions">
          <a
            href="https://www.airbnb.es/rooms/53715271?source_impression_id=p3_1754863491_P30OAqOLZZPmPoX9"
            target="_blank"
            rel="noopener noreferrer"
            className="caracol-reserva-btn"
          >
            Reservar en Airbnb
          </a>
          <a
            href="https://www.booking.com/hotel/es/finca-oaxaca-casa-iguana.html"
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
              alt={`Iguana vista ${idx + 1}`}
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

export default Iguana;
