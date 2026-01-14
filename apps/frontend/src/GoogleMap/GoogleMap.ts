import {GoogleMapProps, StepInfo, IndoorStepInfo} from "@/GoogleMap/GoogleMap.tsx"
import apiClient from "@/lib/axios";
import {API_ROUTES, Coordinates} from "common/src/constants.ts";

const DEFAULT_CENTER: google.maps.LatLngLiteral = {
    lat: 42.31934987791928,
    lng: -71.3162829187303,
};

const DEFAULT_ZOOM = 10;

export default class GoogleMap {

    private readonly editor: boolean;

    private readonly map: google.maps.Map;
    private readonly directionsService: google.maps.DirectionsService | null;
    private readonly directionsRenderer: google.maps.DirectionsRenderer | null;
    private readonly autocomplete: google.maps.places.Autocomplete | null;

    private readonly floorMaps: Map<number, google.maps.GroundOverlay>;
    private floorMap: google.maps.GroundOverlay | null;

    private paths: google.maps.Polyline[];
    private nodes: google.maps.Circle[];

    private startPlaceId: string;
    private destinationPlaceId: string;
    private travelMode: google.maps.TravelMode;
    private steps: google.maps.DirectionsStep[];
    private activeStepIndex: number;
    private activeStepPolyline: google.maps.Polyline | null;
    private onStepsUpdate?: (steps: StepInfo[]) => void;
    private onIndoorStepsUpdate?: (steps: IndoorStepInfo[]) => void;
    private onIndoorDirectionsUpdate?: (directions: IndoorDirectionStep[]) => void;

    private zoomFlag: boolean;

    // TODO: remove later
    private pointNum: number;

    constructor(mapRef: HTMLDivElement, props: GoogleMapProps) {

        this.editor = props.editor;


        if (!mapRef) throw new Error('Missing References');

        // Make map
        this.map = new google.maps.Map(mapRef, {
            mapTypeControl: false,
            center: DEFAULT_CENTER,
            zoom: DEFAULT_ZOOM,
            // center: {lat: 42.32610824896946, lng: -71.14955534500426},
            // zoom: 20,
        });

        // TODO: remove later
        this.map.addListener('click', (e: google.maps.MapMouseEvent) => {
            const ll = e.latLng;
            if (ll) {
                console.log('Point ' + this.pointNum++ + ':   \nlat: ' + ll.toJSON().lat + ',\nlng: ' + ll.toJSON().lng + ',');
            }
        });

        // Make directions


        // Make autocomplete for origin
        if (!this.editor && props.autoCompleteRef.current) {

            this.directionsService = new google.maps.DirectionsService();

            // If the directions panel exists in the DOM, attach it so Google
            // renders step-by-step instructions there.
            const directionsPanel = document.getElementById('directions-panel');
            if (directionsPanel) {
                this.directionsRenderer = new google.maps.DirectionsRenderer({
                    map: this.map,
                    panel: directionsPanel,
                });
            } else {
                this.directionsRenderer = new google.maps.DirectionsRenderer({
                    map: this.map,
                });
            }

            this.autocomplete = new google.maps.places.Autocomplete(props.autoCompleteRef.current, {
                fields: ['place_id'],
            });
            this.autocomplete.addListener('place_changed', () => {
                // @ts-expect-error already defined it above
                const placeId = this.autocomplete.getPlace().place_id;
                if (!placeId) {
                    window.alert('Please select an option from the dropdown list.');
                    return;
                } else {
                    this.startPlaceId = placeId;
                    console.log('Start is now ' + this.startPlaceId);
                    this.route();
                }
            });
        } else {
            this.directionsService = null;
            this.directionsRenderer = null;
            this.autocomplete = null;
        }

        // Set floor maps
        this.floorMaps = new Map<number, google.maps.GroundOverlay>();
        this.floorMap = null;

        this.paths = [];
        this.nodes = [];

        // Set start and finish locations
        this.startPlaceId = '';
        this.destinationPlaceId = '';
        this.travelMode = google.maps.TravelMode.DRIVING;
        this.steps = [];
        this.activeStepIndex = -1;
        this.activeStepPolyline = null;
        this.onStepsUpdate = props.onStepsUpdate;
        this.onIndoorStepsUpdate = props.onIndoorStepsUpdate;

        this.zoomFlag = false;

        // TODO: remove later
        this.pointNum = 0;
    }

    private route(): void {
        if (!this.editor && this.directionsService && this.directionsRenderer) {
            // can't go anywhere without start and end
            if (!this.startPlaceId || !this.destinationPlaceId) {
                console.log('Insufficient fields')
                return;
            }
            console.log('Routing ' + this.startPlaceId + ' to ' + this.destinationPlaceId);
            this.directionsService.route(
                {
                    origin: {placeId: this.startPlaceId},
                    destination: {placeId: this.destinationPlaceId},
                    travelMode: this.travelMode,
                },
                (response, status) => {
                    if (status === 'OK') {
                        console.log('Routed!');
                        // @ts-expect-error already checked that its not null above
                        this.directionsRenderer.setDirections(response);
                        this.ingestDirections(response);
                    } else {
                        window.alert('Directions request failed due to ' + status);
                    }
                }
            );
        }
    }

    private ingestDirections(response: google.maps.DirectionsResult) {
        const leg = response.routes?.[0]?.legs?.[0];
        this.steps = leg?.steps ?? [];
        // notify React about steps
        const stepInfos: StepInfo[] = this.steps.map((s) => ({
            htmlInstruction: s.instructions || '',
            plainInstruction: s.instructions ? s.instructions.replace(/<[^>]+>/g, '') : '',
            distanceText: s.distance?.text,
            durationText: s.duration?.text,
        }));
        this.onStepsUpdate?.(stepInfos);
        // default to first step highlight
        this.setActiveStep(0);
    }

    private setActiveStep(stepIndex: number) {
        if (Number.isNaN(stepIndex) || stepIndex < 0 || stepIndex >= this.steps.length) {
            return;
        }
        this.activeStepIndex = stepIndex;
        // clear previous highlight
        if (this.activeStepPolyline) {
            this.activeStepPolyline.setMap(null);
            this.activeStepPolyline = null;
        }
        const step = this.steps[stepIndex];
        if (step && step.path && step.path.length > 0) {
            const pathLiteral = step.path.map((latLng) => ({
                lat: latLng.lat(),
                lng: latLng.lng(),
            }));
            this.activeStepPolyline = new google.maps.Polyline({
                path: pathLiteral,
                strokeColor: '#ff7a00',
                strokeOpacity: 0.9,
                strokeWeight: 6,
                map: this.map,
                zIndex: 10,
            });
            // Optionally pan to start of the step
            this.map.panTo(pathLiteral[0]);
        }
    }

    update(props: GoogleMapProps): void {
        console.log('Update method: ' + props.graph?.graphId);
        this.onStepsUpdate = props.onStepsUpdate;
        this.onIndoorStepsUpdate = props.onIndoorStepsUpdate;
        this.onIndoorDirectionsUpdate = props.onIndoorDirectionsUpdate;

        // Reset paths and nodes when graph/department changes
        // We'll clear them before rendering new ones in the pathfinding section
        // This prevents clearing paths that are still being used

        // If the destination hospital has changed,
        // or mode of transport changed, re-route via
        // Google Maps to the new hospital
        if ((props.hospital && (props.hospital.placeId !== this.destinationPlaceId || props.mode !== this.travelMode.toString()))) {
            this.destinationPlaceId = props.hospital.placeId;
            console.log(props.mode);
            switch (props.mode) {
                case 'DRIVING':
                    this.travelMode = google.maps.TravelMode.DRIVING;
                    break;
                case 'WALKING':
                    this.travelMode = google.maps.TravelMode.WALKING;
                    break;
                case 'TRANSIT':
                    this.travelMode = google.maps.TravelMode.TRANSIT;
                    break;
                case 'BICYCLING':
                    this.travelMode = google.maps.TravelMode.BICYCLING;
                    break;
            }
            this.route();
        }
        // Step highlight driven by React
        if (
            typeof props.activeStepIndex === 'number' &&
            props.activeStepIndex !== this.activeStepIndex
        ) {
            this.setActiveStep(props.activeStepIndex);
        }
        // If the floor has changed, show the current floor
        if (props.graph) {
            const floorMap = this.floorMaps.get(props.graph.graphId);
            if (!floorMap) {
                console.log('Getting floor map url from ' + props.graph.imageURL);
                const newFloorMap = new google.maps.GroundOverlay(props.graph.imageURL, {
                    north: props.graph.north,
                    south: props.graph.south,
                    east: props.graph.east,
                    west: props.graph.west,
                });
                this.floorMaps.set(props.graph.graphId, newFloorMap);
                this.floorMap = newFloorMap;

                // TODO: remove later
                this.floorMap.addListener('click', (e: google.maps.MapMouseEvent) => {
                    const ll = e.latLng;
                    if (ll) {
                        console.log('Point ' + this.pointNum++ + ':   \nlat: ' + ll.toJSON().lat + ',\nlng: ' + ll.toJSON().lng + ',');
                    }
                });
            }
            else {
                this.floorMap = floorMap;
            }
            // Always set the floor map to be visible
            this.floorMap.setMap(this.map);
            console.log('Floor map set for graph:', props.graph.graphId);
        }
        if (props.department || props.graph) {
            // Only make pathfinding request if we have valid IDs
            if (this.editor && !props.graph?.graphId) return;
            if (!this.editor && (!props.graph?.graphId || !props.department?.departmentId)) return;

            // Clear old paths before fetching new ones
            this.paths.forEach(path => path.setMap(null));
            this.paths = [];

            const route = this.editor ?
                API_ROUTES.PATHFINDING + '/edit/' + props.graph?.graphId :
                API_ROUTES.PATHFINDING + '/pathfind/' + props.graph?.graphId + '/' + props.department?.departmentId;

            console.log('Get route ' + route);

            apiClient.get(route).then((response) => {

                console.log('Got route response:', response.data);
                
                // Check if response has new format with directions
                if (response.data && typeof response.data === 'object' && 'paths' in response.data && 'directions' in response.data) {
                    const pathData = response.data as { paths: Coordinates[][]; directions: any[] };
                    const rawData = pathData.paths;
                    const directions = pathData.directions || [];

                    if (!rawData || !Array.isArray(rawData)) {
                        console.error('Invalid pathfinding response:', response.data);
                        return;
                    }

                    console.log('Pathfinding data:', {
                        totalPaths: rawData.length,
                        indoorPathLength: rawData[0]?.length || 0,
                        parkingPathLength: rawData[1]?.length || 0,
                        directionsCount: directions.length,
                    });

                    // Notify React about step-by-step directions
                    if (directions.length > 0) {
                        console.log('Sending indoor directions to React:', directions);
                        this.onIndoorDirectionsUpdate?.(directions);
                    }

                    // Continue with path rendering (existing logic)
                    this.renderPaths(rawData);
                } else {
                    // Fallback to old format (just coordinates)
                    const rawData: Coordinates[][] = response.data;

                    if (!rawData || !Array.isArray(rawData)) {
                        console.error('Invalid pathfinding response:', response.data);
                        return;
                    }
                    
                    console.log('Pathfinding data:', {
                        totalPaths: rawData.length,
                        indoorPathLength: rawData[0]?.length || 0,
                        parkingPathLength: rawData[1]?.length || 0,
                    });
                    
                    this.renderPaths(rawData);
                }
            }).catch((err) => {
                console.error('Failed to fetch pathfinding route:', err);
            })
        }

        if (props.hospital && props.zoomFlag !== this.zoomFlag) {
            this.zoomFlag = props.zoomFlag;
            this.map.setCenter({
                lat: props.hospital.defaultLat,
                lng: props.hospital.defaultLng,
            });
            this.map.setZoom(props.hospital.defaultZoom);
        }

        // In editor mode, overlay draggable nodes that persist to backend
        if (this.editor && props.graph && props.editableNodes && props.editableNodes.length > 0) {
            props.editableNodes.forEach((node) => {
                const circle = new google.maps.Circle({
                    strokeColor: '#00FF88',
                    strokeOpacity: 1,
                    strokeWeight: 1,
                    fillColor: '#00FF88',
                    fillOpacity: 1,
                    map: this.map,
                    center: {
                        lat: node.lat,
                        lng: node.lng,
                    },
                    radius: 0.3,
                    draggable: true,
                });

                circle.addListener('dragend', (e: google.maps.MapMouseEvent) => {
                    const ll = e.latLng;
                    if (!ll) return;
                    const newLat = ll.lat();
                    const newLng = ll.lng();
                    circle.setCenter(ll);
                    console.log(`Node ${node.nodeId} moved to`, newLat, newLng);
                    apiClient
                        .patch(`${API_ROUTES.PATHFINDING}/nodes/${node.nodeId}`, {
                            lat: newLat,
                            lng: newLng,
                        })
                        .catch((err) => {
                            console.error('Failed to persist node move:', err);
                        });
                });

                this.nodes.push(circle);
            });
        }
    }

    private renderPaths(rawData: Coordinates[][]): void {
        // Pathfinding returns [indoorPath, parkingPath]
        // indoorPath: from door/entrance to department checkpoint (inside building)
        // parkingPath: from parking to entrance (may be empty array if no parking)
        if (!this.editor) {
            // Handle both cases: with parking [indoorPath, parkingPath] or without parking [indoorPath] or [[]]
            const indoorPath = rawData.length > 0 && rawData[0].length > 0 ? rawData[0] : null;
            const parkingPath = rawData.length >= 2 && rawData[1].length > 0 ? rawData[1] : null;

            // Notify React about indoor steps - these continue from where external route ends
            const indoorSteps: IndoorStepInfo[] = [];
            
            // If parking exists, show parking directions first (parking → entrance)
            if (parkingPath && parkingPath.length > 0) {
                indoorSteps.push({
                    instruction: 'After arriving at the hospital, follow the path from parking to the main entrance',
                    path: parkingPath.map(c => ({ lat: c.lat, lng: c.lng })),
                    type: 'parking',
                });
            }
            
            // Indoor path continues from entrance into the building (entrance → department)
            if (indoorPath && indoorPath.length > 0) {
                const instruction = parkingPath && parkingPath.length > 0
                    ? 'Enter the building and follow the indoor path to your department'
                    : 'Enter the building and follow the indoor path from the entrance to your department';
                
                indoorSteps.push({
                    instruction: instruction,
                    path: indoorPath.map(c => ({ lat: c.lat, lng: c.lng })),
                    type: 'indoor',
                });
            }
            
            this.onIndoorStepsUpdate?.(indoorSteps);

            // Render parking path (if exists) - connects parking to entrance
            if (parkingPath && parkingPath.length > 0) {
                const parkingPathData = parkingPath.map((coord): google.maps.LatLngLiteral => ({
                    lat: coord.lat,
                    lng: coord.lng,
                }));
                console.log('Rendering parking path with', parkingPathData.length, 'points');
                const parkingPolyline = new google.maps.Polyline({
                    path: parkingPathData,
                    strokeColor: '#0077b6', // Blue for parking
                    strokeOpacity: 0.9,
                    strokeWeight: 6,
                    map: this.map,
                    zIndex: 1000, // Very high zIndex to appear above floor map
                });
                this.paths.push(parkingPolyline);
            }

            // Render indoor path - continues seamlessly from entrance into building
            if (indoorPath && indoorPath.length > 0) {
                const indoorPathData = indoorPath.map((coord): google.maps.LatLngLiteral => ({
                    lat: coord.lat,
                    lng: coord.lng,
                }));
                console.log('Rendering indoor path with', indoorPathData.length, 'points');
                console.log('First point:', indoorPathData[0]);
                console.log('Last point:', indoorPathData[indoorPathData.length - 1]);
                const indoorPolyline = new google.maps.Polyline({
                    path: indoorPathData,
                    strokeColor: '#00b4d8', // Cyan for indoor
                    strokeOpacity: 1.0, // Full opacity
                    strokeWeight: 8, // Thicker line
                    map: this.map,
                    zIndex: 1001, // Highest priority - shows continuation into building
                });
                this.paths.push(indoorPolyline);
                
                // Zoom map to show indoor path - this should zoom in when indoor directions start
                if (indoorPathData.length > 0) {
                    const bounds = new google.maps.LatLngBounds();
                    // Include both parking and indoor paths in bounds if parking exists
                    if (parkingPath && parkingPath.length > 0) {
                        parkingPath.forEach(coord => bounds.extend({ lat: coord.lat, lng: coord.lng }));
                    }
                    indoorPathData.forEach(point => bounds.extend(point));
                    this.map.fitBounds(bounds);
                    // Set a higher zoom level for indoor navigation (zoom in more)
                    const currentZoom = this.map.getZoom();
                    if (currentZoom && currentZoom < 19) {
                        this.map.setZoom(19);
                    }
                    console.log('Zoomed map to show indoor path');
                }
            }
            
            console.log('Total paths rendered:', this.paths.length);
        } else {
            // Editor mode or fallback: render all paths as before
            const pathData: google.maps.LatLngLiteral[][] = rawData.map((path): google.maps.LatLngLiteral[] => {
                return path.map((coord): google.maps.LatLngLiteral => {
                    return {
                        lat: coord.lat,
                        lng: coord.lng,
                    }
                });
            });
            pathData.map(path => {
                this.paths.push(new google.maps.Polyline({
                    path: path,
                    strokeColor: '#CC3300',
                    strokeOpacity: 1.0,
                    strokeWeight: 5,
                    map: this.map,
                }));
            });
        }
    }
}