import axios from 'axios';

// Allow using the runtime backend URL injected in public/config.js
declare global {
    interface Window {
        __BACKEND_URL__?: string;
    }
}

// Get backend URL - prefer Vite env var, then window.__BACKEND_URL__, 
// otherwise default to direct backend URL for development
function getBackendUrl(): string {
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }
    
    if (typeof window !== 'undefined' && window.__BACKEND_URL__) {
        return window.__BACKEND_URL__;
    }
    
    // Fallback: direct backend URL (backend runs on 3001)
    return 'http://localhost:3001';
}

const backendUrl = getBackendUrl();
console.log('Axios baseURL set to:', backendUrl);

const apiClient = axios.create({
    baseURL: backendUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 second timeout
});

export default apiClient;
