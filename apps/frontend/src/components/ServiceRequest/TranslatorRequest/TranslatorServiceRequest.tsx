import {FormEvent} from 'react';
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {useState} from "react";
import {API_ROUTES} from "common/src/constants.ts";
import axios from "axios";
import ReturnTranslatorRequest from "@/components/ServiceRequest/TranslatorRequest/ReturnTranslatorRequest.tsx";
import {ScrollArea} from "@/components/ui/scrollarea.tsx";
import SubmissionReqPopup from "@/components/SubmissionReqPopup.tsx";
import ReturnSanitationRequest from "@/components/ServiceRequest/SanitationRequest/ReturnSanitationRequest.tsx";

type translatorRequestForm = {
    languageFrom: string;
    languageTo: string;
    roomNum: string;
    startDateTime: string;
    endDateTime: string;
    requestStatus: string;
    priority: string;
    employeeRequestedById: number;
    departmentUnderId: number;
    comments: string;
    employeeName: string;
}

export default function TranslatorServiceRequest() {

    const [form, setForm] = useState<translatorRequestForm>({
        languageFrom: '',
        languageTo: '',
        roomNum: '',
        startDateTime: '',
        endDateTime: '',
        requestStatus: '',
        priority: '',
        employeeRequestedById: 0,
        departmentUnderId: 0,
        comments: '',
        employeeName: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(form);
        setSubmitted(false);

        axios
            .post(API_ROUTES.SERVICEREQS + "/translator", form)
            .then(() => {
                setSubmitted(true);
                setShowPopup(true);
            })
            .catch((err) => {
                console.error("Error submitting translator request:", err);
            });
    };
    return (
        <>
            {!submitted ?
                <ScrollArea className="max-h-[95vh] overflow-y-auto pr-4 w-full max-w-screen-lg mx-auto bg-zinc-200">
                <div className="flex flex-col gap-4">
                    <div className="bg-blue-200 bg-opacity-60 rounded-3xl px-6 py-4 max-w-5xl w-full mx-auto">
                        <h2 className="text-4xl font-bold text-left">Request a Translator</h2>
                    </div>
                        <form onSubmit={onSubmit}>
                            <div>
                                <Label className="pt-4 pb-2" htmlFor="employeeId">Employee ID</Label>
                                <Input
                                    required
                                    type="number"
                                    id="employeeId"
                                    className = "w-80 h-8 rounded-2xl border border-gray-500 px-4 transition-colors duration-300 focus:border-blue-500 focus:bg-blue-100"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            employeeRequestedById: Number(e.target.value),
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <Label className="pt-4 pb-2" htmlFor="employeeName">Employee Name</Label>
                                <Input
                                    required
                                    type="text"
                                    id="employeeName"
                                    className = "w-80 h-8 rounded-2xl border border-gray-500 px-4 transition-colors duration-300 focus:border-blue-500 focus:bg-blue-100"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            employeeName: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <Label className="pt-4 pb-2" htmlFor="department">Department</Label>
                                <select
                                    required
                                    id="department"
                                    className = "w-80 h-8 rounded-2xl border border-gray-500 px-4 transition-colors duration-300 focus:border-blue-500 focus:bg-blue-100"
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
                                <Label className="pt-4 pb-2" htmlFor="roomNumber">Room Number</Label>
                                <Input
                                    required
                                    type="text"
                                    id="roomNumber"
                                    className = "w-80 h-8 rounded-2xl border border-gray-500 px-4 transition-colors duration-300 focus:border-blue-500 focus:bg-blue-100"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            roomNum: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <Label className="pt-4 pb-2" htmlFor="languageFrom">Language From</Label>
                                <Input
                                    required
                                    type="text"
                                    id="languageFrom"
                                    className = "w-80 h-8 rounded-2xl border border-gray-500 px-4 transition-colors duration-300 focus:border-blue-500 focus:bg-blue-100"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            languageFrom: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <Label className="pt-4 pb-2" htmlFor="languageTo">Language To</Label>
                                <Input
                                    required
                                    type="text"
                                    id="languageTo"
                                    className = "w-80 h-8 rounded-2xl border border-gray-500 px-4 transition-colors duration-300 focus:border-blue-500 focus:bg-blue-100"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            languageTo: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <Label className="pt-4 pb-2" htmlFor="startDateTime">Start Date and Time</Label>
                                <Input
                                    required
                                    type="datetime-local"
                                    id="startDateTime"
                                    className = "w-80 h-8 rounded-2xl border border-gray-500 px-4 transition-colors duration-300 focus:border-blue-500 focus:bg-blue-100"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            startDateTime: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <Label className="pt-4 pb-2" htmlFor="endDateTime">End Date and Time</Label>
                                <Input
                                    required
                                    type="datetime-local"
                                    id="languageFrom"
                                    className = "w-80 h-8 rounded-2xl border border-gray-500 px-4 transition-colors duration-300 focus:border-blue-500 focus:bg-blue-100"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            endDateTime: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <Label className="pt-4 pb-2" htmlFor="priority">Priority</Label>
                                <select
                                    required
                                    id="priority"
                                    className = "w-80 h-8 rounded-2xl border border-gray-500 px-4 transition-colors duration-300 focus:border-blue-500 focus:bg-blue-100"
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
                                    className = "w-80 h-8 rounded-2xl border border-gray-500 px-4 transition-colors duration-300 focus:border-blue-500 focus:bg-blue-100"
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

                            <Label className="pt-4 pb-2" htmlFor="comments">Comments</Label>
                            <textarea
                                id="comments"
                                className = "w-80 h-8 rounded-md border border-gray-500 px-4 transition-colors duration-300 focus:border-blue-500 focus:bg-blue-100"
                                onChange={(e) =>
                                    setForm({ ...form, comments: e.target.value })
                                }
                            />

                            <div className="flex flex-row justify-center items-center">
                                <Button type="submit" className="mt-6 w-full">
                                    Submit
                                </Button>
                            </div>
                        </form>
                </div>
                </ScrollArea>

            :
                <SubmissionReqPopup>
                    <ReturnTranslatorRequest {...form} />
                </SubmissionReqPopup>
            }
        </>
    );
}

