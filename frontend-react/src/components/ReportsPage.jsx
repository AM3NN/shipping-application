// @ts-ignore
import React, { useState } from 'react';
import { Button } from 'primereact/button';
import axios from 'axios';

export default function ReportsPage() {
    const [loading, setLoading] = useState(false);

    const exportCsv = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8085/billing/reports/csv', {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'invoices.csv');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error('Error exporting CSV:', err);
            alert('Failed to export CSV.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <h2>Billing Reports</h2>
            <Button
                label={loading ? 'Exporting...' : 'Export Invoices to CSV'}
                icon="pi pi-file-o"
                onClick={exportCsv}
                disabled={loading}
            />
            {loading && <span className="ml-2">⏳</span>}
        </div>
    );
}