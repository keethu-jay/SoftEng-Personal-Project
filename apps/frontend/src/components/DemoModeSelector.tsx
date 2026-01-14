// components/DemoModeSelector.tsx
import React from "react";
import { useDemoMode } from "@/hooks/useDemoMode";

const DemoModeSelector = () => {
    const { demoMode, setDemoMode } = useDemoMode();

    return (
        <div className="bg-yellow-100 border-b-2 border-yellow-400 px-4 py-2 flex items-center justify-center gap-4">
            <span className="text-sm font-semibold text-gray-800">Demo Mode:</span>
            <div className="flex gap-2">
                <button
                    onClick={() => setDemoMode("patient")}
                    className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${
                        demoMode === "patient"
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                    }`}
                >
                    Patient View
                </button>
                <button
                    onClick={() => setDemoMode("admin")}
                    className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${
                        demoMode === "admin"
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                    }`}
                >
                    Admin View
                </button>
                <button
                    onClick={() => setDemoMode(null)}
                    className="px-3 py-1 rounded-md text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                    title="Exit demo mode"
                >
                    ✕
                </button>
            </div>
            <span className="text-xs text-gray-600">Switch between views to explore features</span>
        </div>
    );
};

export default DemoModeSelector;
