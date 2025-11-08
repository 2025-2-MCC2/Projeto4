"use client";

import { useState, useEffect } from "react";
import styles from "./modal.module.css";

export default function EditionsModal({ isOpen, onClose }) {
  const [editions, setEditions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newEdition, setNewEdition] = useState({ startDate: "", endDate: "" });
  const [message, setMessage] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    if (isOpen) {
      setMessage(null);
      fetchEditions();
    }
  }, [isOpen]);

  async function fetchEditions() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/allEditions`);
      const data = await res.json();
      if (res.ok) setEditions(data.editions || []);
      else setMessage({ type: "error", text: "Erro ao carregar edições." });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Falha de conexão com a API." });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Tem certeza que deseja excluir esta edição?")) return;
    try {
      const res = await fetch(`${API_URL}/deleteEdition/${id}`, { method: "DELETE" });
      if (res.ok) {
        setEditions((prev) => prev.filter((e) => e.id !== id));
        setMessage({ type: "success", text: "Edição excluída com sucesso!" });
      } else {
        alert("Erro ao excluir edição.");
      }
    } catch {
      alert("Falha na conexão com o servidor.");
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/createEdition`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startDate: newEdition.startDate,
          endDate: newEdition.endDate,
        }),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "Edição criada com sucesso!" });
        setShowForm(false);
        setNewEdition({ startDate: "", endDate: "" });
        fetchEditions();
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.message || "Erro ao criar edição." });
      }
    } catch {
      setMessage({ type: "error", text: "Erro de conexão com o servidor." });
    }
  }

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Gerenciar Edições</h2>
        <button className={styles.closeBtn} onClick={onClose}>
          ✖
        </button>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
            {editions.length > 0 ? (
              <ul className={styles.adminList}>
                {editions.map((edition) => (
                  <li key={edition.id}>
                    <span>
                      <strong>Início:</strong> {formatDate(edition.start_date)} —{" "}
                      <strong>Fim:</strong> {formatDate(edition.end_date)}
                    </span>
                    <button
                      onClick={() => handleDelete(edition.id)}
                      className={styles.deleteBtn}
                    >
                      Excluir
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhuma edição encontrada.</p>
            )}
          </>
        )}

        <button className={styles.addBtn} onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancelar" : "➕ Criar Nova Edição"}
        </button>

        {showForm && (
          <form onSubmit={handleRegister} className={styles.form}>
            <label>Data de Início:</label>
            <input
              type="date"
              value={newEdition.startDate}
              onChange={(e) =>
                setNewEdition({ ...newEdition, startDate: e.target.value })
              }
              required
            />

            <label>Data de Término:</label>
            <input
              type="date"
              value={newEdition.endDate}
              onChange={(e) =>
                setNewEdition({ ...newEdition, endDate: e.target.value })
              }
              required
            />

            <button type="submit" className={styles.submitBtn}>
              Criar Edição
            </button>
          </form>
        )}

        {message && (
          <p
            className={`${styles.message} ${
              message.type === "error" ? styles.error : styles.success
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
}
