import { Graph } from './bfs';
import type { Coordinates } from 'common/src/constants';

export function findClosestParking(
    graph: Graph,
    departmentNode: string,
    parkingNodes: string[]
): { path: Coordinates[] | null; from: string } {
    let shortestPath = null;
    let closestParking = '';

    for (const parking of parkingNodes) {
        // const path = graph.bfs(parking, departmentNode);
        //
        // if (path && (!shortestPath || path.length < shortestPath.length)) {
        //     shortestPath = path;
        //     closestParking = parking;
        // }
    }
    return { path: shortestPath, from: closestParking };
}
