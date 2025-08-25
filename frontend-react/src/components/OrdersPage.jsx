import React, { useRef } from 'react';
import OrderUploadPage from './OrderUploadPage';
import OrdersList from './OrdersList';

export default function OrdersPage({ keycloak }) {
    const ordersListRef = useRef();

    const handleScrapeComplete = () => {
        if (ordersListRef.current) {
            ordersListRef.current.refreshOrders();
        }
    };

    return (
        <div>
            <OrderUploadPage keycloak={keycloak} onScrapeComplete={handleScrapeComplete} />
            <OrdersList keycloak={keycloak} ref={ordersListRef} />
        </div>
    );
}
