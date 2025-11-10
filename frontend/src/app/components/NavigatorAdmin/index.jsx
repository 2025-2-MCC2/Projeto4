"use client";

import { useState } from "react";
import styles from "../NavigatorAdmin/Nav.module.css";
import menuIcon from "../../assets/menu-hamburguer.svg";
import casinhaAdm from "../../assets/casinhaAdm.svg";
import IntegrantesIcon from "../../assets/users-alt.svg";
import settingsIcon from "../../assets/settings.svg";
import logOut from "../../assets/exit.svg";
import Link from "next/link";
import Image from "next/image";
import { removeToken } from "../../login/auth.js"

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
                  <Image src={casinhaAdm} alt="Visão Geral" className={styles.icons} width={20} height={20}/>
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
              <Link href="/dashboardAdmin/manage" className={styles.theLinks}>
                <span className="icon">
                  <Image src={settingsIcon} alt="Gerenciar Sistema" className={styles.icons} width={20} height={20}/>
                </span>
                <span className={styles.txtLink}>Gerenciar Sistema</span>
              </Link>
            </li>

            <li className={styles.itemMenu} id={styles.logOut}>
              <Link href="/login" className={styles.theLinks} onClick={() => removeToken()}>
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
