import styles from "./stye.module.css";

export default function AddStudent() {
    return (
        <>
            <div className={styles.containerInput}>
                <div className={styles.inpFullName}>
                    <label htmlFor="inpFullName" className={styles.designLabel}>Nome completo do estudante<span className={styles.colorMandatory}>*</span></label>
                    <input type="text" name="inpFullName" id="inpFullName" />
                </div>

                <div className={styles.inpRA}>
                    <label htmlFor="inpRA" className={styles.designLabel}>RA<span className={styles.colorMandatory}>*</span></label>
                    <input type="number" name="inpRA" id="inpRA" />
                </div>

                <div className={styles.inpCurso}>
                    <label htmlFor="inpCurso" className={styles.designLabel}>Curso<span className={styles.colorMandatory}>*</span></label>
                    <select name="inpCurso" id="inpCurso">
                        <option value="" disabled selected>Selecione</option>
                        <option value="ECONOMIA">Economia</option>
                        <option value="CONTABILIDADE">Contabilidade</option>
                        <option value="ADMINISTRAÇÃO">Administração</option>
                    </select>
                </div>
            </div>
        </>
    );
}