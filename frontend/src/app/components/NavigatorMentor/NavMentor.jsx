"use client";

import { useState } from "react";
import styles from "./Nav.module.css";
import menuIcon from "../../assets/menu-hamburguer.svg";
import homeIcon from "../../assets/casa.svg";
import iconValidate from "../../assets/vote-sim.png";
import logOut from "../../assets/exit.svg";
import iconTeam from "../../assets/users-alt.svg";
import Link from "next/link";
import Image from "next/image";
import { removeToken } from "../../login/auth.js";

export default function NavigatorMentor() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div>
                <nav className={`${styles.menuLateral} ${isOpen ? styles.menuOpen : ''}`}>
                    <div className={styles.btnExpandir} onClick={toggleMenu}>
                        <Image src={menuIcon} alt="Menu icon" className={styles.icons} />
                    </div>

                    <ul>
                        <li className={styles.itemMenu}>
                            <Link href={"/dashboardMentor"} className={styles.theLinks}>
                                <span className="icon">
                                    <Image src={homeIcon} alt="Home icon" className={styles.icons} />
                                </span>
                                <span className={styles.txtLink}>Home</span>
                            </Link>
                        </li>
                        <li className={styles.itemMenu}>
                            <Link href={"/dashboardMentor/validate"} className={styles.theLinks}>
                                <span className="icon">
                                    <Image src={iconValidate} alt="Validate icon" className={styles.icons}/>
                                </span>
                                <span className={styles.txtLink}>Arrecadações</span>
                            </Link>
                        </li>

                        <li className={styles.itemMenu}>
                            <Link href={"/dashboardMentor/team"} className={styles.theLinks}>
                                <span className="icon">
                                    <Image src={iconTeam} alt="Team icon" className={styles.icons}/>
                                </span>
                                <span className={styles.txtLink}>Integrantes</span>
                            </Link>
                        </li>
                
                        <li className={styles.itemMenu} id={styles.logOut}>
                            <Link href={"/login"} className={styles.theLinks} onClick={() => removeToken()}>
                                <span className="icon">
                                    <Image src={logOut} alt="Sair icon" className={styles.icons}/>
                                </span>
                                <span className={styles.txtLink}>Sair</span>
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Overlay para fechar o menu ao clicar fora */}
                {isOpen && (
                    <div 
                        className={styles.overlay} 
                        onClick={toggleMenu}
                    />
                )}
            </div>
        </>
    );
}