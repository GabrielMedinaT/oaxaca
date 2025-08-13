import React from "react";
import { Helmet } from "react-helmet-async";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
//import "./ExperienciasCulinarias.css";

import img1 from "../assets/experiencias1.png";
import img2 from "../assets/experiencias2.png";
import img3 from "../assets/experiencias3.png";
import img4 from "../assets/experiencias4.png";
import img5 from "../assets/experiencias5.png";
import img6 from "../assets/experiencias6.png";
import img7 from "../assets/experiencias7.png";
import img8 from "../assets/experiencias8.png";
import img9 from "../assets/experiencias9.png";
import img10 from "../assets/experiencias10.png";
import img11 from "../assets/experiencias11.png";
import img12 from "../assets/experiencias12.png";
import img13 from "../assets/experiencias13.png";
import img14 from "../assets/experiencias14.png";
import img16 from "../assets/experiencias16.png";

const experiencias = [
  { src: img1, texto: "Taller de tortillas al comal" },
  {
    src: img2,
    texto: "Desayuno campesino al amanecer, con sabores de la tierra",
  },
  { src: img3, texto: "Cocina ancestral con abuela" },
  { src: img4, texto: "Postre artesanal con sabor a hogar" },
  { src: img5, texto: "Cena al aire libre" },
  { src: img6, texto: "Sazón con ingredientes locales" },
  { src: img7, texto: "Platos tradicionales de Oaxaca" },
  { src: img8, texto: "Comida orgánica del huerto" },
  { src: img9, texto: "Noches que se beben a sorbos lentos" },
  { src: img10, texto: "Preparación de mole" },
  { src: img11, texto: "Del nopal directo a tu mesa" },
  { src: img12, texto: "Sabores del mercado local" },
  { src: img13, texto: "Clases de cocina con chef local" },
  { src: img14, texto: "Caminar bajo las estrellas, entre aromas y murmullos" },
  { src: img16, texto: "Picnic entre cactus y montes" },
];

const ExperienciasCulinarias = () => {
  const items = experiencias.map((exp, index) => (
    <div key={index} className="experiencia-item">
      <img src={exp.src} alt={exp.texto} className="experiencia-img" />
      <div className="experiencia-texto">{exp.texto}</div>
    </div>
  ));

  return (
    <>
      <Helmet>
        <title>Experiencias Culinarias – Finca Oaxaca</title>
        <meta
          name="description"
          content="Descubre experiencias culinarias únicas en Finca Oaxaca: talleres, sabores del huerto, cocina ancestral y momentos que nutren alma y cuerpo."
        />
        <meta property="og:title" content="Experiencias Culinarias – Finca Oaxaca" />
        <meta
          property="og:description"
          content="Desde tortillas al comal hasta cenas al aire libre bajo las estrellas. Vive la cocina como una experiencia en Finca Oaxaca."
        />
        <meta property="og:url" content="https://fincaoaxaca.com/experiencias" />
        <meta
          property="og:image"
          content="https://fincaoaxaca.com/assets/experiencias1.png"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="experiencias-carousel-container">
        <AliceCarousel
          mouseTracking
          items={items}
          autoPlay
          autoPlayInterval={5000}
          infinite
          disableButtonsControls
          responsive={{
            0: { items: 1 },
            768: { items: 1 },
          }}
        />
      </div>
    </>
  );
};

export default ExperienciasCulinarias;
