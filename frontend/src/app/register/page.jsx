"use client";

import { useState } from "react";
import formImg from "../assets/formImg1.png";
import AddStudent from "../components/AddStudent/AddStudent";
import styles from "./register.module.css";
import Image from "next/image";

export default function Form() {
    const [clickAddStudent, setClickAddStudent] = useState([]);

    function handleAddStudent() {
        setClickAddStudent([...clickAddStudent, clickAddStudent + 1]);
    }

    return (
       <>
            <div className={styles.container}>
                <div className={styles.leftSide}><Image src={formImg} alt="Empathize image" className={styles.imgEmpathize}/></div>
                <div className={styles.rigthSide}>
                    <h3>Inscrição</h3>
                    <AddStudent />
                    <AddStudent />
                    <AddStudent />
                    <AddStudent />
                    {clickAddStudent.map(() => (
                        <AddStudent />
                    ))}
                    <button onClick={handleAddStudent}>Adicionar aluno</button>
                </div>
            </div>
       </>
    );
}