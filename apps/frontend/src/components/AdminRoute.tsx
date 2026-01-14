// components/AdminRoute.tsx
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { useDemoMode } from "@/hooks/useDemoMode";

const AdminRoute = () => {
    const { isAuthenticated, isLoading: authLoading } = useAuth0();
    const { isAdmin, isLoading: adminLoading } = useAdmin();
    const { isDemoMode } = useDemoMode();

    if (authLoading || adminLoading) return <div>Loading...</div>;

    // Allow access if in demo mode as admin, or authenticated as admin
    if (isDemoMode) {
        if (isAdmin) {
            return <Outlet />;
        } else {
            return <Navigate to="/" />;
        }
    }

    if (!isAuthenticated) return <Navigate to="/" />;

    if (!isAdmin) return <Navigate to="/" />;

    return <Outlet />;
};

export { AdminRoute };
