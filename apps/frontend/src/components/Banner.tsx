import React from 'react';
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
import {faCircleUser} from "@fortawesome/free-solid-svg-icons";
import hospitalLogo from "@/public/hospital2.png";

import { useAuth0 } from "@auth0/auth0-react";
import SearchBar from "@/components/SearchStuff/SearchBar.tsx";
import AccessDropMenu from "@/components/Accessibility.tsx";


export default function Banner({isLoggedIn}: {isLoggedIn: boolean})  {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { loginWithRedirect } = useAuth0();


    return (
        <>
            <div className={"flex flex-row bg-[#Addde5]"} >
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
                        <NavigationMenuList className={"flex flex-row space-x-5"}>
                            <NavigationMenuItem>
                            </NavigationMenuItem>

                            <SearchBar />
                            {isLoggedIn && (
                                <NavigationMenuItem>
                                    <Link to="/profile" className="inline-block">
                                        <img
                                            src={user?.picture}
                                            alt={user?.name}
                                            className="w-10 h-10 rounded-full border-2 border-gray-300 hover:opacity-80 transition duration-200"
                                        />
                                    </Link>
                                </NavigationMenuItem>)}

                            {!isLoggedIn && (
                                <>

                                    <NavigationMenuItem>
                                        <HoverCard>
                                            <HoverCardTrigger asChild>
                                                <div className=" className=transition duration-300 ease-in-out hover:scale-115">
                                                    <button onClick={() => loginWithRedirect()}>
                                                        <FontAwesomeIcon icon={faCircleUser} size="2x" color="black"/>
                                                            <HoverCardContent className="w-20 bg-white rounded animate-in fade-in duration-200">
                                                                Profile
                                                            </HoverCardContent>
                                                    </button>
                                                </div>
                                            </HoverCardTrigger>
                                        </HoverCard>
                                    </NavigationMenuItem>
                                </>
                                )}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
        </>
    );
};