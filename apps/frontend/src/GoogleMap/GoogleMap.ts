import {GoogleMapProps} from "@/GoogleMap/GoogleMap.tsx"
import axios from "axios";
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
            this.directionsRenderer = new google.maps.DirectionsRenderer({
                map: this.map
            });

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
        }
        else {
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
                    } else {
                        window.alert('Directions request failed due to ' + status);
                    }
                }
            );
        }
    }

    update(props: GoogleMapProps): void {
        console.log('Update method: ' + props.graph?.graphId);
        // Reset the currently showing floor map and path
        if (this.floorMap !== null) {
            this.floorMap.setMap(null);
            this.floorMap = null;
        }
        if (this.paths.length > 0) {
            this.paths.map(path => path.setMap(null));
            this.paths = [];
        }
        if (this.nodes.length > 0) {
            this.nodes.map(node => node.setMap(null));
            this.nodes = [];
        }

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
            this.floorMap.setMap(this.map);
        }
        if (props.department || props.graph) {

            const route = this.editor ?
                API_ROUTES.PATHFINDING + '/edit/' + props.graph?.graphId :
                API_ROUTES.PATHFINDING + '/pathfind/' + props.graph?.graphId + '/' + props.department?.departmentId;

            console.log('Get route ' + route);

            axios.get(route).then((response) => {

                console.log('Got route');
            //     const points: Coordinates[] = response.data[0];
            //
            //     const line: google.maps.LatLngLiteral[] = points.map((point) => {
            //         return {
            //             lat: point.x,
            //             lng: point.y,
            //         };
            //     });
            //
            //     this.path = new google.maps.Polyline({
            //         path: line,
            //         strokeColor: '#0077FF',
            //         strokeOpacity: 1.0,
            //         strokeWeight: 2,
            //         map: this.map,
            //     })
            // });
                const rawData: Coordinates[][] = response.data;

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

                rawData.map(pair => pair.map(point => {
                    this.nodes.push(new google.maps.Circle({
                        strokeColor: '#00FF88',
                        strokeOpacity: 1,
                        strokeWeight: 1,
                        fillColor: '#00FF88',
                        fillOpacity: 1,
                        map: this.map,
                        center: {
                            lat: point.lat,
                            lng: point.lng,
                        },
                        radius: 0.3,
                    }));
                }));
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
    }
}