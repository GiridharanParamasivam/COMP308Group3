import React from "react";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

type Props = {
    children: React.ReactNode;
    roles: string[];
};

const PrivateRoute: React.FC<Props> = ({ children, roles }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        const decoded: any = jwtDecode(token);
        if (!roles.includes(decoded.role)) {
            return <Navigate to="/" />;
        }
    } catch (error) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

export default PrivateRoute;
