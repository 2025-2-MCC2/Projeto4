'use client'; 

import React, { useState, useEffect } from "react";
import styles from "./team.module.css";
import layoutStyles from "../dashboard.module.css";
import Navigator from "../../components/Navigator/index.jsx"; 
import IntegrantesContainer from "../../components/IntegrantesContainer/index.jsx"; 
import ProtectedRoute from "../../components/ProtectedRoute.js";
import { getToken } from "../../login/auth.js";
import iconTeam from "../../assets/users-alt.svg";
import Image from "next/image";

function Integrantes() {
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

    const groupName = data?.informationsGroup?.groupName || 'Seu Grupo';
    const studentsCount = data?.informationsGroup?.students?.length || 0;

    return (
        <div className={layoutStyles.dashboard}> 
            <div className={layoutStyles.nav}> 
                <Navigator />
            </div>
            
            <div className={layoutStyles.mainContainer}> 
                <div className={layoutStyles.headerSection}>
                    <div className={layoutStyles.breadcrumb}>
                        <span className={layoutStyles.breadcrumbIcon}>
                            <Image src={iconTeam} alt="Icon team"/>
                        </span>
                        <span className={layoutStyles.breadcrumbText}>Integrantes</span>
                    </div>
                    <div className={layoutStyles.pageTitle}>
                        <h1>Integrantes do Grupo</h1>
                        <p>Conheça os membros do <strong>{groupName}</strong></p>
                    </div>
                </div>

                <div className={styles.teamContent}>
                    {isLoading ? (
                        <div className={styles.loadingState}>
                            <div className={styles.loadingSpinner}></div>
                            <p>Carregando integrantes...</p>
                        </div>
                    ) : (
                        <>
                            <div className={styles.teamHeader}>
                                <div className={styles.statsCard}>
                                    <div className={styles.statsIcon}>
                                        <Image src={iconTeam} alt="Icon Team"/>
                                    </div>
                                    <div className={styles.statsInfo}>
                                        <span className={styles.statsNumber}>{studentsCount}</span>
                                        <span className={styles.statsLabel}>Integrantes</span>
                                    </div>
                                </div>
                                <div className={styles.statsCard}>
                                    <div className={styles.statsIcon}>🎯</div>
                                    <div className={styles.statsInfo}>
                                        <span className={styles.statsNumber}>{groupName}</span>
                                        <span className={styles.statsLabel}>Nome do Grupo</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.integrantesWrapper}>
                                <IntegrantesContainer data={data} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function Team() {
    return (
        <ProtectedRoute role="student">
            <Integrantes />
        </ProtectedRoute>
    );
}