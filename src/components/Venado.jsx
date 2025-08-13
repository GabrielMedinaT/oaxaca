import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import EnredaderaSVG from "./EnredaderaSVG";

import "./Caracol.css";

import venado1 from "../assets/venado-1.jpg";
import venado2 from "../assets/venado-2.jpg";
import venado3 from "../assets/venado-3.jpg";
import venado4 from "../assets/venado-4.jpg";
import venado5 from "../assets/venado-5.jpg";
import venado6 from "../assets/venado-6.jpg";
import venado7 from "../assets/venado-7.jpg";
import venado8 from "../assets/venado-8.jpg";
import venado9 from "../assets/venado-9.jpg";

const images = [
  venado1,
  venado2,
  venado3,
  venado4,
  venado5,
  venado6,
  venado7,
  venado8,
  venado9,
];

const sections = [
  {
    image: venado1,
    text: "Venado nace del deseo profundo de compartir sin invadir. Su amplitud no es solo física, es energética. Aquí, el grupo respira como un solo cuerpo, pero cada alma tiene su rincón sagrado para recogerse y recordar quién es.",
  },
  {
    image: venado2,
    text: "La madera y la piedra se extienden como una piel viva. En sus texturas habita la memoria de lo esencial. Venado no decora: revela. Lo que ves es lo justo, lo necesario. Como la vida, cuando se vuelve plena sin excesos.",
  },
  {
    image: venado3,
    text: "Las ventanas son umbrales, no barreras. Cada rayo que entra acaricia, no invade. En este espacio, el sol parece entender que hay que hablar bajito. Es una danza suave entre el adentro y el afuera.",
  },
  {
    image: venado4,
    text: "Venado acoge risas largas y silencios cómodos. No obliga a nada: propone. Es un lugar que sostiene encuentros, pero también permite retirarse. Porque lo holístico empieza en reconocer los ritmos propios.",
  },
  {
    image: venado5,
    text: "El descanso aquí es colectivo. No como imposición, sino como regalo. Cuando cae la noche, todo se ablanda. Las conversaciones bajan de volumen. Y el cuerpo, sin darse cuenta, se entrega a la tierra.",
  },
  {
    image: venado6,
    text: "Cada objeto tiene un propósito. Cada rincón, una intención. Venado es un acto de diseño consciente. Pero más que estética, es ética. Un hogar que te pregunta suavemente: ¿estás presente, de verdad?",
  },
  {
    image: venado7,
    text: "En el exterior, el bosque no es decorado: es parte del hogar. El sonido de las ramas, la brisa que atraviesa, los colores que cambian. Todo conspira para recordarte que tú también eres proceso, no producto.",
  },
  {
    image: venado8,
    text: "Venado invita a habitar el tiempo de otra manera. Aquí no se corre, se camina. No se ocupa, se honra. Porque cuando un grupo se encuentra en calma, algo profundo se sana, incluso sin decir palabra.",
  },
  {
    image: venado9,
    text: "Y cuando te vayas, Venado seguirá contigo. No como un recuerdo, sino como una nueva manera de habitar tu vida. Más simple. Más sutil. Más tú. Como si al compartir el espacio, también hubieras compartido el alma.",
  },
];

const Venado = () => {
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
        <title>Venado – Espacio grupal en Finca Oaxaca</title>
        <meta
          name="description"
          content="Venado es un espacio para compartir desde el respeto y la conciencia. Amplio, sereno y rodeado de bosque, invita al encuentro profundo y al descanso real."
        />
        <meta
          property="og:title"
          content="Venado – Espacio grupal en Finca Oaxaca"
        />
        <meta
          property="og:description"
          content="Descubre Venado: amplitud, madera viva, calma compartida. Un espacio grupal diseñado para sanar en comunidad."
        />
        <meta property="og:url" content="https://fincaoaxaca.com/venado" />
        <meta
          property="og:image"
          content="https://fincaoaxaca.com/assets/venado-1.jpg"
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

          Venadp
        </motion.h2>

        <div className="caracol-actions">
          <a
            href="https://www.airbnb.es/rooms/1254866858731670693?source_impression_id=p3_1754866148_P3VmhSzsMMfvL_fD"
            target="_blank"
            rel="noopener noreferrer"
            className="caracol-reserva-btn"
          >
            Reservar en Airbnb
          </a>
          <a
            href="https://www.booking.com/hotel/es/casa-venado.html"
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

export default Venado;
