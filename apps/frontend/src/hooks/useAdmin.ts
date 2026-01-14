// hooks/useAdmin.ts
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDemoMode } from "./useDemoMode";

// List of admin email addresses (for Auth0 authentication)
const ADMIN_EMAILS = [
    // Add admin emails here if using Auth0
];

export const useAdmin = () => {
    const { isAuthenticated, user, getIdTokenClaims } = useAuth0();
    const { demoMode, isDemoMode, isAdmin: isDemoAdmin } = useDemoMode();
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // If in demo mode, use demo mode admin status
        if (isDemoMode) {
            // Use demoMode directly to ensure reactivity
            setIsAdmin(demoMode === "admin");
            setIsLoading(false);
            return;
        }

        // Otherwise, check Auth0 authentication
        const checkAdmin = async () => {
            if (!isAuthenticated || !user) {
                setIsAdmin(false);
                setIsLoading(false);
                return;
            }

            try {
                // Method 1: Check by email
                if (user.email && ADMIN_EMAILS.includes(user.email)) {
                    setIsAdmin(true);
                    setIsLoading(false);
                    return;
                }

                // Method 2: Check roles from token
                try {
                    const claims = await getIdTokenClaims();
                    const roles = claims?.[`https://your-app-name/roles`] || 
                                 claims?.roles || 
                                 claims?.[`https://${claims?.iss?.replace('https://', '').split('/')[0]}/roles`] ||
                                 [];
                    
                    const hasAdminRole = Array.isArray(roles) 
                        ? roles.includes('admin') 
                        : roles === 'admin' || (typeof roles === 'string' && roles.includes('admin'));
                    
                    if (hasAdminRole) {
                        setIsAdmin(true);
                        setIsLoading(false);
                        return;
                    }
                } catch (tokenError) {
                    console.log('Could not check token claims, using email check only');
                }

                setIsAdmin(false);
            } catch (error) {
                console.error('Error checking admin status:', error);
                setIsAdmin(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAdmin();
    }, [isAuthenticated, user, getIdTokenClaims, isDemoMode, demoMode]);

    return { isAdmin, isLoading };
};
