import styles from './style.module.css'; 

export default function MessagePanel({ className }) {
    return (
        <div className={`${styles.panelContainer} ${className}`}> 
            <header className={styles.panelHeader}>
                <div className={styles.headerContent}>
                    <h3>💬 Mensagens</h3>
                    <span className={styles.badge}>0</span>
                </div>
            </header>

            <div className={styles.panelContent}>
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" 
                                  stroke="#10b981" 
                                  strokeWidth="2" 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <h4>Nenhuma mensagem</h4>
                    <p>Você está em dia! Sem mensagens novas no momento.</p>
                </div>
            </div>
        </div>
    );
}