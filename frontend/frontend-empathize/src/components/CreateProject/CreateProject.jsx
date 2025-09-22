import { useState } from "react";
import styles from "./style.module.css";
import "./style.module.css";

export default function CreateProject() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button onClick={() => setIsOpen(true)}>Criar projeto</button>

            {isOpen && (
                <div className="overlay" onClick={() => setIsOpen(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <button className="close" onClick={() => setIsOpen(false)}>x</button>
                        <h2>Adicionar projeto</h2>
                        <input type="text" placeholder="Descrição do projeto" />
                        <button>Salvar</button>
                    </div>
                </div>
            )}
        </>
    );
}