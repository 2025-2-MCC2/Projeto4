import styles from './style.module.css'; 
import iconMessages from "../../../assets/messages.png";
import Image from "next/image";

export default function MessagePanel({ className, data }) {
    const informationsCollections = data?.informationsCollections || [];
    
    const rejectedMessages = informationsCollections.filter(item => item.jus_reject !== null && item.jus_reject !== undefined);
    
    const messageCount = rejectedMessages.length;

    return (
        <div className={`${styles.panelContainer} ${className}`}> 
            <header className={styles.panelHeader}>
                <div className={styles.headerContent}>
                    <Image src={iconMessages} alt='Icon messages' className={styles.imgMessages}/>
                    <h3>Mensagens</h3>
                    <span className={styles.badge}>{messageCount}</span>
                </div>
            </header>

            <div className={styles.panelContent}>
                {messageCount === 0 ? (
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
                ) : (
                    <div className={styles.messageList}>
                        {rejectedMessages.map((item, index) => (
                            <div key={item.id || index} className={styles.messageCard}>
                                <div className={styles.messageHeader}>
                                    <div className={styles.messageIcon}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                            <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" 
                                                  stroke="#ef4444" 
                                                  strokeWidth="2" 
                                                  strokeLinecap="round" 
                                                  strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div className={styles.messageInfo}>
                                        <h5>Arrecadação Rejeitada</h5>
                                    </div>
                                </div>
                                <div className={styles.messageBody}>
                                    <p className={styles.messageText}>
                                        A arrecadação do grupo foi rejeitada pelo mentor. Por favor, consulte o seu mentor.
                                    </p>
                                    <div className={styles.rejectionBox}>
                                        <strong>Motivo da rejeição:</strong>
                                        <p>{item.jus_reject}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}