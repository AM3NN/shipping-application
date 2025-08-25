import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderForm from './components/OrderForm';
import OrderUploadPage from './components/OrderUploadPage';
import InvalidOrdersList from './components/InvalidOrdersList';
import Home from './components/Home';
import OrdersList from './components/OrdersList';
import ReportsPage from './components/ReportsPage';
import Settings from './components/Settings';

import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'leaflet/dist/leaflet.css';

import { UserContext } from './components/UserContext';

function App({ keycloak }) {
    const [firstName, setFirstName] = useState(keycloak?.tokenParsed?.given_name || '');

    return (
        <UserContext.Provider value={{ firstName, setFirstName }}>
            <Router>
                <Navbar keycloak={keycloak} />
                <div style={{ padding: '2rem' }}>
                    <Routes>
                        <Route path="/" element={<Home keycloak={keycloak} />} />
                        <Route path="/order-form" element={<OrderForm keycloak={keycloak} />} />
                        <Route path="/orders" element={<OrdersList keycloak={keycloak} />} />
                        <Route path="/orders/edit/:id" element={<OrderForm keycloak={keycloak} />} />
                        <Route path="/scrape" element={<OrderUploadPage keycloak={keycloak} />} />
                        <Route path="/invalid-orders" element={<InvalidOrdersList keycloak={keycloak} />} />
                        <Route path="/reports" element={<ReportsPage keycloak={keycloak} />} />
                        <Route path="/settings" element={<Settings keycloak={keycloak} />} />
                    </Routes>
                </div>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
