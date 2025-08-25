import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import keycloak from './keycloak';

let keycloakInitialized = false; // prevents double init in StrictMode

const Root = () => {
    const [keycloakReady, setKeycloakReady] = useState(false);

    useEffect(() => {
        if (!keycloakInitialized) {
            keycloak.init({ onLoad: 'login-required', checkLoginIframe: false })
                .then(authenticated => {
                    if (authenticated) setKeycloakReady(true);
                    else keycloak.login();
                });
            keycloakInitialized = true;
        }
    }, []);

    if (!keycloakReady) return <div>Loading...</div>;

    return <App keycloak={keycloak} />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // Remove StrictMode in dev to avoid double init errors
    <Root />
);

reportWebVitals();
