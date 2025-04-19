import { Coordinates } from 'common/src/constants.ts';
import { readFileSync } from 'fs';
import { PrismaClient } from 'database';
import { euclideanDistance } from './distance.ts';

class GraphNode {
    private readonly neighbors: GraphNode[];
    readonly id: number;
    readonly tags: string;
    readonly coords: Coordinates;

    constructor(id: number, tags: string, coords: Coordinates) {
        this.neighbors = [];
        this.id = id;
        this.tags = tags;
        this.coords = coords;
        // this.makeNode().then();
    }
    // //creates a Node data entry in the Node database
    // public async makeNode(): Promise<any> {
    //     const prisma = new PrismaClient();
    //     try {
    //         // const node = await prisma.node.create({
    //         //     data: {
    //         //         name: this.name,
    //         //         xCoord: this.coords.x,
    //         //         yCoord: this.coords.y,
    //         //     },
    //         // });
    //         // console.log('New node created');
    //         // return node;
    //     } catch (e) {
    //         console.error(e);
    //     } finally {
    //         await prisma.$disconnect();
    //     }
    // }

    addNeighbor(node: GraphNode): void {
        this.neighbors.push(node);
    }

    getNeighbors(): GraphNode[] {
        return this.neighbors;
    }
}

class Graph {
    private readonly nodesMap: Map<number, GraphNode>;
    private readonly nodesList: GraphNode[];

    constructor() {
        this.nodesMap = new Map();
        this.nodesList = [];
    }

    addNode(id: number, tags: string, coords: Coordinates): void {
        if (!this.nodesMap.has(id)) {
            const newNode = new GraphNode(id, tags, coords);
            this.nodesMap.set(id, newNode);
            this.nodesList.push(newNode);
        } else {
            throw new Error(`Node ${id} already exists`);
        }
    }

    addEdge(id1: number, id2: number): void {
        const node1 = this.nodesMap.get(id1);
        const node2 = this.nodesMap.get(id2);
        if (!node1 || !node2) {
            throw new Error(`Node ${id2} or Node ${id2} does not exist`);
        } else if (
            node1
                .getNeighbors()
                .map((node) => node.id)
                .indexOf(id2) === -1
        ) {
            node1.addNeighbor(node2);
            node2.addNeighbor(node1);
        }

        // this.makeEdge(name1, name2).then();
    }

    // //creates a Node data entry in the Node database
    // public async makeEdge(startName: string, endName: string): Promise<any> {
    //     const prisma = new PrismaClient();
    //     const startNode = await prisma.node.findFirst({
    //         where: { tags: startName },
    //     });
    //     const endNode = await prisma.node.findFirst({
    //         where: { tags: endName },
    //     });
    //     // If no node with the name is found, send 204 and log it
    //     if (startNode == null || endNode == null) {
    //         console.error(`The node with name ${startName} or ${endName} not found in database!`);
    //         await prisma.$disconnect();
    //         return null;
    //     } else {
    //         const startNodeId = startNode?.nodeId;
    //         const endNodeId = endNode?.nodeId;
    //         try {
    //             const edge = await prisma.edge.create({
    //                 data: {
    //                     weight: 1,
    //                     startNodeId: startNodeId,
    //                     endNodeId: endNodeId,
    //                 },
    //             });
    //             console.log('New edge created');
    //             return edge;
    //         } catch (e) {
    //             console.error(e);
    //         } finally {
    //             await prisma.$disconnect();
    //         }
    //     }
    // }

    // loadNodesFromCSV(filePath: string): void {
    //     const csvContent = readFileSync(filePath, { encoding: 'utf8' });
    //     const lines = csvContent.split('\n');
    //     lines.shift();

    // lines.forEach((line) => {
    //     const trimmed = line.trim();
    //     if (trimmed) {
    //         const [nodeName, xCoord, yCoord] = trimmed.split(',');
    //         const coords: Coordinates = { x: parseFloat(xCoord), y: parseFloat(yCoord) };
    //         this.addNode(nodeName, coords);
    //         console.log(`Node ${nodeName} loaded`);
    //     }
    // });
    // }

    // loadEdgesFromCSV(filePath: string): void {
    //     const csvContent = readFileSync(filePath, { encoding: 'utf8' });
    //     const lines = csvContent.split('\n');
    //     lines.shift(); //remove the header line

    // lines.forEach((line) => {
    //     const trimmed = line.trim();
    //     if (trimmed) {
    //         const [sourceNode, targetNode] = trimmed.split(',');
    //         this.addEdge(sourceNode, targetNode);
    //         console.log(`Nodes ${sourceNode} and ${targetNode} connected`);
    //     }
    // });
    // }

    pathFind(departmentCoords: Coordinates): Coordinates[][] {
        const checkpointCanidates: GraphNode[] = this.nodesList.filter((node) => {
            return node.tags.indexOf('[Checkpoint') >= 0;
        });

        if (checkpointCanidates.length === 0) return [[]];

        // console.log(checkpointCanidates);

        // TODO: select the node with the shortest distance to departmentCoords instead of just the first one
        const checkpointNode = checkpointCanidates.reduce((closest, node) => {
            if (
                euclideanDistance(node.coords, departmentCoords) <
                euclideanDistance(closest.coords, departmentCoords)
            ) {
                return node;
            } else {
                return closest;
            }
        });

        const doorCanidates: GraphNode[] = this.nodesList.filter((node) => {
            return node.tags.indexOf('[Door') >= 0;
        });

        if (doorCanidates.length === 0) return [[]];

        // console.log(doorCanidates);

        // TODO: select the node with the shortest distance to departmentCoords instead of just the first one
        const doorNode = doorCanidates.reduce((closest, node) => {
            if (
                euclideanDistance(node.coords, departmentCoords) <
                euclideanDistance(closest.coords, departmentCoords)
            ) {
                return node;
            } else {
                return closest;
            }
        });

        const entranceNode = this.nodesList.find((node) => {
            return (
                node.tags.indexOf('[Entrance' + doorNode.tags.charAt(doorNode.tags.length - 2)) >= 0
            );
        });

        if (!entranceNode) return [[]];

        // console.log(entranceNode);

        const parkingCanidates: GraphNode[] = this.nodesList.filter((node) => {
            return node.tags.indexOf('[Parking') >= 0;
        });

        if (parkingCanidates.length === 0) return [[]];

        const parkingNode = parkingCanidates[0];

        // console.log(parkingNode);

        return [this.bfs(doorNode, checkpointNode), this.bfs(parkingNode, entranceNode)];

        // const entranceCanidates: GraphNode[] = this.nodesList.filter((node) => {
        //     return node.tags.indexOf('[Entrance') >= 0;
        // });
        // console.log(entranceCanidates.length);
        //
        // const parkingCanidates: GraphNode[] = this.nodesList.filter((node) => {
        //     return node.tags.indexOf('[Parking') >= 0;
        //     // return node.tags === 'Entrance point';
        // });
        // console.log(parkingCanidates.length);
        //
        //

        // return [this.bfs(parkingCanidates[0], entranceCanidates[0])];
    }

    bfs(start: GraphNode, end: GraphNode): Coordinates[] {
        const visited = new Set<number>();
        const queue: { node: GraphNode; path: Coordinates[] }[] = [
            { node: start, path: [start.coords] },
        ];

        while (queue.length > 0) {
            const { node, path } = queue.shift()!;
            if (node.id === end.id) {
                return path;
            }
            visited.add(node.id);
            for (const neighbor of node.getNeighbors()) {
                if (!visited.has(neighbor.id)) {
                    queue.push({ node: neighbor, path: [...path, neighbor.coords] });
                }
            }
        }
        return [];
    }

    // bfs(start: string, goal: string): Coordinates[] | null {
    //     const startNode = this.nodes.get(start);
    //     const goalNode = this.nodes.get(goal);
    //
    //     if (!startNode || !goalNode) {
    //         return null;
    //     }
    //
    //     const visited = new Set<string>();
    //     const queue: { node: GraphNode; path: Coordinates[] }[] = [
    //         { node: startNode, path: [startNode.coords] },
    //     ];
    //
    //     while (queue.length > 0) {
    //         const { node, path } = queue.shift()!;
    //         if (node.name === goal) {
    //             return path;
    //         }
    //
    //         visited.add(node.name);
    //
    //         for (const neighbor of node.getNeighbors()) {
    //             if (!visited.has(neighbor.name)) {
    //                 queue.push({ node: neighbor, path: [...path, neighbor.coords] });
    //             }
    //         }
    //     }
    //
    //     return null; //if no path is found
    // }
}

export { Graph };
