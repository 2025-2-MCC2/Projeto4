import "./globalStyle.css";
import Navigator from "../../components/Navigator/index.jsx";
import Ranking from "../../components/Ranking/index.jsx";

export default function DashboardStudent() {
    return (
        <>
            <div className="dashboard">
                <div className="nav">
                    <Navigator />
                </div>
                <div className="mainContainer">
                    <h3>Dashboard</h3>
                    <Ranking />
                </div>
            </div>
        </>
    );
}