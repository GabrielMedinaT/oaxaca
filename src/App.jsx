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

const SLIDE_FROM = "left";

function App() {
  const { t } = useTranslation();
  const { setLang } = useLang();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const [ripple, setRipple] = useState({ x: 0, y: 0, show: false });
  const [showLogin, setShowLogin] = useState(false);
  const [currentView, setCurrentView] = useState("landing");
  const [usuario, setUsuario] = useState(null);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  useEffect(() => {
    let timer;
    if (menuOpen) {
      timer = setTimeout(() => setShowClose(true), 2300);
    } else {
      setShowClose(false);
    }
    return () => clearTimeout(timer);
  }, [menuOpen]);

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
    if (view === "calendar") {
      setShowLogin(true);
    } else {
      setCurrentView(view);
    }
  };

  const handleLoginSuccess = (usuario) => {
    setUsuario(usuario);
    setShowLogin(false);
    setCurrentView("calendar");
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

  const menuItems = [
    { label: t("nav.home"), action: () => handleMenuClick("landing") },
    { label: t("nav.calendar"), action: () => handleMenuClick("calendar") },
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
        {/* Botones de idioma (estado global) */}
        <div className="lang-switch">
          <button onClick={() => setLang("es")}>ES</button>
          <button onClick={() => setLang("en")}>EN</button>
          <button onClick={() => setLang("de")}>DE</button>
        </div>

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
          onClose={() => setShowLogin(false)}
          onSuccess={handleLoginSuccess}
        />
      )}

      {/* CONTENIDO PRINCIPAL */}
      <div className="Render" style={{ position: "relative", width: "100vw" }}>
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

          {currentView === "calendar" && (
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
