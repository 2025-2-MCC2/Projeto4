import BoxComponent from "../MainContainer/BoxComponent/index.jsx";
import styles from "./MainAdmin.module.css";
import iconRanking from "../../assets/estrelas-do-ranking.svg";
import iconFood from "../../assets/tigela-de-macarrao-com-pauzinhos.svg";
import iconGoals from "../../assets/seta-de-alvo.svg";

export default function MainContainerAdmin({ data }) {
  const informations = data || {};

  const totalKg = informations.totalKg
    ? `${informations.totalKg.toFixed(1)} kg`
    : "0 kg";

  const totalGroups =
    typeof informations.totalGroups === "number"
      ? informations.totalGroups
      : 0;

  const remainingDays =
    informations.daysRemaining && informations.daysRemaining !== "-"
      ? `${informations.daysRemaining} dias`
      : "0 dias";

  const topGroups = informations.topGroups || [];
  const nameAdm = informations?.informationsAdm?.admin?.[0]?.name_adm || "Administrador";

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.welcomeSection}>
          <div className={styles.welcomeText}>
            <h1>
              Olá, <span className={styles.highlight}>{nameAdm}</span>! 👋
            </h1>
            <p>Visão geral do progresso atual da edição.</p>
          </div>
        </div>

        <div className={styles.cardsGrid}>
          <BoxComponent
            pontuation={totalKg}
            title="Arrecadação Total"
            subtitle="Soma de todas as doações aprovadas"
            icon={iconFood}
            color="orange"
          />

          <BoxComponent
            pontuation={totalGroups}
            title="Grupos Cadastrados"
            subtitle="Total de grupos ativos no sistema"
            icon={iconGoals}
            color="blue"
          />

          <BoxComponent
            pontuation={remainingDays}
            title="Dias Restantes"
            subtitle="Até o fim da edição atual"
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
            {topGroups.length === 0 ? (
              <li className={styles.emptyRanking}>Nenhum grupo com arrecadação aprovada ainda.</li>
            ) : (
              topGroups.map((item, index) => (
                <li key={index} className={styles.rankingItem}>
                  <span className={styles.rankingPosition}>{index + 1}º</span>
                  <span className={styles.rankingName}>
                    {item.group_name || "Sem nome"}
                  </span>
                  <span className={styles.rankingValue}>
                    {item.total_kg ? `${item.total_kg.toFixed(1)} kg` : "0 kg"}
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
