"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";

export default function CreateProject({ data, onProjectCreated }) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const modalRef = useRef(null);
    const openButtonRef = useRef(null);
    
    const informations = data;
    const idGroup = informations?.informationsGroup?.groupId;

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

    async function handleSave(e) {
        e?.preventDefault();
        
        if (!name.trim()) {
            setError("Nome do projeto é obrigatório");
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/createProject`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "name": name.trim(),
                    "description": description.trim(),
                    "idGroup": idGroup
                })
            });

            if (!res.ok) {
                throw new Error('Erro ao criar projeto');
            }

            const result = await res.json();
            
            // Notificar o componente pai
            if (onProjectCreated) {
                onProjectCreated({
                    name_project: name.trim(),
                    description_project: description.trim(),
                    id: result.id || Date.now()
                });
            }

            // Reset form
            setName("");
            setDescription("");
            setError("");
            setIsOpen(false);
        } catch(err) {
            console.error("Erro: ", err);
            setError("Erro ao criar projeto. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <button
                ref={openButtonRef}
                onClick={() => setIsOpen(true)}
                className={styles.btnCreate}
                aria-haspopup="dialog"
            >
                <span className={styles.btnIcon}>+</span>
                Criar Projeto
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
                            Criar Novo Projeto
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
                                    disabled={isSubmitting}
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
                                    disabled={isSubmitting}
                                />
                            </label>

                            {error && <p className={styles.error}>{error}</p>}

                            <div className={styles.actions}>
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className={styles.cancel}
                                    disabled={isSubmitting}
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="submit" 
                                    className={styles.save}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Criando...' : 'Criar Projeto'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}