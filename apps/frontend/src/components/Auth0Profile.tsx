import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-lg font-semibold">Loading...</div>
            </div>
        );
    }

    return (
        isAuthenticated && (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-4">
                <img
                    src={user?.picture}
                    alt={user?.name}
                    className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
                />
                <h2 className="mt-4 text-2xl font-bold text-gray-800">{user?.name}</h2>
                <p className="mt-1 text-md text-gray-600">{user?.email}</p>
            </div>
        )
    );
};

export default Profile;
