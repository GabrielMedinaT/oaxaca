// src/App.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLang } from "./CambioIdioma";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";

import "./App.css";
import LoginTracker from "./components/LoginTracker";
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
  Blog,
  Reviews,
  Julio,
  CookiesBanner
} from "./components";
import useGA4PageViews from "./analytics/useGA4PageViews";

const SLIDE_FROM = "left";

function App() {
  const { t } = useTranslation();
  useGA4PageViews();
  const { setLang } = useLang();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const [ripple, setRipple] = useState({ x: 0, y: 0, show: false });
  const [showLogin, setShowLogin] = useState(false);
  const [usuario, setUsuario] = useState(null);

  const [submenuOpen, setSubmenuOpen] = useState(false); // Estancias
  const [submenuEquipoOpen, setSubmenuEquipoOpen] = useState(false); // Equipo
  const [showComingSoon, setShowComingSoon] = useState(true);

  useEffect(() => {
    let timer;
    if (menuOpen) timer = setTimeout(() => setShowClose(true), 2300);
    else setShowClose(false);
    return () => clearTimeout(timer);
  }, [menuOpen]);

  // Mantener control de login para /calendario
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

  const navigateTo = (to) => {
    setMenuOpen(false);
    setSubmenuOpen(false);
    setSubmenuEquipoOpen(false);
    navigate(to);
  };

  const handleLoginSuccess = (usuario) => {
    setUsuario(usuario);
    setShowLogin(false);
    navigate("/calendario");
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, when: "beforeChildren" } },
    exit: { transition: { staggerChildren: 0.08, staggerDirection: -1 } },
  };

  const hiddenOffset = SLIDE_FROM === "left" ? { x: -40, y: 0 } : { x: 0, y: 24 };
  const exitOffset = SLIDE_FROM === "left" ? { x: -30, y: 0 } : { x: 0, y: 18 };

  const itemVariants = {
    hidden: { opacity: 0, ...hiddenOffset },
    visible: { opacity: 1, x: 0, y: 0, transition: { type: "spring", stiffness: 180, damping: 18 } },
    exit: { opacity: 0, ...exitOffset, transition: { duration: 0.25 } },
  };

  // Submenús como rutas
  const submenuItems = [
    { label: t("rooms.caracol"), to: "/estancias/caracol" },
    { label: t("rooms.quetzal"), to: "/estancias/quetzal" },
    { label: t("rooms.venado"), to: "/estancias/venado" },
    { label: t("rooms.iguana"), to: "/estancias/iguana" },
    { label: t("rooms.tortuga"), to: "/estancias/tortuga" },
    { label: t("rooms.puma"), to: "/estancias/puma" },
  ];

  const submenuEquipo = [
    { label: "Julio", to: "/equipo/julio" },
  ];

  const menuItems = [
    { label: t("nav.home"), to: "/" },
    { label: t("nav.stays"), isSubmenu: true, key: "stays" },
    { label: t("nav.team"), isSubmenu: true, key: "team" },
    { label: t("nav.experiences"), to: "/experiencias" },
    { label: "Blog", to: "/blog" },
    { label: t("nav.reviews"), to: "/reviews" },
    {
      label: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="48" height="48" aria-label="Instagram">
          <defs>
            <linearGradient id="ig" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#f58529" />
              <stop offset="25%" stopColor="#feda77" />
              <stop offset="50%" stopColor="#dd2a7b" />
              <stop offset="75%" stopColor="#8134af" />
              <stop offset="100%" stopColor="#515bd4" />
            </linearGradient>
          </defs>
          <rect x="32" y="32" width="448" height="448" rx="96" ry="96" fill="url(#ig)" />
          <path fill="#fff" d="M256 164c-50.7 0-92 41.3-92 92s41.3 92 92 92 92-41.3 92-92-41.3-92-92-92zm0 148a56 56 0 1 1 0-112 56 56 0 0 1 0 112zm116-154a22 22 0 1 1 0-44 22 22 0 0 1 0 44z" />
          <path fill="#fff" d="M352 64H160c-52.9 0-96 43.1-96 96v192c0 52.9 43.1 96 96 96h192c52.9 0 96-43.1 96-96V160c0-52.9-43.1-96-96-96zm64 288c0 35.3-28.7 64-64 64H160c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64h192c35.3 0 64 28.7 64 64v192z" />
        </svg>
      ),
      href: "https://www.instagram.com/finca_oaxaca/",
    },
  ];

  const transitionVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <div className="coming-soon-container">
      {/* HEADER STICKY */}
      <header className="HeaderSticky" style={{ position: "sticky", top: 0, zIndex: 1000 }}>
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
                <clipPath id="t"><path d="M30,15 h30 v15 h-30 z v15 h-30 v-15 z v-15 h30 z" /></clipPath>
                <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
                <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
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
  >
    <h1>{t("nav.proximamente")}</h1>
    <div style={{ width: "60%", height: "70vh" }}>
      <iframe
        src="https://retiroserenity.com/upcoming-yoga-retreat-at-oaxaca-a-journey-to-the-self/"
        title="Upcoming Yoga Retreat at Oaxaca"
        style={{ width: "100%", height: "100%", border: "none" }}
      />
    </div>
    <button onClick={() => setShowComingSoon(false)} style={{ marginTop: "1rem" }}>
      {t("actions.close")}
    </button>
  </motion.div>
)}

          </AnimatePresence>

          {!menuOpen && (
            <motion.div
              key="hamburger"
              className="hamburger"
              onClick={handleHamburgerClick}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {ripple.show && <span className="ripple" style={{ top: ripple.y, left: ripple.x }} />}
              <span></span><span></span><span></span>
            </motion.div>
          )}

          {menuOpen && showClose && (
            <motion.div
              key="close"
              className="close-btn"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              aria-label={t("actions.close")} role="button"
            >
              ✕
            </motion.div>
          )}

          <div className="logo-center"></div>
        </div>

        {/* MARQUESINA oculta solo en /calendario */}
        {location.pathname !== "/calendario" && (
          <div className="marquee" role="status" aria-live="polite" style={{ marginTop: 0 }}>
            <div className="marquee__inner">
              <span>{t("marquee.reservas")}</span>
              <span>{t("marquee.grande")}</span>
            </div>
          </div>
        )}
      </header>

      {/* MENÚ LATERAL */}
      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            className="side-menu"
            initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.ul variants={containerVariants} initial="hidden" animate="visible" exit="exit">
              {menuItems.map((item, idx) => (
                <motion.li key={idx} variants={itemVariants}>
                  {item.href ? (
                    <a
                      href={item.href} target="_blank" rel="noopener noreferrer"
                      onClick={() => setMenuOpen(false)} className="menu-link"
                    >
                      {item.label}
                    </a>
                  ) : item.isSubmenu ? (
                    <button
                      onClick={() => {
                        if (item.key === "stays") setSubmenuOpen((v) => !v);
                        if (item.key === "team") setSubmenuEquipoOpen((v) => !v);
                      }}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <button onClick={() => navigateTo(item.to)}>{item.label}</button>
                  )}

                  {/* Submenú Estancias */}
                  <AnimatePresence>
                    {item.isSubmenu && item.key === "stays" && submenuOpen && (
                      <motion.ul
                        className="submenu"
                        variants={containerVariants}
                        initial="hidden" animate="visible" exit="exit"
                        style={{ marginTop: "0.5rem" }}
                      >
                        {submenuItems.map((sub) => (
                          <motion.li key={sub.to} variants={itemVariants}>
                            <button className="botonE" onClick={() => navigateTo(sub.to)}>
                              {sub.label}
                            </button>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>

                  {/* Submenú Equipo */}
                  <AnimatePresence>
                    {item.isSubmenu && item.key === "team" && submenuEquipoOpen && (
                      <motion.ul
                        className="submenu"
                        variants={containerVariants}
                        initial="hidden" animate="visible" exit="exit"
                        style={{ marginTop: "0.5rem" }}
                      >
                        {submenuEquipo.map((sub) => (
                          <motion.li key={sub.to} variants={itemVariants}>
                            <button className="botonE" onClick={() => navigateTo(sub.to)}>
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

      {/* MODAL LOGIN (para /calendario) */}
      {showLogin && (
        <LoginModal
          onClose={() => {
            setShowLogin(false);
            if (location.pathname === "/calendario" && !usuario) navigate("/");
          }}
          onSuccess={handleLoginSuccess}
        />
      )}

      {/* CONTENIDO PRINCIPAL POR RUTAS */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={transitionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.6 }}
          style={{ position: "relative", width: "100vw" }}
        >
          <Routes>
            {/* Landing */}
            <Route path="/" element={<Landing />} />

            {/* Estancias */}
            <Route path="/estancias/caracol" element={<Caracol />} />
            <Route path="/estancias/quetzal" element={<Quetzal />} />
            <Route path="/estancias/venado" element={<Venado />} />
            <Route path="/estancias/iguana" element={<Iguana />} />
            <Route path="/estancias/tortuga" element={<Tortuga />} />
            <Route path="/estancias/puma" element={<Puma />} />

            {/* Experiencias, Blog, Reviews */}
            <Route path="/experiencias" element={<ExperienciasCulinarias />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/reviews" element={<Reviews />} />

            {/* Equipo */}
            <Route path="/equipo/julio" element={<Julio />} />

            {/* Ocultas: Historial (sin login) y Calendario (con login) */}
            <Route path="/historial" element={<LoginTracker />} />
            <Route
              path="/calendario"
              element={usuario ? <Calendar usuario={usuario} /> : null}
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      {/* 🔹 BANNER COOKIES: aquí, antes del footer */}
      <CookiesBanner />


      {/* FOOTER */}
      <footer className="footer">
        <p>{t("footer.rights")}</p>
        <p>{t("footer.createdBy")}</p>
      </footer>
    </div>
  );
}

export default App;
