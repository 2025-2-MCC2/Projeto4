"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import deleteIcon from "../../assets/excluir.png";
import Image from "next/image";

export default function CreateProject() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const modalRef = useRef(null);
  const openButtonRef = useRef(null);
  const [projects, setProject] = useState([]);

  async function handleSaveProject() {
    try {
      const res = await fetch("https://empathizesystem-production.up.railway.app/createProject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "name": name,
          "description": description
          //falta o idgroup
        })
      })
    } catch(err) {
      console.error("Erro: ", err);
    }
  }

  function deleteProject(ev) {
    const result = ev.target.parentNode;
    result.parentNode.remove();
    // after need make the database logic with fecth;
  }

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

    const newProject = { name: name.trim(), description: description.trim() };
    setProjects(prev => [...prev, newProject]);
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

      <div className={styles.mainContainerProject}>
        {projects.map((value) => (
            <div className={styles.containerProject}>
              <p>{value}</p>
              <span id={styles.iconDelete} onClick={(ev) => deleteProject(ev)}><Image src={deleteIcon} alt="delete icon" /></span>
              {console.log(projects)}
            </div>
        ))}
      </div>
    </>
  );
}