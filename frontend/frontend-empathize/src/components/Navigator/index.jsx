import styles from "./style.module.css";
import "./style.module.css";
import menuIcon from "../../assets/menu-hamburguer.svg";
import homeIcon from "../../assets/casa.svg";
import pranchetaIcon from "../../assets/prancheta.svg";

export default function Navigator() {
    return (
        <>
            <div >
                <nav className={styles.menuLateral}>
                    <div className={styles.btnExpandir}>
                        <img src={menuIcon} alt="" className={styles.icons} />
                    </div>

                    <ul>
                        <li className={styles.itemMenu}>
                            <a href="#">
                                <span className="icon"><img src={homeIcon} alt="" className={styles.icons} /></span>
                                <span className={styles.txtLink}>Home</span>
                            </a>
                        </li>
                        <li className={styles.itemMenu}>
                            <a href="#">
                                <span className="icon"><img src={pranchetaIcon} alt="" className={styles.icons}/></span>
                                <span className={styles.txtLink}>Projetos</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}