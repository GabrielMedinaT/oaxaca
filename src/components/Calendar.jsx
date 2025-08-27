import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, addHours, addMonths } from "date-fns";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import EventFormModal from "./EventFormModal";
import ICAL from "ical.js";
import "./css/Calendar.css";

// Feeds ICS (uno por casa)
const ICS_FEEDS = [
  {
    name: "Casa Iguana",
    url: "https://calendars.tokeet.com/calendar/rental/1739314518.5419/0194f73a-164f-72f2-8405-594dc113988f-tk2",
    color: "#16a34a",
  },
  {
    name: "Casa Caracol",
    url: "https://calendars.tokeet.com/calendar/rental/1739314518.5419/0194f73a-41b1-728e-9668-e57c9e6646d1-tk2",
    color: "#1295edff",
  },
  {
    name: "Casa Puma",
    url: "https://calendars.tokeet.com/calendar/rental/1739314518.5419/0194f73a-24b5-719d-8382-76c779c845a3-tk2",
    color: "#f59e0b",
  },
  {
    name: "Casa Tortuga",
    url: "https://calendars.tokeet.com/calendar/rental/1739314518.5419/0194f73a-32cc-7862-80ef-a04e8ce41df9-tk2",
    color: "#ef4444",
  },
  {
    name: "Casa Quetzal",
    url: "https://calendars.tokeet.com/calendar/rental/1739314518.5419/0194f73a-4f39-7fd2-ba77-ee30d7b03255-tk2",
    color: "#8b5cf6",
  },
  {
    name: "Casa Venado",
    url: "https://calendars.tokeet.com/calendar/rental/1739314518.5419/0194f73a-5bbd-74e1-ab4c-c319be66b4b7-tk2",
    color: "#f472b6",
  },
];

const locales = { es };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const Calendario = ({ usuario }) => {
  const [eventList, setEventList] = useState([]);
  const [vista, setVista] = useState(Views.MONTH);
  const [fecha, setFecha] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

  // --- Helpers ---
  const adaptarEventosAPI = (data) =>
    data.map((ev) => {
      const creadoPorNombre =
        typeof ev.creadoPor === "string"
          ? ev.creadoPor
          : ev.creadoPor?.nombre || "desconocido";

      const evento = {
        id: ev.id,
        title: ev.titulo,
        description: ev.descripcion,
        start: new Date(ev.fechaHora),
        end: ev.end ? new Date(ev.end) : new Date(ev.fechaHoraFin),
        creadoPor: creadoPorNombre,
      };

      if (usuario && creadoPorNombre === usuario.nombre && usuario.color) {
        evento.color = usuario.color;
      }
      return evento;
    });

  const cargarICSDesdeTexto = (icsText, feed) => {
    const jcalData = ICAL.parse(icsText);
    const comp = new ICAL.Component(jcalData);
    const vevents = comp.getAllSubcomponents("vevent") || [];
    return vevents.map((vevent) => {
      const e = new ICAL.Event(vevent);
      return {
        id: e.uid,
        title: e.summary || "(sin título)",
        description: e.description || "",
        start: e.startDate.toJSDate(),
        end: e.endDate.toJSDate(),
        creadoPor: feed.name,
        color: feed.color,
      };
    });
  };

  const fetchICS = async (feed) => {
    const resp = await fetch(feed.url);
    if (!resp.ok) throw new Error(`No se pudo leer ICS: ${resp.status}`);
    const text = await resp.text();
    return cargarICSDesdeTexto(text, feed);
  };

  const cargarEventos = async () => {
    try {
      // 1) API interna
      const res = await fetch("/api/eventos");
      if (!res.ok) throw new Error("Error al leer /api/eventos");
      const data = await res.json();
      const eventosAPI = adaptarEventosAPI(data);

      // 2) ICS externos
      const icsListas = await Promise.all(
        ICS_FEEDS.map(async (feed) => {
          try {
            return await fetchICS(feed);
          } catch (err) {
            console.error("Error leyendo ICS:", feed.url, err);
            return [];
          }
        })
      );
      const eventosICS = icsListas.flat();

      // 3) Fusión (opcional: dedupe por id)
      const fusion = [...eventosAPI, ...eventosICS];
      const porId = new Map();
      fusion.forEach((e) => porId.set(e.id, e));
      setEventList(Array.from(porId.values()));
    } catch (error) {
      console.error("Error al cargar eventos:", error);
    }
  };

  useEffect(() => {
    cargarEventos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768) setVista(Views.MONTH);
  }, []);

  const handleEventCreated = () => cargarEventos();
  const handleViewChange = (nuevaVista) => setVista(nuevaVista);
  const abrirModalCreacion = () => setShowModal(true);

  const eliminarEvento = (eventoId) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este evento?")) return;

    fetch(`/api/eventos/${eventoId}?usuarioId=${usuario.id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setEventoSeleccionado(null);
          cargarEventos();
        } else if (res.status === 403) {
          alert("No tienes permiso para eliminar este evento.");
        } else {
          alert("Error al eliminar el evento.");
        }
      })
      .catch((err) => {
        console.error("Error eliminando evento:", err);
        alert("Error al eliminar el evento.");
      });
  };

  return (
    <div className="calendar-container">
      {/* Toolbar personalizada con navegación y vistas */}
      <div className="calendar-toolbar-custom" style={{ display: "grid", gap: 8 }}>
        <div className="row" style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <button onClick={() => setFecha(addMonths(fecha, -1))}>◀ Ant.</button>
          <button onClick={() => setFecha(new Date())}>Hoy</button>
          <button onClick={() => setFecha(addMonths(fecha, 1))}>Sig. ▶</button>

          <div style={{ marginLeft: 12, fontWeight: 600 }}>
            {format(fecha, "MMMM yyyy", { locale: es })}
          </div>

          {/* Ir a mes/año concreto */}
          <input
            type="month"
            onChange={(e) => {
              if (!e.target.value) return;
              const [y, m] = e.target.value.split("-").map(Number);
              setFecha(new Date(y, m - 1, 1));
            }}
            style={{ marginLeft: "auto" }}
          />

          <button onClick={cargarEventos}>🔄 Recargar</button>

          <div style={{ display: "flex", gap: 6, marginLeft: 8 }}>
            <button onClick={() => setVista(Views.MONTH)}>Mes</button>
            <button onClick={() => setVista(Views.WEEK)}>Semana</button>
            <button onClick={() => setVista(Views.DAY)}>Día</button>
            <button onClick={() => setVista(Views.AGENDA)}>Agenda</button>
          </div>

          <button className="crear-evento-button" onClick={abrirModalCreacion}>
            ➕ Crear evento
          </button>
        </div>
      </div>

      <Calendar
        toolbar={false}
        localizer={localizer}
        events={eventList}
        startAccessor="start"
        endAccessor="end"
        view={vista}
        onView={handleViewChange}
        date={fecha}
        onNavigate={setFecha}
        views={["month", "week", "day", "agenda"]}
        popup
        onSelectEvent={(event) => {
          setEventoSeleccionado(event);
          setShowModal(false);
        }}
        eventPropGetter={(event) => {
          const style = {
            color: "#fff",
            borderRadius: "6px",
            border: "none",
            backgroundColor: event.color || "#6b7280",
          };
          return {
            style,
            className: `evento-usuario-${String(event.creadoPor || "")
              .replace(/\s+/g, "-")
              .toLowerCase()}`,
          };
        }}
        messages={{
          next: "Sig.",
          previous: "Ant.",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
          agenda: "Agenda",
        }}
      />

      {showModal && (
        <EventFormModal
          onClose={() => setShowModal(false)}
          onEventCreated={handleEventCreated}
          usuario={usuario}
          start={new Date()}
          end={addHours(new Date(), 1)}
        />
      )}

      {eventoSeleccionado && (
        <div className="event-detail-modal-overlay">
          <div className="event-detail-modal-content">
            <h2 className="modal-title">{eventoSeleccionado.title}</h2>
            <p><strong>Casa:</strong> {eventoSeleccionado.creadoPor}</p>
            <p><strong>Descripción:</strong> {eventoSeleccionado.description}</p>
            <p><strong>Inicio:</strong> {eventoSeleccionado.start.toLocaleString()}</p>
            <p><strong>Fin:</strong> {eventoSeleccionado.end?.toLocaleString()}</p>

            {usuario?.nombre === eventoSeleccionado.creadoPor && (
              <button className="modal-delete-button" onClick={() => eliminarEvento(eventoSeleccionado.id)}>
                ❌ Eliminar evento
              </button>
            )}
            <button className="modal-close-button" onClick={() => setEventoSeleccionado(null)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendario;
