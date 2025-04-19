// import {Pin} from "lucide-react";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


import {Map, APIProvider, AdvancedMarker, Pin, AdvancedMarkerAnchorPoint} from '@vis.gl/react-google-maps';

export default function GoogleMap() {
    return (
        <APIProvider apiKey={API_KEY}>
            <Map
                mapId={"hello"}
                defaultCenter={{lat: 42.32595832307819, lng: -71.14970162467014}}
                defaultZoom={18}
                gestureHandling={'greedy'}>
                <AdvancedMarker position={{lat: 42.32595832307819, lng: -71.14970162467014}} anchorPoint={AdvancedMarkerAnchorPoint.BOTTOM_CENTER}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke="red">

                        <line x1={0} x2={0} y1={10} y2={10}></line>
                    </svg>
                    {/*<img src="../../../src/public/pin.svg" width={100} height={100} alt="pin" />*/}
                </AdvancedMarker>
            </Map>
        </APIProvider>
    );
}