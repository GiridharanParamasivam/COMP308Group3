import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const ADD_VITAL_SIGNS = gql`
    mutation AddVitalSign($input: VitalSignInput!) {
        addVitalSign(input: $input) {
            id
            temperature
            heartRate
            bloodPressure
            respiratoryRate
        }
    }
`;

const VitalSignsForm = () => {
    const [formData, setFormData] = useState({
        patientId: "",
        temperature: "",
        heartRate: "",
        bloodPressure: "",
        respiratoryRate: "",
    });

    const [addVitalSign] = useMutation(ADD_VITAL_SIGNS);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addVitalSign({ variables: { input: formData } });
        alert("Vital signs added successfully!");
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Add Vital Signs</h2>
            <input
                type="text"
                placeholder="Patient ID"
                value={formData.patientId}
                onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                className="w-full mb-2 p-2 border"
            />
            <input
                type="number"
                placeholder="Temperature"
                value={formData.temperature}
                onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                className="w-full mb-2 p-2 border"
            />
            <input
                type="number"
                placeholder="Heart Rate"
                value={formData.heartRate}
                onChange={(e) => setFormData({ ...formData, heartRate: e.target.value })}
                className="w-full mb-2 p-2 border"
            />
            <input
                type="text"
                placeholder="Blood Pressure"
                value={formData.bloodPressure}
                onChange={(e) => setFormData({ ...formData, bloodPressure: e.target.value })}
                className="w-full mb-2 p-2 border"
            />
            <input
                type="number"
                placeholder="Respiratory Rate"
                value={formData.respiratoryRate}
                onChange={(e) => setFormData({ ...formData, respiratoryRate: e.target.value })}
                className="w-full mb-4 p-2 border"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add</button>
        </form>
    );
};

export default VitalSignsForm;
