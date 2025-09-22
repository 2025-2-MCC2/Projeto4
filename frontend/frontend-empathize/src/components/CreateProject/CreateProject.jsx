import styles from "./style.module.css";

export default function CreateProject() {
    return (
        <>
            <button id={styles.btnCreateProject}>Criar projeto</button>
            <div className={styles.projectDescription}></div>
        </>
    );
}