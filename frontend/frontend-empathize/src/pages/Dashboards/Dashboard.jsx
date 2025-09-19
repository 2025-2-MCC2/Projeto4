import "./globalStyle.css";
import Navigator from "../../components/Navigator/index.jsx";
import MainContainer from "../../components/MainContainer/index.jsx";
import { useState } from "react";
import Graphic from "../../components/Graphic/index.jsx";

export default function DashboardStudent() {
    return (
        <>
            <div className="dashboard">
                <div className="nav">
                    <Navigator />
                </div>
                <div className="mainContainer">
                    <h3>Dashboard</h3>
                    <MainContainer />
                    <Graphic />
                </div>
            </div>
        </>
    );
}