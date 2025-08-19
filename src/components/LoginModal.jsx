import React, { useState } from "react";
//import "./LoginModal.css";

export default function LoginModal({ onClose, onSuccess }) {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");

const handleLogin = async () => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ email: email.trim(), contrasena }) // <-- en claro
    });

    const textoPlano = await response.text();


    if (response.ok) {
      const usuario = JSON.parse(textoPlano);
      onSuccess(usuario);
    } else {
      console.warn("⚠️ Login fallido");
      onClose();
    }
  } catch (error) {
    console.error("❌ Error de red o fetch:", error);
    onClose();
  }
};




  return (
    <div className="login-modal-backdrop">
      <div className="login-modal">
        <h2>Iniciar sesión</h2>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
        <div className="buttons">
          <button onClick={handleLogin}>Entrar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
