'use client'; 

import React, { useState, useEffect, useCallback } from "react";
import styles from "./team.module.css";
import layoutStyles from "../dashboard.module.css";
import Navigator from "../../components/Navigator/index.jsx"; 
import IntegrantesContainer from "../../components/IntegrantesContainer/index.jsx"; 
import coracaoVerde from "../../assets/coracaoVerde.svg"; 

const API_BASE_URL = 'http://localhost:3000'; 

export default function Integrantes() {
    const [grupo, setGrupo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    
    const [currentGroupId, setCurrentGroupId] = useState(null); 

    const fetchIntegrantes = useCallback(async (groupId) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/groups/${groupId}`); 
            
            if (!response.ok) {
                throw new Error(`Falha na busca do grupo: Status ${response.status}`);
            }
            
            const data = await response.json();
            setGrupo(data); 

        } catch (e) {
            setError(e.message); 
            console.error("Erro no fetch de integrantes:", e);
            setGrupo(null);
        } finally {
            setLoading(false);
        }
    }, []); 

    useEffect(() => {
        const storedId = localStorage.getItem('groupId') || '1'; 
        setCurrentGroupId(storedId);

        if (storedId && storedId !== '1') {
            fetchIntegrantes(storedId);
        } else {
            setError("ID do grupo não encontrado ou inválido.");
            setLoading(false);
        }
    }, [fetchIntegrantes]);

    if (loading || currentGroupId === null) {
        return (
            <div className={layoutStyles.dashboard}>
                <div className={layoutStyles.nav}><Navigator /></div>
                <div className={layoutStyles.mainContainer}><h3>Carregando integrantes...</h3></div>
            </div>
        );
    }
    
    const safeGrupo = grupo || { groupName: '...', students: [], mentor: '' };
    
    const groupTitle = safeGrupo.groupName !== '...' 
                       ? `#INTEGRANTES DO GRUPO: ${safeGrupo.groupName}` 
                       : `#INTEGRANTES`;

    return (
        <div className={layoutStyles.dashboard}> 
            <div className={layoutStyles.nav}> 
                <Navigator />
            </div>
            
            <div className={layoutStyles.mainContainer}> 
                
                <h3 className={layoutStyles.mainContainerTitle}>
                    {groupTitle}
                    <img 
                        src={coracaoVerde} 
                        alt="Coração Verde" 
                        className={layoutStyles.coracaoIcon} 
                    />
                </h3>
                
                <IntegrantesContainer 
                    students={safeGrupo.students || []} 
                    mentor={safeGrupo.mentor || ""} 
                />
                
            </div>
        </div>
    );
}