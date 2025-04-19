import "./styles.css";
import 'leaflet/dist/leaflet.css';

import {ImageOverlay, MapContainer, SVGOverlay} from "react-leaflet";
import { TileLayer } from "react-leaflet";
import { Marker } from "react-leaflet";
import { Popup } from "react-leaflet";

import Path from '@/LeafletMap/Path.tsx';

import {Coordinates} from 'common/src/constants.ts'
import {useState, useEffect} from "react";
import axios from "axios";

import {API_ROUTES} from "common/src/constants.ts";
// import {Graph} from "common/src/bfs.ts";

export default function LeafletMap() {
    const IMG_WIDTH = 1920;
    const IMG_HEIGHT = 1080;
    const SCALE = 0.001


    // const coords: Coordinates[] = [
    //     {x: 700, y: 1000},
    //     {x: 700, y: 500},
    //     {x: 450, y: 500},
    // ];

    const [coords, setCoords] = useState<Coordinates[]>();
    const start = 'entrance';
    const end = 'helpdesk';

    useEffect(() => {
        axios.get(API_ROUTES.PATHFIND + '?start=' + start + '&end=' + end)
            .then((response => {
                setCoords((response.data as Coordinates[]));
            }));
    }, [])

    // const graph: Graph = new Graph();

    return (
        <>
            <MapContainer
                center={[0, 0]}
                zoom={10}
                // bounds={[[-0.540, -0.960], [0.540, 0.960]]}
                className="w-screen h-screen"
                maxZoom={11}
                minZoom={9}
                maxBounds={[[-IMG_HEIGHT * SCALE, -IMG_WIDTH * SCALE], [IMG_HEIGHT * SCALE, IMG_WIDTH * SCALE]]}
            >
                <TileLayer
                    url="../src/public/literally-just-white.png"
                    bounds={[[-1, -1], [1, 1]]}
                />
                <ImageOverlay url="../src/public/ChestnutHillFloor1Transparent.png" bounds={[[IMG_HEIGHT * SCALE * -0.5, IMG_WIDTH * SCALE * -0.5], [IMG_HEIGHT * SCALE * 0.5, IMG_WIDTH * SCALE * 0.5]]} >

                </ImageOverlay>
                <SVGOverlay bounds={[[IMG_HEIGHT * SCALE * -0.5, IMG_WIDTH * SCALE * -0.5], [IMG_HEIGHT * SCALE * 0.5, IMG_WIDTH * SCALE * 0.5]]} attributes={{stroke: 'red'}}>
                    <Path coords={coords || []} bkHeight={IMG_HEIGHT} bkWidth={IMG_WIDTH} />
                </SVGOverlay>
            </MapContainer>
        </>
    );
}
