import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {GetDirectory} from "@/database/csv-export.ts";
import {updateDirectory} from "@/database/csv-import.ts";
import { useState, useEffect } from 'react';
import { API_ROUTES } from "common/src/constants.ts";
import apiClient from "@/lib/axios";

type Department = {
    departmentId: number;
    name: string;
    floorNum: number;
    room: string;
    building: string;
}

type Hospital = {
    hospitalId: number;
    name: string;
}

const AdminDatabase: React.FC = () => {
    const [departments, currDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = React.useState(true); // true means it needs to reload
    const [hospitalsLoading, setHospitalsLoading] = React.useState(true);
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [selectedHospital, setSelectedHospital] = useState<number | null>(null); // null means "All"


    // Fetch hospitals on mount
    useEffect(() => {
        const fetchHospitals = async () => {
            setHospitalsLoading(true);
            try {
                const response = await apiClient.get(API_ROUTES.DEPARTMENT);
                const hospitalsData = Array.isArray(response.data) ? response.data : [];
                setHospitals(hospitalsData.map((h: any) => ({
                    hospitalId: h.hospitalId,
                    name: h.name
                })));
                console.log(`Loaded ${hospitalsData.length} hospitals`);
            } catch (error) {
                console.error('Error fetching hospitals:', error);
                setHospitals([]);
            } finally {
                setHospitalsLoading(false);
            }
        };
        fetchHospitals();
    }, []);

    //getting department data for display
    const getDepartments = async() => {
        try{
            let response;
            if (selectedHospital === null) {
                response = await apiClient.get(API_ROUTES.DEPARTMENT + '/all');
            } else {
                response = await apiClient.get(`${API_ROUTES.DEPARTMENT}/${selectedHospital}/all`);
            }
            // Ensure we always have an array
            const depts = Array.isArray(response.data) ? response.data : [];
            currDepartments(depts);
            setLoading(false);
            console.log(`Loaded ${depts.length} departments`);
        }catch (error) {
            console.error('Error fetching departments:', error);
            currDepartments([]);
            setLoading(false);
        }
    }
    useEffect(() => {
        getDepartments().then();
    }, [loading, selectedHospital]);
    //makes sure that the display updates everytime new data is imported
    const  importOnClick = async () => {
        await updateDirectory();
        await setLoading(true);
    }
    return (
        <div className="min-h-screen w-full p-4 sm:p-6 lg:p-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#03045e] mb-2">Department Database</h1>
                    <p className="text-gray-600 text-sm sm:text-base">Manage hospital departments and directory information</p>
                </div>

                {/* Controls Section */}
                <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-wrap">
                        {/* Hospital selection buttons */}
                        {hospitalsLoading ? (
                            <div className="text-sm text-gray-500">Loading hospitals...</div>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {hospitals.map((hospital) => (
                                    <Button
                                        key={hospital.hospitalId}
                                        variant={selectedHospital === hospital.hospitalId ? "default" : "outline"}
                                        className={selectedHospital === hospital.hospitalId ? "bg-[#0077b6] text-white hover:bg-[#005a8a]" : ""}
                                        onClick={() => setSelectedHospital(hospital.hospitalId)}
                                    >
                                        {hospital.name}
                                    </Button>
                                ))}
                                <Button
                                    variant={selectedHospital === null ? "default" : "outline"}
                                    className={selectedHospital === null ? "bg-[#0077b6] text-white hover:bg-[#005a8a]" : ""}
                                    onClick={() => setSelectedHospital(null)}
                                >
                                    All
                                </Button>
                            </div>
                        )}

                        <Separator orientation="vertical" className="h-8 hidden sm:block" />
                        
                        {/* Export/Import buttons and file input */}
                        <div className="flex flex-wrap items-center gap-3 flex-1">
                            <Button onClick={() => GetDirectory()} variant="outline">
                                Export as CSV
                            </Button>
                            <div className="flex-1 min-w-[200px]">
                                <Input 
                                    type="file" 
                                    accept=".csv" 
                                    className="w-full" 
                                    id="directory"
                                />
                            </div>
                            <Button onClick={() => importOnClick()}>
                                Import CSV
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Data table */}
                <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-[#0077b6] text-white">
                                <TableHead className="px-4 py-3 font-semibold">Department ID</TableHead>
                                <TableHead className="px-4 py-3 font-semibold">Name</TableHead>
                                <TableHead className="px-4 py-3 font-semibold">Floor</TableHead>
                                <TableHead className="px-4 py-3 font-semibold">Room</TableHead>
                                <TableHead className="px-4 py-3 font-semibold">Building</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                        Loading departments...
                                    </TableCell>
                                </TableRow>
                            ) : departments.length > 0 ? (
                                departments.map((department, i) => (
                                    <TableRow key={i} className="even:bg-gray-50 hover:bg-[#90e0ef]/20 transition-colors">
                                        <TableCell className="px-4 py-3 text-sm">{department.departmentId}</TableCell>
                                        <TableCell className="px-4 py-3 text-sm font-medium">{department.name}</TableCell>
                                        <TableCell className="px-4 py-3 text-sm">{department.floorNum}</TableCell>
                                        <TableCell className="px-4 py-3 text-sm">{department.room}</TableCell>
                                        <TableCell className="px-4 py-3 text-sm">{department.building}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                        No departments found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default AdminDatabase;



