import styles from "./style.module.css";

export default function Ranking() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.box}>Caixa 1</div>
                <div className={styles.box}>Caixa 2</div>
                <div className={styles.box}>Caixa 3</div>    
            </div>  
        </>
    );
}