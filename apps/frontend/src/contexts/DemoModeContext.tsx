// contexts/DemoModeContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export type DemoMode = "patient" | "admin" | null;

const DEMO_MODE_KEY = "demo_mode";

interface DemoModeContextType {
    demoMode: DemoMode;
    setDemoMode: (mode: DemoMode) => void;
    isDemoMode: boolean;
    isAdmin: boolean;
    isPatient: boolean;
    isLoading: boolean;
}

const DemoModeContext = createContext<DemoModeContextType | undefined>(undefined);

export const DemoModeProvider = ({ children }: { children: ReactNode }) => {
    const [demoMode, setDemoModeState] = useState<DemoMode>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load demo mode from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(DEMO_MODE_KEY) as DemoMode;
        if (stored === "patient" || stored === "admin") {
            setDemoModeState(stored);
        } else {
            setDemoModeState(null);
        }
        setIsLoading(false);
    }, []);

    // Function to set demo mode
    const setDemoMode = useCallback((mode: DemoMode) => {
        console.log("DemoModeContext: Setting mode to", mode);
        try {
            if (mode === null) {
                localStorage.removeItem(DEMO_MODE_KEY);
            } else {
                localStorage.setItem(DEMO_MODE_KEY, mode);
            }
            // Update state - this will trigger re-renders in all consumers
            setDemoModeState(mode);
            console.log("DemoModeContext: State updated to", mode);
        } catch (error) {
            console.error("Error setting demo mode:", error);
            setDemoModeState(mode);
        }
    }, []);

    const isDemoMode = demoMode !== null;
    const isAdmin = demoMode === "admin";
    const isPatient = demoMode === "patient";

    return (
        <DemoModeContext.Provider
            value={{
                demoMode,
                setDemoMode,
                isDemoMode,
                isAdmin,
                isPatient,
                isLoading,
            }}
        >
            {children}
        </DemoModeContext.Provider>
    );
};

export const useDemoMode = () => {
    const context = useContext(DemoModeContext);
    if (context === undefined) {
        throw new Error("useDemoMode must be used within a DemoModeProvider");
    }
    return context;
};
