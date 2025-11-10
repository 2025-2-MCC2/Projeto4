"use client";

import { useState, useEffect } from "react";
import styles from "./modal.module.css";

export default function AdminsModal({ isOpen, onClose }) {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  useEffect(() => {
    if (isOpen) fetchAdmins();
  }, [isOpen]);

  async function fetchAdmins() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/allAdmins`);
      const data = await res.json();
      if (res.ok) setAdmins(data.admins || []);
      else setMessage({ type: "error", text: "Erro ao carregar administradores." });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Falha de conexão com a API." });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Tem certeza que deseja excluir este administrador?")) return;
    try {
      const res = await fetch(`${API_URL}/deleteAdmin/${id}`, { method: "DELETE" });
      if (res.ok) {
        setAdmins((prev) => prev.filter((a) => a.id !== id));
      } else {
        alert("Erro ao excluir administrador.");
      }
    } catch {
      alert("Falha na conexão com o servidor.");
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/createAdmin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nameAdm: newAdmin.name,
          email: newAdmin.email,
          password: newAdmin.password,
        }),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "Administrador registrado com sucesso!" });
        setShowForm(false);
        setNewAdmin({ name: "", email: "", password: "" });
        fetchAdmins();
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.message || "Erro ao registrar." });
      }
    } catch {
      setMessage({ type: "error", text: "Erro de conexão com o servidor." });
    }
  }

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Gerenciar Administradores</h2>

        <button className={styles.closeBtn} onClick={onClose}>✖</button>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
            {admins.length > 0 ? (
              <ul className={styles.adminList}>
                {admins.map((admin) => (
                  <li key={admin.id}>
                    <span>{admin.name_adm}</span>
                    <button onClick={() => handleDelete(admin.id)} className={styles.deleteBtn}>
                      Excluir
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhum administrador encontrado.</p>
            )}
          </>
        )}

        <button className={styles.addBtn} onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancelar" : "➕ Registrar Novo Admin"}
        </button>

        {showForm && (
          <form onSubmit={handleRegister} className={styles.form}>
            <input
              type="text"
              placeholder="Nome completo"
              value={newAdmin.name}
              onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newAdmin.email}
              onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={newAdmin.password}
              onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
              required
            />
            <button type="submit" className={styles.submitBtn}>Registrar</button>
          </form>
        )}

        {message && (
          <p className={`${styles.message} ${message.type === "error" ? styles.error : styles.success}`}>
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
}
