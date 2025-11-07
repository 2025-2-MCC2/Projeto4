'use client';

import React from "react";
import styles from "./style.module.css";

export default function GroupsContainerAdmin({ groups }) {
  return (
    <div className={styles.container}>
      {groups.length === 0 ? (
        <p className={styles.emptyMessage}>Nenhum grupo encontrado.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome do Grupo</th>
              <th>Total Arrecadado (kg)</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <tr key={group.group_id}>
                <td>{group.group_name}</td>
                <td>{parseFloat(group.total_kg || 0).toFixed(2)} kg</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
