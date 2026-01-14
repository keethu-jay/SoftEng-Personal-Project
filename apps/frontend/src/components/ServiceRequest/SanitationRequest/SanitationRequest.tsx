import React, { FormEvent, useState } from "react";
import apiClient from "@/lib/axios";
import { Button } from "@/components/ui/button.tsx";
import {ScrollArea} from "@/components/ui/scrollarea.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { API_ROUTES } from "common/src/constants.ts";

import ReturnSanitationRequest from "@/components/ServiceRequest/SanitationRequest/ReturnSanitationRequest.tsx";
import SubmissionReqPopup from "@/components/SubmissionReqPopup.tsx";

type SanitationRequestForm = {
    roomNum: string;
    priority: string;
    type: string;
    status: string;
    comments: string;
    requestStatus: string;
    employeeRequestedById: number;
    departmentUnderId: number;
    employeeName: string;
};

export default function SanitationRequest() {
    const [form, setForm] = useState<SanitationRequestForm>({
        roomNum: '',
        priority: '',
        type: '',
        status: '',
        comments: '',
        requestStatus: '',
        employeeRequestedById: 0,
        departmentUnderId: 0,
        employeeName: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(false);

        // For demo: fill in demo IDs and defaults if omitted
        const payload = {
            ...form,
            employeeRequestedById: form.employeeRequestedById || 1,
            departmentUnderId: form.departmentUnderId || 1,
            requestStatus: form.requestStatus || 'Unassigned',
            priority: form.priority || 'LOW',
        };

        apiClient
            .post(API_ROUTES.SERVICEREQS + "/sanitation", payload)
            .then((response) => {
                console.log('Sanitation request created:', response.data);
                setSubmitted(true);
            })
            .catch((err) => {
                console.error("Error submitting sanitation request:", err);
                alert("Failed to submit request. Check console for details.");
            });
    };
    return (
        <>
            {!submitted ?
                <ScrollArea className="max-h-[75vh] overflow-y-auto pr-3 w-full max-w-screen-md mx-auto bg-white rounded-3xl">
                <div className="flex flex-col gap-4 px-4 py-6 w-full max-w-screen-md mx-auto">
                    <div className="bg-[#0077b6]/90 text-white rounded-3xl px-5 py-3 w-full shadow-lg border border-[#03045e]/60">
                        <h2 className="text-2xl sm:text-3xl font-bold text-left">Request Sanitation</h2>
                    </div>
                    <form onSubmit={onSubmit} className="flex flex-col space-y-3">

                        <div>
                            <Label className="pt-4 pb-2" htmlFor="employeeId">Employee ID (optional)</Label>
                            <Input
                                className = "w-80 h-10 rounded-full border-2 border-[#0077b6] bg-white px-4 py-2 transition-all duration-300 focus:border-[#00b4d8] focus:ring-2 focus:ring-[#90e0ef]/50 focus:outline-none shadow-sm hover:shadow-md"
                                type="number"
                                id="employeeId"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        employeeRequestedById: Number(e.target.value),
                                    })
                                }
                            />
                        </div>

                        <div>
                            <Label className="pt-4 pb-2" htmlFor="employeeName">Employee Name (optional)</Label>
                            <Input
                                type="text"
                                id="employeeName"
                                // className='border border-gray-300 rounded-md p-2'
                                className = "w-80 h-10 rounded-full border-2 border-[#0077b6] bg-white px-4 py-2 transition-all duration-300 focus:border-[#00b4d8] focus:ring-2 focus:ring-[#90e0ef]/50 focus:outline-none shadow-sm hover:shadow-md"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        employeeName: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div>
                            <Label className="pt-4 pb-2" htmlFor="department">Department (optional)</Label>
                            <select
                                id="department"
                                // className='border border-gray-300 rounded-md p-2'
                                className = "w-80 h-10 rounded-full border-2 border-[#0077b6] bg-white px-4 py-2 transition-all duration-300 focus:border-[#00b4d8] focus:ring-2 focus:ring-[#90e0ef]/50 focus:outline-none shadow-sm hover:shadow-md"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        departmentUnderId: Number(e.target.value),
                                    })
                                }>
                                <option value="">-- Select Department --</option>
                                <option value="1">Allergy and Clinical Immunology Floor 3</option>
                                <option value="2">Allergy and Clinical Immunology Floor 5</option>
                                <option value="3">Backup Child Care Center</option>
                                <option value="4">Brigham Dermatology Associates (BDA)</option>
                                <option value="5">Brigham Obstetrics and Gynecology Group (BOGG)	</option>
                                <option value="6">Brigham Physicians Group (BPG) Floor 4</option>
                                <option value="7">Brigham Physicians Group (BPG) Floor 5</option>
                                <option value="8">Brigham Psychiatric Specialities</option>
                                <option value="9">Center for Pain Medicine	</option>
                                <option value="10">Crohn's and Colitis Center</option>
                                <option value="11">Endoscopy Center</option>
                                <option value="12">Gretchen S. and Edward A. Fish Center for Women's Health</option>
                                <option value="13">Laboratory</option>
                                <option value="14">Multi-Specialty Clinic</option>
                                <option value="15">Osher Clinical Center for Integrative Health</option>
                                <option value="16">Patient Financial Services	</option>
                                <option value="17">Pharmacy</option>
                                <option value="18">Radiology</option>
                                <option value="19">Radiology, MRI/CT Scan</option>
                                <option value="20">Rehabilitation Services</option>
                            </select>
                        </div>
                        <div>
                        <Label className="pt-4 pb-2" htmlFor="roomNum">Room Number</Label>
                        <Input
                            required
                            type="text"
                            className = "w-80 h-10 rounded-full border-2 border-[#0077b6] bg-white px-4 py-2 transition-all duration-300 focus:border-[#00b4d8] focus:ring-2 focus:ring-[#90e0ef]/50 focus:outline-none shadow-sm hover:shadow-md"
                            id="roomNum"
                            onChange={(e) =>
                                setForm({ ...form, roomNum: e.target.value })
                            }
                        />
                        </div>
                        <div>
                        <Label className="pt-4 pb-2" htmlFor="type">Sanitation Type</Label>
                        <select
                            required
                            id="type"
                            // className="border border-gray-300 rounded-md p-2"
                            className = "w-80 h-10 rounded-full border-2 border-[#0077b6] bg-white px-4 py-2 transition-all duration-300 focus:border-[#00b4d8] focus:ring-2 focus:ring-[#90e0ef]/50 focus:outline-none shadow-sm hover:shadow-md"
                            onChange={(e) =>
                                setForm({ ...form, type: e.target.value })
                            }
                        >
                            <option value="">-- Select Type --</option>
                            <option value="GENERAL">General</option>
                            <option value="DISINFECT">Disinfect</option>
                            <option value="DEEP_CLEANING">Deep Cleaning</option>
                            <option value="WASTE_REMOVAL">Waste Removal</option>
                            <option value="PEST_CONTROL">Pest Control</option>
                        </select>
                        </div>

                        <div>
                        <Label className="pt-4 pb-2" htmlFor="status">Room Status</Label>
                        <select
                            required
                            id="status"
                            // className="border border-gray-300 rounded-md p-2"
                            className = "w-80 h-10 rounded-full border-2 border-[#0077b6] bg-white px-4 py-2 transition-all duration-300 focus:border-[#00b4d8] focus:ring-2 focus:ring-[#90e0ef]/50 focus:outline-none shadow-sm hover:shadow-md"
                            onChange={(e) =>
                                setForm({ ...form, status: e.target.value })
                            }
                        >
                            <option value="">-- Select Room Status --</option>
                            <option value="VACANT">Vacant</option>
                            <option value="IN_USE">In Use</option>
                        </select>
                        </div>

                        <div>
                            <Label className="pt-4 pb-2" htmlFor="priority">Priority</Label>
                            <select
                                required
                                id="priority"
                                // className='border border-gray-300 rounded-md p-2'
                                className = "w-80 h-10 rounded-full border-2 border-[#0077b6] bg-white px-4 py-2 transition-all duration-300 focus:border-[#00b4d8] focus:ring-2 focus:ring-[#90e0ef]/50 focus:outline-none shadow-sm hover:shadow-md"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        priority: e.target.value,
                                    })
                                }>
                                <option value="">-- Select Priority --</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="High">Emergency</option>
                            </select>
                        </div>

                        <div>
                            <Label className="pt-4 pb-2" htmlFor="requestStatus">Request Status</Label>
                            <select
                                required
                                id="requestStatus"
                                // className='border border-gray-300 rounded-md p-2'
                                className = "w-80 h-10 rounded-full border-2 border-[#0077b6] bg-white px-4 py-2 transition-all duration-300 focus:border-[#00b4d8] focus:ring-2 focus:ring-[#90e0ef]/50 focus:outline-none shadow-sm hover:shadow-md"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        requestStatus: e.target.value,
                                    })
                                }>
                                <option value="">-- Select Status --</option>
                                <option value="Unassigned">Unassigned</option>
                                <option value="Assigned">Assigned</option>
                                <option value="Working">Working</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>

                        <div>
                        <Label className="pt-4 pb-2" htmlFor="comments">
                            Comments
                        </Label>
                        <textarea
                            id="comments"
                            // className="border border-gray-300 rounded-md p-2 w-90"
                            className = "w-80 min-h-20 rounded-xl border-2 border-[#0077b6] bg-white px-4 py-2 transition-all duration-300 focus:border-[#00b4d8] focus:ring-2 focus:ring-[#90e0ef]/50 focus:outline-none shadow-sm hover:shadow-md"
                            onChange={(e) =>
                                setForm({ ...form, comments: e.target.value })
                            }
                        />
                        </div>


                        <Button type="submit" className="mt-6 w-full rounded-2xl border">
                            Submit
                        </Button>
                    </form>
                </div>
                </ScrollArea>
                :
                <SubmissionReqPopup>
                    <ReturnSanitationRequest {...form} />
                </SubmissionReqPopup>
            }
        </>
    );
}
