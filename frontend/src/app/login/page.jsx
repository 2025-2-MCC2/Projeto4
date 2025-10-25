"use client";

import styles from "./login.module.css";
import Image from "next/image";
import empathizeLogo from "../assets/empathizeLogo-removebg-preview.png";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [registerStudent, setRegisterStudent] = useState(0);
    const [password, setPassword] = useState("");
    const router = useRouter();

    async function handleSubmit(ev) {
        ev.preventDefault();

        try {
            const res = await fetch("https://empathizesystem-production.up.railway.app/signin", {
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
                const err = await res.json().catch(() => ({ error: "Unknown error"}));
                console.log("Error: ", err);
                alert("Error!");
                return;
            }

            router.push("/dashboardStudent");
        } catch(err) {
            console.error("Erro: ", err);
            alert("Erro no servidor: " + err);
        }
    }

    return (
        <>
            <div className={styles.theBody}>
                <div className={styles.container}>
                    <form onSubmit={handleSubmit}>
                        <Image src={empathizeLogo} alt="" className={styles.imgLogo}/>
                        <input type="number" name="fieldRA" placeholder="Coloque seu RA" onChange={(ev) => setRegisterStudent(ev.target.value)}/>
                        <input type="password" name="fieldPassword" placeholder="Coloque a sua senha" onChange={(ev) => setPassword(ev.target.value)}/>
                        <button type="submit">Entrar</button>
                    </form>
                </div>
            </div>
        </>
    );
}