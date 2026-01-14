// components/ProtectedRoute.tsx
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";
import { useDemoMode } from "@/hooks/useDemoMode";

const ProtectedRoute = () => {
    const { isAuthenticated, isLoading: authLoading } = useAuth0();
    const { isDemoMode, isLoading: demoLoading } = useDemoMode();

    if (authLoading || demoLoading) return <div>Loading...</div>;

    // Allow access if in demo mode or authenticated
    if (isDemoMode || isAuthenticated) {
        return <Outlet />;
    }

    return <Navigate to="/" />;
};

export { ProtectedRoute };
