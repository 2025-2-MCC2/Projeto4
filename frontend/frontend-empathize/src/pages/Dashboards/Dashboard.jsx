import styles from "./dashboard.module.css";
import Navigator from "../../components/Navigator/index.jsx";
import MainContainer from "../../components/MainContainer/index.jsx";

export default function DashboardStudent() {
    return (
        <>
            <div className={styles.dashboard}>
                <div className={styles.nav}>
                    <Navigator />
                </div>
                <div className={styles.mainContainer}>
                    <h3>#DASHBOARD</h3>
                    <MainContainer />
                </div>
            </div>
        </>
    );
}