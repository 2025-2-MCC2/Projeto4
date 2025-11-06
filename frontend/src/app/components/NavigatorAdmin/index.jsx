"use client";

import { useState } from "react";
import styles from "../Navigator/style.module.css"; 
import menuIcon from "../../assets/menu-hamburguer.svg";
import logOut from "../../assets/exit.svg";

import IntegrantesIcon from "../../assets/users-alt.svg";     // Para Gerenciar Grupos
import rankIcon from "../../assets/estrelas-do-ranking.svg";   // Para Visão Geral
import adminIcon from "../../assets/do-utilizador.png";        // Ícone para Registrar Admin
import Link from "next/link";
import Image from "next/image";

export default function NavigatorAdmin({ setActiveTab }) { 
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const adminLinks = [
        { href: "#", icon: rankIcon, text: "Visão Geral", alt: "Visão Geral", action: 'Visão Geral' },
        
        { href: "#", icon: IntegrantesIcon, text: "Gerenciar Grupos", alt: "Gerenciar Grupos", action: 'Gerenciar Grupos' },
        
        { href: "#", icon: adminIcon, text: "Registrar Admin", alt: "Registrar Novo Admin", action: 'Registrar Admin' },
        
        { href: "/login", icon: logOut, text: "Sair", alt: "Sair" },
    ];

    return (
        <>
            <div>
                <nav className={`${styles.menuLateral} ${isOpen ? styles.menuOpen : ''}`}>
                    <div className={styles.btnExpandir} onClick={toggleMenu}>
                        <Image src={menuIcon} alt="Menu icon" className={styles.icons} width={20} height={20} />
                    </div>

                    <ul>
                        {adminLinks.map((link, index) => (
                            <li key={index} className={styles.itemMenu} id={link.text === 'Sair' ? styles.logOut : ''}>
                                <Link 
                                    href={link.href} 
                                    className={styles.theLinks}
                                    onClick={(e) => {
                                        if (link.action && link.action !== 'Sair') {
                                            e.preventDefault(); 
                                            setActiveTab(link.action);
                                        }
                                        if (isOpen) toggleMenu(); 
                                    }}
                                >
                                    <span className="icon">
                                        <Image src={link.icon} alt={link.alt} className={styles.icons} width={20} height={20} />
                                    </span>
                                    <span className={styles.txtLink}>{link.text}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {isOpen && (
                    <div className={styles.overlay} onClick={toggleMenu} />
                )}
            </div>
        </>
    );
}