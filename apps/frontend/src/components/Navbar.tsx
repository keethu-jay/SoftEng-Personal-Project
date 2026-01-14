import React, { useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"

import Banner from "@/components/Banner";
import Auth0LogoutButton from "@/components/Auth0LogoutButton.tsx";
import AccessDropMenu from "@/components/Accessibility.tsx";
import { useAdmin } from "@/hooks/useAdmin";
import { useDemoMode } from "@/hooks/useDemoMode";



export default function Navbar() {
    const { isAuthenticated, isLoading } = useAuth0();
    const { isAdmin } = useAdmin();
    const { demoMode, isDemoMode, isAdmin: isDemoAdmin, isPatient: isDemoPatient } = useDemoMode();

    // Debug: log when demoMode changes
    useEffect(() => {
        console.log("Navbar: demoMode changed to:", demoMode, "isDemoMode:", isDemoMode, "isDemoAdmin:", isDemoAdmin);
    }, [demoMode, isDemoMode, isDemoAdmin]);

    if (isLoading) return <div>Loading...</div>;
    
    // Determine if user is admin (demo admin or authenticated admin)
    // Use demoMode directly to ensure reactivity
    const userIsAdmin = isDemoMode ? (demoMode === "admin") : (isAuthenticated && isAdmin);
    // Determine if user is patient (demo patient only, not admin)
    const userIsPatient = isDemoMode && (demoMode === "patient");
    
    console.log("Navbar render: userIsAdmin =", userIsAdmin, "demoMode =", demoMode);

    return (
        <>
            <Banner isLoggedIn={isAuthenticated || isDemoMode} />

            <nav className="bg-[#0077b6] text-white shadow-lg" key={`nav-${demoMode}`}>
                <div className="max-w-7xl mx-auto">
                    <NavigationMenu className="w-full">
                        <NavigationMenuList className="flex flex-row flex-wrap items-center justify-end gap-2 sm:gap-4 p-2 sm:p-4">
                            <NavigationMenuItem>
                                <div className="text-sm sm:text-base hover:bg-[#005a8a] py-2 px-3 transition-colors duration-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">
                                    <AccessDropMenu />
                                </div>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <Link 
                                    to="/directory"
                                    className="text-sm sm:text-base hover:bg-[#005a8a] transition-colors duration-200 rounded-lg px-3 py-2 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                                >
                                    Directions
                                </Link>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <Link 
                                    to="/servicerequesthub"
                                    className="text-sm sm:text-base hover:bg-[#005a8a] transition-colors duration-200 rounded-lg px-3 py-2 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                                >
                                    Request Service
                                </Link>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <Link 
                                    to="/all-post"
                                    className="text-sm sm:text-base hover:bg-[#005a8a] transition-colors duration-200 rounded-lg px-3 py-2 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                                >
                                    Forum
                                </Link>
                            </NavigationMenuItem>

                            {/* Show routes based on demo mode role or authentication */}
                            {(isAuthenticated || isDemoMode) && (
                                <>
                                    {/* Directory Management - admin only */}
                                    {userIsAdmin && (
                                        <NavigationMenuItem>
                                            <Link 
                                                to="/admin-database"
                                                className="text-sm sm:text-base hover:bg-[#005a8a] transition-colors duration-200 rounded-lg px-3 py-2 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                                            >
                                                Directory Management
                                            </Link>
                                        </NavigationMenuItem>
                                    )}

                                    {/* Admin-only links (All Requests, Map Editor) */}
                                    {userIsAdmin && (
                                        <>
                                            <NavigationMenuItem>
                                                <Link 
                                                    to="/all-service-requests"
                                                    className="text-sm sm:text-base hover:bg-[#005a8a] transition-colors duration-200 rounded-lg px-3 py-2 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                                                >
                                                    All Requests
                                                </Link>
                                            </NavigationMenuItem>

                                            <NavigationMenuItem>
                                                <Link 
                                                    to="/map-editor"
                                                    className="text-sm sm:text-base hover:bg-[#005a8a] transition-colors duration-200 rounded-lg px-3 py-2 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                                                >
                                                    Map Editor
                                                </Link>
                                            </NavigationMenuItem>
                                        </>
                                    )}

                                    {!isDemoMode && (
                                        <NavigationMenuItem>
                                            <Auth0LogoutButton />
                                        </NavigationMenuItem>
                                    )}
                                </>
                            )}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </nav>

            <div className="flex-1 overflow-y-auto">
                <Outlet />
            </div>
        </>
    );
}
