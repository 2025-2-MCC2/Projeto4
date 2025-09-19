import styles from "./style.module.css";
import menuIcon from "../../assets/menu-hamburguer.svg";
import homeIcon from "../../assets/casa.svg";
import pranchetaIcon from "../../assets/prancheta.svg";

export default function Navigator() {
    return (
        <>
            <div className={styles.nav}>
                <aside>
                    <nav>
                        <img src={menuIcon} alt="" className={styles.icons} />
                        <img src={homeIcon} alt="" className={styles.icons} />
                        <img src={pranchetaIcon} alt="" className={styles.icons}/>
                    </nav>
                </aside>
            </div>
        </>
    );
}