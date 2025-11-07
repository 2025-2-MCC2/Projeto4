"use client";

import { useState } from "react";
import styles from "../NavigatorAdmin/Nav.module.css";
import menuIcon from "../../assets/menu-hamburguer.svg";
import rankIcon from "../../assets/estrelas-do-ranking.svg";
import IntegrantesIcon from "../../assets/users-alt.svg";
import adminIcon from "../../assets/do-utilizador.png";
import logOut from "../../assets/exit.svg";
import Link from "next/link";
import Image from "next/image";

export default function NavigatorAdmin() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <div>
                <nav className={`${styles.menuLateral} ${isOpen ? styles.menuOpen : ''}`}>
                    <div className={styles.btnExpandir} onClick={toggleMenu}>
                        <Image src={menuIcon} alt="Menu icon" className={styles.icons} width={20} height={20}/>
                    </div>

                    <ul>
                        <li className={styles.itemMenu}>
                            <Link href="/dashboardAdmin" className={styles.theLinks}>
                                <span className="icon">
                                    <Image src={rankIcon} alt="Visão Geral" className={styles.icons} width={20} height={20}/>
                                </span>
                                <span className={styles.txtLink}>Visão Geral</span>
                            </Link>
                        </li>

                        <li className={styles.itemMenu}>
                            <Link href="/dashboardAdmin/groups" className={styles.theLinks}>
                                <span className="icon">
                                    <Image src={IntegrantesIcon} alt="Gerenciar Grupos" className={styles.icons} width={20} height={20}/>
                                </span>
                                <span className={styles.txtLink}>Gerenciar Grupos</span>
                            </Link>
                        </li>

                        <li className={styles.itemMenu}>
                            <Link href="#" className={styles.theLinks}>
                                <span className="icon">
                                    <Image src={adminIcon} alt="Registrar Admin" className={styles.icons} width={20} height={20}/>
                                </span>
                                <span className={styles.txtLink}>Registrar Admin</span>
                            </Link>
                        </li>

                        <li className={styles.itemMenu} id={styles.logOut}>
                            <Link href="/login" className={styles.theLinks}>
                                <span className="icon">
                                    <Image src={logOut} alt="Sair" className={styles.icons} width={20} height={20}/>
                                </span>
                                <span className={styles.txtLink}>Sair</span>
                            </Link>
                        </li>
                    </ul>
                </nav>

                {isOpen && <div className={styles.overlay} onClick={toggleMenu} />}
            </div>
        </>
    );
}
