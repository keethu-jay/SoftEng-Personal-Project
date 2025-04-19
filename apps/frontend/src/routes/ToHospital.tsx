import React, {useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GGMap from "@/GoogleMap/GoogleMap.tsx";

const ToHospital: React.FC = () => {

    const startInput = useRef<HTMLInputElement | null>(null);
    const locationDropdown = useRef<HTMLSelectElement | null>(null);

    const navigate = useNavigate();

    // Start & End inputs
    const [startLocation, setStartLocation] = useState("");
    const [endLocation, setEndLocation] = useState("Chestnut Hill");

    return (
        <div className="min-h-screen bg-white">
            {/* Top Buttons */}
            <header className="p-4 bg-white border-b border-gray-200 flex items-center justify-center">
                <div className="flex gap-4">
                    <Button onClick={() => navigate("/to-hospital")}>To Hospital</Button>
                    <Button onClick={() => navigate("/within-hospital")}>
                        Within Hospital
                    </Button>
                </div>
            </header>

            <main className="px-6 py-4">
                <div className="grid grid-cols-10 gap-6">
                    <div className="col-span-10 md:col-span-3 border rounded-md p-4 bg-white shadow">
                        {/* Start location input */}
                        <div className="mb-4">
                            <label className="block font-semibold mb-1">Start Location</label>
                            <input
                                ref={startInput}
                                id="origin-input"
                                type="text"
                                value={startLocation}
                                onChange={(e) => setStartLocation(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Enter your starting address"
                            />
                        </div>

                        {/* End location input (default = "Chestnut Hill") */}
                        <div className="mb-4">
                            <label className="block font-semibold mb-1">Destination</label>

                            <select name="location" ref={locationDropdown}>
                                <option value="Chestnut Hill">Chestnut Hill</option>
                                <option value="20 Patriot Place">20 Patriot Place</option>
                                <option value="22 Patriot Place">22 Patriot Place</option>
                            </select>
                            {/*<input*/}
                            {/*    type="text"*/}
                            {/*    value={endLocation}*/}
                            {/*    onChange={(e) => setEndLocation(e.target.value)}*/}
                            {/*    className="w-full p-2 border border-gray-300 rounded-md"*/}
                            {/*    placeholder="Chestnut Hill"*/}
                            {/*/>*/}
                        </div>

                        {/* Mode selector */}
                        <div id="mode-selector" className="controls flex  space-x-4 w-full">
                            <div>
                                <input type="radio" name="type" id="changemode-walking"/>
                                <label htmlFor="changemode-walking">Walking</label>
                            </div>

                            <div>
                                <input type="radio" name="type" id="changemode-transit"/>
                                <label htmlFor="changemode-transit">Transit</label>
                            </div>

                            <div>
                                <input type="radio" name="type" id="changemode-driving" />
                                <label htmlFor="changemode-driving">Driving</label>
                            </div>

                        </div>
                    </div>

                    {/* Map placeholder */}
                    <div
                        className="col-span-10 md:col-span-7 border rounded-md p-4 bg-white shadow flex items-center justify-center">
                        {/*<p className="text-gray-500">(Map goes here)</p>*/}
                        {/*<GGMap startInput={startInput} locationDropdown={locationDropdown}></GGMap>*/}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ToHospital;
