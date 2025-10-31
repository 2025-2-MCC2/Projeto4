'use client'

import { useState, useEffect } from "react";
import CreateProject from "../../components/CreateProject/CreateProject.jsx";
import Navigator from "../../components/Navigator/index.jsx";
import styles from "./projects.module.css";
import layoutStyles from "../dashboard.module.css";
import ProtectedRoute from "../../components/ProtectedRoute.js";
import { getToken } from "../../login/auth.js";
import Image from "next/image";
import iconPrancheta from "../../assets/prancheta.svg";

function ProjectsModel() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [projects, setProjects] = useState([]);
        
    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const token = getToken();
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboardStudent`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
        
                if (!res.ok) {
                    throw new Error('Erro ao carregar o dashboard')
                }
        
                const result = await res.json();
                setData(result);
                setProjects(result?.informationsProjects || []);
                console.log("Dados do grupo:", result);
            } catch(err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }
        
        fetchDashboard();
    }, []);

    const handleProjectCreated = (newProject) => {
        setProjects(prev => [...prev, newProject]);
    };

    const handleProjectDeleted = (projectId) => {
        setProjects(prev => prev.filter(p => p.id !== projectId));
    };

    const handleProjectUpdated = (updatedProject) => {
        setProjects(prev => prev.map(p => 
            p.id === updatedProject.id ? updatedProject : p
        ));
    };

    const projectsCount = projects.length;
    const groupName = data?.informationsGroup?.groupName || 'Seu Grupo';

    return (
        <div className={layoutStyles.dashboard}>
            <div className={layoutStyles.nav}>
                <Navigator />
            </div>
            
            <div className={layoutStyles.mainContainer}>
                <div className={layoutStyles.headerSection}>
                    <div className={layoutStyles.breadcrumb}>
                        <span className={layoutStyles.breadcrumbIcon}>
                            <Image src={iconPrancheta} alt="Icon projects" className={styles.iconPrancheta}/>
                        </span>
                        <span className={layoutStyles.breadcrumbText}>Projetos</span>
                    </div>
                    <div className={layoutStyles.pageTitle}>
                        <h1>Projetos do Grupo</h1>
                        <p>Gerencie os projetos de <strong>{groupName}</strong></p>
                    </div>
                </div>

                <div className={styles.projectsContent}>
                    {isLoading ? (
                        <div className={styles.loadingState}>
                            <div className={styles.loadingSpinner}></div>
                            <p>Carregando projetos...</p>
                        </div>
                    ) : (
                        <>
                            <div className={styles.projectsHeader}>
                                <div className={styles.statsCard}>
                                    <div className={styles.statsIcon}>📊</div>
                                    <div className={styles.statsInfo}>
                                        <span className={styles.statsNumber}>{projectsCount}</span>
                                        <span className={styles.statsLabel}>Projetos Ativos</span>
                                    </div>
                                </div>
                                
                                <CreateProject 
                                    data={data} 
                                    onProjectCreated={handleProjectCreated}
                                />
                            </div>

                            <div className={styles.projectsGrid}>
                                {projects.length === 0 ? (
                                    <div className={styles.emptyState}>
                                        <div className={styles.emptyIcon}>📋</div>
                                        <h3>Nenhum projeto ainda</h3>
                                        <p>Comece criando seu primeiro projeto para o grupo!</p>
                                    </div>
                                ) : (
                                    projects.map((project, index) => (
                                        <ProjectCard
                                            key={project.id || index}
                                            project={project}
                                            onDelete={handleProjectDeleted}
                                            onUpdate={handleProjectUpdated}
                                        />
                                    ))
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

function ProjectCard({ project, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm('Tem certeza que deseja excluir este projeto?')) return;
        
        setIsDeleting(true);
        try {
            const res = await fetch(`http://localhost:3001/deleteProject/${project.id}`, {
                method: 'DELETE'
            });

            if (!res.ok) {
                throw new Error('Erro ao deletar projeto');
            }

            onDelete(project.id);
        } catch (err) {
            console.error('Erro ao deletar:', err);
            alert('Erro ao deletar projeto');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className={styles.projectCard}>
            <div className={styles.cardHeader}>
                <h3 className={styles.projectTitle}>{project.name_project || project.name}</h3>
                <div className={styles.cardActions}>
                    <button
                        className={styles.editBtn}
                        onClick={() => setIsEditing(true)}
                        title="Editar projeto"
                    >
                        ✏️
                    </button>
                    <button
                        className={styles.deleteBtn}
                        onClick={handleDelete}
                        disabled={isDeleting}
                        title="Excluir projeto"
                    >
                        {isDeleting ? '⏳' : '🗑️'}
                    </button>
                </div>
            </div>
            
            <p className={styles.projectDescription}>
                {project.description_project || project.description || 'Sem descrição'}
            </p>

            <div className={styles.cardFooter}>
                <span className={styles.projectBadge}>Em andamento</span>
            </div>

            {isEditing && (
                <EditProjectModal
                    project={project}
                    onClose={() => setIsEditing(false)}
                    onUpdate={onUpdate}
                />
            )}
        </div>
    );
}

function EditProjectModal({ project, onClose, onUpdate }) {
    const [name, setName] = useState(project.name_project || project.name || '');
    const [description, setDescription] = useState(project.description_project || project.description || '');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!name.trim()) {
            alert('Nome do projeto é obrigatório');
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch(`http://localhost:3001/updateProject/${project.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name.trim(),
                    description: description.trim()
                })
            });

            if (!res.ok) {
                throw new Error('Erro ao atualizar projeto');
            }

            onUpdate({
                ...project,
                name_project: name.trim(),
                description_project: description.trim()
            });
            
            onClose();
        } catch (err) {
            console.error('Erro ao atualizar:', err);
            alert('Erro ao atualizar projeto');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeModal} onClick={onClose}>×</button>
                
                <h2 className={styles.modalTitle}>Editar Projeto</h2>
                
                <form className={styles.modalForm} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label>Nome do projeto <span className={styles.required}>*</span></label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nome do projeto"
                            disabled={isSubmitting}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Descrição</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Descrição do projeto"
                            rows={4}
                            disabled={isSubmitting}
                        />
                    </div>

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
                            {isSubmitting ? 'Salvando...' : 'Salvar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function Projects() {
    return (
        <ProtectedRoute>
            <ProjectsModel />
        </ProtectedRoute>
    );
}