// hooks/useDemoMode.ts
import { useState, useEffect, useCallback } from "react";

export type DemoMode = "patient" | "admin" | null;

const DEMO_MODE_KEY = "demo_mode";

// Shared state across all hook instances
let sharedDemoMode: DemoMode = null;
const listeners: Set<(mode: DemoMode) => void> = new Set();

// Initialize from localStorage
if (typeof window !== "undefined") {
    const stored = localStorage.getItem(DEMO_MODE_KEY) as DemoMode;
    if (stored === "patient" || stored === "admin") {
        sharedDemoMode = stored;
    }
}

// Notify all listeners of state change
const notifyListeners = (mode: DemoMode) => {
    sharedDemoMode = mode;
    listeners.forEach(listener => listener(mode));
};

export const useDemoMode = () => {
    const [demoMode, setDemoMode] = useState<DemoMode>(sharedDemoMode);
    const [isLoading, setIsLoading] = useState(true);

    // Load demo mode from localStorage on mount and subscribe to changes
    useEffect(() => {
        // Initialize from localStorage
        const stored = localStorage.getItem(DEMO_MODE_KEY) as DemoMode;
        if (stored === "patient" || stored === "admin") {
            if (sharedDemoMode !== stored) {
                sharedDemoMode = stored;
            }
            setDemoMode(stored);
        } else {
            setDemoMode(null);
        }
        setIsLoading(false);

        // Subscribe to shared state changes
        const listener = (mode: DemoMode) => {
            console.log("useDemoMode: Listener notified of change to", mode);
            setDemoMode(mode);
        };
        listeners.add(listener);

        // Cleanup
        return () => {
            listeners.delete(listener);
        };
    }, []);

    // Function to set demo mode - updates shared state
    const setMode = useCallback((mode: DemoMode) => {
        console.log("useDemoMode: Setting mode to", mode);
        try {
            // Update localStorage first
            if (mode === null) {
                localStorage.removeItem(DEMO_MODE_KEY);
            } else {
                localStorage.setItem(DEMO_MODE_KEY, mode);
            }
            // Update shared state and notify all listeners
            notifyListeners(mode);
        } catch (error) {
            console.error("Error setting demo mode:", error);
            // Still update state even if localStorage fails
            notifyListeners(mode);
        }
    }, []);

    const isDemoMode = demoMode !== null;
    const isAdmin = demoMode === "admin";
    const isPatient = demoMode === "patient";

    return {
        demoMode,
        setDemoMode: setMode,
        isDemoMode,
        isAdmin,
        isPatient,
        isLoading,
    };
};
