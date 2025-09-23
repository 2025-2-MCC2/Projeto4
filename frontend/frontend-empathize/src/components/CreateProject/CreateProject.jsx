import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";

export default function CreateProject({ onSave }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const modalRef = useRef(null);
  const openButtonRef = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setIsOpen(false);
    }

    if (isOpen) {
      document.addEventListener("keydown", onKey);
     
      document.body.style.overflow = "hidden";

      setTimeout(() => {
        modalRef.current?.querySelector("input, textarea")?.focus();
      }, 0);
    } else {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      openButtonRef.current?.focus();
    }

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function handleSave(e) {
    e?.preventDefault();
    if (!name.trim()) {
      setError("Nome do projeto é obrigatório");
      return;
    }

    const payload = { name: name.trim(), description: description.trim() };
    if (typeof onSave === "function") onSave(payload);
    else console.log("Saving project:", payload);

    // reset
    setName("");
    setDescription("");
    setError("");
    setIsOpen(false);
  }

  return (
    <>
      <button
        ref={openButtonRef}
        onClick={() => setIsOpen(true)}
        className={styles.btnCreate}
        aria-haspopup="dialog"
      >
        Criar projeto
      </button>

      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            ref={modalRef}
          >
            <button
              className={styles.close}
              onClick={() => setIsOpen(false)}
              aria-label="Fechar modal"
            >
              ×
            </button>

            <h2 id="modal-title" className={styles.title}>
              Adicionar projeto
            </h2>

            <form className={styles.form} onSubmit={handleSave}>
              <label className={styles.label}>
                Nome do projeto <span className={styles.required}>*</span>
                <input
                  className={styles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Projeto Liderança"
                  aria-required="true"
                />
              </label>

              <label className={styles.label}>
                Descrição do projeto
                <textarea
                  className={styles.textarea}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Uma breve descrição do projeto (opcional)"
                  rows={4}
                />
              </label>

              {error && <p className={styles.error}>{error}</p>}

              <div className={styles.actions}>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className={styles.cancel}
                >
                  Cancelar
                </button>
                <button type="submit" className={styles.save}>
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}