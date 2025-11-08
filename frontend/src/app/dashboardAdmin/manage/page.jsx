"use client";

import { useState } from "react";
import styles from "./manage.module.css";
import NavigatorAdmin from "../../components/NavigatorAdmin";
import AdminsModal from "../../components/AdminsModal"; 
import EditionsModal from "../../components/EditionsModal"; 

export default function ManagePage() {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isEditionModalOpen, setIsEditionModalOpen] = useState(false);

  return (
    <div className={styles.dashboard}>
      <div className={styles.nav}>
        <NavigatorAdmin />
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.headerSection}>
          <div className={styles.breadcrumb}>
            <span className={styles.breadcrumbIcon}>⚙️</span>
            <span className={styles.breadcrumbText}>Gerenciar Sistema</span>
          </div>

          <div className={styles.pageTitle}>
            <h1>Gerenciar Sistema</h1>
            <p>Administre administradores e edições do projeto</p>
          </div>
        </div>

        <div className={styles.cardsGrid}>
          <div className={styles.card}>
            <h2>Administradores</h2>
            <p>Visualize e gerencie os administradores registrados.</p>
            <button
              className={styles.manageButton}
              onClick={() => setIsAdminModalOpen(true)}
            >
              Gerenciar
            </button>
          </div>

          <div className={styles.card}>
            <h2>Edições</h2>
            <p>Visualize e gerencie as edições ativas do projeto.</p>
            <button
              className={styles.manageButton}
              onClick={() => setIsEditionModalOpen(true)}
            >
              Gerenciar
            </button>
          </div>
        </div>
      </div>

      <AdminsModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />

      <EditionsModal
        isOpen={isEditionModalOpen}
        onClose={() => setIsEditionModalOpen(false)}
      />
    </div>
  );
}
