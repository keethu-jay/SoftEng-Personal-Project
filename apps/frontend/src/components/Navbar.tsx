import React from 'react';
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



export default function Navbar() {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <Banner isLoggedIn={isAuthenticated} />

            <div className="bg-blue-900 text-white flex justify-between items-center h-10">
                <div className={"ml-auto"}>
                    <NavigationMenu className={'ml-auto p-4'}>
                        <NavigationMenuList className={'flex flex-row space-x-5'}>


                            <NavigationMenuItem>
                                <NavigationMenuLink className="text-base hover:bg-blue-950 py-1">
                                    <b><AccessDropMenu /></b>
                                </NavigationMenuLink>
                            </NavigationMenuItem>


                            <NavigationMenuItem>
                                <NavigationMenuLink className={'text-base hover:bg-[rgba(0,31,63,0.8)] hover:text-white'}>
                                    <Link to={`/directory`}>Directions</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink className={'text-base hover:bg-[rgba(0,31,63,0.8)] hover:text-white'}>
                                    <Link to={`/servicerequesthub`}>Request Service</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            {isAuthenticated && (
                                <>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink className={'text-base hover:bg-[rgba(0,31,63,0.8)] hover:text-white'}>
                                            <Link to={`/all-service-requests`}>All Requests</Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem>
                                        <NavigationMenuLink className={'text-base hover:bg-[rgba(0,31,63,0.8)] hover:text-white'}>
                                            <Link to={`/admin-database`}>Directory Management</Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem>
                                        <NavigationMenuLink className={'text-base hover:bg-[rgba(0,31,63,0.8)] hover:text-white'}>
                                            <Link to={`/map-editor`}>Map Editor</Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem>
                                        <Auth0LogoutButton />
                                    </NavigationMenuItem>
                                </>
                            )}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>

            <div className="flex-1 overflow-y-scroll">
                <Outlet />
            </div>
        </>
    );
}
