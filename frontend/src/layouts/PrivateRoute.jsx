import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/auth";

const PrivateRoute = ({ children }) => {
    // call the isLoggedIn function inside the selector so zustand can subscribe properly
    const loggedIn = useAuthStore((state) => state.isLoggedIn());
    const loading = useAuthStore((state) => state.loading);
    const location = useLocation();

    if (loading) {
        return <div style={{ padding: 40, textAlign: 'center' }}>Loading...</div>;
    }

    return loggedIn ? (
        <>{children}</>
    ) : (
        <Navigate to="/login/" replace state={{ from: location.pathname }} />
    );
};

export default PrivateRoute;
