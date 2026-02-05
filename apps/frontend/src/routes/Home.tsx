import React from 'react';



import HeroTextBox from "@/components/HeroPage.tsx";

import Auth0LoginButton from "@/components/Auth0LoginButton.tsx";
import MapButton from "@/components/MapButton.tsx";
import DirectoryButton from "@/components/DirectoryButton.tsx";
import Footer from "@/components/Footer.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { useDemoMode } from "@/hooks/useDemoMode";

// Use for comments
{/**/}


export default function Home() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { isDemoMode } = useDemoMode();

    return (
        <div className="flex flex-col min-h-screen">
            <div className="relative bg-[url(/floormaps/Hospital.jpg)] bg-no-repeat bg-cover bg-center min-h-screen flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-yellow-600/10 mix-blend-multiply pointer-events-none"></div>
                <div className="absolute inset-0 bg-zinc-900/50 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl px-4 py-8 space-y-12">
                    <div className="text-center px-4">
                        <HeroTextBox />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center w-full gap-6 sm:gap-8 px-4">
                        <div className="w-full sm:w-auto">
                            <MapButton />
                        </div>

                        <div className="w-full sm:w-auto">
                            <DirectoryButton />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}
