import React, { useEffect } from 'react';
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
import hospitalLogo from "@/public/hospital2.png";

import { useAuth0 } from "@auth0/auth0-react";
import SearchBar from "@/components/SearchStuff/SearchBar.tsx";
import AccessDropMenu from "@/components/Accessibility.tsx";
import DemoModeDropdown from "@/components/DemoModeDropdown.tsx";
import { useDemoMode } from "@/hooks/useDemoMode";


export default function Banner({isLoggedIn}: {isLoggedIn: boolean})  {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { loginWithRedirect } = useAuth0();
    const { isDemoMode, demoMode } = useDemoMode();
    
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

                            <SearchBar />
                            {isLoggedIn && (
                                <NavigationMenuItem>
                                    <Link to="/profile" className="inline-block">
                                        <img
                                            src={user?.picture}
                                            alt={user?.name}
                                            className="w-10 h-10 rounded-full border-2 border-[#0077b6] hover:opacity-80 transition duration-200 shadow-md"
                                        />
                                    </Link>
                                </NavigationMenuItem>)}

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
        </>
    );
};