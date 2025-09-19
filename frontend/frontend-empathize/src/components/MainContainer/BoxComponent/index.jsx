import styles from "./style.module.css";

export default function BoxComponent(props) {
    return (
        <>
            <div className="leftSide">
                <span className={styles.numbers}>{props.pontuation} </span>
                <p className={styles.title}>{props.title}</p>
            </div>
            <div className={styles.rigthSide}>
                <img src={props.icon} alt="" className={styles.icons}/>
            </div>
        </>
    );
}