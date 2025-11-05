'use client';

import styles from "./page.module.css";
import NavigatorMentor from "../components/NavigatorMentor/NavMentor.jsx";
import MainContainerMentor from "../components/MainContainerMentor/MainMentor.jsx";
import { useEffect, useState } from "react";
import { getToken } from "../login/auth.js";
import ProtectedRoute from "../components/ProtectedRoute.js";

function DashboardMentorContent() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const token = getToken();
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboardMentor`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    throw new Error('Erro ao carregar o dashboard')
                }

                const result = await res.json();
                setData(result);
                console.log("Dados do mentor:", result);
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
                <NavigatorMentor />
            </div>
            <div className={styles.mainContainer}>
                <div className={styles.headerSection}>
                    <div className={styles.breadcrumb}>
                        <span className={styles.breadcrumbIcon}>🏠</span>
                        <span className={styles.breadcrumbText}>Dashboard</span>
                    </div>
                    <div className={styles.pageTitle}>
                        <h1>Dashboard do Mentor</h1>
                        <p>Acompanhe e gerencie o progresso do seu grupo</p>
                    </div>
                </div>

                {isLoading ? (
                    <div className={styles.loadingState}>
                        <div className={styles.loadingSpinner}></div>
                        <p>Carregando dados...</p>
                    </div>
                ) : (
                    <MainContainerMentor data={data} />
                )}
            </div>
        </div>
    );
}

export default function DashboardMentor() {
    return (
        <ProtectedRoute>
            <DashboardMentorContent />
        </ProtectedRoute>
    );
}