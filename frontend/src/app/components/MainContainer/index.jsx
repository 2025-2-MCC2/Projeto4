import BoxComponent from "./BoxComponent";
import MessagePanel from "./MessagePanel";
import styles from "./style.module.css";
import iconRanking from "../../assets/estrelas-do-ranking.svg";
import iconFood from "../../assets/tigela-de-macarrao-com-pauzinhos.svg";
import iconMentor from "../../assets/pessoaMentor.png";
import iconPrancheta from "../../assets/prancheta.svg";

export default function MainContainer(props) {
    const informations = props.data || {};

    const pontuation = informations?.informationsGroup?.pontuation ?? '-';
    const mentor = informations?.informationsGroup?.mentor ?? '-';
    const groupName = informations?.informationsGroup?.groupName ?? 'Seu Grupo';

    return (
        <div className={styles.container}> 
            <div className={styles.mainContent}>
                <div className={styles.welcomeSection}>
                    <div className={styles.welcomeText}>
                        <h1>Olá, <span className={styles.highlight}>{groupName}</span>!</h1>
                        <p>Aqui está um resumo do progresso do grupo</p>
                    </div>
                </div>

                <div className={styles.cardsGrid}> 
                    <BoxComponent 
                        pontuation={pontuation} 
                        title="Pontuação" 
                        subtitle="Total de pontos"
                        icon={iconRanking}
                        color="purple"
                    />
                    <BoxComponent 
                        pontuation="3kg" 
                        title="Arrecadação" 
                        subtitle="Alimentos coletados"
                        icon={iconFood}
                        color="orange"
                    />
                    <BoxComponent 
                        pontuation={mentor} 
                        title="Mentor" 
                        subtitle="Seu orientador"
                        icon={iconMentor}
                        color="blue"
                    />     
                    <BoxComponent 
                        pontuation="3"
                        title="Projetos"
                        subtitle="Projetos criados"
                        icon={iconPrancheta}
                        color="red"
                    />
                </div>
            </div>

            <div className={styles.sidebar}>
                <MessagePanel />
            </div>
        </div>     
    );
}