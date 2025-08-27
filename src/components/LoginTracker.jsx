import { useEffect, useMemo, useState } from "react";

const API_BASE = "https://fincaoaxaca.com"; // ajusta si hace falta

export default function LoginTracker() {
    // --- Estado UI ---
    const [users, setUsers] = useState([]);            // [{id, nombre, email, ...}]
    const [query, setQuery] = useState("");            // filtro por nombre/email
    const [userId, setUserId] = useState(() => localStorage.getItem("lt_userId") || "");
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [usersError, setUsersError] = useState("");

    // --- Login ---
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPass, setLoginPass] = useState("");
    const [loginStatus, setLoginStatus] = useState("");

    // --- Datos de logins ---
    const [summary, setSummary] = useState({ loginCount: "—", lastLogin: "—" });
    const [items, setItems] = useState([]); // histórico acumulado (cargar más)
    const [page, setPage] = useState(0);
    const [size] = useState(10);
    const [hasMore, setHasMore] = useState(false);
    const [fetchStatus, setFetchStatus] = useState("");

    // Nombre del usuario seleccionado
    const selectedUser = useMemo(
        () => users.find(u => String(u.id) === String(userId)) || null,
        [users, userId]
    );

    // Filtro local de usuarios
    const filteredUsers = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return users;
        return users.filter(u =>
            (u.nombre || "").toLowerCase().includes(q) ||
            (u.email || "").toLowerCase().includes(q)
        );
    }, [users, query]);

    const fmt = (iso) => {
        if (!iso) return "—";
        try {
            const d = new Date(iso);
            return new Intl.DateTimeFormat(undefined, {
                dateStyle: "medium",
                timeStyle: "medium",
            }).format(d);
        } catch {
            return iso;
        }
    };

    // --- Cargar lista de usuarios una vez ---
    useEffect(() => {
        const loadUsers = async () => {
            setLoadingUsers(true);
            setUsersError("");
            try {
                const res = await fetch(`${API_BASE}/api/usuarios`);
                const data = await res.json();
                if (!res.ok) throw new Error(typeof data === "string" ? data : (data?.error || res.statusText));
                setUsers(data || []);
                // Si no hay userId guardado, selecciona el primero
                if (!localStorage.getItem("lt_userId") && data && data.length > 0) {
                    setUserId(String(data[0].id));
                }
            } catch (e) {
                setUsersError("No se pudo cargar la lista de usuarios.");
            } finally {
                setLoadingUsers(false);
            }
        };
        loadUsers();
    }, []);

    // Guarda selección
    useEffect(() => {
        if (userId) localStorage.setItem("lt_userId", String(userId));
    }, [userId]);

    // --- Cargar summary + primera página cuando cambia usuario ---
    useEffect(() => {
        if (!userId) return;
        const run = async () => {
            // summary
            setFetchStatus("Cargando resumen…");
            try {
                const r1 = await fetch(`${API_BASE}/api/usuarios/${userId}/logins/summary`);
                const j1 = await r1.json();
                if (!r1.ok) throw new Error(typeof j1 === "string" ? j1 : (j1?.error || r1.statusText));
                setSummary({
                    loginCount: j1.loginCount ?? 0,
                    lastLogin: fmt(j1.lastLogin),
                });
                setFetchStatus("");

                // primera página de histórico
                await loadPage(0, true);
            } catch (e) {
                setFetchStatus("Error: " + (e.message || e));
                setItems([]);
                setHasMore(false);
            }
        };
        run();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    // Cargar una página (append)
    const loadPage = async (p, replace = false) => {
        setFetchStatus(replace ? "Cargando histórico…" : "Cargando más…");
        try {
            const r2 = await fetch(`${API_BASE}/api/usuarios/${userId}/logins?page=${p}&size=${size}`);
            const j2 = await r2.json();
            if (!r2.ok) throw new Error(typeof j2 === "string" ? j2 : (j2?.error || r2.statusText));

            const content = j2.content ?? [];
            setItems(prev => (replace ? content : [...prev, ...content]));
            setPage(j2.number ?? p);
            setHasMore((j2.number ?? p) + 1 < (j2.totalPages ?? 1));
            setFetchStatus("");
        } catch (e) {
            setFetchStatus("Error: " + (e.message || e));
        }
    };

    // Login: registra acceso y auto-selecciona el usuario devuelto (si lo hay)
    const handleLogin = async () => {
        setLoginStatus("Haciendo login…");
        try {
            const res = await fetch(`${API_BASE}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: loginEmail.trim(), contrasena: loginPass }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(typeof data === "string" ? data : (data?.error || res.statusText));
            setLoginStatus("Login OK. Se registró el acceso.");

            if (data?.id) {
                const newId = String(data.id);
                setUserId(newId);
                // refrescará solo vía useEffect(userId)
            } else {
                // refresca con el actual por si coincide
                await loadPage(0, true);
            }
        } catch (e) {
            setLoginStatus("Error: " + (e.message || e));
        }
    };

    return (
        <div style={{ fontFamily: "system-ui", padding: 20, maxWidth: 980, margin: "0 auto" }}>
            <h1 style={{ color: "#4CAF50", marginBottom: 8 }}>Histórico de logins</h1>
            <p style={{ color: "#666", marginTop: 0 }}>Selecciona un usuario por <strong>nombre</strong> y consulta sus accesos.</p>

            {/* --- Sección usuarios --- */}
            <div style={card}>
                <h2 style={{ marginTop: 0 }}>Usuarios</h2>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <input
                        style={input}
                        placeholder="Buscar por nombre o email…"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <select
                        style={input}
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        disabled={loadingUsers || !!usersError}
                        aria-label="Seleccionar usuario"
                    >
                        {filteredUsers.length === 0 ? (
                            <option value="">Sin resultados</option>
                        ) : (
                            filteredUsers.map(u => (
                                <option key={u.id} value={u.id}>
                                    {u.nombre || "(Sin nombre)"} {u.email ? `— ${u.email}` : ""}
                                </option>
                            ))
                        )}
                    </select>
                </div>

                <div style={{ marginTop: 8, fontSize: 14 }}>
                    {loadingUsers && <span>Cargando usuarios…</span>}
                    {usersError && <span style={{ color: "#b91c1c" }}>{usersError}</span>}
                </div>
            </div>

            {/* --- Sección login --- 
            <div style={card}>
                <h2 style={{ marginTop: 0 }}>Login (para registrar acceso)</h2>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        style={input}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={loginPass}
                        onChange={(e) => setLoginPass(e.target.value)}
                        style={input}
                    />
                    <button onClick={handleLogin} style={btn}>Hacer login</button>
                </div>
                <div style={{ marginTop: 8, fontSize: 14 }}>{loginStatus}</div>
            </div>
*/}
            {/* --- Resumen --- */}
            <div style={card}>
                <h2 style={{ marginTop: 0 }}>
                    Resumen {selectedUser ? `— ${selectedUser.nombre}` : ""}
                </h2>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <div style={pill}><strong>Logins:</strong> {summary.loginCount}</div>
                    <div style={pill}><strong>Último:</strong> {summary.lastLogin}</div>
                </div>
            </div>

            {/* --- Histórico --- */}
            <div style={card}>
                <h2 style={{ marginTop: 0 }}>Histórico</h2>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ background: "#f3f4f6" }}>
                            <th style={cell}>Usuario</th>
                            <th style={cell}>Fecha</th>
                            <th style={cell}>IP</th>
                            <th style={cell}>User-Agent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan="4" style={{ textAlign: "center", padding: 10, color: "#666" }}>
                                    Sin datos
                                </td>
                            </tr>
                        ) : (
                            items.map((h) => (
                                <tr key={h.id}>
                                    <td style={cell}>{selectedUser?.nombre || "—"}</td>
                                    <td style={cell}>{fmt(h.loginTime)}</td>
                                    <td style={cell}>{h.ipAddress || "—"}</td>
                                    <td style={cell}>{h.userAgent?.slice(0, 120) || "—"}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                <div style={{ display: "flex", gap: 10, justifyContent: "space-between", marginTop: 10 }}>
                    <div style={{ fontSize: 14 }}>{fetchStatus}</div>
                    <div style={{ display: "flex", gap: 10 }}>
                        <button
                            style={btn}
                            onClick={() => loadPage(0, true)}
                            disabled={!userId}
                            title="Recargar"
                        >
                            Recargar
                        </button>
                        <button
                            style={btn}
                            onClick={() => loadPage(page + 1)}
                            disabled={!hasMore || !userId}
                            title="Cargar más"
                        >
                            Cargar más
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* --- estilos inline --- */
const card = {
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
};
const input = {
    flex: "1",
    minWidth: 220,
    padding: 8,
    borderRadius: 6,
    border: "1px solid #ddd",
};
const btn = {
    padding: "8px 12px",
    borderRadius: 6,
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    cursor: "pointer",
};
const pill = {
    background: "#ecfdf5",
    padding: "8px 12px",
    borderRadius: 6,
    border: "1px solid #d1fae5",
};
const cell = {
    padding: 8,
    borderBottom: "1px solid #ddd",
    textAlign: "left",
    fontSize: 14,
};
