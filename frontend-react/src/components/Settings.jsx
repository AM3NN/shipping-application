import React, { useState, useRef, useContext } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { UserContext } from '../components/UserContext';

const Settings = ({ keycloak }) => {
    const { firstName, setFirstName } = useContext(UserContext);
    const [lastName, setLastName] = useState(keycloak?.tokenParsed?.family_name || '');
    const [email, setEmail] = useState(keycloak?.tokenParsed?.email || '');
    const [password, setPassword] = useState('');
    const toast = useRef(null);
    const [localFirstName, setLocalFirstName] = useState(firstName);

    const handleUpdateProfile = async () => {
        const payload = { firstName: localFirstName, lastName, email, password };
        console.log("Sending payload:", payload);

        try {
            const response = await fetch('http://localhost:8090/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${keycloak.token}`
                },
                body: JSON.stringify(payload)
            });

            console.log("Response status:", response.status);

            if (response.ok) {
                // Update context immediately
                setFirstName(localFirstName);
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Profile updated successfully!' });
            } else {
                const errorText = await response.text();
                console.error("Error response:", errorText);
                toast.current.show({ severity: 'error', summary: 'Error', detail: errorText });
            }
        } catch (err) {
            console.error("Fetch error:", err);
            toast.current.show({ severity: 'error', summary: 'Error', detail: err.message });
        }
    };

    return (
        <div className="flex justify-content-center p-4">
            <Toast ref={toast} />
            <Card title="User Settings" className="w-full md:w-6 shadow-2 border-round-lg">
                <div className="p-fluid">
                    <div className="field">
                        <label htmlFor="firstName">First Name</label>
                        <InputText id="firstName" value={localFirstName} onChange={(e) => setLocalFirstName(e.target.value)} />
                    </div>
                    <div className="field">
                        <label htmlFor="lastName">Last Name</label>
                        <InputText id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="field">
                        <label htmlFor="password">New Password</label>
                        <InputText id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password"/>
                    </div>
                    <Button label="Update Profile" icon="pi pi-save" className="mt-3" onClick={handleUpdateProfile} />
                </div>
            </Card>
        </div>
    );
};

export default Settings;
