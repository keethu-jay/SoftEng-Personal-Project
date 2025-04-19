import GGMap from "@/GoogleMap/GoogleMap.tsx";
import React, {useEffect, useRef, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faWalking, faInfoCircle } from '@fortawesome/free-solid-svg-icons';


import {API_ROUTES} from "common/src/constants.ts";
import axios from "axios";
import {Label} from "@/components/ui/label.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {Separator} from "@/components/ui/separator.tsx";

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

interface DirectionsProps {
    editor: boolean
}

export default function Directions(props: DirectionsProps) {

    const departmentRef = useRef(null);
    const autocompleteRef = useRef<HTMLInputElement>(null);

    const [data, setData] = useState<Hospital[]>([]);

    const [hospital, setHospital] = useState<Hospital | undefined>();
    const [mode, setMode] = useState<string | undefined>("DRIVING");
    const [graph, setGraph] = useState<Graph | undefined>();
    const [department, setDepartment] = useState<Department | undefined>();

    const [allGraphs, setAllGraphs] = useState<Graph[]>([]);

    const [zoomFlag, setZoomFlag] = useState<boolean>(false);

    useEffect(() => {
        axios.get(API_ROUTES.DEPARTMENT).then((response) => {
            console.log('Raw:');
            console.log(response.data);
            console.log('Casted:');
            console.log(response.data as Hospital[]);
            setData(response.data as Hospital[]);
            console.log('New data: ' + data);
        })
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

    return (
        <div className="flex flex-row flex-1">
            <div className="flex-1 p-4">
                <h2 className="text-3xl font-bold">
                    {props.editor ? 'Map Editor' : 'Get Directions'}
                </h2>
                <Separator className="mt-4 mb-4" />

                {/*TODO: find a better way of doing this, copied from components/ui/input.tsx*/}
                {!props.editor &&
                    <>
                        <Label className="mb-1">Start Location</Label>
                        <input
                            ref={autocompleteRef}
                            id="start-input"
                            type="text"
                            data-slot="input"
                            className={cn(
                                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", "mb-4"
                            )}
                        />
                    </>
                }

                {/*end to-do here*/}

                <Label>Destination Hospital</Label>
                <Select onValueChange={handleHospitalChange}>
                    <SelectTrigger className="w-full mt-1 mb-4">
                        <SelectValue placeholder="Choose a hospital..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Hospitals</SelectLabel>
                            {data.map((h: Hospital) => (
                                <SelectItem key={h.hospitalId + 1} value={h.name}>
                                    {h.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                {!props.editor &&
                    <>
                        <Label>Transport Mode</Label>
                        <Select onValueChange={handleModeChange} defaultValue="DRIVING">
                            <SelectTrigger className="w-full mt-1 mb-4">
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
                    </>
                }

                {hospital &&
                    <>
                        <Separator className="mt-4 mb-4" />

                        {props.editor ?
                            <>
                                <Label>Graph</Label>
                                <Select onValueChange={handleGraphChange}>
                                    <SelectTrigger className="w-full mt-1 mb-4">
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
                            </> : <>
                                <Label>Department</Label>
                                <Select onValueChange={handleDepartmentChange}>
                                    <SelectTrigger className="w-full mt-1 mb-4">
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
                            </>
                        }
                        <Button onClick={() => setZoomFlag(!zoomFlag)} className="mb-4">
                            Zoom
                        </Button>
                    </>
                }
                <Separator className="mt-4 mb-4" />
                {/*TODO: make a legend*/}
                {!props.editor &&
                    <>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-xl font-semibold mb-3 text-gray-700 flex items-center">
                                Legend
                            </h2>
                            <ul className="space-y-2">
                                <li className="flex items-center text-lg">
                                    <FontAwesomeIcon icon={faCar} className="text-blue-500 w-4 h-4 mr-3" />
                                    To Hospital
                                </li>
                                <li className="flex items-center text-lg">
                                    <FontAwesomeIcon icon={faWalking} className="text-red-600 w-4 h-4 mr-3" />
                                    Within Hospital
                                </li>
                            </ul>
                        </div>
                    </>
                }

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

            <div className="flex-3">
                <GGMap
                    editor={props.editor}
                    autoCompleteRef={autocompleteRef}
                    hospital={hospital}
                    department={department}
                    graph={graph}
                    mode={mode}
                    zoomFlag={zoomFlag}
                />
            </div>
        </div>
    )
}