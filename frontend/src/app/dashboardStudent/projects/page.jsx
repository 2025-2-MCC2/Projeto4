import CreateProject from "../../components/CreateProject/CreateProject.jsx";
import Navigator from "../../components/Navigator/index.jsx";
import styles from "./projects.module.css";

export default function Projects() {
    return (
        <>
            <div className={styles.theBody}>
                <div className={styles.navigatorContainer}>
                    <Navigator />
                </div>
                <div className={styles.projectContainer}>
                    <h2>Projetos</h2>
                    <CreateProject />
                </div>
            </div>
        </>
    );
}