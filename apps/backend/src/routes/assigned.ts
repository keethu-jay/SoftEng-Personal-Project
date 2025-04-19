import express, { Router, Request, Response } from 'express';
import PrismaClient from '../bin/prisma-client';

const router: Router = express.Router();

// Returns all service requests with an assigned employee, if any
router.get('/', async function (req: Request, res: Response) {
    const assignedRequests = await PrismaClient.serviceRequest.findMany({
        where: {
            NOT: {
                assignedEmployee: null,
            },
        },
        // joins service request table with employee and translator request
        include: {
            translatorRequest: true,
            assignedEmployee: true,
        },
    });
    // If no employees are found, send 204 and log it
    if (assignedRequests == null) {
        console.error('No employees found in database!');
        res.sendStatus(204);
    }
    // Otherwise send 200 and the data
    else {
        console.log(assignedRequests);
        res.json(assignedRequests);
    }
});

export default router;
