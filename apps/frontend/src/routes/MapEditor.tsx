import React, { useEffect, useRef, useState } from "react";
import GGMap from "@/GoogleMap/GoogleMap.tsx";
import apiClient from "@/lib/axios";
import { API_ROUTES } from "common/src/constants.ts";
import { Label } from "@/components/ui/label.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Separator } from "@/components/ui/separator.tsx";

type Hospital = {
    hospitalId: number;
    name: string;
    address: string;
    placeId: string;
    defaultLat: number;
    defaultLng: number;
    defaultZoom: number;
    Departments: Department[];
};

type Department = {
    departmentId: number;
    name: string;
    floorNum: number;
    room: string;
    building: string;
    lat: number;
    lng: number;
    Graph: Graph;
};

type Graph = {
    graphId: number;
    name: string;
    imageURL: string;
    north: number;
    south: number;
    east: number;
    west: number;
};

type Node = {
    nodeId: number;
    tags: string | null;
    lat: number;
    lng: number;
    graphId: number | null;
};

type Edge = {
    edgeId: number;
    name: string | null;
    weight: number | null;
    graphId: number | null;
    startNodeId: number;
    endNodeId: number;
};

const MapEditor: React.FC = () => {
    const autocompleteRef = useRef<HTMLInputElement>(null);

    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [hospital, setHospital] = useState<Hospital | undefined>();
    const [graph, setGraph] = useState<Graph | undefined>();
    const [allGraphs, setAllGraphs] = useState<Graph[]>([]);
    const [zoomFlag, setZoomFlag] = useState(false);
    const [mode] = useState<string | undefined>("DRIVING");

    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);

    const [newNode, setNewNode] = useState<{ lat: string; lng: string; tags: string }>({
        lat: "",
        lng: "",
        tags: "",
    });

    const [newEdge, setNewEdge] = useState<{
        startNodeId: string;
        endNodeId: string;
        name: string;
        weight: string;
    }>({
        startNodeId: "",
        endNodeId: "",
        name: "",
        weight: "",
    });

    // Load hospitals + departments/graphs
    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const response = await apiClient.get(API_ROUTES.DEPARTMENT);
                if (Array.isArray(response.data)) {
                    setHospitals(response.data as Hospital[]);
                } else {
                    setHospitals([]);
                }
            } catch (error) {
                console.error("Error fetching hospitals for map editor:", error);
                setHospitals([]);
            }
        };
        fetchHospitals();
    }, []);

    // Load all nodes/edges (we'll filter by graph client-side)
    const refreshNodesAndEdges = async () => {
        try {
            const [nodesRes, edgesRes] = await Promise.all([
                apiClient.get(`${API_ROUTES.PATHFINDING}/nodes`),
                apiClient.get(`${API_ROUTES.PATHFINDING}/edges`),
            ]);
            setNodes(Array.isArray(nodesRes.data) ? nodesRes.data : []);
            setEdges(Array.isArray(edgesRes.data) ? edgesRes.data : []);
        } catch (err) {
            console.error("Failed to load nodes/edges:", err);
        }
    };

    useEffect(() => {
        refreshNodesAndEdges().catch(() => {});
    }, []);

    const handleHospitalChange = (value: string) => {
        let newHospital: Hospital | null = null;
        for (const h of hospitals) {
            if (h.name === value) {
                setHospital(h);
                newHospital = h;
                break;
            }
        }

        if (newHospital) {
            const newAllGraphs: Graph[] = [];
            const graphIds = new Set<number>();
            for (const g of newHospital.Departments.map((d) => d.Graph)) {
                if (g && !graphIds.has(g.graphId)) {
                    graphIds.add(g.graphId);
                    newAllGraphs.push(g);
                }
            }
            setAllGraphs(newAllGraphs);
            setGraph(undefined);
            setZoomFlag(true);
        }
    };

    const handleGraphChange = (value: string) => {
        if (!hospital) return;
        for (const g of allGraphs) {
            if (g.name === value) {
                setGraph(g);
                break;
            }
        }
    };

    const currentGraphNodes = graph
        ? nodes.filter((n) => n.graphId === graph.graphId)
        : [];
    const currentGraphEdges = graph
        ? edges.filter((e) => e.graphId === graph.graphId)
        : [];

    const handleCreateNode = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!graph) {
            alert("Select a graph first.");
            return;
        }
        const lat = parseFloat(newNode.lat);
        const lng = parseFloat(newNode.lng);
        if (Number.isNaN(lat) || Number.isNaN(lng)) {
            alert("Lat/Lng must be numbers.");
            return;
        }

        const payload = {
            tags: newNode.tags,
            lat,
            lng,
            Graph: { connect: { graphId: graph.graphId } },
        };

        try {
            await apiClient.post(`${API_ROUTES.PATHFINDING}/newNode`, payload);
            setNewNode({ lat: "", lng: "", tags: "" });
            await refreshNodesAndEdges();
        } catch (err: unknown) {
            console.error("Failed to create node:", err);
            const e = err as { response?: { data?: { error?: string } }; message?: string };
            alert(
                `Failed to create node: ${
                    e.response?.data?.error || e.message || "Unknown error"
                }`
            );
        }
    };

    const handleCreateEdge = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!graph) {
            alert("Select a graph first.");
            return;
        }
        const startNodeId = parseInt(newEdge.startNodeId, 10);
        const endNodeId = parseInt(newEdge.endNodeId, 10);
        const weight = newEdge.weight ? parseInt(newEdge.weight, 10) : 0;
        if (Number.isNaN(startNodeId) || Number.isNaN(endNodeId)) {
            alert("Start and end node IDs must be numbers.");
            return;
        }

        const payload = {
            name: newEdge.name || null,
            weight,
            Graph: { connect: { graphId: graph.graphId } },
            startNode: { connect: { nodeId: startNodeId } },
            endNode: { connect: { nodeId: endNodeId } },
        };

        try {
            await apiClient.post(`${API_ROUTES.PATHFINDING}/newEdge`, payload);
            setNewEdge({ startNodeId: "", endNodeId: "", name: "", weight: "" });
            await refreshNodesAndEdges();
        } catch (err: unknown) {
            console.error("Failed to create edge:", err);
            const e = err as { response?: { data?: { error?: string } }; message?: string };
            alert(
                `Failed to create edge: ${
                    e.response?.data?.error || e.message || "Unknown error"
                }`
            );
        }
    };

    return (
        <div className="flex flex-col lg:flex-row flex-1 min-h-screen bg-white">
            <div className="flex-1 p-4 sm:p-6 lg:p-8">
                <div className="max-w-2xl">
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#03045e] mb-2">
                        Map Editor
                    </h1>
                    <p className="text-gray-600 mb-4 text-sm sm:text-base">
                        Explore and configure indoor maps backed by the database. Select a
                        hospital and graph to see its floor overlay and paths, then add
                        nodes and edges as needed.
                    </p>
                    <Separator className="mb-4" />

                    <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-4 text-xs sm:text-sm text-blue-900">
                        <h2 className="mb-2 font-semibold text-sm sm:text-base">
                            How to use this editor
                        </h2>
                        <ol className="list-decimal pl-4 space-y-1">
                            <li>
                                Select a <span className="font-semibold">hospital</span> in
                                the list below.
                            </li>
                            <li>
                                Choose a <span className="font-semibold">graph</span> (floor)
                                to load its overlay and paths on the map.
                            </li>
                            <li>
                                Use the <span className="font-semibold">Nodes</span> and{" "}
                                <span className="font-semibold">Edges</span> panels to add new
                                geometry for that graph.
                            </li>
                        </ol>
                    </div>

                    <div className="mb-4">
                        <Label className="mb-2 block text-sm font-medium text-[#03045e]">
                            Destination Hospital
                        </Label>
                        {hospitals.length === 0 ? (
                            <div className="text-sm text-amber-800 bg-amber-50 border-2 border-amber-200 rounded-lg p-4 mb-4">
                                <p className="font-semibold mb-1">
                                    No hospitals found in database.
                                </p>
                                <p className="mb-2">
                                    Please run the seed file to add hospitals:
                                </p>
                                <code className="block text-xs bg-amber-100 p-2 rounded border border-amber-300 font-mono">
                                    yarn workspace database seed
                                </code>
                            </div>
                        ) : (
                            <Select onValueChange={handleHospitalChange}>
                                <SelectTrigger className="w-full h-10">
                                    <SelectValue placeholder="Choose a hospital..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Hospitals</SelectLabel>
                                        {hospitals.map((h) => (
                                            <SelectItem key={h.hospitalId} value={h.name}>
                                                {h.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    </div>

                    {hospital && (
                        <div className="mb-4">
                            <Label className="mb-2 block text-sm font-medium text-[#03045e]">
                                Graph
                            </Label>
                            <Select onValueChange={handleGraphChange}>
                                <SelectTrigger className="w-full h-10">
                                    <SelectValue placeholder="Choose a graph..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Graphs</SelectLabel>
                                        {allGraphs.map((g) => (
                                            <SelectItem key={g.graphId} value={g.name}>
                                                {g.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {hospital && (
                        <Button
                            onClick={() => setZoomFlag(!zoomFlag)}
                            variant="outline"
                            className="mb-6"
                        >
                            {zoomFlag ? "Reset Zoom" : "Zoom to Location"}
                        </Button>
                    )}

                    <Separator className="my-4" />

                    {/* Nodes CRUD */}
                    <div className="mb-6">
                        <h2 className="font-semibold text-[#03045e] mb-2 text-sm sm:text-base">
                            Nodes for selected graph
                        </h2>
                        {graph ? (
                            <>
                                <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-md mb-3 text-xs sm:text-sm">
                                    {currentGraphNodes.length === 0 ? (
                                        <div className="p-2 text-gray-500">
                                            No nodes for this graph yet.
                                        </div>
                                    ) : (
                                        <ul className="divide-y divide-gray-100">
                                            {currentGraphNodes.map((n) => (
                                                <li
                                                    key={n.nodeId}
                                                    className="px-2 py-1 flex justify-between"
                                                >
                                                    <span>
                                                        #{n.nodeId} — {n.tags || "untagged"}
                                                    </span>
                                                    <span className="text-gray-500">
                                                        ({n.lat.toFixed(5)},{" "}
                                                        {n.lng.toFixed(5)})
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <form
                                    onSubmit={handleCreateNode}
                                    className="grid grid-cols-3 gap-2 text-xs sm:text-sm"
                                >
                                    <Input
                                        placeholder="Lat"
                                        value={newNode.lat}
                                        onChange={(e) =>
                                            setNewNode({ ...newNode, lat: e.target.value })
                                        }
                                    />
                                    <Input
                                        placeholder="Lng"
                                        value={newNode.lng}
                                        onChange={(e) =>
                                            setNewNode({ ...newNode, lng: e.target.value })
                                        }
                                    />
                                    <Input
                                        placeholder="Tags (optional)"
                                        value={newNode.tags}
                                        onChange={(e) =>
                                            setNewNode({
                                                ...newNode,
                                                tags: e.target.value,
                                            })
                                        }
                                    />
                                    <Button type="submit" className="col-span-3 mt-1">
                                        Add Node
                                    </Button>
                                </form>
                            </>
                        ) : (
                            <p className="text-xs text-gray-500">
                                Select a hospital and graph to manage nodes.
                            </p>
                        )}
                    </div>

                    {/* Edges CRUD */}
                    <div className="mb-6">
                        <h2 className="font-semibold text-[#03045e] mb-2 text-sm sm:text-base">
                            Edges for selected graph
                        </h2>
                        {graph ? (
                            <>
                                <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-md mb-3 text-xs sm:text-sm">
                                    {currentGraphEdges.length === 0 ? (
                                        <div className="p-2 text-gray-500">
                                            No edges for this graph yet.
                                        </div>
                                    ) : (
                                        <ul className="divide-y divide-gray-100">
                                            {currentGraphEdges.map((e) => (
                                                <li
                                                    key={e.edgeId}
                                                    className="px-2 py-1 flex justify-between"
                                                >
                                                    <span>
                                                        #{e.edgeId} — {e.name || "unnamed"}
                                                    </span>
                                                    <span className="text-gray-500">
                                                        {e.startNodeId} → {e.endNodeId}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <form
                                    onSubmit={handleCreateEdge}
                                    className="grid grid-cols-4 gap-2 text-xs sm:text-sm"
                                >
                                    <Input
                                        placeholder="Start node ID"
                                        value={newEdge.startNodeId}
                                        onChange={(e) =>
                                            setNewEdge({
                                                ...newEdge,
                                                startNodeId: e.target.value,
                                            })
                                        }
                                    />
                                    <Input
                                        placeholder="End node ID"
                                        value={newEdge.endNodeId}
                                        onChange={(e) =>
                                            setNewEdge({
                                                ...newEdge,
                                                endNodeId: e.target.value,
                                            })
                                        }
                                    />
                                    <Input
                                        placeholder="Name (optional)"
                                        value={newEdge.name}
                                        onChange={(e) =>
                                            setNewEdge({
                                                ...newEdge,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                    <Input
                                        placeholder="Weight (optional)"
                                        value={newEdge.weight}
                                        onChange={(e) =>
                                            setNewEdge({
                                                ...newEdge,
                                                weight: e.target.value,
                                            })
                                        }
                                    />
                                    <Button type="submit" className="col-span-4 mt-1">
                                        Add Edge
                                    </Button>
                                </form>
                            </>
                        ) : (
                            <p className="text-xs text-gray-500">
                                Select a hospital and graph to manage edges.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex-1 lg:flex-[2] min-h-[500px] lg:min-h-screen">
                <GGMap
                    editor={true}
                    autoCompleteRef={autocompleteRef}
                    hospital={hospital}
                    department={undefined}
                    graph={graph}
                    mode={mode}
                    zoomFlag={zoomFlag}
                    editableNodes={currentGraphNodes}
                />
            </div>
        </div>
    );
};

export default MapEditor;

