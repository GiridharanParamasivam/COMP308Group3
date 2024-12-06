import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import {jwtDecode} from "jwt-decode"; // Correct import for default export
import { useNavigate } from "react-router-dom";

const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password)
    }
`;

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [login] = useMutation(LOGIN_MUTATION);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login({ variables: { ...formData } });
            const token = data.login;

            // Save the token to localStorage
            localStorage.setItem("token", token);

            // Decode the token to get the user's role
            const decoded = jwtDecode(token);
            const role = decoded.role;

            // Navigate to the appropriate dashboard based on the role
            if (role === "nurse") {
                navigate("/nurse-dashboard");
            } else if (role === "patient") {
                navigate("/patient-dashboard");
            } else {
                alert("Unknown role");
            }
        } catch (error) {
            alert("Login failed: " + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full mb-2 p-2 border"
            />
            <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full mb-4 p-2 border"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
        </form>
    );
};

export default Login;
