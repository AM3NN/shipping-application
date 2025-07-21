import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    const start = <span className="text-lg font-bold text-primary navbar-title">Shipping App 🚚</span>;

    const end = (
        <div className="flex align-items-center gap-2">
            <Button icon="pi pi-home" className="p-button-text p-button-sm nav-button" onClick={() => navigate('/')} label="Home" />
            <Button icon="pi pi-plus" className="p-button-text p-button-sm nav-button" onClick={() => navigate('/order-form')} label="New Order" />
            <Button icon="pi pi-box" className="p-button-text p-button-sm nav-button" onClick={() => navigate('/orders')} label="Orders" />
            <Button icon="pi pi-cog" className="p-button-text p-button-sm nav-button" onClick={() => navigate('/settings')} label="Settings" />
        </div>
    );

    return (
        <Menubar start={start} end={end} className="shadow-sm border-round" style={{ border: '1px solid #e0e0e0' }} />
    );
};

export default Navbar;
