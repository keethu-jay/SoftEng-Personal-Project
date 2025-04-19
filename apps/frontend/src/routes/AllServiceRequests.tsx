import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table.tsx";
import axios from "axios";

export interface TranslatorRequest {
    languageFrom: string;
    languageTo: string;
    startDateTime: number;
    endDateTime: number;
}

export interface EquipmentRequest {
    medicalDevice: string;
    signature: string;
    quantity: number;
    startDateTime: string;
    endDateTime: string;
}

export interface SecurityRequest {
    numOfGuards: number;
    securityType: string;
}

export interface SanitationRequest {
    type: string;
    status: string;
}

export interface ServiceRequest {
    requestId: number;
    createdAt: number;
    updatedAt: number;
    assignedEmployeeId: number;
    translatorRequest: TranslatorRequest;
    equipmentRequest: EquipmentRequest;
    securityRequest: SecurityRequest;
    sanitationRequest: SanitationRequest;
    requestStatus: string;
    priority: string;
    employeeRequestedById: number;
    departmentUnderId: number;
    comments: string;
    roomNum: string;
    // employeeName: string; // For later use
}

export default function ShowAllRequests() {
    const [dataTranslator, setDataTranslator] = useState<ServiceRequest[]>([]);
    const [dataEquipment, setDataEquipment] = useState<ServiceRequest[]>([]);
    const [dataSecurity, setDataSecurity] = useState<ServiceRequest[]>([]);
    const [dataSanitation, setDataSanitation] = useState<ServiceRequest[]>([]);

    const fetchData = async () => {
        try {
            const translatorResponse = await axios.get('/api/servicereqs/translator');
            setDataTranslator(translatorResponse.data);

            const equipmentResponse = await axios.get('/api/servicereqs/equipment');
            setDataEquipment(equipmentResponse.data);

            const securityResponse = await axios.get('/api/servicereqs/security');
            setDataSecurity(securityResponse.data);

            const sanitationResponse = await axios.get('/api/servicereqs/sanitation');
            setDataSanitation(sanitationResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="min-h-screen w-full p-6 bg-white">
            <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold">Service Request Database</h2>
            </div>

            {/* Translator Requests */}
            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4">Translator Requests</h2>
                <Table className="table-auto w-full border border-gray-200">
                    <TableHeader>
                        <TableRow className="bg-gray-100">
                            <TableHead className="text-center py-2 border-b">Request ID</TableHead>
                            <TableHead className="text-center py-2 border-b">Requested By</TableHead>
                            {/*<TableHead className="text-center py-2 border-b">Employee Name</TableHead>*/}
                            <TableHead className="text-center py-2 border-b">Assigned Employee</TableHead>
                            <TableHead className="text-center py-2 border-b">Department</TableHead>
                            <TableHead className="text-center py-2 border-b">Room Number</TableHead>
                            <TableHead className="text-center py-2 border-b">Language To</TableHead>
                            <TableHead className="text-center py-2 border-b">Language From</TableHead>
                            <TableHead className="text-center py-2 border-b">Comments</TableHead>
                            <TableHead className="text-center py-2 border-b">Priority</TableHead>
                            <TableHead className="text-center py-2 border-b">Status</TableHead>
                            <TableHead className="text-center py-2 border-b">Created At</TableHead>
                            <TableHead className="text-center py-2 border-b">Updated At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dataTranslator.map((element, i) => (
                            <TableRow key={i} className="even:bg-gray-50 hover:bg-gray-100">
                                <TableCell className="text-center py-2 border-b">{element.requestId}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.employeeRequestedById}</TableCell>
                                {/*<TableCell className="text-center py-2 border-b">{element.employeeName}</TableCell>*/}
                                <TableCell className="text-center py-2 border-b">{element.assignedEmployeeId}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.departmentUnderId}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.roomNum}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.translatorRequest.languageTo}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.translatorRequest.languageFrom}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.comments}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.priority}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.requestStatus}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.createdAt}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.updatedAt}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>

            {/* Equipment Requests */}
            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4">Equipment Requests</h2>
                <Table className="table-auto w-full border border-gray-200">
                    <TableHeader>
                        <TableRow className="bg-gray-100">
                            <TableHead className="text-center py-2 border-b">Request ID</TableHead>
                            <TableHead className="text-center py-2 border-b">Requested By</TableHead>
                            {/*<TableHead className="text-center py-2 border-b">Employee Name</TableHead>*/}
                            <TableHead className="text-center py-2 border-b">Assigned Employee</TableHead>
                            <TableHead className="text-center py-2 border-b">Department</TableHead>
                            <TableHead className="text-center py-2 border-b">Room Number</TableHead>
                            <TableHead className="text-center py-2 border-b">Medical Device</TableHead>
                            <TableHead className="text-center py-2 border-b">Quantity</TableHead>
                            <TableHead className="text-center py-2 border-b">Signature</TableHead>
                            <TableHead className="text-center py-2 border-b">Comments</TableHead>
                            <TableHead className="text-center py-2 border-b">Priority</TableHead>
                            <TableHead className="text-center py-2 border-b">Status</TableHead>
                            <TableHead className="text-center py-2 border-b">Created At</TableHead>
                            <TableHead className="text-center py-2 border-b">Updated At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dataEquipment.map((element, j) => (
                            <TableRow key={j} className="even:bg-gray-50 hover:bg-gray-100">
                                <TableCell className="text-center py-2 border-b">{element.requestId}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.employeeRequestedById}</TableCell>
                                {/*<TableCell className="text-center py-2 border-b">{element.employeeName}</TableCell>*/}
                                <TableCell className="text-center py-2 border-b">{element.assignedEmployeeId}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.departmentUnderId}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.roomNum}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.equipmentRequest.medicalDevice}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.equipmentRequest.quantity}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.equipmentRequest.signature}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.comments}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.priority}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.requestStatus}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.createdAt}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.updatedAt}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>

            {/* Security Requests */}
            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4">Security Requests</h2>
                <Table className="table-auto w-full border border-gray-200">
                    <TableHeader>
                        <TableRow className="bg-gray-100">
                            <TableHead className="text-center py-2 border-b">Request ID</TableHead>
                            <TableHead className="text-center py-2 border-b">Requested By</TableHead>
                            {/*<TableHead className="text-center py-2 border-b">Employee Name</TableHead>*/}
                            <TableHead className="text-center py-2 border-b">Assigned Employee</TableHead>
                            <TableHead className="text-center py-2 border-b">Department</TableHead>
                            <TableHead className="text-center py-2 border-b">Room Number</TableHead>
                            <TableHead className="text-center py-2 border-b">Security Type</TableHead>
                            <TableHead className="text-center py-2 border-b">Guards Needed</TableHead>
                            <TableHead className="text-center py-2 border-b">Comments</TableHead>
                            <TableHead className="text-center py-2 border-b">Priority</TableHead>
                            <TableHead className="text-center py-2 border-b">Status</TableHead>
                            <TableHead className="text-center py-2 border-b">Created At</TableHead>
                            <TableHead className="text-center py-2 border-b">Updated At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dataSecurity.map((element, j) => (
                            <TableRow key={j} className="even:bg-gray-50 hover:bg-gray-100">
                                <TableCell className="text-center py-2 border-b">{element.requestId}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.employeeRequestedById}</TableCell>
                                {/*<TableCell className="text-center py-2 border-b">{element.employeeName}</TableCell>*/}
                                <TableCell className="text-center py-2 border-b">{element.assignedEmployeeId}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.departmentUnderId}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.roomNum}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.securityRequest.securityType}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.securityRequest.numOfGuards}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.comments}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.priority}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.requestStatus}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.createdAt}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.updatedAt}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>

            {/* Sanitation Requests */}
            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4">Sanitation Requests</h2>
                <Table className="table-auto w-full border border-gray-200">
                    <TableHeader>
                        <TableRow className="bg-gray-100">
                            <TableHead className="text-center py-2 border-b">Request ID</TableHead>
                            <TableHead className="text-center py-2 border-b">Requested By</TableHead>
                            {/*<TableHead className="text-center py-2 border-b">Employee Name</TableHead>*/}
                            <TableHead className="text-center py-2 border-b">Assigned Employee</TableHead>
                            <TableHead className="text-center py-2 border-b">Department</TableHead>
                            <TableHead className="text-center py-2 border-b">Room Number</TableHead>
                            <TableHead className="text-center py-2 border-b">Sanitation Type</TableHead>
                            <TableHead className="text-center py-2 border-b">Room Status</TableHead>
                            <TableHead className="text-center py-2 border-b">Comments</TableHead>
                            <TableHead className="text-center py-2 border-b">Priority</TableHead>
                            <TableHead className="text-center py-2 border-b">Status</TableHead>
                            <TableHead className="text-center py-2 border-b">Created At</TableHead>
                            <TableHead className="text-center py-2 border-b">Updated At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dataSanitation.map((element, i) => (
                            <TableRow key={i} className="even:bg-gray-50 hover:bg-gray-100">
                                <TableCell className="text-center py-2 border-b">{element.requestId}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.employeeRequestedById}</TableCell>
                                {/*<TableCell className="text-center py-2 border-b">{element.employeeName}</TableCell>*/}
                                <TableCell className="text-center py-2 border-b">{element.assignedEmployeeId}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.departmentUnderId}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.roomNum}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.sanitationRequest.type}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.sanitationRequest.status}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.comments}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.priority}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.requestStatus}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.createdAt}</TableCell>
                                <TableCell className="text-center py-2 border-b">{element.updatedAt}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
        </div>
    );
}


