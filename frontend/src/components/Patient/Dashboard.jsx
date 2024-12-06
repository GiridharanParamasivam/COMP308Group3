import React from "react";

const PatientDashboard = () => {
    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Patient Dashboard</h1>
            <ul>
                <li><a href="/emergency-alert" className="text-blue-500 underline">Send Emergency Alert</a></li>
                <li><a href="/daily-info" className="text-blue-500 underline">Submit Daily Information</a></li>
            </ul>
        </div>
    );
};

export default PatientDashboard;
