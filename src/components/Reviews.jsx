import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./css/Reviews.css";

export default function Reviews({ listingId = 1, pageSize = 20 }) {
  const { t, i18n } = useTranslation();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState(null);

  // Form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [photoUrl, setPhotoUrl] = useState(""); // viene de /api/reviews/photo
  const [rating, setRating] = useState(5);

  // Lightbox
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const fileInputRef = useRef(null);

  // Cargar reseñas publicadas
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const url = `/api/reviews?listingId=${encodeURIComponent(
          listingId
        )}&page=0&size=${encodeURIComponent(pageSize)}`;
        const res = await fetch(url, { headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const list = Array.isArray(data) ? data : data?.content || [];
        if (alive) {
          setReviews(list);
          setLoading(false);
        }
      } catch (e) {
        console.error(e);
        if (alive) {
          setLoading(false);
          setToast({ type: "error", msg: t("reviews.toast.loadError") });
          setTimeout(() => setToast(null), 5000);
        }
      }
    })();
    return () => {
      alive = false;
    };
  }, [listingId, pageSize, t]);

  const resetForm = () => {
    setName("");
    setEmail("");
    setComment("");
    setPhotoUrl("");
    setRating(5);
  };

  // Subir imagen al VPS (devuelve URL pública)
  const handlePickFile = () => fileInputRef.current?.click();

  const handleFileSelected = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/reviews/photo", { method: "POST", body: form });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "upload-failed");
      }
      const data = await res.json(); // { url, size, contentType }
      if (data?.url) {
        setPhotoUrl(data.url);
        setToast({ type: "success", msg: t("reviews.toast.imageOk") });
        setTimeout(() => setToast(null), 3000);
      }
    } catch (err) {
      console.error(err);
      setToast({ type: "error", msg: t("reviews.toast.imageErr") });
      setTimeout(() => setToast(null), 5000);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Enviar reseña
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !comment.trim()) {
      setToast({ type: "error", msg: t("reviews.toast.formRequired") });
      setTimeout(() => setToast(null), 4000);
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        authorName: name.trim(),
        email: email.trim(),
        comment: comment.trim(),
        rating: Number(rating) || 5,
        photoUrl: photoUrl || null, // opcional
        listingId: Number(listingId),
        lang: (i18n.language || "es").slice(0, 2),
      };

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const txt = await res.text();
        if (txt && txt.includes("Ya existe una reseña")) {
          throw new Error("duplicate");
        }
        throw new Error(txt || "submit-failed");
      }

      setToast({ type: "success", msg: t("reviews.toast.sentCheckEmail") });
      setOpen(false);
      resetForm();
    } catch (err) {
      console.error(err);
      setToast({
        type: "error",
        msg:
          err?.message === "duplicate"
            ? t("reviews.toast.duplicate")
            : t("reviews.toast.submitErr"),
      });
    } finally {
      setSubmitting(false);
      setTimeout(() => setToast(null), 5000);
    }
  };

  // Lightbox: cerrar con Esc
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxSrc(null);
    };
    if (lightboxSrc) {
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [lightboxSrc]);

  return (
    <section className="reviews-section">
      <div className="reviews-header">
        <h2>{t("reviews.title")}</h2>
        <button className="btn-primary" onClick={() => setOpen(true)}>
          {t("reviews.ctaOpen")}
        </button>
      </div>

      {loading ? (
        <div className="reviews-loading">{t("reviews.loading")}</div>
      ) : reviews.length === 0 ? (
        <p className="reviews-empty">{t("reviews.empty")}</p>
      ) : (
        <ul className="reviews-grid">
          {reviews.map((r) => (
            <li key={r.id || `${r.email}-${r.createdAt}`} className="review-card">
              <div className="review-header">
                {/* Inicial (no avatar) */}
                <div className="avatar">
                  <div className="avatar-fallback">
                    {(r.authorName || t("reviews.guest")).charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="meta">
                  <strong className="name">{r.authorName || t("reviews.guest")}</strong>
                  {r.createdAt && (
                    <span className="date">
                      {new Date(r.createdAt).toLocaleDateString(
                        (i18n.language || "es").replace("_", "-")
                      )}
                    </span>
                  )}
                  {typeof r.rating === "number" && (
                    <span
                      className="rating"
                      aria-label={t("reviews.aria.rating", { rating: r.rating })}
                    >
                      {"★".repeat(Math.max(0, Math.min(5, r.rating)))}{" "}
                      {"☆".repeat(Math.max(0, 5 - r.rating))}
                    </span>
                  )}
                </div>
              </div>

              <p className="comment">{r.comment}</p>

              {/* Imagen de contenido (opcional) con lightbox */}
              {r.photoUrl && (
                <figure className="review-photo">
                  <img
                    src={r.photoUrl}
                    alt={t("reviews.photoAlt")}
                    onClick={() => setLightboxSrc(r.photoUrl)}
                    role="button"
                    style={{ cursor: "zoom-in" }}
                  />
                </figure>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Modal de envío */}
      {open && (
        <div className="modal-overlay" onClick={() => !submitting && setOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => !submitting && setOpen(false)}
              aria-label={t("common.close")}
            >
              ×
            </button>
            <h3>{t("reviews.modal.title")}</h3>
            <form onSubmit={handleSubmit} className="review-form">
              <div className="form-row">
                <label>
                  {t("reviews.form.name")} *
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("reviews.form.namePh")}
                    required
                  />
                </label>
                <label>
                  {t("reviews.form.email")} *
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("reviews.form.emailPh")}
                    required
                  />
                </label>
              </div>

              <label>
                {t("reviews.form.comment")} *
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={t("reviews.form.commentPh")}
                  rows={4}
                  required
                />
              </label>

              <div className="form-row">
                <label>
                  {t("reviews.form.rating")} *
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    required
                  >
                    {[5, 4, 3, 2, 1].map((v) => (
                      <option key={v} value={v}>
                        {t("reviews.form.stars", { count: v })}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  {t("reviews.form.imageOpt")}
                  <div className="upload-inline">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      style={{ display: "none" }}
                      onChange={handleFileSelected}
                    />
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={handlePickFile}
                      disabled={uploading}
                      title={t("reviews.form.imageTitle")}
                    >
                      {uploading ? t("reviews.form.uploading") : t("reviews.form.upload")}
                    </button>
                  </div>
                  {photoUrl && (
                    <div className="preview">
                      <img src={photoUrl} alt={t("reviews.form.previewAlt")} />
                    </div>
                  )}
                  <small className="hint">{t("reviews.form.imageHint")}</small>
                </label>
              </div>

              <div className="actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => !submitting && setOpen(false)}
                  disabled={submitting}
                >
                  {t("common.cancel")}
                </button>
                <button type="submit" className="btn-primary" disabled={submitting}>
                  {submitting ? t("common.sending") : t("common.send")}
                </button>
              </div>
              <p className="disclaimer">{t("reviews.form.disclaimer")}</p>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightboxSrc(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="lightbox-close"
            onClick={() => setLightboxSrc(null)}
            aria-label={t("common.close")}
          >
            ×
          </button>
          <img
            className="lightbox-img"
            src={lightboxSrc}
            alt={t("reviews.lightboxAlt")}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {toast && (
        <div className={`toast ${toast.type === "error" ? "error" : "success"}`}>
          {toast.msg}
        </div>
      )}
    </section>
  );
}
