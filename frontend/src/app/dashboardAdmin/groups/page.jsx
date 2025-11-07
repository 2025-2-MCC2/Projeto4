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
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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

        const grouped = [];
        groupsData.forEach((g) => {
          let existing = grouped.find((x) => x.group_name === g.group_name);
          if (!existing) {
            grouped.push({
              group_name: g.group_name,
              mentor: g.name_mentor,
              pontuation: g.pontuation,
              students: [g.full_name],
            });
          } else {
            existing.students.push(g.full_name);
          }
        });

        setGroups(grouped);
        setFilteredGroups(grouped);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = groups.filter(
      (group) =>
        group.group_name.toLowerCase().includes(term) ||
        group.students.some((s) => s.toLowerCase().includes(term)) ||
        group.mentor?.toLowerCase().includes(term)
    );
    setFilteredGroups(filtered);
  }, [searchTerm, groups]);

  const toggleExpand = (name) => {
    setExpandedGroup((prev) => (prev === name ? null : name));
  };

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

        <div className={styles.searchBar}>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Pesquisar por grupo, integrante ou mentor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        {isLoading ? (
          <div className={styles.loadingState}>
            <div className={styles.loadingSpinner}></div>
            <p>Carregando grupos...</p>
          </div>
        ) : error ? (
          <p className={styles.errorMsg}>Erro ao carregar grupos 😢</p>
        ) : filteredGroups.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Nenhum grupo encontrado com esse nome.</p>
          </div>
        ) : (
          <div className={styles.groupsList}>
            {filteredGroups.map((group) => (
              <div key={group.group_name} className={styles.groupItem}>
                <div
                  className={styles.groupHeader}
                  onClick={() => toggleExpand(group.group_name)}
                >
                  <span className={styles.groupName}>{group.group_name}</span>
                  <span className={styles.groupKg}>
                    {group.pontuation ? `${group.pontuation} kg` : '0 kg'}
                  </span>
                </div>

                {expandedGroup === group.group_name && (
                  <div className={styles.studentsList}>
                    <p><strong>Mentor:</strong> {group.mentor}</p>
                    <strong>Integrantes:</strong>
                    {group.students?.length > 0 ? (
                      group.students.map((s, i) => <p key={i}>{s}</p>)
                    ) : (
                      <p>Nenhum integrante registrado.</p>
                    )}
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
