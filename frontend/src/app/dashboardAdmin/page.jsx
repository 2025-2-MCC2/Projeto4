"use client";

import styles from "./dashboard.module.css"; 
import NavigatorAdmin from "../components/NavigatorAdmin/index";
import MainContainerAdmin from "../components/MainContainerAdmin/MainAdmin.jsx";
import { useEffect, useState } from "react";
import { getToken } from "../login/auth.js";
import ProtectedRoute from "../components/ProtectedRoute.js";

function DashboardAdmin() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = getToken();

        const resAdm = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/adminByID`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const resGroups = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allGroups`);
        const groupsData = await resGroups.json();

        const resEditions = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allEditions`);
        const editionsData = await resEditions.json();

        const resCollections = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allCollections`);
        const collectionsData = await resCollections.json();

        const infoAdm = await resAdm.json();

        console.log("Groups:", groupsData);
        console.log("Editions:", editionsData);
        console.log("Collections:", collectionsData);
        console.log("Admin data:", infoAdm);

        const rawGroups = groupsData?.groups || [];

        // remove duplicados por nome (mantém o primeiro)
        const groups = rawGroups.filter(
          (group, index, self) =>
            index === self.findIndex((g) => g.group_name === group.group_name)
        );

        const editions = editionsData?.editions || [];
        const latestEdition = editions[editions.length - 1];

        const allCollections = collectionsData?.collections || [];
        const approvedCollections = allCollections.filter(c => c.status === "Aprovado");

        const totalKg =
          approvedCollections.reduce(
            (acc, c) => acc + (parseFloat(c.quantity_kg) || 0),
            0
          ) || 0;

        const groupKgTotals = approvedCollections.reduce((acc, curr) => {
          const groupId = curr.id_group;
          if (!acc[groupId]) acc[groupId] = 0;
          acc[groupId] += parseFloat(curr.quantity_kg) || 0;
          return acc;
        }, {});

        const normalizedGroups = groups.map((g) => {
          const score =
            (g.pontuation !== undefined && Number(g.pontuation)) ||
            (g.pontuacao !== undefined && Number(g.pontuacao)) ||
            0;
          const idCandidate = g.id ?? g.id_group ?? g.group_id ?? null;
          return {
            raw: g,
            group_name: g.group_name || g.name || "Sem nome",
            pontuation: Number(score) || 0,
            id_candidate: idCandidate,
          };
        });

        const mergedForRanking = normalizedGroups.map((g) => {
          const kg =
            (g.id_candidate != null && (groupKgTotals[g.id_candidate] || 0)) ||
            0;
          return {
            group_name: g.group_name,
            pontuation: g.pontuation,
            total_kg: kg,
          };
        });

        const topGroups = mergedForRanking
          .filter((g) => g.pontuation && g.pontuation > 0)
          .sort((a, b) => b.pontuation - a.pontuation)
          .slice(0, 3);

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
          informationsAdm: infoAdm
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

export default function ExportDashboardAdmin() {
  return (
    <ProtectedRoute role="adm">
      <DashboardAdmin />
    </ProtectedRoute>
  );
}
