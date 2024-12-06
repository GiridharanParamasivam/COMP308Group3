import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const ADD_TIP = gql`
    mutation AddMotivationalTip($tip: String!) {
        addMotivationalTip(tip: $tip) {
            id
            tip
        }
    }
`;

const AddTipForm = () => {
    const [tip, setTip] = useState("");
    const [addTip] = useMutation(ADD_TIP);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addTip({ variables: { tip } });
        alert("Motivational tip added!");
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Add Motivational Tip</h2>
            <textarea
                placeholder="Enter a motivational tip"
                value={tip}
                onChange={(e) => setTip(e.target.value)}
                className="w-full mb-4 p-2 border"
            ></textarea>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Tip</button>
        </form>
    );
};

export default AddTipForm;
