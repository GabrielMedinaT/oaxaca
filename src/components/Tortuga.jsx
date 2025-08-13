import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import { loadStripe } from "@stripe/stripe-js"; // ✅ Importa Stripe
import "yet-another-react-lightbox/styles.css";
import EnredaderaSVG from "./EnredaderaSVG";

import "./Caracol.css";

import tortuga1 from "../assets/tortuga.jpg";
import tortuga2 from "../assets/tortuga2.jpg";
import tortuga3 from "../assets/tortuga3.jpg";
import tortuga4 from "../assets/tortuga4.jpg";
import tortuga5 from "../assets/tortuga5.jpg";

//  REEMPLAZA con tu clave pública real (pk_test...)
/*const stripePromise = loadStripe(
  "pk_test_51RQdpEQ7cuFV7p7dVbm0vbBFQPdVz248zsjifSyICcQFinkkHtPS9uuOFGoSSJUn8DpdLYuqbYBkToER9TrK1wDH00sq0vJgfc"
);*/

const images = [tortuga1, tortuga2, tortuga3, tortuga4, tortuga5];

const sections = [
  {
    image: tortuga1,
    text: "Tortuga es la calma hecha espacio. El dormitorio principal, con su luz natural y suelo de piedra, invita al descanso profundo. Todo aquí está pensado para que el tiempo se sienta distinto: más lento, más tuyo.",
  },
  {
    image: tortuga2,
    text: "La habitación doble ofrece equilibrio: privacidad con cercanía, perfecta para quienes viajan con amigos o familia. Las texturas, las lámparas suaves y los tonos neutros acompañan el descanso con armonía.",
  },
  {
    image: tortuga3,
    text: "El baño, con sus tonos azules y blancos, recuerda al mar. Sencillo pero completo, ofrece todo lo necesario para una pausa renovadora. Aquí, cada ducha se convierte en un pequeño ritual.",
  },
  {
    image: tortuga4,
    text: "La cocina, orientada al exterior, conecta con la vida del entorno. La gran ventana deja entrar la luz y la vista, integrando el interior con el paisaje. Cocinar aquí es compartir, es observar, es ser parte.",
  },
  {
    image: tortuga5,
    text: "El salón de Tortuga reúne todo: conversación, descanso, lecturas, juegos. Las lámparas de fibras naturales, el sofá acogedor y los libros abiertos hacen de este lugar un corazón cálido para compartir.",
  },
];

/**
 * Componente Tortuga.
 *
 * Muestra la información y galería de la habitación "Tortuga" en Finca Oaxaca,
 * permitiendo al usuario seleccionar fechas y reservar mediante Stripe.
 *
 * Características:
 * - Animación de texto y secciones con Framer Motion.
 * - Galería de imágenes con Lightbox.
 * - Formulario para seleccionar fechas de entrada y salida.
 * - Cálculo automático del precio total según noches seleccionadas.
 * - Integración con Stripe para el proceso de pago.
 * - Metadatos SEO y Open Graph para la página.
 *
 * @component
 * @returns {JSX.Element} Elemento React que representa la página de la habitación Tortuga.
 */
const Tortuga = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

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

  /*const reservar = async () => {
    if (!fechaInicio || !fechaFin) {
      alert("Por favor selecciona ambas fechas.");
      return;
    }

    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    const diferencia = (fin - inicio) / (1000 * 60 * 60 * 24); // días

    if (diferencia <= 0) {
      alert("La fecha de salida debe ser posterior a la de entrada.");
      return;
    }

    const precioPorNoche = 65; // en euros
    const precioTotal = diferencia * precioPorNoche * 100; // en céntimos

    try {
      const stripe = await stripePromise;

      const response = await fetch("/api/payment/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          habitacion: "Tortuga",
          fechaInicio,
          fechaFin,
          precioTotal: Math.round(precioTotal), // redondear a céntimos
        }),
      });

      const data = await response.json();

      if (data.id) {
        const result = await stripe.redirectToCheckout({
          sessionId: data.id,
        });

        if (result.error) {
          console.error(result.error.message);
          alert("Hubo un error al redirigir al pago.");
        }
      } else {
        console.error(data);
        alert("No se pudo crear la sesión de pago.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor.");
    }
    console.log("Noches:", diferencia, "Total en céntimos:", precioTotal);
  };*/

  return (
    <>
      <Helmet>
        <title>Tortuga – Alojamiento en Finca Oaxaca</title>
        <meta
          name="description"
          content="Tortuga es un refugio de calma en Finca Oaxaca. Espacios serenos, texturas suaves y luz natural para reconectar contigo mismo y con los tuyos."
        />
        <meta
          property="og:title"
          content="Tortuga – Alojamiento en Finca Oaxaca"
        />
        <meta
          property="og:description"
          content="Descubre Tortuga: calma, conexión y belleza serena en cada rincón. Un espacio donde el tiempo se vuelve tuyo."
        />
        <meta property="og:url" content="https://fincaoaxaca.com/tortuga" />
        <meta
          property="og:image"
          content="https://fincaoaxaca.com/assets/tortuga.jpg"
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

          Tortuga
        </motion.h2>

        <div className="caracol-actions">
          <a
            href="https://www.airbnb.es/rooms/583679793860083965?source_impression_id=p3_1754865179_P3Uu7hgjlKF6mo08"
            target="_blank"
            rel="noopener noreferrer"
            className="caracol-reserva-btn"
          >
            Reservar en Airbnb
          </a>
          <a
            href="https://www.booking.com/hotel/es/casa-tortuga-finca-oaxaca.html"
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
        {fechaInicio &&
          fechaFin &&
          new Date(fechaFin) > new Date(fechaInicio) && (
            <div className="resumen-precio">
              <p>
                <strong>Precio por noche:</strong> 65 €
              </p>
              <p>
                <strong>Noches:</strong>{" "}
                {(new Date(fechaFin) - new Date(fechaInicio)) /
                  (1000 * 60 * 60 * 24)}
              </p>
              <p>
                <strong>Total:</strong>{" "}
                {((new Date(fechaFin) - new Date(fechaInicio)) /
                  (1000 * 60 * 60 * 24)) *
                  65}{" "}
                €
              </p>
            </div>
          )}
        {/*
<div className="reserva-form">
  <h3>Reservar esta habitación</h3>
  <label>
    Fecha de entrada:
    <input
      type="date"
      value={fechaInicio}
      onChange={(e) => setFechaInicio(e.target.value)}
    />
  </label>
  <label>
    Fecha de salida:
    <input
      type="date"
      value={fechaFin}
      onChange={(e) => setFechaFin(e.target.value)}
    />
  </label>
  <button onClick={reservar} className="btn-reservar">
    Reservar ahora
  </button>
</div>
*/}
      </section>
    </>
  );
};

export default Tortuga;
