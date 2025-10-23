import React from "react";
import styles from "./style.module.css"; 
import layoutStyles from "../Dashboards/dashboard.module.css"; 
import Navigator from "../../components/Navigator/index.jsx";
import IntegrantesContainer from "../../components/IntegrantesContainer/index.jsx"; 
import coracaoVerde from "../../assets/coracaoVerde.svg"; 


export default function Integrantes() {
    return (
        <div className={layoutStyles.dashboard}> 
            <div className={layoutStyles.nav}> 
                <Navigator />
            </div>
            
            <div className={layoutStyles.mainContainer}> 
                
                <h3 className={layoutStyles.mainContainerTitle}>
                    #INTEGRANTES 
                    <img 
                        src={coracaoVerde} 
                        alt="Coração Verde" 
                        className={layoutStyles.coracaoIcon} 
                    />
                </h3>
                
                <IntegrantesContainer />
                
            </div>
        </div>
    );
}