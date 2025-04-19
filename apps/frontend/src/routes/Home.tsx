import React from 'react';



import HeroTextBox from "@/components/HeroPage.tsx";

import Auth0LoginButton from "@/components/Auth0LoginButton.tsx";
import MapButton from "@/components/MapButton.tsx";
import DirectoryButton from "@/components/DirectoryButton.tsx";
import Footer from "@/components/Footer.tsx";
import { useAuth0 } from "@auth0/auth0-react";

// Use for comments
{/**/}


export default function Home() {
    const { user, isAuthenticated, isLoading } = useAuth0();

    return (
        <div>
            <div className="object-left bg-[url(../public/Hospital.jpg)] bg-no-repeat bg-cover h-screen filter saturate-200 flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-yellow-600/10 mix-blend-multiply pointer-events-none"></div>
                <div className="absolute inset-0 bg-zinc-900/50 pointer-events-none"></div>

                <div className="relative z-10 pb-10">
                    <HeroTextBox />
                </div>

                <div className="relative flex flex-row w-full  items-center justify-center p-4 gap-10">

                    {!isAuthenticated  && (
                        <div className="w-100 p-10">
                            <Auth0LoginButton />
                        </div>
                        )}

                    <div className="w-100 p-10">
                        <MapButton />
                    </div>

                    <div className="w-100 p-10">
                        <DirectoryButton />
                    </div>
                </div>


            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}
