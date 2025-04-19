import express, { Router, Request, Response } from 'express';
import PrismaClient from '../bin/prisma-client';
import { Prisma } from 'database';
const router: Router = express.Router();

// GET ALL SERVICE REQUESTS
router.get('/', async function (req: Request, res: Response) {
    // Query db, store response
    const requests = await PrismaClient.serviceRequest.findMany({
        include: {
            translatorRequest: true,
            equipmentRequest: true,
            securityRequest: true,
            sanitationRequest: true,
        },
    });
    // If no service requests are found, send 204 and log it
    if (requests == null) {
        console.error('No service requests found in database!');
        res.sendStatus(204);
    }
    // Otherwise send 200 and the data
    else {
        console.log(requests);
        res.json(requests);
    }
});

// GET ALL TRANSLATOR REQUESTS
router.get('/translator', async function (req: Request, res: Response) {
    // Find all service request of type translator request
    const translatorRequests = await PrismaClient.serviceRequest.findMany({
        where: {
            translatorRequest: {
                isNot: null,
            },
        },
        include: {
            translatorRequest: true,
        },
    });

    // If no service request with the ID is found, send 204 and log it
    if (translatorRequests == null) {
        console.error(`No translator requests found in database!`);
        res.sendStatus(204);
    }
    // Otherwise send 200 and the data
    else {
        console.log(translatorRequests);
        res.json(translatorRequests);
    }
});

// GET ALL SECURITY REQUESTS
router.get('/security', async function (req: Request, res: Response) {
    // Find all service request of type equipment request
    const securityRequests = await PrismaClient.serviceRequest.findMany({
        where: {
            securityRequest: {
                isNot: null,
            },
        },
        include: {
            securityRequest: true,
        },
    });

    // If no service request with the ID is found, send 204 and log it
    if (securityRequests == null) {
        console.error(`No security requests found in database!`);
        res.sendStatus(204);
    }
    // Otherwise send 200 and the data
    else {
        console.log(securityRequests);
        res.json(securityRequests);
    }
});

// GET ALL MEDICAL EQUIPMENT REQUESTS
router.get('/equipment', async function (req: Request, res: Response) {
    // Find all service request of type equipment request
    const equipmentRequests = await PrismaClient.serviceRequest.findMany({
        where: {
            equipmentRequest: {
                isNot: null,
            },
        },
        include: {
            equipmentRequest: true,
        },
    });

    // If no service request with the ID is found, send 204 and log it
    if (equipmentRequests == null) {
        console.error(`No medical device requests found in database!`);
        res.sendStatus(204);
    }
    // Otherwise send 200 and the data
    else {
        console.log(equipmentRequests);
        res.json(equipmentRequests);
    }
});

// GET ALL SANITATION REQUESTS
router.get('/sanitation', async function (req: Request, res: Response) {
    // Find all service request of type translator request
    const sanitationRequests = await PrismaClient.serviceRequest.findMany({
        where: {
            sanitationRequest: {
                isNot: null,
            },
        },
        include: {
            sanitationRequest: true,
        },
    });

    // If no service request with the ID is found, send 204 and log it
    if (sanitationRequests == null) {
        console.error(`No sanitation requests found in database!`);
        res.sendStatus(204);
    }
    // Otherwise send 200 and the data
    else {
        console.log(sanitationRequests);
        res.json(sanitationRequests);
    }
});

// POST TRANSLATOR REQUESTS TO DATABASE
router.post('/translator', async function (req: Request, res: Response) {
    const {
        languageTo,
        languageFrom,
        roomNum,
        employeeRequestedById,
        departmentUnderId,
        priority,
        requestStatus,
        comments,
    } = req.body;
    try {
        await PrismaClient.serviceRequest.create({
            data: {
                assignedEmployeeId: null,
                roomNum,
                requestStatus,
                priority,
                departmentUnderId,
                employeeRequestedById,
                comments,
                translatorRequest: {
                    create: {
                        languageFrom,
                        languageTo,
                        startDateTime: req.body.startDateTime + ':00.000Z',
                        endDateTime: req.body.endDateTime + ':00.000Z',
                    },
                },
            },
        });
        console.log('Service request created');
    } catch (error) {
        console.error(`Unable to create a new service request: ${error}`);
        res.sendStatus(400);
        return;
    }

    res.sendStatus(200);
});

// POST SECURITY REQUESTS TO DATABASE
router.post('/security', async function (req: Request, res: Response) {
    const {
        numOfGuards,
        securityType,
        roomNum,
        employeeRequestedById,
        departmentUnderId,
        priority,
        requestStatus,
        comments,
    } = req.body;
    try {
        await PrismaClient.serviceRequest.create({
            data: {
                assignedEmployeeId: null,
                employeeRequestedById,
                departmentUnderId,
                roomNum,
                priority,
                requestStatus,
                comments,
                securityRequest: {
                    create: {
                        numOfGuards,
                        securityType,
                    },
                },
            },
        });
        console.log('Service request created');
    } catch (error) {
        console.error(`Unable to create a new service request: ${error}`);
        res.sendStatus(400);
        return;
    }

    res.sendStatus(200);
});

// POST EQUIPMENT REQUESTS TO DATABASE
router.post('/equipment', async function (req: Request, res: Response) {
    const {
        medicalDevice,
        quantity,
        comments,
        signature,
        roomNum,
        employeeRequestedById,
        departmentUnderId,
        priority,
        requestStatus,
    } = req.body;
    try {
        await PrismaClient.serviceRequest.create({
            data: {
                assignedEmployeeId: null,
                employeeRequestedById,
                departmentUnderId,
                roomNum,
                priority,
                requestStatus,
                comments,
                equipmentRequest: {
                    create: {
                        medicalDevice,
                        quantity,
                        signature,
                        startDateTime: req.body.startDateTime + ':00.000Z',
                        endDateTime: req.body.endDateTime + ':00.000Z',
                    },
                },
            },
        });
        console.log('Service request created');
    } catch (error) {
        console.error(`Unable to create a new service request: ${error}`);
        res.sendStatus(400);
        return;
    }
    res.sendStatus(200);
});

// POST SANITATION REQUESTS TO DATABASE
router.post('/sanitation', async (req, res) => {
    const {
        roomNum,
        type,
        status,
        comments,
        employeeRequestedById,
        departmentUnderId,
        priority,
        requestStatus,
    } = req.body;

    try {
        await PrismaClient.serviceRequest.create({
            data: {
                assignedEmployeeId: null,
                employeeRequestedById,
                departmentUnderId,
                roomNum,
                priority,
                requestStatus,
                comments,
                sanitationRequest: {
                    create: {
                        type,
                        status,
                    },
                },
            },
        });

        console.log('Service request created');
    } catch (error) {
        console.error('Error creating sanitation request:', error);
        res.status(500).json({ error: 'Error creating sanitation request' });
    }
    res.sendStatus(200);
});

// Return a service request with specified id
router.get('/:id', async function (req: Request, res: Response) {
    // Parse the id param into a variable
    const requestNum: number = Number(req.params.id);
    // Find the service request with the id
    const request = await PrismaClient.serviceRequest.findUnique({
        where: { requestId: requestNum },
        include: {
            translatorRequest: true,
            equipmentRequest: true,
            securityRequest: true,
            sanitationRequest: true,
        },
    });

    // If no service request with the ID is found, send 204 and log it
    if (request == null) {
        console.error(`The request with Id ${requestNum} not found in database!`);
        res.sendStatus(204);
    }
    // Otherwise send 200 and the data
    else {
        console.log(request);
        res.json(request);
    }
});

// Update service request with specified id
router.put('/:id', async function (req: Request, res: Response) {
    // parse id into variable
    const requestId: number = Number(req.params.id);

    // find translator request with id
    const request = await PrismaClient.translatorRequest.findUnique({
        where: { serviceRequestId: requestId },
    });

    // error if no service request with the id is found
    if (request == null) {
        console.error(`The request with Id ${requestId} not found in database!`);
        res.status(404);
    }
    // success: update specified service request
    else {
        try {
            const {
                languageTo,
                languageFrom,
                roomNum,
                startDateTime,
                endDateTime,
                assignedEmployeeId,
                employeeRequestedById,
                departmentUnderId,
                priority,
                requestStatus,
                medicalDevice,
                quantity,
                signature,
                numOfGuards,
                securityType,
                type,
                status,
                comments,
            } = req.body;
            const [
                updateTranslatorRequest,
                updateServiceRequest,
                updateSecurityRequest,
                updateEquipmentRequest,
                updateSanitationRequest,
            ] = await PrismaClient.$transaction([
                PrismaClient.translatorRequest.update({
                    where: { serviceRequestId: requestId },
                    data: {
                        languageTo,
                        languageFrom,
                        startDateTime,
                        endDateTime,
                    },
                }),
                PrismaClient.equipmentRequest.update({
                    where: { serviceRequestId: requestId },
                    data: {
                        medicalDevice,
                        quantity,
                        signature,
                    },
                }),
                PrismaClient.securityRequest.update({
                    where: { serviceRequestId: requestId },
                    data: {
                        numOfGuards,
                        securityType,
                    },
                }),
                PrismaClient.sanitationRequest.update({
                    where: { serviceRequestId: requestId },
                    data: {
                        type,
                        status,
                    },
                }),
                PrismaClient.serviceRequest.update({
                    where: { requestId: requestId },
                    data: {
                        assignedEmployeeId,
                        priority,
                        requestStatus,
                        employeeRequestedById,
                        departmentUnderId,
                        roomNum,
                        comments,
                    },
                }),
            ]);
            // send 200 and updated service request if success
            res.status(200).json({
                message: 'Successfully updated service request',
                updateServiceRequest,
                updateTranslatorRequest,
                updateSecurityRequest,
                updateEquipmentRequest,
                updateSanitationRequest,
            });
            // send 400 and error message if request cannot be updated
        } catch (error) {
            console.error(`Unable to update service request ${requestId}: ${error}`);
            res.sendStatus(400);
        }
    }
});

// Delete service request with specific id
router.delete('/:id', async function (req: Request, res: Response) {
    // parse id into variable
    const requestId: number = Number(req.params.id);
    // find service request with id
    const serviceRequest = await PrismaClient.serviceRequest.findUnique({
        where: { requestId: requestId },
    });
    const translatorRequest = await PrismaClient.translatorRequest.findUnique({
        where: { serviceRequestId: requestId },
    });
    const equipmentRequest = await PrismaClient.equipmentRequest.findUnique({
        where: { serviceRequestId: requestId },
    });
    const securityRequest = await PrismaClient.securityRequest.findUnique({
        where: { serviceRequestId: requestId },
    });
    const sanitationRequest = await PrismaClient.securityRequest.findUnique({
        where: { serviceRequestId: requestId },
    });

    // error if no service request with the id is found
    if (
        serviceRequest == null &&
        translatorRequest == null &&
        equipmentRequest == null &&
        securityRequest == null &&
        sanitationRequest == null
    ) {
        console.error(`The request with Id ${requestId} not found in database!`);
        res.status(404);
    }
    // success: delete specified service request
    else {
        try {
            const [
                deleteTranslatorRequest,
                deleteEquipmentRequest,
                deleteServiceRequest,
                deleteSecurityRequest,
                deleteSanitationRequest,
            ] = await PrismaClient.$transaction([
                PrismaClient.translatorRequest.delete({
                    where: { serviceRequestId: requestId },
                }),
                PrismaClient.equipmentRequest.delete({
                    where: { serviceRequestId: requestId },
                }),
                PrismaClient.serviceRequest.delete({
                    where: { requestId: requestId },
                }),
                PrismaClient.securityRequest.delete({
                    where: { serviceRequestId: requestId },
                }),
                PrismaClient.sanitationRequest.delete({
                    where: { serviceRequestId: requestId },
                }),
            ]);

            // send 200 if success
            res.status(200).json({
                message: 'Successfully deleted service request',
                deleteServiceRequest,
                deleteTranslatorRequest,
                deleteEquipmentRequest,
                deleteSecurityRequest,
                deleteSanitationRequest,
            });
            // send 400 and error message if request cannot be updated
        } catch (error) {
            console.error(`Unable to delete service request ${requestId}: ${error}`);
            res.sendStatus(400);
        }
    }
});

export default router;
