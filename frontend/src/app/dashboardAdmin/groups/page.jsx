'use client';

import { useEffect, useState } from 'react';
import NavigatorAdmin from '../../components/NavigatorAdmin';
import styles from './groups.module.css';
import layoutStyles from '../dashboard.module.css';
import Image from 'next/image';
import groupIcon from '../../assets/users-alt.svg';
import { getToken } from '../../login/auth.js';

export default function GroupsPage() {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = getToken();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allGroups`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const text = await res.text();
          console.error('Resposta do servidor:', text);
          throw new Error(`Erro ao carregar grupos: ${res.status}`);
        }

        const data = await res.json();
        const groupsData = data?.groups || [];
        setGroups(groupsData);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div className={layoutStyles.dashboard}>
      <div className={layoutStyles.nav}>
        <NavigatorAdmin />
      </div>

      <div className={layoutStyles.mainContainer}>
        <div className={layoutStyles.headerSection}>
          <div className={layoutStyles.breadcrumb}>
            <span className={layoutStyles.breadcrumbIcon}>
              <Image src={groupIcon} alt="Ícone grupos" />
            </span>
            <span className={layoutStyles.breadcrumbText}>Gerenciar Grupos</span>
          </div>

          <div className={layoutStyles.pageTitle}>
            <h1>Grupos Cadastrados</h1>
            <p>Veja todos os grupos e suas arrecadações</p>
          </div>
        </div>

        {isLoading ? (
          <div className={styles.loadingState}>
            <div className={styles.loadingSpinner}></div>
            <p>Carregando grupos...</p>
          </div>
        ) : error ? (
          <p className={styles.errorMsg}>Erro ao carregar grupos 😢</p>
        ) : groups.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Nenhum grupo cadastrado ainda.</p>
            <span>Os grupos aparecerão aqui quando forem criados.</span>
          </div>
        ) : (
          <div className={styles.groupsList}>
            {groups.map((group) => (
              <div key={group._id} className={styles.groupItem}>
                <div className={styles.groupHeader}>
                  <span className={styles.groupName}>
                    {group.group_name || group.name}
                  </span>
                  <span className={styles.groupKg}>
                    {parseFloat(group.total_kg || 0).toFixed(2)} kg
                  </span>
                </div>

                {group.students?.length > 0 && (
                  <div className={styles.studentsList}>
                    {group.students.map((student, i) => (
                      <p key={i}>{student}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
