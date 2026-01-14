// @ts-expect-error explicit .tsx import to avoid pulling in the non-React map class
import GGMap from "@/GoogleMap/GoogleMap.tsx";
import React, {useEffect, useRef, useState} from 'react';
// @ts-expect-error icon typings not bundled in this workspace
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// @ts-expect-error icon typings not bundled in this workspace
import { faCar, faWalking, faInfoCircle, faArrowLeft, faArrowRight, faArrowUp } from '@fortawesome/free-solid-svg-icons';


// @ts-expect-error path aliases use compiled outputs
import {API_ROUTES} from "common/src/constants";
import apiClient from "../lib/axios";
import {Label} from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Separator} from "@/components/ui/separator";

export type Hospital = {
    hospitalId: number
    name: string
    address: string
    placeId: string
    defaultLat: number
    defaultLng: number
    defaultZoom: number
    Departments: Department[]
}

export type Department = {
    departmentId: number
    name: string
    floorNum: number
    room: string
    building: string
    lat: number
    lng: number
    Graph: Graph
}

export type Graph = {
    graphId: number
    name: string
    imageURL: string
    north: number
    south: number
    east: number
    west: number
}

type StepInfo = {
    htmlInstruction: string;
    plainInstruction: string;
    distanceText?: string;
    durationText?: string;
};

interface DirectionsProps {
    editor: boolean
}

export default function Directions(props: DirectionsProps) {

    const departmentRef = useRef(null);
    const autocompleteRef = useRef<HTMLInputElement>(null);

    const [data, setData] = useState<Hospital[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [hospital, setHospital] = useState<Hospital | undefined>();
    const [mode, setMode] = useState<string | undefined>("DRIVING");
    const [graph, setGraph] = useState<Graph | undefined>();
    const [department, setDepartment] = useState<Department | undefined>();
    const [steps, setSteps] = useState<StepInfo[]>([]);
    const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
    const [indoorSteps, setIndoorSteps] = useState<{ instruction: string; path: { lat: number; lng: number }[]; type: 'parking' | 'indoor' }[]>([]);
    const [indoorDirections, setIndoorDirections] = useState<{ idx: number; instructions: string; icon: string; time: number; distanceImp: string; distanceMet: string }[]>([]);
    const [currentIndoorStep, setCurrentIndoorStep] = useState<number>(-1);
    const [units, setUnits] = useState<'Imperial' | 'Metric'>('Imperial');

    const [allGraphs, setAllGraphs] = useState<Graph[]>([]);

    const [zoomFlag, setZoomFlag] = useState<boolean>(false);
    const speechEnabled = typeof window !== "undefined" && "speechSynthesis" in window;

    useEffect(() => {
        const fetchHospitals = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const apiUrl = apiClient.defaults.baseURL + API_ROUTES.DEPARTMENT;
                console.log('Fetching hospitals from:', API_ROUTES.DEPARTMENT);
                console.log('Full API URL:', apiUrl);
                
                const response = await apiClient.get(API_ROUTES.DEPARTMENT);
                
                console.log('Response received:', {
                    status: response.status,
                    dataType: typeof response.data,
                    isArray: Array.isArray(response.data),
                    length: Array.isArray(response.data) ? response.data.length : 'N/A'
                });
                
                // The backend returns an array directly, so response.data should be the array
                const hospitalsData = Array.isArray(response.data) ? response.data : [];
                if (hospitalsData.length > 0) {
                    console.log(`Successfully loaded ${hospitalsData.length} hospitals`);
                    console.log('Sample hospital:', {
                        hospitalId: hospitalsData[0].hospitalId,
                        name: hospitalsData[0].name,
                        departmentsCount: hospitalsData[0].Departments?.length || 0
                    });
                }
                setData(hospitalsData as Hospital[]);
                setError(null);
            } catch (error: any) {
                console.error('Error fetching hospitals:', error);
                // More detailed error logging
                if (error.response) {
                    console.error('Response error:', {
                        status: error.response.status,
                        statusText: error.response.statusText,
                        data: error.response.data
                    });
                    setError(`Server error: ${error.response.status} ${error.response.statusText}`);
                } else if (error.request) {
                    console.error('No response received. Request:', error.request);
                    setError('Unable to connect to server. Is the backend running on port 3001?');
                } else {
                    console.error('Request setup error:', error.message);
                    setError(`Error: ${error.message}`);
                }
                setData([]);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchHospitals();
    }, []);

    const handleHospitalChange = (value: string) => {
        let newHospital: Hospital | null = null;
        for (const hospital of data) {
            if (hospital.name === value) {
                setHospital(hospital);
                newHospital = hospital;
                break;
            }
        }
        console.log('Hospital change: ', hospital);
        if (newHospital) {
            const newAllGraphs: Graph[] = [];
            const graphIds = new Set<number>();
            for (const graph of newHospital.Departments.map(d => d.Graph)) {
                console.log('Trying ', graph.graphId);
                if (!graphIds.has(graph.graphId)) {
                    graphIds.add(graph.graphId);
                    newAllGraphs.push(graph);
                    console.log('Added ' + graph.graphId);
                }
            }
            setAllGraphs(newAllGraphs);
        }
    }

    const handleGraphChange = (value: string) => {
        if (!hospital) return;

        for (const graph of allGraphs) {
            if (graph.name === value) {
                setGraph(graph);
                break;
            }
        }
    }

    const handleDepartmentChange = (value: string) => {
        if (!hospital) return;
        for (const d of hospital.Departments) {
            if (d.name === value) {
                setDepartment(d);
                setGraph(d.Graph);
            }
        }
    }

    const handleModeChange = (value: string) => {
        setMode(value);
    }

    const handleStepsUpdate = (incomingSteps: StepInfo[]) => {
        setSteps(incomingSteps);
        setActiveStepIndex(0);
    }

    const handleIndoorStepsUpdate = (incomingIndoorSteps: { instruction: string; path: { lat: number; lng: number }[]; type: 'parking' | 'indoor' }[]) => {
        setIndoorSteps(incomingIndoorSteps);
    }

    const handleIndoorDirectionsUpdate = (directions: { idx: number; instructions: string; icon: string; time: number; distanceImp: string; distanceMet: string }[]) => {
        console.log('Received indoor directions:', directions);
        setIndoorDirections(directions);
        setCurrentIndoorStep(directions.length > 0 ? 0 : -1);
    }

    const handleIndoorStepChange = (newStep: number) => {
        if (newStep >= 0 && newStep < indoorDirections.length) {
            setCurrentIndoorStep(newStep);
            const step = indoorDirections[newStep];
            if (step?.instructions) {
                speakStep(step.instructions);
            }
            // TODO: Highlight the current step on the map
            // This would require passing the step index to GoogleMap component
        }
    }

    const speakStep = (text: string) => {
        if (!speechEnabled || !text) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
    }

    const goToStep = (nextIndex: number) => {
        if (nextIndex < 0 || nextIndex >= steps.length) return;
        setActiveStepIndex(nextIndex);
        const step = steps[nextIndex];
        if (step?.plainInstruction) {
            speakStep(step.plainInstruction);
        }
    }

    return (
        <div className="flex flex-col lg:flex-row flex-1 min-h-screen">
            <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-white">
                <div className="max-w-2xl">
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#03045e] mb-2">
                        {props.editor ? 'Map Editor' : 'Get Directions'}
                    </h1>
                    <p className="text-gray-600 mb-6 text-sm sm:text-base">
                        {props.editor ? 'Edit and manage map configurations' : 'Find your way to any department or location'}
                    </p>
                    <Separator className="mb-6" />

                    {props.editor && (
                        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-xs sm:text-sm text-blue-900">
                            <h2 className="mb-2 font-semibold text-sm sm:text-base">
                                How to use the Map Editor
                            </h2>
                            <ol className="list-decimal pl-4 space-y-1">
                                <li>Select a hospital from the <span className="font-semibold">Destination Hospital</span> list.</li>
                                <li>Choose a <span className="font-semibold">Graph</span> to load its floor image and paths on the map.</li>
                                <li>Use <span className="font-semibold">Zoom to Location</span> to center the map on the selected hospital.</li>
                            </ol>
                            <p className="mt-2">
                                Node positions, edges, and floor images come from the database (via the <code className="px-1 rounded bg-blue-100 border border-blue-200">Graph</code>, <code className="px-1 rounded bg-blue-100 border border-blue-200">Node</code>, and <code className="px-1 rounded bg-blue-100 border border-blue-200">Edge</code> tables).
                                This page is intended for exploring and verifying configurations; editing geometry currently requires updating those records or the seed script.
                            </p>
                        </div>
                    )}

                {/*TODO: find a better way of doing this, copied from components/ui/input.tsx*/}
                {!props.editor &&
                    <div className="mb-6">
                        <Label className="mb-2 block text-sm font-medium text-[#03045e]">Start Location</Label>
                        <input
                            ref={autocompleteRef}
                            id="start-input"
                            type="text"
                            data-slot="input"
                            placeholder="Enter your starting location"
                            className={cn(
                                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-10 w-full min-w-0 rounded-md border bg-transparent px-4 py-2 text-base shadow-sm transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                            )}
                        />
                    </div>
                }

                {/*end to-do here*/}

                <div className="mb-6">
                    <Label className="mb-2 block text-sm font-medium text-[#03045e]">Destination Hospital</Label>
                    {isLoading ? (
                        <div className="text-sm text-blue-800 bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
                            <p className="font-semibold mb-1">Loading hospitals...</p>
                        </div>
                    ) : error ? (
                        <div className="text-sm text-red-800 bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-4">
                            <p className="font-semibold mb-1">Error loading hospitals</p>
                            <p className="mb-2">{error}</p>
                            <p className="text-xs mt-2">Check the browser console for more details.</p>
                        </div>
                    ) : data.length === 0 ? (
                        <div className="text-sm text-amber-800 bg-amber-50 border-2 border-amber-200 rounded-lg p-4 mb-4">
                            <p className="font-semibold mb-1">No hospitals found in database.</p>
                            <p className="mb-2">Please run the seed file to add hospitals:</p>
                            <code className="block text-xs bg-amber-100 p-2 rounded border border-amber-300 font-mono">yarn workspace database seed</code>
                        </div>
                    ) : (
                        <Select onValueChange={handleHospitalChange}>
                            <SelectTrigger className="w-full h-10">
                                <SelectValue placeholder="Choose a hospital..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Hospitals</SelectLabel>
                                    {data.map((h: Hospital) => (
                                        <SelectItem key={h.hospitalId} value={h.name}>
                                            {h.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}
                </div>

                {!props.editor &&
                    <div className="mb-6">
                        <Label className="mb-2 block text-sm font-medium text-[#03045e]">Transport Mode</Label>
                        <Select onValueChange={handleModeChange} defaultValue="DRIVING">
                            <SelectTrigger className="w-full h-10">
                                <SelectValue placeholder="Choose a mode of transport..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Transport Modes</SelectLabel>
                                    {['Driving', 'Walking', 'Transit', 'Bicycling'].map((mode, i) => (
                                        <SelectItem key={i} value={mode.toUpperCase()}>{mode}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                }

                {hospital &&
                    <>
                        <Separator className="my-6" />

                        {props.editor ?
                            <div className="mb-6">
                                <Label className="mb-2 block text-sm font-medium text-[#03045e]">Graph</Label>
                                <Select onValueChange={handleGraphChange}>
                                    <SelectTrigger className="w-full h-10">
                                        <SelectValue placeholder="Choose a graph..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup key="0">
                                            <SelectLabel>Graphs</SelectLabel>
                                            {allGraphs.map(graph => (
                                                <SelectItem key={graph.graphId} value={graph.name}>
                                                    {graph.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div> : 
                            <div className="mb-6">
                                <Label className="mb-2 block text-sm font-medium text-[#03045e]">Department</Label>
                                <Select onValueChange={handleDepartmentChange}>
                                    <SelectTrigger className="w-full h-10">
                                        <SelectValue placeholder="Choose a department..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup key="0">
                                            <SelectLabel>Departments</SelectLabel>
                                            {hospital.Departments.map((d: Department) => (
                                                <SelectItem key={d.departmentId + 1} value={d.name}>
                                                    {d.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        }
                        <Button 
                            onClick={() => setZoomFlag(!zoomFlag)} 
                            variant="outline"
                            className="mb-6"
                        >
                            {zoomFlag ? 'Reset Zoom' : 'Zoom to Location'}
                        </Button>
                    </>
                }
                <Separator className="my-6" />
                {/*TODO: make a legend*/}
                {!props.editor &&
                    <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-lg shadow-md border-2 border-[#0077b6]/20">
                        <h3 className="text-lg font-semibold mb-4 text-[#03045e] flex items-center">
                            <FontAwesomeIcon icon={faInfoCircle} className="text-[#0077b6] w-5 h-5 mr-2" />
                            Map Legend
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-center text-base">
                                <FontAwesomeIcon icon={faCar} className="text-[#0077b6] w-5 h-5 mr-3" />
                                <span className="text-gray-700">To Hospital</span>
                            </li>
                            <li className="flex items-center text-base">
                                <FontAwesomeIcon icon={faWalking} className="text-[#00b4d8] w-5 h-5 mr-3" />
                                <span className="text-gray-700">Within Hospital</span>
                            </li>
                        </ul>
                    </div>
                }

                {/* Step-by-step directions panel for external route */}
                {!props.editor && (
                    <div className="mt-6 bg-white border-2 border-[#0077b6]/20 rounded-lg shadow-sm">
                        <div className="px-4 py-3 border-b border-gray-200">
                            <h3 className="text-sm font-semibold text-[#03045e]">
                                Directions (step by step)
                            </h3>
                            <p className="mt-1 text-xs text-gray-500">
                                After choosing a hospital and entering a start location, turn‑by‑turn directions will appear here. Use the controls to step through each instruction and play text-to-speech.
                            </p>
                        </div>
                        <div className="px-4 py-3 space-y-3">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-xs text-gray-600">
                                    {steps.length > 0 ? `Step ${activeStepIndex + 1} of ${steps.length}` : "No directions yet"}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        disabled={activeStepIndex <= 0}
                                        onClick={() => goToStep(activeStepIndex - 1)}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        disabled={steps.length === 0 || activeStepIndex >= steps.length - 1}
                                        onClick={() => goToStep(activeStepIndex + 1)}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>

                            <div className="max-h-72 overflow-y-auto space-y-2">
                                {steps.length === 0 && indoorSteps.length === 0 && (
                                    <div className="text-xs text-gray-500">
                                        Once directions are retrieved, they’ll show here.
                                    </div>
                                )}
                                {steps.map((step, idx) => (
                                    <div
                                        key={`external-${idx}`}
                                        className={`border rounded-lg px-3 py-2 text-sm transition-colors ${
                                            idx === activeStepIndex
                                                ? "border-[#0077b6] bg-[#e1f2ff]"
                                                : "border-gray-200 bg-white"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-[11px] text-gray-500">To Hospital - Step {idx + 1}</span>
                                            <div className="flex items-center gap-2 text-[11px] text-gray-500">
                                                {step.distanceText && <span>{step.distanceText}</span>}
                                                {step.durationText && <span>• {step.durationText}</span>}
                                                <button
                                                    type="button"
                                                    aria-label="Play step audio"
                                                    className="text-[#0077b6] hover:text-[#005a8a] font-semibold"
                                                    onClick={() => speakStep(step.plainInstruction)}
                                                >
                                                    🔊
                                                </button>
                                            </div>
                                        </div>
                                        <div
                                            className="mt-1 text-[#03045e]"
                                            dangerouslySetInnerHTML={{ __html: step.htmlInstruction }}
                                        />
                                    </div>
                                ))}
                                
                                {/* Show step-by-step indoor directions after external route */}
                                {indoorDirections.length > 0 && (
                                    <>
                                        <div className="border-t border-gray-300 my-3 pt-3">
                                            <h4 className="text-xs font-semibold text-[#03045e] mb-2">After arriving at the hospital:</h4>
                                        </div>
                                        
                                        {/* Indoor directions navigation */}
                                        <div className="flex items-center justify-between gap-2 mb-2">
                                            <div className="text-xs text-gray-600">
                                                {currentIndoorStep >= 0 ? `Step ${currentIndoorStep + 1} of ${indoorDirections.length}` : "Indoor Navigation"}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    disabled={currentIndoorStep < 0}
                                                    onClick={() => handleIndoorStepChange(currentIndoorStep - 1)}
                                                >
                                                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1" />
                                                    Back
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    disabled={currentIndoorStep >= indoorDirections.length - 1}
                                                    onClick={() => handleIndoorStepChange(currentIndoorStep + 1)}
                                                >
                                                    Next
                                                    <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Display indoor step-by-step directions */}
                                        <div className="space-y-2">
                                            {indoorDirections.map((dir, idx) => {
                                                const icon = dir.icon === 'left' ? faArrowLeft : 
                                                           dir.icon === 'right' ? faArrowRight : 
                                                           faArrowUp;
                                                return (
                                                    <div
                                                        key={`indoor-dir-${idx}`}
                                                        className={`border rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer ${
                                                            idx === currentIndoorStep
                                                                ? "border-[#00b4d8] bg-cyan-100"
                                                                : "border-gray-200 bg-white hover:bg-gray-50"
                                                        }`}
                                                        onClick={() => handleIndoorStepChange(idx)}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <FontAwesomeIcon 
                                                                    icon={icon} 
                                                                    className={`text-[#00b4d8] ${idx === currentIndoorStep ? 'text-[#0077b6]' : ''}`}
                                                                />
                                                                <span className="text-[#03045e] font-medium">{dir.instructions}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-[11px] text-gray-500">
                                                                    {units === 'Imperial' ? dir.distanceImp : dir.distanceMet}
                                                                </span>
                                                                <button
                                                                    type="button"
                                                                    aria-label="Play step audio"
                                                                    className="text-[#0077b6] hover:text-[#005a8a] font-semibold"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        speakStep(dir.instructions);
                                                                    }}
                                                                >
                                                                    🔊
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Show Department Info if selected */}
                {/*{selectedDepartment && (*/}
                {/*    <div className="mt-4 p-2 border rounded">*/}
                {/*        <h3 className="font-bold text-lg">{selectedDepartment.service}</h3>*/}
                {/*        <p>*/}
                {/*            <strong>Specialties:</strong> {selectedDepartment.specialties}*/}
                {/*        </p>*/}
                {/*        <p>*/}
                {/*            <strong>Floor/Suite:</strong> {selectedDepartment.floorSuite}*/}
                {/*        </p>*/}
                {/*        <p>*/}
                {/*            <strong>Phone:</strong> {selectedDepartment.phone}*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*)}*/}
                </div>
            </div>

            <div className="flex-1 lg:flex-[2] min-h-[500px] lg:min-h-screen">
                <GGMap
                    editor={props.editor}
                    autoCompleteRef={autocompleteRef}
                    hospital={hospital}
                    department={department}
                    graph={graph}
                    mode={mode}
                    zoomFlag={zoomFlag}
                    activeStepIndex={steps.length ? activeStepIndex : undefined}
                    onStepsUpdate={handleStepsUpdate}
                    onIndoorStepsUpdate={handleIndoorStepsUpdate}
                    onIndoorDirectionsUpdate={handleIndoorDirectionsUpdate}
                />
            </div>
        </div>
    )
}