import express, { Router, Request, Response } from 'express';
import PrismaClient from '../bin/prisma-client';
import { Prisma } from 'database';

const router: Router = express.Router();

/**
 * GET /api/forum/posts
 *
 * Fetches all forum posts with their associated poster and replies.
 *
 * Returns a JSON array of posts, each containing:
 * - Post information (id, title, content, email, timestamps)
 * - Poster information (employee details)
 * - Replies array with replier information
 *
 * @returns {Promise<void>} Sends JSON response with all posts or 204 if none found
 */
router.get('/posts', async function (req: Request, res: Response) {
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

    if (posts == null) {
        console.error('No posts found in database!');
        res.sendStatus(204);
    } else {
        console.log(posts);
        res.json(posts);
    }
});

/**
 * GET /api/forum/newest
 *
 * Fetches all forum posts ordered by creation date (newest first).
 *
 * This is the primary endpoint used by the frontend to display the forum.
 * Posts are returned with full poster and reply information.
 *
 * @returns {Promise<void>} Sends JSON response with posts ordered by newest first
 */
router.get('/newest', async function (req: Request, res: Response) {
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

    console.log(`Found ${posts.length} posts`);
    res.json(posts);
});

/**
 * GET /api/forum/post/:pid
 *
 * Fetches a single forum post by its ID.
 *
 * @param {string} pid - The post ID from the URL parameter
 * @returns {Promise<void>} Sends JSON response with the post or 204 if not found
 */
router.get('/post/:pid', async function (req: Request, res: Response) {
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

    if (posts == null) {
        console.error('No posts found in database!');
        res.sendStatus(204);
    } else {
        console.log(posts);
        res.json(posts);
    }
});

/**
 * GET /api/forum/post
 *
 * Fetches all forum posts (same as /posts endpoint).
 *
 * @returns {Promise<void>} Sends JSON response with all posts or 204 if none found
 */
router.get('/post', async function (req: Request, res: Response) {
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

    if (posts == null) {
        console.error('No posts found in database!');
        res.sendStatus(204);
    } else {
        console.log(posts);
        res.json(posts);
    }
});

/**
 * GET /api/forum/replies
 *
 * Fetches all replies from the database.
 *
 * @returns {Promise<void>} Sends JSON response with all replies or 204 if none found
 */
router.get('/replies', async function (req: Request, res: Response) {
    const replies = await PrismaClient.reply.findMany();

    if (replies == null) {
        console.error('No replies found in database!');
        res.sendStatus(204);
    } else {
        console.log(replies);
        res.json(replies);
    }
});

/**
 * POST /api/forum/post
 *
 * Creates a new forum post in the database.
 *
 * For demo purposes, this endpoint automatically creates a demo employee
 * if one doesn't exist for the provided email. This allows posting without
 * requiring full employee registration.
 *
 * @param {string} req.body.title - Post title (required)
 * @param {string} req.body.content - Post content (required)
 * @param {string} req.body.email - Poster email (required)
 * @param {number} req.body.posterId - Optional poster employee ID
 * @returns {Promise<void>} Sends 200 with success message or 400 on error
 */
router.post('/post', async function (req: Request, res: Response) {
    const { title, content, email, posterId } = req.body;

    // Validate required fields
    if (!title || !content || !email) {
        res.status(400).json({ error: 'Missing required fields: title, content, email' });
        return;
    }

    let employeeId: number;

    // Use provided poster ID if available
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

    // Create the post
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

/**
 * POST /api/forum/reply/:id
 *
 * Creates a new reply to a forum post.
 *
 * @param {string} id - The post ID to reply to (from URL parameter)
 * @param {object} req.body - Reply data (content, email, replierId, etc.)
 * @returns {Promise<void>} Sends 200 status on success, 400 on error
 */
router.post('/reply/:id', async function (req: Request, res: Response) {
    const postId = Number(req.params.id);
    const data: Prisma.ReplyCreateInput = {
        ...req.body,
        postId: postId,
    };

    try {
        const reply = await PrismaClient.reply.create({
            data: data,
        });
        console.log('Reply created');
        res.sendStatus(200);
    } catch (error) {
        console.error(`Unable to create a new reply ${data}: ${error}`);
        res.sendStatus(400);
    }
});

export default router;
