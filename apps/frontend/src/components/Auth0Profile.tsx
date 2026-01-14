import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDemoMode } from "@/hooks/useDemoMode";

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { isDemoMode } = useDemoMode();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-white">
                <div className="text-lg font-semibold text-[#03045e]">Loading...</div>
            </div>
        );
    }

    // Show profile for authenticated users or demo mode
    if (!isAuthenticated && !isDemoMode) {
        return (
            <div className="flex justify-center items-center h-screen bg-white">
                <div className="text-lg font-semibold text-[#03045e]">Please log in to view your profile</div>
            </div>
        );
    }

    // Demo mode user info
    const displayName = isDemoMode ? (isDemoMode === "admin" ? "Demo Admin User" : "Demo Patient User") : user?.name;
    const displayEmail = isDemoMode ? "demo@example.com" : user?.email;
    const displayPicture = user?.picture || null;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 py-12">
            <div className="max-w-md w-full text-center space-y-6">
                {displayPicture && (
                    <div className="flex justify-center">
                        <img
                            src={displayPicture}
                            alt={displayName || "User"}
                            className="w-32 h-32 rounded-full border-4 border-[#0077b6] shadow-xl mb-2"
                        />
                    </div>
                )}
                {!displayPicture && (
                    <div className="flex justify-center">
                        <div className="w-32 h-32 rounded-full border-4 border-[#0077b6] shadow-xl mb-2 bg-[#90e0ef] flex items-center justify-center">
                            <span className="text-4xl font-bold text-[#03045e]">
                                {displayName?.charAt(0).toUpperCase() || "U"}
                            </span>
                        </div>
                    </div>
                )}
                
                <div className="space-y-2">
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#03045e]">{displayName}</h1>
                    <p className="text-lg text-[#0077b6] font-medium">{displayEmail}</p>
                </div>
                
                {isDemoMode && (
                    <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[#90e0ef]/20 rounded-lg border border-[#0077b6]/30">
                        <span className="text-sm font-medium text-[#03045e]">
                            Demo Mode - {isDemoMode === "admin" ? "Admin" : "Patient"} View
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
