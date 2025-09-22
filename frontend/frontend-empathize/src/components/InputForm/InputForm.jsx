import styles from "./style.module.css";

export default function InputForm(props) {
    return (
        <>
            <label htmlFor="patternInp" className={styles.designLabel}>{props.theLabel}<span className={styles.colorMandatory}>*</span></label>
            <input type="text" id="patternInp" className={styles.inputs}/>
        </>
    );
}