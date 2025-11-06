'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navigator from "../../../components/Navigator/index.jsx";
import styles from "./projectDetail.module.css";
import layoutStyles from "../../dashboard.module.css";
import ProtectedRoute from "../../../components/ProtectedRoute.js";
import { getToken } from "../../../login/auth.js";

function calculatePontuation(food, quantity) {
    const pointsRice = 4;
    const pointsMilk = 37;
    const pointsBean = 5.5;
    const pointsOil = 7;
    const pointsSugar = 4;
    const pointsCornMeal = 1.25;
    const pointsNoodle = 1.25;

    switch(food) {
        case "ARROZ":
            return pointsRice * quantity
        case "FEIJÃO":
            return pointsBean * quantity
        case "LEITE EM PÓ":
            return pointsMilk * quantity
        case "MACARRÃO":
            return pointsNoodle * quantity
        case "ÓLEO":
            return pointsOil * quantity
        case "FUBÁ":
            return pointsCornMeal * quantity
        case "AÇÚCAR":
            return pointsSugar * quantity
        default:
            return null
    }
}

function ProjectDetailContent() {
    const params = useParams();
    const router = useRouter();
    const projectId = params.id;

    const [project, setProject] = useState(null);
    const [collections, setCollections] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = getToken();
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboardStudent`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    throw new Error('Erro ao carregar dados');
                }

                const result = await res.json();
                
                // Encontrar o projeto específico
                const foundProject = result?.informationsProjects?.find(
                    p => p.id === parseInt(projectId)
                );

                if (!foundProject) {
                    router.push('/dashboardStudent/projects');
                    return;
                }

                setProject(foundProject);
                setCollections(result?.informationsCollections || []);
            } catch (err) {
                console.error('Erro:', err);
                alert('Erro ao carregar projeto');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [projectId, router]);

    const handleCollectionCreated = (newCollection) => {
        setCollections(prev => [...prev, newCollection]);
    };

    const handleCollectionDeleted = (collectionId) => {
        setCollections(prev => prev.filter(c => c.id !== collectionId));
    };

    if (isLoading) {
        return (
            <div className={layoutStyles.dashboard}>
                <div className={layoutStyles.nav}>
                    <Navigator />
                </div>
                <div className={layoutStyles.mainContainer}>
                    <div className={styles.loadingState}>
                        <div className={styles.loadingSpinner}></div>
                        <p>Carregando projeto...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!project) {
        return null;
    }

    return (
        <div className={layoutStyles.dashboard}>
            <div className={layoutStyles.nav}>
                <Navigator />
            </div>

            <div className={layoutStyles.mainContainer}>
                <div className={layoutStyles.headerSection}>
                    <div className={layoutStyles.breadcrumb}>
                        <span 
                            className={styles.breadcrumbLink}
                            onClick={() => router.push('/dashboardStudent/projects')}
                        >
                            📋 Projetos
                        </span>
                        <span className={styles.breadcrumbSeparator}>/</span>
                        <span className={layoutStyles.breadcrumbText}>
                            {project.name_project || project.name}
                        </span>
                    </div>
                    <div className={layoutStyles.pageTitle}>
                        <h1>{project.name_project || project.name}</h1>
                        <p>{project.description_project || project.description || 'Sem descrição'}</p>
                    </div>
                </div>

                <div className={styles.projectContent}>
                    <div className={styles.contentHeader}>
                        <div className={styles.statsCard}>
                            <div className={styles.statsIcon}>📦</div>
                            <div className={styles.statsInfo}>
                                <span className={styles.statsNumber}>{collections.length}</span>
                                <span className={styles.statsLabel}>Arrecadações</span>
                            </div>
                        </div>

                        <button 
                            className={styles.btnCreateCollection}
                            onClick={() => setIsModalOpen(true)}
                        >
                            <span className={styles.btnIcon}>+</span>
                            Criar Arrecadação
                        </button>
                    </div>

                    <div className={styles.collectionsGrid}>
                        {collections.length === 0 ? (
                            <div className={styles.emptyState}>
                                <div className={styles.emptyIcon}>📦</div>
                                <h3>Nenhuma arrecadação ainda</h3>
                                <p>Comece registrando a primeira arrecadação do projeto!</p>
                            </div>
                        ) : (
                            collections.map((collection) => (
                                <CollectionCard
                                    key={collection.id}
                                    collection={collection}
                                    onDelete={handleCollectionDeleted}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <CreateCollectionModal
                    projectId={projectId}
                    onClose={() => setIsModalOpen(false)}
                    onCollectionCreated={handleCollectionCreated}
                />
            )}
        </div>
    );
}

function CollectionCard({ collection, onDelete }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm('Tem certeza que deseja excluir esta arrecadação?')) return;

        setIsDeleting(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/deleteCollection/${collection.id}`, {
                method: 'DELETE'
            });

            if (!res.ok) {
                throw new Error('Erro ao deletar arrecadação');
            }

            onDelete(collection.id);
        } catch (err) {
            console.error('Erro ao deletar:', err);
            alert('Erro ao deletar arrecadação');
        } finally {
            setIsDeleting(false);
        }
    };

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

    return (
        <div className={styles.collectionCard}>
            <div className={styles.cardHeader}>
                <h3 className={styles.collectionTitle}>{collection.food}</h3>
                <button
                    className={styles.deleteBtn}
                    onClick={handleDelete}
                    disabled={isDeleting}
                    title="Excluir arrecadação"
                >
                    {isDeleting ? '⏳' : '🗑️'}
                </button>
            </div>

            <div className={styles.collectionInfo}>
                <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Quantidade:</span>
                    <span className={styles.infoValue}>{collection.quantity_kg} kg</span>
                </div>
                <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Comprovante:</span>
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

            <div className={styles.cardFooter}>
                <span className={`${styles.statusBadge} ${getStatusColor(collection.status)}`}>
                    {collection.status || 'Pendente'}
                </span>
            </div>

            {collection.jus_reject && (
                <div className={styles.rejectionReason}>
                    <strong>Motivo da rejeição:</strong> {collection.jus_reject}
                </div>
            )}
        </div>
    );
}

function CreateCollectionModal({ projectId, onClose, onCollectionCreated }) {
    const [food, setFood] = useState('');
    const [quantityKg, setQuantityKg] = useState('');
    const [proof, setProof] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!food.trim() || !quantityKg || !proof.trim()) {
            setError('Todos os campos são obrigatórios');
            return;
        }

        if (parseFloat(quantityKg) <= 0) {
            setError('A quantidade deve ser maior que zero');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const token = getToken();
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboardStudent`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const resultToken = await res.json();

            const resCreateCollection = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/createCollection`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    food: food.trim(),
                    quantityKG: parseFloat(quantityKg),
                    proof: proof.trim(),
                    status: 'Pendente',
                    idGroup: resultToken?.informationsGroup.groupId
                })
            });

            const resPontuation = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/addPontuation`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "groupName": resultToken?.informationsGroup?.groupName,
                    "pontuation": calculatePontuation(food, quantityKg)
                })
            })

            if (!resCreateCollection.ok) {
                throw new Error('Erro ao criar arrecadação');
            }

            const result = await resCreateCollection.json();

            onCollectionCreated({
                id: result.id || Date.now(),
                food: food.trim(),
                quantity_kg: parseFloat(quantityKg),
                proof: proof.trim(),
                status: 'Pendente'
            });

            setFood('');
            setQuantityKg('');
            setProof('');
            onClose();
        } catch (err) {
            console.error('Erro:', err);
            setError('Erro ao criar arrecadação. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeModal} onClick={onClose}>×</button>

                <h2 className={styles.modalTitle}>Criar Nova Arrecadação</h2>

                <form className={styles.modalForm} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label>
                            Alimento <span className={styles.required}>*</span>
                        </label>
                        <select
                            value={food}
                            onChange={(e) => setFood(e.target.value)}
                            disabled={isSubmitting}
                            required
                        >
                            <option value="" disabled>Selecione um alimento</option>
                            <option value="ARROZ">Arroz</option>
                            <option value="FEIJÃO">Feijão</option>
                            <option value="ÓLEO">Óleo de Soja</option>
                            <option value="AÇÚCAR">Açúcar</option>
                            <option value="FUBÁ">Fubá</option>
                            <option value="LEITE EM PÓ">Leite em Pó</option>
                            <option value="MACARRÃO">Macarrão</option>
                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>
                            Quantidade (kg) <span className={styles.required}>*</span>
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            min="0.01"
                            value={quantityKg}
                            onChange={(e) => setQuantityKg(e.target.value)}
                            placeholder="Ex: 5.5"
                            disabled={isSubmitting}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>
                            Comprovante (URL) <span className={styles.required}>*</span>
                        </label>
                        <input
                            type="url"
                            value={proof}
                            onChange={(e) => setProof(e.target.value)}
                            placeholder="https://exemplo.com/comprovante.jpg"
                            disabled={isSubmitting}
                            required
                        />
                    </div>

                    {error && <p className={styles.error}>{error}</p>}

                    <div className={styles.modalActions}>
                        <button
                            type="button"
                            onClick={onClose}
                            className={styles.cancelBtn}
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className={styles.saveBtn}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Criando...' : 'Criar Arrecadação'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function ProjectDetail() {
    return (
        <ProtectedRoute role="student">
            <ProjectDetailContent />
        </ProtectedRoute>
    );
}