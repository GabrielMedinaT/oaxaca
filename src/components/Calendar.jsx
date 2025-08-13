import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, addHours } from "date-fns";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import "./Calendar.css";
import EventFormModal from "./EventFormModal";
import ICAL from "ical.js";

// 👉 Pon aquí tus feeds ICS (puedes añadir varios)
const ICS_URLS = [
  "https://calendars.tokeet.com/calendar/rental/1739314518.5419/0194f73a-164f-72f2-8405-594dc113988f-tk2?ref_id=mcdmijbj",
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
  const adaptarEventosAPI = (data) => {
    return data.map((ev) => {
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
  };

  const cargarICSDesdeTexto = (icsText) => {
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
        creadoPor: "AdvanceCM",
        color: "#0d6efd", // color para distinguir los ICS
      };
    });
  };

  const fetchICS = async (url) => {
    // Intenta directo; si falla por CORS, lo manejamos fuera si hace falta
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`No se pudo leer ICS: ${resp.status}`);
    const text = await resp.text();
    return cargarICSDesdeTexto(text);
  };

  // --- Carga combinada ---
  const cargarEventos = async () => {
    try {
      // 1) Eventos de tu API
      const res = await fetch("/api/eventos");
      if (!res.ok) throw new Error("Error al leer /api/eventos");
      const data = await res.json();
      const eventosAPI = adaptarEventosAPI(data);

      // 2) Eventos de todos los ICS
      const icsListas = await Promise.all(
        ICS_URLS.map(async (u) => {
          try {
            return await fetchICS(u);
          } catch (err) {
            console.error("Error leyendo ICS:", u, err);
            return [];
          }
        })
      );
      const eventosICS = icsListas.flat();

      // 3) Fusión y set
      setEventList([...eventosAPI, ...eventosICS]);
    } catch (error) {
      console.error("Error al cargar eventos:", error);
    }
  };

  useEffect(() => {
    cargarEventos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setVista(Views.MONTH);
    }
  }, []);

  const handleEventCreated = () => {
    cargarEventos();
  };

  const handleViewChange = (nuevaVista) => {
    setVista(nuevaVista);
  };

  const abrirModalCreacion = () => {
    setShowModal(true);
  };

  const eliminarEvento = (eventoId) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este evento?")) {
      return;
    }

    fetch(`/api/eventos/${eventoId}?usuarioId=${usuario.id}`, {
      method: "DELETE",
    })
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
      <div className="calendar-toolbar-custom">
        <button onClick={cargarEventos} className="reload-button">
          🔄 Recargar
        </button>

        <div className="calendar-month-label">
          {format(fecha, "MMMM yyyy", { locale: es })}
        </div>

        <button className="crear-evento-button" onClick={abrirModalCreacion}>
          ➕ Crear evento
        </button>
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
        popup={true}
        onSelectEvent={(event) => {
          setEventoSeleccionado(event);
          setShowModal(false);
        }}
        eventPropGetter={(event) => {
          const style = {
            color: "#fff",
            borderRadius: "6px",
            border: "none",
          };

          if (event.color) {
            style.backgroundColor = event.color;
          }

          return {
            style,
            className: `evento-usuario-${event.creadoPor.replace(/\s+/g, "-")}`,
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
            <p className="modal-description">
              <strong>Descripción:</strong> {eventoSeleccionado.description}
            </p>
            <p>
              <strong>Inicio:</strong>{" "}
              {eventoSeleccionado.start.toLocaleString()}
            </p>
            <p>
              <strong>Fin:</strong> {eventoSeleccionado.end?.toLocaleString()}
            </p>
            <p>
              <strong>Creado por:</strong> {eventoSeleccionado.creadoPor}
            </p>

            {usuario?.nombre === eventoSeleccionado.creadoPor && (
              <button
                className="modal-delete-button"
                onClick={() => eliminarEvento(eventoSeleccionado.id)}
              >
                ❌ Eliminar evento
              </button>
            )}

            <button
              className="modal-close-button"
              onClick={() => setEventoSeleccionado(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendario;
