import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const REGISTER_MUTATION = gql`
    mutation Register($input: RegisterInput!) {
        registerUser(input: $input) {
            id
            email
        }
    }
`;

const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "patient" });
    const [register] = useMutation(REGISTER_MUTATION);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register({ variables: { input: formData } });
        alert("Registration successful!");
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full mb-2 p-2 border"
            />
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
                className="w-full mb-2 p-2 border"
            />
            <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full mb-4 p-2 border"
            >
                <option value="nurse">Nurse</option>
                <option value="patient">Patient</option>
            </select>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Register</button>
        </form>
    );
};

export default Register;
