import React from 'react';



import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

export default function AccessDropMenu() {
    return (
        <div>
            <HoverCard>
                <HoverCardTrigger>
            <DropdownMenu>
                <DropdownMenuTrigger className="rounded-full align-middle">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                    </svg>
                    <div className="w-5">
                        <HoverCardContent>
                            Web Accessibility
                        </HoverCardContent>
                    </div>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Increase Font Size</DropdownMenuItem>
                    <DropdownMenuItem>Text-to-Speech</DropdownMenuItem>
                    <DropdownMenuItem>Surprise</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenuTrigger>
            </DropdownMenu>
                </HoverCardTrigger>
            </HoverCard>
        </div>
    )
}