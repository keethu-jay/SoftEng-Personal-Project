import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';
import tailwindcss from '@tailwindcss/vite';
import * as process from 'process';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        preserveSymlinks: true,
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        host: 'localhost',
        // Allow running without a .env file by falling back to Vite's default port.
        port: Number.parseInt(process.env.FRONTEND_PORT ?? '5173', 10),
        proxy: {
            // Proxy API calls in dev so relative `/api/...` requests work.
            // BACKEND_URL is preferred; otherwise build it from BACKEND_PORT or default 3001.
            '/api': {
                target:
                    process.env.BACKEND_URL ??
                    `http://localhost:${process.env.BACKEND_PORT ?? process.env.PORT ?? '3001'}`,
                changeOrigin: true,
                secure: false,
            },
        },
        watch: {
            usePolling: true,
        },
    },
    build: {
        outDir: 'build',
    },
    cacheDir: '.vite',
    plugins: [
        tailwindcss(),
        react(),
        eslint({
            exclude: ['**/node_modules/**', '**/.*/**', '**/.vite/**'],
            failOnWarning: false,
            failOnError: false,
        }),
    ],

});
