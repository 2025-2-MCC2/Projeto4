"use client";

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

        const resGroups = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allGroups`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const groupsData = await resGroups.json();

        const resEditions = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allEditions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const editionsData = await resEditions.json();

        const resCollections = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allCollections`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const collectionsData = await resCollections.json();

        console.log("Groups:", groupsData);
        console.log("Editions:", editionsData);
        console.log("Collections:", collectionsData);

        const rawGroups = groupsData?.groups || [];
        const groups = rawGroups.filter(
          (group, index, self) =>
            index === self.findIndex((g) => g.group_name === group.group_name)
        );

        const editions = editionsData?.editions || [];
        const latestEdition = editions[editions.length - 1];

        const totalKg =
          collectionsData?.collections?.reduce(
            (acc, c) => acc + (parseFloat(c.quantity_kg) || 0),
            0
          ) || 0;

        const rankedGroups = [...groups].sort((a, b) => (b.points || 0) - (a.points || 0));
        const hasPoints = rankedGroups.some((g) => g.points && g.points > 0);

        let topGroups = [];
        if (hasPoints) {
          topGroups = rankedGroups.slice(0, 3).map((g) => ({
            group_name: g.group_name || "Sem nome",
            points: `${g.points} pts`,
          }));
        } else {
          topGroups = null; 
        }

        let daysRemaining = "-";
        if (latestEdition?.end_date) {
          const end = new Date(latestEdition.end_date);
          const now = new Date();
          const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
          daysRemaining = diff > 0 ? diff : 0;
        }

        setData({
          totalGroups: groups.length,
          daysRemaining,
          totalKg,
          topGroups,
        });
      } catch (err) {
        console.error("Erro ao carregar dados do dashboard:", err);
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
