import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/OrderUploadPage.css';

const OrderUploadPage = ({ keycloak, onScrapeComplete }) => {
    const [scraping, setScraping] = useState(false);
    const toast = useRef(null);

    const handleScrape = async () => {
        if (!keycloak.authenticated) {
            toast.current.show({
                severity: 'error',
                summary: 'Authentication Required',
                detail: 'Please log in to scrape orders.',
                life: 3000
            });
            return;
        }

        setScraping(true);
        try {
            const token = await keycloak.updateToken(10);
            const response = await axios.post(
                'http://localhost:8069/orders/scrape',
                {},
                { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
            );

            toast.current.show({
                severity: 'success',
                summary: 'Scrape Successful',
                detail: 'Orders scraped and saved successfully.',
                life: 3000
            });

            if (onScrapeComplete) onScrapeComplete();
        } catch (error) {
            console.error('Scrape error:', error);
            const errorMessage = error.response?.data || error.message;
            toast.current.show({
                severity: 'error',
                summary: 'Scrape Failed',
                detail: `Error scraping orders: ${errorMessage}`,
                life: 5000
            });
        } finally {
            setScraping(false);
        }
    };

    // Trigger scrape every 1 minute automatically
    useEffect(() => {
        if (keycloak.authenticated) {
            const interval = setInterval(() => {
                toast.current.show({
                    severity: 'info',
                    summary: 'Starting Scrape',
                    detail: 'Scraping orders automatically...',
                    life: 3000
                });
                handleScrape();
            }, 60 * 1000);
            return () => clearInterval(interval);
        }
    }, [keycloak.authenticated]);

    return (
        <div className="order-upload-page p-4">
            <Toast ref={toast} />
            <h2 className="text-2xl font-bold mb-4">Scrape Orders</h2>
            <div className="flex justify-between mb-4">
                <Button
                    label="Scrape Orders"
                    icon="pi pi-cloud-download"
                    className="p-button-success"
                    onClick={handleScrape}
                    disabled={scraping || !keycloak.authenticated}
                    tooltip={keycloak.authenticated ? 'Scrape orders from the configured source' : 'Please log in to scrape orders'}
                    tooltipOptions={{ position: 'top' }}
                />
                <Link to="/orders" className="p-button p-button-secondary">
                    View My Orders
                </Link>
            </div>
            {scraping && (
                <div className="flex justify-center mt-4">
                    <ProgressSpinner />
                </div>
            )}
        </div>
    );
};

export default OrderUploadPage;
