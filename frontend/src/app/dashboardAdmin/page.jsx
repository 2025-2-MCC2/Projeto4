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

        const groupTotals = approvedCollections.reduce((acc, curr) => {
          const groupId = curr.id_group;
          if (!acc[groupId]) {
            acc[groupId] = { id_group: groupId, total_kg: 0 };
          }
          acc[groupId].total_kg += parseFloat(curr.quantity_kg) || 0;
          return acc;
        }, {});

      const mergedGroups = Object.values(groupTotals).map((g) => {
        const groupInfo = groups.find((grp) => Number(grp.id) === Number(g.id_group));

        return {
          group_name: groupInfo
            ? `${groupInfo.group_name}`
            : `Grupo ${g.id_group} (desconhecido)`,
          total_kg: g.total_kg,
        };
      });

        const topGroups = mergedGroups.sort((a, b) => b.total_kg - a.total_kg).slice(0, 3);

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
