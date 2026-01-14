import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table.tsx";
import apiClient from "../lib/axios";
import { API_ROUTES } from "common/src/constants.ts";

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
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch all request types in parallel for faster loading
            const [translatorResponse, equipmentResponse, securityResponse, sanitationResponse] = await Promise.all([
                apiClient.get(API_ROUTES.SERVICEREQS + '/translator'),
                apiClient.get(API_ROUTES.SERVICEREQS + '/equipment'),
                apiClient.get(API_ROUTES.SERVICEREQS + '/security'),
                apiClient.get(API_ROUTES.SERVICEREQS + '/sanitation'),
            ]);

            setDataTranslator(Array.isArray(translatorResponse.data) ? translatorResponse.data : []);
            setDataEquipment(Array.isArray(equipmentResponse.data) ? equipmentResponse.data : []);
            setDataSecurity(Array.isArray(securityResponse.data) ? securityResponse.data : []);
            setDataSanitation(Array.isArray(sanitationResponse.data) ? sanitationResponse.data : []);

            console.log(`Loaded: ${translatorResponse.data?.length || 0} translator, ${equipmentResponse.data?.length || 0} equipment, ${securityResponse.data?.length || 0} security, ${sanitationResponse.data?.length || 0} sanitation requests`);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Set empty arrays on error so UI shows "No requests found" instead of hanging
            setDataTranslator([]);
            setDataEquipment([]);
            setDataSecurity([]);
            setDataSanitation([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="min-h-screen w-full p-4 sm:p-6 lg:p-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-[#03045e] mb-2">Service Request Database</h1>
                        <p className="text-gray-600 text-sm sm:text-base">View and manage all service requests across different categories</p>
                    </div>
                    <button
                        onClick={fetchData}
                        className="px-4 py-2 bg-[#0077b6] text-white rounded-lg hover:bg-[#005a8a] transition-colors"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Refresh'}
                    </button>
                </div>

            {loading && (
                <div className="text-center py-8 text-gray-500">
                    Loading service requests...
                </div>
            )}

            {/* Translator Requests */}
            <section className="mb-12">
                <div className="mb-4 pb-2 border-b-2 border-[#0077b6]">
                    <h2 className="text-2xl font-semibold text-[#03045e]">Translator Requests</h2>
                </div>
                <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200">
                    <Table className="table-auto w-full">
                        <TableHeader>
                            <TableRow className="bg-[#0077b6] text-white">
                                <TableHead className="text-center py-3 px-4 font-semibold">Request ID</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Requested By</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Assigned Employee</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Department</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Room Number</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Language To</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Language From</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Comments</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Priority</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Status</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Created At</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Updated At</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {!loading && dataTranslator.length > 0 ? (
                                dataTranslator.map((element, i) => (
                                    <TableRow key={i} className="even:bg-gray-50 hover:bg-[#90e0ef]/20 transition-colors">
                                        <TableCell className="text-center py-3 px-4 text-sm">{element.requestId}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{element.employeeRequestedById}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{element.assignedEmployeeId}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{element.departmentUnderId}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{element.roomNum}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{element.translatorRequest.languageTo}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{element.translatorRequest.languageFrom}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm max-w-xs truncate" title={element.comments}>{element.comments || '-'}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                element.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
                                                element.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-green-100 text-green-800'
                                            }`}>
                                                {element.priority}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                element.requestStatus === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                element.requestStatus === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {element.requestStatus}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{new Date(element.createdAt).toLocaleString()}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{new Date(element.updatedAt).toLocaleString()}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={12} className="text-center py-8 text-gray-500">
                                        No translator requests found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </section>

            {/* Equipment Requests */}
            <section className="mb-12">
                <div className="mb-4 pb-2 border-b-2 border-[#0077b6]">
                    <h2 className="text-2xl font-semibold text-[#03045e]">Equipment Requests</h2>
                </div>
                <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200">
                    <Table className="table-auto w-full">
                        <TableHeader>
                            <TableRow className="bg-[#0077b6] text-white">
                                <TableHead className="text-center py-3 px-4 font-semibold">Request ID</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Requested By</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Assigned Employee</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Department</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Room Number</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Medical Device</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Quantity</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Signature</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Comments</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Priority</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Status</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Created At</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Updated At</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dataEquipment.length > 0 ? (
                                dataEquipment.map((element, j) => (
                                    <TableRow key={j} className="even:bg-gray-50 hover:bg-[#90e0ef]/20 transition-colors">
                                        <TableCell className="text-center py-3 px-4 text-sm">{element.requestId}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{element.employeeRequestedById}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{element.assignedEmployeeId}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{element.departmentUnderId}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{element.roomNum}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{element.equipmentRequest.medicalDevice}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{element.equipmentRequest.quantity}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{element.equipmentRequest.signature || '-'}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm max-w-xs truncate" title={element.comments}>{element.comments || '-'}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                element.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
                                                element.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-green-100 text-green-800'
                                            }`}>
                                                {element.priority}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                element.requestStatus === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                element.requestStatus === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {element.requestStatus}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{new Date(element.createdAt).toLocaleString()}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{new Date(element.updatedAt).toLocaleString()}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={13} className="text-center py-8 text-gray-500">
                                        No equipment requests found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </section>

            {/* Security Requests */}
            <section className="mb-12">
                <div className="mb-4 pb-2 border-b-2 border-[#0077b6]">
                    <h2 className="text-2xl font-semibold text-[#03045e]">Security Requests</h2>
                </div>
                <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200">
                    <Table className="table-auto w-full">
                        <TableHeader>
                            <TableRow className="bg-[#0077b6] text-white">
                                <TableHead className="text-center py-3 px-4 font-semibold">Request ID</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Requested By</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Assigned Employee</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Department</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Room Number</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Security Type</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Guards Needed</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Comments</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Priority</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Status</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Created At</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Updated At</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dataSecurity.length > 0 ? (
                                dataSecurity.map((element, j) => (
                                    <TableRow key={j} className="even:bg-gray-50 hover:bg-[#90e0ef]/20 transition-colors">
                                        <TableCell className="text-center py-3 px-4 text-sm">{element.requestId}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{element.employeeRequestedById}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{element.assignedEmployeeId}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{element.departmentUnderId}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{element.roomNum}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{element.securityRequest.securityType}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{element.securityRequest.numOfGuards}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm max-w-xs truncate" title={element.comments}>{element.comments || '-'}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                element.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
                                                element.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-green-100 text-green-800'
                                            }`}>
                                                {element.priority}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                element.requestStatus === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                element.requestStatus === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {element.requestStatus}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{new Date(element.createdAt).toLocaleString()}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{new Date(element.updatedAt).toLocaleString()}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={12} className="text-center py-8 text-gray-500">
                                        No security requests found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </section>

            {/* Sanitation Requests */}
            <section className="mb-12">
                <div className="mb-4 pb-2 border-b-2 border-[#0077b6]">
                    <h2 className="text-2xl font-semibold text-[#03045e]">Sanitation Requests</h2>
                </div>
                <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200">
                    <Table className="table-auto w-full">
                        <TableHeader>
                            <TableRow className="bg-[#0077b6] text-white">
                                <TableHead className="text-center py-3 px-4 font-semibold">Request ID</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Requested By</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Assigned Employee</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Department</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Room Number</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Sanitation Type</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Room Status</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Comments</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Priority</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Status</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Created At</TableHead>
                                <TableHead className="text-center py-3 px-4 font-semibold">Updated At</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dataSanitation.length > 0 ? (
                                dataSanitation.map((element, i) => (
                                    <TableRow key={i} className="even:bg-gray-50 hover:bg-[#90e0ef]/20 transition-colors">
                                        <TableCell className="text-center py-3 px-4 text-sm">{element.requestId}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{element.employeeRequestedById}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{element.assignedEmployeeId}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{element.departmentUnderId}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{element.roomNum}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{element.sanitationRequest.type}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{element.sanitationRequest.status}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm max-w-xs truncate" title={element.comments}>{element.comments || '-'}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                element.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
                                                element.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-green-100 text-green-800'
                                            }`}>
                                                {element.priority}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                element.requestStatus === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                element.requestStatus === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {element.requestStatus}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{new Date(element.createdAt).toLocaleString()}</TableCell>
                                        <TableCell className="text-center py-3 px-4 text-sm">{new Date(element.updatedAt).toLocaleString()}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={12} className="text-center py-8 text-gray-500">
                                        No sanitation requests found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </section>
            </div>
        </div>
    );
}


