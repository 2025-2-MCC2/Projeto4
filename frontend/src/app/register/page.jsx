"use client";

import { useState } from "react";
import formImg from "../assets/formImg1.png";
import styles from "./register.module.css";
import Image from "next/image";

export default function Form() {
    const [students, setStudents] = useState([
        { fullName: "", ra: "", curso: "" }
    ]);
    const [groupName, setGroupName] = useState("");
    const [selectedMentor, setSelectedMentor] = useState("");
    const [password, setPassword] = useState("");
    const [allMentors, setAllMentors] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleAddStudent() {
        setStudents([...students, { fullName: "", ra: "", curso: "" }]);
    }

    function handleStudentChange(index, field, value) {
        const updatedStudents = students.map((student, i) => {
            if (i === index) {
                return { ...student, [field]: value };
            }
            return student;
        });
        setStudents(updatedStudents);
    }

    function handleRemoveStudent(index) {
        if (students.length > 1) {
            setStudents(students.filter((_, i) => i !== index));
        }
    }

    async function handleMentors() {
        if (allMentors.length > 0) return; 
        
        try {
            const res = await fetch("http://localhost:3001/allMentors", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            // Verificar se a resposta é OK
            if (!res.ok) {
                throw new Error(`Erro HTTP! Status: ${res.status}`);
            }

            // Verificar se é JSON
            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Resposta não é JSON. Verifique se a rota existe.");
            }

            const data = await res.json();
            console.log("Mentores carregados:", data);
            setAllMentors(data.mentors || []);
        } catch(err) {
            console.error("Erro ao carregar mentores:", err);
            alert(`Erro ao carregar mentores: ${err.message}\n\nVerifique se o backend está rodando em http://localhost:3001`);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        
        // Validação
        const isValid = students.every(s => s.fullName && s.ra && s.curso);
        if (!isValid || !groupName || !selectedMentor || !password) {
            alert("Por favor, preencha todos os campos obrigatórios");
            return;
        }

        setIsSubmitting(true);

        try {
            // 1. Buscar edição atual
            console.log("1. Buscando edição atual...");
            const resEdition = await fetch("http://localhost:3001/allEditions");
            
            if (!resEdition.ok) {
                throw new Error(`Erro ao buscar edições: ${resEdition.status}`);
            }

            const idCurrentEdition = await resEdition.json();
            console.log("Edições:", idCurrentEdition);

            // Verificar se há edições
            if (!idCurrentEdition.editions || idCurrentEdition.editions.length === 0) {
                throw new Error("Nenhuma edição encontrada");
            }

            const currentEditionId = idCurrentEdition.editions[idCurrentEdition.editions.length - 1].id;
            console.log("ID da edição atual:", currentEditionId);

            // 2. Criar estudantes
            const idsStudents = [];

            for (let i = 0; i < students.length; i++) {
                console.log(`2.${i + 1}. Criando estudante:`, students[i]);

                const resCreateStudent = await fetch("http://localhost:3001/createUser", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "RA": students[i].ra,
                        "fullName": students[i].fullName,
                        "course": students[i].curso,
                        "password": password
                    })
                });

                if (!resCreateStudent.ok) {
                    const errorText = await resCreateStudent.text();
                    throw new Error(`Erro ao criar estudante ${students[i].fullName}: ${errorText}`);
                }

                // 3. Buscar ID do estudante criado
                console.log(`3.${i + 1}. Buscando ID do estudante com RA: ${students[i].ra}`);
                console.log(students)
                console.log(students[i])
                const resIdStudent = await fetch(`http://localhost:3001/userRA/${students[i].ra}`);
                
                if (!resIdStudent.ok) {
                    throw new Error(`Erro ao buscar estudante com RA ${students[i].ra}`);
                }

                const idStudent = await resIdStudent.json();
                console.log("ID do estudante:", idStudent);
                idsStudents.push(idStudent.user.id);
            }

            // 4. Criar grupo
            console.log("4. Criando grupo...");
            const resCreateTeam = await fetch("http://localhost:3001/createGroup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "groupName": groupName,
                    "idMentor": selectedMentor,
                    "idStudent": idsStudents,
                    "idEdition": currentEditionId
                })
            });

            if (!resCreateTeam.ok) {
                const errorText = await resCreateTeam.text();
                throw new Error(`Erro ao criar grupo: ${errorText}`);
            }

            const teamData = await resCreateTeam.json();
            console.log("Grupo criado com sucesso:", teamData);

            // Sucesso!
            alert("Grupo registrado com sucesso!");
            
            // Limpar formulário
            setStudents([{ fullName: "", ra: "", curso: "" }]);
            setGroupName("");
            setSelectedMentor("");
            setPassword("");

        } catch(err) {
            console.error("Erro completo:", err);
            alert(`Erro ao registrar grupo: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
       <>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <Image src={formImg} alt="Empathize image" className={styles.imgEmpathize}/>
                </div>
                <div className={styles.rigthSide}>
                    <h3>INSCRIÇÃO</h3>
                    <form onSubmit={handleSubmit}>
                        {students.map((student, index) => (
                            <div key={index} className={styles.containerInput}>
                                <div className={styles.inpFullName}>
                                    <label htmlFor={`inpFullName-${index}`} className={styles.designLabel}>
                                        Nome completo do estudante<span className={styles.colorMandatory}>*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        name={`inpFullName-${index}`}
                                        id={`inpFullName-${index}`}
                                        value={student.fullName}
                                        onChange={(e) => handleStudentChange(index, "fullName", e.target.value)}
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className={styles.inpRA}>
                                    <label htmlFor={`inpRA-${index}`} className={styles.designLabel}>
                                        RA<span className={styles.colorMandatory}>*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        name={`inpRA-${index}`}
                                        id={`inpRA-${index}`}
                                        value={student.ra}
                                        onChange={(e) => handleStudentChange(index, "ra", e.target.value)}
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className={styles.inpCurso}>
                                    <label htmlFor={`inpCurso-${index}`} className={styles.designLabel}>
                                        Curso<span className={styles.colorMandatory}>*</span>
                                    </label>
                                    <select 
                                        name={`inpCurso-${index}`}
                                        id={`inpCurso-${index}`}
                                        value={student.curso}
                                        onChange={(e) => handleStudentChange(index, "curso", e.target.value)}
                                        disabled={isSubmitting}
                                    >
                                        <option value="" disabled>Selecione</option>
                                        <option value="ECONOMIA">Economia</option>
                                        <option value="CONTABILIDADE">Contabilidade</option>
                                        <option value="ADMINISTRAÇÃO">Administração</option>
                                    </select>
                                </div>

                                {students.length > 1 && (
                                    <button 
                                        type="button" 
                                        onClick={() => handleRemoveStudent(index)}
                                        className={styles.removeBtn}
                                        disabled={isSubmitting}
                                    >
                                        Remover aluno
                                    </button>
                                )}
                            </div>
                        ))}

                        <div className={styles.groupName}>
                            <label htmlFor="inpGroupName" className={styles.designLabel}>
                                Nome do grupo<span className={styles.colorMandatory}>*</span>
                            </label>
                            <input 
                                type="text" 
                                name="inpGroupName" 
                                id="inpGroupName"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className={styles.selectMentor}>
                            <label htmlFor="selectMentor" className={styles.designLabel}>
                                Mentor do grupo<span className={styles.colorMandatory}>*</span>
                            </label>
                            <select 
                                name="selectMentor" 
                                id="selectMentor"
                                value={selectedMentor}
                                onChange={(e) => setSelectedMentor(e.target.value)}
                                onFocus={handleMentors}
                                disabled={isSubmitting}
                            >
                                <option value="" disabled>Selecione</option>
                                {allMentors.map((mentor, index) => (
                                    <option key={index} value={mentor.id}>
                                        {mentor.name_mentor}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.inpPassword}>
                            <label htmlFor="inpPassword" className={styles.designLabel}>
                                Senha do grupo<span className={styles.colorMandatory}>*</span>
                            </label>
                            <input 
                                type="password" 
                                name="inpPassword" 
                                id="inpPassword"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className={styles.buttons}>
                            <button 
                                type="button" 
                                onClick={handleAddStudent}
                                disabled={isSubmitting}
                            >
                                Adicionar aluno
                            </button>
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Registrando..." : "Registrar grupo"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
       </>
    );
}