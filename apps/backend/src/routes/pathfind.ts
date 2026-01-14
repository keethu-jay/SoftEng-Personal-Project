import express, { Router, Request, Response } from 'express';
import path from 'path';
import { readFileSync } from 'fs';

const router: Router = express.Router();

type PathFindQuery = {
    start?: string;
    end?: string;
};

type Coordinates = {
    lat: number;
    lng: number;
};

// This endpoint supports the legacy Leaflet map, which uses a lightweight
// CSV graph (apps/backend/src/pathfinding/data) with x/y pixel coordinates.
// We expose those coordinates as {lat,lng} to match the shared Coordinates type.
let graphLoaded = false;
const nodeCoords = new Map<string, Coordinates>();
const adjacency = new Map<string, Set<string>>();

function ensureGraphLoaded(): void {
    if (graphLoaded) return;

    const nodesPath = path.join(__dirname, '../pathfinding/data/nodes.csv');
    const edgesPath = path.join(__dirname, '../pathfinding/data/edges.csv');

    const nodesCsv = readFileSync(nodesPath, { encoding: 'utf8' });
    const edgesCsv = readFileSync(edgesPath, { encoding: 'utf8' });

    // nodes.csv: name,x,y
    const nodeLines = nodesCsv.split(/\r?\n/).filter(Boolean);
    nodeLines.shift(); // header
    for (const line of nodeLines) {
        const [nameRaw, xRaw, yRaw] = line.split(',');
        const name = (nameRaw ?? '').trim();
        if (!name) continue;
        const x = Number.parseFloat((xRaw ?? '').trim());
        const y = Number.parseFloat((yRaw ?? '').trim());
        if (Number.isNaN(x) || Number.isNaN(y)) continue;
        nodeCoords.set(name, { lat: x, lng: y });
        if (!adjacency.has(name)) adjacency.set(name, new Set());
    }

    // edges.csv: start,end
    const edgeLines = edgesCsv.split(/\r?\n/).filter(Boolean);
    edgeLines.shift(); // header
    for (const line of edgeLines) {
        const [aRaw, bRaw] = line.split(',');
        const a = (aRaw ?? '').trim();
        const b = (bRaw ?? '').trim();
        if (!a || !b) continue;
        if (!nodeCoords.has(a) || !nodeCoords.has(b)) continue;
        if (!adjacency.has(a)) adjacency.set(a, new Set());
        if (!adjacency.has(b)) adjacency.set(b, new Set());
        adjacency.get(a)!.add(b);
        adjacency.get(b)!.add(a);
    }

    graphLoaded = true;
    console.log(`pathfind: loaded ${nodeCoords.size} nodes, ${edgeLines.length} edges`);
}

function bfs(start: string, end: string): Coordinates[] {
    if (!nodeCoords.has(start) || !nodeCoords.has(end)) return [];
    if (start === end) return [nodeCoords.get(start)!];

    const queue: string[] = [start];
    const visited = new Set<string>([start]);
    const parent = new Map<string, string | null>();
    parent.set(start, null);

    while (queue.length > 0) {
        const cur = queue.shift()!;
        const neighbors = adjacency.get(cur);
        if (!neighbors) continue;
        for (const next of neighbors) {
            if (visited.has(next)) continue;
            visited.add(next);
            parent.set(next, cur);
            if (next === end) {
                queue.length = 0;
                break;
            }
            queue.push(next);
        }
    }

    if (!parent.has(end)) return [];

    const pathNodes: string[] = [];
    let cur: string | null = end;
    while (cur !== null) {
        pathNodes.push(cur);
        cur = parent.get(cur) ?? null;
    }
    pathNodes.reverse();

    return pathNodes.map((n) => nodeCoords.get(n)!).filter(Boolean);
}

router.get('/', async (req: Request, res: Response) => {
    ensureGraphLoaded();

    const query = req.query as PathFindQuery;
    const start = (query.start ?? '').toString().trim();
    const end = (query.end ?? '').toString().trim();

    if (!start || !end) {
        res.status(400).json({ error: 'Missing required query params: start, end' });
        return;
    }

    const coords = bfs(start, end);
    res.json(coords);
});

export default router;
