// components/DemoModeDropdown.tsx
import React, { useState, useCallback } from "react";
import { useDemoMode } from "@/hooks/useDemoMode";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faUserShield } from "@fortawesome/free-solid-svg-icons";

interface DemoModeDropdownProps {
    children: React.ReactNode;
}

const DemoModeDropdown = ({ children }: DemoModeDropdownProps) => {
    const { demoMode, setDemoMode, isDemoMode } = useDemoMode();
    const [open, setOpen] = useState(false);

    const handleModeChange = useCallback((mode: "patient" | "admin" | null) => {
        try {
            console.log("Changing demo mode to:", mode);
            // Close dropdown immediately
            setOpen(false);
            // Update state - this should trigger re-renders
            setDemoMode(mode);
        } catch (error) {
            console.error("Error setting demo mode:", error);
            setOpen(false);
        }
    }, [setDemoMode]);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent 
                align="end" 
                className="w-64 p-2 bg-white border-2 border-black rounded-2xl shadow-xl z-50"
                onCloseAutoFocus={(e) => e.preventDefault()}
            >
                <DropdownMenuLabel className="text-base font-semibold text-black mb-2 px-2">
                    Demo Mode
                </DropdownMenuLabel>
                <div className="space-y-2">
                    {/* Patient View Option */}
                    <DropdownMenuItem
                        onSelect={(e) => {
                            e.preventDefault();
                            console.log("Patient option selected");
                            handleModeChange("patient");
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log("Patient option clicked");
                            handleModeChange("patient");
                        }}
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg border-2 transition-all duration-200 cursor-pointer focus:outline-none ${
                            demoMode === "patient"
                                ? "bg-[#0077b6]/90 border-[#0077b6]/90 text-white shadow-lg"
                                : "bg-white border-black text-black hover:bg-gray-50 hover:shadow-md"
                        }`}
                    >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 flex-shrink-0 ${
                            demoMode === "patient"
                                ? "bg-white border-white"
                                : "bg-white border-black"
                        }`}>
                            <FontAwesomeIcon 
                                icon={faCircleUser} 
                                size="2x"
                                className={demoMode === "patient" ? "text-[#0077b6]" : "text-black"}
                            />
                        </div>
                        <div className="flex flex-col items-start min-w-0">
                            <span className="font-semibold text-base">Patient View</span>
                            <span className="text-xs opacity-70">Regular user access</span>
                        </div>
                    </DropdownMenuItem>

                    {/* Admin View Option */}
                    <DropdownMenuItem
                        onSelect={(e) => {
                            e.preventDefault();
                            console.log("Admin option selected");
                            handleModeChange("admin");
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log("Admin option clicked");
                            handleModeChange("admin");
                        }}
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg border-2 transition-all duration-200 cursor-pointer focus:outline-none ${
                            demoMode === "admin"
                                ? "bg-[#03045e]/90 border-[#03045e]/90 text-white shadow-lg"
                                : "bg-white border-black text-black hover:bg-gray-50 hover:shadow-md"
                        }`}
                    >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 flex-shrink-0 ${
                            demoMode === "admin"
                                ? "bg-white border-white"
                                : "bg-white border-black"
                        }`}>
                            <FontAwesomeIcon 
                                icon={faUserShield} 
                                size="2x"
                                className={demoMode === "admin" ? "text-[#03045e]" : "text-black"}
                            />
                        </div>
                        <div className="flex flex-col items-start min-w-0">
                            <span className="font-semibold text-base">Admin View</span>
                            <span className="text-xs opacity-70">Administrative access</span>
                        </div>
                    </DropdownMenuItem>
                </div>
                {isDemoMode && (
                    <>
                        <DropdownMenuSeparator className="my-2 border-black" />
                        <DropdownMenuItem
                            onSelect={(e) => {
                                e.preventDefault();
                                console.log("Exit demo mode selected");
                                handleModeChange(null);
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log("Exit demo mode clicked");
                                handleModeChange(null);
                            }}
                            className="px-4 py-2.5 rounded-lg text-sm font-medium text-black border-2 border-black bg-white hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer focus:outline-none"
                        >
                            Exit Demo Mode
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DemoModeDropdown;
