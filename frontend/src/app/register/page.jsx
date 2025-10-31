"use client";

import { useState } from "react";
import formImg from "../assets/formImg1.png";
import styles from "./register.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Form() {
    const [students, setStudents] = useState([
        { fullName: "", ra: "", curso: "" }
    ]);
    const [groupName, setGroupName] = useState("");
    const [selectedMentor, setSelectedMentor] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [allMentors, setAllMentors] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

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
            const res = await fetch(`${apiUrl}/allMentors`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                throw new Error(`Erro HTTP! Status: ${res.status}`);
            }

            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Resposta não é JSON. Verifique se a rota existe.");
            }

            const data = await res.json();
            console.log("Mentores carregados:", data);
            setAllMentors(data.mentors || []);
        } catch(err) {
            console.error("Erro ao carregar mentores:", err);
            alert(`Erro ao carregar mentores: ${err.message}`);
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

        if (password !== confirmPassword) {
            alert("As senhas não coincidem!");
            return;
        }

        setIsSubmitting(true);

        try {
            console.log("1. Buscando edição atual...");
            const resEdition = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allEditions`);
            
            if (!resEdition.ok) {
                throw new Error(`Erro ao buscar edições: ${resEdition.status}`);
            }

            const idCurrentEdition = await resEdition.json();
            console.log("Edições:", idCurrentEdition);

            if (!idCurrentEdition.editions || idCurrentEdition.editions.length === 0) {
                throw new Error("Nenhuma edição encontrada");
            }

            const currentEditionId = idCurrentEdition.editions[idCurrentEdition.editions.length - 1].id;
            console.log("ID da edição atual:", currentEditionId);

            const idsStudents = [];

            for (let i = 0; i < students.length; i++) {
                console.log(`2.${i + 1}. Criando estudante:`, students[i]);

                const resCreateStudent = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/createUser`, {
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

                console.log(`3.${i + 1}. Buscando ID do estudante com RA: ${students[i].ra}`);
                const resIdStudent = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/userRA/${students[i].ra}`);
                
                if (!resIdStudent.ok) {
                    throw new Error(`Erro ao buscar estudante com RA ${students[i].ra}`);
                }

                const idStudent = await resIdStudent.json();
                console.log("ID do estudante:", idStudent.user[0].id);
                idsStudents.push(idStudent.user[0].id);
            }

            console.log("4. Criando grupo...");
            const resCreateTeam = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/createGroup`, {
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

            alert("Grupo registrado com sucesso!");
            router.push("/login");
            
            setStudents([{ fullName: "", ra: "", curso: "" }]);
            setGroupName("");
            setSelectedMentor("");
            setPassword("");
            setConfirmPassword("");

        } catch(err) {
            console.error("Erro completo:", err);
            alert(`Erro ao registrar grupo: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
       <div className={styles.container}>
            <div className={styles.leftSide}>
                <div className={styles.imageOverlay}></div>
                <Image src={formImg} alt="Empathize image" className={styles.imgEmpathize}/>
                <div className={styles.leftContent}>
                    <h1>Bem-vindo ao Empathize</h1>
                    <p>Registre seu grupo e comece sua jornada de aprendizado colaborativo</p>
                </div>
            </div>

            <div className={styles.rightSide}>
                <div className={styles.header}>
                    <h2>Inscrição de Grupo</h2>
                    <p>Preencha os dados abaixo para criar seu grupo</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.studentsSection}>
                        <div className={styles.sectionHeader}>
                            <h3>👥 Integrantes do Grupo</h3>
                            <span className={styles.badge}>{students.length} {students.length === 1 ? 'aluno' : 'alunos'}</span>
                        </div>

                        {students.map((student, index) => (
                            <div key={index} className={styles.studentCard}>
                                <div className={styles.cardHeader}>
                                    <span className={styles.studentNumber}>Aluno {index + 1}</span>
                                    {students.length > 1 && (
                                        <button 
                                            type="button" 
                                            onClick={() => handleRemoveStudent(index)}
                                            className={styles.removeBtn}
                                            disabled={isSubmitting}
                                            title="Remover aluno"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>

                                <div className={styles.studentFields}>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor={`inpFullName-${index}`}>
                                            Nome completo <span className={styles.required}>*</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            id={`inpFullName-${index}`}
                                            placeholder="Digite o nome completo"
                                            value={student.fullName}
                                            onChange={(e) => handleStudentChange(index, "fullName", e.target.value)}
                                            disabled={isSubmitting}
                                            required
                                        />
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor={`inpRA-${index}`}>
                                            RA <span className={styles.required}>*</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            id={`inpRA-${index}`}
                                            placeholder="000000"
                                            value={student.ra}
                                            onChange={(e) => handleStudentChange(index, "ra", e.target.value)}
                                            disabled={isSubmitting}
                                            required
                                        />
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor={`inpCurso-${index}`}>
                                            Curso <span className={styles.required}>*</span>
                                        </label>
                                        <select 
                                            id={`inpCurso-${index}`}
                                            value={student.curso}
                                            onChange={(e) => handleStudentChange(index, "curso", e.target.value)}
                                            disabled={isSubmitting}
                                            required
                                        >
                                            <option value="" disabled>Selecione o curso</option>
                                            <option value="ECONOMIA">Economia</option>
                                            <option value="CONTABILIDADE">Contabilidade</option>
                                            <option value="ADMINISTRAÇÃO">Administração</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button 
                            type="button" 
                            onClick={handleAddStudent}
                            className={styles.addStudentBtn}
                            disabled={isSubmitting}
                        >
                            <span>+</span> Adicionar outro aluno
                        </button>
                    </div>

                    <div className={styles.groupSection}>
                        <div className={styles.sectionHeader}>
                            <h3>🎯 Informações do Grupo</h3>
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="inpGroupName">
                                Nome do grupo <span className={styles.required}>*</span>
                            </label>
                            <input 
                                type="text" 
                                id="inpGroupName"
                                placeholder="Digite o nome do grupo"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                disabled={isSubmitting}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="selectMentor">
                                Mentor do grupo <span className={styles.required}>*</span>
                            </label>
                            <select 
                                id="selectMentor"
                                value={selectedMentor}
                                onChange={(e) => setSelectedMentor(e.target.value)}
                                onFocus={handleMentors}
                                disabled={isSubmitting}
                                required
                            >
                                <option value="" disabled>Selecione um mentor</option>
                                {allMentors.map((mentor, index) => (
                                    <option key={index} value={mentor.id}>
                                        {mentor.name_mentor}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.passwordFields}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="inpPassword">
                                    Senha do grupo <span className={styles.required}>*</span>
                                </label>
                                <div className={styles.passwordWrapper}>
                                    <input 
                                        type={showPassword ? "text" : "password"}
                                        id="inpPassword"
                                        placeholder="Crie uma senha segura"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={isSubmitting}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className={styles.togglePassword}
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={isSubmitting}
                                    >
                                        {showPassword ? "👁️" : "👁️‍🗨️"}
                                    </button>
                                </div>
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="inpConfirmPassword">
                                    Confirmar senha <span className={styles.required}>*</span>
                                </label>
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    id="inpConfirmPassword"
                                    placeholder="Digite a senha novamente"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    disabled={isSubmitting}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className={styles.submitBtn}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className={styles.loader}></span>
                                Registrando grupo...
                            </>
                        ) : (
                            <>
                                ✓ Registrar grupo
                            </>
                        )}
                    </button>
                </form>
            </div>
       </div>
    );
}