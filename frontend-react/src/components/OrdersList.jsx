import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';

const OrdersList = forwardRef(({ keycloak }, ref) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editOrder, setEditOrder] = useState(null);
    const [editDialogVisible, setEditDialogVisible] = useState(false);

    useEffect(() => {
        const refreshInterval = setInterval(() => {
            keycloak.updateToken(30).catch(() => keycloak.logout());
        }, 60000);
        return () => clearInterval(refreshInterval);
    }, [keycloak]);

    useEffect(() => {
        fetchOrders();
    }, []);

    useImperativeHandle(ref, () => ({
        refreshOrders: () => fetchOrders()
    }));

    const getToken = async () => {
        const refreshed = await keycloak.updateToken(10);
        if (refreshed) console.log('Token was refreshed');
        return keycloak.token;
    };

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const token = await getToken();
            const { data } = await axios.get('http://localhost:8081/orders/my-orders', {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });

            const normalized = Array.isArray(data) ? data : data.content ?? [];

            const ordersWithInvoiceStatus = await Promise.all(
                normalized.map(async (order) => {
                    try {
                        const res = await axios.get(
                            `http://localhost:8085/billing/invoices/${order.id}`,
                            { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
                        );
                        return { ...order, invoiceGenerated: res.status === 200 };
                    } catch {
                        return { ...order, invoiceGenerated: false };
                    }
                })
            );

            setOrders(ordersWithInvoiceStatus);
        } catch (error) {
            console.error('Error fetching orders:', error);
            alert('Failed to load orders. Please check your network or login.');
        } finally {
            setLoading(false);
        }
    };

    const generateInvoice = async (orderId) => {
        try {
            const token = await getToken();
            await axios.post(
                `http://localhost:8085/billing/invoices/${orderId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
            );
            alert('Invoice successfully generated.');
            fetchOrders();
        } catch (err) {
            console.error('Error generating invoice:', err);
            alert('Failed to generate invoice.');
        }
    };

    const downloadInvoice = async (orderId) => {
        try {
            const token = await getToken();
            const response = await axios.get(
                `http://localhost:8085/billing/invoices/${orderId}/download`,
                { responseType: 'blob', headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
            );
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
            alert(
                error.response?.status === 404
                    ? 'Invoice not found. Please generate it first.'
                    : 'Failed to download invoice.'
            );
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this order?')) return;
        try {
            const token = await getToken();
            await axios.delete(`http://localhost:8081/orders/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            fetchOrders();
        } catch (err) {
            console.error('Error deleting order:', err);
            alert('Failed to delete order.');
        }
    };

    const handleEdit = (order) => {
        setEditOrder({ ...order });
        setEditDialogVisible(true);
    };

    const handleSaveEdit = async () => {
        try {
            const token = await getToken();
            await axios.put(`http://localhost:8081/orders/${editOrder.id}`, editOrder, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            setEditDialogVisible(false);
            fetchOrders();
            alert('Order updated successfully.');
        } catch (err) {
            console.error('Error updating order:', err);
            alert('Failed to update order.');
        }
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
                onClick={() => handleEdit(rowData)}
                tooltip="Edit"
            />
            <Button
                icon="pi pi-file-pdf"
                className="p-button-sm p-button-rounded p-button-success"
                onClick={() => generateInvoice(rowData.id)}
                tooltip={rowData.invoiceGenerated ? 'Invoice already generated' : 'Generate Invoice'}
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
            <h2>My Orders</h2>
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
                    <Column header="Actions" body={actionBody} style={{ width: '160px' }} />
                    <Column field="invoiceGenerated" header="Invoice" body={invoiceBodyTemplate} />
                </DataTable>
            )}

            {/* Edit Modal */}
            <Dialog
                header="Edit Order"
                visible={editDialogVisible}
                style={{ width: '400px' }}
                modal
                onHide={() => setEditDialogVisible(false)}
            >
                {editOrder && (
                    <div className="p-fluid">
                        <div className="field">
                            <label htmlFor="deliveryLocation">Delivery Location</label>
                            <InputText
                                id="deliveryLocation"
                                value={editOrder.deliveryLocation}
                                onChange={(e) =>
                                    setEditOrder({ ...editOrder, deliveryLocation: e.target.value })
                                }
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="expectedDate">Expected Date</label>
                            <InputText
                                id="expectedDate"
                                value={editOrder.expectedDate}
                                onChange={(e) =>
                                    setEditOrder({ ...editOrder, expectedDate: e.target.value })
                                }
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="quantity">Quantity</label>
                            <InputText
                                id="quantity"
                                type="number"
                                value={editOrder.quantity}
                                onChange={(e) => {
                                    const newQuantity = Number(e.target.value) || 0;
                                    setEditOrder({
                                        ...editOrder,
                                        quantity: newQuantity,
                                        totalAmount: newQuantity * (editOrder.predictedPrice || 0)
                                    });
                                }}
                            />
                        </div>

                        <Button label="Save" onClick={handleSaveEdit} className="mt-3" />
                    </div>
                )}
            </Dialog>
        </div>
    );
});

OrdersList.propTypes = {
    keycloak: PropTypes.shape({
        token: PropTypes.string.isRequired,
        tokenParsed: PropTypes.object,
        updateToken: PropTypes.func.isRequired,
        logout: PropTypes.func.isRequired,
    }).isRequired,
};

export default OrdersList;
