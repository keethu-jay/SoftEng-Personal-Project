// import { describe, test, expect } from 'vitest';
// import { Graph } from '../src/bfs';
// import { findClosestParking } from '../src/findClosestParking';
//
// describe('findClosestParking', () => {
//     test('find closest parking to department ', () => {
//         const graph = new Graph();
//
//         graph.addNode('parkingA', { x: 0, y: 0 });
//         graph.addNode('parkingB', { x: 10, y: 0 });
//         graph.addNode('dept', { x: 2, y: 0 });
//
//         graph.addEdge('parkingA', 'dept');
//         graph.addEdge('parkingB', 'dept');
//
//         const result = findClosestParking(graph, 'dept', ['parkingA', 'parkingB']);
//
//         expect(result.from).toBe('parkingA');
//         expect(result.path).toEqual([
//             { x: 0, y: 0 },
//             { x: 2, y: 0 },
//         ]);
//     });
// });
