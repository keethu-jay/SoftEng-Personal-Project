import express, { Router, Request, Response } from 'express';
import PrismaClient from '../bin/prisma-client';
import { Prisma } from 'database';
const router: Router = express.Router();

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

        // Manually attach departments to their hospitals to match existing frontend expectations
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

// Returns all departments in the directory, if any
router.get('/:id/all', async function (req: Request, res: Response) {
    const hospitalId: number = Number(req.params.id);
    const departments = await PrismaClient.department.findMany({
        where: { hospitalId: hospitalId },
    });
    // Always return data, even if empty array
    console.log(`Found ${departments.length} departments for hospital ${hospitalId}`);
    res.json(departments);
});

// Returns all departments in the directory, if any
router.get('/all', async function (req: Request, res: Response) {
    const departments = await PrismaClient.department.findMany();
    // Always return data, even if empty array (findMany never returns null)
    console.log(`Found ${departments.length} departments`);
    res.json(departments);
});

// post request to add departments to the database
router.post('/', async function (req: Request, res: Response) {
    const departmentDataAttempt: Prisma.DepartmentCreateInput = req.body;
    try {
        await PrismaClient.department.create({ data: departmentDataAttempt });
        console.log('Department created');
    } catch (error) {
        console.error(`Unable to create a new department ${departmentDataAttempt}: ${error}`);
        res.sendStatus(400);
        return;
    }

    res.sendStatus(200);
});
// delete all departments in the database
router.delete('/', async function (req: Request, res: Response) {
    try {
        await PrismaClient.department.deleteMany({});
    } catch (error) {
        console.error('Unable to delete a department', error);
        res.sendStatus(400);
        return;
    }
    res.sendStatus(200);
});

export default router;
