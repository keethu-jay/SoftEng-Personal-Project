import createError, { HttpError } from 'http-errors';
import express, { Express, NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

// Route imports
import healthcheckRouter from './routes/healthcheck';
import employeeRouter from './routes/employee.ts';
import assignedRouter from './routes/assigned.ts';
import servicereqsRouter from './routes/servicereqs.ts';
import directoryRouter from './routes/directory.ts';
import pathfindRouter from './routes/pathfind.ts';
import pathfindingRouter from './routes/pathfinding.ts';
import forumRouter from './routes/forum.ts';

import { API_ROUTES } from 'common/src/constants';

/**
 * Express application setup and configuration.
 *
 * This file configures the Express server with:
 * - CORS middleware for cross-origin requests
 * - Request logging with Morgan
 * - JSON and URL-encoded body parsing
 * - Cookie parsing
 * - API route registration
 * - Error handling middleware
 */
const app: Express = express();

// Enable CORS for all routes (allows frontend to make requests from different origin)
// Configure CORS to allow requests from Vercel frontend and localhost for development
app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            
            // Allow localhost for development
            if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
                return callback(null, true);
            }
            
            // Allow Vercel deployments (any *.vercel.app domain)
            if (origin.includes('.vercel.app')) {
                return callback(null, true);
            }
            
            // Allow any origin in development, restrict in production if needed
            callback(null, true);
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

// HTTP request logging middleware
// Logs all incoming requests in development format
app.use(
    logger('dev', {
        stream: {
            // Output logs to console for remote debugging
            write: (msg) => console.info(msg),
        },
    })
);

// Parse incoming request bodies as JSON
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: false }));

// Parse cookies from request headers
app.use(cookieParser());

/**
 * Register API route handlers.
 *
 * IMPORTANT: All routers must use /api as a prefix (defined in API_ROUTES)
 * to work with the default proxy and production setup.
 */
app.use(API_ROUTES.HEALTHCHECK, healthcheckRouter);
app.use(API_ROUTES.EMPLOYEE, employeeRouter);
app.use(API_ROUTES.SERVICEREQS, servicereqsRouter);
app.use(API_ROUTES.ASSIGNED, assignedRouter);
app.use(API_ROUTES.DEPARTMENT, directoryRouter);
app.use(API_ROUTES.PATHFIND, pathfindRouter);
app.use(API_ROUTES.PATHFINDING, pathfindingRouter);
app.use(API_ROUTES.FORUM, forumRouter);

/**
 * 404 Error Handler
 *
 * Catches all requests that don't match any registered routes
 * and forwards them to the generic error handler.
 */
app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError(404));
});

/**
 * Generic Error Handler
 *
 * Handles all errors thrown by route handlers or middleware.
 * Returns appropriate HTTP status codes and error messages.
 *
 * @param {HttpError} err - The error object
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
app.use((err: HttpError, req: Request, res: Response) => {
    res.statusMessage = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Send error response with status code and message
    res.status(err.status || 500).json({
        error: err.message,
        status: err.status || 500,
    });
});

export default app;
