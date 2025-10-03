import CreateProject from "../../components/CreateProject/CreateProject";
import Navigator from "../../components/Navigator";
import styles from "./style.module.css";

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