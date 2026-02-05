import React, { useEffect, useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList
} from "@/components/ui/navigation-menu.tsx";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger
} from '@radix-ui/react-hover-card';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleUser, faUserShield} from "@fortawesome/free-solid-svg-icons";
// Served from public/floormaps/ at build
const hospitalLogo = "/floormaps/hospital2.png";

import { useAuth0 } from "@auth0/auth0-react";
import DemoModeDropdown from "@/components/DemoModeDropdown.tsx";
import { useDemoMode } from "@/hooks/useDemoMode";


export default function Banner({isLoggedIn}: {isLoggedIn: boolean})  {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { loginWithRedirect } = useAuth0();
    const { isDemoMode, demoMode } = useDemoMode();
    const [showDisclaimer, setShowDisclaimer] = useState(true);
    
    // Debug: log when demoMode changes
    useEffect(() => {
        console.log("Banner: demoMode changed to:", demoMode, "isDemoMode:", isDemoMode);
    }, [demoMode, isDemoMode]);
    
    // Determine icon and color based on current demo mode
    const iconToShow = isDemoMode && demoMode === "admin" ? faUserShield : faCircleUser;
    const iconColor = isDemoMode 
        ? (demoMode === "admin" ? '#03045e' : '#0077b6')
        : '#03045e';
    const borderColor = isDemoMode 
        ? (demoMode === "admin" ? "border-[#03045e]" : "border-[#0077b6]")
        : "border-[#03045e]";


    return (
        <>
            <div className={"flex flex-row bg-[#90e0ef]/80"} >
                <div className={"basis-1/3 className=transition duration-500 ease-in-out hover:scale-102"}>
                    {!isAuthenticated && (
                        <Link to="/">
                            <img
                                src={hospitalLogo}
                                alt="Brigham and Women’s Hospital (Founding Member, Mass General Brigham)"
                                style={{ height: "40px" }}
                                className={"mx-4 my-4"}
                            />
                        </Link>
                    )}

                    {isAuthenticated && (
                        <Link to="/">
                            <img
                                src={hospitalLogo}
                                alt="Brigham and Women’s Hospital (Founding Member, Mass General Brigham)"
                                style={{ height: "40px" }}
                                className={"mx-4 my-4"}
                            />
                        </Link>
                    )}

                </div>

                <div className={"basis-2/3"}>
                    <NavigationMenu className={"ml-auto p-4"}>
                        <NavigationMenuList className={"flex flex-row space-x-5 items-center"}>
                            <NavigationMenuItem>
                            </NavigationMenuItem>

                            {/* Show demo mode button when not authenticated (whether in demo mode or not) */}
                            {!isAuthenticated && (
                                <NavigationMenuItem className="list-none">
                                    <DemoModeDropdown>
                                        <button 
                                            type="button"
                                            className={`transition duration-300 ease-in-out hover:scale-110 active:scale-95 focus:outline-none cursor-pointer bg-white border-2 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-xl ${borderColor}`}
                                            aria-label={isDemoMode ? "Change Demo Mode" : "Demo Mode"}
                                            onClick={(e) => {
                                                // Prevent navigation if clicking the button
                                                e.stopPropagation();
                                            }}
                                        >
                                            <FontAwesomeIcon 
                                                icon={iconToShow}
                                                size="2x"
                                                style={{ color: iconColor }}
                                                key={demoMode || "none"} // Force re-render when mode changes
                                            />
                                        </button>
                                    </DemoModeDropdown>
                                </NavigationMenuItem>
                            )}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
            {showDisclaimer && (
                <div className="w-full flex justify-center mt-1 mb-1">
                    <div className="inline-flex items-center gap-1.5 bg-red-600 text-white text-[0.7rem] sm:text-xs font-semibold py-0.5 px-3 rounded-full shadow-sm">
                        <span>
                            This site is a demo and is not officially affiliated with Brigham and Women&apos;s Hospital.
                        </span>
                        <button
                            type="button"
                            className="ml-1 text-white/80 hover:text-white text-xs font-bold focus:outline-none"
                            aria-label="Dismiss disclaimer"
                            onClick={() => setShowDisclaimer(false)}
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};