import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import NurseDashboard from "./components/Nurse/Dashboard";
import PatientDashboard from "./components/Patient/Dashboard";
import EmergencyAlertForm from "./components/Patient/EmergencyAlertForm";
import DailyInfoForm from "./components/Patient/DailyInfoForm";
import AddVitalSignsForm from "./components/Nurse/VitalSignsForm";
import AddMotivationalTipForm from "./components/Nurse/AddTipForm";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Common Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Patient Routes */}
                <Route path="/patient-dashboard" element={<PatientDashboard />} />
                <Route path="/emergency-alert" element={<EmergencyAlertForm />} />
                <Route path="/daily-info" element={<DailyInfoForm />} />

                {/* Nurse Routes */}
                <Route path="/nurse-dashboard" element={<NurseDashboard />} />
                <Route path="/add-vital-signs" element={<AddVitalSignsForm />} />
                <Route path="/add-tip" element={<AddMotivationalTipForm />} />
            </Routes>
        </Router>
    );
};

export default App;
