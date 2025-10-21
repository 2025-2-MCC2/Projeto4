import React from 'react';
import styles from './style.module.css'; 
export default function MessagePanel({ className }) {
    return (
        <div className={`${styles.panelContainer} ${className}`}> 
            <header className={styles.panelHeader}>
                <h4>Mensagens</h4>
            </header>

            <div className={styles.panelContent}>
                
                <span className={styles.messageIcon}>💬</span> 
                
                <p className={styles.emptyMessage}>sem mensagens!</p>
                
            </div>
        </div>
    );
}