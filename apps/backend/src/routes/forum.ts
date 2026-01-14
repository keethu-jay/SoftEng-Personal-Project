import express, { Router, Request, Response } from 'express';
import PrismaClient from '../bin/prisma-client';
import { Prisma } from 'database';
const router: Router = express.Router();

// Returns all posts, if any
router.get('/posts', async function (req: Request, res: Response) {
    // Query db, store response
    const posts = await PrismaClient.post.findMany({
        include: {
            poster: true,
            replies: {
                include: {
                    replier: true,
                },
            },
        },
    });
    // If no posts are found, send 204 and log it
    if (posts == null) {
        console.error('No posts found in database!');
        res.sendStatus(204);
    }
    // Otherwise send 200 and the data
    else {
        console.log(posts);
        res.json(posts);
    }
});

// Returns all posts by created time order, if any
router.get('/newest', async function (req: Request, res: Response) {
    // Query db, store response
    const posts = await PrismaClient.post.findMany({
        orderBy: [
            {
                createdAt: 'desc',
            },
        ],
        include: {
            poster: true,
            replies: {
                include: {
                    replier: true,
                },
            },
        },
    });
    // Always return data, even if empty array
    console.log(`Found ${posts.length} posts`);
    res.json(posts);
});

router.get('/post/:pid', async function (req: Request, res: Response) {
    // Query db, store response
    const posts = await PrismaClient.post.findUnique({
        where: {
            postId: Number(req.params.pid),
        },
        include: {
            poster: true,
            replies: {
                include: {
                    replier: true,
                },
            },
        },
    });
    // If no posts are found, send 204 and log it
    if (posts == null) {
        console.error('No posts found in database!');
        res.sendStatus(204);
    }
    // Otherwise send 200 and the data
    else {
        console.log(posts);
        res.json(posts);
    }
});

router.get('/post', async function (req: Request, res: Response) {
    // Query db, store response
    const posts = await PrismaClient.post.findMany({
        include: {
            poster: true,
            replies: {
                include: {
                    replier: true,
                },
            },
        },
    });
    // If no posts are found, send 204 and log it
    if (posts == null) {
        console.error('No posts found in database!');
        res.sendStatus(204);
    }
    // Otherwise send 200 and the data
    else {
        console.log(posts);
        res.json(posts);
    }
});

// Returns all replies, if any
router.get('/replies', async function (req: Request, res: Response) {
    // Query db, store response
    const replies = await PrismaClient.reply.findMany();
    // If no replies are found, send 204 and log it
    if (replies == null) {
        console.error('No replies found in database!');
        res.sendStatus(204);
    }
    // Otherwise send 200 and the data
    else {
        console.log(replies);
        res.json(replies);
    }
});

// post request to add a post to the database
router.post('/post', async function (req: Request, res: Response) {
    const { title, content, email, posterId } = req.body;

    if (!title || !content || !email) {
        res.status(400).json({ error: 'Missing required fields: title, content, email' });
        return;
    }

    // For demo purposes: allow posts without requiring employee registration
    // Auto-create a demo employee if one doesn't exist for this email
    let employeeId: number;

    if (posterId) {
        employeeId = posterId;
    } else {
        // Try to find employee by email, or create a demo one
        try {
            let employee = await PrismaClient.employee.findUnique({
                where: { email: email },
            });

            if (!employee) {
                // Create a demo employee for forum posting (no restrictions for demo)
                employee = await PrismaClient.employee.create({
                    data: {
                        email: email,
                        password: 'demo', // Not used for Auth0
                        firstName: email.split('@')[0] || 'User',
                        lastName: 'Demo',
                        occupation: 'Guest',
                    },
                });
                console.log('Created demo employee for forum posting:', email);
            }
            employeeId = employee.employeeId;
        } catch (error) {
            console.error(`Unable to find or create employee: ${error}`);
            res.status(400).json({ error: `Unable to process post: ${error}` });
            return;
        }
    }

    try {
        const postData: Prisma.PostCreateInput = {
            title,
            content,
            email,
            poster: {
                connect: {
                    employeeId: employeeId,
                },
            },
        };

        await PrismaClient.post.create({ data: postData });
        console.log('Post created successfully');
        res.status(200).json({ message: 'Post created successfully' });
    } catch (error) {
        console.error(`Unable to create a new post: ${error}`);
        res.status(400).json({ error: `Unable to create post: ${error}` });
    }
});

// post request to add a reply to the database
router.post('/reply/:id', async function (req: Request, res: Response) {
    const postId = Number(req.params.id);
    // const replyDataAttempt: Prisma.ReplyCreateInput = req.body;
    const data: Prisma.ReplyCreateInput = {
        ...req.body,
        postId: postId,
    };
    try {
        const reply = await PrismaClient.reply.create({
            data: data,
        });
        console.log('Reply created');
    } catch (error) {
        console.error(`Unable to create a new reply ${data}: ${error}`);
        res.sendStatus(400);
        return;
    }
    res.sendStatus(200);
});

export default router;
