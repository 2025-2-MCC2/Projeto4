"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./style.module.css";
import Image from "next/image";
import empathizeLogo from "../assets/empathizeLogo-removebg-preview.png";
import Link from "next/link";

export default function RegisterMentor() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        // Validações
        if (!name.trim() || !email.trim() || !password.trim()) {
            setError("Todos os campos são obrigatórios");
            return;
        }

        if (password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres");
            return;
        }

        if (password !== confirmPassword) {
            setError("As senhas não coincidem");
            return;
        }

        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Digite um email válido");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/createMentor`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    password: password
                })
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.message || 'Erro ao cadastrar mentor');
            }

            const data = await res.json();
            console.log("Mentor cadastrado:", data);

            alert("Mentor cadastrado com sucesso!");
            router.push("/login/mentor");
        } catch (err) {
            console.error("Erro:", err);
            setError(err.message || "Erro ao cadastrar mentor. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className={styles.container}>
            {/* Left Side - Form */}
            <div className={styles.formSide}>
                <div className={styles.formContent}>
                    <div className={styles.logoSection}>
                        <Image 
                            src={empathizeLogo} 
                            alt="Empathize Logo" 
                            className={styles.logo}
                        />
                    </div>

                    <div className={styles.header}>
                        <h1>Cadastro de Mentor</h1>
                        <p>Junte-se a nós e oriente grupos em projetos sociais</p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="name">
                                Nome Completo <span className={styles.required}>*</span>
                            </label>
                            <div className={styles.inputWrapper}>
                                <span className={styles.inputIcon}>👤</span>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Digite seu nome completo"
                                    disabled={isSubmitting}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="email">
                                Email <span className={styles.required}>*</span>
                            </label>
                            <div className={styles.inputWrapper}>
                                <span className={styles.inputIcon}>📧</span>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="seu.email@exemplo.com"
                                    disabled={isSubmitting}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="password">
                                Senha <span className={styles.required}>*</span>
                            </label>
                            <div className={styles.inputWrapper}>
                                <span className={styles.inputIcon}>🔒</span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Mínimo 6 caracteres"
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
                            <label htmlFor="confirmPassword">
                                Confirmar Senha <span className={styles.required}>*</span>
                            </label>
                            <div className={styles.inputWrapper}>
                                <span className={styles.inputIcon}>🔒</span>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Digite a senha novamente"
                                    disabled={isSubmitting}
                                    required
                                />
                                <button
                                    type="button"
                                    className={styles.togglePassword}
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    disabled={isSubmitting}
                                >
                                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className={styles.errorMessage}>
                                <span className={styles.errorIcon}>⚠️</span>
                                {error}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            className={styles.submitButton}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className={styles.loader}></span>
                                    Cadastrando...
                                </>
                            ) : (
                                <>
                                    <span>🚀</span>
                                    Cadastrar como Mentor
                                </>
                            )}
                        </button>
                    </form>

                    <div className={styles.footer}>
                        <p>
                            Já possui uma conta? 
                            <Link href="/login/mentor"> Fazer login</Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Info */}
            <div className={styles.infoSide}>
                <div className={styles.infoContent}>
                    <div className={styles.infoHeader}>
                        <h2>Seja um Mentor</h2>
                        <p>Ajude grupos a alcançarem seu máximo potencial em projetos sociais</p>
                    </div>

                    <div className={styles.benefitsList}>
                        <div className={styles.benefitItem}>
                            <div className={styles.benefitIcon}>
                                <span>🎯</span>
                            </div>
                            <div className={styles.benefitText}>
                                <h3>Oriente Grupos</h3>
                                <p>Acompanhe e guie equipes em suas jornadas de impacto social</p>
                            </div>
                        </div>

                        <div className={styles.benefitItem}>
                            <div className={styles.benefitIcon}>
                                <span>✅</span>
                            </div>
                            <div className={styles.benefitText}>
                                <h3>Valide Arrecadações</h3>
                                <p>Aprove ou rejeite doações garantindo transparência</p>
                            </div>
                        </div>

                        <div className={styles.benefitItem}>
                            <div className={styles.benefitIcon}>
                                <span>📊</span>
                            </div>
                            <div className={styles.benefitText}>
                                <h3>Acompanhe Métricas</h3>
                                <p>Visualize o progresso e impacto dos grupos orientados</p>
                            </div>
                        </div>

                        <div className={styles.benefitItem}>
                            <div className={styles.benefitIcon}>
                                <span>💚</span>
                            </div>
                            <div className={styles.benefitText}>
                                <h3>Faça a Diferença</h3>
                                <p>Contribua para transformar comunidades através da sua mentoria</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}