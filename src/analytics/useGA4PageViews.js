import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const SKIP_ROUTES = [/^\/calendario/, /^\/historial/];

export default function useGA4PageViews() {
  const { pathname, search, hash } = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (SKIP_ROUTES.some((re) => re.test(pathname))) return;

    const page_path = pathname + search + hash;
    const page_location = window.location.href;
    const page_title = document.title;
    const language = i18n.language || "es";

    const t = setTimeout(() => {
      if (!window.gtag) return;
      window.gtag('set', 'user_properties', { language });
      window.gtag('event', 'page_view', {
        page_title,
        page_location,
        page_path,
        content_group: pathname.split('/')[1] || 'home',
      });
    }, 0);

    return () => clearTimeout(t);
  }, [pathname, search, hash, i18n.language]);
}
