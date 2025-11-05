import BoxComponent from "../MainContainer/BoxComponent/index.jsx";
import ValidatePanel from "../ValidatePanel/Validate.jsx";
import styles from "./MainMentor.module.css";
import iconRanking from "../../assets/estrelas-do-ranking.svg";
import iconFood from "../../assets/tigela-de-macarrao-com-pauzinhos.svg";
import iconGoals from "../../assets/seta-de-alvo.svg";

export default function MainContainerMentor(props) {
    const informations = props.data || {};

    const pontuation = informations?.informationsGroup?.pontuation ?? '-';
    const totalCollections = informations?.informationsCollections?.length ?? 0;
    const totalProjects = informations?.informationsProjects?.length ?? 0;
    const groupName = informations?.informationsGroup?.groupName ?? 'Grupo';
    const mentorName = informations?.informationsMentor?.name_mentor;
    
    // Calcular total de kg arrecadados
    const totalKg = informations?.informationsCollections?.reduce((acc, collection) => {
        return acc + (parseFloat(collection.quantity_kg) || 0);
    }, 0) || 0;

    // Verificar se há arrecadações pendentes
    const pendingCollections = informations?.informationsCollections?.filter(
        c => c.status?.toLowerCase() === 'pendente'
    ) || [];

    return (
        <div className={styles.container}> 
            <div className={styles.mainContent}> 
                <div className={styles.welcomeSection}>
                    <div className={styles.welcomeText}>
                        <h1>Olá, <span className={styles.highlight}>{mentorName}</span>! 👋</h1>
                        <p>Acompanhe o desempenho do grupo <strong>{groupName}</strong></p>
                    </div>
                </div>

                <div className={styles.cardsGrid}> 
                    <BoxComponent 
                        pontuation={`${totalKg.toFixed(1)}kg`}
                        title="Arrecadação" 
                        subtitle="Total arrecadado"
                        icon={iconFood}
                        color="orange"
                    />
                    <BoxComponent 
                        pontuation={totalProjects} 
                        title="Projetos" 
                        subtitle="Projetos criados"
                        icon={iconGoals}
                        color="blue"
                    />
                    <BoxComponent 
                        pontuation={pontuation} 
                        title="Pontuação" 
                        subtitle="Pontos do grupo"
                        icon={iconRanking}
                        color="purple"
                    />     
                </div>
            </div>

            <div className={styles.sidebar}>
                <ValidatePanel 
                    pendingCount={pendingCollections.length}
                    collections={pendingCollections}
                />
            </div>
        </div>     
    );
}