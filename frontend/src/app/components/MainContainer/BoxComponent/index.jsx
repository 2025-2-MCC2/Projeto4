import styles from "./style.module.css";
import Image from "next/image";

export default function BoxComponent(props) {
    const colorClass = props.color || 'green';
    
    return (
        <div className={`${styles.boxContent} ${styles[colorClass]}`}>
            <div className={styles.cardInner}>
                <div className={styles.iconWrapper}> 
                    <div className={styles.iconCircle}>
                        <Image src={props.icon} alt={props.title} className={styles.icons}/>
                    </div>
                </div>
                
                <div className={styles.textWrapper}> 
                    <span className={styles.subtitle}>{props.subtitle}</span>
                    <h3 className={styles.title}>{props.title}</h3>
                    <span className={styles.numbers}>{props.pontuation}</span>
                </div>
            </div>

            <div className={styles.decorativeCircle}></div>
        </div>
    );
}