import styles from "./style.module.css";

export default function BoxComponent(props) {
    return (
        <div className={styles.boxContent}>
            
            <div className={styles.textAndTitleWrapper}> 
                
                <span className={styles.numbers}>{props.pontuation}</span>
                
                <p className={styles.title}>{props.title}</p>
                
            </div>
            
            <div className={styles.iconWrapper}> 
                <img src={props.icon} alt={props.title} className={styles.icons}/>
            </div>
            
        </div>
    );
}