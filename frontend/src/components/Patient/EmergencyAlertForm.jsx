import React, { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import{ jwtDecode} from "jwt-decode"; // Correct import

const SEND_EMERGENCY_ALERT = gql`
    mutation SendEmergencyAlert($alertMessage: String!) {
        sendEmergencyAlert(alertMessage: $alertMessage) {
            id
            alertMessage
        }
    }
`;

const EmergencyAlertForm = () => {
    const [alertMessage, setAlertMessage] = useState("");
    const [role, setRole] = useState("");

    // Decode the token and set the role
    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("Token retrieved from localStorage:", token);

        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log("Decoded token:", decoded); // Print full decoded token
                if (decoded && decoded.role) {
                    setRole(decoded.role); // Set role if it exists in the token
                } else {
                    console.error("Decoded token does not contain a role field.");
                }
            } catch (error) {
                console.error("Error decoding token:", error.message);
            }
        } else {
            console.error("No token found in localStorage.");
        }
    }, []); // Run once on component mount

    // Debug role updates
    useEffect(() => {
        console.log("Role updated to:", role);
    }, [role]);

    const [sendAlert] = useMutation(SEND_EMERGENCY_ALERT, {
        context: {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Include Authorization header
            },
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!role) {
            alert("Error: Role not defined. Please log in again.");
            return;
        }

        if (role !== "patient") {
            alert("Unauthorized: Only patients can send emergency alerts.");
            return;
        }

        if (!alertMessage.trim()) {
            alert("Alert message cannot be empty.");
            return;
        }

        try {
            await sendAlert({ variables: { alertMessage } });

            alert("Emergency alert sent!");
            setAlertMessage("");
        } catch (error) {
            console.error("Error sending emergency alert:", error.message);
            alert("Failed to send alert: " + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Send Emergency Alert</h2>
            <textarea
                placeholder="Enter your emergency message"
                value={alertMessage}
                onChange={(e) => setAlertMessage(e.target.value)}
                className="w-full mb-4 p-2 border"
            ></textarea>
            <button
                type="submit"
                className="bg-red-500 text-white p-2 rounded"
            >
                Send Alert
            </button>
        </form>
    );
};

export default EmergencyAlertForm;
