// import express, { Router, Request, Response } from 'express';
// const router: Router = express.Router();
// import path from 'path';
//
// import { Graph } from 'backend/src/pathfinding/src/bfs.ts';
// import { Coordinates } from 'common/src/constants.ts';
//
// type PathFindQuery = {
//     start: string;
//     end: string;
// };
//
// router.get('/', async (req: Request, res: Response) => {
//     const graph = new Graph();
//     graph.loadNodesFromCSV(path.join(__dirname, '../pathfinding/data/nodes.csv'));
//     graph.loadEdgesFromCSV(path.join(__dirname, '../pathfinding/data/edges.csv'));
//     console.log(req.params.start, req.params.end);
//     const query = req.query as PathFindQuery;
//     const coords = graph.bfs(query.start || '', query.end || '');
//     res.json(coords || []);
// });
//
// export default router;
