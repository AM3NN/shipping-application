import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { ProgressSpinner } from 'primereact/progressspinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function OrdersList() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            console.log('Fetching orders...');
            const { data } = await axios.get('http://localhost:8081/orders');
            const normalized = Array.isArray(data) ? data : data.content ?? [];

            const ordersWithInvoiceStatus = await Promise.all(
                normalized.map(async (order) => {
                    try {
                        const res = await axios.get(`http://localhost:8085/billing/invoices/${order.id}`);
                        return { ...order, invoiceGenerated: res.status === 200 };
                    } catch (e) {
                        return { ...order, invoiceGenerated: false };
                    }
                })
            );

            setOrders(ordersWithInvoiceStatus);
            console.log('Orders fetched and updated with invoice status');
        } catch (error) {
            console.error('Error fetching orders:', error);
            alert('Failed to load orders.');
        } finally {
            setLoading(false);
        }
    };

    const generateInvoice = async (orderId) => {
        try {
            console.log(`Generating invoice for orderId: ${orderId}`);
            const response = await axios.post(`http://localhost:8085/billing/invoices/${orderId}`);
            console.log('Invoice generated:', response.data);
            alert('Invoice successfully generated.');

            setOrders((prev) =>
                prev.map((o) =>
                    o.id === orderId ? { ...o, invoiceGenerated: true } : o
                )
            );
        } catch (err) {
            console.error('Error generating invoice:', err);
            if (err.response) {
                alert(`Failed to generate invoice: ${err.response.status} - ${err.response.data?.message || err.message}`);
            } else if (err.request) {
                alert('Network error: No response from server.');
            } else {
                alert(`Error: ${err.message}`);
            }
        }
    };

    const downloadInvoice = async (orderId) => {
        try {
            console.log(`Downloading invoice for orderId: ${orderId}`);
            const response = await axios.get(`http://localhost:8085/billing/invoices/${orderId}/download`, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `invoice_${orderId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();

            alert('Invoice downloaded.');
        } catch (error) {
            console.error('Error downloading invoice:', error);
            if (error.response?.status === 404) {
                alert('Invoice not found. Please generate it first.');
            } else {
                alert('Failed to download invoice.');
            }
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this order?')) return;

        try {
            console.log(`Deleting order id: ${id}`);
            await axios.delete(`http://localhost:8081/orders/${id}`);
            await fetchOrders();
        } catch (err) {
            console.error('Error deleting order:', err);
            alert('Failed to delete order.');
        }
    };

    const handleEdit = (id) => {
        navigate(`/orders/edit/${id}`);
    };

    const statusBody = (rowData) => (
        <Tag severity={rowData.status === 'NEW' ? 'info' : 'success'} value={rowData.status} />
    );

    const invoiceBodyTemplate = (rowData) => (
        <Button
            label="Download"
            icon="pi pi-download"
            disabled={!rowData.invoiceGenerated}
            onClick={() => downloadInvoice(rowData.id)}
        />
    );

    const actionBody = (rowData) => (
        <div className="flex gap-2">
            <Button
                icon="pi pi-pencil"
                className="p-button-sm p-button-rounded p-button-warning"
                onClick={() => handleEdit(rowData.id)}
                tooltip="Edit"
            />
            <Button
                icon="pi pi-file-pdf"
                className="p-button-sm p-button-rounded p-button-success"
                onClick={() => generateInvoice(rowData.id)}
                tooltip={rowData.invoiceGenerated ? "Invoice already generated" : "Generate Invoice"}
                disabled={rowData.invoiceGenerated}
            />
            <Button
                icon="pi pi-trash"
                className="p-button-sm p-button-rounded p-button-danger"
                onClick={() => handleDelete(rowData.id)}
                tooltip="Delete"
            />
        </div>
    );

    return (
        <div className="card">
            <h2>All Orders</h2>
            {loading ? (
                <div className="flex justify-content-center">
                    <ProgressSpinner />
                </div>
            ) : (
                <DataTable
                    value={orders}
                    dataKey="id"
                    paginator
                    rows={10}
                    responsiveLayout="scroll"
                    stripedRows
                    emptyMessage="No orders found"
                >
                    <Column field="status" header="Status" body={statusBody} sortable />
                    <Column field="deliveryLocation" header="Delivery Location" sortable />
                    <Column field="expectedDate" header="Expected Date" sortable />
                    <Column field="quantity" header="Quantity" />
                    <Column field="predictedPrice" header="Predicted Price" />
                    <Column field="totalAmount" header="Total Amount" />
                    <Column header="Actions" body={actionBody} style={{ width: '140px' }} />
                    <Column field="invoiceGenerated" header="Invoice" body={invoiceBodyTemplate} />
                </DataTable>
            )}
        </div>
    );
}
