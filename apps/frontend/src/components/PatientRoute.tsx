// components/PatientRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDemoMode } from "@/hooks/useDemoMode";
import { useAuth0 } from "@auth0/auth0-react";

// Patient route - accessible to both patients and admins in demo mode, or authenticated users
const PatientRoute = () => {
    const { isAuthenticated, isLoading: authLoading } = useAuth0();
    const { isDemoMode, isLoading: demoLoading } = useDemoMode();

    if (authLoading || demoLoading) return <div>Loading...</div>;

    // Allow access if in demo mode (patient or admin), or authenticated
    if (isDemoMode || isAuthenticated) {
        return <Outlet />;
    }

    return <Navigate to="/" />;
};

export { PatientRoute };
