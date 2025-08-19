// src/components/Blog.jsx
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./css/Blog.css"; // OJO: B mayúscula

// ✅ Añadido: releaseAt en ISO (YYYY-MM-DD) para controlar publicación
const POSTS = [
  {
    id: "jul-15-2025",
    title: "5 experiencias místicas inspiradas en México que vivir en Gran Canaria",
    date: "15 de julio de 2025",
    releaseAt: "2025-07-15",
    excerpt:
      "Conecta con la esencia de México a través de rituales, cocina mexicana y bienestar holístico en Finca Oaxaca.",
    content: (
      <>
        <p>
          En <strong>Finca Oaxaca</strong> unimos la calma atlántica con la magia de
          <strong> México</strong>. Estas son cinco experiencias <strong>místicas y holísticas</strong>
          para nutrir cuerpo y espíritu.
        </p>
        <h3>1) Cocina mexicana como ritual consciente</h3>
        <p>
          Preparar tortillas, moler especias y compartir un mole es meditar con las manos.
          La <strong>cocina mexicana</strong> es tradición, gratitud y comunidad.
        </p>
        <h3>2) Ceremonias de conexión con la naturaleza</h3>
        <p>
          Respiración guiada al atardecer, paseos conscientes y pequeños rituales de
          agradecimiento inspirados en Oaxaca, adaptados al paisaje volcánico canario.
        </p>
        <h3>3) Habitaciones con alma mexicana</h3>
        <p>
          Caracol (renacimiento), Quetzal (libertad), Venado (calma), Iguana (resiliencia),
          Tortuga (tiempo) y Puma (fuerza). Espacios pensados para el descanso profundo.
        </p>
        <h3>4) Experiencias holísticas personalizadas</h3>
        <p>Yoga al amanecer, masajes y sesiones de introspección en un entorno íntimo.</p>
        <h3>5) La unión de México y Canarias</h3>
        <p>
          Dos energías que se encuentran: la calidez espiritual de México y la fuerza volcánica
          de Gran Canaria.
        </p>
        <p><strong>🌿 Reserva y vive la magia de Finca Oaxaca.</strong></p>
      </>
    ),
  },
  {
    id: "jul-28-2025",
    title: "Rituales holísticos para tu bienestar durante las vacaciones",
    date: "28 de julio de 2025",
    releaseAt: "2025-07-28",
    excerpt:
      "Rutinas sencillas para bajar revoluciones: respiración, escritura consciente y contacto con la naturaleza.",
    content: (
      <>
        <p>
          Las vacaciones son el momento ideal para crear hábitos de bienestar. En Finca Oaxaca
          proponemos <strong>rituales holísticos</strong> simples y efectivos.
        </p>
        <h3>Respiración en 4 tiempos</h3>
        <p>Inhala 4s, mantén 4s, exhala 4s, mantén 4s. 5 minutos cada mañana.</p>
        <h3>Escritura consciente</h3>
        <p>3 preguntas: ¿Qué agradezco hoy? ¿Qué necesito soltar? ¿Qué quiero crear?</p>
        <h3>Contacto con la tierra</h3>
        <p>Camina descalzo unos minutos; actividad sencilla y profundamente reguladora.</p>
        <p><strong>✨ Integra, descansa y vuelve renovado.</strong></p>
      </>
    ),
  },
  {
    id: "aug-10-2025",
    title: "La cocina mexicana como experiencia espiritual en tu viaje a Canarias",
    date: "10 de agosto de 2025",
    releaseAt: "2025-08-10",
    excerpt:
      "El maíz, el cacao y el chile como símbolos de abundancia, presencia y alegría para compartir.",
    content: (
      <>
        <p>
          La <strong>cocina mexicana</strong> es patrimonio vivo y experiencia espiritual.
          En Finca Oaxaca la convertimos en un viaje sensorial y consciente.
        </p>
        <h3>Sabores que cuentan historias</h3>
        <p>
          Maíz (origen), cacao (corazón) y chile (energía). Comer con intención eleva la experiencia.
        </p>
        <h3>Cocinar como meditación</h3>
        <p>Amasar, moler, mezclar: presencia plena paso a paso.</p>
        <h3>Puente México–Canarias</h3>
        <p>Ingredientes locales con técnicas mexicanas: identidad y encuentro.</p>
        <p><strong>🌮 Ven y siéntate a la mesa de Finca Oaxaca.</strong></p>
      </>
    ),
  },
  {
    id: "aug-15-2025",
    title: "Turismo consciente: conectar con la naturaleza en Gran Canaria",
    date: "15 de agosto de 2025",
    releaseAt: "2025-08-15",
    excerpt:
      "Ideas para un viaje lento: observar, respirar y cuidar el entorno con inspiración mexicana.",
    content: (
      <>
        <p>
          Practicar <strong>turismo consciente</strong> es viajar más lento y con respeto.
          Te proponemos micro-rituales para conectar con la isla y contigo.
        </p>
        <h3>Observación atenta</h3>
        <p>5 minutos en silencio: sonidos, texturas, temperatura, olores. Sin juzgar.</p>
        <h3>Ritual del agua</h3>
        <p>
          Antes de beber, agradece. Recuerda el valor del agua en culturas ancestrales de México.
        </p>
        <h3>Dejar el lugar mejor</h3>
        <p>Pequeños gestos: recoger residuos, respetar senderos, honrar la flora.</p>
        <p><strong>🌊 Viaja con alma. La isla te lo devuelve.</strong></p>
      </>
    ),
  },

  /* 🔮 EJEMPLOS PROGRAMADOS (no se verán hasta su fecha) */
  {
    id: "sep-01-2025",
    title: "Equinoccio y balance: rituales para iniciar septiembre con intención",
    date: "19 de agosto de 2025",
    releaseAt: "2025-08-19",
    excerpt:
      "Pequeños rituales diarios para equilibrar energía y foco al inicio de mes.",
    content: (
      <>
        <p>
          Septiembre invita a equilibrar. Comparte con nosotros tres rituales simples
          para enfocarte y abrir ciclo con claridad.
        </p>
        <h3>Respiración & gratitud</h3>
        <p>3 minutos por la mañana, 3 cosas que agradeces al final del día.</p>
        <h3>Intención escrita</h3>
        <p>Una frase guía para tu mes, visible en tu espacio personal.</p>
        <h3>Caminar consciente</h3>
        <p>10 minutos diarios observando sensaciones del cuerpo y entorno.</p>
      </>
    ),
  },
  {
    id: "oct-12-2025",
    title: "Cacao ceremonial: el corazón dulce de Oaxaca",
    date: "20 de agosto de 2025",
    releaseAt: "2025-08-20",
    excerpt:
      "Un acercamiento respetuoso al cacao como planta maestra: historia, cuidado y propósito.",
    content: (
      <>
        <p>
          El cacao, símbolo de corazón y encuentro. Te contamos cómo lo honramos con respeto,
          historia y propósito.
        </p>
        <h3>Historia y simbolismo</h3>
        <p>De bebida de reyes a ritual de unión y escucha.</p>
        <h3>Respeto a la planta</h3>
        <p>Origen, trazabilidad y cuidado al preparar.</p>
        <h3>Compartir intención</h3>
        <p>Más allá del sabor, es un momento de comunidad.</p>
      </>
    ),
  },
];

function isReleased(isoDate) {
  // Compara usando medianoche UTC del día de publicación
  // Para “se muestra a partir del día X” es suficiente.
  return new Date(isoDate) <= new Date();
}

export default function Blog() {
  // 🔎 Filtramos solo posts liberados y los ordenamos por fecha de publicación descendente
  const releasedPosts = useMemo(() => {
    return POSTS
      .filter((p) => isReleased(p.releaseAt))
      .sort((a, b) => new Date(b.releaseAt) - new Date(a.releaseAt));
  }, []);

  // Abrimos por defecto el más reciente liberado (si hay)
  const [openId, setOpenId] = useState(releasedPosts[0]?.id ?? null);

  useEffect(() => {
    document.title =
      "Blog | Finca Oaxaca – México, cocina mexicana y experiencias holísticas";
  }, []);

  return (
    <main className="blog-container">
      <header>
        <h1 className="blog-title">Blog de Finca Oaxaca</h1>
        <p style={{ opacity: 0.8, textAlign: "center", marginBottom: "20px" }}>
          México, <strong>cocina mexicana</strong>, experiencias <strong>holísticas</strong> y <strong>místicas</strong> en Gran Canaria.
        </p>
      </header>

      {releasedPosts.length === 0 ? (
        <p style={{ textAlign: "center", opacity: 0.8 }}>
          <em>Pronto publicaremos nuestras primeras entradas.</em>
        </p>
      ) : (
        <section>
          {releasedPosts.map((post) => {
            const isOpen = openId === post.id;
            return (
              <article key={post.id} className="blog-post">
                <button
                  onClick={() => setOpenId(isOpen ? null : post.id)}
                  className="blog-content"
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                  aria-expanded={isOpen}
                  aria-controls={`content-${post.id}`}
                >
                  <div>
                    <span className="blog-date">{post.date}</span>
                    <h2>{post.title}</h2>
                    <p className="blog-description">{post.excerpt}</p>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`content-${post.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      style={{ overflow: "hidden", borderTop: "1px solid #eee" }}
                    >
                      <div className="blog-content">{post.content}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </section>
      )}

      {/*  mostrar cuántos están programados */}
      {/* <p style={{textAlign:'center', marginTop: 16, opacity:.7}}>
        {POSTS.length - releasedPosts.length} entradas programadas aún no visibles.
      </p> */}
    </main>
  );
}
