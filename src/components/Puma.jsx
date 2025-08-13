import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import EnredaderaSVG from "./EnredaderaSVG";

import "./Caracol.css";

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

const images = [
  puma1,
  puma2,
  puma3,
  puma4,
  puma5,
  puma6,
  puma7,
  puma9,
  puma10,
  puma11,
];

const sections = [
  {
    image: puma1,
    text: "Puma es fuerza tranquila. Un espacio pensado para quienes quieren reconectar con la tierra y con ellos mismos, sin renunciar a la comodidad ni a la belleza. Aquí cada objeto parece contar una historia, cada rincón invita a detenerse.",
  },
  {
    image: puma2,
    text: "Desde la primera luz de la mañana, la casa se llena de energía suave: esa que no empuja, pero sostiene. La arquitectura conversa con el entorno, lo respeta, lo celebra.",
  },
  {
    image: puma3,
    text: "Las habitaciones son templos de descanso. La madera, las texturas orgánicas y la luz cálida se combinan para ofrecer no solo un lugar para dormir, sino un lugar para soltar.",
  },
  {
    image: puma4,
    text: "La cocina es una invitación: a cocinar, a compartir, a probar. A veces el fuego está en los fogones, a veces en las palabras que fluyen mientras se preparan los alimentos.",
  },
  {
    image: puma5,
    text: "Afuera, el paisaje no compite, acompaña. Puma tiene un jardín vivo, respirable, que se convierte en un refugio, en una pausa del mundo. Aquí los atardeceres no se miran: se sienten.",
  },
  {
    image: puma6,
    text: "Puma es ideal para quienes valoran la experiencia completa. Para quienes buscan algo más que un alojamiento: una sensación, un recuerdo que se queda cuando ya te has ido.",
  },
  {
    image: puma7,
    text: "Ya sea en pareja, en grupo o en solitario, esta casa se adapta al ritmo de quien la habita. Siempre con respeto, con intención, con alma.",
  },
  {
    image: puma9,
    text: "Y cuando creas que lo has visto todo, algo —quizás un rayo de sol, una sombra en la pared, una brisa inesperada— te recordará que Puma aún guarda sorpresas.",
  },
  {
    image: puma10,
    text: "Porque hay lugares que se viven. Y hay otros que se recuerdan con el cuerpo entero. Puma es ambos.",
  },
  {
    image: puma11,
    text: "En Puma, hasta el último rincón fue pensado para el bienestar. Una terraza, una sombra, una vista... todo invita a quedarte un poco más.",
  },
];

const Puma = () => {
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
        <title>Puma – Alojamiento en Finca Oaxaca</title>
        <meta
          name="description"
          content="Puma es un espacio sereno y con alma en Finca Oaxaca. Detalles cuidados, luz suave y rincones que invitan a quedarse. Perfecto para reconectar contigo y con la naturaleza."
        />
        <meta
          property="og:title"
          content="Puma – Alojamiento en Finca Oaxaca"
        />
        <meta
          property="og:description"
          content="Descubre Puma: donde el silencio habla, la tierra abraza y cada detalle tiene alma. Un lugar que se queda contigo."
        />
        <meta property="og:url" content="https://fincaoaxaca.com/puma" />
        <meta
          property="og:image"
          content="https://fincaoaxaca.com/assets/puma1.jpg"
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
          Puma
        </motion.h2>

        <div className="caracol-actions">
          <a
            href="https://www.airbnb.es/rooms/53715274?source_impression_id=p3_1754864715_P3s2TADYvStmtY__"
            target="_blank"
            rel="noopener noreferrer"
            className="caracol-reserva-btn"
          >
            Reservar en Airbnb
          </a>
          <a
            href="https://www.booking.com/hotel/es/casa-puma-agaete.html"
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
              alt={`Imagen ${idx + 1}`}
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

export default Puma;
