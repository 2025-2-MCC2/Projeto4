"use client";

import { useState } from "react";
import formImg from "../assets/formImg1.png";
import AddStudent from "../components/AddStudent/AddStudent";
import styles from "./register.module.css";
import Image from "next/image";

export default function Form() {
    const [clickAddStudent, setClickAddStudent] = useState([]);
    const [allMentors, setAllMentors] = useState([]);

    function handleAddStudent() {
        setClickAddStudent([...clickAddStudent, clickAddStudent + 1]);
    }

    async function handleMentors() {
        try {
            const res = await fetch("http://localhost:3001/allMentors", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await res.json();
            setAllMentors(data.mentors);
        } catch(err) {
            console.error("Erro: ", err);
            alert("O erro: " + err);
        }
    }

    return (
       <>
            <div className={styles.container}>
                <div className={styles.leftSide}><Image src={formImg} alt="Empathize image" className={styles.imgEmpathize}/></div>
                <div className={styles.rigthSide}>
                    <h3>INSCRIÇÃO</h3>
                    <AddStudent />
                    <AddStudent />
                    <AddStudent />
                    <AddStudent />
                    {clickAddStudent.map(() => (
                        <AddStudent />
                    ))}
                    <div className={styles.groupName}>
                        <label htmlFor="inpGroupName" className={styles.designLabel}>Nome do grupo<span className={styles.colorMandatory}>*</span></label>
                        <input type="text" name="inpGroupName" id="inpGroupName" />
                    </div>
                    <div className={styles.selectMentor}>
                        <label htmlFor="selectMentor" className={styles.designLabel}>Mentor do grupo<span className={styles.colorMandatory}>*</span></label>
                        <select name="selectMentor" id="selectMentor" onClick={() => handleMentors()}>
                            <option value="" disabled selected>Selecione</option>
                            {allMentors.map((mentor) => (
                                <option value={mentor.name_mentor}>{mentor.name_mentor}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.inpPassword}>
                        <label htmlFor="inpPassword" className={styles.designLabel}>Senha do grupo<span className={styles.colorMandatory}>*</span></label>
                        <input type="password" name="inpPassword" id="inpPassword" />
                    </div>
                    <div className={styles.buttons}>
                        <button onClick={handleAddStudent}>Adicionar aluno</button>
                        <button>Registrar grupo</button>
                    </div>
                </div>
            </div>
       </>
    );
}