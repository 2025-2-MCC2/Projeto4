'use client';

import styles from "./dashboard.module.css"; 
import NavigatorAdmin from "../components/NavigatorAdmin/index";
import MainContainerAdmin from "../components/MainContainerAdmin/MainAdmin.jsx";
import { useEffect, useState } from "react";
import { getToken } from "../login/auth.js";

export default function DashboardAdmin() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = getToken();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboardAdmin`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Erro ao carregar o dashboard');

        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className={styles.dashboard}>
      <div className={styles.nav}>
        <NavigatorAdmin />
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.headerSection}>
          <div className={styles.breadcrumb}>
            <span className={styles.breadcrumbIcon}>🏠</span>
            <span className={styles.breadcrumbText}>Dashboard</span>
          </div>
          <div className={styles.pageTitle}>
            <h1>Visão Geral</h1>
            <p>Acompanhe as estatísticas globais do projeto</p>
          </div>
        </div>

        {isLoading ? (
          <div className={styles.loadingState}>
            <div className={styles.loadingSpinner}></div>
            <p>Carregando dados...</p>
          </div>
        ) : (
          <MainContainerAdmin data={data} />
        )}
      </div>
    </div>
  );
}