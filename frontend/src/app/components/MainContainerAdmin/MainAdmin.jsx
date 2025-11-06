import BoxComponent from "../MainContainer/BoxComponent/index.jsx";
import styles from "./MainAdmin.module.css";
import iconRanking from "../../assets/estrelas-do-ranking.svg";
import iconFood from "../../assets/tigela-de-macarrao-com-pauzinhos.svg";
import iconGoals from "../../assets/seta-de-alvo.svg";

export default function MainContainerAdmin({ data }) {
  const informations = data || {};

  const totalKg =
    informations?.collections?.reduce(
      (acc, collection) => acc + (parseFloat(collection.quantity_kg) || 0),
      0
    ) || 0;

  const totalProjects = informations?.projects?.length ?? 0;
  const totalPontuation = informations?.pontuation ?? "-";

  const rankingMock = [
    { name: "Grupo Alpha", score: 1280 },
    { name: "Grupo Beta", score: 1195 },
    { name: "Grupo Delta", score: 1110 },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.welcomeSection}>
          <div className={styles.welcomeText}>
            <h1>
              Olá, <span className={styles.highlight}>Administrador(a)</span>! 👋
            </h1>
            <p>Visão geral global do progresso atual do projeto.</p>
          </div>
        </div>

        <div className={styles.cardsGrid}>
          <BoxComponent
            pontuation={`${totalKg.toFixed(1)}kg`}
            title="Arrecadação Total"
            subtitle="Soma de todas as doações"
            icon={iconFood}
            color="orange"
          />
          <BoxComponent
            pontuation={totalProjects}
            title="Projetos"
            subtitle="Projetos cadastrados"
            icon={iconGoals}
            color="blue"
          />
          <BoxComponent
            pontuation={totalPontuation}
            title="Pontuação"
            subtitle="Média geral dos grupos"
            icon={iconRanking}
            color="purple"
          />
        </div>
      </div>

      <div className={styles.sidebar}>
        <div className={styles.rankingCard}>
          <div className={styles.rankingHeader}>
            <h3>🏆 Top 3 Grupos</h3>
          </div>
          <ul className={styles.rankingList}>
            {rankingMock.map((item, index) => (
              <li key={index} className={styles.rankingItem}>
                <span className={styles.rankingPosition}>{index + 1}º</span>
                <span className={styles.rankingName}>{item.name}</span>
                <span className={styles.rankingValue}>{item.score} pts</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
