import React, {useState, useEffect} from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type SubmissionReqProps = {
    children?: React.ReactNode;
};


export default function SubmissionReqPopup({
    children
}: SubmissionReqProps) {
    return(
        <div>
            <div className="flex justify-center items-center font-bold">
                <ProgressToCheck />
                Service Request Submitted!
            </div>
            <p>---------------------------------------------------------------</p>
            <p></p>
            { children }
        </div>
    );
}


{/*Process into Green Check Animation Blocks*/}

export function ProgressToCheck() {
    const [showCheck, setShowCheck] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowCheck(true)
        }, 800) // simulate a 1-second loading

        return () => clearTimeout(timer)
        }, [])

    return (
        <div className="flex justify-center items-center h-32 w-32">
            {!showCheck ? <ProcessAnimation /> : <CheckAnimation />}
        </div>
    )
}

{/*Processing before check*/}
function ProcessAnimation() {
    return (
        <div className="w-16 h-16 border-4 border-t-blue-800 border-gray-200 rounded-full animate-spin transition-all duration-500"></div>
    )
}

function CheckAnimation() {
    return (
        <div className="flex justify-center items-center animate-fade-in">

            <svg
                className="w-16 h-16 text-green-500 animate-check duration-5000"
                viewBox="0 0 60 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                >
                <circle cx="30" cy="30" r="28" className="stroke-current opacity-20" />
                <path d="M18 27 l8 8 l16 -16" className="path stroke-current" />
            </svg>

            <style>{`
                .animate-check .path {
                    stroke-dasharray: 48;
                    stroke-dashoffset: 48;
                    animation: dash 0.95s ease-out forwards;
                }

                @keyframes dash {
                    to {
                        stroke-dashoffset: 0;
                    }
                }
                
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out;
                }
                
                @keyframes fadeIn {
                    from {
                       opacity: 0;
                       transform: scale(0.95); 
                    }  
                    to {
                    opacity: 1;
                    transform: scale(1);
                }
               }
            `}</style>
        </div>
    )
}