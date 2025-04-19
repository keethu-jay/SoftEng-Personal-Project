import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const KioskDirections: React.FC = () => {
    // Parse query params from URL
    const [searchParams] = useSearchParams();
    const destination = searchParams.get("destination") || "";

    // If you want a separate dropdown for the user’s current location:
    const [currentLocation, setCurrentLocation] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // For now, just show an alert. In reality, you might do more here.
        alert(
            `Starting navigation from "${currentLocation}" to "${destination}".`
        );
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <h1 className="text-xl font-bold mb-4">Kiosk Directions</h1>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md p-4 border border-gray-300 rounded-md"
            >
                <div className="mb-4">
                    <label htmlFor="currentLocation" className="block font-semibold mb-1">
                        Current Location
                    </label>
                    <select
                        id="currentLocation"
                        value={currentLocation}
                        onChange={(e) => setCurrentLocation(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    >
                        <option value="">-- Choose Your Current Location --</option>
                        <option value="Main Lobby">Main Lobby</option>
                        <option value="Parking Garage">Parking Garage</option>
                        <option value="Cafeteria">Cafeteria</option>
                        {/* etc. */}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="destination" className="block font-semibold mb-1">
                        Destination
                    </label>
                    <input
                        id="destination"
                        type="text"
                        value={destination}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                    />
                </div>

                {/* Placeholder for map */}
                <div
                    className="mb-4 flex items-center justify-center border border-gray-400"
                    style={{ height: "200px" }}
                >
                    <p>(Map placeholder)</p>
                </div>

                <Button type="submit" className="w-full">
                    Start Navigation
                </Button>
            </form>
        </div>
    );
};

export default KioskDirections;
