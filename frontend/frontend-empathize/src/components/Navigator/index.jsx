import styles from "./style.module.css";
import "./style.module.css";
import menuIcon from "../../assets/menu-hamburguer.svg";
import homeIcon from "../../assets/casa.svg";
import pranchetaIcon from "../../assets/prancheta.svg";
import logOut from "../../assets/exit.svg";
import { Link } from "react-router-dom";

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
                            <Link to="/home" className={styles.theLinks}>
                                <span className="icon"><img src={homeIcon} alt="" className={styles.icons} /></span>
                                <span className={styles.txtLink}>Home</span>
                            </Link>
                        </li>
                        <li className={styles.itemMenu}>
                            <Link to="/projects" className={styles.theLinks}>
                                <span className="icon"><img src={pranchetaIcon} alt="" className={styles.icons}/></span>
                                <span className={styles.txtLink}>Projetos</span>
                            </Link>
                        </li>
                        <li className={styles.itemMenu} id={styles.logOut}>
                            <Link className={styles.theLinks}>
                                <span className="icon"><img src={logOut} alt="" className={styles.icons}/></span>
                                <span className={styles.txtLink}>Sair</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}