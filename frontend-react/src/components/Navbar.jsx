import React, { useContext } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import '../styles/Navbar.css';

const Navbar = ({ keycloak }) => {
    const navigate = useNavigate();
    const { firstName } = useContext(UserContext);

    const username = firstName || keycloak?.tokenParsed?.preferred_username || 'User';

    const start = (
        <span className="text-lg font-bold text-primary navbar-title">
            Shipping App 🚚
        </span>
    );

    const end = (
        <div className="flex align-items-center gap-3">
            <div className="flex align-items-center gap-2 pr-3">
                <Avatar shape="circle" className="bg-primary text-white">
                    <i className="pi pi-user"></i>
                </Avatar>
                <span className="font-semibold">{username}</span>
            </div>

            {/* Navigation buttons */}
            <Button icon="pi pi-home" className="p-button-text p-button-sm nav-button" onClick={() => navigate('/')} label="Home" />
            <Button icon="pi pi-plus" className="p-button-text p-button-sm nav-button" onClick={() => navigate('/order-form')} label="New Order" />
            <Button icon="pi pi-box" className="p-button-text p-button-sm nav-button" onClick={() => navigate('/orders')} label="Orders" />
            <Button icon="pi pi-upload" className="p-button-text p-button-sm nav-button" onClick={() => navigate('/scrape')} label="Scrape Orders" />
            <Button icon="pi pi-exclamation-circle" className="p-button-text p-button-sm nav-button" onClick={() => navigate('/invalid-orders')} label="Invalid Orders" />
            <Button icon="pi pi-cog" className="p-button-text p-button-sm nav-button" onClick={() => navigate('/settings')} label="Settings" />
            <Button icon="pi pi-sign-out" className="p-button-text p-button-sm nav-button" onClick={() => keycloak.logout({ redirectUri: window.location.origin })} label="Logout" />
        </div>
    );

    return (
        <Menubar
            start={start}
            end={end}
            className="shadow-sm border-round"
            style={{ border: '1px solid #e0e0e0' }}
        />
    );
};

export default Navbar;
