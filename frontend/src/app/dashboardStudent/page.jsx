'use client';

import styles from "./dashboard.module.css";
import Navigator from "../components/Navigator/index.jsx";
import MainContainer from "../components/MainContainer/index.jsx";
import { useEffect, useState } from "react";
import { getToken } from "../login/auth.js";
import ProtectedRoute from "../components/ProtectedRoute.js";

function DashboardStudentContent() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const token = getToken();
                const res = await fetch("http://localhost:3001/dashboardStudent", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    throw new Error('Erro ao carregar o dashboard')
                }

                const result = await res.json();
                setData(result);
                console.log("Dados do grupo: " + data);
            } catch(err) {
                console.error(err);
            }
        }

        fetchDashboard();
    }, []);

    return (
        <>
            <div className={styles.dashboard}>
                <div className={styles.nav}>
                    <Navigator />
                </div>
                <div className={styles.mainContainer}>
                    <h3>#DASHBOARD</h3>
                    <MainContainer />
                </div>
            </div>
        </>
    );
}

export default function DashboardStudent() {
    return (
        <ProtectedRoute>
            <DashboardStudentContent />
        </ProtectedRoute>
    );
}