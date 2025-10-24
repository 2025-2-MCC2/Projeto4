import styles from "./style.module.css";
import menuIcon from "../../assets/menu-hamburguer.svg";
import homeIcon from "../../assets/casa.svg";
import pranchetaIcon from "../../assets/prancheta.svg";
import logOut from "../../assets/exit.svg";
import Integrantes from "../../assets/users-alt.svg";
import Link from "next/link";
import Image from "next/image";

export default function Navigator() {
    return (
        <>
            <div >
                <nav className={styles.menuLateral}>
                    <div className={styles.btnExpandir}>
                        <Image src={menuIcon} alt="Menu icon" className={styles.icons} />
                    </div>

                    <ul>
                        <li className={styles.itemMenu}>
                            <Link href={"/dashboardStudent"} className={styles.theLinks}>
                                <span className="icon"><Image src={homeIcon} alt="Home icon" className={styles.icons} /></span>
                                <span className={styles.txtLink}>Home</span>
                            </Link>
                        </li>
                        <li className={styles.itemMenu}>
                            <Link href={"/dashboardStudent/projects"} className={styles.theLinks}>
                                <span className="icon"><Image src={pranchetaIcon} alt="Prancheta icon" className={styles.icons}/></span>
                                <span className={styles.txtLink}>Projetos</span>
                            </Link>
                        </li>

                        <li className={styles.itemMenu}>
                            <Link href={"/dashboardStudent/team"} className={styles.theLinks}>
                                <span className="icon"><Image src={Integrantes} alt="" className={styles.icons}/></span>
                                <span className={styles.txtLink}>Integrantes</span>
                            </Link>
                        </li>
                        <li className={styles.itemMenu} id={styles.logOut}>
                            <Link href={"/"} className={styles.theLinks}>
                                <span className="icon"><Image src={logOut} alt="" className={styles.icons}/></span>
                                <span className={styles.txtLink}>Sair</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}