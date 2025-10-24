import layoutStyles from "../dashboard.module.css";
import Navigator from "../../components/Navigator/index.jsx";
import IntegrantesContainer from "../../components/IntegrantesContainer/index.jsx"; 
import coracaoVerde from "../../assets/coracaoVerde.svg"; 
import Image from "next/image";


export default function Integrantes() {
    return (
        <div className={layoutStyles.dashboard}> 
            <div className={layoutStyles.nav}> 
                <Navigator />
            </div>
            
            <div className={layoutStyles.mainContainer}> 
                
                <h3 className={layoutStyles.mainContainerTitle}>
                    #INTEGRANTES 
                    <Image
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