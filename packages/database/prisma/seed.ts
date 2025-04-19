import {PrismaClient} from '../.prisma/client';
const prisma = new PrismaClient();


async function main() {

    // Seed employees
    console.log('Seeding employees...');
    const employees = [
        await prisma.employee.upsert({
            where: {employeeId: 1},
            update: {},
            create: {
                email: 'jlsmith@gmail.com',
                password: 'rhe0324!',
                firstName: 'Jen',
                middleInitial: 'L',
                lastName: 'Smith',
                occupation: 'Nurse'
            }
        }),
        await prisma.employee.upsert({
            where: {employeeId: 2},
            update: {},
            create: {
                email: 'mkhaven@gmail.com',
                password: 'ehw2153!',
                firstName: 'Matthew',
                middleInitial: 'K',
                lastName: 'Haven',
                occupation: 'Doctor'
            }
        }),
        await prisma.employee.upsert({
            where: {employeeId: 3},
            update: {},
            create: {
                email: 'palong@gmail.com',
                password: 'jye4832!',
                firstName: 'Piper',
                middleInitial: 'A',
                lastName: 'Long',
                occupation: 'Nurse'
            }
        }),
        await prisma.employee.upsert({
            where: {employeeId: 4},
            update: {},
            create: {
                email: 'nrlee@gmail.com',
                password: 'gsl9472!',
                firstName: 'Nicole',
                middleInitial: 'R',
                lastName: 'Lee',
                occupation: 'Administrator'
            }
        }),
        await prisma.employee.upsert({
            where: {employeeId: 5},
            update: {},
            create: {
                email: 'kkramos@gmail.com',
                password: 'dhs9572!',
                firstName: 'Karina',
                middleInitial: 'K',
                lastName: 'Ramos',
                occupation: 'Doctor'
            }
        })
    ];
    console.log('Employees seeded!');

    console.log(employees);

    // Seed translator requests
    // console.log('Seeding translator requests...');
    // const serviceRequests = [
    //     await prisma.serviceRequest.upsert({
    //         where: { requestId: 1},
    //         update: {},
    //         create: {
    //             assignedEmployeeId: null,
    //         },
    //     }),
    //     await prisma.serviceRequest.upsert({
    //         where: { requestId: 2},
    //         update: {},
    //         create: {
    //             assignedEmployeeId: 1,
    //         },
    //     }),
    //     await prisma.serviceRequest.upsert({
    //         where: { requestId: 3},
    //         update: {},
    //         create: {
    //             assignedEmployeeId: 2,
    //         },
    //     }),
    //     await prisma.serviceRequest.upsert({
    //         where: { requestId: 4},
    //         update: {},
    //         create: {
    //             assignedEmployeeId: null,
    //         },
    //     }),
    //     await prisma.serviceRequest.upsert({
    //         where: { requestId: 5},
    //         update: {},
    //         create: {
    //             assignedEmployeeId: 3,
    //         },
    //     }),
    //     await prisma.serviceRequest.upsert({
    //         where: { requestId: 6},
    //         update: {},
    //         create: {
    //             assignedEmployeeId: null,
    //         },
    //     }),
    //     await prisma.serviceRequest.upsert({
    //         where: { requestId: 7},
    //         update: {},
    //         create: {
    //             assignedEmployeeId: 4,
    //         },
    //     }),
    //     await prisma.serviceRequest.upsert({
    //         where: { requestId: 8},
    //         update: {},
    //         create: {
    //             assignedEmployeeId: 3,
    //         },
    //     }),
    //     await prisma.serviceRequest.upsert({
    //         where: { requestId: 9},
    //         update: {},
    //         create: {
    //             assignedEmployeeId: null,
    //         },
    //     }),
    //     await prisma.serviceRequest.upsert({
    //         where: { requestId: 10},
    //         update: {},
    //         create: {
    //             assignedEmployeeId: null,
    //         },
    //     }),
    //     await prisma.serviceRequest.upsert({
    //         where: { requestId: 11},
    //         update: {},
    //         create: {
    //             assignedEmployeeId: null,
    //         },
    //     }),
    // ];
    // const translatorRequests = [
    //     await prisma.translatorRequest.upsert({
    //         where: {serviceRequestId: serviceRequests[0].requestId},
    //         update: {},
    //         create: {
    //             serviceRequestId: serviceRequests[0].requestId,
    //             languageFrom: 'Vietnamese',
    //             languageTo: 'English',
    //             roomNum: '302',
    //             startDateTime: new Date('2025-04-01T22:07:00.639Z'),
    //             endDateTime: new Date('2025-04-01T22:07:45.639Z'),
    //         }
    //     }),
    //     await prisma.translatorRequest.upsert({
    //         where: {serviceRequestId: serviceRequests[1].requestId},
    //         update: {},
    //         create: {
    //             serviceRequestId: serviceRequests[1].requestId,
    //             languageFrom: 'Spanish',
    //             languageTo: 'English',
    //             roomNum: '207',
    //             startDateTime: new Date('2025-04-11T22:04:30.639Z'),
    //             endDateTime: new Date('2025-04-11T22:05:00.639Z'),
    //         },
    //     }),
    //     await prisma.translatorRequest.upsert({
    //         where: {serviceRequestId: serviceRequests[2].requestId},
    //         update: {},
    //         create: {
    //             serviceRequestId: serviceRequests[2].requestId,
    //             languageFrom: 'English',
    //             languageTo: 'Portuguese',
    //             roomNum: '119',
    //             startDateTime: new Date('2025-04-18T22:05:00.639Z'),
    //             endDateTime: new Date('2025-04-18T22:05:40.639Z'),
    //         },
    //     }),
    //     await prisma.translatorRequest.upsert({
    //         where: {serviceRequestId: serviceRequests[3].requestId},
    //         update: {},
    //         create: {
    //             serviceRequestId: serviceRequests[3].requestId,
    //             languageFrom: 'Chinese',
    //             languageTo: 'English',
    //             roomNum: '222',
    //             startDateTime: new Date('2025-04-02T22:01:15.639Z'),
    //             endDateTime: new Date('2025-04-02T22:02:00.639Z'),
    //         },
    //     }),
    //     await prisma.translatorRequest.upsert({
    //         where: {serviceRequestId: serviceRequests[4].requestId},
    //         update: {},
    //         create: {
    //             serviceRequestId: serviceRequests[4].requestId,
    //             languageFrom: 'English',
    //             languageTo: 'Vietnamese',
    //             roomNum: '129',
    //             startDateTime: new Date('2025-05-27T22:09:00.639Z'),
    //             endDateTime: new Date('2025-05-27T22:09:45.639Z'),
    //         },
    //     }),
    //     await prisma.translatorRequest.upsert({
    //         where: {serviceRequestId: serviceRequests[5].requestId},
    //         update: {},
    //         create: {
    //             serviceRequestId: serviceRequests[5].requestId,
    //             languageFrom: 'German',
    //             languageTo: 'Spanish',
    //             roomNum: '311',
    //             startDateTime: new Date('2025-04-15T22:09:20.639Z'),
    //             endDateTime: new Date('2025-04-15T22:08:45.639Z'),
    //         },
    //     }),
    //     await prisma.translatorRequest.upsert({
    //         where: {serviceRequestId: serviceRequests[6].requestId},
    //         update: {},
    //         create: {
    //             serviceRequestId: serviceRequests[6].requestId,
    //             languageFrom: 'Korean',
    //             languageTo: 'English',
    //             roomNum: '104',
    //             startDateTime: new Date('2025-06-01T22:02:30.639Z'),
    //             endDateTime: new Date('2025-06-01T22:03:30.639Z'),
    //         },
    //     }),
    //     await prisma.translatorRequest.upsert({
    //         where: {serviceRequestId: serviceRequests[7].requestId},
    //         update: {},
    //         create: {
    //             serviceRequestId: serviceRequests[7].requestId,
    //             languageFrom: 'English',
    //             languageTo: 'Russian',
    //             roomNum: '333',
    //             startDateTime: new Date('2025-05-11T22:04:00.639Z'),
    //             endDateTime: new Date('2025-05-11T22:04:45.639Z'),
    //         },
    //     }),
    //     await prisma.translatorRequest.upsert({
    //         where: {serviceRequestId: serviceRequests[8].requestId},
    //         update: {},
    //         create: {
    //             serviceRequestId: serviceRequests[8].requestId,
    //             languageFrom: 'French',
    //             languageTo: 'English',
    //             roomNum: '234',
    //             startDateTime: new Date('2025-04-28T22:07:00.639Z'),
    //             endDateTime: new Date('2025-04-28T22:07:45.639Z'),
    //         },
    //     }),
    //     await prisma.translatorRequest.upsert({
    //         where: {serviceRequestId: serviceRequests[9].requestId},
    //         update: {},
    //         create: {
    //             serviceRequestId: serviceRequests[9].requestId,
    //             languageFrom: 'English',
    //             languageTo: 'Chinese',
    //             roomNum: '232',
    //             startDateTime: new Date('2025-05-29T22:09:00.639Z'),
    //             endDateTime: new Date('2025-05-29T22:10:30.639Z'),
    //         },
    //     }),
    //     await prisma.translatorRequest.upsert({
    //         where: {serviceRequestId: serviceRequests[10].requestId},
    //         update: {},
    //         create: {
    //             serviceRequestId: serviceRequests[10].requestId,
    //             languageFrom: 'Spanish',
    //             languageTo: 'French',
    //             roomNum: '119',
    //             startDateTime: new Date('2025-06-20T22:10:30.639Z'),
    //             endDateTime: new Date('2025-06-20T22:11:15.639Z'),
    //         },
    //     }),
    // ];
    // console.log('Translator requests seeded!')
    //
    // console.log(translatorRequests);


    console.log('Seeding hospitals...');

    const hospitals = [
        await prisma.hospital.upsert({
            where: {hospitalId: 0},
            update: {
                hospitalId: 0,
                name: 'Chestnut Hill',
                address: '850 Boylston St, Chestnut Hill, MA 02467',
                placeId: 'ChIJLwkLvP5444kRGTnWxi0zsnM',
                defaultLat: 42.325956546246374,
                defaultLng: -71.14971804046458,
                defaultZoom: 19,
            },
            create: {
                hospitalId: 0,
                name: 'Chestnut Hill',
                address: '850 Boylston St, Chestnut Hill, MA 02467',
                placeId: 'ChIJLwkLvP5444kRGTnWxi0zsnM',
                defaultLat: 42.325956546246374,
                defaultLng: -71.14971804046458,
                defaultZoom: 19,
            },
        }),
        await prisma.hospital.upsert({
            where: {hospitalId: 1},
            update: {
                hospitalId: 1,
                name: 'Patriot Place',
                address: '20/22 Patriot Pl, Foxborough, MA 02035',
                placeId: 'ChIJKQrcBrd85IkRhhpDZMarvhQ',
                defaultLat: 42.09179246168661,
                defaultLng: -71.26649009979019,
                defaultZoom: 18,
            },
            create: {
                hospitalId: 1,
                name: 'Patriot Place',
                address: '20/22 Patriot Pl, Foxborough, MA 02035',
                placeId: 'ChIJKQrcBrd85IkRhhpDZMarvhQ',
                defaultLat: 42.09179246168661,
                defaultLng: -71.26649009979019,
                defaultZoom: 18,
            },
        }),
    ];

    console.log('Hospitals seeded!');
    console.log(hospitals);

    console.log('Seeding graphs...');

    const graphs = [
        await prisma.graph.upsert({
            where: {graphId: 0},
            update: {
                graphId: 0,
                name: 'Chestnut Hill',
                imageURL: '/src/public/floormaps/chf1.png',
                north: 42.32629,
                south: 42.32569,
                east: -71.14921,
                west: -71.15013,
            },
            create: {
                graphId: 0,
                name: 'Chestnut Hill',
                imageURL: '/src/public/floormaps/chf1.png',
                north: 42.32629,
                south: 42.32569,
                east: -71.14921,
                west: -71.15013,
            }
        }),
        await prisma.graph.upsert({
            where: {graphId: 1},
            update: {
                graphId: 1,
                name: '20 Patriot Place',
                imageURL: '/src/public/floormaps/pp20f1.png',
                north: 42.09310,
                south: 42.09246,
                east: -71.26553,
                west: -71.26657,
            },
            create: {
                graphId: 1,
                name: '20 Patriot Place',
                imageURL: '/src/public/floormaps/pp20f1.png',
                north: 42.09310,
                south: 42.09246,
                east: -71.26553,
                west: -71.26657,
            }
        }),
        await prisma.graph.upsert({
            where: {graphId: 2},
            update: {
                graphId: 2,
                name: '22 Patriot Place - Floor 3',
                imageURL: '/src/public/floormaps/pp22f3.png',
                north: 42.09308,
                south: 42.09223,
                east: -71.26654,
                west: -71.26744,
            },
            create: {
                graphId: 2,
                name: '22 Patriot Place - Floor 3',
                imageURL: '/src/public/floormaps/pp22f3.png',
                north: 42.09308,
                south: 42.09223,
                east: -71.26654,
                west: -71.26744,
            }
        }),
        await prisma.graph.upsert({
            where: {graphId: 3},
            update: {
                graphId: 3,
                name: '22 Patriot Place - Floor 4',
                imageURL: '/src/public/floormaps/pp22f4.png',
                north: 42.09308,
                south: 42.09223,
                east: -71.26654,
                west: -71.26744,
            },
            create: {
                graphId: 3,
                name: '22 Patriot Place - Floor 4',
                imageURL: '/src/public/floormaps/pp22f4.png',
                north: 42.09308,
                south: 42.09223,
                east: -71.26654,
                west: -71.26744,
            }
        }),
    ];

    console.log('Graphs seeded!');
    console.log(graphs);

    console.log('Seeding departments...');

    const departments = [
        await prisma.department.upsert({
            where: {departmentId: 0},
            update: {
                departmentId: 0,
                name: 'Allergy and Clinical Immunology - 3rd Floor',
                floorNum: 3,
                room: '301',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
            create: {
                departmentId: 0,
                name: 'Allergy and Clinical Immunology - 3rd Floor',
                floorNum: 3,
                room: '301',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 1},
            update: {
                departmentId: 1,
                name: 'Allergy and Clinical Immunology - 5th Floor',
                floorNum: 5,
                room: '540',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
            create: {
                departmentId: 1,
                name: 'Allergy and Clinical Immunology - 5th Floor',
                floorNum: 5,
                room: '540',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 2},
            update: {
                departmentId: 2,
                name: 'Backup Child Care Center',
                floorNum: 2,
                room: '210',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
            create: {
                departmentId: 2,
                name: 'Backup Child Care Center',
                floorNum: 2,
                room: '210',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 3},
            update: {
                departmentId: 3,
                name: 'Brigham Dermatology Associates (BDA)',
                floorNum: 3,
                room: '317',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
            create: {
                departmentId: 3,
                name: 'Brigham Dermatology Associates (BDA)',
                floorNum: 3,
                room: '317',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 4},
            update: {
                departmentId: 4,
                name: 'Brigham Obstetrics and Gynecology Group (BOGG)',
                floorNum: 5,
                room: '575',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
            create: {
                departmentId: 4,
                name: 'Brigham Obstetrics and Gynecology Group (BOGG)',
                floorNum: 5,
                room: '575',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 5},
            update: {
                departmentId: 5,
                name: 'Brigham Physicians Group (BPG) - 4th Floor',
                floorNum: 4,
                room: '428',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
            create: {
                departmentId: 5,
                name: 'Brigham Physicians Group (BPG) - 4th Floor',
                floorNum: 4,
                room: '428',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 6},
            update: {
                departmentId: 6,
                name: 'Brigham Physicians Group (BPG) - 5th Floor',
                floorNum: 5,
                room: '530',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
            create: {
                departmentId: 6,
                name: 'Brigham Physicians Group (BPG) - 5th Floor',
                floorNum: 5,
                room: '530',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 7},
            update: {
                departmentId: 7,
                name: 'Brigham Psychiatric Specialties',
                floorNum: 3,
                room: '303',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
            create: {
                departmentId: 7,
                name: 'Brigham Psychiatric Specialties',
                floorNum: 3,
                room: '303',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 8},
            update: {
                departmentId: 8,
                name: 'Center for Pain Medicine',
                floorNum: 3,
                room: '320',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
            create: {
                departmentId: 8,
                name: 'Center for Pain Medicine',
                floorNum: 3,
                room: '320',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 9},
            update: {
                departmentId: 9,
                name: 'Crohn\'s and Colitis Center',
                floorNum: 2,
                room: '201',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
            create: {
                departmentId: 9,
                name: 'Crohn\'s and Colitis Center',
                floorNum: 2,
                room: '201',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 10},
            update: {
                departmentId: 10,
                name: 'Endoscopy Center',
                floorNum: 2,
                room: '202',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
            create: {
                departmentId: 10,
                name: 'Endoscopy Center',
                floorNum: 2,
                room: '202',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 11},
            update: {
                departmentId: 11,
                name: 'Gretchen S. and Edward A. Fish Center for Women\'s Health',
                floorNum: 4,
                room: '402',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
            create: {
                departmentId: 11,
                name: 'Gretchen S. and Edward A. Fish Center for Women\'s Health',
                floorNum: 4,
                room: '402',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 12},
            update: {
                departmentId: 12,
                name: 'Laboratory',
                floorNum: 1,
                room: '100',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
            create: {
                departmentId: 12,
                name: 'Laboratory',
                floorNum: 1,
                room: '100',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 13},
            update: {
                departmentId: 13,
                name: 'Multi-Specialty Clinic',
                floorNum: 1,
                room: '130',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
            create: {
                departmentId: 13,
                name: 'Multi-Specialty Clinic',
                floorNum: 1,
                room: '130',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 14},
            update: {
                departmentId: 14,
                name: 'Osher Clinical Center for Integrative Health',
                floorNum: 4,
                room: '422',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
            create: {
                departmentId: 14,
                name: 'Osher Clinical Center for Integrative Health',
                floorNum: 4,
                room: '422',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 15},
            update: {
                departmentId: 15,
                name: 'Patient Financial Center',
                floorNum: 2,
                room: '204B',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
            create: {
                departmentId: 15,
                name: 'Patient Financial Center',
                floorNum: 2,
                room: '204B',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 16},
            update: {
                departmentId: 16,
                name: 'Pharmacy',
                floorNum: 3,
                room: '317',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
            create: {
                departmentId: 16,
                name: 'Pharmacy',
                floorNum: 3,
                room: '317',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 17},
            update: {
                departmentId: 17,
                name: 'Radiology',
                floorNum: 5,
                room: '560',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
            create: {
                departmentId: 17,
                name: 'Radiology',
                floorNum: 5,
                room: '560',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 18},
            update: {
                departmentId: 18,
                name: 'Radiology, MRI/CT Scan',
                floorNum: 1,
                room: '102B',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
            create: {
                departmentId: 18,
                name: 'Radiology, MRI/CT Scan',
                floorNum: 1,
                room: '102B',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 19},
            update: {
                departmentId: 19,
                name: 'Rehabilitation Services',
                floorNum: 2,
                room: '200',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
            create: {
                departmentId: 19,
                name: 'Rehabilitation Services',
                floorNum: 2,
                room: '200',
                building: '850 Boylston St',
                lat: 0,
                lng: 0,
                hospitalId: 0,
                graphId: 0,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 20},
            update: {
                departmentId: 20,
                name: 'Blood Draw / Phlebotomy (20 Patriot Pl)',
                floorNum: 1,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.09272057737288,
                lng: -71.26621774825084,
                hospitalId: 1,
                graphId: 1,
            },
            create: {
                departmentId: 20,
                name: 'Blood Draw / Phlebotomy (20 Patriot Pl)',
                floorNum: 1,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.09272057737288,
                lng: -71.26621774825084,
                hospitalId: 1,
                graphId: 1,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 21},
            update: {
                departmentId: 21,
                name: 'Pharmacy',
                floorNum: 1,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.092718587010125,
                lng: -71.26626736911761,
                hospitalId: 1,
                graphId: 1,
            },
            create: {
                departmentId: 21,
                name: 'Pharmacy',
                floorNum: 1,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.092718587010125,
                lng: -71.26626736911761,
                hospitalId: 1,
                graphId: 1,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 22},
            update: {
                departmentId: 22,
                name: 'Radiology',
                floorNum: 1,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.092715719114786,
                lng: -71.26639820607882,
                hospitalId: 1,
                graphId: 1,
            },
            create: {
                departmentId: 22,
                name: 'Radiology',
                floorNum: 1,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.092715719114786,
                lng: -71.26639820607882,
                hospitalId: 1,
                graphId: 1,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 23},
            update: {
                departmentId: 23,
                name: 'Cardiovascular Services',
                floorNum: 1,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.09287165385485,
                lng: -71.26587926060235,
                hospitalId: 1,
                graphId: 1,
            },
            create: {
                departmentId: 23,
                name: 'Cardiovascular Services',
                floorNum: 1,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.09287165385485,
                lng: -71.26587926060235,
                hospitalId: 1,
                graphId: 1,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 24},
            update: {
                departmentId: 24,
                name: 'Urology',
                floorNum: 1,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.092765025772316,
                lng: -71.26578373407568,
                hospitalId: 1,
                graphId: 1,
            },
            create: {
                departmentId: 24,
                name: 'Urology',
                floorNum: 1,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.092765025772316,
                lng: -71.26578373407568,
                hospitalId: 1,
                graphId: 1,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 25},
            update: {
                departmentId: 25,
                name: 'Urgent Care Center',
                floorNum: 1,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.09272770648615,
                lng: -71.26606469546999,
                hospitalId: 1,
                graphId: 1,
            },
            create: {
                departmentId: 25,
                name: 'Urgent Care Center',
                floorNum: 1,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.09272770648615,
                lng: -71.26606469546999,
                hospitalId: 1,
                graphId: 1,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 26},
            update: {
                departmentId: 26,
                name: 'Orthopaedics',
                floorNum: 2,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.09272156229708,
                lng: -71.2656441585419,
                hospitalId: 1,
                graphId: 1,
            },
            create: {
                departmentId: 26,
                name: 'Orthopaedics',
                floorNum: 2,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.09272156229708,
                lng: -71.2656441585419,
                hospitalId: 1,
                graphId: 1,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 27},
            update: {
                departmentId: 27,
                name: 'Rehabilitation Services',
                floorNum: 2,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.09272156229708,
                lng: -71.2656441585419,
                hospitalId: 1,
                graphId: 1,
            },
            create: {
                departmentId: 27,
                name: 'Rehabilitation Services',
                floorNum: 2,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.09272156229708,
                lng: -71.2656441585419,
                hospitalId: 1,
                graphId: 1,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 28},
            update: {
                departmentId: 28,
                name: 'Clinical Lab',
                floorNum: 2,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.09272156229708,
                lng: -71.2656441585419,
                hospitalId: 1,
                graphId: 1,
            },
            create: {
                departmentId: 28,
                name: 'Clinical Lab',
                floorNum: 2,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.09272156229708,
                lng: -71.2656441585419,
                hospitalId: 1,
                graphId: 1,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 29},
            update: {
                departmentId: 29,
                name: 'Surgi-Care',
                floorNum: 2,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.09272156229708,
                lng: -71.2656441585419,
                hospitalId: 1,
                graphId: 1,
            },
            create: {
                departmentId: 29,
                name: 'Surgi-Care',
                floorNum: 2,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.09272156229708,
                lng: -71.2656441585419,
                hospitalId: 1,
                graphId: 1,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 30},
            update: {
                departmentId: 30,
                name: 'Surgical Specialties',
                floorNum: 3,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.09272156229708,
                lng: -71.2656441585419,
                hospitalId: 1,
                graphId: 1,
            },
            create: {
                departmentId: 30,
                name: 'Surgical Specialties',
                floorNum: 3,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.09272156229708,
                lng: -71.2656441585419,
                hospitalId: 1,
                graphId: 1,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 31},
            update: {
                departmentId: 31,
                name: 'Sports Medicine Center',
                floorNum: 3,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.09272156229708,
                lng: -71.2656441585419,
                hospitalId: 1,
                graphId: 1,
            },
            create: {
                departmentId: 31,
                name: 'Sports Medicine Center',
                floorNum: 3,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.09272156229708,
                lng: -71.2656441585419,
                hospitalId: 1,
                graphId: 1,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 32},
            update: {
                departmentId: 32,
                name: 'Electromyography',
                floorNum: 4,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.09272156229708,
                lng: -71.2656441585419,
                hospitalId: 1,
                graphId: 1,
            },
            create: {
                departmentId: 32,
                name: 'Electromyography',
                floorNum: 4,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.09272156229708,
                lng: -71.2656441585419,
                hospitalId: 1,
                graphId: 1,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 33},
            update: {
                departmentId: 33,
                name: 'Nutrition',
                floorNum: 4,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.09272156229708,
                lng: -71.2656441585419,
                hospitalId: 1,
                graphId: 1,
            },
            create: {
                departmentId: 33,
                name: 'Nutrition',
                floorNum: 4,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.09272156229708,
                lng: -71.2656441585419,
                hospitalId: 1,
                graphId: 1,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 34},
            update: {
                departmentId: 34,
                name: 'Pain Medicine',
                floorNum: 4,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.09272156229708,
                lng: -71.2656441585419,
                hospitalId: 1,
                graphId: 1,
            },
            create: {
                departmentId: 34,
                name: 'Pain Medicine',
                floorNum: 4,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.09272156229708,
                lng: -71.2656441585419,
                hospitalId: 1,
                graphId: 1,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 35},
            update: {
                departmentId: 35,
                name: 'Physiatry',
                floorNum: 4,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.09272156229708,
                lng: -71.2656441585419,
                hospitalId: 1,
                graphId: 1,
            },
            create: {
                departmentId: 35,
                name: 'Physiatry',
                floorNum: 4,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.09272156229708,
                lng: -71.2656441585419,
                hospitalId: 1,
                graphId: 1,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 36},
            update: {
                departmentId: 36,
                name: 'Pulmonary Function Testing',
                floorNum: 4,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.09272156229708,
                lng: -71.2656441585419,
                hospitalId: 1,
                graphId: 1,
            },
            create: {
                departmentId: 36,
                name: 'Pulmonary Function Testing',
                floorNum: 4,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.09272156229708,
                lng: -71.2656441585419,
                hospitalId: 1,
                graphId: 1,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 37},
            update: {
                departmentId: 37,
                name: 'Day Surgery Center',
                floorNum: 4,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.09272156229708,
                lng: -71.2656441585419,
                hospitalId: 1,
                graphId: 1,
            },
            create: {
                departmentId: 37,
                name: 'Day Surgery Center',
                floorNum: 4,
                room: '',
                building: '20 Patriot Pl',
                lat: 42.09272156229708,
                lng: -71.2656441585419,
                hospitalId: 1,
                graphId: 1,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 38},
            update: {
                departmentId: 38,
                name: 'Multi Specialty Clinic',
                floorNum: 3,
                room: '',
                building: '22 Patriot Pl',
                lat: 42.092544315641184,
                lng: -71.26702954841635,
                hospitalId: 1,
                graphId: 2,
            },
            create: {
                departmentId: 38,
                name: 'Multi Specialty Clinic',
                floorNum: 3,
                room: '',
                building: '22 Patriot Pl',
                lat: 42.092544315641184,
                lng: -71.26702954841635,
                hospitalId: 1,
                graphId: 2,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 39},
            update: {
                departmentId: 39,
                name: 'Patient Financial Services',
                floorNum: 3,
                room: '',
                building: '22 Patriot Pl',
                lat: 42.0927464654499,
                lng: -71.26679887844107,
                hospitalId: 1,
                graphId: 2,
            },
            create: {
                departmentId: 39,
                name: 'Patient Financial Services',
                floorNum: 3,
                room: '',
                building: '22 Patriot Pl',
                lat: 42.0927464654499,
                lng: -71.26679887844107,
                hospitalId: 1,
                graphId: 2,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 40},
            update: {
                departmentId: 40,
                name: 'Blood Draw / Phlebotomy (22 Patriot Pl)',
                floorNum: 4,
                room: '',
                building: '22 Patriot Pl',
                lat: 42.092488965275486,
                lng: -71.26678771383847,
                hospitalId: 1,
                graphId: 3,
            },
            create: {
                departmentId: 40,
                name: 'Blood Draw / Phlebotomy (22 Patriot Pl)',
                floorNum: 4,
                room: '',
                building: '22 Patriot Pl',
                lat: 42.092488965275486,
                lng: -71.26678771383847,
                hospitalId: 1,
                graphId: 3,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 41},
            update: {
                departmentId: 41,
                name: 'Community Room',
                floorNum: 4,
                room: '',
                building: '22 Patriot Pl',
                lat: 42.092474682042536,
                lng: -71.2669434808703,
                hospitalId: 1,
                graphId: 3,
            },
            create: {
                departmentId: 41,
                name: 'Community Room',
                floorNum: 4,
                room: '',
                building: '22 Patriot Pl',
                lat: 42.092474682042536,
                lng: -71.2669434808703,
                hospitalId: 1,
                graphId: 3,
            },
        }),
        await prisma.department.upsert({
            where: {departmentId: 42},
            update: {
                departmentId: 42,
                name: 'Primary Care',
                floorNum: 4,
                room: '',
                building: '22 Patriot Pl',
                lat: 42.092762158045055,
                lng: -71.26676917701195,
                hospitalId: 1,
                graphId: 3,
            },
            create: {
                departmentId: 42,
                name: 'Primary Care',
                floorNum: 4,
                room: '',
                building: '22 Patriot Pl',
                lat: 42.092762158045055,
                lng: -71.26676917701195,
                hospitalId: 1,
                graphId: 3,
            },
        }),

    ];

    console.log('Departments seeded!');
    console.log(departments);

    console.log('Seeding nodes...');

    await prisma.node.deleteMany();
    await prisma.edge.deleteMany();


    const nodes = [
        // await prisma.node.upsert({
        //     where: {nodeId: 0},
        //     create: {
        //         nodeId: 0,
        //         tags: '[Parking1]',
        //         lat: 42.0910630370867,
        //         lng: -71.2668215581872,
        //         graphId: 1,
        //     },
        //     update: {
        //         nodeId: 0,
        //         tags: '[Parking1]',
        //         lat: 42.0910630370867,
        //         lng: -71.2668215581872,
        //         graphId: 1,
        //     }
        // }),
        // await prisma.node.upsert({
        //     where: {nodeId: 1},
        //     create: {
        //         nodeId: 1,
        //         tags: 'Garage turn point',
        //         lat: 42.09154316533154,
        //         lng: -71.26703074024732,
        //         graphId: 1,
        //     },
        //     update: {
        //         nodeId: 1,
        //         tags: 'Garage turn point',
        //         lat: 42.09154316533154,
        //         lng: -71.26703074024732,
        //         graphId: 1,
        //     }
        // }),
        // await prisma.node.upsert({
        //     where: {nodeId: 2},
        //     create: {
        //         nodeId: 2,
        //         tags: 'Garage exit',
        //         lat: 42.09124112146019,
        //         lng: -71.26719234334047,
        //         graphId: 1,
        //     },
        //     update: {
        //         nodeId: 2,
        //         tags: 'Garage exit',
        //         lat: 42.09124112146019,
        //         lng: -71.26719234334047,
        //         graphId: 1,
        //     }
        // }),
        // await prisma.node.upsert({
        //     where: {nodeId: 3},
        //     create: {
        //         nodeId: 3,
        //         tags: 'Path entrance',
        //         lat: 42.0913013313088,
        //         lng: -71.26736668692644,
        //         graphId: 1,
        //     },
        //     update: {
        //         nodeId: 3,
        //         tags: 'Path entrance',
        //         lat: 42.0913013313088,
        //         lng: -71.26736668692644,
        //         graphId: 1,
        //     }
        // }),
        // await prisma.node.upsert({
        //     where: {nodeId: 4},
        //     create: {
        //         nodeId: 4,
        //         tags: 'Path curve 1',
        //         lat: 42.09171861287582,
        //         lng: -71.26715708030366,
        //         graphId: 1,
        //     },
        //     update: {
        //         nodeId: 4,
        //         tags: 'Path curve 1',
        //         lat: 42.09171861287582,
        //         lng: -71.26715708030366,
        //         graphId: 1,
        //     }
        // }),
        // await prisma.node.upsert({
        //     where: {nodeId: 5},
        //     create: {
        //         nodeId: 5,
        //         tags: 'Path curve 2',
        //         lat: 42.091838534011785,
        //         lng: -71.26707996679448,
        //         graphId: 1,
        //     },
        //     update: {
        //         nodeId: 5,
        //         tags: 'Path curve 2',
        //         lat: 42.091838534011785,
        //         lng: -71.26707996679448,
        //         graphId: 1,
        //     }
        // }),
        // await prisma.node.upsert({
        //     where: {nodeId: 6},
        //     create: {
        //         nodeId: 6,
        //         tags: 'Path 1 end point',
        //         lat: 42.09207738041204,
        //         lng: -71.26688483608865,
        //         graphId: 1,
        //     },
        //     update: {
        //         nodeId: 6,
        //         tags: 'Path 1 end point',
        //         lat: 42.09207738041204,
        //         lng: -71.26688483608865,
        //         graphId: 1,
        //     }
        // }),
        // await prisma.node.upsert({
        //     where: {nodeId: 7},
        //     create: {
        //         nodeId: 7,
        //         tags: 'Point beside entrance',
        //         lat: 42.09251097266492,
        //         lng: -71.26650997752694,
        //         graphId: 1,
        //     },
        //     update: {
        //         nodeId: 7,
        //         tags: 'Point beside entrance',
        //         lat: 42.09251097266492,
        //         lng: -71.26650997752694,
        //         graphId: 1,
        //     }
        // }),
        // await prisma.node.upsert({
        //     where: {nodeId: 8},
        //     create: {
        //         nodeId: 8,
        //         tags: 'Point in front of entrance',
        //         lat: 42.09247813156273,
        //         lng: -71.266430852361,
        //         graphId: 1,
        //     },
        //     update: {
        //         nodeId: 8,
        //         tags: 'Point in front of entrance',
        //         lat: 42.09247813156273,
        //         lng: -71.266430852361,
        //         graphId: 1,
        //     }
        // }),
        // await prisma.node.upsert({
        //     where: {nodeId: 9},
        //     create: {
        //         nodeId: 9,
        //         tags: '[Entrance1]',
        //         lat: 42.092501020817565,
        //         lng: -71.26636647934464,
        //         graphId: 1,
        //     },
        //     update: {
        //         nodeId: 9,
        //         tags: '[Entrance1]',
        //         lat: 42.092501020817565,
        //         lng: -71.26636647934464,
        //         graphId: 1,
        //     }
        // }),


        // await prisma.node.upsert({
        //     where: {nodeId: 100},
        //     create: {
        //         nodeId: 100,
        //         tags: '[Parking1]',
        //         lat: 42.091061004913655,
        //         lng: -71.26682002463103,
        //         graphId: 1,
        //     },
        //     update: {
        //         nodeId: 100,
        //         tags: '[Parking1]',
        //         lat: 42.091061004913655,
        //         lng: -71.26682002463103,
        //         graphId: 1,
        //     }
        // }),
        // await prisma.node.upsert({
        //     where: {nodeId: 101},
        //     create: {
        //         nodeId: 101,
        //         tags: 'turn on p lot',
        //         lat: 42.0915152410756,
        //         lng: -71.26701719023977,
        //         graphId: 1,
        //     },
        //     update: {
        //         nodeId: 101,
        //         tags: 'turn on p lot',
        //         lat: 42.0915152410756,
        //         lng: -71.26701719023977,
        //         graphId: 1,
        //     }
        // }),
        //
        // await prisma.node.upsert({
        //     where: {nodeId: 102},
        //     create: {
        //         nodeId: 102,
        //         tags: 'about to cross',
        //         lat: 42.09193261714922,
        //         lng: -71.26677678348538,
        //         graphId: 1,
        //     },
        //     update: {
        //         nodeId: 102,
        //         tags: 'about to cross',
        //         lat: 42.09193261714922,
        //         lng: -71.26677678348538,
        //         graphId: 1,
        //     }
        // }),
        // await prisma.node.upsert({
        //     where: {nodeId: 103},
        //     create: {
        //         nodeId: 103,
        //         tags: 'entering path',
        //         lat: 42.0919989211762,
        //         lng: -71.26694594670606,
        //         graphId: 1,
        //     },
        //     update: {
        //         nodeId: 103,
        //         tags: 'entering path',
        //         lat: 42.0919989211762,
        //         lng: -71.26694594670606,
        //         graphId: 1,
        //     }
        // }),
        // await prisma.node.upsert({
        //     where: {nodeId: 104},
        //     create: {
        //         nodeId: 104,
        //         tags: 'Path 1 end point',
        //         lat: 42.09207738041204,
        //         lng: -71.26688483608865,
        //         graphId: 1,
        //     },
        //     update: {
        //         nodeId: 104,
        //         tags: 'Path 1 end point',
        //         lat: 42.09207738041204,
        //         lng: -71.26688483608865,
        //         graphId: 1,
        //     }
        // }),
        // await prisma.node.upsert({
        //     where: {nodeId: 105},
        //     create: {
        //         nodeId: 105,
        //         tags: 'Point beside entrance',
        //         lat: 42.09251097266492,
        //         lng: -71.26650997752694,
        //         graphId: 1,
        //     },
        //     update: {
        //         nodeId: 105,
        //         tags: 'Point beside entrance',
        //         lat: 42.09251097266492,
        //         lng: -71.26650997752694,
        //         graphId: 1,
        //     }
        // }),
        // await prisma.node.upsert({
        //     where: {nodeId: 106},
        //     create: {
        //         nodeId: 106,
        //         tags: 'Point in front of entrance',
        //         lat: 42.09247813156273,
        //         lng: -71.266430852361,
        //         graphId: 1,
        //     },
        //     update: {
        //         nodeId: 106,
        //         tags: 'Point in front of entrance',
        //         lat: 42.09247813156273,
        //         lng: -71.266430852361,
        //         graphId: 1,
        //     }
        // }),
        // await prisma.node.upsert({
        //     where: {nodeId: 107},
        //     create: {
        //         nodeId: 107,
        //         tags: '[Entrance1]',
        //         lat: 42.092501020817565,
        //         lng: -71.26636647934464,
        //         graphId: 1,
        //     },
        //     update: {
        //         nodeId: 107,
        //         tags: '[Entrance1]',
        //         lat: 42.092501020817565,
        //         lng: -71.26636647934464,
        //         graphId: 1,
        //     }
        // }),
        await prisma.node.upsert({
            where: {nodeId: 0},
            create: {
                nodeId: 0,
                tags: '[Parking1]',
                lat: 42.32628985950129,
                lng: -71.1494973814374,
                graphId: 0,
            },
            update: {
                nodeId: 0,
                tags: '[Parking1]',
                lat: 42.32628985950129,
                lng: -71.1494973814374,
                graphId: 0,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 1},
            create: {
                nodeId: 1,
                tags: '[Entrance1]',
                lat: 42.32626804631388,
                lng: -71.14951213358698,
                graphId: 0,
            },
            update: {
                nodeId: 1,
                tags: '[Entrance1]',
                lat: 42.32626804631388,
                lng: -71.14951213358698,
                graphId: 0,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 2},
            create: {
                nodeId: 2,
                tags: '[Door1]',
                lat: 42.32626804631388,
                lng: -71.14951213358698,
                graphId: 0,
            },
            update: {
                nodeId: 2,
                tags: '[Door1]',
                lat: 42.32626804631388,
                lng: -71.14951213358698,
                graphId: 0,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 3},
            create: {
                nodeId: 3,
                tags: 'Hallway',
                lat: 42.32620458972566,
                lng: -71.14950945137797,
                graphId: 0,
            },
            update: {
                nodeId: 3,
                tags: 'Hallway',
                lat: 42.32620458972566,
                lng: -71.14950945137797,
                graphId: 0,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 4},
            create: {
                nodeId: 4,
                tags: 'Hallway 2',
                lat: 42.32619566613782,
                lng: -71.14958187102137,
                graphId: 0,
            },
            update: {
                nodeId: 4,
                tags: 'Hallway 2',
                lat: 42.32619566613782,
                lng: -71.14958187102137,
                graphId: 0,
            }
        }),

        await prisma.node.upsert({
            where: {nodeId: 5},
            create: {
                nodeId: 5,
                tags: 'Enter room 1',
                lat: 42.32616889536665,
                lng: -71.14958321212588,
                graphId: 0,
            },
            update: {
                nodeId: 5,
                tags: 'Enter room 1',
                lat: 42.32616889536665,
                lng: -71.14958321212588,
                graphId: 0,
            }
        }),

        await prisma.node.upsert({
            where: {nodeId: 6},
            create: {
                nodeId: 6,
                tags: 'Enter room 2',
                lat: 42.32616269842727,
                lng: -71.14965529649315,
                graphId: 0,
            },
            update: {
                nodeId: 6,
                tags: 'Enter room 2',
                lat: 42.32616269842727,
                lng: -71.14965529649315,
                graphId: 0,
            }
        }),

        await prisma.node.upsert({
            where: {nodeId: 7},
            create: {
                nodeId: 7,
                tags: '[Checkpoint1]',
                lat: 42.326107173823104,
                lng: -71.14964456765709,
                graphId: 0,
            },
            update: {
                nodeId: 7,
                tags: '[Checkpoint1]',
                lat: 42.326107173823104,
                lng: -71.14964456765709,
                graphId: 0,
            }
        }),





        await prisma.node.upsert({
            where: {nodeId: 100},
            create: {
                nodeId: 100,
                tags: '[Parking1]',
                lat: 42.091061004913655,
                lng: -71.26682002463103,
                graphId: 1,
            },
            update: {
                nodeId: 100,
                tags: '[Parking1]',
                lat: 42.091061004913655,
                lng: -71.26682002463103,
                graphId: 1,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 101},
            create: {
                nodeId: 101,
                tags: 'turn on p lot',
                lat: 42.0915152410756,
                lng: -71.26701719023977,
                graphId: 1,
            },
            update: {
                nodeId: 101,
                tags: 'turn on p lot',
                lat: 42.0915152410756,
                lng: -71.26701719023977,
                graphId: 1,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 102},
            create: {
                nodeId: 102,
                tags: 'about to cross',
                lat: 42.09193261714922,
                lng: -71.26677678348538,
                graphId: 1,
            },
            update: {
                nodeId: 102,
                tags: 'about to cross',
                lat: 42.09193261714922,
                lng: -71.26677678348538,
                graphId: 1,
            }
        }),

        await prisma.node.upsert({
            where: {nodeId: 103},
            create: {
                nodeId: 103,
                tags: 'sidewalk 1',
                lat: 42.09200217019917,
                lng: -71.2669417764616,
                graphId: 1,
            },
            update: {
                nodeId: 103,
                tags: 'sidewalk 1',
                lat: 42.09200217019917,
                lng: -71.2669417764616,
                graphId: 1,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 104},
            create: {
                nodeId: 104,
                tags: 'sidewalk 2',
                lat: 42.092461934557555,
                lng: -71.26656230400417,
                graphId: 1,
            },
            update: {
                nodeId: 104,
                tags: 'sidewalk 2',
                lat: 42.092461934557555,
                lng: -71.26656230400417,
                graphId: 1,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 105},
            create: {
                nodeId: 105,
                tags: 'before entrance',
                lat: 42.09253518313532,
                lng: -71.26648666971582,
                graphId: 1,
            },
            update: {
                nodeId: 105,
                tags: 'before entrance',
                lat: 42.09253518313532,
                lng: -71.26648666971582,
                graphId: 1,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 106},
            create: {
                nodeId: 106,
                tags: 'front of entrance',
                lat: 42.092479272750566,
                lng: -71.2663831928498,
                graphId: 1,
            },
            update: {
                nodeId: 106,
                tags: 'front of entrance',
                lat: 42.092479272750566,
                lng: -71.2663831928498,
                graphId: 1,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 107},
            create: {
                nodeId: 107,
                tags: '[Entrance1]',
                lat: 42.092512979448315,
                lng: -71.26632207406375,
                graphId: 1,
            },
            update: {
                nodeId: 107,
                tags: '[Entrance1]',
                lat: 42.092512979448315,
                lng: -71.26632207406375,
                graphId: 1,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 108},
            create: {
                nodeId: 108,
                tags: '[Door1]',
                lat: 42.092512979448315,
                lng: -71.26632207406375,
                graphId: 1,
            },
            update: {
                nodeId: 108,
                tags: '[Door1]',
                lat: 42.092512979448315,
                lng: -71.26632207406375,
                graphId: 1,
            }
        }),

        await prisma.node.upsert({
            where: {nodeId: 109},
            create: {
                nodeId: 109,
                tags: 'Hallway to checkpoint 1',
                lat: 42.0925935893518,
                lng: -71.2662577010474,
                graphId: 1,
            },
            update: {
                nodeId: 109,
                tags: 'Hallway to checkpoint 1',
                lat: 42.0925935893518,
                lng: -71.2662577010474,
                graphId: 1,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 110},
            create: {
                nodeId: 110,
                tags: 'Beside checkpoint 1',
                lat: 42.09265927141964,
                lng: -71.26628854645107,
                graphId: 1,
            },
            update: {
                nodeId: 110,
                tags: 'Beside checkpoint 1',
                lat: 42.09265927141964,
                lng: -71.26628854645107,
                graphId: 1,
            }
        }),

        await prisma.node.upsert({
            where: {nodeId: 111},
            create: {
                nodeId: 111,
                tags: '[Checkpoint1]',
                lat: 42.092677251176724,
                lng: -71.26635266724202,
                graphId: 1,
            },
            update: {
                nodeId: 111,
                tags: '[Checkpoint1]',
                lat: 42.092677251176724,
                lng: -71.26635266724202,
                graphId: 1,
            }
        }),

        await prisma.node.upsert({
            where: {nodeId: 112},
            create: {
                nodeId: 112,
                tags: 'Hallway beside checkpoint 2',
                lat: 42.09258498572383,
                lng: -71.26600036962368,
                graphId: 1,
            },
            update: {
                nodeId: 112,
                tags: 'Hallway beside checkpoint 2',
                lat: 42.09258498572383,
                lng: -71.26600036962368,
                graphId: 1,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 113},
            create: {
                nodeId: 113,
                tags: '[Checkpoint2]',
                lat: 42.09265066780056,
                lng: -71.26600171072819,
                graphId: 1,
            },
            update: {
                nodeId: 113,
                tags: '[Checkpoint2]',
                lat: 42.09265066780056,
                lng: -71.26600171072819,
                graphId: 1,
            }
        }),

        await prisma.node.upsert({
            where: {nodeId: 114},
            create: {
                nodeId: 114,
                tags: 'Hallway besides checkpoint 3',
                lat: 42.09262877378253,
                lng: -71.26583675487377,
                graphId: 1,
            },
            update: {
                nodeId: 114,
                tags: 'Hallway beside checkpoint 3',
                lat: 42.09262877378253,
                lng: -71.26583675487377,
                graphId: 1,
            }
        }),

        await prisma.node.upsert({
            where: {nodeId: 115},
            create: {
                nodeId: 115,
                tags: '[Checkpoint3]',
                lat: 42.09266659448601,
                lng: -71.26586226214057,
                graphId:1
            },
            update: {
                nodeId: 115,
                tags: '[Checkpoint3]',
                lat: 42.09266659448601,
                lng: -71.26586226214057,
                graphId: 1,
            }
        }),



        await prisma.node.upsert({
            where: {nodeId: 200},
            create: {
                nodeId: 200,
                tags: '[Parking1]',
                lat: 42.091061004913655,
                lng: -71.26682002463103,
                graphId: 2,
            },
            update: {
                nodeId: 200,
                tags: '[Parking1]',
                lat: 42.091061004913655,
                lng: -71.26682002463103,
                graphId: 2,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 201},
            create: {
                nodeId: 201,
                tags: 'turn on p lot',
                lat: 42.0915152410756,
                lng: -71.26701719023977,
                graphId: 2,
            },
            update: {
                nodeId: 201,
                tags: 'turn on p lot',
                lat: 42.0915152410756,
                lng: -71.26701719023977,
                graphId: 2,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 202},
            create: {
                nodeId: 202,
                tags: 'about to cross',
                lat: 42.09193261714922,
                lng: -71.26677678348538,
                graphId: 2,
            },
            update: {
                nodeId: 202,
                tags: 'about to cross',
                lat: 42.09193261714922,
                lng: -71.26677678348538,
                graphId: 2,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 203},
            create: {
                nodeId: 203,
                tags: 'cross st 1',
                lat: 42.092053035476496,
                lng: -71.26707182647702,
                graphId: 2,
            },
            update: {
                nodeId: 203,
                tags: 'cross st 1',
                lat: 42.092053035476496,
                lng: -71.26707182647702,
                graphId: 2,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 204},
            create: {
                nodeId: 204,
                tags: 'cross st 2',
                lat: 42.09222321305328,
                lng: -71.26694039823529,
                graphId: 2,
            },
            update: {
                nodeId: 204,
                tags: 'cross st 2',
                lat: 42.09222321305328,
                lng: -71.26694039823529,
                graphId: 2,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 205},
            create: {
                nodeId: 205,
                tags: '',
                lat: 42.09251119430022,
                lng: -71.26667594984119,
                graphId: 2,
            },
            update: {
                nodeId: 205,
                tags: '',
                lat: 42.09251119430022,
                lng: -71.26667594984119,
                graphId: 2,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 206},
            create: {
                nodeId: 206,
                tags: '',
                lat: 42.092609349545725,
                lng: -71.26655339465918,
                graphId: 2,
            },
            update: {
                nodeId: 206,
                tags: '',
                lat: 42.092609349545725,
                lng: -71.26655339465918,
                graphId: 2,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 207},
            create: {
                nodeId: 207,
                tags: '[Entrance1]',
                lat: 42.0926342291187,
                lng: -71.26656010018172,
                graphId: 2,
            },
            update: {
                nodeId: 207,
                tags: '[Entrance1]',
                lat: 42.0926342291187,
                lng: -71.26656010018172,
                graphId: 2,
            }
        }),

        await prisma.node.upsert({
            where: {nodeId: 208},
            create: {
                nodeId: 208,
                tags: '[Door1]',
                lat: 42.09262561259546,
                lng: -71.26674472281589,
                graphId: 2,
            },
            update: {
                nodeId: 208,
                tags: '[Door1]',
                lat: 42.09262561259546,
                lng: -71.26674472281589,
                graphId: 2,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 209},
            create: {
                nodeId: 209,
                tags: '',
                lat: 42.09261780145996,
                lng: -71.2667328170303,
                graphId: 2,
            },
            update: {
                nodeId: 209,
                tags: '',
                lat: 42.09261780145996,
                lng: -71.2667328170303,
                graphId: 2,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 210},
            create: {
                nodeId: 210,
                tags: '',
                lat: 42.092540425935965,
                lng: -71.26680925998723,
                graphId: 2,
            },
            update: {
                nodeId: 210,
                tags: '',
                lat: 42.092540425935965,
                lng: -71.26680925998723,
                graphId: 2,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 211},
            create: {
                nodeId: 211,
                tags: '[Checkpoint1]',
                lat: 42.09250061855566,
                lng: -71.26680255446469,
                graphId: 2,
            },
            update: {
                nodeId: 211,
                tags: '[Checkpoint1]',
                lat: 42.09250061855566,
                lng: -71.26680255446469,
                graphId: 2,
            }
        }),









        await prisma.node.upsert({
            where: {nodeId: 300},
            create: {
                nodeId: 300,
                tags: '[Parking1]',
                lat: 42.091061004913655,
                lng: -71.26682002463103,
                graphId: 3,
            },
            update: {
                nodeId: 300,
                tags: '[Parking1]',
                lat: 42.091061004913655,
                lng: -71.26682002463103,
                graphId: 3,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 301},
            create: {
                nodeId: 301,
                tags: 'turn on p lot',
                lat: 42.0915152410756,
                lng: -71.26701719023977,
                graphId: 3,
            },
            update: {
                nodeId: 301,
                tags: 'turn on p lot',
                lat: 42.0915152410756,
                lng: -71.26701719023977,
                graphId: 3,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 302},
            create: {
                nodeId: 302,
                tags: 'about to cross',
                lat: 42.09193261714922,
                lng: -71.26677678348538,
                graphId: 3,
            },
            update: {
                nodeId: 302,
                tags: 'about to cross',
                lat: 42.09193261714922,
                lng: -71.26677678348538,
                graphId: 3,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 303},
            create: {
                nodeId: 303,
                tags: 'cross st 1',
                lat: 42.092053035476496,
                lng: -71.26707182647702,
                graphId: 3,
            },
            update: {
                nodeId: 303,
                tags: 'cross st 1',
                lat: 42.092053035476496,
                lng: -71.26707182647702,
                graphId: 3,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 304},
            create: {
                nodeId: 304,
                tags: 'cross st 2',
                lat: 42.09222321305328,
                lng: -71.26694039823529,
                graphId: 3,
            },
            update: {
                nodeId: 304,
                tags: 'cross st 2',
                lat: 42.09222321305328,
                lng: -71.26694039823529,
                graphId: 3,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 305},
            create: {
                nodeId: 305,
                tags: '',
                lat: 42.09251119430022,
                lng: -71.26667594984119,
                graphId: 3,
            },
            update: {
                nodeId: 305,
                tags: '',
                lat: 42.09251119430022,
                lng: -71.26667594984119,
                graphId: 3,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 306},
            create: {
                nodeId: 306,
                tags: '',
                lat: 42.092609349545725,
                lng: -71.26655339465918,
                graphId: 3,
            },
            update: {
                nodeId: 306,
                tags: '',
                lat: 42.092609349545725,
                lng: -71.26655339465918,
                graphId: 3,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 307},
            create: {
                nodeId: 307,
                tags: '[Entrance1]',
                lat: 42.0926342291187,
                lng: -71.26656010018172,
                graphId: 3,
            },
            update: {
                nodeId: 307,
                tags: '[Entrance1]',
                lat: 42.0926342291187,
                lng: -71.26656010018172,
                graphId: 3,
            }
        }),


        await prisma.node.upsert({
            where: {nodeId: 308},
            create: {
                nodeId: 308,
                tags: '[Door1]',
                lat: 42.092626391988865,
                lng: -71.26673944540154,
                graphId: 3,
            },
            update: {
                nodeId: 308,
                tags: '[Door1]',
                lat: 42.092626391988865,
                lng: -71.26673944540154,
                graphId: 3,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 309},
            create: {
                nodeId: 309,
                tags: '',
                lat: 42.09261917691281,
                lng: -71.26672435797583,
                graphId: 3,
            },
            update: {
                nodeId: 309,
                tags: '',
                lat: 42.09261917691281,
                lng: -71.26672435797583,
                graphId: 3,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 310},
            create: {
                nodeId: 310,
                tags: '',
                lat: 42.092669433632366,
                lng: -71.26667574293744,
                graphId: 3,
            },
            update: {
                nodeId: 310,
                tags: '',
                lat: 42.092669433632366,
                lng: -71.26667574293744,
                graphId: 3,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 311},
            create: {
                nodeId: 311,
                tags: '[Checkpoint1]',
                lat: 42.092682122203776,
                lng: -71.26663852728736,
                graphId: 3,
            },
            update: {
                nodeId: 311,
                tags: '[Checkpoint1]',
                lat: 42.092682122203776,
                lng: -71.26663852728736,
                graphId: 3,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 312},
            create: {
                nodeId: 312,
                tags: '',
                lat: 42.09257930897307,
                lng: -71.26675997892146,
                graphId: 3,
            },
            update: {
                nodeId: 312,
                tags: '',
                lat: 42.09257930897307,
                lng: -71.26675997892146,
                graphId: 3,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 313},
            create: {
                nodeId: 313,
                tags: '',
                lat: 42.092567117972976,
                lng: -71.26673785069708,
                graphId: 3,
            },
            update: {
                nodeId: 313,
                tags: '',
                lat: 42.092567117972976,
                lng: -71.26673785069708,
                graphId: 3,
            }
        }),
        await prisma.node.upsert({
            where: {nodeId: 314},
            create: {
                nodeId: 314,
                tags: '[Checkpoint2]',
                lat: 42.09255144382658,
                lng: -71.26675126174216,
                graphId: 3,
            },
            update: {
                nodeId: 314,
                tags: '[Checkpoint2]',
                lat: 42.09255144382658,
                lng: -71.26675126174216,
                graphId: 3,
            }
        }),













        // await prisma.node.upsert({
        //     where: {nodeId: 0},
        //     update: {
        //         nodeId: 0,
        //         tags: 'Start',
        //         lat: 42.32628328491628 ,
        //         lng: -71.14950027862017,
        //         graphId: 0,
        //     },
        //     create: {
        //         nodeId: 0,
        //         tags: 'Start',
        //         lat: 42.32628328491628 ,
        //         lng: 71.14950027862017,
        //         graphId: 0,
        //     },
        // }),
        //
        // await prisma.node.upsert({
        //     where: {nodeId: 1},
        //     update: {
        //         nodeId: 1,
        //         tags: '',
        //         lat: 42.326241641547554 ,
        //         lng: 71.14951100745623,
        //         graphId: 0,
        //     },
        //     create: {
        //         nodeId: 1,
        //         tags: '',
        //         lat: 42.326241641547554 ,
        //         lng: 71.14951100745623,
        //         graphId: 0,
        //     },
        // }),
        //
        //
        //
        // await prisma.node.upsert({
        //     where: { nodeId: 2 },
        //     update: {
        //         nodeId: 2,
        //         tags: '',
        //         lat: 42.32620495569991,
        //         lng: -71.14950832524721,
        //         graphId: 0,
        //     },
        //     create: {
        //         nodeId: 2,
        //         tags: '',
        //         lat: 42.32620495569991,
        //         lng: -71.14950832524721,
        //         graphId: 0,
        //     },
        // }),
        //
        // await prisma.node.upsert({
        //     where: { nodeId: 3 },
        //     update: {
        //         nodeId: 3,
        //         tags: '',
        //         lat: 42.3262019811708,
        //         lng: -71.14959013262217,
        //         graphId: 0,
        //     },
        //     create: {
        //         nodeId: 3,
        //         tags: '',
        //         lat: 42.3262019811708,
        //         lng: -71.14959013262217,
        //         graphId: 0,
        //     },
        // }),
        //
        // await prisma.node.upsert({
        //     where: { nodeId: 4 },
        //     update: {
        //         nodeId: 4,
        //         tags: '',
        //         lat: 42.32616926134112,
        //         lng: -71.14958745041315,
        //         graphId: 0,
        //     },
        //     create: {
        //         nodeId: 4,
        //         tags: '',
        //         lat: 42.32616926134112,
        //         lng: -71.14958745041315,
        //         graphId: 0,
        //     },
        // }),
        //
        // await prisma.node.upsert({
        //     where: { nodeId: 5 },
        //     update: {
        //         nodeId: 5,
        //         tags: 'Check in',
        //         lat: 42.326144473580044,
        //         lng: -71.14964645901148,
        //         graphId: 0,
        //     },
        //     create: {
        //         nodeId: 5,
        //         tags: 'Check in',
        //         lat: 42.326144473580044,
        //         lng: -71.14964645901148,
        //         graphId: 0,
        //     },
        // }),
        //
        //
        // //Patriot Place
        // await prisma.node.upsert({
        //     where: { nodeId: 6 },
        //     update: {
        //         nodeId: 6,
        //         tags: 'PP Parking lot: Gillette Stadium: Lot 22',
        //         lat: 42.09124112074461 ,
        //         lng: -71.26697356796514,
        //         graphId: 0,
        //     },
        //     create: {
        //         nodeId: 5,
        //         tags: 'PP Parking lot: Gillette Stadium: Lot 22',
        //         lat: 42.09124112074461 ,
        //         lng: -71.26697356796514,
        //         graphId: 0,
        //     },
        // }),
        //
        // await prisma.node.upsert({
        //     where: { nodeId: 6 },
        //     update: {
        //         nodeId: 6,
        //         name: 'PP Parking lot: Gillette Stadium: Lot 23',
        //         lat: 42.09124112074461,
        //         lng: -71.26697356796514,
        //         graphId: 0,
        //     },
        //     create: {
        //         nodeId: 6,
        //         name: 'PP Parking lot: Gillette Stadium: Lot 23',
        //         lat: 42.09124112074461,
        //         lng: -71.26697356796514,
        //         graphId: 0,
        //     },
        // }),
        //
        // await prisma.node.upsert({
        //     where: { nodeId: 7 },
        //     update: {
        //         nodeId: 7,
        //         name: 'PP Parking lot: Gillette Stadium',
        //         lat: 42.08912260935516,
        //         lng: -71.27005934715271,
        //         graphId: 0,
        //     },
        //     create: {
        //         nodeId: 7,
        //         name: 'PP Parking lot: Gillette Stadium',
        //         lat: 42.08912260935516,
        //         lng: -71.27005934715271,
        //         graphId: 0,
        //     },
        // }),
        //
        // await prisma.node.upsert({
        //     where: { nodeId: 8 },
        //     update: {
        //         nodeId: 8,
        //         name: 'PP Parking lot: Limo Parking',
        //         lat: 42.09305236722215,
        //         lng: -71.26820996403694,
        //         graphId: 0,
        //     },
        //     create: {
        //         nodeId: 8,
        //         name: 'PP Parking lot: Limo Parking',
        //         lat: 42.09305236722215,
        //         lng: -71.26820996403694,
        //         graphId: 0,
        //     },
        // }),
        //
        // await prisma.node.upsert({
        //     where: { nodeId: 9 },
        //     update: {
        //         nodeId: 9,
        //         name: 'PP Parking lot: ADA Parking',
        //         lat: 42.095880863598175,
        //         lng: -71.26509811861098,
        //         graphId: 0,
        //     },
        //     create: {
        //         nodeId: 9,
        //         name: 'PP Parking lot: ADA Parking',
        //         lat: 42.095880863598175,
        //         lng: -71.26509811861098,
        //         graphId: 0,
        //     },
        // }),
        //
        // await prisma.node.upsert({
        //     where: { nodeId: 10 },
        //     update: {
        //         nodeId: 10,
        //         name: 'PP Parking lot: Gillette Stadium: Lot 6',
        //         lat: 42.093978143089934,
        //         lng: -71.26427199823439,
        //         graphId: 0,
        //     },
        //     create: {
        //         nodeId: 10,
        //         name: 'PP Parking lot: Gillette Stadium: Lot 6',
        //         lat: 42.093978143089934,
        //         lng: -71.26427199823439,
        //         graphId: 0,
        //     },
        // }),
        //
        // await prisma.node.upsert({
        //     where: { nodeId: 11 },
        //     update: {
        //         nodeId: 11,
        //         name: 'PP Parking lot: Gillette Stadium: Lot 13\n',
        //         lat: 42.09378707176781,
        //         lng: -71.26363899690688,
        //         graphId: 0,
        //     },
        //     create: {
        //         nodeId: 11,
        //         name: 'PP Parking lot: Gillette Stadium: Lot 13\n',
        //         lat: 42.09378707176781,
        //         lng: -71.26363899690688,
        //         graphId: 0,
        //     },
        // }),
        //
        // await prisma.node.upsert({
        //     where: { nodeId: 12 },
        //     update: {
        //         nodeId: 12,
        //         name: 'PP Parking lot :Gillette Stadium: Lot 14B',
        //         lat: 42.094368232456105,
        //         lng: -71.26248580910168,
        //         graphId: 0,
        //     },
        //     create: {
        //         nodeId: 12,
        //         name: 'PP Parking lot: Gillette Stadium: Lot 14B',
        //         lat: 42.094368232456105,
        //         lng: -71.26248580910168,
        //         graphId: 0,
        //     },
        // }),
        //
        // await prisma.node.upsert({
        //     where: { nodeId: 13 },
        //     update: {
        //         nodeId: 13,
        //         name: 'PP Parking lot: P9 Gate Gillette Stadium\n',
        //         lat: 42.09437221307804,
        //         lng: -71.26248580910168,
        //         graphId: 0,
        //     },
        //     create: {
        //         nodeId: 13,
        //         name: 'PP Parking lot: P9 Gate Gillette Stadium\n',
        //         lat: 42.09437221307804,
        //         lng: -71.26248580910168,
        //         graphId: 0,
        //     },
        // }),
        //
        // await prisma.node.upsert({
        //     where: { nodeId: 14 },
        //     update: {
        //         nodeId: 14,
        //         name: 'PP Parking lot: Gillette Stadium Lot 20',
        //         lat: 42.08998291637353,
        //         lng: -71.26123851882737,
        //         graphId: 0,
        //     },
        //     create: {
        //         nodeId: 14,
        //         name: 'PP Parking lot: Gillette Stadium Lot 20',
        //         lat: 42.08998291637353,
        //         lng: -71.26123851882737,
        //         graphId: 0,
        //     },
        // }),
        //
        // await prisma.node.upsert({
        //     where: { nodeId: 15 },
        //     update: {
        //         nodeId: 15,
        //         name: 'PP Parking lot: Parking Lot 51',
        //         lat: 42.08745647675202,
        //         lng: -71.26928676055769,
        //         graphId: 0,
        //     },
        //     create: {
        //         nodeId: 15,
        //         name: 'PP Parking lot: Parking Lot 51',
        //         lat: 42.08745647675202,
        //         lng: -71.26928676055769,
        //         graphId: 0,
        //     },
        // }),



    ];

    console.log('Nodes seeded!');
    console.log(nodes);

    console.log('Seeding edges...');
    const edges = [
        await prisma.edge.upsert({
            where: {edgeId: 0},
            create: {
                edgeId: 0,
                weight: 0,
                startNodeId: 0,
                endNodeId: 1,
            },
            update: {
                edgeId: 0,
                weight: 0,
                startNodeId: 0,
                endNodeId: 1,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 1},
            create: {
                edgeId: 1,
                weight: 0,
                startNodeId: 1,
                endNodeId: 2,
            },
            update: {
                edgeId: 1,
                weight: 0,
                startNodeId: 1,
                endNodeId: 2,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 2},
            create: {
                edgeId: 2,
                weight: 0,
                startNodeId: 2,
                endNodeId: 3,
            },
            update: {
                edgeId: 2,
                weight: 0,
                startNodeId: 2,
                endNodeId: 3,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 3},
            create: {
                edgeId: 3,
                weight: 0,
                startNodeId: 3,
                endNodeId: 4,
            },
            update: {
                edgeId: 3,
                weight: 0,
                startNodeId: 3,
                endNodeId: 4,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 4},
            create: {
                edgeId: 4,
                weight: 0,
                startNodeId: 4,
                endNodeId: 5,
            },
            update: {
                edgeId: 4,
                weight: 0,
                startNodeId: 4,
                endNodeId: 5,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 5},
            create: {
                edgeId: 5,
                weight: 0,
                startNodeId: 5,
                endNodeId: 6,
            },
            update: {
                edgeId: 5,
                weight: 0,
                startNodeId: 5,
                endNodeId: 6,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 6},
            create: {
                edgeId: 6,
                weight: 0,
                startNodeId: 6,
                endNodeId: 7,
            },
            update: {
                edgeId: 6,
                weight: 0,
                startNodeId: 6,
                endNodeId: 7,
            }
        }),


        //OUTSIDE: from garage to entrance path below
        // await prisma.edge.upsert({
        //     where: {edgeId: 100},
        //     create: {
        //         edgeId: 100,
        //         weight: 0,
        //         startNodeId: 100,
        //         endNodeId: 101,
        //     },
        //     update: {
        //         edgeId: 100,
        //         weight: 0,
        //         startNodeId: 100,
        //         endNodeId: 101,
        //     }
        // }),
        // await prisma.edge.upsert({
        //     where: {edgeId: 101},
        //     create: {
        //         edgeId: 101,
        //         weight: 0,
        //         startNodeId: 101,
        //         endNodeId: 102,
        //     },
        //     update: {
        //         edgeId: 101,
        //         weight: 0,
        //         startNodeId: 101,
        //         endNodeId: 102,
        //     }
        // }),
        // await prisma.edge.upsert({
        //     where: {edgeId: 102},
        //     create: {
        //         edgeId: 102,
        //         weight: 0,
        //         startNodeId: 102,
        //         endNodeId: 103,
        //     },
        //     update: {
        //         edgeId: 102,
        //         weight: 0,
        //         startNodeId: 102,
        //         endNodeId: 103,
        //     }
        // }),
        // await prisma.edge.upsert({
        //     where: {edgeId: 103},
        //     create: {
        //         edgeId: 103,
        //         weight: 0,
        //         startNodeId: 103,
        //         endNodeId: 104,
        //     },
        //     update: {
        //         edgeId: 103,
        //         weight: 0,
        //         startNodeId: 103,
        //         endNodeId: 104,
        //     }
        // }),
        // await prisma.edge.upsert({
        //     where: {edgeId: 104},
        //     create: {
        //         edgeId: 104,
        //         weight: 0,
        //         startNodeId: 104,
        //         endNodeId: 105,
        //     },
        //     update: {
        //         edgeId: 104,
        //         weight: 0,
        //         startNodeId: 104,
        //         endNodeId: 105,
        //     }
        // }),
        // await prisma.edge.upsert({
        //     where: {edgeId: 105},
        //     create: {
        //         edgeId: 105,
        //         weight: 0,
        //         startNodeId: 105,
        //         endNodeId: 106,
        //     },
        //     update: {
        //         edgeId: 105,
        //         weight: 0,
        //         startNodeId: 105,
        //         endNodeId: 106,
        //     }
        // }),
        // await prisma.edge.upsert({
        //     where: {edgeId: 106},
        //     create: {
        //         edgeId: 106,
        //         weight: 0,
        //         startNodeId: 106,
        //         endNodeId: 107,
        //     },
        //     update: {
        //         edgeId: 106,
        //         weight: 0,
        //         startNodeId: 106,
        //         endNodeId: 107,
        //     }
        // }),

        // await prisma.edge.upsert({
        //     where: {edgeId: 0},
        //     create: {
        //         edgeId: 0,
        //         weight: 0,
        //         startNodeId: 0,
        //         endNodeId: 1,
        //     },
        //     update: {
        //         edgeId: 0,
        //         weight: 0,
        //         startNodeId: 0,
        //         endNodeId: 1,
        //     }
        // }),
        // await prisma.edge.upsert({
        //     where: {edgeId: 1},
        //     create: {
        //         edgeId: 1,
        //         weight: 0,
        //         startNodeId: 1,
        //         endNodeId: 2,
        //     },
        //     update: {
        //         edgeId: 1,
        //         weight: 0,
        //         startNodeId: 1,
        //         endNodeId: 2,
        //     }
        // }),
        // await prisma.edge.upsert({
        //     where: {edgeId: 2},
        //     create: {
        //         edgeId: 2,
        //         weight: 0,
        //         startNodeId: 2,
        //         endNodeId: 3,
        //     },
        //     update: {
        //         edgeId: 2,
        //         weight: 0,
        //         startNodeId: 2,
        //         endNodeId: 3,
        //     }
        // }),
        // await prisma.edge.upsert({
        //     where: {edgeId: 3},
        //     create: {
        //         edgeId: 3,
        //         weight: 0,
        //         startNodeId: 3,
        //         endNodeId: 4,
        //     },
        //     update: {
        //         edgeId: 3,
        //         weight: 0,
        //         startNodeId: 3,
        //         endNodeId: 4,
        //     }
        // }),
        // await prisma.edge.upsert({
        //     where: {edgeId: 4},
        //     create: {
        //         edgeId: 4,
        //         weight: 0,
        //         startNodeId: 4,
        //         endNodeId: 5,
        //     },
        //     update: {
        //         edgeId: 4,
        //         weight: 0,
        //         startNodeId: 4,
        //         endNodeId: 5,
        //     }
        // }),
        // await prisma.edge.upsert({
        //     where: {edgeId: 5},
        //     create: {
        //         edgeId: 5,
        //         weight: 0,
        //         startNodeId: 5,
        //         endNodeId: 6,
        //     },
        //     update: {
        //         edgeId: 5,
        //         weight: 0,
        //         startNodeId: 5,
        //         endNodeId: 6,
        //     }
        // }),
        //
        // await prisma.edge.upsert({
        //     where: {edgeId: 6},
        //     create: {
        //         edgeId: 6,
        //         weight: 0,
        //         startNodeId: 6,
        //         endNodeId: 7,
        //     },
        //     update: {
        //         edgeId: 6,
        //         weight: 0,
        //         startNodeId: 6,
        //         endNodeId: 7,
        //     }
        // }),
        // await prisma.edge.upsert({
        //     where: {edgeId: 7},
        //     create: {
        //         edgeId: 7,
        //         weight: 0,
        //         startNodeId: 7,
        //         endNodeId: 8,
        //     },
        //     update: {
        //         edgeId: 7,
        //         weight: 0,
        //         startNodeId: 7,
        //         endNodeId: 8,
        //     }
        // }),
        //
        // await prisma.edge.upsert({
        //     where: {edgeId: 8},
        //     create: {
        //         edgeId: 8,
        //         weight: 0,
        //         startNodeId: 8,
        //         endNodeId: 9,
        //     },
        //     update: {
        //         edgeId: 8,
        //         weight: 0,
        //         startNodeId: 8,
        //         endNodeId: 9,
        //     }
        // }),
        //OUTSIDE: end of path from garage to entrance ABOVE^^





        await prisma.edge.upsert({
            where: {edgeId: 100},
            create: {
                edgeId: 100,
                weight: 0,
                startNodeId: 100,
                endNodeId: 101, //checkpoint 3 node
            },
            update: {
                edgeId: 100,
                weight: 0,
                startNodeId: 100,
                endNodeId: 101,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 101},
            create: {
                edgeId: 101,
                weight: 0,
                startNodeId: 101,
                endNodeId: 102, //checkpoint 3 node
            },
            update: {
                edgeId: 101,
                weight: 0,
                startNodeId: 101,
                endNodeId: 102,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 102},
            create: {
                edgeId: 102,
                weight: 0,
                startNodeId: 102,
                endNodeId: 103, //checkpoint 3 node
            },
            update: {
                edgeId: 102,
                weight: 0,
                startNodeId: 102,
                endNodeId: 103,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 103},
            create: {
                edgeId: 103,
                weight: 0,
                startNodeId: 103,
                endNodeId: 104, //checkpoint 3 node
            },
            update: {
                edgeId: 103,
                weight: 0,
                startNodeId: 103,
                endNodeId: 104,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 104},
            create: {
                edgeId: 104,
                weight: 0,
                startNodeId: 104,
                endNodeId: 105, //checkpoint 3 node
            },
            update: {
                edgeId: 104,
                weight: 0,
                startNodeId: 104,
                endNodeId: 105,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 105},
            create: {
                edgeId: 105,
                weight: 0,
                startNodeId: 105,
                endNodeId: 106, //checkpoint 3 node
            },
            update: {
                edgeId: 105,
                weight: 0,
                startNodeId: 105,
                endNodeId: 106,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 106},
            create: {
                edgeId: 106,
                weight: 0,
                startNodeId: 106,
                endNodeId: 107, //checkpoint 3 node
            },
            update: {
                edgeId: 106,
                weight: 0,
                startNodeId: 106,
                endNodeId: 107,
            }
        }),
        // INSIDE BUILDING: from door to checkpoint 1 BELOW
        await prisma.edge.upsert({
            where: {edgeId: 107},
            create: {
                edgeId: 107,
                weight: 0,
                startNodeId: 108,
                endNodeId: 109,
            },
            update: {
                edgeId: 107,
                weight: 0,
                startNodeId: 108,
                endNodeId: 109,
            }
        }),

        await prisma.edge.upsert({
            where: {edgeId: 108},
            create: {
                edgeId: 108,
                weight: 0,
                startNodeId: 109,
                endNodeId: 110,
            },
            update: {
                edgeId: 108,
                weight: 0,
                startNodeId: 109,
                endNodeId: 110,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 109},
            create: {
                edgeId: 109,
                weight: 0,
                startNodeId: 110,
                endNodeId: 111,
            },
            update: {
                edgeId: 109,
                weight: 0,
                startNodeId: 110,
                endNodeId: 111,
            }
        }),
        // INSIDE BUILDING: end of path from door to checkpoint 1 ABOVE ^^



        // INSIDE BUILDING: from door to checkpoint 2 BELOW
        await prisma.edge.upsert({
            where: {edgeId: 110},
            create: {
                edgeId: 110,
                weight: 0,
                startNodeId: 108, // door node
                endNodeId: 112, // hallway beside checkpoint 2 node
            },
            update: {
                edgeId: 110,
                weight: 0,
                startNodeId: 108,
                endNodeId: 112,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 111},
            create: {
                edgeId: 111,
                weight: 0,
                startNodeId: 112,
                endNodeId: 113,
            },
            update: {
                edgeId: 111,
                weight: 0,
                startNodeId: 112,
                endNodeId: 113, //checkpoint 2 node
            }
        }),
        //INSIDE BUILDING: end of path from 'Door 1' to checkpoint 2 ABOVE



        //INSIDE BUILDING: path from 'Door 1' to checkpoint 3 BELOW
        //
        await prisma.edge.upsert({
            where: {edgeId: 112},
            create: {
                edgeId: 112,
                weight: 0,
                startNodeId: 112,
                endNodeId: 114,
            },
            update: {
                edgeId: 112,
                weight: 0,
                startNodeId: 112,
                endNodeId: 114, //hallway besides checkpoint 3
            }
        }),
        //
        await prisma.edge.upsert({
            where: {edgeId: 113},
            create: {
                edgeId: 113,
                weight: 0,
                startNodeId: 114,
                endNodeId: 115, //checkpoint 3 node
            },
            update: {
                edgeId: 113,
                weight: 0,
                startNodeId: 114,
                endNodeId: 115,
            }
        }),




        await prisma.edge.upsert({
            where: {edgeId: 200},
            create: {
                edgeId: 200,
                weight: 0,
                startNodeId: 200,
                endNodeId: 201, //checkpoint 3 node
            },
            update: {
                edgeId: 200,
                weight: 0,
                startNodeId: 200,
                endNodeId: 201,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 201},
            create: {
                edgeId: 201,
                weight: 0,
                startNodeId: 201,
                endNodeId: 202, //checkpoint 3 node
            },
            update: {
                edgeId: 201,
                weight: 0,
                startNodeId: 201,
                endNodeId: 202,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 202},
            create: {
                edgeId: 202,
                weight: 0,
                startNodeId: 202,
                endNodeId: 203, //checkpoint 3 node
            },
            update: {
                edgeId: 202,
                weight: 0,
                startNodeId: 202,
                endNodeId: 203,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 203},
            create: {
                edgeId: 203,
                weight: 0,
                startNodeId: 203,
                endNodeId: 204, //checkpoint 3 node
            },
            update: {
                edgeId: 203,
                weight: 0,
                startNodeId: 203,
                endNodeId: 204,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 204},
            create: {
                edgeId: 204,
                weight: 0,
                startNodeId: 204,
                endNodeId: 205, //checkpoint 3 node
            },
            update: {
                edgeId: 204,
                weight: 0,
                startNodeId: 204,
                endNodeId: 205,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 205},
            create: {
                edgeId: 205,
                weight: 0,
                startNodeId: 205,
                endNodeId: 206, //checkpoint 3 node
            },
            update: {
                edgeId: 205,
                weight: 0,
                startNodeId: 205,
                endNodeId: 206,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 206},
            create: {
                edgeId: 206,
                weight: 0,
                startNodeId: 206,
                endNodeId: 207, //checkpoint 3 node
            },
            update: {
                edgeId: 206,
                weight: 0,
                startNodeId: 206,
                endNodeId: 207,
            }
        }),


        await prisma.edge.upsert({
            where: {edgeId: 208},
            create: {
                edgeId: 208,
                weight: 0,
                startNodeId: 208,
                endNodeId: 209, //checkpoint 3 node
            },
            update: {
                edgeId: 208,
                weight: 0,
                startNodeId: 208,
                endNodeId: 209,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 209},
            create: {
                edgeId: 209,
                weight: 0,
                startNodeId: 209,
                endNodeId: 210, //checkpoint 3 node
            },
            update: {
                edgeId: 209,
                weight: 0,
                startNodeId: 209,
                endNodeId: 210,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 210},
            create: {
                edgeId: 210,
                weight: 0,
                startNodeId: 210,
                endNodeId: 211, //checkpoint 3 node
            },
            update: {
                edgeId: 210,
                weight: 0,
                startNodeId: 210,
                endNodeId: 211,
            }
        }),




        await prisma.edge.upsert({
            where: {edgeId: 300},
            create: {
                edgeId: 300,
                weight: 0,
                startNodeId: 300,
                endNodeId: 301, //checkpoint 3 node
            },
            update: {
                edgeId: 300,
                weight: 0,
                startNodeId: 300,
                endNodeId: 301,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 301},
            create: {
                edgeId: 301,
                weight: 0,
                startNodeId: 301,
                endNodeId: 302, //checkpoint 3 node
            },
            update: {
                edgeId: 301,
                weight: 0,
                startNodeId: 301,
                endNodeId: 302,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 302},
            create: {
                edgeId: 302,
                weight: 0,
                startNodeId: 302,
                endNodeId: 303, //checkpoint 3 node
            },
            update: {
                edgeId: 302,
                weight: 0,
                startNodeId: 302,
                endNodeId: 303,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 303},
            create: {
                edgeId: 303,
                weight: 0,
                startNodeId: 303,
                endNodeId: 304, //checkpoint 3 node
            },
            update: {
                edgeId: 303,
                weight: 0,
                startNodeId: 303,
                endNodeId: 304,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 304},
            create: {
                edgeId: 304,
                weight: 0,
                startNodeId: 304,
                endNodeId: 305, //checkpoint 3 node
            },
            update: {
                edgeId: 304,
                weight: 0,
                startNodeId: 304,
                endNodeId: 305,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 305},
            create: {
                edgeId: 305,
                weight: 0,
                startNodeId: 305,
                endNodeId: 306, //checkpoint 3 node
            },
            update: {
                edgeId: 305,
                weight: 0,
                startNodeId: 305,
                endNodeId: 306,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 306},
            create: {
                edgeId: 306,
                weight: 0,
                startNodeId: 306,
                endNodeId: 307, //checkpoint 3 node
            },
            update: {
                edgeId: 306,
                weight: 0,
                startNodeId: 306,
                endNodeId: 307,
            }
        }),


        await prisma.edge.upsert({
            where: {edgeId: 307},
            create: {
                edgeId: 307,
                weight: 0,
                startNodeId: 308,
                endNodeId: 309, //checkpoint 3 node
            },
            update: {
                edgeId: 307,
                weight: 0,
                startNodeId: 308,
                endNodeId: 309,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 308},
            create: {
                edgeId: 308,
                weight: 0,
                startNodeId: 309,
                endNodeId: 310, //checkpoint 3 node
            },
            update: {
                edgeId: 308,
                weight: 0,
                startNodeId: 309,
                endNodeId: 310,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 309},
            create: {
                edgeId: 309,
                weight: 0,
                startNodeId: 310,
                endNodeId: 311, //checkpoint 3 node
            },
            update: {
                edgeId: 309,
                weight: 0,
                startNodeId: 310,
                endNodeId: 311,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 310},
            create: {
                edgeId: 310,
                weight: 0,
                startNodeId: 309,
                endNodeId: 312, //checkpoint 3 node
            },
            update: {
                edgeId: 310,
                weight: 0,
                startNodeId: 309,
                endNodeId: 312,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 311},
            create: {
                edgeId: 311,
                weight: 0,
                startNodeId: 312,
                endNodeId: 313, //checkpoint 3 node
            },
            update: {
                edgeId: 311,
                weight: 0,
                startNodeId: 312,
                endNodeId: 313,
            }
        }),
        await prisma.edge.upsert({
            where: {edgeId: 312},
            create: {
                edgeId: 312,
                weight: 0,
                startNodeId: 313,
                endNodeId: 314, //checkpoint 3 node
            },
            update: {
                edgeId: 312,
                weight: 0,
                startNodeId: 313,
                endNodeId: 314,
            }
        }),


    ];

    console.log('Edges seeded!');
    console.log(edges);




    // console.log('Seeding hospitals...')
    // const hospitals = [
    //     await prisma.hospital.upsert({
    //         where: {hospitalId: 0},
    //         update: {
    //             hospitalId: 0,
    //             name: 'Chestnut Hill',
    //             placeId: 'ChIJLwkLvP5444kRGTnWxi0zsnM',
    //             defaultZoom: 19,
    //             defaultLat: 42.325956546246374,
    //             defaultLng: -71.14971804046458,
    //         },
    //         create: {
    //             hospitalId: 0,
    //             name: 'Chestnut Hill',
    //             placeId: 'ChIJLwkLvP5444kRGTnWxi0zsnM',
    //             defaultZoom: 19,
    //             defaultLat: 42.325956546246374,
    //             defaultLng: -71.14971804046458,
    //         },
    //     }),
    //     await prisma.hospital.upsert({
    //         where: {hospitalId: 1},
    //         update: {
    //             hospitalId: 1,
    //             name: 'Patriot Place',
    //             placeId: 'ChIJKQrcBrd85IkRhhpDZMarvhQ',
    //             defaultZoom: 18,
    //             defaultLat: 42.09179246168661,
    //             defaultLng: -71.26649009979019,
    //         },
    //         create: {
    //             hospitalId: 1,
    //             name: 'Patriot Place',
    //             placeId: 'ChIJKQrcBrd85IkRhhpDZMarvhQ',
    //             defaultZoom: 18,
    //             defaultLat: 42.09179246168661,
    //             defaultLng: -71.26649009979019,
    //         },
    //     }),
    // ];
    //
    // console.log('Hospitals seeded!');
    // console.log(hospitals);
    //
    // console.log('Seeding floors...');
    //
    // const floors = [
    //     await prisma.floor.upsert({
    //         where: {floorId: 0},
    //         update: {
    //             floorId: 0,
    //             num: 1,
    //             imageURL: '/src/public/floormaps/chf1.png',
    //             north: 42.32629,
    //             south: 42.32569,
    //             east: -71.14921,
    //             west: -71.15013,
    //             hospitalId: 0,
    //         },
    //         create: {
    //             floorId: 0,
    //             num: 1,
    //             imageURL: '/src/public/floormaps/chf1.png',
    //             north: 42.32629,
    //             south: 42.32569,
    //             east: -71.14921,
    //             west: -71.15013,
    //             hospitalId: 0,
    //         },
    //     }),
    //     await prisma.floor.upsert({
    //         where: {floorId: 1},
    //         update: {
    //             floorId: 1,
    //             num: 1,
    //             imageURL: '/src/public/floormaps/pp20f1.png',
    //             north: 42.09310,
    //             south: 42.09246,
    //             east: -71.26553,
    //             west: -71.26657,
    //             hospitalId: 1,
    //         },
    //         create: {
    //             floorId: 1,
    //             num: 1,
    //             imageURL: '/src/public/floormaps/pp20f1.png',
    //             north: 42.09310,
    //             south: 42.09246,
    //             east: -71.26553,
    //             west: -71.26657,
    //             hospitalId: 1,
    //         },
    //     }),
    //     await prisma.floor.upsert({
    //         where: {floorId: 2},
    //         update: {
    //             floorId: 2,
    //             num: 3,
    //             imageURL: '/src/public/floormaps/pp22f3.png',
    //             north: 42.09308,
    //             south: 42.09223,
    //             east: -71.26654,
    //             west: -71.26744,
    //             hospitalId: 1,
    //         },
    //         create: {
    //             floorId: 2,
    //             num: 3,
    //             imageURL: '/src/public/floormaps/pp22f3.png',
    //             north: 42.09308,
    //             south: 42.09223,
    //             east: -71.26654,
    //             west: -71.26744,
    //             hospitalId: 1,
    //         },
    //     }),
    //     await prisma.floor.upsert({
    //         where: {floorId: 3},
    //         update: {
    //             floorId: 3,
    //             num: 4,
    //             imageURL: '/src/public/floormaps/pp22f4.png',
    //             north: 42.09308,
    //             south: 42.09223,
    //             east: -71.26654,
    //             west: -71.26744,
    //             hospitalId: 1,
    //         },
    //         create: {
    //             floorId: 3,
    //             num: 4,
    //             imageURL: '/src/public/floormaps/pp22f4.png',
    //             north: 42.09308,
    //             south: 42.09223,
    //             east: -71.26654,
    //             west: -71.26744,
    //             hospitalId: 1,
    //         },
    //     }),
    // ];
    //
    // console.log('Floors seeded!');
    // console.log(floors);
    //
    // console.log('Seeding departments...');
    // const departments = [
    //     await prisma.department.upsert({
    //         where: {departmentId: 0},
    //         update: {
    //             departmentId: 0,
    //             name: 'Laboratory',
    //             suite: '100',
    //             floorId: 0,
    //         },
    //         create: {
    //             departmentId: 0,
    //             name: 'Laboratory',
    //             suite: '100',
    //             floorId: 0,
    //         },
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 1},
    //         update: {
    //             departmentId: 1,
    //             name: 'Multi-Specialty Clinic',
    //             suite: '130',
    //             floorId: 0,
    //         },
    //         create: {
    //             departmentId: 1,
    //             name: 'Multi-Specialty Clinic',
    //             suite: '130',
    //             floorId: 0,
    //         },
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 2},
    //         update: {
    //             departmentId: 2,
    //             name: 'Radiology, MRI/CT scan',
    //             suite: '102B',
    //             floorId: 0,
    //         },
    //         create: {
    //             departmentId: 2,
    //             name: 'Radiology, MRI/CT scan',
    //             suite: '102B',
    //             floorId: 0,
    //         },
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 3},
    //         update: {
    //             departmentId: 3,
    //             name: 'Blood Draw / Phlebotomy (20 floor 1)',
    //             suite: '',
    //             floorId: 1,
    //         },
    //         create: {
    //             departmentId: 3,
    //             name: 'Blood Draw / Phlebotomy (20 floor 1)',
    //             suite: '',
    //             floorId: 1,
    //         },
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 4},
    //         update: {
    //             departmentId: 4,
    //             name: 'Pharmacy',
    //             suite: '',
    //             floorId: 1,
    //         },
    //         create: {
    //             departmentId: 4,
    //             name: 'Pharmacy',
    //             suite: '',
    //             floorId: 1,
    //         },
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 5},
    //         update: {
    //             departmentId: 5,
    //             name: 'Radiology',
    //             suite: '',
    //             floorId: 1,
    //         },
    //         create: {
    //             departmentId: 5,
    //             name: 'Radiology',
    //             suite: '',
    //             floorId: 1,
    //         },
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 6},
    //         update: {
    //             departmentId: 6,
    //             name: 'Cardiovascular Services',
    //             suite: '',
    //             floorId: 1,
    //         },
    //         create: {
    //             departmentId: 6,
    //             name: 'Cardiovascular Services',
    //             suite: '',
    //             floorId: 1,
    //         },
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 7},
    //         update: {
    //             departmentId: 7,
    //             name: 'Urology',
    //             suite: '',
    //             floorId: 1,
    //         },
    //         create: {
    //             departmentId: 7,
    //             name: 'Urology',
    //             suite: '',
    //             floorId: 1,
    //         },
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 8},
    //         update: {
    //             departmentId: 8,
    //             name: 'Urgent Care Center',
    //             suite: '',
    //             floorId: 1,
    //         },
    //         create: {
    //             departmentId: 8,
    //             name: 'Urgent Care Center',
    //             suite: '',
    //             floorId: 1,
    //         },
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 9},
    //         update: {
    //             departmentId: 9,
    //             name: 'Multi Specialty Clinic',
    //             suite: '',
    //             floorId: 2,
    //         },
    //         create: {
    //             departmentId: 9,
    //             name: 'Multi Specialty Clinic',
    //             suite: '',
    //             floorId: 2,
    //         },
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 10},
    //         update: {
    //             departmentId: 10,
    //             name: 'Patient Financial Services',
    //             suite: '',
    //             floorId: 2,
    //         },
    //         create: {
    //             departmentId: 10,
    //             name: 'Patient Financial Services',
    //             suite: '',
    //             floorId: 2,
    //         },
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 11},
    //         update: {
    //             departmentId: 11,
    //             name: 'Blood Draw / Phlebotomy (22 floor 4)',
    //             suite: '',
    //             floorId: 3,
    //         },
    //         create: {
    //             departmentId: 11,
    //             name: 'Blood Draw / Phlebotomy (22 floor 4)',
    //             suite: '',
    //             floorId: 3,
    //         },
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 12},
    //         update: {
    //             departmentId: 12,
    //             name: 'Community Room',
    //             suite: '',
    //             floorId: 3,
    //         },
    //         create: {
    //             departmentId: 12,
    //             name: 'Community Room',
    //             suite: '',
    //             floorId: 3,
    //         },
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 13},
    //         update: {
    //             departmentId: 13,
    //             name: 'Primary Care',
    //             suite: '',
    //             floorId: 3,
    //         },
    //         create: {
    //             departmentId: 13,
    //             name: 'Primary Care',
    //             suite: '',
    //             floorId: 3,
    //         },
    //     }),
    // ];
    //
    // console.log('Departments seeded!');
    // console.log(departments);


    // console.log('Seeding hospitals...')
    // const hospitals = [
    //     await prisma.hospital.upsert({
    //         where: {hospitalId: 0},
    //         update: {},
    //         create: {
    //             hospitalId: 0,
    //             name: 'Chestnut Hill',
    //             placeId: 'ChIJLwkLvP5444kRGTnWxi0zsnM',
    //             defaultZoom: 20,
    //             defaultLat: 42.325956546246374,
    //             defaultLong: -71.14971804046458,
    //         },
    //     }),
    //     await prisma.hospital.upsert({
    //         where: {hospitalId: 1},
    //         update: {},
    //         create: {
    //             hospitalId: 1,
    //             name: '20 Patriot Place',
    //             placeId: 'ChIJHzla42V95IkR_bz0ni4NvfI',
    //             defaultZoom: 20,
    //             defaultLat: 42.09281274014584,
    //             defaultLong: -71.26612984263076,
    //         },
    //     }),
    //     await prisma.hospital.upsert({
    //         where: {hospitalId: 2},
    //         update: {},
    //         create: {
    //             hospitalId: 2,
    //             name: '22 Patriot Place',
    //             placeId: 'ChIJKQrcBrd85IkRhhpDZMarvhQ',
    //             defaultZoom: 20,
    //             defaultLat: 42.09265139820163,
    //             defaultLong: -71.2669845235888,
    //         },
    //     }),
    // ];
    //
    // console.log('Hospitals seeded!');
    // console.log(hospitals);
    //
    // console.log('Seeding floors...');
    //
    // const floors = [
    //     await prisma.floor.upsert({
    //         where: {floorId: 0},
    //         update: {},
    //         create: {
    //             floorId: 0,
    //             num: 1,
    //             imageURL: '',
    //             hospitalId: 0,
    //         },
    //     }),
    //     await prisma.floor.upsert({
    //         where: {floorId: 1},
    //         update: {},
    //         create: {
    //             floorId: 1,
    //             num: 1,
    //             imageURL: '',
    //             hospitalId: 1,
    //         },
    //     }),
    //     await prisma.floor.upsert({
    //         where: {floorId: 2},
    //         update: {},
    //         create: {
    //             floorId: 2,
    //             num: 3,
    //             imageURL: '',
    //             hospitalId: 2,
    //         },
    //     }),
    //     await prisma.floor.upsert({
    //         where: {floorId: 3},
    //         update: {},
    //         create: {
    //             floorId: 3,
    //             num: 4,
    //             imageURL: '',
    //             hospitalId: 2,
    //         },
    //     }),
    // ];
    //
    // console.log('Floors seeded!');
    // console.log(floors);
    //
    // console.log('Seeding departments...');
    // const departments = [
    //     await prisma.department.upsert({
    //         where: {departmentId: 0},
    //         update: {},
    //         create: {
    //             departmentId: 0,
    //             name: 'Laboratory',
    //             suite: '100',
    //             floorId: 0,
    //         },
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 1},
    //         update: {},
    //         create: {
    //             departmentId: 1,
    //             name: 'Multi-Specialty Clinic',
    //             suite: '130',
    //             floorId: 0,
    //         },
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 2},
    //         update: {},
    //         create: {
    //             departmentId: 2,
    //             name: 'Radiology, MRI/CT scan',
    //             suite: '102B',
    //             floorId: 0,
    //         },
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 3},
    //         update: {},
    //         create: {
    //             departmentId: 3,
    //             name: 'Blood Draw / Phlebotomy',
    //             suite: '',
    //             floorId: 1,
    //         },
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 4},
    //         update: {},
    //         create: {
    //             departmentId: 4,
    //             name: 'Pharmacy',
    //             suite: '',
    //             floorId: 1,
    //         },
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 5},
    //         update: {},
    //         create: {
    //             departmentId: 5,
    //             name: 'Radiology',
    //             suite: '',
    //             floorId: 1,
    //         },
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 6},
    //         update: {},
    //         create: {
    //             departmentId: 6,
    //             name: 'Cardiovascular Services',
    //             suite: '',
    //             floorId: 1,
    //         },
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 7},
    //         update: {},
    //         create: {
    //             departmentId: 7,
    //             name: 'Urology',
    //             suite: '',
    //             floorId: 1,
    //         },
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 8},
    //         update: {},
    //         create: {
    //             departmentId: 8,
    //             name: 'Urgent Care Center',
    //             suite: '',
    //             floorId: 1,
    //         },
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 9},
    //         update: {},
    //         create: {
    //             departmentId: 9,
    //             name: 'Multi Specialty Clinic',
    //             suite: '',
    //             floorId: 2,
    //         },
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 10},
    //         update: {},
    //         create: {
    //             departmentId: 10,
    //             name: 'Patient Financial Services',
    //             suite: '',
    //             floorId: 2,
    //         },
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 11},
    //         update: {},
    //         create: {
    //             departmentId: 11,
    //             name: 'Blood Draw / Phlebotomy',
    //             suite: '',
    //             floorId: 3,
    //         },
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 12},
    //         update: {},
    //         create: {
    //             departmentId: 12,
    //             name: 'Community Room',
    //             suite: '',
    //             floorId: 3,
    //         },
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 13},
    //         update: {},
    //         create: {
    //             departmentId: 13,
    //             name: 'Primary Care',
    //             suite: '',
    //             floorId: 3,
    //         },
    //     }),
    // ];
    //
    // console.log('Departments seeded!');
    // console.log(departments);


    // Seed departments
    // console.log('Seeding departments...');
    // const departments = [
    //     await prisma.department.upsert({
    //         where: {departmentId: 1},
    //         update: {},
    //         create: {
    //             name: "Allergy and Clinical Immunology",
    //             floor: 3,
    //             suite: "301",
    //             specialtyServices:
    //                 "Allergy, (environmental, food, medication, and venoms), asthma, anaphylaxis, angioedema, sinusitis, and immunodeficiency",
    //             telephone: "(617) 732–9850",
    //         }
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 2},
    //         update: {},
    //         create: {
    //             name: "Allergy and Clinical Immunology",
    //             floor: 5,
    //             suite: "540",
    //             specialtyServices:
    //                 "Allergy, (environmental, food, medication, and venoms), asthma, anaphylaxis, angioedema, sinusitis, and immunodeficiency",
    //             telephone: "(617) 732–9850",
    //         }
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 3},
    //         update: {},
    //         create: {
    //             name: "Backup Child Care Center",
    //             floor: 2,
    //             suite: "210",
    //             specialtyServices: "Backup childcare for employees",
    //             hours:"Monday – Friday, 8 am–4:30 pm",
    //             telephone: "(617) 732–9543",
    //         }
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 4},
    //         update: {},
    //         create: {
    //             name: "Brigham Dermatology Associates (BDA)",
    //             floor: 3,
    //             suite: "317",
    //             specialtyServices: "Medical and surgical dermatology",
    //             telephone: "(617) 732–9080",
    //         }
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 5},
    //         update: {},
    //         create: {
    //             name: "Brigham Obstetrics and Gynecology Group (BOGG)",
    //             floor: 5,
    //             suite: "575",
    //             specialtyServices: "Gynecology, Obstetrics",
    //             telephone: "(617) 732–9100",
    //         }
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 6},
    //         update: {},
    //         create: {
    //             name: "Brigham Physicians Group (BPG)",
    //             floor: 4,
    //             suite: "428",
    //             specialtyServices: "Adult Primary Care",
    //             telephone: "(617) 732–9900",
    //         }
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 7},
    //         update: {},
    //         create: {
    //             name: "Brigham Physicians Group (BPG)",
    //             floor: 5,
    //             suite: "530",
    //             specialtyServices: "Adult Primary Care",
    //             telephone: "(617) 732–9900",
    //         }
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 8},
    //         update: {},
    //         create: {
    //             name: "Brigham Psychiatric Specialities",
    //             floor: 3,
    //             suite: "303",
    //             specialtyServices: "Psychiatry, Psychology, Social Work",
    //             telephone: "(617) 732–9811",
    //         }
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 9},
    //         update: {},
    //         create: {
    //             name: "Center for Pain Medicine",
    //             floor: 3,
    //             suite: "320",
    //             specialtyServices: "Multidisciplinary pain management",
    //             telephone: "(617) 732–9060",
    //         }
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 10},
    //         update: {},
    //         create: {
    //             name: "Crohn's and Colitis Center",
    //             floor: 2,
    //             suite: "201",
    //             specialtyServices: "Crohn's disease, inflammatory bowel disease, infusion services, microscopic colitis, pulmonary, rheumatology, ulcerative colitis",
    //             telephone: "(617) 732–6389",
    //         }
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 11},
    //         update: {},
    //         create: {
    //             name: "Endoscopy Center",
    //             floor: 2,
    //             suite: "202",
    //             specialtyServices: "Bacterial overgrowth breath test, colonoscopy, H. Pylori breath test, lactose malabsorption breath test, upper endoscopy",
    //             telephone: "(617) 732–7426",
    //         }
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 12},
    //         update: {},
    //         create: {
    //             name: "Gretchen S. and Edward A. Fish Center for Women's Health",
    //             floor: 4,
    //             suite: "402",
    //             specialtyServices: "Cardiology, Dermatology (cosmetic, medical, and surgical), Endocrinology, Gastroenterology, Gynecology, Hematology, Infectious Diseases, Mental Health (social work), General neurology, Nutrition, Primary care, Pulmonary, Renal, Rheumatology, Sleep medicine, Women's Health (Menopause and Midlife Clinic, Obstetric Internal Medicine)\n",
    //             telephone: "(617) 732–9300",
    //         }
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 13},
    //         update: {},
    //         create: {
    //             name: "Laboratory",
    //             floor: 1,
    //             suite: "100",
    //             specialtyServices: "Blood work, lab services",
    //             hours: "Mon–Fri, 7 a.m.–7 p.m.; Sat, 7 a.m.–3 p.m.",
    //             telephone: "(617) 732–9841",
    //         }
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 14},
    //         update: {},
    //         create: {
    //             name: "Multi-Specialty Clinic",
    //             floor: 1,
    //             suite: "130",
    //             specialtyServices:
    //                 "Orthopedic surgery, Vascular surgery, Contact Dermatitis and Occupational Dermatology Program, Pain Medicine and Travel Medicine\n",
    //             telephone: "(617) 732–9500",
    //         }
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 15},
    //         update: {},
    //         create: {
    //             name: "Osher Clinical Center for Integrative Health",
    //             floor: 4,
    //             suite: "422",
    //             specialtyServices: "Acupuncture, health coaching, chiropractic, craniosacral therapy, integrative medicine, structural massage & movement therapies, neurology (movement disorders and headache), echocardiography, and pulmonary.\n" +
    //                 "Educational courses: Integrative wellness courses are also offered.\n",
    //             telephone: "(617) 732–9700",
    //         }
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 16},
    //         update: {},
    //         create: {
    //             name: "Patient Financial Services",
    //             floor: 2,
    //             suite: "204B",
    //             specialtyServices: "Patient financial counselling (Payment, Insurance, Billing questions)",
    //             telephone: "(617) 732–9677",
    //         }
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 17},
    //         update: {},
    //         create: {
    //             name: "Pharmacy",
    //             floor: 3,
    //             suite: "317",
    //             specialtyServices: "Outpatient Pharmacy Service",
    //             hours: "(Monday - Friday, 9 am-4 pm excluding holidays)",
    //             telephone: "(617) 732–9040",
    //         }
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 18},
    //         update: {},
    //         create: {
    //             name: "Radiology",
    //             floor: 5,
    //             suite: "560",
    //             specialtyServices: "Bone Density, Breast Imaging/Mammography, Ultrasound, X-Ray",
    //             telephone: "(617) 732–9801",
    //         }
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 19},
    //         update: {},
    //         create: {
    //             name: "Radiology, MRI/CT scan",
    //             floor: 1,
    //             suite: "102B",
    //             specialtyServices: "CT scan, MRI, X-Ray",
    //             telephone: "(617) 732–9821",
    //         }
    //     }),
    //     await prisma.department.upsert({
    //         where: {departmentId: 20},
    //         update: {},
    //         create: {
    //             name: "Rehabilitation Services",
    //             floor: 2,
    //             suite: "200",
    //             specialtyServices: "Orthopedic, sports, neurologic and vestibular Physical Therapy, Men's and Women's pelvic floor Physical Therapy. Hand/Occupational, Therapy Speech Language Pathology",
    //             telephone: "(617) 732–9525",
    //         }
    //     })
    // ];
    // console.log('Departments seeded!');
    // console.log(departments);

    //seed nodes
    // console.log('Seeding Nodes...');
    // const nodes = [
    //     await prisma.node.upsert({
    //         where: {nodeId: 1},
    //         update: {},
    //         create: {
    //             name: 'entrance',
    //             xCoord: 705,
    //             yCoord: 1060,
    //         }
    //     }),
    //     await prisma.node.upsert({
    //         where: {nodeId: 2},
    //         update: {},
    //         create: {
    //             name: 'n1',
    //             xCoord: 360,
    //             yCoord: 500,
    //         }
    //     })
    // ];
    //
    // console.log('Nodes seeded!');
    // console.log(nodes);
    //
    //
    // //seed edges
    // console.log('Seeding Edges...');
    // const edges = [
    //     await prisma.edge.upsert({
    //         where: {edgeId: 1},
    //         update: {},
    //         create: {
    //             weight: 12,
    //             startNodeId: 1,
    //             endNodeId: 2,
    //         }
    //     })
    // ];
    //
    // console.log('Edges seeded!');
    // console.log(edges);


    // console.log('Seeding graphs:');
    //
    // const graphs = [
    //     await prisma.graph.upsert({
    //         where: {graphId: 0},
    //         update: {
    //             graphId: 0,
    //             name: 'CH FL1',
    //             floorId: 0,
    //         },
    //         create: {
    //             graphId: 0,
    //             name: 'CH FL1',
    //             floorId: 0,
    //         },
    //     }),
    // ];
    //
    // console.log('Graphs seeded!');
    // console.log(graphs);
    //
    // console.log('Seeding nodes:');
    //
    // const nodes = [
    //     await prisma.node.upsert({
    //         where: {nodeId: 0},
    //         update: {
    //             nodeId: 0,
    //             name: 'Entrance',
    //             lat: 0,
    //             lng: 0,
    //             graphId: 0,
    //         },
    //         create: {
    //             nodeId: 0,
    //             name: 'Entrance',
    //             lat: 0,
    //             lng: 0,
    //             graphId: 0,
    //         },
    //     }),
    //     await prisma.node.upsert({
    //         where: {nodeId: 1},
    //         update: {
    //             nodeId: 1,
    //             name: 'Exit',
    //             lat: 1,
    //             lng: 1,
    //             graphId: 0,
    //         },
    //         create: {
    //             nodeId: 1,
    //             name: 'Exit',
    //             lat: 1,
    //             lng: 1,
    //             graphId: 0,
    //         },
    //     }),
    // ];
    //
    // console.log('Nodes seeded!');
    // console.log(nodes);
    //
    // console.log('Seeding edges:');
    // const edges = [
    //     await prisma.edge.upsert({
    //         where: {edgeId: 0},
    //         update: {
    //             edgeId: 0,
    //             weight: 1,
    //             startNodeId: 0,
    //             endNodeId: 1,
    //         },
    //         create: {
    //             edgeId: 0,
    //             weight: 1,
    //             startNodeId: 0,
    //             endNodeId: 1,
    //         },
    //     })
    // ];
    // console.log('Departments seeded!');
    // console.log(departments);

    // Seed service requests
    console.log('Seeding service requests...');
    const serviceRequests = [
        await prisma.serviceRequest.upsert({
            where: { requestId: 1},
            update: {},
            create: {
                assignedEmployeeId: null,
                employeeRequestedById: 1,
                departmentUnderId: 3,
                priority: 'Low',
                requestStatus: 'Unassigned',
                roomNum: '111',
            },
        }),
        await prisma.serviceRequest.upsert({
            where: { requestId: 2},
            update: {},
            create: {
                assignedEmployeeId: 1,
                employeeRequestedById: 4,
                departmentUnderId: 11,
                priority: 'Medium',
                requestStatus: 'Pending',
                roomNum: '121',
            },
        }),
        await prisma.serviceRequest.upsert({
            where: { requestId: 3},
            update: {},
            create: {
                assignedEmployeeId: 2,
                employeeRequestedById: 1,
                departmentUnderId: 7,
                priority: 'High',
                requestStatus: 'Incomplete',
                roomNum: '232',
            },
        }),
        await prisma.serviceRequest.upsert({
            where: { requestId: 4},
            update: {},
            create: {
                assignedEmployeeId: null,
                employeeRequestedById: 5,
                departmentUnderId: 8,
                priority: 'Medium',
                requestStatus: 'Unassigned',
                roomNum: '301',
            },
        }),
        await prisma.serviceRequest.upsert({
            where: { requestId: 5},
            update: {},
            create: {
                assignedEmployeeId: 3,
                employeeRequestedById: 2,
                departmentUnderId: 12,
                priority: 'High',
                requestStatus: 'Incomplete',
                roomNum: '130',
            },
        }),
        await prisma.serviceRequest.upsert({
            where: { requestId: 6},
            update: {},
            create: {
                assignedEmployeeId: null,
                employeeRequestedById: 1,
                departmentUnderId: 11,
                priority: 'Emergency',
                requestStatus: 'Unassigned',
                roomNum: '211',
            },
        }),
        await prisma.serviceRequest.upsert({
            where: { requestId: 7},
            update: {},
            create: {
                assignedEmployeeId: 4,
                employeeRequestedById: 3,
                departmentUnderId: 11,
                priority: 'Low',
                requestStatus: 'Complete',
                roomNum: '123',
            },
        }),
        await prisma.serviceRequest.upsert({
            where: { requestId: 8},
            update: {},
            create: {
                assignedEmployeeId: 3,
                employeeRequestedById: 4,
                departmentUnderId: 10,
                priority: 'Medium',
                requestStatus: 'Pending',
                roomNum: '312',
            },
        }),
        await prisma.serviceRequest.upsert({
            where: { requestId: 9},
            update: {},
            create: {
                assignedEmployeeId: null,
                employeeRequestedById: 2,
                departmentUnderId: 5,
                priority: 'Low',
                requestStatus: 'Unassigned',
                roomNum: '133',
            },
        }),
        await prisma.serviceRequest.upsert({
            where: { requestId: 10},
            update: {},
            create: {
                assignedEmployeeId: null,
                employeeRequestedById: 1,
                departmentUnderId: 3,
                priority: 'Low',
                requestStatus: 'Unassigned',
                roomNum: '112',
            },
        }),
        await prisma.serviceRequest.upsert({
            where: { requestId: 11},
            update: {},
            create: {
                assignedEmployeeId: null,
                employeeRequestedById: 3,
                departmentUnderId: 12,
                priority: 'Emergency',
                requestStatus: 'Unassigned',
                roomNum: '113',
            },
        }),
        await prisma.serviceRequest.upsert({
            where: { requestId: 12},
            update: {},
            create: {
                assignedEmployeeId: 3,
                employeeRequestedById: 3,
                departmentUnderId: 10,
                priority: 'Low',
                requestStatus: 'Pending',
                roomNum: '201',
                comments: 'Please calibrate prior to appointment.',
            },
        }),
        await prisma.serviceRequest.upsert({
            where: { requestId: 13},
            update: {},
            create: {
                assignedEmployeeId: null,
                employeeRequestedById: 1,
                departmentUnderId: 7,
                priority: 'High',
                requestStatus: 'Unassigned',
                roomNum: '204',
                comments: 'Please set up system.',
            },
        }),
        await prisma.serviceRequest.upsert({
            where: { requestId: 14},
            update: {},
            create: {
                assignedEmployeeId: null,
                employeeRequestedById: 2,
                departmentUnderId: 11,
                priority: 'Emergency',
                requestStatus: 'Unassigned',
                roomNum: '318',
                comments: "Send help!",
            },
        }),
        await prisma.serviceRequest.upsert({
            where: { requestId: 15},
            update: {},
            create: {
                assignedEmployeeId: 2,
                employeeRequestedById: 4,
                departmentUnderId: 2,
                priority: 'Low',
                requestStatus: 'Unassigned',
                roomNum: '241',
                comments: "They ran out the west door.",
            },
        }),
        await prisma.serviceRequest.upsert({
            where: { requestId: 16},
            update: {},
            create: {
                assignedEmployeeId: null,
                employeeRequestedById: 3,
                departmentUnderId: 3,
                priority: 'Medium',
                requestStatus: 'Unassigned',
                roomNum: '118',
            },
        }),
    ];
    console.log('Service Requests seeded!');
    console.log(serviceRequests);


    // Seed translator requests
    console.log('Seeding translator requests...');
    const translatorRequests = [
        await prisma.translatorRequest.upsert({
            where: {serviceRequestId: serviceRequests[0].requestId},
            update: {},
            create: {
                serviceRequestId: serviceRequests[0].requestId,
                languageFrom: 'Vietnamese',
                languageTo: 'English',
                startDateTime: new Date('2025-04-01T22:07:00.639Z'),
                endDateTime: new Date('2025-04-01T22:07:45.639Z'),
            }
        }),
        await prisma.translatorRequest.upsert({
            where: {serviceRequestId: serviceRequests[1].requestId},
            update: {},
            create: {
                serviceRequestId: serviceRequests[1].requestId,
                languageFrom: 'Spanish',
                languageTo: 'English',
                startDateTime: new Date('2025-04-11T22:04:30.639Z'),
                endDateTime: new Date('2025-04-11T22:05:00.639Z'),
            },
        }),
        await prisma.translatorRequest.upsert({
            where: {serviceRequestId: serviceRequests[2].requestId},
            update: {},
            create: {
                serviceRequestId: serviceRequests[2].requestId,
                languageFrom: 'English',
                languageTo: 'Portuguese',
                startDateTime: new Date('2025-04-18T22:05:00.639Z'),
                endDateTime: new Date('2025-04-18T22:05:40.639Z'),
            },
        }),
        await prisma.translatorRequest.upsert({
            where: {serviceRequestId: serviceRequests[3].requestId},
            update: {},
            create: {
                serviceRequestId: serviceRequests[3].requestId,
                languageFrom: 'Chinese',
                languageTo: 'English',
                startDateTime: new Date('2025-04-02T22:01:15.639Z'),
                endDateTime: new Date('2025-04-02T22:02:00.639Z'),
            },
        }),
        await prisma.translatorRequest.upsert({
            where: {serviceRequestId: serviceRequests[4].requestId},
            update: {},
            create: {
                serviceRequestId: serviceRequests[4].requestId,
                languageFrom: 'English',
                languageTo: 'Vietnamese',
                startDateTime: new Date('2025-05-27T22:09:00.639Z'),
                endDateTime: new Date('2025-05-27T22:09:45.639Z'),
            },
        }),
        await prisma.translatorRequest.upsert({
            where: {serviceRequestId: serviceRequests[5].requestId},
            update: {},
            create: {
                serviceRequestId: serviceRequests[5].requestId,
                languageFrom: 'German',
                languageTo: 'Spanish',
                startDateTime: new Date('2025-04-15T22:09:20.639Z'),
                endDateTime: new Date('2025-04-15T22:08:45.639Z'),
            },
        }),
        await prisma.translatorRequest.upsert({
            where: {serviceRequestId: serviceRequests[6].requestId},
            update: {},
            create: {
                serviceRequestId: serviceRequests[6].requestId,
                languageFrom: 'Korean',
                languageTo: 'English',
                startDateTime: new Date('2025-06-01T22:02:30.639Z'),
                endDateTime: new Date('2025-06-01T22:03:30.639Z'),
            },
        }),
        await prisma.translatorRequest.upsert({
            where: {serviceRequestId: serviceRequests[7].requestId},
            update: {},
            create: {
                serviceRequestId: serviceRequests[7].requestId,
                languageFrom: 'English',
                languageTo: 'Russian',
                startDateTime: new Date('2025-05-11T22:04:00.639Z'),
                endDateTime: new Date('2025-05-11T22:04:45.639Z'),
            },
        }),
        await prisma.translatorRequest.upsert({
            where: {serviceRequestId: serviceRequests[8].requestId},
            update: {},
            create: {
                serviceRequestId: serviceRequests[8].requestId,
                languageFrom: 'French',
                languageTo: 'English',
                startDateTime: new Date('2025-04-28T22:07:00.639Z'),
                endDateTime: new Date('2025-04-28T22:07:45.639Z'),
            },
        }),
        await prisma.translatorRequest.upsert({
            where: {serviceRequestId: serviceRequests[9].requestId},
            update: {},
            create: {
                serviceRequestId: serviceRequests[9].requestId,
                languageFrom: 'English',
                languageTo: 'Chinese',
                startDateTime: new Date('2025-05-29T22:09:00.639Z'),
                endDateTime: new Date('2025-05-29T22:10:30.639Z'),
            },
        }),
        await prisma.translatorRequest.upsert({
            where: {serviceRequestId: serviceRequests[10].requestId},
            update: {},
            create: {
                serviceRequestId: serviceRequests[10].requestId,
                languageFrom: 'Spanish',
                languageTo: 'French',
                startDateTime: new Date('2025-06-20T22:10:30.639Z'),
                endDateTime: new Date('2025-06-20T22:11:15.639Z'),
            },
        }),
    ];
    console.log('Translator requests seeded!')
    console.log(translatorRequests);

    // Seed equipment requests
    console.log('Seeding Equipment Requests seeded!');
    const equipmentRequests = [
        await prisma.equipmentRequest.upsert({
            where: {serviceRequestId: serviceRequests[11].requestId},
            update: {},
            create: {
                serviceRequestId: serviceRequests[11].requestId,
                medicalDevice: 'MRI',
                quantity: 1,
                signature: 'Jen',
                startDateTime: new Date('2025-04-01T22:07:00.639Z'),
                endDateTime: new Date('2025-04-01T22:07:45.639Z'),
            }
        }),
        await prisma.equipmentRequest.upsert({
            where: {serviceRequestId: serviceRequests[12].requestId},
            update: {},
            create: {
                serviceRequestId: serviceRequests[12].requestId,
                medicalDevice: 'EKG',
                quantity: 2,
                signature: 'Karina',
                startDateTime: new Date('2025-04-07T22:07:00.639Z'),
                endDateTime: new Date('2025-04-07T22:08:05.639Z'),
            }
        }),
    ];
    console.log('Equipment requests seeded!')
    console.log(equipmentRequests);

    //Seed security request
    console.log('Seeding Security requests...');
    const securityRequests = [
        await prisma.securityRequest.upsert({
            where: {serviceRequestId: serviceRequests[13].requestId},
            update: {},
            create: {
                serviceRequestId: serviceRequests[13].requestId,
                numOfGuards: 3,
                securityType: "Violent Patient",
            }
        }),
        await prisma.securityRequest.upsert({
            where: {serviceRequestId: serviceRequests[14].requestId},
            update: {},
            create: {
                serviceRequestId: serviceRequests[14].requestId,
                numOfGuards: 3,
                securityType: "Elopement",
            },
        }),
    ];
    console.log('Security requests seeded!')
    console.log(securityRequests);

    //Seed sanitation request
    console.log('Seeding Sanitation requests...');
    const sanitationRequests = [
        await prisma.sanitationRequest.upsert({
            where: {serviceRequestId: serviceRequests[15].requestId},
            update: {},
            create: {
                serviceRequestId: serviceRequests[15].requestId,
                type: 'GENERAL',
                status: 'IN_USE',
            }
        }),
    ];
    console.log('Sanitation requests seeded!')
    console.log(sanitationRequests);
}



main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });