'use client';

import styles from "./dashboard.module.css";
import Navigator from "../components/Navigator/index.jsx";
import MainContainer from "../components/MainContainer/index.jsx";
import { useEffect, useState } from "react";
import { getToken } from "../login/auth.js";
import ProtectedRoute from "../components/ProtectedRoute.js";
import Image from "next/image";
import iconDashboard from "../assets/painel-de-controle.png";

function DashboardStudentContent() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const token = getToken();
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboardStudent`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    throw new Error('Erro ao carregar o dashboard')
                }

                const result = await res.json();
                setData(result);
                console.log("Dados do grupo:", result);
            } catch(err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchDashboard();
    }, []);

    return (
        <div className={styles.dashboard}>
            <div className={styles.nav}>
                <Navigator />
            </div>
            <div className={styles.mainContainer}>
                <div className={styles.headerSection}>
                    <div className={styles.breadcrumb}>
                        <span className={styles.breadcrumbIcon}>
                            <Image src={iconDashboard} alt="Icon dashboard" className={styles.iconDashboard}/>
                        </span>
                        <span className={styles.breadcrumbText}>Dashboard</span>
                    </div>
                    <div className={styles.pageTitle}>
                        <h1>Dashboard</h1>
                        <p>Acompanhe o progresso do seu grupo</p>
                    </div>
                </div>

                {isLoading ? (
                    <div className={styles.loadingState}>
                        <div className={styles.loadingSpinner}></div>
                        <p>Carregando dados...</p>
                    </div>
                ) : (
                    <MainContainer data={data} />
                )}
            </div>
        </div>
    );
}

export default function DashboardStudent() {
    return (
        <ProtectedRoute>
            <DashboardStudentContent />
        </ProtectedRoute>
    );
}