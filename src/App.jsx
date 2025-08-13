import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLang } from "./CambioIdioma";
import "./App.css";
import {
  Calendar,
  Landing,
  LoginModal,
  Caracol,
  Quetzal,
  Venado,
  Iguana,
  Tortuga,
  Puma,
  ExperienciasCulinarias,
} from "./components";
// import { nav } from "framer-motion/client"; // ❌ no se usa
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

const SLIDE_FROM = "left";

function App() {
  const { t } = useTranslation();
  const { setLang } = useLang();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const [ripple, setRipple] = useState({ x: 0, y: 0, show: false });
  const [showLogin, setShowLogin] = useState(false);
  const [currentView, setCurrentView] = useState("landing");
  const [usuario, setUsuario] = useState(null);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  // Estado para modal "Próximamente"
  const [showComingSoon, setShowComingSoon] = useState(true);

  useEffect(() => {
    let timer;
    if (menuOpen) {
      timer = setTimeout(() => setShowClose(true), 2300);
    } else {
      setShowClose(false);
    }
    return () => clearTimeout(timer);
  }, [menuOpen]);

  // 🔐 NUEVO: Si se entra a /calendario sin usuario, abrir modal de login
  useEffect(() => {
    if (location.pathname === "/calendario" && !usuario && !showLogin) {
      setShowLogin(true);
    }
  }, [location.pathname, usuario, showLogin]);

  const handleHamburgerClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipple({ x, y, show: true });
    setTimeout(() => setRipple((r) => ({ ...r, show: false })), 600);
    setMenuOpen(true);
  };

  const handleMenuClick = (view) => {
    setMenuOpen(false);
    setSubmenuOpen(false);
    // Ya no se usa "calendar" desde el menú
    setCurrentView(view);
  };

  const handleLoginSuccess = (usuario) => {
    setUsuario(usuario);
    setShowLogin(false);
    // Antes: setCurrentView("calendar");
    // Ahora calendario es una ruta: /calendario
    navigate("/calendario");
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, when: "beforeChildren" },
    },
    exit: { transition: { staggerChildren: 0.08, staggerDirection: -1 } },
  };

  const hiddenOffset =
    SLIDE_FROM === "left" ? { x: -40, y: 0 } : { x: 0, y: 24 };
  const exitOffset = SLIDE_FROM === "left" ? { x: -30, y: 0 } : { x: 0, y: 18 };

  const itemVariants = {
    hidden: { opacity: 0, ...hiddenOffset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { type: "spring", stiffness: 180, damping: 18 },
    },
    exit: { opacity: 0, ...exitOffset, transition: { duration: 0.25 } },
  };

  // ❗️Quitamos Calendario del menú
  const menuItems = [
    { label: t("nav.home"), action: () => handleMenuClick("landing") },
    {
      label: t("nav.stays"),
      isSubmenu: true,
      action: () => setSubmenuOpen((v) => !v),
    },
    {
      label: t("nav.experiences"),
      action: () => handleMenuClick("experienciasCulinarias"),
    },
  ];

  const submenuItems = [
    { label: t("rooms.caracol"), view: "caracol" },
    { label: t("rooms.quetzal"), view: "quetzal" },
    { label: t("rooms.venado"), view: "venado" },
    { label: t("rooms.iguana"), view: "iguana" },
    { label: t("rooms.tortuga"), view: "tortuga" },
    { label: t("rooms.puma"), view: "puma" },
  ];

  const transitionVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="coming-soon-container">
      {/* NAVBAR */}
      <div className="NavBar">
        <div className="lang-switch">
          <button onClick={() => setLang("es")} aria-label="Español">
            <svg width="24" height="16" viewBox="0 0 24 16">
              <rect width="24" height="16" fill="#C60B1E" />
              <rect y="4" width="24" height="8" fill="#FFC400" />
            </svg>
          </button>

          <button onClick={() => setLang("en")} aria-label="English">
            <svg width="24" height="16" viewBox="0 0 60 30">
              <clipPath id="t">
                <path d="M30,15 h30 v15 h-30 z v15 h-30 v-15 z v-15 h30 z" />
              </clipPath>
              <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
              <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
              <path
                d="M0,0 L60,30 M60,0 L0,30"
                clipPath="url(#t)"
                stroke="#C8102E"
                strokeWidth="4"
              />
              <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
              <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
            </svg>
          </button>

          <button onClick={() => setLang("de")} aria-label="Deutsch">
            <svg width="24" height="16" viewBox="0 0 5 3">
              <rect width="5" height="1" y="0" fill="#000" />
              <rect width="5" height="1" y="1" fill="#DD0000" />
              <rect width="5" height="1" y="2" fill="#FFCE00" />
            </svg>
          </button>
        </div>

        {/* MODAL "PRÓXIMAMENTE" */}
        <AnimatePresence>
          {showComingSoon && (
            <motion.div
              className="coming-soon-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setShowComingSoon(false)}
            >
              <motion.h1
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {t("nav.proximamente")}
              </motion.h1>
              <p> {t("nav.estamos")} </p>
            </motion.div>
          )}
        </AnimatePresence>

        {!menuOpen && (
          <motion.div
            key="hamburger"
            className="hamburger"
            onClick={handleHamburgerClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {ripple.show && (
              <span
                className="ripple"
                style={{ top: ripple.y, left: ripple.x }}
              />
            )}
            <span></span>
            <span></span>
            <span></span>
          </motion.div>
        )}

        {menuOpen && showClose && (
          <motion.div
            key="close"
            className="close-btn"
            onClick={() => setMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            aria-label={t("actions.close")}
            role="button"
          >
            ✕
          </motion.div>
        )}

        <div className="logo-center"></div>
      </div>

     {/* MARQUESINA (debajo del NavBar) */}
{location.pathname !== "/calendario" && (
<div className="marquee" role="status" aria-live="polite">
  <div className="marquee__inner">
    <span>· Reservas abiertas pronto · Síguenos para novedades.</span>
    <span>Algo grande está a punto de ocurrir</span>

    {/* Duplicados para scroll continuo */}
    <span aria-hidden="true">· Reservas abiertas pronto · Síguenos para novedades.</span>
    <span aria-hidden="true">Algo grande está a punto de ocurrir</span>
  </div>
</div>

)}

      {/* MENÚ LATERAL */}
      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            className="side-menu"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {menuItems.map((item) => (
                <motion.li key={item.label} variants={itemVariants}>
                  <button onClick={item.action}>{item.label}</button>

                  <AnimatePresence>
                    {item.isSubmenu && submenuOpen && (
                      <motion.ul
                        className="submenu"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={{ marginTop: "0.5rem" }}
                      >
                        {submenuItems.map((sub) => (
                          <motion.li key={sub.view} variants={itemVariants}>
                            <button
                              className="botonE"
                              onClick={() => handleMenuClick(sub.view)}
                            >
                              {sub.label}
                            </button>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.li>
              ))}
            </motion.ul>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* MODAL LOGIN */}
      {showLogin && (
        <LoginModal
          onClose={() => {
            // 🔐 NUEVO: si cierran el modal en /calendario sin usuario => volver a inicio
            setShowLogin(false);
            if (location.pathname === "/calendario" && !usuario) navigate("/");
          }}
          onSuccess={handleLoginSuccess}
        />
      )}

      {/* CONTENIDO PRINCIPAL */}
      <div className="Render" style={{ position: "relative", width: "100vw" }}>
        {/* Si la URL es /calendario, renderizamos esa página y ocultamos el resto */}
        {location.pathname === "/calendario" ? (
          <Routes>
            <Route
              path="/calendario"
              element={
                // 🔐 NUEVO: no renderizar el calendario si no hay usuario
                usuario ? (
                  <motion.div
                    key="calendar"
                    variants={transitionVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.6 }}
                    style={{ position: "absolute", width: "100vw" }}
                  >
                    <Calendar usuario={usuario} />
                  </motion.div>
                ) : null
              }
            />
          </Routes>
        ) : (
          <AnimatePresence mode="wait">
            {currentView === "landing" && (
              <motion.div
                key="landing"
                variants={transitionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.6 }}
                style={{ position: "absolute", width: "100vw" }}
              >
                <Landing />
              </motion.div>
            )}

            {["caracol", "quetzal", "venado", "iguana", "tortuga", "puma"].map(
              (view) =>
                currentView === view && (
                  <motion.div
                    key={view}
                    variants={transitionVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.6 }}
                    style={{ position: "absolute", width: "100vw" }}
                  >
                    {view === "caracol" && <Caracol />}
                    {view === "quetzal" && <Quetzal />}
                    {view === "venado" && <Venado />}
                    {view === "iguana" && <Iguana />}
                    {view === "tortuga" && <Tortuga />}
                    {view === "puma" && <Puma />}
                  </motion.div>
                )
            )}

            {currentView === "experienciasCulinarias" && (
              <motion.div
                key="experienciasCulinarias"
                variants={transitionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.6 }}
                style={{ position: "absolute", width: "100vw" }}
              >
                <ExperienciasCulinarias />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>{t("footer.rights")}</p>
        <p>{t("footer.createdBy")}</p>
      </footer>
    </div>
  );
}

export default App;
