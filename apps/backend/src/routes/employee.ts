import express, { Router, Request, Response } from 'express';
import PrismaClient from '../bin/prisma-client';
import { Prisma } from 'database';
const router: Router = express.Router();

// Returns all employees, if any
router.get('/', async function (req: Request, res: Response) {
    // Query db, store response
    const employees = await PrismaClient.employee.findMany();
    // If no employees are found, send 204 and log it
    if (employees == null) {
        console.error('No employees found in database!');
        res.sendStatus(204);
    }
    // Otherwise send 200 and the data
    else {
        console.log(employees);
        res.json(employees);
    }
});

// post request to add employees to the database
router.post('/', async function (req: Request, res: Response) {
    const employeeDataAttempt: Prisma.EmployeeCreateInput = req.body;
    try {
        await PrismaClient.employee.create({ data: employeeDataAttempt });
        console.log('Employee created');
    } catch (error) {
        console.error(`Unable to create a new employee ${employeeDataAttempt}: ${error}`);
        res.sendStatus(400);
        return;
    }

    res.sendStatus(200);
});

// Return an employee with specified id
router.get('/:id', async function (req: Request, res: Response) {
    // Parse the id param into a variable
    const employeeId: number = Number(req.params.id);
    // Find the employee with the id
    const employee = await PrismaClient.employee.findUnique({
        where: { employeeId: employeeId },
    });

    // If no employee with the ID is found, send 204 and log it
    if (employee == null) {
        console.error(`The employee with Id ${employeeId} not found in database!`);
        res.sendStatus(204);
    }
    // Otherwise send 200 and the data
    else {
        console.log(employee);
        res.json(employee);
    }
});

// Update employee with specified id
router.put('/:id', async function (req: Request, res: Response) {
    // parse id into variable
    const employeeId: number = Number(req.params.id);

    // find employee with id
    const request = await PrismaClient.employee.findUnique({
        where: { employeeId: employeeId },
    });

    // error if no employee with the id is found
    if (request == null) {
        console.error(`The employee with Id ${employeeId} not found in database!`);
        res.status(404);
    }
    // success: update specified employee
    else {
        try {
            const updateRequest = await PrismaClient.employee.update({
                where: { employeeId: employeeId },
                data: req.body,
            });
            // send 200 and updated employee if success
            res.status(200).json(updateRequest);
            // send 400 and error message if request cannot be updated
        } catch (error) {
            console.error(`Unable to update employee ${employeeId}: ${error}`);
            res.sendStatus(400);
        }
    }
});

// Delete employee with specific id
router.delete('/:id', async function (req: Request, res: Response) {
    // parse id into variable
    const employeeId: number = Number(req.params.id);
    // find service request with id
    const employee = await PrismaClient.employee.findUnique({
        where: { employeeId: employeeId },
    });

    // error if no service request with the id is found
    if (employee == null) {
        console.error(`The employee with Id ${employeeId} not found in database!`);
        res.status(404);
    }
    // success: delete specified employee
    else {
        try {
            const deleteEmployee = await PrismaClient.employee.delete({
                where: { employeeId: employeeId },
            });

            // send 200 if success
            res.status(200).json({
                message: 'Successfully deleted employee',
                deleteEmployee: deleteEmployee,
            });
            // send 400 and error message if request cannot be updated
        } catch (error) {
            console.error(`Unable to delete employee ${employeeId}: ${error}`);
            res.sendStatus(400);
        }
    }
});

export default router;
