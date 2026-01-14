import axios from 'axios';

/**
 * Global type declaration for runtime backend URL injection.
 * Allows the backend URL to be set via public/config.js at runtime.
 */
declare global {
    interface Window {
        __BACKEND_URL__?: string;
    }
}

/**
 * Determines the backend URL to use for API requests.
 * 
 * Priority order:
 * 1. VITE_API_URL environment variable (production)
 * 2. window.__BACKEND_URL__ (runtime configuration)
 * 3. http://localhost:3001 (development fallback)
 * 
 * @returns {string} The backend URL to use for API requests
 */
function getBackendUrl(): string {
    // Production: use explicit API URL from environment variable
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }
    
    // Runtime configuration: use URL injected via public/config.js
    if (typeof window !== 'undefined' && window.__BACKEND_URL__) {
        return window.__BACKEND_URL__;
    }
    
    // Development: use direct backend URL (backend runs on port 3001)
    // This ensures fast, reliable connections without proxy overhead
    return 'http://localhost:3001';
}

const backendUrl = getBackendUrl();
console.log('Axios baseURL set to:', backendUrl);

/**
 * Configured Axios instance for making API requests to the backend.
 * 
 * Configuration:
 * - baseURL: Dynamically determined based on environment
 * - headers: JSON content type for all requests
 * - timeout: 10 second timeout to prevent hanging requests
 */
const apiClient = axios.create({
    baseURL: backendUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 second timeout
});

export default apiClient;
