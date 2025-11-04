'use client';

import React, { useState } from "react";
import styles from "../register/register.module.css"; 
import Image from "next/image";
import { useRouter } from "next/navigation";
import formImg from "../assets/formImg1.png"; 

const API_REGISTER_ADMIN = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/createAdmin`;

export default function AdminRegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    
    const togglePasswordVisibility = () => setShowPassword(prev => !prev);


    async function handleSubmit(e) {
        e.preventDefault();
        setMessage(null);

        if (password !== confirmPassword) {
            setMessage({ type: 'error', text: 'As senhas não coincidem!' });
            return;
        }

        setLoading(true);

        const payload = {
            name_adm: name, 
            email: email,
            password: password,
        };

        try {
            const res = await fetch(API_REGISTER_ADMIN, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage({ type: 'success', text: 'Registro de Admin concluído! Redirecionando para o login...' });
                setName(''); setEmail(''); setPassword(''); setConfirmPassword('');
                
                setTimeout(() => {
                    router.push("/login");
                 }, 1500); 
            
            } else {
                setMessage({ type: 'error', text: data.message || 'Falha no registro. Email já em uso ou erro de servidor.' });
            }

        } catch(err) {
            setMessage({ type: 'error', text: 'Erro de conexão com a API. Verifique o servidor.' });
            console.error("Erro completo:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <div className={styles.imageOverlay}></div>
                <Image src={formImg} alt="Empathize image" className={styles.imgEmpathize} layout="fill" objectFit="cover" />
                <div className={styles.leftContent}>
                    <h1>Registro de Administrador</h1>
                    <p>Acesso exclusivo para gerenciar o Projeto Lideranças Empáticas.</p>
                </div>
            </div>

            <div className={styles.rightSide}>
                <div className={styles.header}>
                    <h2>Cadastro de Admin</h2>
                    <p>Preencha os dados abaixo para criar sua conta de administrador</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    
                    <div className={styles.groupSection} style={{ padding: '2rem' }}>
                        
                        <div className={styles.inputGroup}>
                            <label htmlFor="inpName">
                                Nome Completo <span className={styles.required}>*</span>
                            </label>
                            <input 
                                type="text" 
                                id="inpName"
                                placeholder="Digite seu nome completo"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={loading}
                                required
                            />
                        </div>
                        
                        <div className={styles.inputGroup}>
                            <label htmlFor="inpEmail">
                                Email <span className={styles.required}>*</span>
                            </label>
                            <input 
                                type="email" 
                                id="inpEmail"
                                placeholder="exemplo@fecap.br"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                                required
                            />
                        </div>

                        <div className={styles.passwordFields} style={{ marginTop: '1rem' }}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="inpPassword">
                                    Senha <span className={styles.required}>*</span>
                                </label>
                                <div className={styles.passwordWrapper}>
                                    <input 
                                        type={showPassword ? "text" : "password"}
                                        id="inpPassword"
                                        placeholder="Crie uma senha segura"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={loading}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className={styles.togglePassword}
                                        onClick={togglePasswordVisibility}
                                        disabled={loading}
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
                                    disabled={loading}
                                    required
                                />
                            </div>
                        </div>
                        
                    </div>

                    {message && (
                        <p style={{ color: message.type === 'error' ? '#dc2626' : '#059669', fontWeight: 'bold', textAlign: 'center', marginTop: '1rem' }}>
                            {message.text}
                        </p>
                    )}

                    <button 
                        type="submit"
                        className={styles.submitBtn}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className={styles.loader}></span>
                                Registrando...
                            </>
                        ) : (
                            <>
                                ✓ Registrar Administrador
                            </>
                        )}
                    </button>
                </form>
                
                <p style={{ marginTop: '15px', textAlign: 'center' }}>
                    <a href="/login" style={{ color: '#059669', fontWeight: 'bold' }}>Já tem conta? Faça Login</a>
                </p>
            </div>
        </div>
    );
}