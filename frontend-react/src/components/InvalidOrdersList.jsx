import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/OrderUploadPage.css';

const InvalidOrdersList = ({ keycloak }) => {
    const [invalidOrders, setInvalidOrders] = useState([]);
    const [loadingInvalid, setLoadingInvalid] = useState(true);
    const toast = useRef(null);

    const toCamelCase = (obj) => {
        const camelCaseObj = {};
        const snakeToCamel = (str) =>
            str.replace(/(_\w)/g, (m) => m[1].toUpperCase());

        Object.keys(obj).forEach((key) => {
            camelCaseObj[snakeToCamel(key)] = obj[key];
        });
        return camelCaseObj;
    };

    const formatDateTime = (dateTime) => {
        if (!dateTime) return '';
        try {
            return new Date(dateTime).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        } catch (e) {
            return dateTime;
        }
    };

    useEffect(() => {
        if (keycloak.authenticated) {
            const fetchInvalidOrders = async () => {
                setLoadingInvalid(true);
                try {
                    const token = await keycloak.updateToken(10);
                    const { data } = await axios.get('http://localhost:8069/orders/invalid', {
                        params: { page: 0, size: 100 },
                        headers: { Authorization: `Bearer ${token}` },
                        withCredentials: true
                    });
                    const normalized = Array.isArray(data) ? data : data.content ?? [];
                    setInvalidOrders(normalized.map(toCamelCase));
                } catch (error) {
                    console.error('Fetch invalid orders error:', JSON.stringify(error, null, 2));
                    toast.current.show({
                        severity: 'error',
                        summary: 'Fetch Failed',
                        detail: `Error fetching invalid orders: ${error.response?.data || error.message}`,
                        life: 5000
                    });
                } finally {
                    setLoadingInvalid(false);
                }
            };
            fetchInvalidOrders();
        }
    }, [keycloak.authenticated]);


    const downloadInvalidOrdersCSV = () => {
        if (!invalidOrders || invalidOrders.length === 0) {
            toast.current.show({
                severity: 'warn',
                summary: 'No Data',
                detail: 'No invalid orders available to download.',
                life: 3000
            });
            return;
        }

        const fields = Array.from(
            new Set(invalidOrders.flatMap(order => Object.keys(order)))
        );

        const headers = fields.join(',');
        const rows = invalidOrders.map(order =>
            fields.map(field => {
                const value = order[field] ?? '';
                return `"${String(value).replace(/"/g, '""').replace(/\n/g, ' ')}"`;
            }).join(',')
        );

        const csv = [headers, ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', `invalid-orders-${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const downloadInvalidOrdersJSON = () => {
        if (!invalidOrders || invalidOrders.length === 0) {
            toast.current.show({
                severity: 'warn',
                summary: 'No Data',
                detail: 'No invalid orders available to download.',
                life: 3000
            });
            return;
        }

        const blob = new Blob([JSON.stringify(invalidOrders, null, 2)], {
            type: 'application/json'
        });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', `invalid-orders-${new Date().toISOString().split('T')[0]}.json`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const errorsTemplate = (rowData) => (
        <div style={{ maxWidth: '400px', whiteSpace: 'normal', wordBreak: 'break-word' }}>
            {Array.isArray(rowData.errors) ? rowData.errors.join('; ') : rowData.errors}
        </div>
    );

    const originalRowTemplate = (rowData) => (
        <div style={{ maxWidth: '400px', whiteSpace: 'normal', wordBreak: 'break-word' }}>
            {rowData.originalRow}
        </div>
    );

    const dateTimeTemplate = (rowData, column) => formatDateTime(rowData[column.field]);

    return (
        <div className="card">
            <Toast ref={toast} />
            <h2>Invalid Orders</h2>
            <div className="flex justify-content-between mb-4">
                <Link to="/orders" className="p-button p-button-secondary">
                    Back to My Orders
                </Link>
                <div className="flex gap-2">
                    <Button
                        label="Download CSV"
                        icon="pi pi-download"
                        className="p-button-secondary"
                        onClick={downloadInvalidOrdersCSV}
                        disabled={loadingInvalid}
                    />
                    <Button
                        label="Download JSON"
                        icon="pi pi-file"
                        className="p-button-info"
                        onClick={downloadInvalidOrdersJSON}
                        disabled={loadingInvalid}
                    />
                </div>
            </div>

            {loadingInvalid ? (
                <div className="flex justify-content-center">
                    <ProgressSpinner />
                </div>
            ) : invalidOrders.length > 0 ? (
                <DataTable
                    value={invalidOrders}
                    paginator
                    rows={10}
                    rowsPerPageOptions={[10, 25, 50]}
                    responsiveLayout="scroll"
                    stripedRows
                    emptyMessage="No invalid orders found"
                >
                    <Column field="orderId" header="Order ID" sortable style={{ minWidth: '120px' }} />
                    <Column
                        field="originalRow"
                        header="Original Row"
                        body={originalRowTemplate}
                        style={{ minWidth: '400px', whiteSpace: 'normal', wordBreak: 'break-word' }}
                    />
                    <Column
                        body={errorsTemplate}
                        header="Errors"
                        style={{ minWidth: '400px', whiteSpace: 'normal', wordBreak: 'break-word' }}
                    />
                    <Column
                        field="rejectedAt"
                        header="Rejected At"
                        body={dateTimeTemplate}
                        sortable
                        style={{ minWidth: '180px' }}
                    />
                </DataTable>
            ) : (
                <p>No invalid orders found.</p>
            )}
        </div>
    );
};

InvalidOrdersList.propTypes = {
    keycloak: PropTypes.shape({
        token: PropTypes.string.isRequired,
        tokenParsed: PropTypes.object,
        updateToken: PropTypes.func.isRequired,
        logout: PropTypes.func.isRequired,
    }).isRequired,
};

export default InvalidOrdersList;
