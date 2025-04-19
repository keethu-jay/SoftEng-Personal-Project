import { defineConfig } from 'vitest/config';

export default defineConfig({
    resolve: {
        preserveSymlinks: true,
    },
    server: {
        watch: {
            usePolling: true,
        },
    },
    test: {
        environment: 'node',
        include: ['src/**/*.test.ts'],
    },
});
