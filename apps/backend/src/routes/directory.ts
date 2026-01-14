import express, { Router, Request, Response } from 'express';
import PrismaClient from '../bin/prisma-client';
import { Prisma } from 'database';

const router: Router = express.Router();

/**
 * GET /api/department
 *
 * Fetches all hospitals with their associated departments.
 *
 * Returns a JSON array of hospitals, each containing:
 * - Hospital information (id, name, address, coordinates, etc.)
 * - Departments array with full department details including graph data
 *
 * @returns {Promise<void>} Sends JSON response with hospitals and departments
 */
router.get('/', async (req, res) => {
    try {
        // Fetch hospitals and departments separately to avoid nested include issues
        const hospitals = await PrismaClient.hospital.findMany();
        const departments = await PrismaClient.department.findMany({
            include: {
                Graph: true,
            },
            orderBy: {
                name: 'asc',
            },
        });

        // Manually attach departments to their hospitals to match frontend expectations
        const data = hospitals.map((h) => ({
            ...h,
            Departments: departments.filter((d) => d.hospitalId === h.hospitalId),
        }));

        console.log(`Found ${data.length} hospitals (manually joined with departments)`);
        res.json(data);
    } catch (error) {
        console.error('Error fetching hospitals/departments for directory:', error);
        res.status(500).json({
            error: 'Failed to load hospitals/departments',
            details: String(error),
        });
    }
});

/**
 * GET /api/department/all
 *
 * Fetches all departments in the system, regardless of hospital.
 *
 * IMPORTANT: This route must come before /:id/all to avoid route conflicts.
 * Express matches routes in order, so /all would be caught by /:id/all if placed after.
 *
 * Returns a JSON array of departments with selected fields:
 * - departmentId, name, floorNum, room, building, telephone, hours, hospitalId
 *
 * @returns {Promise<void>} Sends JSON response with all departments
 */
router.get('/all', async function (req: Request, res: Response) {
    try {
        const departments = await PrismaClient.department.findMany({
            select: {
                departmentId: true,
                name: true,
                floorNum: true,
                room: true,
                building: true,
                telephone: true,
                hours: true,
                hospitalId: true,
            },
        });

        console.log(`Found ${departments.length} departments`);
        res.json(departments);
    } catch (error: any) {
        console.error('Error fetching all departments:', error);

        // Handle system resource exhaustion errors
        if (error.code === 'ENOBUFS') {
            console.error('System resource exhaustion - too many connections');
            res.status(503).json({
                error: 'Service temporarily unavailable - too many connections',
            });
        } else {
            res.status(500).json({
                error: 'Failed to load departments',
                details: error.message,
            });
        }
    }
});

/**
 * GET /api/department/:id/all
 *
 * Fetches all departments for a specific hospital.
 *
 * @param {string} id - The hospital ID from the URL parameter
 * @returns {Promise<void>} Sends JSON response with departments for the specified hospital
 */
router.get('/:id/all', async function (req: Request, res: Response) {
    const hospitalId: number = Number(req.params.id);
    const departments = await PrismaClient.department.findMany({
        where: { hospitalId: hospitalId },
    });

    console.log(`Found ${departments.length} departments for hospital ${hospitalId}`);
    res.json(departments);
});

/**
 * POST /api/department
 *
 * Creates a new department in the database.
 *
 * @param {Prisma.DepartmentCreateInput} req.body - Department data to create
 * @returns {Promise<void>} Sends 200 status on success, 400 on error
 */
router.post('/', async function (req: Request, res: Response) {
    const departmentDataAttempt: Prisma.DepartmentCreateInput = req.body;

    try {
        await PrismaClient.department.create({ data: departmentDataAttempt });
        console.log('Department created');
        res.sendStatus(200);
    } catch (error) {
        console.error(`Unable to create a new department ${departmentDataAttempt}: ${error}`);
        res.sendStatus(400);
    }
});

/**
 * DELETE /api/department
 *
 * Deletes all departments from the database.
 *
 * WARNING: This is a destructive operation that removes all department records.
 *
 * @returns {Promise<void>} Sends 200 status on success, 400 on error
 */
router.delete('/', async function (req: Request, res: Response) {
    try {
        await PrismaClient.department.deleteMany({});
        res.sendStatus(200);
    } catch (error) {
        console.error('Unable to delete departments', error);
        res.sendStatus(400);
    }
});

export default router;
