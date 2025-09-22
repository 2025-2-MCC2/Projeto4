import CreateProject from "../../../components/CreateProject/CreateProject";
import Navigator from "../../../components/Navigator";
import styles from "./style.module.css";

export default function Projects() {
    return (
        <>
            <div className={styles.theBody}>
                <Navigator />
                <h2>Projetos</h2>
                <CreateProject />
            </div>
        </>
    );
}