import BoxComponent from "./BoxComponent";
import styles from "./style.module.css";
import iconRanking from "../../assets/estrelas-do-ranking.svg";
import iconFood from "../../assets/tigela-de-macarrao-com-pauzinhos.svg";
import iconGoals from "../../assets/seta-de-alvo.svg";

export default function MainContainer() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.box}>
                    <BoxComponent pontuation="0" title="Pontuação" icon={iconRanking}/>
                </div>
                <div className={styles.box}>
                    <BoxComponent pontuation="3kg" title="Arrecadação" icon={iconFood}/>
                </div>
                <div className={styles.box}>
                    <BoxComponent pontuation="2" title="Metas atingidas" icon={iconGoals}/>    
                </div>    
            </div>  
        </>
    );
}