import { useEffect, useState } from "react";

export default function CookiesBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cookieConsent");
    if (!saved) setOpen(true);
  }, []);

  const sendCurrentPageView = () => {
    if (!window.gtag) return;
    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname + window.location.search + window.location.hash,
    });
  };

  const acceptAnalytics = () => {
    localStorage.setItem("cookieConsent", "analytics");
    window.gtag?.("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      functionality_storage: "granted",
      security_storage: "granted",
    });
    sendCurrentPageView(); // opcional
    setOpen(false);
  };

  const rejectAll = () => {
    localStorage.setItem("cookieConsent", "rejected");
    window.gtag?.("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      functionality_storage: "granted",
      security_storage: "granted",
    });
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div style={{
      position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 99999,
      background: "rgba(20,20,20,.98)", color: "#fff", padding: "1rem",
      display: "flex", flexWrap: "wrap", gap: ".5rem", justifyContent: "center"
    }}>
      <span style={{ maxWidth: 800 }}>
        Usamos cookies para entender cómo se usa la web y mejorarla. ¿Aceptas?
      </span>
      <div style={{ display: "flex", gap: ".5rem" }}>
        <button onClick={rejectAll} style={{ border: "1px solid #fff" }}>Rechazar</button>
        <button onClick={acceptAnalytics} style={{ border: "1px solid #fff" }}>Aceptar analítica</button>
      </div>
    </div>
  );
}
