import app from '../app';
import http from 'http';
import { AddressInfo } from 'net';
import { createHttpTerminator } from 'http-terminator';

/**
 * Server startup and database connection initialization.
 *
 * This file:
 * - Establishes database connection via Prisma client
 * - Configures the HTTP server port
 * - Creates and starts the HTTP server
 * - Sets up graceful shutdown handlers
 */

// Attempt database connection before starting server
console.info('Connecting to database...');
try {
    // Importing prisma-client.ts automatically establishes the database connection
    require('./prisma-client');
    console.log('Successfully connected to the database');
} catch (error) {
    console.error(`Unable to establish database connection:\n  ${error}`);
    process.exit(1);
}

/**
 * Determine the port to listen on.
 *
 * Priority:
 * 1. BACKEND_PORT environment variable (this monorepo convention)
 * 2. PORT environment variable (common hosting default, e.g., Render)
 * 3. 3001 (local development fallback)
 */
const port: string = process.env.BACKEND_PORT ?? process.env.PORT ?? '3001';

// Warn if using default port (helps catch configuration issues)
if (process.env.BACKEND_PORT === undefined && process.env.PORT === undefined) {
    console.warn('BACKEND_PORT/PORT not set; defaulting backend port to 3001');
}

app.set('port', port);

// Create HTTP server instance
console.info('Starting server...');
const server: http.Server = http.createServer(app);

export default server;

/**
 * Graceful shutdown handlers.
 *
 * Listens for various termination signals and ensures the server
 * shuts down cleanly, closing all connections before exiting.
 */
const httpTerminator = createHttpTerminator({ server });

const shutdown = async (signal: string) => {
    console.log(`Received ${signal}, shutting down gracefully...`);
    await httpTerminator.terminate();
    process.exit(0);
};

// Register shutdown handlers for various termination signals
[
    'SIGHUP',
    'SIGINT',
    'SIGQUIT',
    'SIGILL',
    'SIGTRAP',
    'SIGABRT',
    'SIGBUS',
    'SIGFPE',
    'SIGUSR1',
    'SIGSEGV',
    'SIGUSR2',
    'SIGTERM',
].forEach((signal) => {
    process.on(signal as NodeJS.Signals, () => shutdown(signal));
});

/**
 * Error handler for server errors (e.g., port already in use).
 *
 * @param {NodeJS.ErrnoException} error - The error object
 */
function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind: string = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(`Failed to start: ${bind} requires elevated permissions!`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`Failed to start: ${bind} is already in use`);
            process.exit(1);
            break;
        default:
            console.error(`Failed to start: Unknown binding error:\n    ${error}`);
            process.exit(1);
    }
}

/**
 * Success handler - logs when server starts listening.
 */
function onListening(): void {
    const addr: string | AddressInfo | null = server.address();
    const bind: string =
        typeof addr === 'string' ? 'pipe ' + addr : 'port ' + (addr?.port ?? 'unknown');
    console.log(`Server listening on ${bind}`);
}

server.on('error', onError);
server.on('listening', onListening);

// Start the server
server.listen(port);
