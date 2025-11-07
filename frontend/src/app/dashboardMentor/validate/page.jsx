'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavigatorMentor from "../../components/NavigatorMentor/NavMentor.jsx";
import styles from "./style.module.css";
import layoutStyles from "../page.module.css";
import ProtectedRoute from "../../components/ProtectedRoute.js";
import { getToken } from "../../login/auth.js";

function ValidateContent() {
    const [collections, setCollections] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all');
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = getToken();
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboardMentor`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    throw new Error('Erro ao carregar dados');
                }

                const result = await res.json();
                setCollections(result?.informationsCollections || []);
                console.log("Arrecadações:", result?.informationsCollections);
            } catch (err) {
                console.error('Erro:', err);
                alert('Erro ao carregar arrecadações');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCollectionClick = (collection) => {
        setSelectedCollection(collection);
        setIsModalOpen(true);
    };

    const handleCollectionEvaluated = (collectionId, newStatus) => {
        setCollections(prev => prev.map(c => 
            c.id === collectionId ? { ...c, status: newStatus } : c
        ));
        setIsModalOpen(false);
        setSelectedCollection(null);
    };

    const getFilteredCollections = () => {
        if (filterStatus === 'all') return collections;
        return collections.filter(c => c.status?.toLowerCase() === filterStatus);
    };

    const filteredCollections = getFilteredCollections();
    const pendingCount = collections.filter(c => c.status?.toLowerCase() === 'pendente').length;
    const approvedCount = collections.filter(c => c.status?.toLowerCase() === 'aprovado').length;
    const rejectedCount = collections.filter(c => c.status?.toLowerCase() === 'rejeitado').length;

    return (
        <div className={layoutStyles.dashboard}>
            <div className={layoutStyles.nav}>
                <NavigatorMentor />
            </div>

            <div className={layoutStyles.mainContainer}>
                <div className={layoutStyles.headerSection}>
                    <div className={layoutStyles.breadcrumb}>
                        <span 
                            className={styles.breadcrumbLink}
                            onClick={() => router.push('/dashboardMentor')}
                        >
                            🏠 Dashboard
                        </span>
                        <span className={styles.breadcrumbSeparator}>/</span>
                        <span className={layoutStyles.breadcrumbText}>Validações</span>
                    </div>
                    <div className={layoutStyles.pageTitle}>
                        <h1>Validar Arrecadações</h1>
                        <p>Aprove ou rejeite as arrecadações do seu grupo</p>
                    </div>
                </div>

                <div className={styles.validateContent}>
                    {isLoading ? (
                        <div className={styles.loadingState}>
                            <div className={styles.loadingSpinner}></div>
                            <p>Carregando arrecadações...</p>
                        </div>
                    ) : (
                        <>
                            <div className={styles.statsSection}>
                                <div className={styles.statCard}>
                                    <div className={styles.statIcon}>⏳</div>
                                    <div className={styles.statInfo}>
                                        <span className={styles.statNumber}>{pendingCount}</span>
                                        <span className={styles.statLabel}>Pendentes</span>
                                    </div>
                                </div>
                                <div className={styles.statCard}>
                                    <div className={styles.statIcon}>✅</div>
                                    <div className={styles.statInfo}>
                                        <span className={styles.statNumber}>{approvedCount}</span>
                                        <span className={styles.statLabel}>Aprovadas</span>
                                    </div>
                                </div>
                                <div className={styles.statCard}>
                                    <div className={styles.statIcon}>❌</div>
                                    <div className={styles.statInfo}>
                                        <span className={styles.statNumber}>{rejectedCount}</span>
                                        <span className={styles.statLabel}>Rejeitadas</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.filterSection}>
                                <button
                                    className={`${styles.filterBtn} ${filterStatus === 'all' ? styles.active : ''}`}
                                    onClick={() => setFilterStatus('all')}
                                >
                                    Todas ({collections.length})
                                </button>
                                <button
                                    className={`${styles.filterBtn} ${filterStatus === 'pendente' ? styles.active : ''}`}
                                    onClick={() => setFilterStatus('pendente')}
                                >
                                    Pendentes ({pendingCount})
                                </button>
                                <button
                                    className={`${styles.filterBtn} ${filterStatus === 'aprovado' ? styles.active : ''}`}
                                    onClick={() => setFilterStatus('aprovado')}
                                >
                                    Aprovadas ({approvedCount})
                                </button>
                                <button
                                    className={`${styles.filterBtn} ${filterStatus === 'reprovado' ? styles.active : ''}`}
                                    onClick={() => setFilterStatus('reprovado')}
                                >
                                    Rejeitadas ({rejectedCount})
                                </button>
                            </div>

                            <div className={styles.collectionsGrid}>
                                {filteredCollections.length === 0 ? (
                                    <div className={styles.emptyState}>
                                        <div className={styles.emptyIcon}>📦</div>
                                        <h3>Nenhuma arrecadação encontrada</h3>
                                        <p>
                                            {filterStatus === 'all' 
                                                ? 'Não há arrecadações para exibir.'
                                                : `Não há arrecadações com status "${filterStatus}".`
                                            }
                                        </p>
                                    </div>
                                ) : (
                                    filteredCollections.map((collection) => (
                                        <CollectionCard
                                            key={collection.id}
                                            collection={collection}
                                            onClick={() => handleCollectionClick(collection)}
                                        />
                                    ))
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {isModalOpen && selectedCollection && (
                <EvaluateModal
                    collection={selectedCollection}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedCollection(null);
                    }}
                    onEvaluated={handleCollectionEvaluated}
                />
            )}
        </div>
    );
}

function CollectionCard({ collection, onClick }) {
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'aprovado':
                return styles.statusApproved;
            case 'pendente':
                return styles.statusPending;
            case 'rejeitado':
                return styles.statusRejected;
            default:
                return styles.statusPending;
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'aprovado':
                return '✅';
            case 'pendente':
                return '⏳';
            case 'rejeitado':
                return '❌';
            default:
                return '⏳';
        }
    };

    const isPending = collection.status?.toLowerCase() === 'pendente';

    return (
        <div 
            className={`${styles.collectionCard} ${isPending ? styles.clickable : ''}`}
            onClick={isPending ? onClick : undefined}
        >
            <div className={styles.cardHeader}>
                <h3 className={styles.collectionTitle}>{collection.food}</h3>
                <span className={styles.statusIcon}>{getStatusIcon(collection.status)}</span>
            </div>

            <div className={styles.collectionInfo}>
                <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Quantidade:</span>
                    <span className={styles.infoValue}>{collection.quantity_kg} kg</span>
                </div>
                <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Status:</span>
                    <span className={`${styles.statusBadge} ${getStatusColor(collection.status)}`}>
                        {collection.status || 'Pendente'}
                    </span>
                </div>
            </div>

            {collection.jus_reject && (
                <div className={styles.rejectionReason}>
                    <strong>Motivo:</strong> {collection.jus_reject}
                </div>
            )}

            {isPending && (
                <div className={styles.cardFooter}>
                    <span className={styles.evaluateText}>Clique para avaliar →</span>
                </div>
            )}
        </div>
    );
}

function EvaluateModal({ collection, onClose, onEvaluated }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [justification, setJustification] = useState('');
    const [error, setError] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);

    const handleEvaluate = async (option) => {
        if (option === 1 && !justification.trim()) {
            setError('Por favor, forneça uma justificativa para rejeição');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/evaluateCollection/${collection.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    option: option,
                    justify: option === 1 ? justification.trim() : null
                })
            });

            if (!res.ok) {
                throw new Error('Erro ao avaliar arrecadação');
            }

            const newStatus = option === 0 ? 'Aprovado' : 'Rejeitado';
            onEvaluated(collection.id, newStatus);
            alert(`Arrecadação ${newStatus.toLowerCase()} com sucesso!`);
        } catch (err) {
            console.error('Erro:', err);
            setError('Erro ao avaliar arrecadação. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeModal} onClick={onClose}>×</button>

                <h2 className={styles.modalTitle}>Avaliar Arrecadação</h2>

                <div className={styles.collectionDetails}>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Alimento:</span>
                        <span className={styles.detailValue}>{collection.food}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Quantidade:</span>
                        <span className={styles.detailValue}>{collection.quantity_kg} kg</span>
                    </div>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Comprovante:</span>
                        <a 
                            href={collection.proof} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={styles.proofLink}
                        >
                            Ver comprovante 🔗
                        </a>
                    </div>
                </div>

                <div className={styles.evaluationSection}>
                    <h3>Como você avalia esta arrecadação?</h3>
                    
                    <div className={styles.optionsButtons}>
                        <button
                            className={`${styles.optionBtn} ${styles.approveBtn}`}
                            onClick={() => setSelectedOption(0)}
                            disabled={isSubmitting}
                        >
                            <span className={styles.optionIcon}>✅</span>
                            <span>Aprovar</span>
                        </button>
                        <button
                            className={`${styles.optionBtn} ${styles.rejectBtn}`}
                            onClick={() => setSelectedOption(1)}
                            disabled={isSubmitting}
                        >
                            <span className={styles.optionIcon}>❌</span>
                            <span>Rejeitar</span>
                        </button>
                    </div>

                    {selectedOption === 1 && (
                        <div className={styles.justificationSection}>
                            <label htmlFor="justification">
                                Justificativa <span className={styles.required}>*</span>
                            </label>
                            <textarea
                                id="justification"
                                value={justification}
                                onChange={(e) => setJustification(e.target.value)}
                                placeholder="Explique o motivo da rejeição..."
                                rows={4}
                                disabled={isSubmitting}
                                required
                            />
                        </div>
                    )}

                    {error && <p className={styles.error}>{error}</p>}

                    {selectedOption !== null && (
                        <button
                            className={styles.confirmBtn}
                            onClick={() => handleEvaluate(selectedOption)}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className={styles.loader}></span>
                                    Avaliando...
                                </>
                            ) : (
                                `Confirmar ${selectedOption === 0 ? 'Aprovação' : 'Rejeição'}`
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function Validate() {
    return (
        <ProtectedRoute role="mentor">
            <ValidateContent />
        </ProtectedRoute>
    );
}