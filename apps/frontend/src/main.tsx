import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.tsx';
import './styles/styles.css';

// Get Auth0 configuration from environment variables
// In development, these should be in .env file as VITE_AUTH0_DOMAIN and VITE_AUTH0_CLIENT_ID
// In production, set these in Vercel environment variables
const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN || "dev-b5d68fi8od5s513y.us.auth0.com";
const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID || "jepCXrJUcBq34pKdSGGzd2sidUxVpnsL";

// Entry point where root component is rendered into the DOM
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Auth0Provider
        domain={auth0Domain}
        clientId={auth0ClientId}
        authorizationParams={{
            redirect_uri: window.location.origin + '/directory',
            // Request user roles in the token
            audience: `https://${auth0Domain}/api/v2/`,
            scope: 'openid profile email read:current_user'
        }}
        // Enable getting user roles
        useRefreshTokens={true}
        cacheLocation="localstorage"
    >
        <App />
    </Auth0Provider>
);
