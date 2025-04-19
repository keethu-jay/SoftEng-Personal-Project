// import { describe, test, expect, beforeAll, afterAll } from 'vitest';
// import { Graph } from '../src/bfs.ts';
// import type { Coordinates } from 'common/src/constants.ts';
// import { writeFileSync, unlinkSync } from 'fs';
// import path from 'path';
//
// describe('Manual Graph Setup', () => {
//     test('BFS finds correct path between nodes', () => {
//         const graph = new Graph();
//
//         const A: Coordinates = { x: 0, y: 0 };
//         const B: Coordinates = { x: 1, y: 0 };
//         const C: Coordinates = { x: 2, y: 0 };
//
//         graph.addNode('A', A);
//         graph.addNode('B', B);
//         graph.addNode('C', C);
//         graph.addEdge('A', 'B');
//         graph.addEdge('B', 'C');
//
//         const path = graph.bfs('A', 'C');
//         expect(path).toEqual([A, B, C]);
//     });
// });
//
// describe('CSV Graph Setup', () => {
//     const nodesCSVPath = path.join(__dirname, 'temp_nodes.csv');
//     const edgesCSVPath = path.join(__dirname, 'temp_edges.csv');
//
//     beforeAll(() => {
//         writeFileSync(nodesCSVPath, 'name,x,y\nA,0,0\nB,1,0\nC,2,0');
//         writeFileSync(edgesCSVPath, 'source,target\nA,B\nB,C');
//     });
//
//     afterAll(() => {
//         unlinkSync(nodesCSVPath);
//         unlinkSync(edgesCSVPath);
//     });
//
//     test('loads nodes and edges from CSV and finds correct BFS path', () => {
//         const graph = new Graph();
//         graph.loadNodesFromCSV(nodesCSVPath);
//         graph.loadEdgesFromCSV(edgesCSVPath);
//
//         const path = graph.bfs('A', 'C');
//         expect(path).toEqual([
//             { x: 0, y: 0 },
//             { x: 1, y: 0 },
//             { x: 2, y: 0 },
//         ]);
//     });
// });
