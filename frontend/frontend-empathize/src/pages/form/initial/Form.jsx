import BtnContinue from "../../../components/BtnContinue/BtnContinue";
import InputForm from "../../../components/InputForm/InputForm";
import formImg from "../../../assets/formImg1.png";
import styles from "./style.module.css";
import "./style.module.css";

export default function Form() {
    return (
       <>
            <div className={styles.container}>
                <div><img src={formImg} alt="Empathize image" className={styles.imgEmpathize}/></div>
                <div className={styles.rigthSide}>
                    <h3>Inscrição</h3>
                    <InputForm theLabel="Nome completo"/>
                    <InputForm theLabel="RA" />
                    <InputForm theLabel="Curso" />
                    <InputForm theLabel="Nome do grupo" />
                    <BtnContinue />
                </div>
            </div>
       </>
    );
}