import React, { useEffect } from "react";

import Header from "../components/Header";
import Sidebar from "../components/sidebar/index";
import Timeline from "../components/Timeline";

const Dashboard = () => {
    useEffect(() => {
        document.title = "instagram";
    }, []);
    return (
        <div className="bg-gray-100">
            <Header />
            <div className="grid grid-cols-3 gap-4 justify-between max-w-screen-lg">
                <Timeline />
                <Sidebar />
            </div>
        </div>
    );
};

export default Dashboard;
