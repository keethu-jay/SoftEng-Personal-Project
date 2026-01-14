import React from 'react';
import {Card} from "@/components/ui/card.tsx";
import Auth0LoginButton from "@/components/Auth0LoginButton.tsx";


export default function HeroTextBox(){
    return(
        <>
            <div className="text-4xl sm:text-5xl md:text-6xl animate-in fade-in zoom-in duration-800 text-white drop-shadow-lg">
                <h1 className="font-bold leading-tight tracking-tight">Navigating to Your Appointment Just Got Easier.</h1>
            </div>
        </>
        )
}