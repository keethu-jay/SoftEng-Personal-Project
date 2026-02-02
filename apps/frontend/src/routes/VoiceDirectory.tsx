import React, { useEffect, useState } from "react";
import apiClient from "@/lib/axios";
import { API_ROUTES } from "common/src/constants.ts";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Separator } from "@/components/ui/separator.tsx";

/**
 * Type definition for department data structure.
 */
type Department = {
    departmentId: number;
    name: string;
    floorNum: number;
    room: string;
    building: string;
    telephone?: string | null;
    hours?: string | null;
};

/**
 * Voice Directory component - displays a searchable list of all hospital departments.
 * 
 * This component:
 * - Fetches all departments from the backend API
 * - Provides search functionality to filter departments
 * - Displays department information in a readable format
 * - Is accessible for both patients and staff (including voice/kiosk interfaces)
 * 
 * Features:
 * - Real-time search filtering by department name, building, or room
 * - Loading states during data fetch
 * - Empty state handling
 * - Responsive design for various screen sizes
 */
const VoiceDirectory: React.FC = () => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    /**
     * Fetches all departments from the backend API on component mount.
     * Maps the API response to the Department type structure.
     */
    useEffect(() => {
        const fetchDepartments = async () => {
            setLoading(true);
            try {
                const res = await apiClient.get(`${API_ROUTES.DEPARTMENT}/all`);
                const data = Array.isArray(res.data) ? res.data : [];
                
                const mappedDepartments = data.map((d: Record<string, unknown>) => ({
                    departmentId: d.departmentId,
                    name: d.name,
                    floorNum: d.floorNum,
                    room: d.room,
                    building: d.building,
                    telephone: d.telephone ?? null,
                    hours: d.hours ?? null,
                }));
                
                setDepartments(mappedDepartments);
            } catch (err) {
                console.error("Failed to load departments for voice directory:", err);
                setDepartments([]);
            } finally {
                setLoading(false);
            }
        };
        
        fetchDepartments();
    }, []);

    /**
     * Filters departments based on the search query.
     * Searches in department name, building, and room fields.
     * 
     * @param {Department} d - Department to check
     * @returns {boolean} True if department matches search query
     */
    const filtered = departments.filter((d) => {
        const q = search.toLowerCase();
        return (
            d.name.toLowerCase().includes(q) ||
            d.building.toLowerCase().includes(q) ||
            d.room.toLowerCase().includes(q)
        );
    });

    return (
        <div className="min-h-screen w-full p-4 sm:p-6 lg:p-8 bg-white">
            <div className="max-w-4xl mx-auto">
                {/* Header section */}
                <div className="mb-6">
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#03045e] mb-2">
                        Directory
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Browse all departments in the hospital. This view is read-only and is
                        suitable for both patients and staff (including voice or kiosk interfaces).
                    </p>
                </div>

                {/* Search bar */}
                <div className="mb-4 flex flex-col sm:flex-row gap-3 items-center">
                    <Input
                        placeholder="Search by department, building, or room..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full sm:flex-1"
                    />
                    <Button
                        variant="outline"
                        onClick={() => setSearch("")}
                        disabled={!search}
                    >
                        Clear
                    </Button>
                </div>

                <Separator className="mb-4" />

                {/* Department list */}
                {loading ? (
                    <div className="text-center text-gray-500 py-8">
                        Loading departments...
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                        No departments match your search.
                    </div>
                ) : (
                    <ul className="space-y-3">
                        {filtered.map((d) => (
                            <li
                                key={d.departmentId}
                                className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="font-semibold text-[#03045e]">
                                            {d.name}
                                        </h2>
                                        <p className="text-xs text-gray-500">
                                            Dept ID: {d.departmentId}
                                        </p>
                                    </div>
                                    <span className="text-xs text-gray-600">
                                        Floor {d.floorNum}, Room {d.room}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-700 mt-1">
                                    Building: {d.building || "N/A"}
                                </p>
                                {d.telephone && (
                                    <p className="text-sm text-gray-700">
                                        Phone: {d.telephone}
                                    </p>
                                )}
                                {d.hours && (
                                    <p className="text-xs text-gray-500">
                                        Hours: {d.hours}
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default VoiceDirectory;
