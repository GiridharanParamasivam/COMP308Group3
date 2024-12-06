import React from "react";

const Dashboard = () => {
    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Nurse Dashboard</h1>
            <ul>
                <li><a href="/add-vital-signs">Add Vital Signs</a></li>
                <li><a href="/view-tips">View Motivational Tips</a></li>
            </ul>
        </div>
    );
};

export default Dashboard;
