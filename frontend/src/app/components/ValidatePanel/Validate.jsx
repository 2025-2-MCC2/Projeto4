import { useRouter } from 'next/navigation';
import styles from "./Validate.module.css";

export default function ValidatePanel({ pendingCount, collections }) {
    const router = useRouter();

    const handleNavigateToValidate = () => {
        router.push('/dashboardMentor/validate');
    };

    return (
        <div className={styles.panelContainer}> 
            <header className={styles.panelHeader}>
                <div className={styles.headerContent}>
                    <h3>✅ Validações</h3>
                    <span className={styles.badge}>{pendingCount}</span>
                </div>
            </header>

            <div className={styles.panelContent}>
                {pendingCount === 0 ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                                      stroke="#10b981" 
                                      strokeWidth="2" 
                                      strokeLinecap="round" 
                                      strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <h4>Tudo em dia!</h4>
                        <p>Não há arrecadações pendentes para validar no momento.</p>
                    </div>
                ) : (
                    <div className={styles.pendingState}>
                        <div className={styles.alertIcon}>
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                                      stroke="#f59e0b" 
                                      strokeWidth="2" 
                                      strokeLinecap="round" 
                                      strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <h4>Atenção necessária</h4>
                        <p className={styles.pendingText}>
                            Você tem <strong>{pendingCount}</strong> {pendingCount === 1 ? 'arrecadação' : 'arrecadações'} aguardando validação.
                        </p>
                        
                        <div className={styles.pendingList}>
                            {collections.slice(0, 3).map((collection) => (
                                <div key={collection.id} className={styles.pendingItem}>
                                    <span className={styles.foodEmoji}>📦</span>
                                    <div className={styles.itemInfo}>
                                        <span className={styles.itemFood}>{collection.food}</span>
                                        <span className={styles.itemWeight}>{collection.quantity_kg} kg</span>
                                    </div>
                                </div>
                            ))}
                            {collections.length > 3 && (
                                <p className={styles.moreItems}>
                                    +{collections.length - 3} {collections.length - 3 === 1 ? 'mais' : 'mais'}
                                </p>
                            )}
                        </div>

                        <button 
                            className={styles.validateButton}
                            onClick={handleNavigateToValidate}
                        >
                            Ir para Validações
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}