// <replace with imports>
import React from 'react';

import GGMap from "@/GoogleMap/GoogleMap.tsx";
import MapComponent from "@/GoogleMap/GoogleMap.tsx";
import LeafletMap from "@/LeafletMap/LeafletMap.tsx";

export default function Map() {

    return (
        <div id="map" className="fixed">
            {/*<h2 className="text-4xl font-bold">Chestnut Hill</h2>*/}
            {/*<br/>*/}
            {/*<p className="text-2xl ">Parking Lot</p>*/}
            {/*<br />*/}
            {/*<img src="src/public/ChestnutHillParkingTransparent.png" width="1200" alt="Floorplan of Mass General Brigham's Chestnut Hill's Location's parking lot."*/}
            {/*    className="flex items-center justify-center w-full" />*/}
            {/*<br />*/}
            {/*<br />*/}
            {/*<p className="text-2xl">Floor 1</p>*/}
            {/*<br />*/}
            {/*< img src="src/public/ChestnutHillFloor1Transparent.png" width="1200" alt="Floorplan of floor 1 of Mass General Brigham's Chestnut Hill location"*/}
            {/*      className="flex items-center justify-center w-full"/>*/}
            {/*<div className="flex items-center justify-center w-full">*/}
            {/*</div>*/}

            <LeafletMap></LeafletMap>

        </div>
    );
}

