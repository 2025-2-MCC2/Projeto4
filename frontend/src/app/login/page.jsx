"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setToken } from "./auth.js";
import styles from "./login.module.css";
import Image from "next/image";
import empathizeLogo from "../assets/empathizeLogo-removebg-preview.png";

export default function Login() {
    const [registerStudent, setRegisterStudent] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [notAuthenticated, setNotAuthenticated] = useState(false);
    const router = useRouter();

    function invalidMessage() {
        return (
            <p>Credenciais inválidas</p>
        );
    }
    async function handleSubmit(ev) {
        ev.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "RA": registerStudent,
                    "password": password
                })
            });

            if (!res.ok) {
                setIsLoading(false);
                setNotAuthenticated(true);
                return;
            }

            const data = await res.json();
            setToken(data.token);
            router.push("/dashboardStudent");
        } catch(err) {
            console.error("Erro: ", err);
            alert("Erro ao conectar com o servidor");
            setIsLoading(false);
        }
    }

    return (
        <div className={styles.theBody}>
            <div className={styles.backgroundDecoration}>
                <div className={styles.circle1}></div>
                <div className={styles.circle2}></div>
                <div className={styles.circle3}></div>
            </div>

            <div className={styles.container}>
                <div className={styles.logoContainer}>
                    <Image 
                        src={empathizeLogo} 
                        alt="Empathize Logo" 
                        className={styles.imgLogo}
                    />
                </div>

                <div className={styles.welcomeText}>
                    <h1>Bem-vindo de volta!</h1>
                    <p>Entre com suas credenciais para continuar</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="fieldRA">Registro Acadêmico</label>
                        <input 
                            type="text" 
                            id="fieldRA"
                            name="fieldRA" 
                            placeholder="Digite seu RA" 
                            value={registerStudent}
                            onChange={(ev) => setRegisterStudent(ev.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="fieldPassword">Senha</label>
                        <div className={styles.passwordWrapper}>
                            <input 
                                type={showPassword ? "text" : "password"}
                                id="fieldPassword"
                                name="fieldPassword" 
                                placeholder="Digite sua senha" 
                                value={password}
                                onChange={(ev) => setPassword(ev.target.value)}
                                required
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                className={styles.togglePassword}
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={isLoading}
                                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                            >
                                {showPassword ? "👁️" : "👁️‍🗨️"}
                            </button>
                        </div>
                    </div>

                    {notAuthenticated && invalidMessage()}
                    
                    <button 
                        type="submit" 
                        className={styles.submitButton}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className={styles.loader}></span>
                        ) : (
                            "Entrar"
                        )}
                    </button>
                </form>

                <div className={styles.footer}>
                    <p><a href="/login/mentor">Sou mentor</a></p>
                    <p><a href="/login/admin">Sou admin</a></p>
                </div>
            </div>
        </div>
    );
}