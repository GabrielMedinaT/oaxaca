import React, { useState } from "react";
//import "./EventFormModal.css";

export default function EventFormModal({
  onClose,
  onEventCreated,
  usuario,
  start,
  end,
}) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaHora, setFechaHora] = useState(start.toISOString().slice(0, 16));
  const [fechaHoraFin, setFechaHoraFin] = useState(
    end.toISOString().slice(0, 16)
  );
  const [ubicacion, setUbicacion] = useState("");
  const [aforoMaximo, setAforoMaximo] = useState(0);
const handleSubmit = async (e) => {
  e.preventDefault();

  const inicio = new Date(fechaHora);
  let fin = new Date(fechaHoraFin);

  const esTodoElDia =
    inicio.getHours() === 0 &&
    inicio.getMinutes() === 0 &&
    fin.getHours() === 0 &&
    fin.getMinutes() === 0;

  if (esTodoElDia) {
    fin.setDate(fin.getDate() + 1);
  } else {
    fin.setHours(23, 59, 59, 999);
  }

  const nuevoEvento = {
    titulo,
    descripcion,
    fechaHora: inicio.toISOString(),
    fechaHoraFin: fin.toISOString(),
    ubicacion,
    aforoMaximo,
    usuario: {
      id: usuario.id,
    },
  };

  // 👇 Depuración
  console.log("🛠️ Enviando evento al backend:", nuevoEvento);

  try {
    const res = await fetch("/api/eventos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoEvento),
    });

    if (!res.ok) throw new Error("Error al guardar el evento");

    const eventoGuardado = await res.json();
    onEventCreated(eventoGuardado);
    onClose();
  } catch (err) {
    console.error("❌ Error al guardar el evento:", err);
    alert("No se pudo guardar el evento.");
  }
};


  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Nuevo Evento</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Título:
            <select
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            >
              <option value="">Selecciona un tipo de evento</option>
              <option value="Alquiler">Alquiler</option>
              <option value="Comida">Comida</option>
              <option value="Cena">Cena</option>
              <option value="Evento">Evento</option>
              <option value="Boda">Boda</option>
              <option value="Concierto">Concierto</option>
              <option value="Yoga">Yoga</option>
            </select>
          </label>

          <label>
            Descripción:
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </label>

          <label>
            Fecha y hora:
            <input
              type="datetime-local"
              value={fechaHora}
              onChange={(e) => setFechaHora(e.target.value)}
              required
            />
          </label>

          <label>
            Fecha y hora fin:
            <input
              type="datetime-local"
              value={fechaHoraFin}
              onChange={(e) => setFechaHoraFin(e.target.value)}
              required
            />
          </label>

          <label>
            Ubicación:
            <select
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
            >
              <option value="">Selecciona una ubicación</option>
              <option value="Patio">Auditorio</option>
              <option value="Caracol">Caracol</option>
              <option value="Venado">Venado</option>
              <option value="Puma">Puma</option>
              <option value="Tortuga">Tortuga</option>
              <option value="Iguana">Iguana</option>
              <option value="Quetzal">Quetzal</option>
            </select>
          </label>

          <label>
            Aforo máximo:
            <input
              type="number"
              value={aforoMaximo}
              onChange={(e) => setAforoMaximo(parseInt(e.target.value))}
              min="0"
            />
          </label>

          <div className="buttons">
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
