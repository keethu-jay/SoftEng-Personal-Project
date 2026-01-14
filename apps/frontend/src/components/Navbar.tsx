import React from 'react';
import { Outlet, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";

import Banner from "@/components/Banner";
import Auth0LogoutButton from "@/components/Auth0LogoutButton.tsx";
import AccessDropMenu from "@/components/Accessibility.tsx";
import { useAdmin } from "@/hooks/useAdmin";
import { useDemoMode } from "@/hooks/useDemoMode";

/**
 * Main navigation bar component.
 * 
 * This component:
 * - Displays the site banner
 * - Renders navigation links based on user role (admin/patient)
 * - Shows different links for authenticated users vs demo mode
 * - Handles both Auth0 authentication and demo mode
 * 
 * Navigation links are dynamically shown based on:
 * - User authentication status
 * - Demo mode role (admin/patient)
 * - Admin privileges
 */
export default function Navbar() {
    const { isAuthenticated, isLoading } = useAuth0();
    const { isAdmin } = useAdmin();
    const { demoMode, isDemoMode, isAdmin: isDemoAdmin } = useDemoMode();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    // Determine user role: admin (demo admin or authenticated admin) or patient
    const userIsAdmin = isDemoMode ? (demoMode === "admin") : (isAuthenticated && isAdmin);
    const userIsPatient = isDemoMode && (demoMode === "patient");

    return (
        <>
            <Banner isLoggedIn={isAuthenticated || isDemoMode} />

            <nav className="bg-[#0077b6] text-white shadow-lg" key={`nav-${demoMode}`}>
                <div className="max-w-7xl mx-auto">
                    <NavigationMenu className="w-full">
                        <NavigationMenuList className="flex flex-row flex-wrap items-center justify-end gap-1.5 sm:gap-2 px-2 py-2 sm:px-4 sm:py-3">
                            {/* Accessibility menu */}
                            <NavigationMenuItem>
                                <div className="text-[0.7rem] sm:text-xs md:text-sm lg:text-base bg-white/10 hover:bg-white/20 border border-white/20 py-1.5 px-3 sm:px-3.5 md:px-4 transition-colors duration-200 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">
                                    <AccessDropMenu />
                                </div>
                            </NavigationMenuItem>

                            {/* Public navigation links - visible to everyone */}
                            <NavigationMenuItem>
                                <Link 
                                    to="/directions"
                                    className="text-[0.7rem] sm:text-xs md:text-sm lg:text-base bg-white/10 hover:bg-white/20 border border-white/20 transition-colors duration-200 rounded-full px-3 sm:px-3.5 md:px-4 py-1.5 sm:py-2 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 whitespace-nowrap"
                                >
                                    Directions
                                </Link>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <Link 
                                    to="/servicerequesthub"
                                    className="text-[0.7rem] sm:text-xs md:text-sm lg:text-base bg-white/10 hover:bg-white/20 border border-white/20 transition-colors duration-200 rounded-full px-3 sm:px-3.5 md:px-4 py-1.5 sm:py-2 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 whitespace-nowrap"
                                >
                                    Request Service
                                </Link>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <Link 
                                    to="/all-post"
                                    className="text-[0.7rem] sm:text-xs md:text-sm lg:text-base bg-white/10 hover:bg-white/20 border border-white/20 transition-colors duration-200 rounded-full px-3 sm:px-3.5 md:px-4 py-1.5 sm:py-2 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 whitespace-nowrap"
                                >
                                    Forum
                                </Link>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <Link 
                                    to="/directory"
                                    className="text-[0.7rem] sm:text-xs md:text-sm lg:text-base bg-white/10 hover:bg-white/20 border border-white/20 transition-colors duration-200 rounded-full px-3 sm:px-3.5 md:px-4 py-1.5 sm:py-2 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 whitespace-nowrap"
                                >
                                    Directory
                                </Link>
                            </NavigationMenuItem>

                            {/* Admin-only links - shown when user is admin (demo or authenticated) */}
                            {(isAuthenticated || isDemoMode) && userIsAdmin && (
                                <>
                                    <NavigationMenuItem>
                                        <Link 
                                            to="/admin-database"
                                            className="text-[0.7rem] sm:text-xs md:text-sm lg:text-base bg-white/10 hover:bg-white/20 border border-white/20 transition-colors duration-200 rounded-full px-3 sm:px-3.5 md:px-4 py-1.5 sm:py-2 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 whitespace-nowrap"
                                        >
                                            Directory Management
                                        </Link>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem>
                                        <Link 
                                            to="/all-service-requests"
                                            className="text-[0.7rem] sm:text-xs md:text-sm lg:text-base bg-white/10 hover:bg-white/20 border border-white/20 transition-colors duration-200 rounded-full px-3 sm:px-3.5 md:px-4 py-1.5 sm:py-2 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 whitespace-nowrap"
                                        >
                                            All Requests
                                        </Link>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem>
                                        <Link 
                                            to="/map-editor"
                                            className="text-[0.7rem] sm:text-xs md:text-sm lg:text-base bg-white/10 hover:bg-white/20 border border-white/20 transition-colors duration-200 rounded-full px-3 sm:px-3.5 md:px-4 py-1.5 sm:py-2 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 whitespace-nowrap"
                                        >
                                            Map Editor
                                        </Link>
                                    </NavigationMenuItem>
                                </>
                            )}

                            {/* Logout button - only shown for authenticated users (not demo mode) */}
                            {!isDemoMode && isAuthenticated && (
                                <NavigationMenuItem>
                                    <Auth0LogoutButton />
                                </NavigationMenuItem>
                            )}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </nav>

            {/* Outlet for nested routes */}
            <div className="flex-1 overflow-y-auto">
                <Outlet />
            </div>
        </>
    );
}
