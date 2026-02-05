import express, { Router, Request, Response } from 'express';
import PrismaClient from '../bin/prisma-client';
import { Prisma } from 'database';
import { Graph } from '../pathfinding/src/bfs';
import { Coordinates } from 'common/src/constants';

const router: Router = express.Router();

router.get('/edit/:graphId', async (req: Request, res: Response) => {
    const graphDB = await PrismaClient.graph.findUnique({
        where: {
            graphId: Number(req.params.graphId),
        },
        include: {
            Nodes: {
                include: {
                    edgeStart: {
                        include: {
                            startNode: true,
                            endNode: true,
                        },
                    },
                },
            },
        },
    });

    if (!graphDB || graphDB.Nodes.length === 0) {
        console.log('No graph found');
        res.sendStatus(404);
        return;
    }

    const checkedEdgeIds = new Set<number>();

    const edges: Coordinates[][] = [];

    graphDB.Nodes.map((node) => {
        node.edgeStart.map((edge) => {
            if (!checkedEdgeIds.has(edge.edgeId)) {
                checkedEdgeIds.add(edge.edgeId);
                edges.push([
                    {
                        lat: edge.startNode.lat,
                        lng: edge.startNode.lng,
                    },
                    {
                        lat: edge.endNode.lat,
                        lng: edge.endNode.lng,
                    },
                ]);
            }
        });
    });

    res.json(edges);
});

router.get('/pathfind/:graphId/:departmentId', async (req: Request, res: Response) => {
    // get the graph
    const graphDB = await PrismaClient.graph.findUnique({
        where: {
            graphId: Number(req.params.graphId),
        },
        include: {
            Nodes: {
                include: {
                    edgeStart: true,
                    edgeEnd: true,
                },
            },
        },
    });

    // if graph DNE or no nodes in graph return 404
    if (!graphDB || graphDB.Nodes.length === 0) {
        console.log('No graph found');
        res.sendStatus(404);
        return;
    }

    const department = await PrismaClient.department.findUnique({
        where: {
            departmentId: Number(req.params.departmentId),
        },
        select: {
            lat: true,
            lng: true,
        },
    });

    if (!department) {
        console.log('No dept. found');
        res.sendStatus(404);
        return;
    }

    console.log('Department found: ', {
        lat: department.lat,
        lng: department.lng,
    });

    const graphObj = new Graph();

    graphDB.Nodes.map((node) => {
        // Prisma types allow these fields to be null, but the Graph implementation
        // expects concrete string/number values. Fall back to safe defaults when null.
        graphObj.addNode(node.nodeId, node.tags ?? '', {
            lat: node.lat ?? 0,
            lng: node.lng ?? 0,
        });
    });

    graphDB.Nodes.map((node) => {
        node.edgeStart.map((edge) => {
            graphObj.addEdge(edge.startNodeId, edge.endNodeId);
        });
    });

    // Build edge map for direction labels (e.g. "Turn left")
    const edgeMap = new Map<string, { name: string | null; weight: number | null }>();
    graphDB.Nodes.forEach((node) => {
        node.edgeStart.forEach((edge) => {
            const key = `${edge.startNodeId}-${edge.endNodeId}`;
            edgeMap.set(key, {
                name: edge.name ?? null,
                weight: edge.weight ?? null,
            });
        });
    });

    const departmentCoords = { lat: department.lat ?? 0, lng: department.lng ?? 0 };
    const result = graphObj.pathFindWithDirections(departmentCoords, edgeMap, []);

    res.json({
        paths: result.paths,
        directions: result.directions,
    });
});

router.get('/nodes', async (req: Request, res: Response) => {
    const nodes = await PrismaClient.node.findMany();
    // if there are no nodes found
    if (nodes == null) {
        console.error('No nodes found in database');
        res.sendStatus(204);
    } else {
        console.log(nodes); // display node data to console
        res.json(nodes);
    }
});

router.post('/newNode', async (req: Request, res: Response) => {
    const nodeDataAttempt: Prisma.NodeCreateInput = req.body;
    try {
        await PrismaClient.node.create({ data: nodeDataAttempt });
        console.log('Node created');
    } catch (error) {
        console.error(`Unable to create a new node ${nodeDataAttempt}: ${error}`);
        res.sendStatus(400);
        return;
    }
    res.sendStatus(200);
});

router.get('/edges', async (req: Request, res: Response) => {
    const edges = await PrismaClient.edge.findMany();
    // if there are no edges found
    if (edges == null) {
        console.error('No edges found in database');
        res.sendStatus(204);
    } else {
        console.log(edges); // display edge data to console
        res.json(edges);
    }
});

router.post('/newEdge', async (req: Request, res: Response) => {
    const edgeDataAttempt: Prisma.EdgeCreateInput = req.body;
    try {
        await PrismaClient.edge.create({ data: edgeDataAttempt });
        console.log('Edge created');
    } catch (error) {
        console.error(`Unable to create a new edge ${edgeDataAttempt}: ${error}`);
        res.sendStatus(400);
        return;
    }
    res.sendStatus(200);
});

router.patch('/nodes/:nodeId', async (req: Request, res: Response) => {
    const nodeId = Number(req.params.nodeId);
    const { lat, lng } = req.body as { lat?: number; lng?: number };

    if (!nodeId || typeof lat !== 'number' || typeof lng !== 'number') {
        res.status(400).json({ error: 'nodeId, lat and lng are required and must be numbers.' });
        return;
    }

    try {
        await PrismaClient.node.update({
            where: { nodeId },
            data: { lat, lng },
        });
        console.log(`Node ${nodeId} updated to lat=${lat}, lng=${lng}`);
        res.sendStatus(200);
    } catch (error) {
        console.error(`Unable to update node ${nodeId}:`, error);
        res.sendStatus(400);
    }
});

export default router;
