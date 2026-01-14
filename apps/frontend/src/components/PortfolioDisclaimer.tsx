import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export default function PortfolioDisclaimer() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has dismissed the disclaimer before
        const hasSeenDisclaimer = localStorage.getItem('portfolio-disclaimer-dismissed');
        if (!hasSeenDisclaimer) {
            setIsVisible(true);
        }
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem('portfolio-disclaimer-dismissed', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full mx-4 p-6 sm:p-8 relative">
                <button
                    onClick={handleDismiss}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close disclaimer"
                >
                    <X className="h-5 w-5" />
                </button>
                
                <div className="pr-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#03045e] mb-4">
                        Portfolio Project Disclaimer
                    </h2>
                    
                    <div className="space-y-4 text-gray-700">
                        <p className="text-base sm:text-lg leading-relaxed">
                            This website is part of <strong className="text-[#0077b6]">Keerthana Jayamoorthy's</strong> portfolio to demonstrate skills in the <strong>PERN stack</strong> (PostgreSQL, Express, React, Node.js).
                        </p>
                        
                        <p className="text-base sm:text-lg leading-relaxed">
                            The original codebase was created by a team of <strong>nine developers</strong> over <strong>7 weeks</strong> for the Software Engineering course at <strong>WPI</strong> (Worcester Polytechnic Institute). I served as the <strong>Lead Assistant Frontend Developer</strong> on this project.
                        </p>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                        <Button
                            onClick={handleDismiss}
                            className="bg-[#0077b6] hover:bg-[#005a8a] text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            I Understand
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
