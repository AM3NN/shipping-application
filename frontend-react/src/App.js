import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderForm from './components/OrderForm';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import Home from './components/Home';
import OrdersList from './components/OrdersList';
import ReportsPage from './components/ReportsPage';
import 'leaflet/dist/leaflet.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
function App() {
    return (
        <Router>
            <Navbar />
            <div style={{ padding: '2rem' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/order-form" element={<OrderForm />} />
                    <Route path="/orders" element={<OrdersList />} />
                    <Route path="/orders/edit/:id" element={<OrderForm />} />

                    <Route path="/reports" element={<ReportsPage />} />

                </Routes>
            </div>
        </Router>
    );
}

export default App;
